/**
 * iLovePDF Complete Web Application Engine
 * Handles Navigation, Mega Menu, Category Filtering, Tool Workspaces,
 * and Client-Side PDF Processing (PDF-LIB, PDF.JS, JSZip).
 */

// Initialize PDF.js worker
if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

// Tool Database & Descriptions
const TOOLS_DB = {
    'translate-word': { title: 'Translate Word Document', subtitle: 'Translate DOCX Word documents into any language while preserving formatting.', btnText: 'Select Word Document', dropText: 'or drop Word file here', actionBtnText: 'Translate Document', multiple: false, accept: '.doc,.docx', endpoint: '/api/translate-document' },
    'translate_word': { title: 'Translate Word Document', subtitle: 'Translate DOCX Word documents into any language while preserving formatting.', btnText: 'Select Word Document', dropText: 'or drop Word file here', actionBtnText: 'Translate Document', multiple: false, accept: '.doc,.docx', endpoint: '/api/translate-document' },
    'translate-document': { title: 'Translate Document', subtitle: 'Translate PDF, DOCX, XLSX, and text documents into 100+ languages for FREE.', btnText: 'Select Document', dropText: 'or drop document here', actionBtnText: 'Translate Document', multiple: false, accept: '.pdf,.doc,.docx,.txt', endpoint: '/api/translate-document' },
    'translate_document': { title: 'Translate Document', subtitle: 'Translate PDF, DOCX, XLSX, and text documents into 100+ languages for FREE.', btnText: 'Select Document', dropText: 'or drop document here', actionBtnText: 'Translate Document', multiple: false, accept: '.pdf,.doc,.docx,.txt', endpoint: '/api/translate-document' },

    'video-to-audio': { title: 'Video to Audio Converter', subtitle: 'Extract MP3, WAV or AAC audio from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Extract Audio', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'video_to_audio': { title: 'Video to Audio Converter', subtitle: 'Extract MP3, WAV or AAC audio from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Extract Audio', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },

    // Vice-Versa Pair Additions
    'jpg-to-heic': { title: 'Convert JPG to HEIC', subtitle: 'Convert JPG images to high efficiency Apple HEIC photo format.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/jpeg,.jpg,.jpeg', endpoint: '/api/image/jpg-to-heic' },
    'jpg_to_heic': { title: 'Convert JPG to HEIC', subtitle: 'Convert JPG images to high efficiency Apple HEIC photo format.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/jpeg,.jpg,.jpeg', endpoint: '/api/image/jpg-to-heic' },
    'png-to-heic': { title: 'Convert PNG to HEIC', subtitle: 'Convert PNG images to high efficiency Apple HEIC photo format.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/png,.png', endpoint: '/api/image/jpg-to-heic' },
    'png_to_heic': { title: 'Convert PNG to HEIC', subtitle: 'Convert PNG images to high efficiency Apple HEIC photo format.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/png,.png', endpoint: '/api/image/jpg-to-heic' },
    'pdf-to-heic': { title: 'Convert PDF to HEIC', subtitle: 'Convert PDF document pages into compressed Apple HEIC photos.', btnText: 'Select PDF file', dropText: 'or drop PDF file here', actionBtnText: 'Convert to HEIC', multiple: false, accept: 'application/pdf,.pdf', endpoint: '/api/pdf-to-heic' },
    'pdf_to_heic': { title: 'Convert PDF to HEIC', subtitle: 'Convert PDF document pages into compressed Apple HEIC photos.', btnText: 'Select PDF file', dropText: 'or drop PDF file here', actionBtnText: 'Convert to HEIC', multiple: false, accept: 'application/pdf,.pdf', endpoint: '/api/pdf-to-heic' },
    'audio-to-video': { title: 'Audio to Video Converter', subtitle: 'Convert MP3, WAV, AAC audio into MP4 video with cover background.', btnText: 'Select Audio file', dropText: 'or drop Audio file here', actionBtnText: 'Convert to Video', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'audio_to_video': { title: 'Audio to Video Converter', subtitle: 'Convert MP3, WAV, AAC audio into MP4 video with cover background.', btnText: 'Select Audio file', dropText: 'or drop Audio file here', actionBtnText: 'Convert to Video', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },

    // Advanced Image Tools (rembg, upscale, crop, rotate, watermark)
    'remove-bg': { title: 'Remove Background', subtitle: 'Automatically remove image background using AI with transparent PNG output.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Remove Background', multiple: false, accept: 'image/*', endpoint: '/api/image/remove-bg' },
    'remove_bg': { title: 'Remove Background', subtitle: 'Automatically remove image background using AI with transparent PNG output.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Remove Background', multiple: false, accept: 'image/*', endpoint: '/api/image/remove-bg' },
    'upscale-image': { title: 'Image Upscaler', subtitle: 'Enlarge JPG, PNG, WEBP or HEIC images 2x or 4x with sharp AI detail enhancement.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Upscale Image', multiple: false, accept: 'image/*', endpoint: '/api/image/upscale' },
    'upscale_image': { title: 'Image Upscaler', subtitle: 'Enlarge JPG, PNG, WEBP or HEIC images 2x or 4x with sharp AI detail enhancement.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Upscale Image', multiple: false, accept: 'image/*', endpoint: '/api/image/upscale' },
    'crop-image': { title: 'Crop Image', subtitle: 'Crop JPG, PNG, WEBP, GIF or HEIC images by defining rectangle boundaries in pixels.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Crop Image', multiple: false, accept: 'image/*', endpoint: '/api/image/crop' },
    'crop_image': { title: 'Crop Image', subtitle: 'Crop JPG, PNG, WEBP, GIF or HEIC images by defining rectangle boundaries in pixels.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Crop Image', multiple: false, accept: 'image/*', endpoint: '/api/image/crop' },
    'rotate-image': { title: 'Rotate Image', subtitle: 'Rotate JPG, PNG, WEBP, GIF or HEIC images 90°, 180° or flip horizontally and vertically.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Rotate Image', multiple: false, accept: 'image/*', endpoint: '/api/image/rotate-advanced' },
    'rotate_image': { title: 'Rotate Image', subtitle: 'Rotate JPG, PNG, WEBP, GIF or HEIC images 90°, 180° or flip horizontally and vertically.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Rotate Image', multiple: false, accept: 'image/*', endpoint: '/api/image/rotate-advanced' },
    'remove-watermark': { title: 'Remove Watermark', subtitle: 'Erase watermarks, logos and text objects from JPG, PNG, WEBP or HEIC images.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Remove Watermark', multiple: false, accept: 'image/*', endpoint: '/api/image/remove-watermark' },
    'remove_watermark': { title: 'Remove Watermark', subtitle: 'Erase watermarks, logos and text objects from JPG, PNG, WEBP or HEIC images.', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Remove Watermark', multiple: false, accept: 'image/*', endpoint: '/api/image/remove-watermark' },

    'jpeg-compressor': {
        title: 'JPEG Compressor',
        subtitle: 'Compress JPG/JPEG images with fine quality control.',
        multiple: true,
        accept: 'image/jpeg,.jpg,.jpeg',
        endpoint: '/api/image/compress-jpeg'
    },
    'jpeg_compressor': {
        title: 'JPEG Compressor',
        subtitle: 'Compress JPG/JPEG images with fine quality control.',
        multiple: true,
        accept: 'image/jpeg,.jpg,.jpeg',
        endpoint: '/api/image/compress-jpeg'
    },
    'png-compressor': {
        title: 'PNG Compressor',
        subtitle: 'Lossless and lossy compression for PNG image files.',
        multiple: true,
        accept: 'image/png,.png',
        endpoint: '/api/image/compress-png'
    },
    'png_compressor': {
        title: 'PNG Compressor',
        subtitle: 'Lossless and lossy compression for PNG image files.',
        multiple: true,
        accept: 'image/png,.png',
        endpoint: '/api/image/compress-png'
    },
    'webp-compressor': {
        title: 'WEBP Compressor',
        subtitle: 'Re-encode and compress WEBP images for web performance.',
        multiple: true,
        accept: 'image/webp,.webp',
        endpoint: '/api/image/compress-webp'
    },
    'webp_compressor': {
        title: 'WEBP Compressor',
        subtitle: 'Re-encode and compress WEBP images for web performance.',
        multiple: true,
        accept: 'image/webp,.webp',
        endpoint: '/api/image/compress-webp'
    },
    'svg-compressor': {
        title: 'SVG Compressor',
        subtitle: 'Optimize, clean and minify vector SVG graphics.',
        multiple: true,
        accept: '.svg,image/svg+xml',
        endpoint: '/api/image/compress-svg'
    },
    'svg_compressor': {
        title: 'SVG Compressor',
        subtitle: 'Optimize, clean and minify vector SVG graphics.',
        multiple: true,
        accept: '.svg,image/svg+xml',
        endpoint: '/api/image/compress-svg'
    },
    'mp3-compressor': {
        title: 'MP3 Compressor',
        subtitle: 'Re-encode MP3 audio files to lower bitrates and smaller sizes.',
        multiple: true,
        accept: 'audio/mp3,audio/mpeg,.mp3',
        endpoint: '/api/audio/compress-mp3'
    },
    'mp3_compressor': {
        title: 'MP3 Compressor',
        subtitle: 'Re-encode MP3 audio files to lower bitrates and smaller sizes.',
        multiple: true,
        accept: 'audio/mp3,audio/mpeg,.mp3',
        endpoint: '/api/audio/compress-mp3'
    },
    'wav-compressor': {
        title: 'WAV Compressor',
        subtitle: 'Compress uncompressed WAV audio into high fidelity MP3/AAC.',
        multiple: true,
        accept: 'audio/wav,audio/x-wav,.wav',
        endpoint: '/api/audio/compress-wav'
    },
    'wav_compressor': {
        title: 'WAV Compressor',
        subtitle: 'Compress uncompressed WAV audio into high fidelity MP3/AAC.',
        multiple: true,
        accept: 'audio/wav,audio/x-wav,.wav',
        endpoint: '/api/audio/compress-wav'
    },
    'gif-compressor': {
        title: 'GIF Compressor',
        subtitle: 'Reduce animated GIF file sizes with palette optimization.',
        multiple: true,
        accept: 'image/gif,.gif',
        endpoint: '/api/gif/compress-gif'
    },
    'gif_compressor': {
        title: 'GIF Compressor',
        subtitle: 'Reduce animated GIF file sizes with palette optimization.',
        multiple: true,
        accept: 'image/gif,.gif',
        endpoint: '/api/gif/compress-gif'
    },

    'image-converter': {
        title: 'Image Converter',
        subtitle: 'Convert images between JPG, PNG, WEBP, GIF, TIFF, BMP, and AVIF.',
        multiple: true,
        accept: 'image/*',
        endpoint: '/api/image/convert'
    },
    'image_converter': {
        title: 'Image Converter',
        subtitle: 'Convert images between JPG, PNG, WEBP, GIF, TIFF, BMP, and AVIF.',
        multiple: true,
        accept: 'image/*',
        endpoint: '/api/image/convert'
    },
    'jif-to-png': {
        title: 'JIF to PNG',
        subtitle: 'Convert JIF and JFIF image variants to high quality PNG.',
        multiple: true,
        accept: 'image/jpeg,image/jfif,.jif,.jfif',
        endpoint: '/api/image/jif-to-png'
    },
    'jif_to_png': {
        title: 'JIF to PNG',
        subtitle: 'Convert JIF and JFIF image variants to high quality PNG.',
        multiple: true,
        accept: 'image/jpeg,image/jfif,.jif,.jfif',
        endpoint: '/api/image/jif-to-png'
    },
    'png-to-svg': {
        title: 'PNG to SVG',
        subtitle: 'Vectorize PNG images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/png',
        endpoint: '/api/image/png-to-svg'
    },
    'png_to_svg': {
        title: 'PNG to SVG',
        subtitle: 'Vectorize PNG images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/png',
        endpoint: '/api/image/png-to-svg'
    },
    'heic-to-jpg': {
        title: 'HEIC to JPG',
        subtitle: 'Convert Apple iPhone HEIC/HEIF photos to universal JPG.',
        multiple: true,
        accept: 'image/heic,image/heif,.heic,.heif',
        endpoint: '/api/image/heic-to-jpg'
    },
    'heic_to_jpg': {
        title: 'HEIC to JPG',
        subtitle: 'Convert Apple iPhone HEIC/HEIF photos to universal JPG.',
        multiple: true,
        accept: 'image/heic,image/heif,.heic,.heif',
        endpoint: '/api/image/heic-to-jpg'
    },
    'heic-to-png': {
        title: 'HEIC to PNG',
        subtitle: 'Convert iPhone HEIC photos to transparent PNG images.',
        multiple: true,
        accept: 'image/heic,image/heif,.heic,.heif',
        endpoint: '/api/image/heic-to-png'
    },
    'heic_to_png': {
        title: 'HEIC to PNG',
        subtitle: 'Convert iPhone HEIC photos to transparent PNG images.',
        multiple: true,
        accept: 'image/heic,image/heif,.heic,.heif',
        endpoint: '/api/image/heic-to-png'
    },
    'svg-converter': {
        title: 'SVG Converter',
        subtitle: 'Convert vector SVG graphics to PNG, JPG, WEBP or PDF.',
        multiple: true,
        accept: '.svg,image/svg+xml',
        endpoint: '/api/image/svg-converter'
    },
    'svg_converter': {
        title: 'SVG Converter',
        subtitle: 'Convert vector SVG graphics to PNG, JPG, WEBP or PDF.',
        multiple: true,
        accept: '.svg,image/svg+xml',
        endpoint: '/api/image/svg-converter'
    },
    'pdf-converter': {
        title: 'PDF Converter',
        subtitle: 'Convert PDF files to and from all major document formats.',
        multiple: true,
        accept: 'application/pdf',
        endpoint: '/api/pdf-converter'
    },
    'pdf_converter': {
        title: 'PDF Converter',
        subtitle: 'Convert PDF files to and from all major document formats.',
        multiple: true,
        accept: 'application/pdf',
        endpoint: '/api/pdf-converter'
    },
    'document-converter': {
        title: 'Document Converter',
        subtitle: 'Convert DOCX, XLSX, PPTX, HTML, and text files to PDF.',
        multiple: true,
        accept: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.html',
        endpoint: '/api/document-converter'
    },
    'document_converter': {
        title: 'Document Converter',
        subtitle: 'Convert DOCX, XLSX, PPTX, HTML, and text files to PDF.',
        multiple: true,
        accept: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.html',
        endpoint: '/api/document-converter'
    },
    'ebook-converter': {
        title: 'Ebook Converter',
        subtitle: 'Convert EPUB, MOBI, AZW3, and HTML ebooks to PDF or TXT.',
        multiple: true,
        accept: '.epub,.mobi,.azw3,.epub+zip',
        endpoint: '/api/ebook-converter'
    },
    'ebook_converter': {
        title: 'Ebook Converter',
        subtitle: 'Convert EPUB, MOBI, AZW3, and HTML ebooks to PDF or TXT.',
        multiple: true,
        accept: '.epub,.mobi,.azw3,.epub+zip',
        endpoint: '/api/ebook-converter'
    },
    'pdf-to-epub': {
        title: 'PDF to EPUB',
        subtitle: 'Convert PDF documents into readable digital EPUB ebooks.',
        multiple: true,
        accept: 'application/pdf',
        endpoint: '/api/pdf-to-epub'
    },
    'pdf_to_epub': {
        title: 'PDF to EPUB',
        subtitle: 'Convert PDF documents into readable digital EPUB ebooks.',
        multiple: true,
        accept: 'application/pdf',
        endpoint: '/api/pdf-to-epub'
    },
    'epub-to-pdf': {
        title: 'EPUB to PDF',
        subtitle: 'Convert EPUB ebooks into formatted PDF documents.',
        multiple: true,
        accept: '.epub,.epub+zip',
        endpoint: '/api/epub-to-pdf'
    },
    'epub_to_pdf': {
        title: 'EPUB to PDF',
        subtitle: 'Convert EPUB ebooks into formatted PDF documents.',
        multiple: true,
        accept: '.epub,.epub+zip',
        endpoint: '/api/epub-to-pdf'
    },
    'heic-to-pdf': {
        title: 'HEIC to PDF',
        subtitle: 'Convert Apple iPhone HEIC photos into a PDF document.',
        multiple: true,
        accept: 'image/heic,image/heif,.heic,.heif',
        endpoint: '/api/heic-to-pdf'
    },
    'heic_to_pdf': {
        title: 'HEIC to PDF',
        subtitle: 'Convert Apple iPhone HEIC photos into a PDF document.',
        multiple: true,
        accept: 'image/heic,image/heif,.heic,.heif',
        endpoint: '/api/heic-to-pdf'
    },
    'video-to-gif': {
        title: 'Video to GIF',
        subtitle: 'Convert any video file into an animated GIF.',
        multiple: true,
        accept: 'video/*',
        endpoint: '/api/gif/convert'
    },
    'video_to_gif': {
        title: 'Video to GIF',
        subtitle: 'Convert any video file into an animated GIF.',
        multiple: true,
        accept: 'video/*',
        endpoint: '/api/gif/convert'
    },
    'mp4-to-gif': {
        title: 'MP4 to GIF',
        subtitle: 'Convert MP4 video clips into high quality GIF animations.',
        multiple: true,
        accept: 'video/mp4,.mp4',
        endpoint: '/api/gif/convert'
    },
    'mp4_to_gif': {
        title: 'MP4 to GIF',
        subtitle: 'Convert MP4 video clips into high quality GIF animations.',
        multiple: true,
        accept: 'video/mp4,.mp4',
        endpoint: '/api/gif/convert'
    },
    'webm-to-gif': {
        title: 'WEBM to GIF',
        subtitle: 'Convert web WEBM videos into animated GIF images.',
        multiple: true,
        accept: 'video/webm,.webm',
        endpoint: '/api/gif/convert'
    },
    'webm_to_gif': {
        title: 'WEBM to GIF',
        subtitle: 'Convert web WEBM videos into animated GIF images.',
        multiple: true,
        accept: 'video/webm,.webm',
        endpoint: '/api/gif/convert'
    },
    'apng-to-gif': {
        title: 'APNG to GIF',
        subtitle: 'Convert APNG animated PNG files to animated GIF format.',
        multiple: true,
        accept: 'image/png,image/apng,.apng',
        endpoint: '/api/gif/convert'
    },
    'apng_to_gif': {
        title: 'APNG to GIF',
        subtitle: 'Convert APNG animated PNG files to animated GIF format.',
        multiple: true,
        accept: 'image/png,image/apng,.apng',
        endpoint: '/api/gif/convert'
    },
    'gif-to-mp4': {
        title: 'GIF to MP4',
        subtitle: 'Convert animated GIF images to smooth MP4 video files.',
        multiple: true,
        accept: 'image/gif,.gif',
        endpoint: '/api/gif/gif-to-mp4'
    },
    'gif_to_mp4': {
        title: 'GIF to MP4',
        subtitle: 'Convert animated GIF images to smooth MP4 video files.',
        multiple: true,
        accept: 'image/gif,.gif',
        endpoint: '/api/gif/gif-to-mp4'
    },
    'gif-to-apng': {
        title: 'GIF to APNG',
        subtitle: 'Convert GIF animations to APNG animated PNG files.',
        multiple: true,
        accept: 'image/gif,.gif',
        endpoint: '/api/gif/convert'
    },
    'gif_to_apng': {
        title: 'GIF to APNG',
        subtitle: 'Convert GIF animations to APNG animated PNG files.',
        multiple: true,
        accept: 'image/gif,.gif',
        endpoint: '/api/gif/convert'
    },
    'image-to-gif': {
        title: 'Image to GIF',
        subtitle: 'Combine multiple images (JPG, PNG, WEBP) into an animated GIF.',
        multiple: true,
        accept: 'image/*',
        endpoint: '/api/gif/image-to-gif'
    },
    'image_to_gif': {
        title: 'Image to GIF',
        subtitle: 'Combine multiple images (JPG, PNG, WEBP) into an animated GIF.',
        multiple: true,
        accept: 'image/*',
        endpoint: '/api/gif/image-to-gif'
    },
    'mov-to-gif': {
        title: 'MOV to GIF',
        subtitle: 'Convert Apple QuickTime MOV videos to animated GIF.',
        multiple: true,
        accept: 'video/quicktime,.mov',
        endpoint: '/api/gif/convert'
    },
    'mov_to_gif': {
        title: 'MOV to GIF',
        subtitle: 'Convert Apple QuickTime MOV videos to animated GIF.',
        multiple: true,
        accept: 'video/quicktime,.mov',
        endpoint: '/api/gif/convert'
    },
    'avi-to-gif': {
        title: 'AVI to GIF',
        subtitle: 'Convert AVI video files into lightweight animated GIFs.',
        multiple: true,
        accept: 'video/x-msvideo,.avi',
        endpoint: '/api/gif/convert'
    },
    'avi_to_gif': {
        title: 'AVI to GIF',
        subtitle: 'Convert AVI video files into lightweight animated GIFs.',
        multiple: true,
        accept: 'video/x-msvideo,.avi',
        endpoint: '/api/gif/convert'
    },

    // 3. Image Conversion & Optimization Tools (Pillow Engine)
    'jpg-to-png': { title: 'Convert JPG to PNG', subtitle: 'Convert JPG images to PNG format with high quality transparency support.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/jpeg,image/jpg', isImage: true, targetFmt: 'png' },
    'jpg_to_png': { title: 'Convert JPG to PNG', subtitle: 'Convert JPG images to PNG format with high quality transparency support.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/jpeg,image/jpg', isImage: true, targetFmt: 'png' },
    'png-to-jpg': { title: 'Convert PNG to JPG', subtitle: 'Convert PNG images to JPG format for smaller file sizes.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/png', isImage: true, targetFmt: 'jpg' },
    'png_to_jpg': { title: 'Convert PNG to JPG', subtitle: 'Convert PNG images to JPG format for smaller file sizes.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/png', isImage: true, targetFmt: 'jpg' },
    'jpg-to-webp': { title: 'Convert JPG to WEBP', subtitle: 'Convert JPG images to next-gen WEBP format for ultra fast web loading.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/jpeg,image/jpg', isImage: true, targetFmt: 'webp' },
    'jpg_to_webp': { title: 'Convert JPG to WEBP', subtitle: 'Convert JPG images to next-gen WEBP format for ultra fast web loading.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/jpeg,image/jpg', isImage: true, targetFmt: 'webp' },
    'png-to-webp': { title: 'Convert PNG to WEBP', subtitle: 'Convert PNG images to WEBP format preserving transparency.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/png', isImage: true, targetFmt: 'webp' },
    'png_to_webp': { title: 'Convert PNG to WEBP', subtitle: 'Convert PNG images to WEBP format preserving transparency.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/png', isImage: true, targetFmt: 'webp' },
    'webp-to-jpg': { title: 'Convert WEBP to JPG', subtitle: 'Convert WEBP images back to standard JPG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'jpg' },
    'webp_to_jpg': { title: 'Convert WEBP to JPG', subtitle: 'Convert WEBP images back to standard JPG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'jpg' },
    'webp-to-png': { title: 'Convert WEBP to PNG', subtitle: 'Convert WEBP images to lossless PNG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'png' },
    'webp_to_png': { title: 'Convert WEBP to PNG', subtitle: 'Convert WEBP images to lossless PNG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'png' },
    'compress-image': { title: 'Compress Image', subtitle: 'Compress JPG, PNG, WEBP, SVG or GIF images with the best quality and file size ratio.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Compress Image', multiple: true, accept: 'image/*', isImage: true, isCompress: true },
    'compress_image': { title: 'Compress Image', subtitle: 'Compress JPG, PNG, WEBP, SVG or GIF images with the best quality and file size ratio.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Compress Image', multiple: true, accept: 'image/*', isImage: true, isCompress: true },
    'resize-image': { title: 'Resize Image', subtitle: 'Resize JPG, PNG, and WEBP images by defining dimensions or percentages.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Resize Image', multiple: true, accept: 'image/*', isImage: true, isResize: true },
    'resize_image': { title: 'Resize Image', subtitle: 'Resize JPG, PNG, and WEBP images by defining dimensions or percentages.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Resize Image', multiple: true, accept: 'image/*', isImage: true, isResize: true },

    // 1. PDF Tools (Supporting both hyphen and underscore IDs)
    'merge_pdf': { title: 'Merge PDF files', subtitle: 'Combine PDFs in the order you want with the easiest PDF merger available.', btnText: 'Select PDF files', dropText: 'or drop PDFs here', actionBtnText: 'Merge PDF', multiple: true, accept: '.pdf' },
    'merge-pdf': { title: 'Merge PDF files', subtitle: 'Combine PDFs in the order you want with the easiest PDF merger available.', btnText: 'Select PDF files', dropText: 'or drop PDFs here', actionBtnText: 'Merge PDF', multiple: true, accept: '.pdf' },
    'split_pdf': { title: 'Split PDF file', subtitle: 'Separate one page or a whole set for easy conversion into independent PDF files.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Split PDF', multiple: false, accept: '.pdf' },
    'split-pdf': { title: 'Split PDF file', subtitle: 'Separate one page or a whole set for easy conversion into independent PDF files.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Split PDF', multiple: false, accept: '.pdf' },
    'compress_pdf': { title: 'Compress PDF file', subtitle: 'Reduce file size while optimizing for maximal PDF quality.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Compress PDF', multiple: false, accept: '.pdf' },
    'compress-pdf': { title: 'Compress PDF file', subtitle: 'Reduce file size while optimizing for maximal PDF quality.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Compress PDF', multiple: false, accept: '.pdf' },
    'pdf_to_word': { title: 'Convert PDF to WORD', subtitle: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to WORD', multiple: false, accept: '.pdf' },
    'pdf-to-word': { title: 'Convert PDF to WORD', subtitle: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to WORD', multiple: false, accept: '.pdf' },
    'pdf_to_powerpoint': { title: 'Convert PDF to POWERPOINT', subtitle: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to POWERPOINT', multiple: false, accept: '.pdf' },
    'pdf-to-powerpoint': { title: 'Convert PDF to POWERPOINT', subtitle: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to POWERPOINT', multiple: false, accept: '.pdf' },
    'pdf_to_excel': { title: 'Convert PDF to EXCEL', subtitle: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to EXCEL', multiple: false, accept: '.pdf' },
    'pdf-to-excel': { title: 'Convert PDF to EXCEL', subtitle: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to EXCEL', multiple: false, accept: '.pdf' },
    'word_to_pdf': { title: 'Convert WORD to PDF', subtitle: 'Make DOC and DOCX files easy to read by converting them to PDF.', btnText: 'Select WORD files', dropText: 'or drop WORD files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.doc,.docx' },
    'word-to-pdf': { title: 'Convert WORD to PDF', subtitle: 'Make DOC and DOCX files easy to read by converting them to PDF.', btnText: 'Select WORD files', dropText: 'or drop WORD files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.doc,.docx' },
    'powerpoint_to_pdf': { title: 'Convert POWERPOINT to PDF', subtitle: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', btnText: 'Select Powerpoint files', dropText: 'or drop Powerpoint files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.ppt,.pptx' },
    'powerpoint-to-pdf': { title: 'Convert POWERPOINT to PDF', subtitle: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', btnText: 'Select Powerpoint files', dropText: 'or drop Powerpoint files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.ppt,.pptx' },
    'excel_to_pdf': { title: 'Convert EXCEL to PDF', subtitle: 'Make EXCEL spreadsheets easy to read by converting them to PDF.', btnText: 'Select EXCEL files', dropText: 'or drop EXCEL files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.xls,.xlsx' },
    'excel-to-pdf': { title: 'Convert EXCEL to PDF', subtitle: 'Make EXCEL spreadsheets easy to read by converting them to PDF.', btnText: 'Select EXCEL files', dropText: 'or drop EXCEL files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.xls,.xlsx' },
    'edit-pdf': { title: 'Edit PDF', subtitle: 'Add text, images, shapes or freehand annotations to a PDF document.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Edit PDF', multiple: false, accept: '.pdf' },
    'pdf_to_jpg': { title: 'Convert PDF to JPG', subtitle: 'Extract all images that are inside a PDF or convert every page into a JPG image.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to JPG', multiple: false, accept: '.pdf' },
    'pdf-to-jpg': { title: 'Convert PDF to JPG', subtitle: 'Extract all images that are inside a PDF or convert every page into a JPG image.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to JPG', multiple: false, accept: '.pdf' },
    'jpg_to_pdf': { title: 'Convert JPG to PDF', subtitle: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PDF', multiple: true, accept: 'image/jpeg,image/png,image/webp' },
    'jpg-to-pdf': { title: 'Convert JPG to PDF', subtitle: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PDF', multiple: true, accept: 'image/jpeg,image/png,image/webp' },
    'sign-pdf': { title: 'Sign PDF', subtitle: 'Sign yourself or request electronic signatures from others.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Sign PDF', multiple: false, accept: '.pdf' },
    'pdf_add_watermark': { title: 'Watermark PDF', subtitle: 'Stamp an image or text over your PDF in seconds. Choose typography, transparency and position.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Watermark', multiple: false, accept: '.pdf' },
    'watermark-pdf': { title: 'Watermark PDF', subtitle: 'Stamp an image or text over your PDF in seconds. Choose typography, transparency and position.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Watermark', multiple: false, accept: '.pdf' },
    'rotate_pdf': { title: 'Rotate PDF', subtitle: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Rotate PDF', multiple: true, accept: '.pdf' },
    'rotate-pdf': { title: 'Rotate PDF', subtitle: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Rotate PDF', multiple: true, accept: '.pdf' },
    'html-to-pdf': { title: 'HTML to PDF Converter', subtitle: 'Convert webpages in HTML to PDF documents with high accuracy.', btnText: 'Select HTML file', dropText: 'or drop HTML file here', actionBtnText: 'Convert to PDF', multiple: false, accept: '.html,.htm' },
    'unlock_pdf': { title: 'Unlock PDF Security', subtitle: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Unlock PDF', multiple: false, accept: '.pdf' },
    'unlock-pdf': { title: 'Unlock PDF Security', subtitle: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Unlock PDF', multiple: false, accept: '.pdf' },
    'protect-pdf': { title: 'Protect PDF file', subtitle: 'Encrypt your PDF files with a password to prevent unauthorized access.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Protect PDF', multiple: false, accept: '.pdf' },
    'organize-pdf': { title: 'Organize PDF', subtitle: 'Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Organize PDF', multiple: false, accept: '.pdf' },
    'convert-pdf-to-pdfa': { title: 'PDF to PDF/A', subtitle: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term archiving.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to PDF/A', multiple: false, accept: '.pdf' },
    'repair-pdf': { title: 'Repair PDF file', subtitle: 'Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Repair PDF', multiple: false, accept: '.pdf' },
    'add_pdf_page_number': { title: 'Page numbers', subtitle: 'Add page numbers into PDFs with ease. Choose position, dimensions, typography.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Page Numbers', multiple: false, accept: '.pdf' },
    'add-pdf-page-number': { title: 'Page numbers', subtitle: 'Add page numbers into PDFs with ease. Choose position, dimensions, typography.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Page Numbers', multiple: false, accept: '.pdf' },
    'scan-pdf': { title: 'Scan to PDF', subtitle: 'Capture document scans from your mobile device and send them instantly to your browser.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Scan to PDF', multiple: false, accept: '.pdf,image/*' },
    'ocr-pdf': { title: 'OCR PDF', subtitle: 'Easily convert scanned PDF into searchable and selectable documents.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Apply OCR', multiple: false, accept: '.pdf' },
    'compare-pdf': { title: 'Compare PDF', subtitle: 'Compare two PDF files side by side and easily spot changes.', btnText: 'Select PDF files', dropText: 'or drop PDFs here', actionBtnText: 'Compare PDFs', multiple: true, accept: '.pdf' },
    'redact-pdf': { title: 'Redact PDF', subtitle: 'Redact text and graphics to permanently remove sensitive information from a PDF.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Redact PDF', multiple: false, accept: '.pdf' },
    'crop-pdf': { title: 'Crop PDF', subtitle: 'Trim margins and crop specific areas of your PDF pages.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Crop PDF', multiple: false, accept: '.pdf' },
    'pdf-forms': { title: 'Fill & Sign Forms', subtitle: 'Fill out interactive PDF forms and sign them easily.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Fill & Sign', multiple: false, accept: '.pdf' },
    'pdf-summarize': { title: 'AI Summarizer', subtitle: 'Summarize long PDF documents instantly with AI.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Summarize with AI', multiple: false, accept: '.pdf' },
    'translate-pdf': { title: 'Translate PDF', subtitle: 'Translate PDF documents into any language instantly.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Translate PDF', multiple: false, accept: '.pdf' },
    'pdf-to-markdown': { title: 'PDF to Markdown', subtitle: 'Convert PDF documents to structured Markdown text.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to Markdown', multiple: false, accept: '.pdf' },

    // 2. Media & Social Tools
    'youtube-to-mp3': { title: 'YouTube to MP3 Converter', subtitle: 'Convert and download YouTube videos to MP3 audio in 320kbps for FREE.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'youtube-to-mp4': { title: 'YouTube to MP4 Converter', subtitle: 'Convert and download YouTube videos in 1080p Full HD, 720p, 480p, 360p, 2K and 4K MP4 format.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'youtube-shorts-downloader': { title: 'YouTube Shorts Downloader', subtitle: 'Download YouTube Shorts videos in MP4 HD or convert to MP3 audio in 1-click.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'youtube-shorts-to-mp3': { title: 'YouTube Shorts to MP3 Converter', subtitle: 'Extract high quality MP3 audio from YouTube Shorts.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'youtube-shorts-to-mp4': { title: 'YouTube Shorts to MP4 Converter', subtitle: 'Download YouTube Shorts in 1080p Full HD MP4 video.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'spotify-to-mp3': { title: 'Spotify to MP3 Converter', subtitle: 'Convert and download Spotify tracks, albums, and playlists to MP3 in 320kbps for FREE.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'tiktok-downloader': { title: 'TikTok Video Downloader', subtitle: 'Download TikTok videos without watermark in HD MP4 or convert to MP3 audio.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'tiktok-mp3-mp4': { title: 'TikTok HD Video & MP3 Downloader', subtitle: 'Download TikTok videos without watermark in HD MP4 or extract MP3 audio.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-downloader': { title: 'Instagram Video & Reels Downloader', subtitle: 'Download Instagram Reels, IGTV videos and posts in high quality MP4 format.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-photos': { title: 'Instagram Photos & Carousel Downloader', subtitle: 'Download Instagram photos, carousels, and multi-image posts in original HD resolution.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-stories': { title: 'Instagram Stories & Highlights Downloader', subtitle: 'Download Instagram Stories, Highlights, and profiles anonymously.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'soundcloud-to-mp3': { title: 'SoundCloud to MP3 Downloader', subtitle: 'Download SoundCloud tracks and playlists to high quality 320kbps MP3 audio.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'vimeo-downloader': { title: 'Vimeo Video Downloader', subtitle: 'Download Vimeo videos in 1080p Full HD, 720p, 480p MP4 format.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'video-to-mp3': { title: 'Video to MP3 Converter', subtitle: 'Upload local MP4, MKV, AVI, MOV videos and convert them to MP3 audio.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'video_to_mp3': { title: 'Video to MP3 Converter', subtitle: 'Upload local MP4, MKV, AVI, MOV videos and convert them to MP3 audio.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'compress-video': { title: 'Compress Video', subtitle: 'Reduce MP4 video size while preserving visual quality.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Compress Video', multiple: false, accept: 'video/*', isCompress: true, endpoint: '/api/compress-video' },
    'compress_video': { title: 'Compress Video', subtitle: 'Reduce MP4 video size while preserving visual quality.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Compress Video', multiple: false, accept: 'video/*', isCompress: true, endpoint: '/api/compress-video' },
    'audio-converter': { title: 'Audio Converter', subtitle: 'Convert audio files between MP3, WAV, AAC, M4A, FLAC, and OGG formats.', btnText: 'Select Audio files', dropText: 'or drop Audio files here', actionBtnText: 'Convert Audio', multiple: true, accept: 'audio/*', endpoint: '/api/audio-converter' },
    'audio_converter': { title: 'Audio Converter', subtitle: 'Convert audio files between MP3, WAV, AAC, M4A, FLAC, and OGG formats.', btnText: 'Select Audio files', dropText: 'or drop Audio files here', actionBtnText: 'Convert Audio', multiple: true, accept: 'audio/*', endpoint: '/api/audio-converter' },
    'youtube-downloader': { title: 'YouTube Video Downloader', subtitle: 'Download YouTube videos, shorts, and playlists in any format and quality.', isYoutube: true, type: 'mp4', defaultQuality: '720p' },
    'youtube-audio': { title: 'YouTube Audio Extractor', subtitle: 'Extract high quality audio streams from YouTube music, podcasts and lectures.', isYoutube: true, type: 'mp3', defaultQuality: '320k' }
};

// Global App State
let currentState = {
    activeTool: null,
    files: [], // Array of File objects or page objects
    pageRotations: {}, // page index -> rotation angle
    watermarkText: 'iLovePDF',
    watermarkPos: 'center',
    pageNumberPos: 'bottom-right',
    protectPassword: '',
    translateLang: 'pt'
};

document.addEventListener('DOMContentLoaded', () => {
    initCategoryFilter();
    initSearchFilter();
    initLinksAndRouting();
    initDragAndDropGlobal();
});

// Category Filter Logic (Home Page Pills)
function initCategoryFilter() {
    const filterTags = document.querySelectorAll('.tools__filter .tag');
    const toolItems = document.querySelectorAll('.tools__item');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            const filter = tag.getAttribute('data-filter');

            toolItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter || (filter === 'workflows' && (category === 'organize' || category === 'convert'))) {
                    item.classList.remove('hidden-card');
                } else {
                    item.classList.add('hidden-card');
                }
            });
        });
    });
}

// Live Search Filter Logic
function initSearchFilter() {
    const searchInput = document.getElementById('tool-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const toolItems = document.querySelectorAll('.tools__item');

        toolItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.classList.remove('hidden-card');
            } else {
                item.classList.add('hidden-card');
            }
        });
    });
}

// Navigation & Routing Setup
function initLinksAndRouting() {
    // Intercept clicks on links that point to ilovepdf tools or internal routes
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (href) {
            // Check if logo clicked -> return home
            if (link.classList.contains('brand') || href === 'https://www.ilovepdf.com/' || href === '/' || href === '#' || href === 'index.html') {
                e.preventDefault();
                showHomePage();
                return;
            }

            // Extract tool key from href
            let cleanHref = href.replace('https://www.ilovepdf.com/', '').replace('#', '').replace('.html', '').replace('/', '');
            
            // Check matching tools
            for (const toolId in TOOLS_DB) {
                const alt1 = toolId.replace(/_/g, '-');
                const alt2 = toolId.replace(/-/g, '_');
                if (cleanHref === toolId || cleanHref === alt1 || cleanHref === alt2 || href.includes(toolId) || href.includes(alt1) || href.includes(alt2)) {
                    e.preventDefault();
                    openToolView(toolId);
                    return;
                }
            }
        }
    });

    // Listen for browser hash changes
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '');
        if (hash && TOOLS_DB[hash]) {
            openToolView(hash);
        } else if (!hash) {
            showHomePage();
        }
    });

    // Check page data-tool attribute or pathname or hash on startup
    const pageTool = document.body.getAttribute('data-tool');
    const hash = window.location.hash.replace('#', '');
    const pathname = window.location.pathname.replace('/', '').replace('.html', '');

    if (pageTool && TOOLS_DB[pageTool]) {
        openToolView(pageTool);
    } else if (hash && TOOLS_DB[hash]) {
        openToolView(hash);
    } else if (pathname && TOOLS_DB[pathname]) {
        openToolView(pathname);
    }
}

// Show Home Page
function showHomePage() {
    currentState.activeTool = null;
    currentState.files = [];
    window.location.hash = '';
    document.body.classList.remove('toolpage-active');

    const mainContainer = document.querySelector('.main');
    if (!mainContainer) return;

    const toolViewEl = document.getElementById('dynamic-tool-view');
    if (toolViewEl) {
        toolViewEl.remove();
    }

    const homeTitle = document.querySelector('.home-title');
    const toolsContainer = document.querySelector('.tools');
    if (homeTitle) homeTitle.style.display = 'block';
    if (toolsContainer) toolsContainer.style.display = 'block';
}

// Open Specific Tool View Page (Matching Screenshot 1)
function openToolView(toolId) {
    const toolConfig = TOOLS_DB[toolId];
    if (!toolConfig) return;

    currentState.activeTool = toolId;
    currentState.files = [];
    window.location.hash = toolId;

    const mainContainer = document.querySelector('.main');
    if (!mainContainer) return;

    document.body.classList.add('toolpage-active');
    const homeTitle = document.querySelector('.home-title');
    const toolsContainer = document.querySelector('.tools');
    if (homeTitle) homeTitle.style.display = 'none';
    if (toolsContainer) toolsContainer.style.display = 'none';

    // Remove existing tool view
    let toolViewEl = document.getElementById('dynamic-tool-view');
    if (toolViewEl) toolViewEl.remove();

    toolViewEl = document.createElement('div');
    toolViewEl.id = 'dynamic-tool-view';
    toolViewEl.className = 'tool-view-page';

    // YouTube / Media Specific Workspace
    if (toolConfig.isYoutube) {
        toolViewEl.innerHTML = `
            <div class="tool-view-header">
                <h1>${toolConfig.title}</h1>
                <p>${toolConfig.subtitle}</p>
            </div>
            <div class="yt-input-wrapper">
                <input type="url" id="yt-url-input" class="yt-url-input" placeholder="Paste YouTube link here (e.g. https://www.youtube.com/watch?v=...)">
                <button class="btn-select-files" id="btn-yt-start" style="font-size:16px; padding:12px 24px;">Start / Convert</button>
            </div>
            <div id="yt-card-container" style="width:100%; display:flex; justify-content:center;"></div>
            <div id="workspace-content" style="width:100%; margin-top:24px;"></div>
        `;

        mainContainer.appendChild(toolViewEl);

        const btnStart = document.getElementById('btn-yt-start');
        btnStart.addEventListener('click', async () => {
            const urlInput = document.getElementById('yt-url-input')?.value.trim();
            if (!urlInput) {
                alert('Please enter a valid YouTube video URL');
                return;
            }

            showProcessing('Fetching YouTube video details...');
            try {
                const res = await fetch(`http://localhost:5000/api/youtube/info?url=${encodeURIComponent(urlInput)}`);
                hideProcessing();
                if (!res.ok) throw new Error('Could not fetch video info');
                const data = await res.json();

                const container = document.getElementById('yt-card-container');
                const isMp3 = toolConfig.type === 'mp3';
                const optionsHTML = isMp3 ? `
                    <option value="320k">MP3 320 kbps (Best Quality)</option>
                    <option value="256k">MP3 256 kbps (High Quality)</option>
                    <option value="192k">MP3 192 kbps (Standard Quality)</option>
                    <option value="128k">MP3 128 kbps (Basic Quality)</option>
                ` : `
                    <option value="1080p">MP4 1080p (Full HD)</option>
                    <option value="720p">MP4 720p (HD)</option>
                    <option value="480p">MP4 480p (SD)</option>
                    <option value="360p">MP4 360p (Small)</option>
                    <option value="2160p (4K)">MP4 2160p (4K Ultra HD)</option>
                `;

                container.innerHTML = `
                    <div class="yt-video-card">
                        <img src="${data.thumbnail}" class="yt-video-thumb" alt="Thumbnail">
                        <div class="yt-video-title">${data.title}</div>
                        <select id="yt-quality-select" class="yt-quality-select">
                            ${optionsHTML}
                        </select>
                        <button class="btn-select-files" id="btn-yt-download-now" style="width:100%;">
                            Download ${isMp3 ? 'MP3 Audio' : 'MP4 Video'}
                        </button>
                    </div>
                `;

                document.getElementById('btn-yt-download-now').addEventListener('click', async () => {
                    const selectedQuality = document.getElementById('yt-quality-select').value;
                    showProcessing(`Converting and downloading YouTube video in ${selectedQuality}...`);
                    try {
                        const formData = new FormData();
                        formData.append('url', urlInput);
                        formData.append('format_type', toolConfig.type);
                        formData.append('quality', selectedQuality);

                        const dlRes = await fetch('http://localhost:5000/api/youtube/download', { method: 'POST', body: formData });
                        if (!dlRes.ok) throw new Error('Download failed');
                        const blob = await dlRes.blob();
                        const ext = isMp3 ? 'mp3' : 'mp4';
                        showResultScreen(blob, `youtube_converted.${ext}`, `YouTube video converted to ${ext.toUpperCase()} (${selectedQuality})!`);
                    } catch(err) {
                        hideProcessing();
                        alert('Error converting YouTube video. Please try again.');
                    }
                });

            } catch (err) {
                hideProcessing();
                alert('Could not retrieve YouTube video info. Please verify the URL.');
            }
        });

        return;
    }

    // Create Tool View Workspace
    toolViewEl = document.createElement('div');
    toolViewEl.id = 'dynamic-tool-view';
    toolViewEl.className = 'tool-view-page';

    toolViewEl.innerHTML = `
        <div class="tool-view-header">
            <h1>${toolConfig.title}</h1>
            <p>${toolConfig.subtitle}</p>
        </div>
        <div class="tool-upload-box" id="upload-box">
            <div class="upload-button-wrapper">
                <label class="btn-select-files">
                    ${toolConfig.btnText}
                    <input type="file" id="file-input" ${toolConfig.multiple ? 'multiple' : ''} accept="${toolConfig.accept}" style="display:none;">
                </label>
                <div class="cloud-drive-buttons">
                    <div class="cloud-btn" title="Add from Google Drive">
                        <svg viewBox="0 0 24 24"><path d="M12.01 1.485L3.52 16.19h5.18l8.49-14.705h-5.18zm6.47 4.195l-4.24 7.35 4.24 7.35h5.18l-4.24-7.35 4.24-7.35h-5.18zM2.87 17.34l-2.6 4.5h17.84l2.6-4.5H2.87z"/></svg>
                    </div>
                    <div class="cloud-btn" title="Add from Dropbox">
                        <svg viewBox="0 0 24 24"><path d="M6 2l-6 3.9 6 3.9 6-3.9-6-3.9zm12 0l-6 3.9 6 3.9 6-3.9-6-3.9zM0 13.7l6 3.9 6-3.9-6-3.9-6 3.9zm24 0l-6-3.9-6 3.9 6 3.9 6-3.9zM6 18.9l6 3.9 6-3.9-6-3.9-6 3.9z"/></svg>
                    </div>
                </div>
            </div>
            <div class="dropzone-text">${toolConfig.dropText || "or drop file here"}</div>
        </div>
        <div id="workspace-content" style="width:100%; display:none;"></div>
    `;

    mainContainer.appendChild(toolViewEl);

    // Event listener for file selection
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (e) => {
        handleFilesSelected(Array.from(e.target.files));
    });

    initDragAndDropZone(toolViewEl);
}

// Drag & Drop Handling
function initDragAndDropGlobal() {
    window.addEventListener('dragover', e => e.preventDefault());
    window.addEventListener('drop', e => e.preventDefault());
}

function initDragAndDropZone(dropZone) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            handleFilesSelected(Array.from(e.dataTransfer.files));
        }
    });
}

// File Selection Handler
async function handleFilesSelected(newFiles) {
    if (!newFiles || newFiles.length === 0) return;

    currentState.files = [...currentState.files, ...newFiles];

    // Hide upload box, show workspace content
    const uploadBox = document.getElementById('upload-box');
    const workspaceContent = document.getElementById('workspace-content');
    if (uploadBox) uploadBox.style.display = 'none';
    if (workspaceContent) workspaceContent.style.display = 'block';

    renderWorkspace();
}

// Render Workspace Grid & Sidebar
async function renderWorkspace() {
    const workspaceContent = document.getElementById('workspace-content');
    if (!workspaceContent) return;

    const toolConfig = TOOLS_DB[currentState.activeTool];

    workspaceContent.innerHTML = `
        <div class="workspace-container">
            <div class="files-preview-grid" id="preview-grid">
                <div style="grid-column: 1/-1; text-align:center; padding:40px; color:#707078;">
                    <div class="spinner-red" style="margin: 0 auto 16px auto;"></div>
                    Rendering file previews...
                </div>
            </div>
            <div class="workspace-sidebar">
                <div class="sidebar-title">${toolConfig.title}</div>
                ${getSidebarOptionsHTML(currentState.activeTool)}
                <button class="btn-action-primary" id="btn-process-action">
                    ${toolConfig.actionBtnText}
                </button>
                <label class="btn-add-more">
                    + Add more files
                    <input type="file" id="file-input-more" ${toolConfig.multiple ? 'multiple' : ''} accept="${toolConfig.accept}" style="display:none;">
                </label>
                <div class="back-to-home-link" onclick="showHomePage()">← Back to all tools</div>
            </div>
        </div>
    `;

    // Handle add more files
    const fileInputMore = document.getElementById('file-input-more');
    if (fileInputMore) {
        fileInputMore.addEventListener('change', (e) => {
            handleFilesSelected(Array.from(e.target.files));
        });
    }

    // Process button click
    const btnProcess = document.getElementById('btn-process-action');
    if (btnProcess) {
        btnProcess.addEventListener('click', executePDFAction);
    }

    // Render Preview Cards
    const previewGrid = document.getElementById('preview-grid');
    previewGrid.innerHTML = '';

    for (let i = 0; i < currentState.files.length; i++) {
        const file = currentState.files[i];
        const card = document.createElement('div');
        card.className = 'file-thumb-card';

        const nameEl = document.createElement('div');
        nameEl.className = 'file-thumb-name';
        nameEl.textContent = file.name;

        const actionsEl = document.createElement('div');
        actionsEl.className = 'file-thumb-actions';
        actionsEl.innerHTML = `
            <div class="btn-thumb-action" title="Rotate 90°" onclick="rotatePage(${i})">↻</div>
            <div class="btn-thumb-action" title="Remove" onclick="removeFile(${i})">✕</div>
        `;

        const canvas = document.createElement('canvas');

        card.appendChild(actionsEl);
        card.appendChild(canvas);
        card.appendChild(nameEl);
        previewGrid.appendChild(card);

        // Render PDF page 1 canvas if PDF, or image if Image
        if (file.type.includes('pdf')) {
            renderPDFPageToCanvas(file, canvas, currentState.pageRotations[i] || 0);
        } else if (file.type.includes('image')) {
            renderImageToCanvas(file, canvas);
        } else {
            // Text or document fallback icon
            canvas.width = 120;
            canvas.height = 160;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#e6e6ec';
            ctx.fillRect(0, 0, 120, 160);
            ctx.fillStyle = '#333';
            ctx.font = '14px sans-serif';
            ctx.fillText(file.name.split('.').pop().toUpperCase(), 40, 90);
        }
    }
}

// Render Tool Specific Sidebar Settings Options
function getSidebarOptionsHTML(toolId) {

    if (toolId.includes('translate')) {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Original Language (From):</label>
                <select class="sidebar-select" id="option-source-lang">
                    <option value="auto">Auto-Detect</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                </select>
            </div>
            <div class="sidebar-group">
                <label class="sidebar-label">Translate To (Target):</label>
                <select class="sidebar-select" id="option-target-lang">
                    <option value="pt">🇵🇹 Português</option>
                    <option value="en">🇬🇧 English</option>
                    <option value="es">🇪🇸 Español</option>
                    <option value="fr">🇫🇷 Français</option>
                    <option value="de">🇩🇪 Deutsch</option>
                    <option value="it">🇮🇹 Italiano</option>
                    <option value="zh-CN">🇨🇳 Chinese</option>
                    <option value="ja">🇯🇵 Japanese</option>
                </select>
            </div>
        `;
    } else 
    if (toolId.includes('upscale')) {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Fator de Ampliação (Upscale):</label>
                <select class="sidebar-select" id="option-upscale-factor">
                    <option value="2">2x (Double Resolution)</option>
                    <option value="4">4x (Ultra HD 4K Resolution)</option>
                </select>
            </div>
        `;
    } else if (toolId.includes('rotate') && !toolId.includes('pdf')) {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Ângulo de Rotação:</label>
                <select class="sidebar-select" id="option-rotate-angle-img">
                    <option value="90">90° à Direita</option>
                    <option value="180">180° Inverter</option>
                    <option value="270">270° à Esquerda</option>
                    <option value="0">0° Sem Rotação</option>
                </select>
            </div>
            <div class="sidebar-group">
                <label class="sidebar-label">Espelhar (Flip):</label>
                <select class="sidebar-select" id="option-rotate-flip-img">
                    <option value="none">Nenhum</option>
                    <option value="horizontal">Horizontal (Espelho)</option>
                    <option value="vertical">Vertical</option>
                </select>
            </div>
        `;
    } else if (toolId === 'rotate_pdf') {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Rotation Angle:</label>
                <select class="sidebar-select" id="option-rotate-angle">
                    <option value="90">90° Right</option>
                    <option value="180">180° Flip</option>
                    <option value="270">270° Left</option>
                </select>
            </div>
        `;
    } else if (toolId === 'pdf_add_watermark') {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Watermark Text:</label>
                <input type="text" class="sidebar-input" id="option-watermark-text" value="iLovePDF Confidential">
            </div>
            <div class="sidebar-group">
                <label class="sidebar-label">Position:</label>
                <select class="sidebar-select" id="option-watermark-pos">
                    <option value="center">Center</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="top-left">Top Left</option>
                </select>
            </div>
        `;
    } else if (toolId === 'add_pdf_page_number') {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Page Number Position:</label>
                <select class="sidebar-select" id="option-pagenum-pos">
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-center">Bottom Center</option>
                    <option value="top-right">Top Right</option>
                </select>
            </div>
        `;
    } else if (toolId === 'protect-pdf') {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Set Password:</label>
                <input type="password" class="sidebar-input" id="option-protect-pass" placeholder="Enter security password">
            </div>
        `;
    } else if (toolId === 'translate-pdf') {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Translate To:</label>
                <select class="sidebar-select" id="option-translate-lang">
                    <option value="pt">Português</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                </select>
            </div>
        `;
    } else if (toolId.includes('compress')) {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label" style="font-weight:600; color:#161616;">Nível de Compressão (Didático):</label>
                <select class="sidebar-select" id="option-compress-level" onchange="const tg = document.getElementById('target-size-wrapper'); if(tg) tg.style.display = this.value === 'custom_target' ? 'block' : 'none';">
                    <option value="recommended">⭐ Compressão Recomendada (~70% menor)</option>
                    <option value="low">🔹 Baixa Compressão (Alta Qualidade)</option>
                    <option value="extreme">🔥 Alta Compressão (Menor Tamanho)</option>
                    <option value="custom_target">🎯 Tamanho Alvo Personalizado (MB)</option>
                </select>
            </div>
            <div class="sidebar-group" id="target-size-wrapper" style="display:none; margin-top:12px;">
                <label class="sidebar-label">Tamanho Máximo Desejado (MB):</label>
                <input type="number" step="0.1" class="sidebar-input" id="option-target-size-mb" placeholder="Ex: 2.0" value="2.0">
                <span style="font-size:12px; color:#707078; margin-top:4px; display:block;">
                    O motor otimizará o arquivo para não ultrapassar este tamanho.
                </span>
            </div>
        `;
    }
    return '';
}

// Remove File from list
window.removeFile = function(index) {
    currentState.files.splice(index, 1);
    if (currentState.files.length === 0) {
        openToolView(currentState.activeTool);
    } else {
        renderWorkspace();
    }
};

// Rotate single card
window.rotatePage = function(index) {
    const current = currentState.pageRotations[index] || 0;
    currentState.pageRotations[index] = (current + 90) % 360;
    renderWorkspace();
};

// Render PDF Page to Canvas via PDF.js
async function renderPDFPageToCanvas(file, canvas, rotationAngle = 0) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 0.3, rotation: rotationAngle });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport: viewport }).promise;
    } catch (err) {
        console.error('Error rendering PDF preview:', err);
    }
}

// Render Image to Canvas
function renderImageToCanvas(file, canvas) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const aspect = img.width / img.height;
            canvas.width = 120;
            canvas.height = 120 / aspect;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Processing Modal Indicator
function showProcessing(message = 'Processing your document...') {
    const modal = document.createElement('div');
    modal.id = 'processing-modal';
    modal.className = 'processing-modal';
    modal.innerHTML = `
        <div class="processing-card">
            <div class="spinner-red"></div>
            <h3 style="color:#161616; font-size:20px;">${message}</h3>
            <p style="color:#707078; font-size:14px;">Please wait while we perform your PDF task.</p>
        </div>
    `;
    document.body.appendChild(modal);
}

function hideProcessing() {
    const modal = document.getElementById('processing-modal');
    if (modal) modal.remove();
}

// Show Final Success Result Screen
function showResultScreen(blob, filename, titleText = 'File processed successfully!') {
    hideProcessing();

    const uploadBox = document.getElementById('upload-box');
    if (uploadBox) uploadBox.style.display = 'none';

    const ytWrapper = document.querySelector('.yt-input-wrapper');
    if (ytWrapper) ytWrapper.style.display = 'none';

    const ytCard = document.getElementById('yt-card-container');
    if (ytCard) ytCard.style.display = 'none';

    const workspaceContent = document.getElementById('workspace-content');
    if (!workspaceContent) return;

    workspaceContent.style.display = 'block';

    const downloadUrl = URL.createObjectURL(blob);

    // Auto-trigger browser download
    const tempAnchor = document.createElement('a');
    tempAnchor.href = downloadUrl;
    tempAnchor.download = filename;
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    tempAnchor.remove();

    workspaceContent.innerHTML = `
        <div class="result-view">
            <h2>${titleText}</h2>
            <a href="${downloadUrl}" download="${filename}" class="btn-download-big">
                Download File
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            </a>
            <div style="margin-top: 16px;">
                <span class="back-to-home-link" onclick="openToolView(currentState.activeTool)">← Process another file</span>
                <span style="margin: 0 12px; color:#c2c2cc;">|</span>
                <span class="back-to-home-link" onclick="showHomePage()">Back to All Tools</span>
            </div>
        </div>
    `;
}

// Execute PDF Actions using Backend API or Client Fallback
async function executePDFAction() {
    if (currentState.files.length === 0) return;

    showProcessing('Processing PDF document...');
    const tool = currentState.activeTool;
    const BACKEND_URL = 'http://localhost:5000';

    try {
        // Try Universal Endpoint Fetch First
        const toolConfig = TOOLS_DB[tool];
        if (toolConfig && toolConfig.endpoint) {
            const formData = new FormData();
            if (toolConfig.multiple) {
                currentState.files.forEach(f => formData.append('files', f));
            }
            formData.append('file', currentState.files[0]);

            const scaleFactor = document.getElementById('option-upscale-factor')?.value;
            if (scaleFactor) formData.append('scale', scaleFactor);

            const rotateAngle = document.getElementById('option-rotate-angle-img')?.value;
            if (rotateAngle) formData.append('angle', rotateAngle);

            const flipVal = document.getElementById('option-rotate-flip-img')?.value;
            if (flipVal) formData.append('flip', flipVal);

            const compressLevel = document.getElementById('option-compress-level')?.value;
            if (compressLevel) formData.append('mode', compressLevel);

            const targetSizeMb = document.getElementById('option-target-size-mb')?.value;
            if (targetSizeMb) formData.append('target_size_mb', targetSizeMb);

            const srcLang = document.getElementById('option-source-lang')?.value;
            if (srcLang) formData.append('source_lang', srcLang);
            const tgtLang = document.getElementById('option-target-lang')?.value;
            if (tgtLang) formData.append('target_lang', tgtLang);

            const res = await fetch(`${BACKEND_URL}${toolConfig.endpoint}`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                const contentDisp = res.headers.get('Content-Disposition') || '';
                let filename = `${tool}_output`;
                const match = contentDisp.match(/filename=(.+)/);
                if (match) filename = match[1].replace(/"/g, '');

                showResultScreen(blob, filename, `${toolConfig.title} completed successfully!`);
                return;
            }
        }

        // Try Server-side FastAPI Engine First
        if (tool === 'pdf_to_word') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/pdf-to-word`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_converted.docx', 'PDF converted to WORD (.docx) successfully!');
                return;
            }
        }
        else if (tool === 'merge_pdf') {
            const formData = new FormData();
            currentState.files.forEach(f => formData.append('files', f));
            const res = await fetch(`${BACKEND_URL}/api/merge`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_merged.pdf', 'PDFs merged successfully!');
                return;
            }
        }
        else if (tool === 'split_pdf') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/split`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_split.zip', 'PDF pages split into ZIP file!');
                return;
            }
        }
        else if (tool === 'compress_pdf') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/compress`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_compressed.pdf', 'PDF compressed successfully!');
                return;
            }
        }
        else if (tool === 'jpg_to_pdf') {
            const formData = new FormData();
            currentState.files.forEach(f => formData.append('files', f));
            const res = await fetch(`${BACKEND_URL}/api/jpg-to-pdf`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_converted.pdf', 'Images converted to PDF!');
                return;
            }
        }
        else if (tool === 'pdf_to_jpg') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/pdf-to-jpg`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_images.zip', 'PDF pages extracted to JPG!');
                return;
            }
        }
        else if (tool === 'rotate_pdf') {
            const angleVal = parseInt(document.getElementById('option-rotate-angle')?.value || '90');
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            formData.append('angle', angleVal);
            const res = await fetch(`${BACKEND_URL}/api/rotate`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_rotated.pdf', 'PDF pages rotated!');
                return;
            }
        }
        else if (tool === 'protect-pdf') {
            const pass = document.getElementById('option-protect-pass')?.value || '1234';
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            formData.append('password', pass);
            const res = await fetch(`${BACKEND_URL}/api/protect`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_protected.pdf', 'PDF encrypted with password!');
                return;
            }
        }
        else if (tool === 'unlock_pdf') {
            const pass = document.getElementById('option-protect-pass')?.value || '';
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            formData.append('password', pass);
            const res = await fetch(`${BACKEND_URL}/api/unlock`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'ilovepdf_unlocked.pdf', 'PDF unlocked!');
                return;
            }
        }
        else if (tool === 'pdf-summarize' || tool === 'pdf-to-markdown') {
            const mode = tool === 'pdf-summarize' ? 'summary' : 'markdown';
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            formData.append('mode', mode);
            const res = await fetch(`${BACKEND_URL}/api/extract-text`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                const ext = mode === 'summary' ? 'md' : 'md';
                showResultScreen(blob, `summary.${ext}`, 'Text extracted & processed!');
                return;
            }
        }
    } catch (e) {
        console.warn('Backend API unavailable, falling back to Client Engine:', e);
    }

    // Client-side Fallback Engine
    try {
        const { PDFDocument, degrees, rgb, StandardFonts } = window.PDFLib;
        if (tool === 'merge_pdf') {
            const mergedPdf = await PDFDocument.create();
            for (let i = 0; i < currentState.files.length; i++) {
                const fileBuffer = await currentState.files[i].arrayBuffer();
                const pdf = await PDFDocument.load(fileBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            showResultScreen(blob, 'ilovepdf_merged.pdf', 'PDFs merged successfully!');
        } else {
            const fileBuffer = await currentState.files[0].arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBuffer);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            showResultScreen(blob, 'ilovepdf_processed.pdf', 'Document processed successfully!');
        }
    } catch (err) {
        console.error('Error processing PDF:', err);
        hideProcessing();
        alert('An error occurred while processing the PDF file.');
    }
}

// Auto-initialize routing on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLinksAndRouting);
} else {
    initLinksAndRouting();
}

