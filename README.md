# adacode

> Satu perintah untuk setup Vibe Coding dengan **adaAI Platform**.

```bash
npx adacode
```

## Persyaratan

- **Node.js** v18 atau lebih baru
- **API Key adaAI** — buat di [adaai.id/api-keys](https://adaai.id/api-keys)

## Pilihan CLI

| CLI | Kegunaan | Setelah Setup |
|-----|----------|---------------|
| **CodeX** | Coding assistant OpenAI | `codex` |
| **Claude Code** | Coding assistant Anthropic | `claude` |
| **OpenCode** | Terminal IDE berbasis AI | `opencode` |
| **OpenClaw** | AI Gateway (WhatsApp, Telegram, dll.) | `npx openclaw gateway --bind lan` |

## Model yang Tersedia

| Model | Provider | Deskripsi |
|-------|----------|-----------|
| Qwen3 Coder Plus | Alibaba | Cepat dan andal (recommended) |
| Qwen3.5 Plus | Alibaba | Model Qwen terbaru |
| Claude Sonnet 4.6 | Anthropic | Model cepat Anthropic |
| Claude Opus 4.6 | Anthropic | Model premium Anthropic |
| GPT-5.3 | OpenAI | Model OpenAI |
| GLM-4.7 | Zhipu AI | Model Zhipu AI |
| MiniMax M2.5 | MiniMax | Model MiniMax |

---

## 1. Setup CodeX

OpenAI CodeX adalah coding assistant dari OpenAI yang berjalan di terminal.

### Langkah-langkah

```
$ npx adacode

? Select the language for this setup wizard
>   English (Default)
    Bahasa Indonesia

? CLI mana yang ingin Anda konfigurasi?
>   CodeX (asisten coding OpenAI)

? Jalankan npm install -g @openai/codex sekarang untuk memastikan versi terbaru?
  Tidak / Ya

? Kami akan membackup konfigurasi Anda saat ini lalu menulis pengaturan adaAI. Lanjutkan?
  Tidak / Ya

? Tempel API key adaAI Anda (buka https://adaai.id/api-keys jika perlu membuat)
  ****

? Pilih model CodeX default untuk config.toml
>   Qwen3 Coder Plus (direkomendasikan) - Cepat dan andal
    Qwen3.5 Plus
    Claude Sonnet 4.6
    Claude Opus 4.6
    GPT-5.3
    GLM-4.7
    MiniMax M2.5
```

### Hasil

```
Menulis file konfigurasi...
Backup tersimpan: C:\Users\you\.codex\config.toml.20260328-015142.bak
Backup tersimpan: C:\Users\you\.codex\auth.json.20260328-015142.bak
Diperbarui C:\Users\you\.codex\config.toml
Diperbarui C:\Users\you\.codex\auth.json

✅  Selesai! CodeX (asisten coding OpenAI) sekarang terkonfigurasi untuk adaAI.
  Run codex to start coding!
```

### File yang Ditulis

- `~/.codex/config.toml` — model provider & model default
- `~/.codex/auth.json` — API key

### Menjalankan

```bash
cd your-project
codex
```

---

## 2. Setup Claude Code

Claude Code adalah coding assistant dari Anthropic yang powerful untuk pair programming.

### Langkah-langkah

```
$ npx adacode

? Select the language for this setup wizard
>   Bahasa Indonesia

? CLI mana yang ingin Anda konfigurasi?
    CodeX (asisten coding OpenAI)
>   Claude Code (Anthropic)

? Jalankan npm install -g @anthropic-ai/claude-code sekarang untuk memastikan versi terbaru?
  Tidak / Ya

? Kami akan membackup konfigurasi Anda saat ini lalu menulis pengaturan adaAI. Lanjutkan?
  Tidak / Ya

? Tempel API key adaAI Anda (buka https://adaai.id/api-keys jika perlu membuat)
  ****

? Pilih model default untuk Claude Code
>   Qwen3 Coder Plus (direkomendasikan) - Cepat dan andal
    Qwen3.5 Plus
    Claude Sonnet 4.6
    Claude Opus 4.6
    GPT-5.3
    GLM-4.7
    MiniMax M2.5
```

### Hasil

```
Menulis file konfigurasi...
Backup tersimpan: C:\Users\you\.claude\settings.json.20260328-012345.bak
Diperbarui C:\Users\you\.claude\settings.json

✅  Selesai! Claude Code (Anthropic) sekarang terkonfigurasi untuk adaAI.
  Run claude to start coding!
```

### File yang Ditulis

- `~/.claude/settings.json` — konfigurasi dengan optimasi performa:

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "sk-adaai-xxxxx",
    "ANTHROPIC_BASE_URL": "https://api.adaai.id/",
    "API_TIMEOUT_MS": "3000000",
    "DISABLE_TELEMETRY": "1",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1"
  },
  "model": "claude-sonnet-4-6",
  "includeCoAuthoredBy": false,
  "permissions": { "allow": [], "deny": [] }
}
```

> **Note:** Menggunakan `ANTHROPIC_AUTH_TOKEN` (bukan `ANTHROPIC_API_KEY`) untuk optimasi koneksi proxy. `DISABLE_TELEMETRY` dan `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` mengurangi request tidak perlu yang bisa menambah latensi.

### Menjalankan

```bash
cd your-project
claude
```

---

## 3. Setup OpenCode

OpenCode adalah IDE terminal berbasis AI yang mendukung multi-provider.

### Langkah-langkah

```
$ npx adacode

? Select the language for this setup wizard
>   Bahasa Indonesia

? CLI mana yang ingin Anda konfigurasi?
    CodeX (asisten coding OpenAI)
    Claude Code (Anthropic)
>   OpenCode (IDE terminal berbasis AI)

? Jalankan npm install -g opencode-ai sekarang untuk memastikan versi terbaru?
  Tidak / Ya

? Kami akan membackup konfigurasi Anda saat ini lalu menulis pengaturan adaAI. Lanjutkan?
  Tidak / Ya

? Tempel API key adaAI Anda (buka https://adaai.id/api-keys jika perlu membuat)
  ****

? Pilih model default untuk OpenCode
>   Qwen3 Coder Plus (direkomendasikan) - Cepat dan andal
    Qwen3.5 Plus
    Claude Sonnet 4.6
    Claude Opus 4.6
    GPT-5.3
    GLM-4.7
    MiniMax M2.5
```

### Hasil

```
Menulis file konfigurasi...
Diperbarui C:\Users\you\.config\opencode\opencode.json

✅  Tidak ada environment variable yang konflik. Semua aman!

✅  Selesai! OpenCode (IDE terminal berbasis AI) sekarang terkonfigurasi untuk adaAI.
  Buka direktori proyek Anda dan jalankan:
    opencode
  Lalu ketik /models dan pilih model yang sudah dikonfigurasi.
```

### File yang Ditulis

- `~/.config/opencode/opencode.json` — provider config dengan semua model

### Menjalankan

```bash
cd your-project
opencode
```

Setelah buka, ketik `/models` untuk memilih model dari daftar yang sudah dikonfigurasi.

> **⚠️ Catatan:** Jika ada environment variable `ANTHROPIC_AUTH_TOKEN` atau `ANTHROPIC_BASE_URL` yang aktif, wizard akan memberi peringatan karena bisa konflik dengan OpenCode. Hapus dengan:
> - **Windows:** `Remove-Item Env:\ANTHROPIC_AUTH_TOKEN`
> - **macOS/Linux:** `unset ANTHROPIC_AUTH_TOKEN`

---

## 4. Setup OpenClaw

OpenClaw adalah AI Gateway untuk menghubungkan WhatsApp, Telegram, dan platform lain ke model AI.

### Langkah-langkah

```
$ npx adacode

? Select the language for this setup wizard
>   Bahasa Indonesia

? CLI mana yang ingin Anda konfigurasi?
    CodeX (asisten coding OpenAI)
    Claude Code (Anthropic)
    OpenCode (IDE terminal berbasis AI)
>   OpenClaw (AI Gateway untuk WhatsApp, Telegram, dll.)

? Jalankan npm install -g openclaw sekarang untuk memastikan versi terbaru?
  Tidak / Ya

? Kami akan membackup konfigurasi Anda saat ini lalu menulis pengaturan adaAI. Lanjutkan?
  Tidak / Ya

? Tempel API key adaAI Anda (buka https://adaai.id/api-keys jika perlu membuat)
  ****

? Pilih model default untuk OpenClaw
>   Qwen3 Coder Plus (direkomendasikan) - Cepat dan andal
    Qwen3.5 Plus
    Claude Sonnet 4.6
    Claude Opus 4.6
    GPT-5.3
    GLM-4.7
    MiniMax M2.5
```

### Hasil

```
✅ Gateway Token berhasil dibuat dan disimpan otomatis!
🔑 Gateway Token: a1b2c3d4...

Menulis file konfigurasi...
Diperbarui C:\Users\you\.openclaw\openclaw.json

✅  Selesai! OpenClaw (AI Gateway untuk WhatsApp, Telegram, dll.) sekarang terkonfigurasi untuk adaAI.
  Jalankan gateway dengan:
    npx openclaw gateway --bind lan

  Buka dashboard dengan:
    npx openclaw dashboard
```

### File yang Ditulis

- `~/.openclaw/openclaw.json` — provider config, model list, dan gateway token

### Menjalankan

```bash
# Terminal 1: jalankan gateway
npx openclaw gateway --bind lan

# Terminal 2: buka dashboard (opsional)
npx openclaw dashboard
```

---

## Fitur

- **Zero-install** — cukup `npx adacode`, tidak perlu install global
- **Bilingual** — English & Bahasa Indonesia (auto-detect)
- **Safe backup** — file `.bak` otomatis sebelum overwrite
- **Cross-platform** — Windows, macOS, Linux
- **Optimized** — Claude Code config menggunakan `ANTHROPIC_AUTH_TOKEN` + telemetry disabled untuk performa maksimal

## Ringkasan File Konfigurasi

| CLI | File Konfigurasi |
|-----|-----------------|
| CodeX | `~/.codex/config.toml`, `~/.codex/auth.json` |
| Claude Code | `~/.claude/settings.json` |
| OpenCode | `~/.config/opencode/opencode.json` |
| OpenClaw | `~/.openclaw/openclaw.json` |

## Troubleshooting

### CodeX: Error 404 pada `/v1/responses`
Pastikan server `aiclient-2-api` mendukung endpoint `/v1/responses`. Jika hanya tersedia `/v1/chat/completions`, gunakan Claude Code atau OpenCode sebagai alternatif.

### Claude Code: Response lambat
1. Pastikan `DISABLE_TELEMETRY=1` dan `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` ada di config
2. Gunakan `ANTHROPIC_AUTH_TOKEN` (bukan `ANTHROPIC_API_KEY`)
3. Cek koneksi ke `api.adaai.id`

### OpenCode: Model tidak muncul
Setelah buka OpenCode, ketik `/models` untuk melihat daftar model. Pilih model yang diawali `adaai/`.

### OpenClaw: Gateway tidak bisa diakses
Pastikan port default (3100) tidak dipakai aplikasi lain. Gunakan `--port <number>` untuk mengubah port.

## License

MIT
