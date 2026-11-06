# English Path — A1 Beginner

Website belajar bahasa Inggris untuk pemula berbahasa Indonesia.

## Isi website
- 6 modul A1: Alphabet & Pronunciation, Vocabulary, Expressions, Grammar, Basic Sentences, dan Basic Skills.
- Grammar guide dengan rumus, tabel, contoh, dan catatan.
- Vocabulary bank dengan pencarian, kategori, arti, contoh, dan tombol audio.
- Speaking prompts dengan speech-to-text melalui Web Speech API.
- AI Conversation: chat tutor A1, pilihan topik, input suara, dan text-to-speech.
- Quick quiz dan penyimpanan progres di browser (localStorage).

## Menjalankan secara lokal
Cara termudah: buka folder ini di VS Code, lalu jalankan `index.html` menggunakan ekstensi Live Server. Untuk speech recognition, gunakan Chrome dan izinkan akses mikrofon. Fitur browser dapat memerlukan localhost atau HTTPS.

## Mengaktifkan AI sungguhan (Netlify)
AI memerlukan API key dan dapat menimbulkan biaya penggunaan API. Jangan pernah menaruh API key di `script.js` atau kode frontend.

1. Upload folder ini ke repository GitHub.
2. Hubungkan repository ke Netlify.
3. Di Netlify, buka **Site configuration → Environment variables**.
4. Tambahkan `OPENAI_API_KEY` dengan API key milikmu.
5. Deploy ulang.

File `netlify/functions/tutor.js` menjadi backend aman yang memanggil model AI. Tanpa konfigurasi ini, chat tetap memiliki mode latihan sederhana (bukan AI sungguhan).

## Catatan kompatibilitas
- Speech-to-text memakai Web Speech API (`SpeechRecognition` / `webkitSpeechRecognition`), yang dukungannya berbeda antar-browser.
- Text-to-speech memakai `speechSynthesis`.
- Konten dan progres dasar dapat dipakai tanpa API.
- Website ini merupakan materi A1 pengantar, bukan sertifikasi resmi CEFR.
