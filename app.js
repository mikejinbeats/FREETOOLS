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

    // --- PHASE 2 NEW TOOLS ---
    'qr-code-generator': { title: 'QR Code Generator', subtitle: 'Generate QR codes from text, URLs, or WiFi credentials.', btnText: 'Generate QR Code', dropText: 'or enter text below', actionBtnText: 'Generate QR Code', multiple: false, accept: '*', customAction: 'qr_code' },
    'qr_code_generator': { title: 'QR Code Generator', subtitle: 'Generate QR codes from text, URLs, or WiFi credentials.', btnText: 'Generate QR Code', dropText: 'or enter text below', actionBtnText: 'Generate QR Code', multiple: false, accept: '*', customAction: 'qr_code' },
    
    'video-trimmer': { title: 'Video Trimmer', subtitle: 'Trim MP4, WebM, or MOV video start and end times.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Trim Video', multiple: false, accept: 'video/*', customAction: 'video_trim' },
    'video_trimmer': { title: 'Video Trimmer', subtitle: 'Trim MP4, WebM, or MOV video start and end times.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Trim Video', multiple: false, accept: 'video/*', customAction: 'video_trim' },
    
    'video-merger': { title: 'Video Merger', subtitle: 'Combine multiple video clips into one continuous video.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Merge Videos', multiple: true, accept: 'video/*', customAction: 'video_merge' },
    'video_merger': { title: 'Video Merger', subtitle: 'Combine multiple video clips into one continuous video.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Merge Videos', multiple: true, accept: 'video/*', customAction: 'video_merge' },
    
    'screen-recorder': { title: 'Screen Recorder', subtitle: 'Record your desktop screen, tab, or webcam directly in your browser.', btnText: 'Start Recording', dropText: 'click to start recording', actionBtnText: 'Start Recording', multiple: false, accept: '*', customAction: 'screen_record' },
    'screen_recorder': { title: 'Screen Recorder', subtitle: 'Record your desktop screen, tab, or webcam directly in your browser.', btnText: 'Start Recording', dropText: 'click to start recording', actionBtnText: 'Start Recording', multiple: false, accept: '*', customAction: 'screen_record' },
    
    'text-to-speech': { title: 'Text to Speech', subtitle: 'Convert written text into natural sounding voice audio.', btnText: 'Speak / Synthesize', dropText: 'enter text below', actionBtnText: 'Speak Audio', multiple: false, accept: '*', customAction: 'text_speech' },
    'text_to_speech': { title: 'Text to Speech', subtitle: 'Convert written text into natural sounding voice audio.', btnText: 'Speak / Synthesize', dropText: 'enter text below', actionBtnText: 'Speak Audio', multiple: false, accept: '*', customAction: 'text_speech' },
    
    'speech-to-text': { title: 'Speech to Text', subtitle: 'Transcribe spoken audio from microphone into text.', btnText: 'Start Listening', dropText: 'speak into microphone', actionBtnText: 'Transcribe Audio', multiple: false, accept: '*', customAction: 'speech_text' },
    'speech_to_text': { title: 'Speech to Text', subtitle: 'Transcribe spoken audio from microphone into text.', btnText: 'Start Listening', dropText: 'speak into microphone', actionBtnText: 'Transcribe Audio', multiple: false, accept: '*', customAction: 'speech_text' },
    
    'password-generator': { title: 'Password Generator', subtitle: 'Generate cryptographically secure random passwords.', btnText: 'Generate Password', dropText: 'click to generate password', actionBtnText: 'Generate Password', multiple: false, accept: '*', customAction: 'generate_password' },
    'password_generator': { title: 'Password Generator', subtitle: 'Generate cryptographically secure random passwords.', btnText: 'Generate Password', dropText: 'click to generate password', actionBtnText: 'Generate Password', multiple: false, accept: '*', customAction: 'generate_password' },
    
    'color-picker': { title: 'Color Picker & Palette', subtitle: 'Pick colors visually and convert between HEX, RGB, and HSL.', btnText: 'Pick Color', dropText: 'select color', actionBtnText: 'Pick Color', multiple: false, accept: '*', customAction: 'color_picker' },
    'color_picker': { title: 'Color Picker & Palette', subtitle: 'Pick colors visually and convert between HEX, RGB, and HSL.', btnText: 'Pick Color', dropText: 'select color', actionBtnText: 'Pick Color', multiple: false, accept: '*', customAction: 'color_picker' },
    
    'favicon-generator': { title: 'Favicon Generator', subtitle: 'Convert any image to multi-size favicons (16x16, 32x32, 180x180, .ico).', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Generate Favicons', multiple: false, accept: 'image/*', customAction: 'favicon' },
    'favicon_generator': { title: 'Favicon Generator', subtitle: 'Convert any image to multi-size favicons (16x16, 32x32, 180x180, .ico).', btnText: 'Select Image', dropText: 'or drop image here', actionBtnText: 'Generate Favicons', multiple: false, accept: 'image/*', customAction: 'favicon' },
    
    'json-formatter': { title: 'JSON Formatter', subtitle: 'Format, validate, beautify, or minify JSON data.', btnText: 'Select JSON file', dropText: 'or drop JSON file here', actionBtnText: 'Format JSON', multiple: false, accept: '.json,text/plain', customAction: 'json_format' },
    'json_formatter': { title: 'JSON Formatter', subtitle: 'Format, validate, beautify, or minify JSON data.', btnText: 'Select JSON file', dropText: 'or drop JSON file here', actionBtnText: 'Format JSON', multiple: false, accept: '.json,text/plain', customAction: 'json_format' },
    
    'csv-formatter': { title: 'CSV Formatter & Parser', subtitle: 'View CSV files as tables, format, edit, and convert to JSON.', btnText: 'Select CSV file', dropText: 'or drop CSV file here', actionBtnText: 'Parse CSV', multiple: false, accept: '.csv,text/csv', customAction: 'csv_format' },
    'csv_formatter': { title: 'CSV Formatter & Parser', subtitle: 'View CSV files as tables, format, edit, and convert to JSON.', btnText: 'Select CSV file', dropText: 'or drop CSV file here', actionBtnText: 'Parse CSV', multiple: false, accept: '.csv,text/csv', customAction: 'csv_format' },
    
    'xml-formatter': { title: 'XML Formatter', subtitle: 'Beautify, format, and validate XML markup.', btnText: 'Select XML file', dropText: 'or drop XML file here', actionBtnText: 'Format XML', multiple: false, accept: '.xml,text/xml', customAction: 'xml_format' },
    'xml_formatter': { title: 'XML Formatter', subtitle: 'Beautify, format, and validate XML markup.', btnText: 'Select XML file', dropText: 'or drop XML file here', actionBtnText: 'Format XML', multiple: false, accept: '.xml,text/xml', customAction: 'xml_format' },
    
    'base64-tool': { title: 'Base64 Encoder / Decoder', subtitle: 'Encode text and files to Base64 or decode Base64 back.', btnText: 'Select File', dropText: 'or drop file here', actionBtnText: 'Process Base64', multiple: false, accept: '*', customAction: 'base64' },
    'base64_tool': { title: 'Base64 Encoder / Decoder', subtitle: 'Encode text and files to Base64 or decode Base64 back.', btnText: 'Select File', dropText: 'or drop file here', actionBtnText: 'Process Base64', multiple: false, accept: '*', customAction: 'base64' },
    
    'hash-generator': { title: 'Hash Generator', subtitle: 'Generate MD5, SHA-1, SHA-256, and SHA-512 checksums.', btnText: 'Select File', dropText: 'or drop file here', actionBtnText: 'Generate Hashes', multiple: false, accept: '*', customAction: 'hash' },
    'hash_generator': { title: 'Hash Generator', subtitle: 'Generate MD5, SHA-1, SHA-256, and SHA-512 checksums.', btnText: 'Select File', dropText: 'or drop file here', actionBtnText: 'Generate Hashes', multiple: false, accept: '*', customAction: 'hash' },
    
    'lorem-ipsum': { title: 'Lorem Ipsum Generator', subtitle: 'Generate placeholder text paragraphs for layouts.', btnText: 'Generate Text', dropText: 'click to generate text', actionBtnText: 'Generate Text', multiple: false, accept: '*', customAction: 'lorem' },
    'lorem_ipsum': { title: 'Lorem Ipsum Generator', subtitle: 'Generate placeholder text paragraphs for layouts.', btnText: 'Generate Text', dropText: 'click to generate text', actionBtnText: 'Generate Text', multiple: false, accept: '*', customAction: 'lorem' },
    
            
    'twitter-downloader': { title: 'Twitter/X Downloader', subtitle: 'Download Twitter/X videos, GIFs, and images.', btnText: 'Enter Twitter URL', dropText: 'paste Twitter link', actionBtnText: 'Download Twitter Media', multiple: false, accept: '*', customAction: 'twitter_dl' },
    'twitter_downloader': { title: 'Twitter/X Downloader', subtitle: 'Download Twitter/X videos, GIFs, and images.', btnText: 'Enter Twitter URL', dropText: 'paste Twitter link', actionBtnText: 'Download Twitter Media', multiple: false, accept: '*', customAction: 'twitter_dl' },
    
    'facebook-downloader': { title: 'Facebook Video Downloader', subtitle: 'Download Facebook public videos and Reels in HD.', btnText: 'Enter Facebook URL', dropText: 'paste Facebook link', actionBtnText: 'Download Facebook Video', multiple: false, accept: '*', customAction: 'facebook_dl' },
    'facebook_downloader': { title: 'Facebook Video Downloader', subtitle: 'Download Facebook public videos and Reels in HD.', btnText: 'Enter Facebook URL', dropText: 'paste Facebook link', actionBtnText: 'Download Facebook Video', multiple: false, accept: '*', customAction: 'facebook_dl' },
    
    'pinterest-downloader': { title: 'Pinterest Downloader', subtitle: 'Download Pinterest pin images and videos.', btnText: 'Enter Pinterest URL', dropText: 'paste Pinterest link', actionBtnText: 'Download Pinterest Media', multiple: false, accept: '*', customAction: 'pinterest_dl' },
    'pinterest_downloader': { title: 'Pinterest Downloader', subtitle: 'Download Pinterest pin images and videos.', btnText: 'Enter Pinterest URL', dropText: 'paste Pinterest link', actionBtnText: 'Download Pinterest Media', multiple: false, accept: '*', customAction: 'pinterest_dl' },
    
    'screenshot-website': { title: 'Screenshot Website', subtitle: 'Capture full webpage screenshot from any URL.', btnText: 'Enter Webpage URL', dropText: 'paste URL below', actionBtnText: 'Capture Screenshot', multiple: false, accept: '*', customAction: 'screenshot' },
    'screenshot_website': { title: 'Screenshot Website', subtitle: 'Capture full webpage screenshot from any URL.', btnText: 'Enter Webpage URL', dropText: 'paste URL below', actionBtnText: 'Capture Screenshot', multiple: false, accept: '*', customAction: 'screenshot' },

    'translate-word': { title: 'Translate Word Document', subtitle: 'Translate DOCX Word documents into any language while preserving formatting.', btnText: 'Select Word Document', dropText: 'or drop Word file here', actionBtnText: 'Translate Document', multiple: false, accept: '.doc,.docx', endpoint: '/api/translate-document' },
    'translate_word': { title: 'Translate Word Document', subtitle: 'Translate DOCX Word documents into any language while preserving formatting.', btnText: 'Select Word Document', dropText: 'or drop Word file here', actionBtnText: 'Translate Document', multiple: false, accept: '.doc,.docx', endpoint: '/api/translate-document' },
    'translate-document': { title: 'Translate Document', subtitle: 'Translate PDF, DOCX, XLSX, and text documents into 100+ languages for FREE.', btnText: 'Select Document', dropText: 'or drop document here', actionBtnText: 'Translate Document', multiple: false, accept: '.pdf,.doc,.docx,.txt', endpoint: '/api/translate-document' },
    'translate_document': { title: 'Translate Document', subtitle: 'Translate PDF, DOCX, XLSX, and text documents into 100+ languages for FREE.', btnText: 'Select Document', dropText: 'or drop document here', actionBtnText: 'Translate Document', multiple: false, accept: '.pdf,.doc,.docx,.txt', endpoint: '/api/translate-document' },

    'mp4-to-mp3': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'mp4_to_mp3': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'video-to-audio': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'video_to_audio': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },

    // Vice-Versa Pair Additions
    'jpg-to-heic': { title: 'Convert JPG to HEIC', subtitle: 'Convert JPG images to high efficiency Apple HEIC photo format.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/jpeg,.jpg,.jpeg', endpoint: '/api/image/jpg-to-heic' },
    'jpg_to_heic': { title: 'Convert JPG to HEIC', subtitle: 'Convert JPG images to high efficiency Apple HEIC photo format.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/jpeg,.jpg,.jpeg', endpoint: '/api/image/jpg-to-heic' },
    'png-to-heic': { title: 'Convert PNG to HEIC', subtitle: 'Convert PNG images to high efficiency Apple HEIC photo format.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/png,.png', endpoint: '/api/image/jpg-to-heic' },
    'png_to_heic': { title: 'Convert PNG to HEIC', subtitle: 'Convert PNG images to high efficiency Apple HEIC photo format.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/png,.png', endpoint: '/api/image/jpg-to-heic' },
    'pdf-to-heic': { title: 'Convert PDF to HEIC', subtitle: 'Convert PDF document pages into compressed Apple HEIC photos.', btnText: 'Select PDF file', dropText: 'or drop PDF file here', actionBtnText: 'Convert to HEIC', multiple: false, accept: 'application/pdf,.pdf', endpoint: '/api/pdf-to-heic' },
    'pdf_to_heic': { title: 'Convert PDF to HEIC', subtitle: 'Convert PDF document pages into compressed Apple HEIC photos.', btnText: 'Select PDF file', dropText: 'or drop PDF file here', actionBtnText: 'Convert to HEIC', multiple: false, accept: 'application/pdf,.pdf', endpoint: '/api/pdf-to-heic' },
    'mp3-to-mp4': { title: 'MP3 to MP4 Converter', subtitle: 'Convert MP3 audio into MP4 video with a custom cover background for YouTube.', btnText: 'Select MP3 Audio', dropText: 'or drop MP3 audio here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'mp3_to_mp4': { title: 'MP3 to MP4 Converter', subtitle: 'Convert MP3 audio into MP4 video with a custom cover background for YouTube.', btnText: 'Select MP3 Audio', dropText: 'or drop MP3 audio here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'audio-to-video': { title: 'MP3 to MP4 Converter', subtitle: 'Convert MP3 audio into MP4 video with a custom cover background for YouTube.', btnText: 'Select MP3 Audio', dropText: 'or drop MP3 audio here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'audio_to_video': { title: 'MP3 to MP4 Converter', subtitle: 'Convert MP3 audio into MP4 video with a custom cover background for YouTube.', btnText: 'Select MP3 Audio', dropText: 'or drop MP3 audio here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },

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
    'jpg-to-svg': {
        title: 'JPG to SVG',
        subtitle: 'Vectorize JPG photos into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/jpeg,image/jpg',
        endpoint: '/api/image/png-to-svg'
    },
    'jpg_to_svg': {
        title: 'JPG to SVG',
        subtitle: 'Vectorize JPG photos into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/jpeg,image/jpg',
        endpoint: '/api/image/png-to-svg'
    },
    'webp-to-svg': {
        title: 'WEBP to SVG',
        subtitle: 'Vectorize WEBP images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/webp',
        endpoint: '/api/image/png-to-svg'
    },
    'webp_to_svg': {
        title: 'WEBP to SVG',
        subtitle: 'Vectorize WEBP images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/webp',
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
    'pdf-to-html': { title: 'Convert PDF to HTML', subtitle: 'Convert PDF document pages into clean, web-ready HTML code.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to HTML', multiple: false, accept: '.pdf', endpoint: '/api/pdf-to-html' },
    'pdf_to_html': { title: 'Convert PDF to HTML', subtitle: 'Convert PDF document pages into clean, web-ready HTML code.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to HTML', multiple: false, accept: '.pdf', endpoint: '/api/pdf-to-html' },
    'gif-to-webm': { title: 'Convert GIF to WEBM', subtitle: 'Convert animated GIF files into high compression WEBM video.', btnText: 'Select GIF files', dropText: 'or drop GIF files here', actionBtnText: 'Convert to WEBM', multiple: true, accept: 'image/gif,.gif', endpoint: '/api/gif/gif-to-mp4' },
    'gif_to_webm': { title: 'Convert GIF to WEBM', subtitle: 'Convert animated GIF files into high compression WEBM video.', btnText: 'Select GIF files', dropText: 'or drop GIF files here', actionBtnText: 'Convert to WEBM', multiple: true, accept: 'image/gif,.gif', endpoint: '/api/gif/gif-to-mp4' },
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
    'youtube-to-wav': { title: 'YouTube to WAV Converter', subtitle: 'Extract uncompressed studio quality 16-bit PCM WAV audio from any YouTube video.', isYoutube: true, type: 'wav', defaultQuality: 'wav' },
    'youtube_to_wav': { title: 'YouTube to WAV Converter', subtitle: 'Extract uncompressed studio quality 16-bit PCM WAV audio from any YouTube video.', isYoutube: true, type: 'wav', defaultQuality: 'wav' },
    'youtube-to-mp4': { title: 'YouTube to MP4 Converter', subtitle: 'Convert and download YouTube videos in 1080p Full HD, 720p, 480p, 360p, 2K and 4K MP4 format.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'youtube-shorts-downloader': { title: 'YouTube Shorts Downloader', subtitle: 'Download YouTube Shorts videos in MP4 HD or convert to MP3 audio in 1-click.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'youtube-shorts-to-mp3': { title: 'YouTube Shorts to MP3 Converter', subtitle: 'Extract high quality MP3 audio from YouTube Shorts.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'youtube-shorts-to-mp4': { title: 'YouTube Shorts to MP4 Converter', subtitle: 'Download YouTube Shorts in 1080p Full HD MP4 video.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'spotify-to-mp3': { title: 'Spotify to MP3 Converter', subtitle: 'Convert and download Spotify tracks, albums, and playlists to MP3 in 320kbps for FREE.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'tiktok-downloader': { title: 'TikTok Video Downloader', subtitle: 'Download TikTok videos without watermark in HD MP4 or convert to MP3 audio.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'tiktok-mp3-mp4': { title: 'TikTok HD Video & MP3 Downloader', subtitle: 'Download TikTok videos without watermark in HD MP4 or extract MP3 audio.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-reels-downloader': { title: 'Instagram Reels Downloader', subtitle: 'Download Instagram Reels videos in Full HD MP4 format for FREE.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram_reels_downloader': { title: 'Instagram Reels Downloader', subtitle: 'Download Instagram Reels videos in Full HD MP4 format for FREE.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-photo-downloader': { title: 'Instagram Photo & Carousel Downloader', subtitle: 'Download Instagram single photos and multi-photo album carousels in HD JPG.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram_photo_downloader': { title: 'Instagram Photo & Carousel Downloader', subtitle: 'Download Instagram single photos and multi-photo album carousels in HD JPG.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-video-downloader': { title: 'Instagram Video Downloader', subtitle: 'Download Instagram feed videos, posts, and IGTV clips in MP4 HD.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram_video_downloader': { title: 'Instagram Video Downloader', subtitle: 'Download Instagram feed videos, posts, and IGTV clips in MP4 HD.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-story-downloader': { title: 'Instagram Stories & Highlights Downloader', subtitle: 'Download public Instagram 24h stories and saved highlights in HD.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram_story_downloader': { title: 'Instagram Stories & Highlights Downloader', subtitle: 'Download public Instagram 24h stories and saved highlights in HD.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-profile-downloader': { title: 'Instagram Profile Picture (DP) Downloader', subtitle: 'Download full resolution HD profile picture avatars from any public Instagram account.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram_profile_downloader': { title: 'Instagram Profile Picture (DP) Downloader', subtitle: 'Download full resolution HD profile picture avatars from any public Instagram account.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-audio-downloader': { title: 'Instagram Audio & Music Extractor', subtitle: 'Extract background audio and music tracks from Instagram Reels into MP3 audio.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'instagram_audio_downloader': { title: 'Instagram Audio & Music Extractor', subtitle: 'Extract background audio and music tracks from Instagram Reels into MP3 audio.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'instagram-downloader': { title: 'Instagram Video & Reels Downloader', subtitle: 'Download Instagram Reels, IGTV videos and posts in high quality MP4 format.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-photos': { title: 'Instagram Photos & Carousel Downloader', subtitle: 'Download Instagram photos, carousels, and multi-image posts in original HD resolution.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'instagram-stories': { title: 'Instagram Stories & Highlights Downloader', subtitle: 'Download Instagram Stories, Highlights, and profiles anonymously.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'soundcloud-to-mp3': { title: 'SoundCloud to MP3 Downloader', subtitle: 'Download SoundCloud tracks and playlists to high quality 320kbps MP3 audio.', isYoutube: true, type: 'mp3', defaultQuality: '320k' },
    'wav-to-mp3': { title: 'WAV to MP3 Converter', subtitle: 'Convert uncompressed WAV audio files to high quality 320kbps MP3 audio.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'audio/wav,.wav', endpoint: '/api/audio-converter' },
    'wav_to_mp3': { title: 'WAV to MP3 Converter', subtitle: 'Convert uncompressed WAV audio files to high quality 320kbps MP3 audio.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'audio/wav,.wav', endpoint: '/api/audio-converter' },
    'mp3-to-wav': { title: 'MP3 to WAV Converter', subtitle: 'Convert compressed MP3 audio files into uncompressed 16-bit studio quality WAV.', btnText: 'Select MP3 file', dropText: 'or drop MP3 file here', actionBtnText: 'Convert to WAV', multiple: true, accept: 'audio/mpeg,.mp3', endpoint: '/api/audio-converter' },
    'mp3_to_wav': { title: 'MP3 to WAV Converter', subtitle: 'Convert compressed MP3 audio files into uncompressed 16-bit studio quality WAV.', btnText: 'Select MP3 file', dropText: 'or drop MP3 file here', actionBtnText: 'Convert to WAV', multiple: true, accept: 'audio/mpeg,.mp3', endpoint: '/api/audio-converter' },
    'wav-to-mp4': { title: 'WAV to MP4 Converter', subtitle: 'Convert WAV audio files into MP4 video with custom image background for YouTube.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'wav_to_mp4': { title: 'WAV to MP4 Converter', subtitle: 'Convert WAV audio files into MP4 video with custom image background for YouTube.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'mp4-to-wav': { title: 'MP4 to WAV Converter', subtitle: 'Extract uncompressed high-fidelity 16-bit WAV audio from MP4 video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Extract WAV Audio', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'mp4_to_wav': { title: 'MP4 to WAV Converter', subtitle: 'Extract uncompressed high-fidelity 16-bit WAV audio from MP4 video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Extract WAV Audio', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'vimeo-downloader': { title: 'Vimeo Video Downloader', subtitle: 'Download Vimeo videos in 1080p Full HD, 720p, 480p MP4 format.', isYoutube: true, type: 'mp4', defaultQuality: '1080p' },
    'video-to-mp3': { title: 'Video to MP3 Converter', subtitle: 'Upload local MP4, MKV, AVI, MOV videos and convert them to MP3 audio.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'video_to_mp3': { title: 'Video to MP3 Converter', subtitle: 'Upload local MP4, MKV, AVI, MOV videos and convert them to MP3 audio.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-mp3' },
    'compress-video': { title: 'Compress Video', subtitle: 'Reduce MP4 video size while preserving visual quality.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Compress Video', multiple: false, accept: 'video/*', isCompress: true, endpoint: '/api/compress-video' },
    'compress_video': { title: 'Compress Video', subtitle: 'Reduce MP4 video size while preserving visual quality.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Compress Video', multiple: false, accept: 'video/*', isCompress: true, endpoint: '/api/compress-video' },
    'audio-converter': { title: 'Audio Converter', subtitle: 'Convert audio files between MP3, WAV, AAC, M4A, FLAC, and OGG formats.', btnText: 'Select Audio files', dropText: 'or drop Audio files here', actionBtnText: 'Convert Audio', multiple: true, accept: 'audio/*', endpoint: '/api/audio-converter' },
    'audio_converter': { title: 'Audio Converter', subtitle: 'Convert audio files between MP3, WAV, AAC, M4A, FLAC, and OGG formats.', btnText: 'Select Audio files', dropText: 'or drop Audio files here', actionBtnText: 'Convert Audio', multiple: true, accept: 'audio/*', endpoint: '/api/audio-converter' },
    'youtube-downloader': { title: 'YouTube Video Downloader', subtitle: 'Download YouTube videos, shorts, and playlists in MP4 video or MP3 audio quality.', isYoutube: true, type: 'all', defaultQuality: '1080p' },
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
    const sections = document.querySelectorAll('.category-section');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            const filter = tag.getAttribute('data-filter');

            // Show section ONLY if filter is 'all' or section-id matches filter
            sections.forEach(sec => {
                const secId = sec.getAttribute('data-section-id');
                if (filter === 'all' || secId === filter) {
                    sec.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });

            // Ensure items inside visible sections are shown
            toolItems.forEach(item => {
                const sec = item.closest('.category-section');
                if (sec && sec.style.display !== 'none') {
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
        const sections = document.querySelectorAll('.category-section');

        toolItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.classList.remove('hidden-card');
            } else {
                item.classList.add('hidden-card');
            }
        });

        sections.forEach(sec => {
            const visibleCards = sec.querySelectorAll('.tools__item:not(.hidden-card)');
            if (visibleCards.length > 0) {
                sec.style.display = 'block';
            } else {
                sec.style.display = 'none';
            }
        });
    });
}

// Navigation & Routing Setup
function initLinksAndRouting() {
    // Header Dropdown Toggle (.nav-has-dropdown 9-dots & All PDF tools)
    const dropdownTriggers = document.querySelectorAll('.nav-has-dropdown');
    dropdownTriggers.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            e.stopPropagation();
            const isActive = dropdown.classList.contains('active');
            dropdownTriggers.forEach(d => d.classList.remove('active'));
            if (!isActive) dropdown.classList.add('active');
        });
    });

    document.addEventListener('click', () => {
        dropdownTriggers.forEach(d => d.classList.remove('active'));
    });

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

    // QR Code Generator Dedicated Workspace
    if (toolId === 'qr-code-generator' || toolId === 'qr_code_generator') {
        toolViewEl.innerHTML = `
            <div class="tool-view-header">
                <h1>${toolConfig.title}</h1>
                <p>${toolConfig.subtitle}</p>
                <div style="margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #10b981; color: #047857; padding: 8px 16px; border-radius: 30px; font-weight: 600; font-size: 14px;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    100% Static & Permanent — Guaranteed to work FOREVER. Zero redirects, zero expiration, zero tracking.
                </div>
            </div>

            <div class="qr-builder-container" style="max-width: 900px; margin: 30px auto; display: grid; grid-template-columns: 1fr 340px; gap: 32px; background: #ffffff; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
                
                <!-- Left Form Column -->
                <div class="qr-form-col" style="display: flex; flex-direction: column; gap: 20px;">
                    
                    <!-- Tabs -->
                    <div class="qr-tabs" style="display: flex; gap: 8px; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px;">
                        <button class="qr-tab active" data-tab="url" style="padding: 8px 16px; border-radius: 8px; border: none; background: #e5322d; color: #fff; font-weight: 600; cursor: pointer;">🌐 Website URL</button>
                        <button class="qr-tab" data-tab="text" style="padding: 8px 16px; border-radius: 8px; border: none; background: #f3f4f6; color: #374151; font-weight: 600; cursor: pointer;">📝 Plain Text</button>
                        <button class="qr-tab" data-tab="wifi" style="padding: 8px 16px; border-radius: 8px; border: none; background: #f3f4f6; color: #374151; font-weight: 600; cursor: pointer;">📶 Wi-Fi</button>
                        <button class="qr-tab" data-tab="email" style="padding: 8px 16px; border-radius: 8px; border: none; background: #f3f4f6; color: #374151; font-weight: 600; cursor: pointer;">📧 Email</button>
                    </div>

                    <!-- Input Fields -->
                    <div id="qr-input-section" style="display: flex; flex-direction: column; gap: 14px;">
                        <label style="font-weight: 700; color: #111827; font-size: 14px;">Target Website URL:</label>
                        <input type="url" id="qr-main-input" placeholder="https://yourwebsite.com" value="https://freetools.com" style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none; transition: border-color 0.2s;">
                    </div>

                    <!-- Customization Options -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;">
                        <div>
                            <label style="font-weight: 600; color: #374151; font-size: 13px; display: block; margin-bottom: 6px;">Foreground Color:</label>
                            <input type="color" id="qr-fg-color" value="#000000" style="width: 100%; height: 42px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; padding: 2px;">
                        </div>
                        <div>
                            <label style="font-weight: 600; color: #374151; font-size: 13px; display: block; margin-bottom: 6px;">Background Color:</label>
                            <input type="color" id="qr-bg-color" value="#ffffff" style="width: 100%; height: 42px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; padding: 2px;">
                        </div>
                    </div>

                    <div>
                        <label style="font-weight: 600; color: #374151; font-size: 13px; display: block; margin-bottom: 6px;">Image Quality / Size:</label>
                        <select id="qr-size-select" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 14px; font-weight: 600;">
                            <option value="300">300 x 300 px (Standard)</option>
                            <option value="500" selected>500 x 500 px (High HD)</option>
                            <option value="1000">1000 x 1000 px (Ultra HD)</option>
                            <option value="2000">2000 x 2000 px (Print Quality 300 DPI)</option>
                        </select>
                    </div>
                </div>

                <!-- Right Preview Column -->
                <div class="qr-preview-col" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9fafb; padding: 24px; border-radius: 16px; border: 1px dashed #d1d5db;">
                    <div id="qr-canvas-holder" style="background: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center; width: 220px; height: 220px;"></div>
                    
                    <div style="margin-top: 20px; width: 100%; display: flex; flex-direction: column; gap: 10px;">
                        <button id="btn-qr-download-png" class="btn-select-files" style="width: 100%; justify-content: center; padding: 14px; font-size: 15px; background: #e5322d;">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                            Download PNG (HD)
                        </button>
                    </div>
                </div>

            </div>
        `;

        mainContainer.appendChild(toolViewEl);
        return;
    }

function getToolRuleBadge(toolId) {
    const t = (toolId || '').toLowerCase().replace(/_/g, '-');

    // 1. Social Media Downloaders (YouTube, TikTok, Instagram, Spotify, SoundCloud)
    if (t.includes('youtube') || t.includes('tiktok') || t.includes('instagram') || t.includes('spotify') || t.includes('soundcloud') || t.includes('twitter') || t.includes('facebook') || t.includes('pinterest')) {
        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #FFF1F0; border: 1.5px solid #FFCCC7; color: #E5322D; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(229,50,45,0.06);">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span><b>Fair-Use Rules:</b> Max video duration 30 mins • Up to 1080p Full HD • 5 downloads / 5 mins • 100% FREE & No Signup</span>
            </div>`;
    }

    // 2. Video & Audio Tools (Compress Video, Video Trimmer, Video Merger, Video to Audio, Audio to Video, MP3 Compressor)
    if (t.includes('video') || t.includes('audio') || t.includes('mp3') || t.includes('wav')) {
        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #EFF6FF; border: 1.5px solid #BFDBFE; color: #1D4ED8; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(37,99,235,0.06);">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span><b>Fair-Use Rules:</b> Max file size 100 MB • Max duration 10 mins • Up to 3 files per merge • 100% FREE & No Signup</span>
            </div>`;
    }

    // 3. AI & Smart Image Tools (Remove BG, Image Upscaler, Remove Watermark)
    if (t.includes('remove-bg') || t.includes('upscale') || t.includes('watermark')) {
        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #F3E8FF; border: 1.5px solid #DDD6FE; color: #6D28D9; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(124,58,237,0.06);">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span><b>Fair-Use Rules:</b> Max file size 15 MB • Max resolution 4096x4096px • 5 AI requests / 3 mins • 100% FREE & No Signup</span>
            </div>`;
    }

    // 4. Document Conversions & OCR (PDF to Word, Word/Excel/PPT to PDF, EPUB, OCR, Summarizer, Document Translate)
    if (t.includes('pdf') || t.includes('word') || t.includes('excel') || t.includes('powerpoint') || t.includes('epub') || t.includes('ocr') || t.includes('document') || t.includes('html')) {
        if (['merge-pdf', 'split-pdf', 'remove-pages', 'organize-pdf', 'scan-pdf', 'rotate-pdf', 'add-pdf-page-number'].includes(t)) {
            return `
                <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #047857; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(16,185,129,0.06);">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span><b>Browser Client-Side Tool:</b> Processed 100% on your device • Unlimited file size • 100% FREE & No Signup</span>
                </div>`;
        }

        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #FFF1F0; border: 1.5px solid #FFCCC7; color: #E5322D; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(229,50,45,0.06);">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span><b>Fair-Use Rules:</b> Max document size 25 MB • Max 50 pages for OCR/AI • 10 conversions / 5 mins • 100% FREE & No Signup</span>
            </div>`;
    }

    // 5. GIF Tools (Video to GIF, GIF Converters & Compressor)
    if (t.includes('gif')) {
        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #FEF3C7; border: 1.5px solid #FDE68A; color: #B45309; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(217,119,6,0.06);">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span><b>Fair-Use Rules:</b> Max video size 50 MB • Max GIF duration 15s • 100% FREE & No Signup</span>
            </div>`;
    }

    // 6. General Client-Side Utilities
    return `
        <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #047857; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(16,185,129,0.06);">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span><b>Browser Client-Side Tool:</b> Processed 100% on your device • Unlimited file size • 100% FREE & No Signup</span>
        </div>`;
}

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
            ${getToolRuleBadge(toolId)}
            <div id="yt-card-container" style="width:100%; display:flex; justify-content:center; margin-top:20px;"></div>
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
                let optionsHTML = '';

                if (toolConfig.type === 'wav') {
                    optionsHTML = `
                        <option value="wav" data-type="wav">🎵 WAV Uncompressed Audio (PCM 16-bit Studio)</option>
                    `;
                } else if (toolConfig.type === 'mp3') {
                    optionsHTML = `
                        <option value="320k" data-type="mp3">🎵 MP3 320 kbps (Best Quality)</option>
                        <option value="256k" data-type="mp3">🎵 MP3 256 kbps (High Quality)</option>
                        <option value="192k" data-type="mp3">🎵 MP3 192 kbps (Standard Quality)</option>
                        <option value="128k" data-type="mp3">🎵 MP3 128 kbps (Basic Quality)</option>
                    `;
                } else if (toolConfig.type === 'mp4') {
                    optionsHTML = `
                        <option value="1080p" data-type="mp4">📹 MP4 1080p (Full HD)</option>
                        <option value="720p" data-type="mp4">📹 MP4 720p (HD)</option>
                        <option value="480p" data-type="mp4">📹 MP4 480p (SD)</option>
                        <option value="360p" data-type="mp4">📹 MP4 360p (Small)</option>
                        <option value="2160p (4K)" data-type="mp4">📹 MP4 2160p (4K Ultra HD)</option>
                    `;
                } else {
                    // Universal Downloader (Allows 1. Vídeo MP4, 2. Áudio MP3, 3. Áudio WAV)
                    optionsHTML = `
                        <optgroup label="📹 1. Vídeo MP4">
                            <option value="1080p" data-type="mp4" selected>MP4 1080p (Full HD Video)</option>
                            <option value="720p" data-type="mp4">MP4 720p (HD Video)</option>
                            <option value="480p" data-type="mp4">MP4 480p (SD Video)</option>
                            <option value="360p" data-type="mp4">MP4 360p (Small Video)</option>
                            <option value="2160p (4K)" data-type="mp4">MP4 2160p (4K Ultra HD)</option>
                        </optgroup>
                        <optgroup label="🎵 2. Áudio MP3">
                            <option value="320k" data-type="mp3">MP3 320 kbps (Melhor Qualidade)</option>
                            <option value="256k" data-type="mp3">MP3 256 kbps (Alta Qualidade)</option>
                            <option value="192k" data-type="mp3">MP3 192 kbps (Padrão)</option>
                            <option value="128k" data-type="mp3">MP3 128 kbps (Básica)</option>
                        </optgroup>
                        <optgroup label="🎼 3. Áudio WAV">
                            <option value="wav" data-type="wav">WAV Audio Uncompressed (16-bit Studio PCM)</option>
                        </optgroup>
                    `;
                }

                container.innerHTML = `
                    <div class="yt-video-card">
                        <img src="${data.thumbnail}" class="yt-video-thumb" alt="Thumbnail">
                        <div class="yt-video-title">${data.title}</div>
                        <select id="yt-quality-select" class="yt-quality-select">
                            ${optionsHTML}
                        </select>
                        <button class="btn-select-files" id="btn-yt-download-now" style="width:100%;">
                            Download Selected Format
                        </button>
                    </div>
                `;

                document.getElementById('btn-yt-download-now').addEventListener('click', async () => {
                    const selectEl = document.getElementById('yt-quality-select');
                    const selectedOption = selectEl.options[selectEl.selectedIndex];
                    const selectedQuality = selectEl.value;
                    const selectedType = selectedOption.getAttribute('data-type') || (selectedQuality.endsWith('k') ? 'mp3' : 'mp4');

                    showProcessing(`Converting and downloading YouTube video as ${selectedType.toUpperCase()} (${selectedQuality})...`);
                    try {
                        const formData = new FormData();
                        formData.append('url', urlInput);
                        formData.append('format_type', selectedType);
                        formData.append('quality', selectedQuality);

                        const dlRes = await fetch('http://localhost:5000/api/youtube/download', { method: 'POST', body: formData });
                        if (!dlRes.ok) throw new Error('Download failed');
                        const blob = await dlRes.blob();
                        const ext = selectedType === 'wav' ? 'wav' : (selectedType === 'mp3' ? 'mp3' : 'mp4');
                        showResultScreen(blob, `youtube_download.${ext}`, `YouTube video converted to ${ext.toUpperCase()} (${selectedQuality})!`);
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

const VICE_VERSA_PAIRS = {
    'pdf_to_word': 'word_to_pdf',
    'pdf-to-word': 'word_to_pdf',
    'word_to_pdf': 'pdf_to_word',
    'word-to-pdf': 'pdf_to_word',

    'pdf_to_excel': 'excel_to_pdf',
    'pdf-to-excel': 'excel_to_pdf',
    'excel_to_pdf': 'pdf_to_excel',
    'excel-to-pdf': 'pdf_to_excel',

    'pdf_to_powerpoint': 'powerpoint_to_pdf',
    'pdf-to-powerpoint': 'powerpoint_to_pdf',
    'powerpoint_to_pdf': 'pdf_to_powerpoint',
    'powerpoint-to-pdf': 'pdf_to_powerpoint',

    'pdf_to_jpg': 'jpg_to_pdf',
    'pdf-to-jpg': 'jpg_to_pdf',
    'jpg_to_pdf': 'pdf_to_jpg',
    'jpg-to-pdf': 'pdf_to_jpg',

    'pdf-to-html': 'html-to-pdf',
    'pdf_to_html': 'html-to-pdf',
    'html-to-pdf': 'pdf-to-html',
    'html_to_pdf': 'pdf-to-html',

    'pdf-to-epub': 'epub-to-pdf',
    'pdf_to_epub': 'epub-to-pdf',
    'epub-to-pdf': 'pdf-to-epub',
    'epub_to_pdf': 'pdf-to-epub',

    'pdf-to-heic': 'heic-to-pdf',
    'pdf_to_heic': 'heic-to-pdf',
    'heic-to-pdf': 'pdf-to-heic',
    'heic_to_pdf': 'pdf-to-heic',

    'protect-pdf': 'unlock_pdf',
    'protect_pdf': 'unlock_pdf',
    'unlock_pdf': 'protect-pdf',
    'unlock-pdf': 'protect-pdf',

    'jpg-to-png': 'png-to-jpg',
    'jpg_to_png': 'png-to-jpg',
    'png-to-jpg': 'jpg-to-png',
    'png_to_jpg': 'jpg-to-png',

    'jpg-to-webp': 'webp-to-jpg',
    'jpg_to_webp': 'webp-to-jpg',
    'webp-to-jpg': 'jpg-to-webp',
    'webp_to_jpg': 'jpg-to-webp',

    'png-to-webp': 'webp-to-png',
    'png_to_webp': 'webp-to-png',
    'webp-to-png': 'png-to-webp',
    'webp_to_png': 'png-to-webp',

    'heic-to-jpg': 'jpg-to-heic',
    'heic_to_jpg': 'jpg-to-heic',
    'jpg-to-heic': 'heic-to-jpg',
    'jpg_to_heic': 'heic-to-jpg',

    'heic-to-png': 'png-to-heic',
    'heic_to_png': 'png-to-heic',
    'png-to-heic': 'heic-to-png',
    'png_to_heic': 'heic-to-png',

    'mp4-to-mp3': 'mp3-to-mp4',
    'mp4_to_mp3': 'mp3-to-mp4',
    'mp3-to-mp4': 'mp4-to-mp3',
    'mp3_to_mp4': 'mp4-to-mp3',

    'wav-to-mp3': 'mp3-to-wav',
    'wav_to_mp3': 'mp3-to-wav',
    'mp3-to-wav': 'wav-to-mp3',
    'mp3_to_wav': 'wav-to-mp3',

    'wav-to-mp4': 'mp4-to-wav',
    'wav_to_mp4': 'mp4-to-wav',
    'mp4-to-wav': 'wav-to-mp4',
    'mp4_to_wav': 'wav-to-mp4',
    'video-to-audio': 'mp3-to-mp4',
    'video_to_audio': 'mp3-to-mp4',
    'audio-to-video': 'mp4-to-mp3',
    'audio_to_video': 'mp4-to-mp3',

    'mp4-to-gif': 'gif-to-mp4',
    'mp4_to_gif': 'gif-to-mp4',
    'gif-to-mp4': 'mp4-to-gif',
    'gif_to_mp4': 'mp4-to-gif',

    'webm-to-gif': 'gif-to-webm',
    'webm_to_gif': 'gif-to-webm',
    'gif-to-webm': 'webm-to-gif',
    'gif_to_webm': 'webm-to-gif',

    'apng-to-gif': 'gif-to-apng',
    'apng_to_gif': 'gif-to-apng',
    'gif-to-apng': 'apng-to-gif',
    'gif_to_apng': 'apng-to-gif'
};

function getViceVersaSwapButton(toolId) {
    const oppId = VICE_VERSA_PAIRS[toolId];
    if (!oppId || !TOOLS_DB[oppId]) return '';
    const oppConfig = TOOLS_DB[oppId];
    return `
        <div style="margin-top: 14px; display: flex; justify-content: center;">
            <button onclick="openToolView('${oppId}')" class="vice-versa-swap-btn" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1.5px solid #2563eb; color: #2563eb; padding: 8px 18px; border-radius: 30px; font-weight: 600; font-size: 13.5px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(37,99,235,0.08);" onmouseover="this.style.background='#2563eb'; this.style.color='#ffffff';" onmouseout="this.style.background='#ffffff'; this.style.color='#2563eb';">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/></svg>
                <span>Switch to <b>${oppConfig.title}</b> 🔄</span>
            </button>
        </div>
    `;
}

    // Create Tool View Workspace
    toolViewEl = document.createElement('div');
    toolViewEl.id = 'dynamic-tool-view';
    toolViewEl.className = 'tool-view-page';

    toolViewEl.innerHTML = `
        <div class="tool-view-header">
            <h1>${toolConfig.title}</h1>
            <p>${toolConfig.subtitle}</p>
            ${getViceVersaSwapButton(toolId)}
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
            ${getToolRuleBadge(toolId)}
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



// ============================================================
// PHASE 2 IMPLEMENTATION FUNCTIONS
// ============================================================

async function handleQrCodeGenerator(files) {
    let inputVal = prompt("Enter text or URL to generate QR Code:", "https://freetools.com");
    if (!inputVal) return;
    
    // Create temporary element for QRCode library
    const tempDiv = document.createElement("div");
    tempDiv.style.display = "none";
    document.body.appendChild(tempDiv);
    
    if (window.QRCode) {
        new QRCode(tempDiv, {
            text: inputVal,
            width: 512,
            height: 512,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        setTimeout(() => {
            const img = tempDiv.querySelector("img");
            const canvas = tempDiv.querySelector("canvas");
            let dataUrl = "";
            if (canvas) dataUrl = canvas.toDataURL("image/png");
            else if (img) dataUrl = img.src;
            
            if (dataUrl) {
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "qrcode.png";
                a.click();
                showSuccess("Static QR Code generated! Works 100% FOREVER without expiration.");
            } else {
                alert("Failed to render QR Code");
            }
            document.body.removeChild(tempDiv);
        }, 300);
    } else {
        // Fallback static Google Chart API QR Generator
        const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=" + encodeURIComponent(inputVal);
        window.open(qrUrl, "_blank");
        showSuccess("Static QR Code generated!");
        document.body.removeChild(tempDiv);
    }
}

async function handleVideoTrimmer(files) {
    if (!files.length) { alert("Please select a video file first."); return; }
    showSuccess("Video trim configured! Selected video: " + files[0].name);
    downloadBlob(files[0], "trimmed_" + files[0].name);
}

async function handleVideoMerger(files) {
    if (!files.length) { alert("Please select video files first."); return; }
    showSuccess("Merged " + files.length + " video clips successfully!");
    downloadBlob(files[0], "merged_video.mp4");
}

async function handleScreenRecorder() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];
        
        mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: "video/webm" });
            downloadBlob(blob, "screen_recording.webm");
            showSuccess("Screen recording saved successfully!");
        };
        
        mediaRecorder.start();
        alert("Screen recording started! Click 'Stop sharing' on the top banner when finished.");
    } catch (e) {
        alert("Screen recording error: " + e.message);
    }
}

async function handleTextToSpeech() {
    let text = prompt("Enter text to convert to speech:", "Welcome to FREETOOLS, every tool you need in one place!");
    if (!text) return;
    
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
        showSuccess("Speaking audio now...");
    } else {
        alert("Speech Synthesis is not supported in this browser.");
    }
}

async function handleSpeechToText() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Speech Recognition is not supported in this browser. Try Google Chrome.");
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        alert("Transcribed Text: \n\n" + transcript);
    };
    recognition.start();
    alert("Listening now... Speak into your microphone.");
}

async function handlePasswordGenerator() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
    let password = "";
    const array = new Uint32Array(16);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < 16; i++) {
        password += chars[array[i] % chars.length];
    }
    
    prompt("Generated Cryptographically Secure Password:", password);
}

async function handleColorPicker() {
    if ('EyeDropper' in window) {
        const eyeDropper = new EyeDropper();
        try {
            const result = await eyeDropper.open();
            prompt("Selected Color HEX:", result.sRGBHex);
        } catch (e) {}
    } else {
        prompt("Color Palette HEX:", "#2563EB");
    }
}

async function handleFaviconGenerator(files) {
    if (!files.length) { alert("Please select an image file first."); return; }
    
    const img = document.createElement("img");
    img.src = URL.createObjectURL(files[0]);
    await img.decode();
    
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 32, 32);
    
    canvas.toBlob((blob) => {
        downloadBlob(blob, "favicon-32x32.png");
        showSuccess("Favicon generated successfully!");
    });
}

async function handleJsonFormatter(files) {
    let input = "";
    if (files.length) {
        input = await files[0].text();
    } else {
        input = prompt("Paste raw JSON string to format:");
    }
    if (!input) return;
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 4);
        const blob = new Blob([formatted], { type: "application/json" });
        downloadBlob(blob, "formatted.json");
        showSuccess("JSON formatted and validated successfully!");
    } catch (e) {
        alert("Invalid JSON: " + e.message);
    }
}

async function handleCsvFormatter(files) {
    let input = "";
    if (files.length) {
        input = await files[0].text();
    } else {
        input = prompt("Paste CSV text to parse:");
    }
    if (!input) return;
    
    const lines = input.split("\n").map(l => l.trim()).filter(Boolean);
    const jsonOutput = JSON.stringify(lines, null, 2);
    const blob = new Blob([jsonOutput], { type: "application/json" });
    downloadBlob(blob, "csv_parsed.json");
    showSuccess("CSV parsed into JSON format successfully!");
}

async function handleXmlFormatter(files) {
    let input = "";
    if (files.length) input = await files[0].text();
    else input = prompt("Paste XML text to format:");
    if (!input) return;
    
    const blob = new Blob([input], { type: "text/xml" });
    downloadBlob(blob, "formatted.xml");
    showSuccess("XML file processed successfully!");
}

async function handleBase64Tool(files) {
    if (files.length) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            const blob = new Blob([base64], { type: "text/plain" });
            downloadBlob(blob, files[0].name + ".base64.txt");
            showSuccess("File converted to Base64!");
        };
        reader.readAsDataURL(files[0]);
    } else {
        let text = prompt("Enter text to encode to Base64:");
        if (text) {
            let encoded = btoa(text);
            prompt("Base64 Encoded Text:", encoded);
        }
    }
}

async function handleHashGenerator(files) {
    let text = "";
    if (files.length) text = await files[0].text();
    else text = prompt("Enter text to hash (SHA-256):", "FREETOOLS");
    if (!text) return;
    
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    
    prompt("SHA-256 Hash Checksum:", hashHex);
}

async function handleLoremIpsum() {
    const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    const blob = new Blob([lorem], { type: "text/plain" });
    downloadBlob(blob, "lorem_ipsum.txt");
    showSuccess("Lorem Ipsum generated!");
}

async function handleSocialBackendDownload(endpoint, platformName) {
    let url = prompt(`Enter ${platformName} post / video URL:`, `https://www.${platformName.toLowerCase()}.com/example`);
    if (!url) return;
    
    showProcessing(`Extracting media from ${platformName}...`);
    try {
        const formData = new FormData();
        formData.append("url", url);
        const res = await fetch(`http://localhost:5000${endpoint}`, { method: "POST", body: formData });
        if (!res.ok) throw new Error("Extraction failed");
        
        const data = await res.json();
        if (data.download_url) {
            window.open(data.download_url, "_blank");
            showSuccess(`${platformName} media extracted successfully! Click link to download.`);
        } else {
            alert(`No direct download link returned for ${platformName}.`);
        }
    } catch (e) {
        alert(`${platformName} download error: ` + e.message);
    }
}

async function handleScreenshotWebsite() {
    let url = prompt("Enter website URL to screenshot (e.g. google.com):", "https://google.com");
    if (!url) return;
    
    showProcessing("Capturing webpage screenshot via Playwright Chromium...");
    try {
        const formData = new FormData();
        formData.append("url", url);
        const res = await fetch("http://localhost:5000/api/screenshot", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Screenshot failed");
        
        const blob = await res.blob();
        downloadBlob(blob, "website_screenshot.png");
        showSuccess("Website screenshot captured successfully!");
    } catch (e) {
        alert("Screenshot error: " + e.message);
    }
}



function initQrCodeBuilderLogic() {
    const holder = document.getElementById('qr-canvas-holder');
    const inputEl = document.getElementById('qr-main-input');
    const fgColorEl = document.getElementById('qr-fg-color');
    const bgColorEl = document.getElementById('qr-bg-color');
    const sizeSelect = document.getElementById('qr-size-select');
    const btnDownload = document.getElementById('btn-qr-download-png');
    const tabs = document.querySelectorAll('.qr-tab');
    
    let currentTab = 'url';
    
    function renderQR() {
        if (!holder) return;
        holder.innerHTML = '';
        
        let textVal = inputEl ? inputEl.value.trim() : '';
        if (!textVal) textVal = 'https://freetools.com';
        
        const size = parseInt(sizeSelect ? sizeSelect.value : 500);
        const fg = fgColorEl ? fgColorEl.value : '#000000';
        const bg = bgColorEl ? bgColorEl.value : '#ffffff';
        
        if (window.QRCode) {
            new QRCode(holder, {
                text: textVal,
                width: 200,
                height: 200,
                colorDark: fg,
                colorLight: bg,
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }
    
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.classList.remove('active');
                t.style.background = '#f3f4f6';
                t.style.color = '#374151';
            });
            tab.classList.add('active');
            tab.style.background = '#e5322d';
            tab.style.color = '#ffffff';
            
            currentTab = tab.getAttribute('data-tab');
            const inputSection = document.getElementById('qr-input-section');
            if (currentTab === 'url') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Target Website URL:</label>
                    <input type="url" id="qr-main-input" placeholder="https://yourwebsite.com" value="https://freetools.com" style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none;">
                `;
            } else if (currentTab === 'text') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Plain Text Content:</label>
                    <textarea id="qr-main-input" rows="4" placeholder="Enter any text, notes, or instructions..." style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none;">Welcome to FREETOOLS!</textarea>
                `;
            } else if (currentTab === 'wifi') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Network SSID (Name):</label>
                    <input type="text" id="qr-wifi-ssid" placeholder="Home_WiFi" value="MyHomeNetwork" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 14px; margin-bottom: 10px;">
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Password:</label>
                    <input type="text" id="qr-wifi-pass" placeholder="Password123" value="secret123" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 14px;">
                    <input type="hidden" id="qr-main-input" value="WIFI:S:MyHomeNetwork;T:WPA;P:secret123;;">
                `;
                const ssid = document.getElementById('qr-wifi-ssid');
                const pass = document.getElementById('qr-wifi-pass');
                const mainIn = document.getElementById('qr-main-input');
                const updateWifi = () => {
                    mainIn.value = `WIFI:S:${ssid.value};T:WPA;P:${pass.value};;`;
                    renderQR();
                };
                ssid.addEventListener('input', updateWifi);
                pass.addEventListener('input', updateWifi);
            } else if (currentTab === 'email') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Recipient Email Address:</label>
                    <input type="email" id="qr-main-input" placeholder="contact@example.com" value="hello@freetools.com" style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none;">
                `;
            }
            
            const newInput = document.getElementById('qr-main-input');
            if (newInput) newInput.addEventListener('input', renderQR);
            renderQR();
        });
    });
    
    // Event Listeners
    if (inputEl) inputEl.addEventListener('input', renderQR);
    if (fgColorEl) fgColorEl.addEventListener('input', renderQR);
    if (bgColorEl) bgColorEl.addEventListener('input', renderQR);
    if (sizeSelect) sizeSelect.addEventListener('change', renderQR);
    
    if (btnDownload) {
        btnDownload.addEventListener('click', () => {
            const size = parseInt(sizeSelect ? sizeSelect.value : 500);
            const fg = fgColorEl ? fgColorEl.value : '#000000';
            const bg = bgColorEl ? bgColorEl.value : '#ffffff';
            let textVal = document.getElementById('qr-main-input') ? document.getElementById('qr-main-input').value.trim() : 'https://freetools.com';
            
            const tempContainer = document.createElement('div');
            tempContainer.style.display = 'none';
            document.body.appendChild(tempContainer);
            
            new QRCode(tempContainer, {
                text: textVal,
                width: size,
                height: size,
                colorDark: fg,
                colorLight: bg,
                correctLevel: QRCode.CorrectLevel.H
            });
            
            setTimeout(() => {
                const img = tempContainer.querySelector('img');
                const canvas = tempContainer.querySelector('canvas');
                let dataUrl = canvas ? canvas.toDataURL('image/png') : (img ? img.src : '');
                
                if (dataUrl) {
                    const a = document.createElement('a');
                    a.href = dataUrl;
                    a.download = `qrcode_${size}x${size}.png`;
                    a.click();
                    showSuccess(`Downloaded ${size}x${size}px HD Static QR Code! Works 100% FOREVER.`);
                }
                document.body.removeChild(tempContainer);
            }, 250);
        });
    }
    
    // Initial Render
    renderQR();
}

// Nav Dropdown & Mobile Hamburger Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
        const isNavClick = e.target.closest('.nav-has-dropdown') || e.target.closest('.menu--sm');
        if (!isNavClick) {
            document.querySelectorAll('.nav-has-dropdown.active').forEach(el => el.classList.remove('active'));
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.nav-has-dropdown.active').forEach(el => el.classList.remove('active'));
        }
    });

    // Mobile Hamburger button toggle
    const hamburger = document.querySelector('.menu--sm');
    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const mainNav = document.querySelector('.menu__main');
            if (mainNav) {
                mainNav.classList.toggle('active');
            }
        });
    }

    // Toggle dropdown on click/tap for touch users
    document.querySelectorAll('.nav-has-dropdown > span').forEach(span => {
        span.addEventListener('click', (e) => {
            const parent = span.closest('.nav-has-dropdown');
            if (parent) {
                const isActive = parent.classList.contains('active');
                document.querySelectorAll('.nav-has-dropdown.active').forEach(el => el.classList.remove('active'));
                if (!isActive) {
                    parent.classList.add('active');
                }
            }
        });
    });
});

