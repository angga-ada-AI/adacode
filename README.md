# adavibe

Languages: [English](#english) · [Bahasa Indonesia](#bahasa-indonesia)

`adavibe` is an interactive NPX wizard that wires **CodeX** or **Claude Code** CLIs to **adaAI Platform's** low-cost API relay. It handles language selection, dependency installation, safe backups, and writes the correct API key configuration for you.

```bash
npx adavibe
```

---

## English

### Highlights

- **Zero-install**: run everything in one command with `npx adavibe`
- **Guided flow** in English and Bahasa Indonesia with automatic locale detection
- **Verifies the latest** CodeX or Claude Code CLI by re-running the official npm installs
- **Creates timestamped `.bak` backups** before touching your configuration
- **Writes production-ready templates** for `~/.codex` and `~/.claude`
- **Exceptional value pricing**: only 20% of the official API price

### Quick Start

1. Make sure you have **Node.js 18+** and **npm** installed.
2. Run the wizard:

```bash
npx adavibe
```

3. Choose your language and whether you want to configure **CodeX** or **Claude Code**.
4. Decide whether to let the wizard re-run the official `npm install` for the CLI you picked (recommended for the latest features).
5. Confirm that it can back up and overwrite your existing config files.
6. Paste your adaAI API key (the wizard links to [adaai.id/api-keys](https://adaai.id/api-keys)) and answer any remaining prompts.
7. Launch your CLI (`codex` or `claude`) and enjoy!

Backups are written right next to the original files with names like `config.toml.20250101-103000.bak` so you can roll back instantly.

### What Gets Configured

#### CodeX

- `~/.codex/config.toml` is rewritten with adaAI defaults, including the base URL `https://api.adaai.id/v1`
- The default selection is `o4-mini` (recommended), but you can switch to `gpt-4.1` or `o3` during the wizard
- `~/.codex/auth.json` stores your `OPENAI_API_KEY` for adaAI

#### Claude Code

- Installs/updates `@anthropic-ai/claude-code`
- `~/.claude/settings.json` gets an `env` block that points to adaAI
- You can override the base URL if you prefer a different edge host

### Development

```bash
npm install        # install dependencies
npm run lint       # type-check the project
npm run build      # compile TypeScript to dist/
```

During development you can run the CLI locally with `node dist/index.js` after building, or with `ts-node src/index.ts` if you prefer on-the-fly execution.

### Support & Feedback

- API keys & billing: [https://adaai.id/api-keys](https://adaai.id/api-keys)
- Issues and feature requests: open a ticket in this repository

---

## Bahasa Indonesia

### Fitur Unggulan

- **Zero-install**: jalankan semua dalam satu perintah dengan `npx adavibe`
- **Alur terpandu** dalam English dan Bahasa Indonesia dengan deteksi bahasa otomatis
- **Memverifikasi versi terbaru** CodeX atau Claude Code CLI dengan menjalankan ulang npm install resmi
- **Membuat backup bertimestamp `.bak`** sebelum mengubah konfigurasi Anda
- **Menulis template siap produksi** untuk `~/.codex` dan `~/.claude`
- **Harga terjangkau**: hanya 20% dari harga API resmi

### Cara Pakai

1. Pastikan Anda sudah menginstall **Node.js 18+** dan **npm**.
2. Jalankan wizard:

```bash
npx adavibe
```

3. Pilih bahasa dan apakah Anda ingin mengkonfigurasi **CodeX** atau **Claude Code**.
4. Pilih apakah wizard boleh menjalankan ulang `npm install` resmi untuk CLI yang dipilih (direkomendasikan untuk fitur terbaru).
5. Konfirmasi bahwa wizard boleh membackup dan menimpa file konfigurasi yang ada.
6. Tempel API key adaAI Anda (wizard akan mengarahkan ke [adaai.id/api-keys](https://adaai.id/api-keys)) dan jawab pertanyaan berikutnya.
7. Jalankan CLI Anda (`codex` atau `claude`) dan mulai coding!

Backup ditulis di sebelah file asli dengan nama seperti `config.toml.20250101-103000.bak` sehingga Anda bisa rollback kapan saja.

### Yang Dikonfigurasi

#### CodeX

- `~/.codex/config.toml` ditulis ulang dengan default adaAI, termasuk base URL `https://api.adaai.id/v1`
- Pilihan default adalah `o4-mini` (direkomendasikan), tapi Anda bisa beralih ke `gpt-4.1` atau `o3` saat proses setup
- `~/.codex/auth.json` menyimpan `OPENAI_API_KEY` untuk adaAI

#### Claude Code

- Install/update `@anthropic-ai/claude-code`
- `~/.claude/settings.json` mendapat blok `env` yang mengarah ke adaAI
- Anda bisa mengubah base URL jika lebih suka menggunakan edge host lain

### Pengembangan

```bash
npm install        # install dependensi
npm run lint       # cek tipe
npm run build      # kompilasi TypeScript ke dist/
```

Saat pengembangan, Anda bisa menjalankan CLI secara lokal dengan `node dist/index.js` setelah build, atau dengan `ts-node src/index.ts` untuk eksekusi langsung.

### Dukungan & Masukan

- API keys & billing: [https://adaai.id/api-keys](https://adaai.id/api-keys)
- Issues dan feature request: buka tiket di repositori ini

---

## License

`adavibe` is released under the [MIT License](LICENSE).
