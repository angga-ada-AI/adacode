#!/usr/bin/env node

import prompts from 'prompts';
import { spawn } from 'child_process';
import kleur from 'kleur';
import { homedir } from 'os';
import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';

// ─── Types ───────────────────────────────────────────────────────────────────

type Language = 'en' | 'id';
type Target = 'codex' | 'claude';

type Messages = {
    welcome: string;
    languagePrompt: string;
    languageChoices: Array<{ value: Language; title: string }>;
    cancel: string;
    targetPrompt: string;
    targets: Record<Target, string>;
    startInstall: (command: string) => string;
    installSuccess: string;
    installFailed: string;
    confirmOverwrite: string;
    declineOverwrite: string;
    installConfirm: (command: string) => string;
    installSkipped: string;
    yes: string;
    no: string;
    codexModelPrompt: string;
    codexModels: Array<{ value: string; title: string; description?: string }>;
    apiKeyPrompt: string;
    apiKeyHint: string;
    apiKeyValidation: string;
    claudeBaseUrlPrompt: string;
    claudeBaseUrlHint: string;
    baseUrlValidation: string;
    writingConfig: string;
    backupDone: (file: string) => string;
    noBackupNeeded: (file: string) => string;
    configWritten: (file: string) => string;
    finished: (targetLabel: string) => string;
    docsHint: string;
};

// ─── Configuration ───────────────────────────────────────────────────────────

const PLATFORM_NAME = 'adaAI';
const API_KEY_URL = 'https://adaai.id/api-keys';
const DOCS_URL = 'https://adaai.id/vibe-coding';

// Base URLs for adaAI API proxy
const CODEX_BASE_URL = 'https://api.adaai.id/v1';
const CLAUDE_BASE_URL_DEFAULT = 'https://api.adaai.id/v1';

// ─── Translations ────────────────────────────────────────────────────────────

const TRANSLATIONS: Record<Language, Messages> = {
    en: {
        welcome: `🚀  Ready to wire CodeX or Claude Code to ${PLATFORM_NAME}? Let's get your CLI configured.`,
        languagePrompt: 'Select the language for this setup wizard',
        languageChoices: [
            { value: 'en', title: 'English (Default)' },
            { value: 'id', title: 'Bahasa Indonesia' },
        ],
        cancel: 'Setup cancelled. Nothing was changed.',
        targetPrompt: 'Which CLI do you want to configure today?',
        targets: {
            codex: 'CodeX (OpenAI\'s coding assistant)',
            claude: 'Claude Code (Anthropic)',
        },
        startInstall: (command) => `Running ${command} to make sure everything is up to date...`,
        installSuccess: 'Installation check completed.',
        installFailed: 'Installation failed. Please review the errors above and run the wizard again.',
        confirmOverwrite:
            'We will backup your current configuration (.bak files) and write the adaAI settings. Continue?',
        declineOverwrite: 'Understood. No files were touched.',
        installConfirm: (command) => `Run ${command} now to ensure you have the latest release?`,
        installSkipped: 'Skipped installation. We\'ll use the version already on your machine.',
        yes: 'Yes',
        no: 'No',
        codexModelPrompt: 'Pick the default CodeX model to set in config.toml',
        codexModels: [
            { value: 'o4-mini', title: 'o4-mini (fast, cost-effective - recommended)', description: 'Best balance of speed and quality' },
            { value: 'gpt-4.1', title: 'gpt-4.1 (latest GPT-4 series)', description: 'High quality general purpose' },
            { value: 'o3', title: 'o3 (advanced reasoning)', description: 'Most capable model' },
        ],
        apiKeyPrompt: `Paste your ${PLATFORM_NAME} API key (open ${API_KEY_URL} if you need to create one)`,
        apiKeyHint: 'Your API key is stored locally on this device only.',
        apiKeyValidation: 'Please enter a non-empty API key.',
        claudeBaseUrlPrompt: 'Enter the Claude Code base URL to use',
        claudeBaseUrlHint: `Press enter to use ${CLAUDE_BASE_URL_DEFAULT}`,
        baseUrlValidation: 'Please enter a valid base URL.',
        writingConfig: 'Writing configuration files...',
        backupDone: (file) => `Backup saved: ${file}`,
        noBackupNeeded: (file) => `No existing file found at ${file}.`,
        configWritten: (file) => `Updated ${file}`,
        finished: (targetLabel) => `✅  All done! ${targetLabel} is now configured for ${PLATFORM_NAME}.`,
        docsHint: `Tip: run \`npx adavibe\` anytime you want to switch setups again. Docs: ${DOCS_URL}`,
    },
    id: {
        welcome: `🚀  Siap menghubungkan CodeX atau Claude Code ke ${PLATFORM_NAME}? Mari konfigurasi CLI Anda.`,
        languagePrompt: 'Pilih bahasa untuk wizard ini',
        languageChoices: [
            { value: 'en', title: 'English' },
            { value: 'id', title: 'Bahasa Indonesia (Default)' },
        ],
        cancel: 'Setup dibatalkan. Tidak ada file yang diubah.',
        targetPrompt: 'CLI mana yang ingin Anda konfigurasi?',
        targets: {
            codex: 'CodeX (asisten coding OpenAI)',
            claude: 'Claude Code (Anthropic)',
        },
        startInstall: (command) => `Menjalankan ${command} untuk memastikan versi terbaru...`,
        installSuccess: 'Pengecekan instalasi selesai.',
        installFailed: 'Instalasi gagal. Silakan periksa error di atas dan jalankan wizard lagi.',
        confirmOverwrite:
            'Kami akan membackup konfigurasi Anda saat ini (file .bak) lalu menulis pengaturan adaAI. Lanjutkan?',
        declineOverwrite: 'Dipahami. Tidak ada file yang diubah.',
        installConfirm: (command) => `Jalankan ${command} sekarang untuk memastikan versi terbaru?`,
        installSkipped: 'Instalasi dilewati. Akan menggunakan versi yang sudah ada di mesin Anda.',
        yes: 'Ya',
        no: 'Tidak',
        codexModelPrompt: 'Pilih model CodeX default untuk config.toml',
        codexModels: [
            { value: 'o4-mini', title: 'o4-mini (cepat, hemat biaya - direkomendasikan)', description: 'Keseimbangan terbaik kecepatan dan kualitas' },
            { value: 'gpt-4.1', title: 'gpt-4.1 (seri GPT-4 terbaru)', description: 'Kualitas tinggi untuk umum' },
            { value: 'o3', title: 'o3 (reasoning lanjutan)', description: 'Model paling canggih' },
        ],
        apiKeyPrompt: `Tempel API key ${PLATFORM_NAME} Anda (buka ${API_KEY_URL} jika perlu membuat)`,
        apiKeyHint: 'API key hanya disimpan di perangkat Anda.',
        apiKeyValidation: 'API key tidak boleh kosong.',
        claudeBaseUrlPrompt: 'Masukkan base URL Claude Code yang akan digunakan',
        claudeBaseUrlHint: `Tekan enter untuk menggunakan ${CLAUDE_BASE_URL_DEFAULT}`,
        baseUrlValidation: 'Masukkan base URL yang valid.',
        writingConfig: 'Menulis file konfigurasi...',
        backupDone: (file) => `Backup tersimpan: ${file}`,
        noBackupNeeded: (file) => `Tidak ada file ditemukan di ${file}.`,
        configWritten: (file) => `Diperbarui ${file}`,
        finished: (targetLabel) => `✅  Selesai! ${targetLabel} sekarang terkonfigurasi untuk ${PLATFORM_NAME}.`,
        docsHint: `Tips: jalankan \`npx adavibe\` kapan saja untuk mengubah konfigurasi. Docs: ${DOCS_URL}`,
    },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const detectLanguage = (): Language => {
    const env =
        process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL || process.env.LC_MESSAGES || '';
    if (env.toLowerCase().startsWith('id') || env.toLowerCase().startsWith('in')) {
        return 'id';
    }
    return 'en';
};

const formatTimestamp = (): string => {
    const date = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return (
        date.getFullYear().toString() +
        pad(date.getMonth() + 1) +
        pad(date.getDate()) +
        '-' +
        pad(date.getHours()) +
        pad(date.getMinutes()) +
        pad(date.getSeconds())
    );
};

const ensureDir = async (filePath: string) => {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
};

const backupFile = async (filePath: string): Promise<string | null> => {
    if (!existsSync(filePath)) {
        return null;
    }
    const backupPath = `${filePath}.${formatTimestamp()}.bak`;
    await fs.copyFile(filePath, backupPath);
    return backupPath;
};

const writeFileSafely = async (filePath: string, content: string) => {
    await ensureDir(filePath);
    await fs.writeFile(filePath, content, 'utf8');
};

const runInstallCommand = async (
    command: string,
    args: string[],
    lang: Language
): Promise<boolean> => {
    const messages = TRANSLATIONS[lang];
    console.log();
    const printable = [command, ...args].join(' ');
    console.log(kleur.cyan(messages.startInstall(printable)));
    return await new Promise<boolean>((resolve) => {
        const child = spawn(command, args, {
            stdio: 'inherit',
            shell: process.platform === 'win32',
        });

        child.on('error', (error) => {
            console.error(kleur.red(messages.installFailed));
            console.error(error);
            resolve(false);
        });

        child.on('close', (code) => {
            if (code === 0) {
                console.log(kleur.green(messages.installSuccess));
                resolve(true);
            } else {
                console.error(kleur.red(messages.installFailed));
                resolve(false);
            }
        });
    });
};

const onCancel = (lang: Language) => {
    const messages = TRANSLATIONS[lang];
    console.log();
    console.log(kleur.yellow(messages.cancel));
    process.exit(0);
};

const printBanner = () => {
    console.log();
    console.log(kleur.bold().cyan('    ┌─────────────────────────────────────┐'));
    console.log(kleur.bold().cyan('    │                                     │'));
    console.log(kleur.bold().cyan('    │   ') + kleur.bold().white('⚡ adaAI Vibe Coding Setup ⚡') + kleur.bold().cyan('   │'));
    console.log(kleur.bold().cyan('    │                                     │'));
    console.log(kleur.bold().cyan('    │   ') + kleur.gray('Configure CodeX or Claude Code') + kleur.bold().cyan('  │'));
    console.log(kleur.bold().cyan('    │   ') + kleur.gray('for adaAI Platform API access ') + kleur.bold().cyan('  │'));
    console.log(kleur.bold().cyan('    │                                     │'));
    console.log(kleur.bold().cyan('    └─────────────────────────────────────┘'));
    console.log();
};

// ─── Configure CodeX ─────────────────────────────────────────────────────────

const configureCodex = async (lang: Language) => {
    const messages = TRANSLATIONS[lang];

    const codexInstallArgs = ['install', '-g', '@openai/codex'];
    const codexInstallCommand = ['npm', ...codexInstallArgs];
    const { runInstall } = await prompts(
        {
            type: 'toggle',
            name: 'runInstall',
            message: messages.installConfirm(codexInstallCommand.join(' ')),
            initial: true,
            active: messages.yes,
            inactive: messages.no,
        },
        { onCancel: () => onCancel(lang) }
    );

    if (runInstall) {
        const installOk = await runInstallCommand('npm', codexInstallArgs, lang);
        if (!installOk) process.exit(1);
    } else {
        console.log(kleur.yellow(messages.installSkipped));
    }

    const targetLabel = messages.targets.codex;

    const overwriteAnswer = await prompts(
        {
            type: 'toggle',
            name: 'confirm',
            message: messages.confirmOverwrite,
            initial: true,
            active: messages.yes,
            inactive: messages.no,
        },
        { onCancel: () => onCancel(lang) }
    );

    if (!overwriteAnswer.confirm) {
        console.log(kleur.yellow(messages.declineOverwrite));
        process.exit(0);
    }

    const { model } = await prompts(
        {
            type: 'select',
            name: 'model',
            message: messages.codexModelPrompt,
            choices: messages.codexModels,
            initial: 0,
        },
        { onCancel: () => onCancel(lang) }
    );

    const selectedModel = (model as string) || 'o4-mini';

    const { apiKey } = await prompts(
        [
            {
                type: 'password',
                name: 'apiKey',
                message: `${messages.apiKeyPrompt}\n`,
                validate: (value: string) =>
                    value.trim().length > 0 ? true : messages.apiKeyValidation,
                hint: messages.apiKeyHint,
            },
        ],
        { onCancel: () => onCancel(lang) }
    );

    const sanitizedApiKey = (apiKey as string).trim();

    const configPath = path.join(homedir(), '.codex', 'config.toml');
    const authPath = path.join(homedir(), '.codex', 'auth.json');

    console.log();
    console.log(kleur.cyan(messages.writingConfig));

    const configBackup = await backupFile(configPath);
    if (configBackup) {
        console.log(kleur.gray(messages.backupDone(configBackup)));
    } else {
        console.log(kleur.gray(messages.noBackupNeeded(configPath)));
    }

    const authBackup = await backupFile(authPath);
    if (authBackup) {
        console.log(kleur.gray(messages.backupDone(authBackup)));
    } else {
        console.log(kleur.gray(messages.noBackupNeeded(authPath)));
    }

    const configContent = `# adaAI Platform - CodeX Configuration
# Generated by npx adavibe on ${new Date().toISOString()}
# Docs: ${DOCS_URL}

model_provider = "adaai"
model = "${selectedModel}"
model_reasoning_effort = "high"
disable_response_storage = true
preferred_auth_method = "apikey"

[model_providers.adaai]
name = "adaai"
base_url = "${CODEX_BASE_URL}"
wire_api = "responses"
`;

    const authContent = JSON.stringify({ OPENAI_API_KEY: sanitizedApiKey }, null, 2) + '\n';

    await writeFileSafely(configPath, configContent);
    await writeFileSafely(authPath, authContent);

    console.log(kleur.green(messages.configWritten(configPath)));
    console.log(kleur.green(messages.configWritten(authPath)));
    console.log();
    console.log(kleur.bold().green(messages.finished(targetLabel)));
    console.log(kleur.gray(messages.docsHint));
    console.log();
    console.log(kleur.cyan('  Run ') + kleur.bold().white('codex') + kleur.cyan(' to start coding!'));
    console.log();
};

// ─── Configure Claude Code ───────────────────────────────────────────────────

const configureClaude = async (lang: Language) => {
    const messages = TRANSLATIONS[lang];

    const claudeInstallArgs = ['install', '-g', '@anthropic-ai/claude-code'];
    const claudeInstallCommand = ['npm', ...claudeInstallArgs];
    const { runInstall } = await prompts(
        {
            type: 'toggle',
            name: 'runInstall',
            message: messages.installConfirm(claudeInstallCommand.join(' ')),
            initial: true,
            active: messages.yes,
            inactive: messages.no,
        },
        { onCancel: () => onCancel(lang) }
    );

    if (runInstall) {
        const installOk = await runInstallCommand('npm', claudeInstallArgs, lang);
        if (!installOk) process.exit(1);
    } else {
        console.log(kleur.yellow(messages.installSkipped));
    }

    const targetLabel = messages.targets.claude;

    const overwriteAnswer = await prompts(
        {
            type: 'toggle',
            name: 'confirm',
            message: messages.confirmOverwrite,
            initial: true,
            active: messages.yes,
            inactive: messages.no,
        },
        { onCancel: () => onCancel(lang) }
    );

    if (!overwriteAnswer.confirm) {
        console.log(kleur.yellow(messages.declineOverwrite));
        process.exit(0);
    }

    const { apiKey, baseUrl } = await prompts(
        [
            {
                type: 'password',
                name: 'apiKey',
                message: `${messages.apiKeyPrompt}\n`,
                validate: (value: string) =>
                    value.trim().length > 0 ? true : messages.apiKeyValidation,
                hint: messages.apiKeyHint,
            },
            {
                type: 'text',
                name: 'baseUrl',
                message: messages.claudeBaseUrlPrompt,
                initial: CLAUDE_BASE_URL_DEFAULT,
                hint: messages.claudeBaseUrlHint,
                validate: (value: string) => {
                    const trimmed = value.trim();
                    try {
                        new URL(trimmed);
                        return true;
                    } catch {
                        return messages.baseUrlValidation;
                    }
                },
            },
        ],
        { onCancel: () => onCancel(lang) }
    );

    const sanitizedApiKey = (apiKey as string).trim();
    const normalizedBaseUrl = (() => {
        const trimmed = (baseUrl as string).trim();
        if (!trimmed.endsWith('/')) return `${trimmed}/`;
        return trimmed;
    })();

    const settingsPath = path.join(homedir(), '.claude', 'settings.json');

    console.log();
    console.log(kleur.cyan(messages.writingConfig));

    const settingsBackup = await backupFile(settingsPath);
    if (settingsBackup) {
        console.log(kleur.gray(messages.backupDone(settingsBackup)));
    } else {
        console.log(kleur.gray(messages.noBackupNeeded(settingsPath)));
    }

    const settingsContent = JSON.stringify(
        {
            env: {
                ANTHROPIC_API_KEY: sanitizedApiKey,
                ANTHROPIC_BASE_URL: normalizedBaseUrl,
                DISABLE_TELEMETRY: '1',
                CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1',
            },
            model: 'sonnet',
            includeCoAuthoredBy: false,
            apiKeyHelper: `echo ${sanitizedApiKey}`,
            permissions: {
                allow: [] as string[],
                deny: [] as string[],
            },
        },
        null,
        2
    );

    await writeFileSafely(settingsPath, settingsContent + '\n');

    console.log(kleur.green(messages.configWritten(settingsPath)));
    console.log();
    console.log(kleur.bold().green(messages.finished(targetLabel)));
    console.log(kleur.gray(messages.docsHint));
    console.log();
    console.log(kleur.cyan('  Run ') + kleur.bold().white('claude') + kleur.cyan(' to start coding!'));
    console.log();
};

// ─── Main ────────────────────────────────────────────────────────────────────

const main = async () => {
    printBanner();

    const defaultLang = detectLanguage();
    const initialChoiceIndex = TRANSLATIONS[defaultLang].languageChoices.findIndex(
        (choice) => choice.value === defaultLang
    );

    const languageChoice = await prompts(
        {
            type: 'select',
            name: 'language',
            message: TRANSLATIONS[defaultLang].languagePrompt,
            choices: TRANSLATIONS[defaultLang].languageChoices,
            initial: initialChoiceIndex >= 0 ? initialChoiceIndex : 0,
        },
        { onCancel: () => onCancel(defaultLang) }
    );

    const lang = (languageChoice.language || defaultLang) as Language;
    const messages = TRANSLATIONS[lang];

    console.log();
    console.log(kleur.bold().magenta(messages.welcome));
    console.log();

    const { target } = await prompts(
        {
            type: 'select',
            name: 'target',
            message: messages.targetPrompt,
            choices: [
                { title: messages.targets.codex, value: 'codex' },
                { title: messages.targets.claude, value: 'claude' },
            ],
            initial: 0,
        },
        { onCancel: () => onCancel(lang) }
    );

    if (target === 'codex') {
        await configureCodex(lang);
    } else if (target === 'claude') {
        await configureClaude(lang);
    } else {
        onCancel(lang);
    }
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
