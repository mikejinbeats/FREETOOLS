# 🚀 FREETOOLS — Ultimate All-In-One Web Tools Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-Powered-black.svg)](https://ffmpeg.org/)
[![No Sign Up](https://img.shields.io/badge/Sign%20Up-Not%20Required-green.svg)](#)

> **Every Tool You Need for PDFs, Images, Videos, Audio & Social Media in One Place.**  
> **100% FREE & NO SIGN UP REQUIRED!** Convert, compress, edit, upscale, and download digital files in seconds.

---

## ✨ Features & Included Tools (88+ Active Tools)

### 📄 1. PDF Tools (31 Tools)
- **Organize & Edit**: Merge PDF, Split PDF, Remove Pages, Extract Pages, Organize PDF, Scan to PDF, Edit PDF, Sign PDF, Page Numbers, Watermark PDF, Rotate PDF.
- **Optimize**: Compress PDF (with Target Size in MB/KB), Repair PDF, OCR PDF.
- **Convert to/from PDF**: PDF to Word (`.docx`), PDF to PowerPoint (`.pptx`), PDF to Excel (`.xlsx`), Word to PDF, PowerPoint to PDF, Excel to PDF, JPG to PDF, PDF to JPG, HTML to PDF, PDF to PDF/A.
- **Security & Intelligence**: Protect PDF (Password Encryption), Unlock PDF, Compare PDF, Redact PDF, Fill & Sign Forms, AI Summarizer, Translate PDF (+100 Languages), PDF to Markdown, PDF to HEIC, HEIC to PDF.

### 🖼️ 2. Image & AI Tools (20 Tools)
- **AI Processing**: 
  - ✂️ **Remove Background (AI)**: Automatically removes image background with transparent PNG output via `rembg`.
  - 🚀 **Image Upscaler**: Enlarge image resolution by **2x** or **4x** HD using AI Lanczos detail enhancement.
  - 🧼 **Remove Watermark**: Erase watermarks, logos, and unwanted text objects using OpenCV Inpainting (`cv2.inpaint`).
- **Editing & Conversion**:
  - 📐 **Crop Image**: Trim rectangular boundaries in pixels.
  - 🔄 **Rotate Image**: Rotate 90°, 180°, 270° or Flip horizontally/vertically.
  - 🗜️ **Image Compressor**: Compress JPG, PNG, WEBP, SVG, GIF with **Target File Size (MB)** selector.
  - 📐 **Resize Image**: Resize by width, height, or percentage.
  - 🔁 **Converters**: JPG to PNG, PNG to JPG, JPG to WEBP, PNG to WEBP, WEBP to JPG, WEBP to PNG, JIF to PNG, PNG to SVG, HEIC to JPG, HEIC to PNG, JPG to HEIC, SVG Converter.

### 🎬 3. Media & Social Downloader Tools (15 Tools)
- 🔴 **YouTube to MP3 / MP4 / Shorts**: Download YouTube videos in **1080p Full HD H.264** or extract **320kbps MP3** audio.
- 🟢 **Spotify to MP3**: Convert and download Spotify tracks/playlists to 320kbps MP3.
- 🎵 **TikTok Downloader**: Download TikTok videos without watermark in HD MP4 or extract MP3.
- 📸 **Instagram Reels / Photos / Stories**: Download Reels, IGTV, carousels, and stories.
- 🟠 **SoundCloud & Vimeo**: Download tracks and HD videos.
- 🎥 **Local Video Tools**: 
  - **Compress Video**: Compress MP4 videos with target file size.
  - **Video to MP3**: Extract MP3 audio from local MP4, MKV, AVI, MOV videos.
  - **Audio to Video**: Convert MP3 audio into MP4 video with cover background for YouTube/Reels.

### 🎞️ 4. GIF Tools (10 Tools)
- **Video to GIF**, **MP4 to GIF**, **WEBM to GIF**, **APNG to GIF**, **MOV to GIF**, **AVI to GIF**, **Image to GIF**, **GIF to MP4**, **GIF to APNG**, **GIF Compressor**.

### 🔊 5. Audio Tools (3 Tools)
- **MP3 Compressor**, **WAV Compressor**, **Audio Converter** (MP3, WAV, AAC, FLAC, OGG).

### 🌐 6. Document & Ebook Tools (8 Tools)
- **PDF Converter**, **Document Converter**, **Ebook Converter** (EPUB, MOBI, AZW3 to PDF), **PDF to EPUB**, **EPUB to PDF**, **Translate Document** (PDF, Word DOCX, TXT into 100+ languages preserving layout).

---

## 🎨 User Experience & Design Highlights

- **Live Real-Time Search Bar**: Instantly filter all 88+ tools as you type (`youtube`, `compress`, `remove bg`, `pdf to word`, `crop`, `mp3`).
- **Didactic Target Size Selector**: Compress files down to exact requested sizes (e.g. *"Compress to under 2.0 MB"*).
- **Format Highlights (iLoveIMG Style)**: Clear badges showing supported formats (**JPG, PNG, WEBP, HEIC, GIF, SVG, TIFF, BMP**).
- **100% Free & No Registration**: Full functionality out of the box.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Flexbox/Grid), PDF.js, PDF-Lib.
- **Backend API**: Python 3.10+, FastAPI, Uvicorn, PyMuPDF, `pdfplumber`, `pdf2docx`, `pypdf`, `Pillow`, `pillow-heif`, `rembg` (U2-Net), OpenCV (`cv2`), `deep-translator`, `python-docx`, `FFmpeg`, `yt-dlp`.

---

## ⚡ Quick Start & Installation

### 1. Prerequisites
Ensure you have **Python 3.10+** and **FFmpeg** installed on your system.

### 2. Install Dependencies
```bash
pip install fastapi uvicorn pypdf pdf2docx pdfplumber img2pdf PyMuPDF pillow pillow-heif imageio-ffmpeg yt-dlp rembg opencv-python-headless deep-translator python-docx
```

### 3. Run the Backend API Server
```bash
python backend/server.py
```
*The FastAPI backend will start running on `http://localhost:5000`.*

### 4. Run the Frontend HTTP Server
In a separate terminal:
```bash
python -m http.server 8000
```
*Open your browser and navigate to `http://localhost:8000`.*

---

## 📜 License

Distributed under the **MIT License**. Free for personal and commercial use.

---

<p center>Crafted with ❤️ for FREETOOLS Platform.</p>
