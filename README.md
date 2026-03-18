# adavibe

> Satu perintah untuk setup Vibe Coding dengan **adaAI Platform**.

```bash
npx adavibe
```

## Pilihan CLI

| CLI | Kegunaan | Setelah Setup |
|-----|----------|---------------|
| **CodeX** | Coding assistant OpenAI | `codex` |
| **Claude Code** | Coding assistant Anthropic | `claude` |
| **OpenCode** | Terminal IDE berbasis AI | `opencode` |
| **OpenClaw** | AI Gateway (WhatsApp, Telegram, dll.) | `npx openclaw gateway --bind lan` |

## Cara Pakai

1. Jalankan `npx adavibe`
2. Pilih bahasa (English / Bahasa Indonesia)
3. Pilih CLI yang ingin dikonfigurasi
4. Paste API key adaAI → [adaai.id/api-keys](https://adaai.id/api-keys)
5. Selesai — langsung pakai!

### OpenClaw

Gateway token di-generate **otomatis** via API. Setelah setup:

```bash
# Terminal 1: jalankan gateway
npx openclaw gateway --bind lan

# Terminal 2: buka dashboard
npx openclaw dashboard
```

## File yang Dikonfigurasi

| CLI | File |
|-----|------|
| CodeX | `~/.codex/config.toml`, `~/.codex/auth.json` |
| Claude Code | `~/.claude/settings.json` |
| OpenCode | `~/.config/opencode/opencode.json` |
| OpenClaw | `~/.openclaw/openclaw.json` |

## Fitur

- **Zero-install** — cukup `npx adavibe`
- **Bilingual** — English & Bahasa Indonesia (auto-detect)
- **Safe backup** — file `.bak` otomatis sebelum overwrite
- **Cross-platform** — Windows, macOS, Linux

## License

MIT
