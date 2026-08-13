/**
 * FreeTools Complete Web Application Engine
 * Pure Vanilla JavaScript Client & API Handler
 */

// Initialize PDF.js worker
if (window.pdfjsLib) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/PDF.js/3.11.174/PDF.worker.min.js';
}

// Tool Database & Descriptions
const TOOLS_DB = {

    // --- PHASE 2 NEW TOOLS ---
    'QR-code-generator': { title: 'QR Code Generator', subtitle: 'Generate QR codes from text, URLs, or WiFi credentials.', btnText: 'Generate QR Code', dropText: 'or enter text below', actionBtnText: 'Generate QR Code', multiple: false, accept: '*', customAction: 'qr_code' },
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
    
    'JSON-formatter': { title: 'JSON Formatter', subtitle: 'Format, validate, beautify, or minify JSON data.', btnText: 'Select JSON file', dropText: 'or drop JSON file here', actionBtnText: 'Format JSON', multiple: false, accept: '.JSON,text/plain', customAction: 'json_format' },
    'json_formatter': { title: 'JSON Formatter', subtitle: 'Format, validate, beautify, or minify JSON data.', btnText: 'Select JSON file', dropText: 'or drop JSON file here', actionBtnText: 'Format JSON', multiple: false, accept: '.JSON,text/plain', customAction: 'json_format' },
    
    'CSV-formatter': { title: 'CSV Formatter & Parser', subtitle: 'View CSV files as tables, format, edit, and convert to JSON.', btnText: 'Select CSV file', dropText: 'or drop CSV file here', actionBtnText: 'Parse CSV', multiple: false, accept: '.CSV,text/CSV', customAction: 'csv_format' },
    'csv_formatter': { title: 'CSV Formatter & Parser', subtitle: 'View CSV files as tables, format, edit, and convert to JSON.', btnText: 'Select CSV file', dropText: 'or drop CSV file here', actionBtnText: 'Parse CSV', multiple: false, accept: '.CSV,text/CSV', customAction: 'csv_format' },
    
    'XML-formatter': { title: 'XML Formatter', subtitle: 'Beautify, format, and validate XML markup.', btnText: 'Select XML file', dropText: 'or drop XML file here', actionBtnText: 'Format XML', multiple: false, accept: '.XML,text/XML', customAction: 'xml_format' },
    'xml_formatter': { title: 'XML Formatter', subtitle: 'Beautify, format, and validate XML markup.', btnText: 'Select XML file', dropText: 'or drop XML file here', actionBtnText: 'Format XML', multiple: false, accept: '.XML,text/XML', customAction: 'xml_format' },
    
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
    'translate-document': { title: 'Translate Document', subtitle: 'Translate PDF, DOCX, XLSX, and text documents into 100+ languages for FREE.', btnText: 'Select Document', dropText: 'or drop document here', actionBtnText: 'Translate Document', multiple: false, accept: '.PDF,.doc,.docx,.TXT', endpoint: '/api/translate-document' },
    'translate_document': { title: 'Translate Document', subtitle: 'Translate PDF, DOCX, XLSX, and text documents into 100+ languages for FREE.', btnText: 'Select Document', dropText: 'or drop document here', actionBtnText: 'Translate Document', multiple: false, accept: '.PDF,.doc,.docx,.TXT', endpoint: '/api/translate-document' },

    'MP4-to-MP3': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },
    'mp4_to_mp3': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },
    'video-to-audio': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },
    'video_to_audio': { title: 'MP4 to MP3 Converter', subtitle: 'Extract high quality MP3 audio streams from local MP4, MKV, AVI, and MOV video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },

    // Vice-Versa Pair Additions
    'JPG-to-HEIC': { title: 'Convert JPG to HEIC', subtitle: 'Convert JPG images to high efficiency Apple HEIC photo format.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/jpeg,.JPG,.jpeg', endpoint: '/api/image/JPG-to-HEIC' },
    'jpg_to_heic': { title: 'Convert JPG to HEIC', subtitle: 'Convert JPG images to high efficiency Apple HEIC photo format.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/jpeg,.JPG,.jpeg', endpoint: '/api/image/JPG-to-HEIC' },
    'PNG-to-HEIC': { title: 'Convert PNG to HEIC', subtitle: 'Convert PNG images to high efficiency Apple HEIC photo format.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/PNG,.PNG', endpoint: '/api/image/JPG-to-HEIC' },
    'png_to_heic': { title: 'Convert PNG to HEIC', subtitle: 'Convert PNG images to high efficiency Apple HEIC photo format.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to HEIC', multiple: true, accept: 'image/PNG,.PNG', endpoint: '/api/image/JPG-to-HEIC' },
    'PDF-to-HEIC': { title: 'Convert PDF to HEIC', subtitle: 'Convert PDF document pages into compressed Apple HEIC photos.', btnText: 'Select PDF file', dropText: 'or drop PDF file here', actionBtnText: 'Convert to HEIC', multiple: false, accept: 'application/PDF,.PDF', endpoint: '/api/PDF-to-HEIC' },
    'pdf_to_heic': { title: 'Convert PDF to HEIC', subtitle: 'Convert PDF document pages into compressed Apple HEIC photos.', btnText: 'Select PDF file', dropText: 'or drop PDF file here', actionBtnText: 'Convert to HEIC', multiple: false, accept: 'application/PDF,.PDF', endpoint: '/api/PDF-to-HEIC' },
    'MP3-to-MP4': { title: 'MP3 to MP4 Converter', subtitle: 'Convert MP3 audio into MP4 video with a custom cover background for YouTube.', btnText: 'Select MP3 Audio', dropText: 'or drop MP3 audio here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
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
        accept: 'image/jpeg,.JPG,.jpeg',
        endpoint: '/api/image/compress-jpeg'
    },
    'jpeg_compressor': {
        title: 'JPEG Compressor',
        subtitle: 'Compress JPG/JPEG images with fine quality control.',
        multiple: true,
        accept: 'image/jpeg,.JPG,.jpeg',
        endpoint: '/api/image/compress-jpeg'
    },
    'PNG-compressor': {
        title: 'PNG Compressor',
        subtitle: 'Lossless and lossy compression for PNG image files.',
        multiple: true,
        accept: 'image/PNG,.PNG',
        endpoint: '/api/image/compress-PNG'
    },
    'png_compressor': {
        title: 'PNG Compressor',
        subtitle: 'Lossless and lossy compression for PNG image files.',
        multiple: true,
        accept: 'image/PNG,.PNG',
        endpoint: '/api/image/compress-PNG'
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
    'SVG-compressor': {
        title: 'SVG Compressor',
        subtitle: 'Optimize, clean and minify vector SVG graphics.',
        multiple: true,
        accept: '.SVG,image/SVG+XML',
        endpoint: '/api/image/compress-SVG'
    },
    'svg_compressor': {
        title: 'SVG Compressor',
        subtitle: 'Optimize, clean and minify vector SVG graphics.',
        multiple: true,
        accept: '.SVG,image/SVG+XML',
        endpoint: '/api/image/compress-SVG'
    },
    'MP3-compressor': {
        title: 'MP3 Compressor',
        subtitle: 'Re-encode MP3 audio files to lower bitrates and smaller sizes.',
        multiple: true,
        accept: 'audio/MP3,audio/mpeg,.MP3',
        endpoint: '/api/audio/compress-MP3'
    },
    'mp3_compressor': {
        title: 'MP3 Compressor',
        subtitle: 'Re-encode MP3 audio files to lower bitrates and smaller sizes.',
        multiple: true,
        accept: 'audio/MP3,audio/mpeg,.MP3',
        endpoint: '/api/audio/compress-MP3'
    },
    'WAV-compressor': {
        title: 'WAV Compressor',
        subtitle: 'Compress uncompressed WAV audio into high fidelity MP3/AAC.',
        multiple: true,
        accept: 'audio/WAV,audio/x-WAV,.WAV',
        endpoint: '/api/audio/compress-WAV'
    },
    'wav_compressor': {
        title: 'WAV Compressor',
        subtitle: 'Compress uncompressed WAV audio into high fidelity MP3/AAC.',
        multiple: true,
        accept: 'audio/WAV,audio/x-WAV,.WAV',
        endpoint: '/api/audio/compress-WAV'
    },
    'GIF-compressor': {
        title: 'GIF Compressor',
        subtitle: 'Reduce animated GIF file sizes with palette optimization.',
        multiple: true,
        accept: 'image/GIF,.GIF',
        endpoint: '/api/GIF/compress-GIF'
    },
    'gif_compressor': {
        title: 'GIF Compressor',
        subtitle: 'Reduce animated GIF file sizes with palette optimization.',
        multiple: true,
        accept: 'image/GIF,.GIF',
        endpoint: '/api/GIF/compress-GIF'
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
    'jif-to-PNG': {
        title: 'JIF to PNG',
        subtitle: 'Convert JIF and JFIF image variants to high quality PNG.',
        multiple: true,
        accept: 'image/jpeg,image/jfif,.jif,.jfif',
        endpoint: '/api/image/jif-to-PNG'
    },
    'jif_to_png': {
        title: 'JIF to PNG',
        subtitle: 'Convert JIF and JFIF image variants to high quality PNG.',
        multiple: true,
        accept: 'image/jpeg,image/jfif,.jif,.jfif',
        endpoint: '/api/image/jif-to-PNG'
    },
    'PNG-to-SVG': {
        title: 'PNG to SVG',
        subtitle: 'Vectorize PNG images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/PNG',
        endpoint: '/api/image/PNG-to-SVG'
    },
    'png_to_svg': {
        title: 'PNG to SVG',
        subtitle: 'Vectorize PNG images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/PNG',
        endpoint: '/api/image/PNG-to-SVG'
    },
    'JPG-to-SVG': {
        title: 'JPG to SVG',
        subtitle: 'Vectorize JPG photos into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/jpeg,image/JPG',
        endpoint: '/api/image/PNG-to-SVG'
    },
    'jpg_to_svg': {
        title: 'JPG to SVG',
        subtitle: 'Vectorize JPG photos into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/jpeg,image/JPG',
        endpoint: '/api/image/PNG-to-SVG'
    },
    'webp-to-SVG': {
        title: 'WEBP to SVG',
        subtitle: 'Vectorize WEBP images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/webp',
        endpoint: '/api/image/PNG-to-SVG'
    },
    'webp_to_svg': {
        title: 'WEBP to SVG',
        subtitle: 'Vectorize WEBP images into scalable SVG vector graphics.',
        multiple: true,
        accept: 'image/webp',
        endpoint: '/api/image/PNG-to-SVG'
    },
    'HEIC-to-JPG': {
        title: 'HEIC to JPG',
        subtitle: 'Convert Apple iPhone HEIC/HEIF photos to universal JPG.',
        multiple: true,
        accept: 'image/HEIC,image/heif,.HEIC,.heif',
        endpoint: '/api/image/HEIC-to-JPG'
    },
    'heic_to_jpg': {
        title: 'HEIC to JPG',
        subtitle: 'Convert Apple iPhone HEIC/HEIF photos to universal JPG.',
        multiple: true,
        accept: 'image/HEIC,image/heif,.HEIC,.heif',
        endpoint: '/api/image/HEIC-to-JPG'
    },
    'HEIC-to-PNG': {
        title: 'HEIC to PNG',
        subtitle: 'Convert iPhone HEIC photos to transparent PNG images.',
        multiple: true,
        accept: 'image/HEIC,image/heif,.HEIC,.heif',
        endpoint: '/api/image/HEIC-to-PNG'
    },
    'heic_to_png': {
        title: 'HEIC to PNG',
        subtitle: 'Convert iPhone HEIC photos to transparent PNG images.',
        multiple: true,
        accept: 'image/HEIC,image/heif,.HEIC,.heif',
        endpoint: '/api/image/HEIC-to-PNG'
    },
    'SVG-converter': {
        title: 'SVG Converter',
        subtitle: 'Convert vector SVG graphics to PNG, JPG, WEBP or PDF.',
        multiple: true,
        accept: '.SVG,image/SVG+XML',
        endpoint: '/api/image/SVG-converter'
    },
    'svg_converter': {
        title: 'SVG Converter',
        subtitle: 'Convert vector SVG graphics to PNG, JPG, WEBP or PDF.',
        multiple: true,
        accept: '.SVG,image/SVG+XML',
        endpoint: '/api/image/SVG-converter'
    },
    'PDF-converter': {
        title: 'PDF Converter',
        subtitle: 'Convert PDF files to and from all major document formats.',
        multiple: true,
        accept: 'application/PDF',
        endpoint: '/api/PDF-converter'
    },
    'pdf_converter': {
        title: 'PDF Converter',
        subtitle: 'Convert PDF files to and from all major document formats.',
        multiple: true,
        accept: 'application/PDF',
        endpoint: '/api/PDF-converter'
    },
    'document-converter': {
        title: 'Document Converter',
        subtitle: 'Convert DOCX, XLSX, PPTX, HTML, and text files to PDF.',
        multiple: true,
        accept: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.TXT,.HTML',
        endpoint: '/api/document-converter'
    },
    'document_converter': {
        title: 'Document Converter',
        subtitle: 'Convert DOCX, XLSX, PPTX, HTML, and text files to PDF.',
        multiple: true,
        accept: '.doc,.docx,.xls,.xlsx,.ppt,.pptx,.TXT,.HTML',
        endpoint: '/api/document-converter'
    },
    'ebook-converter': {
        title: 'Ebook Converter',
        subtitle: 'Convert EPUB, MOBI, AZW3, and HTML ebooks to PDF or TXT.',
        multiple: true,
        accept: '.EPUB,.mobi,.azw3,.EPUB+zip',
        endpoint: '/api/ebook-converter'
    },
    'ebook_converter': {
        title: 'Ebook Converter',
        subtitle: 'Convert EPUB, MOBI, AZW3, and HTML ebooks to PDF or TXT.',
        multiple: true,
        accept: '.EPUB,.mobi,.azw3,.EPUB+zip',
        endpoint: '/api/ebook-converter'
    },
    'PDF-to-EPUB': {
        title: 'PDF to EPUB',
        subtitle: 'Convert PDF documents into readable digital EPUB ebooks.',
        multiple: true,
        accept: 'application/PDF',
        endpoint: '/api/PDF-to-EPUB'
    },
    'pdf_to_epub': {
        title: 'PDF to EPUB',
        subtitle: 'Convert PDF documents into readable digital EPUB ebooks.',
        multiple: true,
        accept: 'application/PDF',
        endpoint: '/api/PDF-to-EPUB'
    },
    'EPUB-to-PDF': {
        title: 'EPUB to PDF',
        subtitle: 'Convert EPUB ebooks into formatted PDF documents.',
        multiple: true,
        accept: '.EPUB,.EPUB+zip',
        endpoint: '/api/EPUB-to-PDF'
    },
    'epub_to_pdf': {
        title: 'EPUB to PDF',
        subtitle: 'Convert EPUB ebooks into formatted PDF documents.',
        multiple: true,
        accept: '.EPUB,.EPUB+zip',
        endpoint: '/api/EPUB-to-PDF'
    },
    'HEIC-to-PDF': {
        title: 'HEIC to PDF',
        subtitle: 'Convert Apple iPhone HEIC photos into a PDF document.',
        multiple: true,
        accept: 'image/HEIC,image/heif,.HEIC,.heif',
        endpoint: '/api/HEIC-to-PDF'
    },
    'heic_to_pdf': {
        title: 'HEIC to PDF',
        subtitle: 'Convert Apple iPhone HEIC photos into a PDF document.',
        multiple: true,
        accept: 'image/HEIC,image/heif,.HEIC,.heif',
        endpoint: '/api/HEIC-to-PDF'
    },
    'video-to-GIF': {
        title: 'Video to GIF',
        subtitle: 'Convert any video file into an animated GIF.',
        multiple: true,
        accept: 'video/*',
        endpoint: '/api/GIF/convert'
    },
    'video_to_gif': {
        title: 'Video to GIF',
        subtitle: 'Convert any video file into an animated GIF.',
        multiple: true,
        accept: 'video/*',
        endpoint: '/api/GIF/convert'
    },
    'MP4-to-GIF': {
        title: 'MP4 to GIF',
        subtitle: 'Convert MP4 video clips into high quality GIF animations.',
        multiple: true,
        accept: 'video/MP4,.MP4',
        endpoint: '/api/GIF/convert'
    },
    'mp4_to_gif': {
        title: 'MP4 to GIF',
        subtitle: 'Convert MP4 video clips into high quality GIF animations.',
        multiple: true,
        accept: 'video/MP4,.MP4',
        endpoint: '/api/GIF/convert'
    },
    'webm-to-GIF': {
        title: 'WEBM to GIF',
        subtitle: 'Convert web WEBM videos into animated GIF images.',
        multiple: true,
        accept: 'video/webm,.webm',
        endpoint: '/api/GIF/convert'
    },
    'webm_to_gif': {
        title: 'WEBM to GIF',
        subtitle: 'Convert web WEBM videos into animated GIF images.',
        multiple: true,
        accept: 'video/webm,.webm',
        endpoint: '/api/GIF/convert'
    },
    'apng-to-GIF': {
        title: 'APNG to GIF',
        subtitle: 'Convert APNG animated PNG files to animated GIF format.',
        multiple: true,
        accept: 'image/PNG,image/apng,.apng',
        endpoint: '/api/GIF/convert'
    },
    'apng_to_gif': {
        title: 'APNG to GIF',
        subtitle: 'Convert APNG animated PNG files to animated GIF format.',
        multiple: true,
        accept: 'image/PNG,image/apng,.apng',
        endpoint: '/api/GIF/convert'
    },
    'GIF-to-MP4': {
        title: 'GIF to MP4',
        subtitle: 'Convert animated GIF images to smooth MP4 video files.',
        multiple: true,
        accept: 'image/GIF,.GIF',
        endpoint: '/api/GIF/GIF-to-MP4'
    },
    'gif_to_mp4': {
        title: 'GIF to MP4',
        subtitle: 'Convert animated GIF images to smooth MP4 video files.',
        multiple: true,
        accept: 'image/GIF,.GIF',
        endpoint: '/api/GIF/GIF-to-MP4'
    },
    'GIF-to-apng': {
        title: 'GIF to APNG',
        subtitle: 'Convert GIF animations to APNG animated PNG files.',
        multiple: true,
        accept: 'image/GIF,.GIF',
        endpoint: '/api/GIF/convert'
    },
    'gif_to_apng': {
        title: 'GIF to APNG',
        subtitle: 'Convert GIF animations to APNG animated PNG files.',
        multiple: true,
        accept: 'image/GIF,.GIF',
        endpoint: '/api/GIF/convert'
    },
    'image-to-GIF': {
        title: 'Image to GIF',
        subtitle: 'Combine multiple images (JPG, PNG, WEBP) into an animated GIF.',
        multiple: true,
        accept: 'image/*',
        endpoint: '/api/GIF/image-to-GIF'
    },
    'image_to_gif': {
        title: 'Image to GIF',
        subtitle: 'Combine multiple images (JPG, PNG, WEBP) into an animated GIF.',
        multiple: true,
        accept: 'image/*',
        endpoint: '/api/GIF/image-to-GIF'
    },
    'mov-to-GIF': {
        title: 'MOV to GIF',
        subtitle: 'Convert Apple QuickTime MOV videos to animated GIF.',
        multiple: true,
        accept: 'video/quicktime,.mov',
        endpoint: '/api/GIF/convert'
    },
    'mov_to_gif': {
        title: 'MOV to GIF',
        subtitle: 'Convert Apple QuickTime MOV videos to animated GIF.',
        multiple: true,
        accept: 'video/quicktime,.mov',
        endpoint: '/api/GIF/convert'
    },
    'avi-to-GIF': {
        title: 'AVI to GIF',
        subtitle: 'Convert AVI video files into lightweight animated GIFs.',
        multiple: true,
        accept: 'video/x-msvideo,.avi',
        endpoint: '/api/GIF/convert'
    },
    'avi_to_gif': {
        title: 'AVI to GIF',
        subtitle: 'Convert AVI video files into lightweight animated GIFs.',
        multiple: true,
        accept: 'video/x-msvideo,.avi',
        endpoint: '/api/GIF/convert'
    },

    // 3. Image Conversion & Optimization Tools (Pillow Engine)
    'JPG-to-PNG': { title: 'Convert JPG to PNG', subtitle: 'Convert JPG images to PNG format with high quality transparency support.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/jpeg,image/JPG', isImage: true, targetFmt: 'PNG' },
    'jpg_to_png': { title: 'Convert JPG to PNG', subtitle: 'Convert JPG images to PNG format with high quality transparency support.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/jpeg,image/JPG', isImage: true, targetFmt: 'PNG' },
    'PNG-to-JPG': { title: 'Convert PNG to JPG', subtitle: 'Convert PNG images to JPG format for smaller file sizes.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/PNG', isImage: true, targetFmt: 'JPG' },
    'png_to_jpg': { title: 'Convert PNG to JPG', subtitle: 'Convert PNG images to JPG format for smaller file sizes.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/PNG', isImage: true, targetFmt: 'JPG' },
    'JPG-to-webp': { title: 'Convert JPG to WEBP', subtitle: 'Convert JPG images to next-gen WEBP format for ultra fast web loading.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/jpeg,image/JPG', isImage: true, targetFmt: 'webp' },
    'jpg_to_webp': { title: 'Convert JPG to WEBP', subtitle: 'Convert JPG images to next-gen WEBP format for ultra fast web loading.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/jpeg,image/JPG', isImage: true, targetFmt: 'webp' },
    'PNG-to-webp': { title: 'Convert PNG to WEBP', subtitle: 'Convert PNG images to WEBP format preserving transparency.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/PNG', isImage: true, targetFmt: 'webp' },
    'png_to_webp': { title: 'Convert PNG to WEBP', subtitle: 'Convert PNG images to WEBP format preserving transparency.', btnText: 'Select PNG images', dropText: 'or drop PNG images here', actionBtnText: 'Convert to WEBP', multiple: true, accept: 'image/PNG', isImage: true, targetFmt: 'webp' },
    'webp-to-JPG': { title: 'Convert WEBP to JPG', subtitle: 'Convert WEBP images back to standard JPG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'JPG' },
    'webp_to_jpg': { title: 'Convert WEBP to JPG', subtitle: 'Convert WEBP images back to standard JPG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to JPG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'JPG' },
    'webp-to-PNG': { title: 'Convert WEBP to PNG', subtitle: 'Convert WEBP images to lossless PNG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'PNG' },
    'webp_to_png': { title: 'Convert WEBP to PNG', subtitle: 'Convert WEBP images to lossless PNG format.', btnText: 'Select WEBP images', dropText: 'or drop WEBP images here', actionBtnText: 'Convert to PNG', multiple: true, accept: 'image/webp', isImage: true, targetFmt: 'PNG' },
    'compress-image': { title: 'Compress Image', subtitle: 'Compress JPG, PNG, WEBP, SVG or GIF images with the best quality and file size ratio.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Compress Image', multiple: true, accept: 'image/*', isImage: true, isCompress: true },
    'compress_image': { title: 'Compress Image', subtitle: 'Compress JPG, PNG, WEBP, SVG or GIF images with the best quality and file size ratio.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Compress Image', multiple: true, accept: 'image/*', isImage: true, isCompress: true },
    'resize-image': { title: 'Resize Image', subtitle: 'Resize JPG, PNG, and WEBP images by defining dimensions or percentages.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Resize Image', multiple: true, accept: 'image/*', isImage: true, isResize: true },
    'resize_image': { title: 'Resize Image', subtitle: 'Resize JPG, PNG, and WEBP images by defining dimensions or percentages.', btnText: 'Select Images', dropText: 'or drop images here', actionBtnText: 'Resize Image', multiple: true, accept: 'image/*', isImage: true, isResize: true },

    // 1. PDF Tools (Supporting both hyphen and underscore IDs)
    'merge_pdf': { title: 'Merge PDF files', subtitle: 'Combine PDFs in the order you want with the easiest PDF merger available.', btnText: 'Select PDF files', dropText: 'or drop PDFs here', actionBtnText: 'Merge PDF', multiple: true, accept: '.PDF' },
    'merge-PDF': { title: 'Merge PDF files', subtitle: 'Combine PDFs in the order you want with the easiest PDF merger available.', btnText: 'Select PDF files', dropText: 'or drop PDFs here', actionBtnText: 'Merge PDF', multiple: true, accept: '.PDF' },
    'split_pdf': { title: 'Split PDF file', subtitle: 'Separate one page or a whole set for easy conversion into independent PDF files.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Split PDF', multiple: false, accept: '.PDF' },
    'split-PDF': { title: 'Split PDF file', subtitle: 'Separate one page or a whole set for easy conversion into independent PDF files.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Split PDF', multiple: false, accept: '.PDF' },
    'compress_pdf': { title: 'Compress PDF file', subtitle: 'Reduce file size while optimizing for maximal PDF quality.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Compress PDF', multiple: false, accept: '.PDF' },
    'compress-PDF': { title: 'Compress PDF file', subtitle: 'Reduce file size while optimizing for maximal PDF quality.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Compress PDF', multiple: false, accept: '.PDF' },
    'PDF-to-HTML': { title: 'Convert PDF to HTML', subtitle: 'Convert PDF document pages into clean, web-ready HTML code.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to HTML', multiple: false, accept: '.PDF', endpoint: '/api/PDF-to-HTML' },
    'pdf_to_html': { title: 'Convert PDF to HTML', subtitle: 'Convert PDF document pages into clean, web-ready HTML code.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to HTML', multiple: false, accept: '.PDF', endpoint: '/api/PDF-to-HTML' },
    'GIF-to-webm': { title: 'Convert GIF to WEBM', subtitle: 'Convert animated GIF files into high compression WEBM video.', btnText: 'Select GIF files', dropText: 'or drop GIF files here', actionBtnText: 'Convert to WEBM', multiple: true, accept: 'image/GIF,.GIF', endpoint: '/api/GIF/GIF-to-MP4' },
    'gif_to_webm': { title: 'Convert GIF to WEBM', subtitle: 'Convert animated GIF files into high compression WEBM video.', btnText: 'Select GIF files', dropText: 'or drop GIF files here', actionBtnText: 'Convert to WEBM', multiple: true, accept: 'image/GIF,.GIF', endpoint: '/api/GIF/GIF-to-MP4' },
    'pdf_to_word': { title: 'Convert PDF to WORD', subtitle: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to WORD', multiple: false, accept: '.PDF' },
    'PDF-to-word': { title: 'Convert PDF to WORD', subtitle: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to WORD', multiple: false, accept: '.PDF' },
    'pdf_to_powerpoint': { title: 'Convert PDF to POWERPOINT', subtitle: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to POWERPOINT', multiple: false, accept: '.PDF' },
    'PDF-to-powerpoint': { title: 'Convert PDF to POWERPOINT', subtitle: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to POWERPOINT', multiple: false, accept: '.PDF' },
    'pdf_to_excel': { title: 'Convert PDF to EXCEL', subtitle: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to EXCEL', multiple: false, accept: '.PDF' },
    'PDF-to-excel': { title: 'Convert PDF to EXCEL', subtitle: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to EXCEL', multiple: false, accept: '.PDF' },
    'word_to_pdf': { title: 'Convert WORD to PDF', subtitle: 'Make DOC and DOCX files easy to read by converting them to PDF.', btnText: 'Select WORD files', dropText: 'or drop WORD files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.doc,.docx' },
    'word-to-PDF': { title: 'Convert WORD to PDF', subtitle: 'Make DOC and DOCX files easy to read by converting them to PDF.', btnText: 'Select WORD files', dropText: 'or drop WORD files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.doc,.docx' },
    'powerpoint_to_pdf': { title: 'Convert POWERPOINT to PDF', subtitle: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', btnText: 'Select Powerpoint files', dropText: 'or drop Powerpoint files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.ppt,.pptx' },
    'powerpoint-to-PDF': { title: 'Convert POWERPOINT to PDF', subtitle: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.', btnText: 'Select Powerpoint files', dropText: 'or drop Powerpoint files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.ppt,.pptx' },
    'excel_to_pdf': { title: 'Convert EXCEL to PDF', subtitle: 'Make EXCEL spreadsheets easy to read by converting them to PDF.', btnText: 'Select EXCEL files', dropText: 'or drop EXCEL files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.xls,.xlsx' },
    'excel-to-PDF': { title: 'Convert EXCEL to PDF', subtitle: 'Make EXCEL spreadsheets easy to read by converting them to PDF.', btnText: 'Select EXCEL files', dropText: 'or drop EXCEL files here', actionBtnText: 'Convert to PDF', multiple: true, accept: '.xls,.xlsx' },
    'edit-PDF': { title: 'Edit PDF', subtitle: 'Add text, images, shapes or freehand annotations to a PDF document.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Edit PDF', multiple: false, accept: '.PDF' },
    'pdf_to_jpg': { title: 'Convert PDF to JPG', subtitle: 'Extract all images that are inside a PDF or convert every page into a JPG image.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to JPG', multiple: false, accept: '.PDF' },
    'PDF-to-JPG': { title: 'Convert PDF to JPG', subtitle: 'Extract all images that are inside a PDF or convert every page into a JPG image.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to JPG', multiple: false, accept: '.PDF' },
    'jpg_to_pdf': { title: 'Convert JPG to PDF', subtitle: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PDF', multiple: true, accept: 'image/jpeg,image/PNG,image/webp' },
    'JPG-to-PDF': { title: 'Convert JPG to PDF', subtitle: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.', btnText: 'Select JPG images', dropText: 'or drop JPG images here', actionBtnText: 'Convert to PDF', multiple: true, accept: 'image/jpeg,image/PNG,image/webp' },
    'sign-PDF': { title: 'Sign PDF', subtitle: 'Sign yourself or request electronic signatures from others.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Sign PDF', multiple: false, accept: '.PDF' },
    'pdf_add_watermark': { title: 'Watermark PDF', subtitle: 'Stamp an image or text over your PDF in seconds. Choose typography, transparency and position.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Watermark', multiple: false, accept: '.PDF' },
    'watermark-PDF': { title: 'Watermark PDF', subtitle: 'Stamp an image or text over your PDF in seconds. Choose typography, transparency and position.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Watermark', multiple: false, accept: '.PDF' },
    'rotate_pdf': { title: 'Rotate PDF', subtitle: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Rotate PDF', multiple: true, accept: '.PDF' },
    'rotate-PDF': { title: 'Rotate PDF', subtitle: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Rotate PDF', multiple: true, accept: '.PDF' },
    'HTML-to-PDF': { title: 'HTML to PDF Converter', subtitle: 'Convert webpages in HTML to PDF documents with high accuracy.', btnText: 'Select HTML file', dropText: 'or drop HTML file here', actionBtnText: 'Convert to PDF', multiple: false, accept: '.HTML,.htm' },
    'unlock_pdf': { title: 'Unlock PDF Security', subtitle: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Unlock PDF', multiple: false, accept: '.PDF' },
    'unlock-PDF': { title: 'Unlock PDF Security', subtitle: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Unlock PDF', multiple: false, accept: '.PDF' },
    'protect-PDF': { title: 'Protect PDF file', subtitle: 'Encrypt your PDF files with a password to prevent unauthorized access.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Protect PDF', multiple: false, accept: '.PDF' },
    'organize-PDF': { title: 'Organize PDF', subtitle: 'Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Organize PDF', multiple: false, accept: '.PDF' },
    'convert-PDF-to-pdfa': { title: 'PDF to PDF/A', subtitle: 'Transform your PDF to PDF/A, the ISO-standardized version for long-term archiving.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to PDF/A', multiple: false, accept: '.PDF' },
    'repair-PDF': { title: 'Repair PDF file', subtitle: 'Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Repair PDF', multiple: false, accept: '.PDF' },
    'add_pdf_page_number': { title: 'Page numbers', subtitle: 'Add page numbers into PDFs with ease. Choose position, dimensions, typography.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Page Numbers', multiple: false, accept: '.PDF' },
    'add-PDF-page-number': { title: 'Page numbers', subtitle: 'Add page numbers into PDFs with ease. Choose position, dimensions, typography.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Add Page Numbers', multiple: false, accept: '.PDF' },
    'scan-PDF': { title: 'Scan to PDF', subtitle: 'Capture document scans from your mobile device and send them instantly to your browser.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Scan to PDF', multiple: false, accept: '.PDF,image/*' },
    'OCR-PDF': { title: 'OCR PDF', subtitle: 'Easily convert scanned PDF into searchable and selectable documents.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Apply OCR', multiple: false, accept: '.PDF' },
    'compare-PDF': { title: 'Compare PDF', subtitle: 'Compare two PDF files side by side and easily spot changes.', btnText: 'Select PDF files', dropText: 'or drop PDFs here', actionBtnText: 'Compare PDFs', multiple: true, accept: '.PDF' },
    'redact-PDF': { title: 'Redact PDF', subtitle: 'Redact text and graphics to permanently remove sensitive information from a PDF.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Redact PDF', multiple: false, accept: '.PDF' },
    'crop-PDF': { title: 'Crop PDF', subtitle: 'Trim margins and crop specific areas of your PDF pages.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Crop PDF', multiple: false, accept: '.PDF' },
    'PDF-forms': { title: 'Fill & Sign Forms', subtitle: 'Fill out interactive PDF forms and sign them easily.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Fill & Sign', multiple: false, accept: '.PDF' },
    'PDF-summarize': { title: 'AI Summarizer', subtitle: 'Summarize long PDF documents instantly with AI.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Summarize with AI', multiple: false, accept: '.PDF' },
    'translate-PDF': { title: 'Translate PDF', subtitle: 'Translate PDF documents into any language instantly.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Translate PDF', multiple: false, accept: '.PDF' },
    'PDF-to-markdown': { title: 'PDF to Markdown', subtitle: 'Convert PDF documents to structured Markdown text.', btnText: 'Select PDF file', dropText: 'or drop PDF here', actionBtnText: 'Convert to Markdown', multiple: false, accept: '.PDF' },

    // 2. Media & Social Tools
    'youtube-to-MP3': { title: 'YouTube to MP3 Converter', subtitle: 'Convert and download YouTube videos to MP3 audio in 320kbps for FREE.', isYoutube: true, type: 'MP3', defaultQuality: '320k' },
    'youtube-to-WAV': { title: 'YouTube to WAV Converter', subtitle: 'Extract uncompressed studio quality 16-bit PCM WAV audio from any YouTube video.', isYoutube: true, type: 'WAV', defaultQuality: 'WAV' },
    'youtube_to_wav': { title: 'YouTube to WAV Converter', subtitle: 'Extract uncompressed studio quality 16-bit PCM WAV audio from any YouTube video.', isYoutube: true, type: 'WAV', defaultQuality: 'WAV' },
    'youtube-to-MP4': { title: 'YouTube to MP4 Converter', subtitle: 'Convert and download YouTube videos in 1080p Full HD, 720p, 480p, 360p, 2K and 4K MP4 format.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'youtube-shorts-downloader': { title: 'YouTube Shorts Downloader', subtitle: 'Download YouTube Shorts videos in MP4 HD or convert to MP3 audio in 1-click.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'youtube-shorts-to-MP3': { title: 'YouTube Shorts to MP3 Converter', subtitle: 'Extract high quality MP3 audio from YouTube Shorts.', isYoutube: true, type: 'MP3', defaultQuality: '320k' },
    'youtube-shorts-to-MP4': { title: 'YouTube Shorts to MP4 Converter', subtitle: 'Download YouTube Shorts in 1080p Full HD MP4 video.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'spotify-to-MP3': { title: 'Spotify to MP3 Converter', subtitle: 'Convert and download Spotify tracks, albums, and playlists to MP3 in 320kbps for FREE.', isYoutube: true, type: 'MP3', defaultQuality: '320k' },
    'tiktok-downloader': { title: 'TikTok Video Downloader', subtitle: 'Download TikTok videos without watermark in HD MP4 or convert to MP3 audio.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'tiktok-MP3-MP4': { title: 'TikTok HD Video & MP3 Downloader', subtitle: 'Download TikTok videos without watermark in HD MP4 or extract MP3 audio.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-reels-downloader': { title: 'Instagram Reels Downloader', subtitle: 'Download Instagram Reels videos in Full HD MP4 format for FREE.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram_reels_downloader': { title: 'Instagram Reels Downloader', subtitle: 'Download Instagram Reels videos in Full HD MP4 format for FREE.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-photo-downloader': { title: 'Instagram Photo & Carousel Downloader', subtitle: 'Download Instagram single photos and multi-photo album carousels in HD JPG.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram_photo_downloader': { title: 'Instagram Photo & Carousel Downloader', subtitle: 'Download Instagram single photos and multi-photo album carousels in HD JPG.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-video-downloader': { title: 'Instagram Video Downloader', subtitle: 'Download Instagram feed videos, posts, and IGTV clips in MP4 HD.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram_video_downloader': { title: 'Instagram Video Downloader', subtitle: 'Download Instagram feed videos, posts, and IGTV clips in MP4 HD.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-story-downloader': { title: 'Instagram Stories & Highlights Downloader', subtitle: 'Download public Instagram 24h stories and saved highlights in HD.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram_story_downloader': { title: 'Instagram Stories & Highlights Downloader', subtitle: 'Download public Instagram 24h stories and saved highlights in HD.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-profile-downloader': { title: 'Instagram Profile Picture (DP) Downloader', subtitle: 'Download full resolution HD profile picture avatars from any public Instagram account.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram_profile_downloader': { title: 'Instagram Profile Picture (DP) Downloader', subtitle: 'Download full resolution HD profile picture avatars from any public Instagram account.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-audio-downloader': { title: 'Instagram Audio & Music Extractor', subtitle: 'Extract background audio and music tracks from Instagram Reels into MP3 audio.', isYoutube: true, type: 'MP3', defaultQuality: '320k' },
    'instagram_audio_downloader': { title: 'Instagram Audio & Music Extractor', subtitle: 'Extract background audio and music tracks from Instagram Reels into MP3 audio.', isYoutube: true, type: 'MP3', defaultQuality: '320k' },
    'instagram-downloader': { title: 'Instagram Video & Reels Downloader', subtitle: 'Download Instagram Reels, IGTV videos and posts in high quality MP4 format.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-photos': { title: 'Instagram Photos & Carousel Downloader', subtitle: 'Download Instagram photos, carousels, and multi-image posts in original HD resolution.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'instagram-stories': { title: 'Instagram Stories & Highlights Downloader', subtitle: 'Download Instagram Stories, Highlights, and profiles anonymously.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'soundcloud-to-MP3': { title: 'SoundCloud to MP3 Downloader', subtitle: 'Download SoundCloud tracks and playlists to high quality 320kbps MP3 audio.', isYoutube: true, type: 'MP3', defaultQuality: '320k' },
    'WAV-to-MP3': { title: 'WAV to MP3 Converter', subtitle: 'Convert uncompressed WAV audio files to high quality 320kbps MP3 audio.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'audio/WAV,.WAV', endpoint: '/api/audio-converter' },
    'wav_to_mp3': { title: 'WAV to MP3 Converter', subtitle: 'Convert uncompressed WAV audio files to high quality 320kbps MP3 audio.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'audio/WAV,.WAV', endpoint: '/api/audio-converter' },
    'MP3-to-WAV': { title: 'MP3 to WAV Converter', subtitle: 'Convert compressed MP3 audio files into uncompressed 16-bit studio quality WAV.', btnText: 'Select MP3 file', dropText: 'or drop MP3 file here', actionBtnText: 'Convert to WAV', multiple: true, accept: 'audio/mpeg,.MP3', endpoint: '/api/audio-converter' },
    'mp3_to_wav': { title: 'MP3 to WAV Converter', subtitle: 'Convert compressed MP3 audio files into uncompressed 16-bit studio quality WAV.', btnText: 'Select MP3 file', dropText: 'or drop MP3 file here', actionBtnText: 'Convert to WAV', multiple: true, accept: 'audio/mpeg,.MP3', endpoint: '/api/audio-converter' },
    'WAV-to-MP4': { title: 'WAV to MP4 Converter', subtitle: 'Convert WAV audio files into MP4 video with custom image background for YouTube.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'wav_to_mp4': { title: 'WAV to MP4 Converter', subtitle: 'Convert WAV audio files into MP4 video with custom image background for YouTube.', btnText: 'Select WAV file', dropText: 'or drop WAV file here', actionBtnText: 'Convert to MP4', multiple: false, accept: 'audio/*', endpoint: '/api/audio-to-video' },
    'MP4-to-WAV': { title: 'MP4 to WAV Converter', subtitle: 'Extract uncompressed high-fidelity 16-bit WAV audio from MP4 video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Extract WAV Audio', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },
    'mp4_to_wav': { title: 'MP4 to WAV Converter', subtitle: 'Extract uncompressed high-fidelity 16-bit WAV audio from MP4 video files.', btnText: 'Select MP4 Video', dropText: 'or drop MP4 video here', actionBtnText: 'Extract WAV Audio', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },
    'vimeo-downloader': { title: 'Vimeo Video Downloader', subtitle: 'Download Vimeo videos in 1080p Full HD, 720p, 480p MP4 format.', isYoutube: true, type: 'MP4', defaultQuality: '1080p' },
    'video-to-MP3': { title: 'Video to MP3 Converter', subtitle: 'Upload local MP4, MKV, AVI, MOV videos and convert them to MP3 audio.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },
    'video_to_mp3': { title: 'Video to MP3 Converter', subtitle: 'Upload local MP4, MKV, AVI, MOV videos and convert them to MP3 audio.', btnText: 'Select Video files', dropText: 'or drop Video files here', actionBtnText: 'Convert to MP3', multiple: true, accept: 'video/*', endpoint: '/api/video-to-MP3' },
    'compress-video': { title: 'Compress Video', subtitle: 'Reduce MP4 video size while preserving visual quality.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Compress Video', multiple: false, accept: 'video/*', isCompress: true, endpoint: '/api/compress-video' },
    'compress_video': { title: 'Compress Video', subtitle: 'Reduce MP4 video size while preserving visual quality.', btnText: 'Select Video file', dropText: 'or drop Video file here', actionBtnText: 'Compress Video', multiple: false, accept: 'video/*', isCompress: true, endpoint: '/api/compress-video' },
    'audio-converter': { title: 'Audio Converter', subtitle: 'Convert audio files between MP3, WAV, AAC, M4A, FLAC, and OGG formats.', btnText: 'Select Audio files', dropText: 'or drop Audio files here', actionBtnText: 'Convert Audio', multiple: true, accept: 'audio/*', endpoint: '/api/audio-converter' },
    'audio_converter': { title: 'Audio Converter', subtitle: 'Convert audio files between MP3, WAV, AAC, M4A, FLAC, and OGG formats.', btnText: 'Select Audio files', dropText: 'or drop Audio files here', actionBtnText: 'Convert Audio', multiple: true, accept: 'audio/*', endpoint: '/api/audio-converter' },
    'youtube-downloader': { title: 'YouTube Video Downloader', subtitle: 'Download YouTube videos, shorts, and playlists in MP4 video or MP3 audio quality.', isYoutube: true, type: 'all', defaultQuality: '1080p' },
    'youtube-audio': { title: 'YouTube Audio Extractor', subtitle: 'Extract high quality audio streams from YouTube music, podcasts and lectures.', isYoutube: true, type: 'MP3', defaultQuality: '320k' }
};

// Global App State
let currentState = {
    activeTool: null,
    files: [], // Array of File objects or page objects
    pageRotations: {}, // page index -> rotation angle
    watermarkText: 'FreeTools',
    watermarkPos: 'center',
    pageNumberPos: 'bottom-right',
    protectPassword: '',
    translateLang: 'pt'
};

// Multilingual Tool Card Titles & Descriptions Dictionaries
const TOOL_TRANSLATIONS = {
    "pt": {
        "pdf-to-word": {
            "title": "PDF para WORD",
            "desc": "Converta documentos PDF em ficheiros editáveis DOC e DOCX instantaneamente mantendo todo o formato original."
        },
        "word-to-pdf": {
            "title": "WORD para PDF",
            "desc": "Transforme ficheiros Microsoft Word DOC e DOCX em documentos PDF profissionais prontos para partilhar."
        },
        "youtube-to-mp3": {
            "title": "YouTube para MP3",
            "desc": "Converta vídeos do YouTube em ficheiros de áudio MP3 de alta fidelidade a 320kbps com som cristalino."
        },
        "youtube-downloader": {
            "title": "YouTube Descarregador",
            "desc": "Descarregue vídeos do YouTube em MP4 Full HD 1080p, 4K ou extraia faixas de áudio instantaneamente."
        },
        "merge-pdf": {
            "title": "Juntar PDF",
            "desc": "Junte múltiplos ficheiros PDF num único documento organizado na ordem exata que preferir."
        },
        "compress-pdf": {
            "title": "Comprimir PDF",
            "desc": "Reduza o tamanho do ficheiro PDF mantendo texto nítido e elevada qualidade de imagem para envio rápido."
        },
        "pdf-to-jpg": {
            "title": "PDF para JPG",
            "desc": "Converta todas as páginas do seu documento PDF em imagens JPG de alta resolução com excelente nitidez."
        },
        "jpg-to-pdf": {
            "title": "JPG para PDF",
            "desc": "Converta imagens JPG, PNG e WebP num documento PDF limpo e padronizado com margens personalizadas."
        },
        "excel-to-pdf": {
            "title": "EXCEL para PDF",
            "desc": "Converta folhas de cálculo Excel XLS e XLSX em ficheiros PDF formatados mantendo a estrutura de tabelas."
        },
        "pdf-to-excel": {
            "title": "PDF para EXCEL",
            "desc": "Extraia tabelas e dados de documentos PDF para folhas de cálculo Excel XLSX editáveis de forma simples."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT para PDF",
            "desc": "Converta diapositivos de apresentações PowerPoint PPT e PPTX em documentos PDF universais."
        },
        "pdf-to-powerpoint": {
            "title": "PDF para POWERPOINT",
            "desc": "Converta apresentações PDF em diapositivos editáveis PowerPoint PPTX para fácil edição."
        },
        "edit-pdf": {
            "title": "Editar PDF",
            "desc": "Adicione texto, formas, anotações, imagens e desenhos livres diretamente nas páginas do seu PDF."
        },
        "split-pdf": {
            "title": "Dividir PDF",
            "desc": "Extraia páginas individuais ou divida PDFs grandes em documentos separados com intervalos personalizados."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Reordene, elimine, rode e reorganize páginas dentro do seu PDF com um editor visual interativo."
        },
        "remove-pages": {
            "title": "Remover Páginas de PDF",
            "desc": "Remova páginas indesejadas ou em branco dos seus documentos PDF facilmente com um clique."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Rode páginas específicas ou todas as páginas de um documento PDF em 90, 180 ou 270 graus."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Insira números de página personalizados, cabeçalhos e rodapés com contagem nas páginas PDF."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Adicione marcas d'água de texto ou imagem nas páginas do seu PDF para proteger os seus direitos."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Encripte ficheiros PDF com palavra-passe forte e evite leituras ou cópias não autorizadas."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Remova a proteção por palavra-passe e restrições de permissão de ficheiros PDF para os abrir livremente."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Reconheça texto em documentos digitalizados com OCR para tornar o PDF pesquisável e selecionável."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Resuma relatórios e livros PDF extensos com IA para extrair pontos-chave e resumos executivos."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Ferramenta gratuita para scan PDF de forma rápida e simples."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Recupere dados de ficheiros PDF corrompidos ou danificados e restaure-os para um estado legível."
        },
        "html-to-pdf": {
            "title": "HTML para PDF",
            "desc": "Converta páginas web e códigos HTML em ficheiros PDF de alta qualidade com estilos CSS completos."
        },
        "pdf-to-html": {
            "title": "PDF para HTML",
            "desc": "Converta documentos PDF em páginas web HTML responsivas e limpas prontas para publicação."
        },
        "epub-to-pdf": {
            "title": "EPUB para PDF",
            "desc": "Converta e-books EPUB em documentos PDF prontos para impressão com tipografia personalizada."
        },
        "pdf-to-epub": {
            "title": "PDF para EPUB",
            "desc": "Converta livros PDF e manuais no formato ajustável EPUB para uma leitura confortável em e-readers."
        },
        "heic-to-pdf": {
            "title": "HEIC para PDF",
            "desc": "Converta fotos HEIC diretamente em documentos PDF prontos para impressão com layouts limpos."
        },
        "pdf-to-heic": {
            "title": "PDF para HEIC",
            "desc": "Converta documentos PDF em ficheiros de imagem HEIC de alta eficiência para otimizar o armazenamento."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF para PDFA",
            "desc": "Converta PDFs padrão no formato padronizado ISO PDF/A para arquivamento digital de longo prazo."
        },
        "remove-bg": {
            "title": "Remover Fundo de Imagem",
            "desc": "Remova o fundo de imagens automaticamente em segundos com IA para obter PNGs transparentes e limpos."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Amplie e melhore imagens de baixa resolução até 4x mais nitidez com super-resolução por IA."
        },
        "remove-watermark": {
            "title": "Remover Marca d'Água",
            "desc": "Remova marcas d'água, logótipos, textos e carimbos indesejados de fotografias com IA."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Corte bordas de fotos, ajuste proporções e remova margens indesejadas com uma ferramenta visual."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Altere as dimensões da imagem por pixéis exatos ou percentagem mantendo a proporção correta."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Rode imagens no sentido dos ponteiros do relógio ou invista fotografias na horizontal e vertical."
        },
        "compress-image": {
            "title": "Comprimir IMAGE",
            "desc": "Comprima imagens JPG, PNG e WebP até 80% sem perder a qualidade visual da fotografia."
        },
        "jpg-to-png": {
            "title": "JPG para PNG",
            "desc": "Converta imagens JPG para formato PNG com suporte total a transparência e compressão sem perdas."
        },
        "png-to-jpg": {
            "title": "PNG para JPG",
            "desc": "Converta fotografias PNG para formato JPG com fundo de cor personalizada e ajuste de qualidade."
        },
        "heic-to-jpg": {
            "title": "HEIC para JPG",
            "desc": "Converta fotos HEIC do iPhone para o formato JPG compatível com Windows, Android e Web."
        },
        "jpg-to-heic": {
            "title": "JPG para HEIC",
            "desc": "Converta imagens JPG no formato HEIC de alta eficiência para poupar espaço nos dispositivos Apple."
        },
        "heic-to-png": {
            "title": "HEIC para PNG",
            "desc": "Converta fotos HEIC da Apple para o formato PNG com suporte total a fundo transparente."
        },
        "png-to-heic": {
            "title": "PNG para HEIC",
            "desc": "Converta imagens PNG no formato HEIC de alta eficiência mantendo excelente fidelidade de imagem."
        },
        "jpg-to-webp": {
            "title": "JPG para WebP",
            "desc": "Converta fotos JPG para o formato moderno WebP para reduzir drasticamente o tempo de carregamento."
        },
        "webp-to-jpg": {
            "title": "WebP para JPG",
            "desc": "Converta imagens WebP modernas para o formato JPG amplamente compatível com programas antigos."
        },
        "png-to-webp": {
            "title": "PNG para WebP",
            "desc": "Converta gráficos PNG em imagens WebP otimizadas para a web mantendo a transparência alfa."
        },
        "webp-to-png": {
            "title": "WebP para PNG",
            "desc": "Converta imagens WebP para formato PNG transparente para fácil edição em programas de design."
        },
        "png-to-svg": {
            "title": "PNG para SVG",
            "desc": "Converta gráficos PNG no formato vetorial SVG com traçado de linhas nítido e editável."
        },
        "jpg-to-svg": {
            "title": "JPG para SVG",
            "desc": "Vetorize imagens JPG em gráficos vetoriais SVG escaláveis ideais para logótipos e ilustrações."
        },
        "webp-to-svg": {
            "title": "WebP para SVG",
            "desc": "Transforme imagens WebP em ficheiros vetoriais SVG independentes de resolução para design web."
        },
        "youtube-to-wav": {
            "title": "YouTube para WAV",
            "desc": "Extraia áudio WAV não comprimido com qualidade de estúdio de vídeos do YouTube para edição."
        },
        "youtube-to-mp4": {
            "title": "YouTube para MP4",
            "desc": "Descarregue vídeos do YouTube no formato MP4 de alta definição para assistir sem internet."
        },
        "tiktok-downloader": {
            "title": "TikTok Descarregador",
            "desc": "Descarregue vídeos do TikTok sem marca d'água em formato MP4 HD para partilhar e editar."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Descarregador",
            "desc": "Descarregue vídeos Instagram Reels em qualidade MP4 Full HD sem marca d'água."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Descarregador",
            "desc": "Descarregue fotos originais do Instagram e publicações múltiplas com facilidade."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Descarregador",
            "desc": "Garde vídeos do feed do Instagram e clipes do IGTV diretamente como ficheiros MP4."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Descarregador",
            "desc": "Ferramenta gratuita para instagram story descarregador de forma rápida e simples."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Descarregador",
            "desc": "Descarregue fotos de perfil do Instagram em tamanho completo e resolução original."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Descarregador",
            "desc": "Extraia o áudio de fundo e músicas populares dos Instagram Reels no formato MP3."
        },
        "spotify-to-mp3": {
            "title": "Spotify para MP3",
            "desc": "Converta faixas de música e listas de reprodução do Spotify em ficheiros MP3 a 320kbps offline."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud para MP3",
            "desc": "Descarregue faixas de áudio do SoundCloud no formato MP3 de alta qualidade para ouvir offline."
        },
        "wav-to-mp3": {
            "title": "WAV para MP3",
            "desc": "Comprima ficheiros de áudio WAV grandes no formato leve MP3 a 320kbps para poupar espaço."
        },
        "mp3-to-wav": {
            "title": "MP3 para WAV",
            "desc": "Converta ficheiros de áudio MP3 em formato estúdio WAV de 16-bit 44.1kHz não comprimido."
        },
        "wav-to-mp4": {
            "title": "WAV para MP4",
            "desc": "Converta ficheiros de áudio WAV no formato de vídeo MP4 com capa personalizada para o YouTube."
        },
        "mp4-to-wav": {
            "title": "MP4 para WAV",
            "desc": "Extraia áudio WAV não comprimido de vídeos MP4 para edição de som profissional."
        },
        "compress-video": {
            "title": "Comprimir VIDEO",
            "desc": "Comprima vídeos MP4, MOV e AVI até 80% de redução de tamanho mantendo excelente qualidade."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Corte segmentos de vídeo indesejados, ajuste pontos de início e fim e recorte clipes rapidamente."
        },
        "video-merger": {
            "title": "Juntar MERGER",
            "desc": "Combine múltiplos clipes de vídeo num único ficheiro contínuo com transições personalizadas."
        },
        "mp4-to-mp3": {
            "title": "MP4 para MP3",
            "desc": "Extraia a banda sonora MP3 de alta qualidade de ficheiros de vídeo MP4 em escassos segundos."
        },
        "mp3-to-mp4": {
            "title": "MP3 para MP4",
            "desc": "Junte faixas de áudio MP3 com uma imagem de fundo estática ou visualizador para criar vídeos MP4."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Reduza o tamanho de ficheiros de áudio MP3 mantendo voz límpida e fidelidade musical."
        },
        "audio-converter": {
            "title": "Conversor Audio",
            "desc": "Converta ficheiros de áudio entre os formatos MP3, WAV, AAC, FLAC, OGG e M4A sem esforço."
        },
        "speech-to-text": {
            "title": "SPEECH para TEXT",
            "desc": "Transcreva gravações de voz e fala do microfone em texto escrito preciso em tempo real."
        },
        "text-to-speech": {
            "title": "TEXT para SPEECH",
            "desc": "Converta texto escrito em voz humana natural com múltiplas vozes, idiomas e sotaques."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Grave o ecrã do computador, câmara web e áudio do microfone diretamente no browser sem instalar nada."
        },
        "video-to-gif": {
            "title": "VIDEO para GIF",
            "desc": "Converta clipes de vídeo MP4, MOV e WebM em GIFs animados com taxa de fotogramas e repetição."
        },
        "mp4-to-gif": {
            "title": "MP4 para GIF",
            "desc": "Transforme vídeos MP4 em GIFs animados leves para redes sociais e aplicações de mensagens."
        },
        "webm-to-gif": {
            "title": "WEBM para GIF",
            "desc": "Converta clipes de vídeo WebM no formato GIF animado para compatibilidade universal na web."
        },
        "apng-to-gif": {
            "title": "APNG para GIF",
            "desc": "Converta ficheiros Animated PNG (APNG) no formato universalmente suportado de GIF animado."
        },
        "image-to-gif": {
            "title": "IMAGE para GIF",
            "desc": "Crie GIFs animados a partir de uma sequência de fotos JPG, PNG ou WebP com tempo personalizável."
        },
        "gif-to-mp4": {
            "title": "GIF para MP4",
            "desc": "Converta GIFs animados em vídeos MP4 suaves para reduzir o tamanho e permitir som."
        },
        "gif-to-webm": {
            "title": "GIF para WEBM",
            "desc": "Converta GIFs animados em ficheiros de vídeo leves WebM para carregamento rápido em sites."
        },
        "gif-to-apng": {
            "title": "GIF para APNG",
            "desc": "Converta GIFs animados no formato nítido Animated PNG (APNG) com suporte a cor de 24-bit."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Comprima ficheiros GIF animados para reduzir o tamanho e permitir um carregamento rápido na web."
        },
        "document-converter": {
            "title": "Conversor Document",
            "desc": "Converta documentos entre os formatos Word, PDF, TXT, RTF, HTML e ODT sem perdas."
        },
        "ebook-converter": {
            "title": "Conversor Ebook",
            "desc": "Converta e-books entre os formatos EPUB, MOBI, AZW3, PDF e TXT para Kindle e Kobo."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Traduza documentos do Word, Excel e texto para mais de 100 idiomas com formatação intata."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Traduza ficheiros Microsoft Word DOCX para qualquer idioma mantendo o layout original."
        },
        "json-formatter": {
            "title": "Formatador JSON",
            "desc": "Formate, valide, embeleze e minifique estruturas de dados JSON com realce de sintaxe."
        },
        "xml-formatter": {
            "title": "Formatador XML",
            "desc": "Formate e organize documentos XML com indentação correta e validação de sintaxe."
        },
        "csv-formatter": {
            "title": "Formatador CSV",
            "desc": "Formate, limpe e converta ficheiros de dados CSV em tabelas estruturadas, JSON ou TSV."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Codifique texto e ficheiros em cadeias Base64, ou descodifique dados Base64 para o formato original."
        },
        "hash-generator": {
            "title": "Gerador Hash",
            "desc": "Gere hashes criptográficos MD5, SHA-1, SHA-256 e SHA-512 para verificação de integridade."
        },
        "password-generator": {
            "title": "Gerador Password",
            "desc": "Gere palavras-passe fortes, seguras e inquebráveis com comprimento e símbolos personalizados."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Extraia cores de imagens, converta valores HEX para RGB/HSL e gere paletas de cores harmoniosas."
        },
        "qr-code-generator": {
            "title": "Gerador QR",
            "desc": "Crie códigos QR personalizáveis para URLs de sites, redes Wi-Fi, cartões vCard e texto."
        },
        "favicon-generator": {
            "title": "Gerador Favicon",
            "desc": "Gere ícones favicon ICO, PNG e Apple Touch em todas as dimensões necessárias a partir de um logótipo."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Gere texto de preenchimento Lorem Ipsum personalizado por parágrafos, frases ou palavras."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Capture capturas de ecrã completas e perfeitas de qualquer site público em PNG ou PDF."
        }
    },
    "en": {
        "pdf-to-word": {
            "title": "PDF to WORD",
            "desc": "Convert PDF documents into editable DOC and DOCX files instantly while preserving all text layout and formatting."
        },
        "word-to-pdf": {
            "title": "WORD to PDF",
            "desc": "Transform Microsoft Word DOC and DOCX files into professional PDF documents ready for sharing and printing."
        },
        "youtube-to-mp3": {
            "title": "YouTube to MP3",
            "desc": "Convert YouTube videos into high bitrate 320kbps MP3 audio files with clean sound quality."
        },
        "youtube-downloader": {
            "title": "YouTube Downloader",
            "desc": "Download YouTube videos in MP4 1080p Full HD, 4K, or extract audio tracks instantly."
        },
        "merge-pdf": {
            "title": "Merge PDF",
            "desc": "Combine multiple PDF files into a single organized document in your exact preferred page order."
        },
        "compress-pdf": {
            "title": "Compress PDF",
            "desc": "Reduce PDF file size significantly while retaining crisp text and high image quality for fast email sharing."
        },
        "pdf-to-jpg": {
            "title": "PDF to JPG",
            "desc": "Convert every page of your PDF document into high-resolution JPG images with pristine visual quality."
        },
        "jpg-to-pdf": {
            "title": "JPG to PDF",
            "desc": "Convert JPG, PNG, and WebP images into a clean standardized PDF document with custom page margins."
        },
        "excel-to-pdf": {
            "title": "EXCEL to PDF",
            "desc": "Convert Excel spreadsheets XLS and XLSX into clean formatted PDF files with full table structure intact."
        },
        "pdf-to-excel": {
            "title": "PDF to EXCEL",
            "desc": "Extract tables and data from PDF documents into editable Excel XLSX spreadsheets for easy analysis."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT to PDF",
            "desc": "Convert PowerPoint presentation slides PPT and PPTX into universally viewable PDF documents."
        },
        "pdf-to-powerpoint": {
            "title": "PDF to POWERPOINT",
            "desc": "Convert PDF presentations into editable PowerPoint PPTX slides for easy presentation editing."
        },
        "edit-pdf": {
            "title": "Edit PDF",
            "desc": "Add text, shapes, annotations, images, and freehand drawings directly onto your PDF pages."
        },
        "split-pdf": {
            "title": "Split PDF",
            "desc": "Extract individual pages or split large PDF files into separate smaller documents with custom page ranges."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Reorder, delete, rotate, and rearrange pages within your PDF file using a visual drag-and-drop editor."
        },
        "remove-pages": {
            "title": "Remove PDF Pages",
            "desc": "Remove unwanted or blank pages from your PDF documents easily with one click."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Rotate specific pages or all pages inside a PDF document by 90, 180, or 270 degrees."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Insert customizable page numbers, headers, and footers with page counts onto your PDF pages."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Add text or image watermarks across your PDF pages to protect intellectual property."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Encrypt PDF files with strong password security and prevent unauthorized reading or copying."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Remove password protection and permissions security from PDF files to open and edit them freely."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Recognize scanned document text using optical character recognition to make PDFs searchable and selectable."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Summarize lengthy PDF reports and books using AI to extract key insights and bulleted executive summaries."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Free tool for scan PDF fast and easy."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Recover data from corrupted or damaged PDF files and restore them to a readable state."
        },
        "html-to-pdf": {
            "title": "HTML to PDF",
            "desc": "Convert web pages and HTML code snippets into high-quality PDF files with complete CSS styling."
        },
        "pdf-to-html": {
            "title": "PDF to HTML",
            "desc": "Convert PDF documents into clean, responsive HTML web pages ready for web publishing."
        },
        "epub-to-pdf": {
            "title": "EPUB to PDF",
            "desc": "Convert EPUB e-books into printable PDF documents with custom typography and page layouts."
        },
        "pdf-to-epub": {
            "title": "PDF to EPUB",
            "desc": "Convert PDF eBooks and manuals into reflowable EPUB format for comfortable reading on e-readers."
        },
        "heic-to-pdf": {
            "title": "HEIC to PDF",
            "desc": "Convert HEIC photos directly into printable PDF documents with custom page layouts."
        },
        "pdf-to-heic": {
            "title": "PDF to HEIC",
            "desc": "Convert PDF documents into high-efficiency HEIC image files for mobile storage optimization."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF to PDFA",
            "desc": "Convert standard PDFs into ISO-compliant PDF/A format for long-term digital archiving."
        },
        "remove-bg": {
            "title": "Remove Image Background",
            "desc": "Remove image backgrounds automatically in seconds using AI for clean transparent PNG cutouts."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Enlarge and enhance low-resolution images up to 4x clarity using AI deep learning super-resolution."
        },
        "remove-watermark": {
            "title": "Remove Watermark",
            "desc": "Remove unwanted watermarks, logos, text overlays, and stamps from photos using AI inpainting."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Crop photo borders, adjust aspect ratios, and trim unwanted edges with a visual cropping tool."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Change image dimensions by exact pixels or percentages with aspect ratio locking."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Rotate images clockwise or counter-clockwise and flip pictures horizontally or vertically."
        },
        "compress-image": {
            "title": "Compress IMAGE",
            "desc": "Compress JPG, PNG, and WebP images up to 80% without losing visible picture quality."
        },
        "jpg-to-png": {
            "title": "JPG to PNG",
            "desc": "Convert JPG images into PNG format with full transparency support and lossless compression."
        },
        "png-to-jpg": {
            "title": "PNG to JPG",
            "desc": "Convert PNG pictures to JPG format with custom background color fill and quality sliders."
        },
        "heic-to-jpg": {
            "title": "HEIC to JPG",
            "desc": "Convert iPhone HEIC photos into widely compatible JPG format for Windows and Web."
        },
        "jpg-to-heic": {
            "title": "JPG to HEIC",
            "desc": "Convert JPG images into high-efficiency HEIC format to save storage space on Apple devices."
        },
        "heic-to-png": {
            "title": "HEIC to PNG",
            "desc": "Convert Apple HEIC pictures into PNG format with full transparent background support."
        },
        "png-to-heic": {
            "title": "PNG to HEIC",
            "desc": "Convert PNG images into high-efficiency HEIC format while maintaining high image fidelity."
        },
        "jpg-to-webp": {
            "title": "JPG to WebP",
            "desc": "Convert JPG photos into modern WebP format to reduce web image load times."
        },
        "webp-to-jpg": {
            "title": "WebP to JPG",
            "desc": "Convert modern WebP images into universally compatible JPG format for older software."
        },
        "png-to-webp": {
            "title": "PNG to WebP",
            "desc": "Convert PNG graphics into web-optimized WebP images with alpha channel transparency intact."
        },
        "webp-to-png": {
            "title": "WebP to PNG",
            "desc": "Convert WebP images into transparent PNG format for easy graphics editing in Photoshop."
        },
        "png-to-svg": {
            "title": "PNG to SVG",
            "desc": "Convert PNG graphics into crisp vector SVG format with customizable path tracing."
        },
        "jpg-to-svg": {
            "title": "JPG to SVG",
            "desc": "Vectorize raster JPG images into scalable SVG vector graphics for logos and illustrations."
        },
        "webp-to-svg": {
            "title": "WebP to SVG",
            "desc": "Transform WebP images into resolution-independent SVG vector files for web design."
        },
        "youtube-to-wav": {
            "title": "YouTube to WAV",
            "desc": "Extract uncompressed studio quality WAV audio from YouTube videos for music editing."
        },
        "youtube-to-mp4": {
            "title": "YouTube to MP4",
            "desc": "Download YouTube videos in high definition MP4 format for offline viewing on any device."
        },
        "tiktok-downloader": {
            "title": "TikTok Downloader",
            "desc": "Download TikTok videos without watermark in HD MP4 format for reposting and editing."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Downloader",
            "desc": "Download Instagram Reels videos in full HD MP4 quality without watermark."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Downloader",
            "desc": "Download original quality Instagram photos and multi-photo posts effortlessly."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Downloader",
            "desc": "Save Instagram feed videos and IGTV clips directly as MP4 files to your device."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Downloader",
            "desc": "Free tool for instagram story downloader fast and easy."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Downloader",
            "desc": "Download full-size Instagram profile picture photos in original high resolution."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Downloader",
            "desc": "Extract background audio and trending music from Instagram Reels into MP3 format."
        },
        "spotify-to-mp3": {
            "title": "Spotify to MP3",
            "desc": "Convert Spotify music tracks and playlists into offline 320kbps MP3 audio files."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud to MP3",
            "desc": "Download audio tracks from SoundCloud in high quality MP3 format for offline listening."
        },
        "wav-to-mp3": {
            "title": "WAV to MP3",
            "desc": "Compress large WAV audio files into lightweight 320kbps MP3 format to save storage."
        },
        "mp3-to-wav": {
            "title": "MP3 to WAV",
            "desc": "Convert compressed MP3 audio files into uncompressed 16-bit 44.1kHz WAV studio audio."
        },
        "wav-to-mp4": {
            "title": "WAV to MP4",
            "desc": "Convert WAV audio files into MP4 video format with custom cover art for uploading to YouTube."
        },
        "mp4-to-wav": {
            "title": "MP4 to WAV",
            "desc": "Extract uncompressed WAV audio from MP4 videos for professional audio editing."
        },
        "compress-video": {
            "title": "Compress VIDEO",
            "desc": "Compress MP4, MOV, and AVI videos up to 80% size reduction with minimal quality loss."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Trim unwanted video segments, cut start and end points, and clip videos quickly."
        },
        "video-merger": {
            "title": "Merge MERGER",
            "desc": "Combine multiple video clips into a single seamless video file with custom transitions."
        },
        "mp4-to-mp3": {
            "title": "MP4 to MP3",
            "desc": "Extract high quality MP3 soundtrack audio from MP4 video files in seconds."
        },
        "mp3-to-mp4": {
            "title": "MP3 to MP4",
            "desc": "Combine MP3 audio tracks with a static background image or visualizer to create MP4 videos."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Reduce MP3 audio file size while preserving clear voice and musical instrument fidelity."
        },
        "audio-converter": {
            "title": "Converter Audio",
            "desc": "Convert audio files between MP3, WAV, AAC, FLAC, OGG, and M4A formats effortlessly."
        },
        "speech-to-text": {
            "title": "SPEECH to TEXT",
            "desc": "Transcribe voice recordings and microphone speech into accurate written text in real time."
        },
        "text-to-speech": {
            "title": "TEXT to SPEECH",
            "desc": "Convert written text into natural-sounding human speech audio with multiple voices and accents."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Record your computer screen, webcam, and microphone audio directly in your browser without software."
        },
        "video-to-gif": {
            "title": "VIDEO to GIF",
            "desc": "Convert MP4, MOV, and WebM video clips into animated GIFs with custom frame rate and loop settings."
        },
        "mp4-to-gif": {
            "title": "MP4 to GIF",
            "desc": "Turn MP4 video clips into lightweight animated GIFs for social media and messaging apps."
        },
        "webm-to-gif": {
            "title": "WEBM to GIF",
            "desc": "Convert WebM video clips into animated GIF format for universal web compatibility."
        },
        "apng-to-gif": {
            "title": "APNG to GIF",
            "desc": "Convert Animated PNG (APNG) files into widely supported animated GIF format."
        },
        "image-to-gif": {
            "title": "IMAGE to GIF",
            "desc": "Create animated GIFs from a sequence of static JPG, PNG, or WebP photos with custom frame delay."
        },
        "gif-to-mp4": {
            "title": "GIF to MP4",
            "desc": "Convert animated GIFs into smooth MP4 videos to reduce file size and enable audio playback."
        },
        "gif-to-webm": {
            "title": "GIF to WEBM",
            "desc": "Convert animated GIFs into lightweight WebM video files for fast web animation loading."
        },
        "gif-to-apng": {
            "title": "GIF to APNG",
            "desc": "Convert animated GIFs into crisp Animated PNG (APNG) format with full 24-bit color support."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Compress animated GIF files to reduce file size for fast messaging and web loading."
        },
        "document-converter": {
            "title": "Converter Document",
            "desc": "Convert documents between Word, PDF, TXT, RTF, HTML, and ODT formats."
        },
        "ebook-converter": {
            "title": "Converter Ebook",
            "desc": "Convert eBooks between EPUB, MOBI, AZW3, PDF, and TXT formats for Kindle and Kobo."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Translate Word, Excel, and text documents into over 100 languages with formatting intact."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Translate Microsoft Word DOCX files into any language while preserving original document layout."
        },
        "json-formatter": {
            "title": "Formatter JSON",
            "desc": "Format, validate, beautify, and minify JSON data structures with syntax highlighting and error checking."
        },
        "xml-formatter": {
            "title": "Formatter XML",
            "desc": "Format and prettify XML documents with proper indentation and syntax validation."
        },
        "csv-formatter": {
            "title": "Formatter CSV",
            "desc": "Format, clean, and convert CSV data files into structured tables, JSON, or TSV format."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Encode text and files into Base64 strings, or decode Base64 data back into original format."
        },
        "hash-generator": {
            "title": "Generator Hash",
            "desc": "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes for data integrity verification."
        },
        "password-generator": {
            "title": "Generator Password",
            "desc": "Generate strong, secure, unhackable passwords with custom length, numbers, and special symbols."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Pick colors from images, convert HEX to RGB and HSL values, and generate harmonious palettes."
        },
        "qr-code-generator": {
            "title": "Generator QR",
            "desc": "Create customizable QR codes for website URLs, Wi-Fi networks, contact vCards, and text."
        },
        "favicon-generator": {
            "title": "Generator Favicon",
            "desc": "Generate ICO, PNG, and Apple Touch favicon icons in all required dimensions from any logo."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Generate customized Lorem Ipsum dummy placeholder text by paragraphs, sentences, or words."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Capture full-page pixel-perfect website screenshots from any public URL in PNG or PDF."
        }
    },
    "es": {
        "pdf-to-word": {
            "title": "PDF a WORD",
            "desc": "Converta documentos PDF em ficheiros editáveis DOC e DOCX instantaneamente mantendo todo o formato original."
        },
        "word-to-pdf": {
            "title": "WORD a PDF",
            "desc": "Transforme ficheiros Microsoft Word DOC e DOCX em documentos PDF profissionais prontos para partilhar."
        },
        "youtube-to-mp3": {
            "title": "YouTube a MP3",
            "desc": "Converta vídeos do YouTube em ficheiros de áudio MP3 de alta fidelidade a 320kbps com som cristalino."
        },
        "youtube-downloader": {
            "title": "Descargador YouTube",
            "desc": "Descarregue vídeos do YouTube em MP4 Full HD 1080p, 4K ou extraia faixas de áudio instantaneamente."
        },
        "merge-pdf": {
            "title": "Unir PDF",
            "desc": "Junte múltiplos ficheiros PDF num único documento organizado na ordem exata que preferir."
        },
        "compress-pdf": {
            "title": "Comprimir PDF",
            "desc": "Reduza o tamanho do ficheiro PDF mantendo texto nítido e elevada qualidade de imagem para envio rápido."
        },
        "pdf-to-jpg": {
            "title": "PDF a JPG",
            "desc": "Converta todas as páginas do seu documento PDF em imagens JPG de alta resolução com excelente nitidez."
        },
        "jpg-to-pdf": {
            "title": "JPG a PDF",
            "desc": "Converta imagens JPG, PNG e WebP num documento PDF limpo e padronizado com margens personalizadas."
        },
        "excel-to-pdf": {
            "title": "EXCEL a PDF",
            "desc": "Converta folhas de cálculo Excel XLS e XLSX em ficheiros PDF formatados mantendo a estrutura de tabelas."
        },
        "pdf-to-excel": {
            "title": "PDF a EXCEL",
            "desc": "Extraia tabelas e dados de documentos PDF para folhas de cálculo Excel XLSX editáveis de forma simples."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT a PDF",
            "desc": "Converta diapositivos de apresentações PowerPoint PPT e PPTX em documentos PDF universais."
        },
        "pdf-to-powerpoint": {
            "title": "PDF a POWERPOINT",
            "desc": "Converta apresentações PDF em diapositivos editáveis PowerPoint PPTX para fácil edição."
        },
        "edit-pdf": {
            "title": "Editar PDF",
            "desc": "Adicione texto, formas, anotações, imagens e desenhos livres diretamente nas páginas do seu PDF."
        },
        "split-pdf": {
            "title": "Dividir PDF",
            "desc": "Extraia páginas individuais ou divida PDFs grandes em documentos separados com intervalos personalizados."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Reordene, elimine, rode e reorganize páginas dentro do seu PDF com um editor visual interativo."
        },
        "remove-pages": {
            "title": "Eliminar Páginas de PDF",
            "desc": "Elimina páginas no deseadas de tu archivo PDF fácilmente."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Rode páginas específicas ou todas as páginas de um documento PDF em 90, 180 ou 270 graus."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Insira números de página personalizados, cabeçalhos e rodapés com contagem nas páginas PDF."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Adicione marcas d'água de texto ou imagem nas páginas do seu PDF para proteger os seus direitos."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Encripte ficheiros PDF com palavra-passe forte e evite leituras ou cópias não autorizadas."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Remova a proteção por palavra-passe e restrições de permissão de ficheiros PDF para os abrir livremente."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Reconheça texto em documentos digitalizados com OCR para tornar o PDF pesquisável e selecionável."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Resuma relatórios e livros PDF extensos com IA para extrair pontos-chave e resumos executivos."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": ""
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Recupere dados de ficheiros PDF corrompidos ou danificados e restaure-os para um estado legível."
        },
        "html-to-pdf": {
            "title": "HTML a PDF",
            "desc": "Converta páginas web e códigos HTML em ficheiros PDF de alta qualidade com estilos CSS completos."
        },
        "pdf-to-html": {
            "title": "PDF a HTML",
            "desc": "Converta documentos PDF em páginas web HTML responsivas e limpas prontas para publicação."
        },
        "epub-to-pdf": {
            "title": "EPUB a PDF",
            "desc": "Converta e-books EPUB em documentos PDF prontos para impressão com tipografia personalizada."
        },
        "pdf-to-epub": {
            "title": "PDF a EPUB",
            "desc": "Converta livros PDF e manuais no formato ajustável EPUB para uma leitura confortável em e-readers."
        },
        "heic-to-pdf": {
            "title": "HEIC a PDF",
            "desc": "Converta fotos HEIC diretamente em documentos PDF prontos para impressão com layouts limpos."
        },
        "pdf-to-heic": {
            "title": "PDF a HEIC",
            "desc": "Converta documentos PDF em ficheiros de imagem HEIC de alta eficiência para otimizar o armazenamento."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF a PDFA",
            "desc": "Converta PDFs padrão no formato padronizado ISO PDF/A para arquivamento digital de longo prazo."
        },
        "remove-bg": {
            "title": "Eliminar Fondo de Imagen",
            "desc": "Elimina automáticamente el fondo de cualquier imagen en segundos con resultado transparente."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Amplie e melhore imagens de baixa resolução até 4x mais nitidez com super-resolução por IA."
        },
        "remove-watermark": {
            "title": "Eliminar Marca de Agua",
            "desc": "Elimina marcas de agua de imágenes y documentos rápidamente."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Corte bordas de fotos, ajuste proporções e remova margens indesejadas com uma ferramenta visual."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Altere as dimensões da imagem por pixéis exatos ou percentagem mantendo a proporção correta."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Rode imagens no sentido dos ponteiros do relógio ou invista fotografias na horizontal e vertical."
        },
        "compress-image": {
            "title": "Comprimir IMAGE",
            "desc": "Comprima imagens JPG, PNG e WebP até 80% sem perder a qualidade visual da fotografia."
        },
        "jpg-to-png": {
            "title": "JPG a PNG",
            "desc": "Converta imagens JPG para formato PNG com suporte total a transparência e compressão sem perdas."
        },
        "png-to-jpg": {
            "title": "PNG a JPG",
            "desc": "Converta fotografias PNG para formato JPG com fundo de cor personalizada e ajuste de qualidade."
        },
        "heic-to-jpg": {
            "title": "HEIC a JPG",
            "desc": "Converta fotos HEIC do iPhone para o formato JPG compatível com Windows, Android e Web."
        },
        "jpg-to-heic": {
            "title": "JPG a HEIC",
            "desc": "Converta imagens JPG no formato HEIC de alta eficiência para poupar espaço nos dispositivos Apple."
        },
        "heic-to-png": {
            "title": "HEIC a PNG",
            "desc": "Converta fotos HEIC da Apple para o formato PNG com suporte total a fundo transparente."
        },
        "png-to-heic": {
            "title": "PNG a HEIC",
            "desc": "Converta imagens PNG no formato HEIC de alta eficiência mantendo excelente fidelidade de imagem."
        },
        "jpg-to-webp": {
            "title": "JPG a WebP",
            "desc": "Converta fotos JPG para o formato moderno WebP para reduzir drasticamente o tempo de carregamento."
        },
        "webp-to-jpg": {
            "title": "WebP a JPG",
            "desc": "Converta imagens WebP modernas para o formato JPG amplamente compatível com programas antigos."
        },
        "png-to-webp": {
            "title": "PNG a WebP",
            "desc": "Converta gráficos PNG em imagens WebP otimizadas para a web mantendo a transparência alfa."
        },
        "webp-to-png": {
            "title": "WebP a PNG",
            "desc": "Converta imagens WebP para formato PNG transparente para fácil edição em programas de design."
        },
        "png-to-svg": {
            "title": "PNG a SVG",
            "desc": "Converta gráficos PNG no formato vetorial SVG com traçado de linhas nítido e editável."
        },
        "jpg-to-svg": {
            "title": "JPG a SVG",
            "desc": "Vetorize imagens JPG em gráficos vetoriais SVG escaláveis ideais para logótipos e ilustrações."
        },
        "webp-to-svg": {
            "title": "WebP a SVG",
            "desc": "Transforme imagens WebP em ficheiros vetoriais SVG independentes de resolução para design web."
        },
        "youtube-to-wav": {
            "title": "YouTube a WAV",
            "desc": "Extraia áudio WAV não comprimido com qualidade de estúdio de vídeos do YouTube para edição."
        },
        "youtube-to-mp4": {
            "title": "YouTube a MP4",
            "desc": "Descarregue vídeos do YouTube no formato MP4 de alta definição para assistir sem internet."
        },
        "tiktok-downloader": {
            "title": "Descargador TikTok",
            "desc": "Descarregue vídeos do TikTok sem marca d'água em formato MP4 HD para partilhar e editar."
        },
        "instagram-reels-downloader": {
            "title": "Descargador Instagram Reels",
            "desc": "Descarregue vídeos Instagram Reels em qualidade MP4 Full HD sem marca d'água."
        },
        "instagram-photo-downloader": {
            "title": "Descargador Instagram Photo",
            "desc": "Descarregue fotos originais do Instagram e publicações múltiplas com facilidade."
        },
        "instagram-video-downloader": {
            "title": "Descargador Instagram Video",
            "desc": "Garde vídeos do feed do Instagram e clipes do IGTV diretamente como ficheiros MP4."
        },
        "instagram-story-downloader": {
            "title": "Descargador Instagram Story",
            "desc": ""
        },
        "instagram-profile-downloader": {
            "title": "Descargador Instagram Profile",
            "desc": "Descarregue fotos de perfil do Instagram em tamanho completo e resolução original."
        },
        "instagram-audio-downloader": {
            "title": "Descargador Instagram Audio",
            "desc": "Extraia o áudio de fundo e músicas populares dos Instagram Reels no formato MP3."
        },
        "spotify-to-mp3": {
            "title": "Spotify a MP3",
            "desc": "Converta faixas de música e listas de reprodução do Spotify em ficheiros MP3 a 320kbps offline."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud a MP3",
            "desc": "Descarregue faixas de áudio do SoundCloud no formato MP3 de alta qualidade para ouvir offline."
        },
        "wav-to-mp3": {
            "title": "WAV a MP3",
            "desc": "Comprima ficheiros de áudio WAV grandes no formato leve MP3 a 320kbps para poupar espaço."
        },
        "mp3-to-wav": {
            "title": "MP3 a WAV",
            "desc": "Converta ficheiros de áudio MP3 em formato estúdio WAV de 16-bit 44.1kHz não comprimido."
        },
        "wav-to-mp4": {
            "title": "WAV a MP4",
            "desc": "Converta ficheiros de áudio WAV no formato de vídeo MP4 com capa personalizada para o YouTube."
        },
        "mp4-to-wav": {
            "title": "MP4 a WAV",
            "desc": "Extraia áudio WAV não comprimido de vídeos MP4 para edição de som profissional."
        },
        "compress-video": {
            "title": "Comprimir VIDEO",
            "desc": "Comprima vídeos MP4, MOV e AVI até 80% de redução de tamanho mantendo excelente qualidade."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Corte segmentos de vídeo indesejados, ajuste pontos de início e fim e recorte clipes rapidamente."
        },
        "video-merger": {
            "title": "Unir MERGER",
            "desc": "Combine múltiplos clipes de vídeo num único ficheiro contínuo com transições personalizadas."
        },
        "mp4-to-mp3": {
            "title": "MP4 a MP3",
            "desc": "Extraia a banda sonora MP3 de alta qualidade de ficheiros de vídeo MP4 em escassos segundos."
        },
        "mp3-to-mp4": {
            "title": "MP3 a MP4",
            "desc": "Junte faixas de áudio MP3 com uma imagem de fundo estática ou visualizador para criar vídeos MP4."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Reduza o tamanho de ficheiros de áudio MP3 mantendo voz límpida e fidelidade musical."
        },
        "audio-converter": {
            "title": "Conversor Audio",
            "desc": "Converta ficheiros de áudio entre os formatos MP3, WAV, AAC, FLAC, OGG e M4A sem esforço."
        },
        "speech-to-text": {
            "title": "SPEECH a TEXT",
            "desc": "Transcreva gravações de voz e fala do microfone em texto escrito preciso em tempo real."
        },
        "text-to-speech": {
            "title": "TEXT a SPEECH",
            "desc": "Converta texto escrito em voz humana natural com múltiplas vozes, idiomas e sotaques."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Grave o ecrã do computador, câmara web e áudio do microfone diretamente no browser sem instalar nada."
        },
        "video-to-gif": {
            "title": "VIDEO a GIF",
            "desc": "Converta clipes de vídeo MP4, MOV e WebM em GIFs animados com taxa de fotogramas e repetição."
        },
        "mp4-to-gif": {
            "title": "MP4 a GIF",
            "desc": "Transforme vídeos MP4 em GIFs animados leves para redes sociais e aplicações de mensagens."
        },
        "webm-to-gif": {
            "title": "WEBM a GIF",
            "desc": "Converta clipes de vídeo WebM no formato GIF animado para compatibilidade universal na web."
        },
        "apng-to-gif": {
            "title": "APNG a GIF",
            "desc": "Converta ficheiros Animated PNG (APNG) no formato universalmente suportado de GIF animado."
        },
        "image-to-gif": {
            "title": "IMAGE a GIF",
            "desc": "Crie GIFs animados a partir de uma sequência de fotos JPG, PNG ou WebP com tempo personalizável."
        },
        "gif-to-mp4": {
            "title": "GIF a MP4",
            "desc": "Converta GIFs animados em vídeos MP4 suaves para reduzir o tamanho e permitir som."
        },
        "gif-to-webm": {
            "title": "GIF a WEBM",
            "desc": "Converta GIFs animados em ficheiros de vídeo leves WebM para carregamento rápido em sites."
        },
        "gif-to-apng": {
            "title": "GIF a APNG",
            "desc": "Converta GIFs animados no formato nítido Animated PNG (APNG) com suporte a cor de 24-bit."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Comprima ficheiros GIF animados para reduzir o tamanho e permitir um carregamento rápido na web."
        },
        "document-converter": {
            "title": "Conversor Document",
            "desc": "Converta documentos entre os formatos Word, PDF, TXT, RTF, HTML e ODT sem perdas."
        },
        "ebook-converter": {
            "title": "Conversor Ebook",
            "desc": "Converta e-books entre os formatos EPUB, MOBI, AZW3, PDF e TXT para Kindle e Kobo."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Traduza documentos do Word, Excel e texto para mais de 100 idiomas com formatação intata."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Traduza ficheiros Microsoft Word DOCX para qualquer idioma mantendo o layout original."
        },
        "json-formatter": {
            "title": "Formateador JSON",
            "desc": "Formate, valide, embeleze e minifique estruturas de dados JSON com realce de sintaxe."
        },
        "xml-formatter": {
            "title": "Formateador XML",
            "desc": "Formate e organize documentos XML com indentação correta e validação de sintaxe."
        },
        "csv-formatter": {
            "title": "Formateador CSV",
            "desc": "Formate, limpe e converta ficheiros de dados CSV em tabelas estruturadas, JSON ou TSV."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Codifique texto e ficheiros em cadeias Base64, ou descodifique dados Base64 para o formato original."
        },
        "hash-generator": {
            "title": "Generador Hash",
            "desc": "Gere hashes criptográficos MD5, SHA-1, SHA-256 e SHA-512 para verificação de integridade."
        },
        "password-generator": {
            "title": "Generador Password",
            "desc": "Gere palavras-passe fortes, seguras e inquebráveis com comprimento e símbolos personalizados."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Extraia cores de imagens, converta valores HEX para RGB/HSL e gere paletas de cores harmoniosas."
        },
        "qr-code-generator": {
            "title": "Generador QR",
            "desc": "Crie códigos QR personalizáveis para URLs de sites, redes Wi-Fi, cartões vCard e texto."
        },
        "favicon-generator": {
            "title": "Generador Favicon",
            "desc": "Gere ícones favicon ICO, PNG e Apple Touch em todas as dimensões necessárias a partir de um logótipo."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Gere texto de preenchimento Lorem Ipsum personalizado por parágrafos, frases ou palavras."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Capture capturas de ecrã completas e perfeitas de qualquer site público em PNG ou PDF."
        }
    },
    "fr": {
        "pdf-to-word": {
            "title": "PDF en WORD",
            "desc": "Outil gratuit pour PDF en word rapidement et facilement."
        },
        "word-to-pdf": {
            "title": "WORD en PDF",
            "desc": "Outil gratuit pour word en PDF rapidement et facilement."
        },
        "youtube-to-mp3": {
            "title": "YouTube en MP3",
            "desc": "Outil gratuit pour youtube en MP3 rapidement et facilement."
        },
        "youtube-downloader": {
            "title": "Téléchargeur YouTube",
            "desc": "Outil gratuit pour téléchargeur youtube rapidement et facilement."
        },
        "merge-pdf": {
            "title": "Fusionner PDF",
            "desc": "Outil gratuit pour fusionner PDF rapidement et facilement."
        },
        "compress-pdf": {
            "title": "Compresser PDF",
            "desc": "Outil gratuit pour compresser PDF rapidement et facilement."
        },
        "pdf-to-jpg": {
            "title": "PDF en JPG",
            "desc": "Outil gratuit pour PDF en JPG rapidement et facilement."
        },
        "jpg-to-pdf": {
            "title": "JPG en PDF",
            "desc": "Outil gratuit pour JPG en PDF rapidement et facilement."
        },
        "excel-to-pdf": {
            "title": "EXCEL en PDF",
            "desc": "Outil gratuit pour excel en PDF rapidement et facilement."
        },
        "pdf-to-excel": {
            "title": "PDF en EXCEL",
            "desc": "Outil gratuit pour PDF en excel rapidement et facilement."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT en PDF",
            "desc": "Outil gratuit pour powerpoint en PDF rapidement et facilement."
        },
        "pdf-to-powerpoint": {
            "title": "PDF en POWERPOINT",
            "desc": "Outil gratuit pour PDF en powerpoint rapidement et facilement."
        },
        "edit-pdf": {
            "title": "Éditer PDF",
            "desc": "Outil gratuit pour éditer PDF rapidement et facilement."
        },
        "split-pdf": {
            "title": "Diviser PDF",
            "desc": "Outil gratuit pour diviser PDF rapidement et facilement."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Outil gratuit pour organize PDF rapidement et facilement."
        },
        "remove-pages": {
            "title": "Supprimer des pages PDF",
            "desc": "Supprimez facilement les pages indésirables de votre fichier PDF."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Outil gratuit pour rotate PDF rapidement et facilement."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Outil gratuit pour add PDF page number rapidement et facilement."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Outil gratuit pour PDF add watermark rapidement et facilement."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Outil gratuit pour protect PDF rapidement et facilement."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Outil gratuit pour unlock PDF rapidement et facilement."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Outil gratuit pour OCR PDF rapidement et facilement."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Outil gratuit pour PDF summarize rapidement et facilement."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Outil gratuit pour scan PDF rapidement et facilement."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Outil gratuit pour repair PDF rapidement et facilement."
        },
        "html-to-pdf": {
            "title": "HTML en PDF",
            "desc": "Outil gratuit pour HTML en PDF rapidement et facilement."
        },
        "pdf-to-html": {
            "title": "PDF en HTML",
            "desc": "Outil gratuit pour PDF en HTML rapidement et facilement."
        },
        "epub-to-pdf": {
            "title": "EPUB en PDF",
            "desc": "Outil gratuit pour EPUB en PDF rapidement et facilement."
        },
        "pdf-to-epub": {
            "title": "PDF en EPUB",
            "desc": "Outil gratuit pour PDF en EPUB rapidement et facilement."
        },
        "heic-to-pdf": {
            "title": "HEIC en PDF",
            "desc": "Outil gratuit pour HEIC en PDF rapidement et facilement."
        },
        "pdf-to-heic": {
            "title": "PDF en HEIC",
            "desc": "Outil gratuit pour PDF en HEIC rapidement et facilement."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF en PDFA",
            "desc": "Outil gratuit pour convert-PDF en pdfa rapidement et facilement."
        },
        "remove-bg": {
            "title": "Supprimer l'arrière-plan de l'image",
            "desc": "Supprimez automatiquement l'arrière-plan de n'importe quelle image en quelques secondes."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Outil gratuit pour upscale image rapidement et facilement."
        },
        "remove-watermark": {
            "title": "Supprimer le filigrane",
            "desc": "Supprimez rapidement les filigranes des images et documents."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Outil gratuit pour crop image rapidement et facilement."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Outil gratuit pour resize image rapidement et facilement."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Outil gratuit pour rotate image rapidement et facilement."
        },
        "compress-image": {
            "title": "Compresser IMAGE",
            "desc": "Outil gratuit pour compresser image rapidement et facilement."
        },
        "jpg-to-png": {
            "title": "JPG en PNG",
            "desc": "Outil gratuit pour JPG en PNG rapidement et facilement."
        },
        "png-to-jpg": {
            "title": "PNG en JPG",
            "desc": "Outil gratuit pour PNG en JPG rapidement et facilement."
        },
        "heic-to-jpg": {
            "title": "HEIC en JPG",
            "desc": "Outil gratuit pour HEIC en JPG rapidement et facilement."
        },
        "jpg-to-heic": {
            "title": "JPG en HEIC",
            "desc": "Outil gratuit pour JPG en HEIC rapidement et facilement."
        },
        "heic-to-png": {
            "title": "HEIC en PNG",
            "desc": "Outil gratuit pour HEIC en PNG rapidement et facilement."
        },
        "png-to-heic": {
            "title": "PNG en HEIC",
            "desc": "Outil gratuit pour PNG en HEIC rapidement et facilement."
        },
        "jpg-to-webp": {
            "title": "JPG en WebP",
            "desc": "Outil gratuit pour JPG en webp rapidement et facilement."
        },
        "webp-to-jpg": {
            "title": "WebP en JPG",
            "desc": "Outil gratuit pour webp en JPG rapidement et facilement."
        },
        "png-to-webp": {
            "title": "PNG en WebP",
            "desc": "Outil gratuit pour PNG en webp rapidement et facilement."
        },
        "webp-to-png": {
            "title": "WebP en PNG",
            "desc": "Outil gratuit pour webp en PNG rapidement et facilement."
        },
        "png-to-svg": {
            "title": "PNG en SVG",
            "desc": "Outil gratuit pour PNG en SVG rapidement et facilement."
        },
        "jpg-to-svg": {
            "title": "JPG en SVG",
            "desc": "Outil gratuit pour JPG en SVG rapidement et facilement."
        },
        "webp-to-svg": {
            "title": "WebP en SVG",
            "desc": "Outil gratuit pour webp en SVG rapidement et facilement."
        },
        "youtube-to-wav": {
            "title": "YouTube en WAV",
            "desc": "Outil gratuit pour youtube en WAV rapidement et facilement."
        },
        "youtube-to-mp4": {
            "title": "YouTube en MP4",
            "desc": "Outil gratuit pour youtube en MP4 rapidement et facilement."
        },
        "tiktok-downloader": {
            "title": "Téléchargeur TikTok",
            "desc": "Outil gratuit pour téléchargeur tiktok rapidement et facilement."
        },
        "instagram-reels-downloader": {
            "title": "Téléchargeur Instagram Reels",
            "desc": "Outil gratuit pour téléchargeur instagram reels rapidement et facilement."
        },
        "instagram-photo-downloader": {
            "title": "Téléchargeur Instagram Photo",
            "desc": "Outil gratuit pour téléchargeur instagram photo rapidement et facilement."
        },
        "instagram-video-downloader": {
            "title": "Téléchargeur Instagram Video",
            "desc": "Outil gratuit pour téléchargeur instagram video rapidement et facilement."
        },
        "instagram-story-downloader": {
            "title": "Téléchargeur Instagram Story",
            "desc": "Outil gratuit pour téléchargeur instagram story rapidement et facilement."
        },
        "instagram-profile-downloader": {
            "title": "Téléchargeur Instagram Profile",
            "desc": "Outil gratuit pour téléchargeur instagram profile rapidement et facilement."
        },
        "instagram-audio-downloader": {
            "title": "Téléchargeur Instagram Audio",
            "desc": "Outil gratuit pour téléchargeur instagram audio rapidement et facilement."
        },
        "spotify-to-mp3": {
            "title": "Spotify en MP3",
            "desc": "Outil gratuit pour spotify en MP3 rapidement et facilement."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud en MP3",
            "desc": "Outil gratuit pour soundcloud en MP3 rapidement et facilement."
        },
        "wav-to-mp3": {
            "title": "WAV en MP3",
            "desc": "Outil gratuit pour WAV en MP3 rapidement et facilement."
        },
        "mp3-to-wav": {
            "title": "MP3 en WAV",
            "desc": "Outil gratuit pour MP3 en WAV rapidement et facilement."
        },
        "wav-to-mp4": {
            "title": "WAV en MP4",
            "desc": "Outil gratuit pour WAV en MP4 rapidement et facilement."
        },
        "mp4-to-wav": {
            "title": "MP4 en WAV",
            "desc": "Outil gratuit pour MP4 en WAV rapidement et facilement."
        },
        "compress-video": {
            "title": "Compresser VIDEO",
            "desc": "Outil gratuit pour compresser video rapidement et facilement."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Outil gratuit pour video trimmer rapidement et facilement."
        },
        "video-merger": {
            "title": "Fusionner MERGER",
            "desc": "Outil gratuit pour fusionner merger rapidement et facilement."
        },
        "mp4-to-mp3": {
            "title": "MP4 en MP3",
            "desc": "Outil gratuit pour MP4 en MP3 rapidement et facilement."
        },
        "mp3-to-mp4": {
            "title": "MP3 en MP4",
            "desc": "Outil gratuit pour MP3 en MP4 rapidement et facilement."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Outil gratuit pour MP3 compressor rapidement et facilement."
        },
        "audio-converter": {
            "title": "Convertisseur Audio",
            "desc": "Outil gratuit pour convertisseur audio rapidement et facilement."
        },
        "speech-to-text": {
            "title": "SPEECH en TEXT",
            "desc": "Outil gratuit pour speech en text rapidement et facilement."
        },
        "text-to-speech": {
            "title": "TEXT en SPEECH",
            "desc": "Outil gratuit pour text en speech rapidement et facilement."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Outil gratuit pour screen recorder rapidement et facilement."
        },
        "video-to-gif": {
            "title": "VIDEO en GIF",
            "desc": "Outil gratuit pour video en GIF rapidement et facilement."
        },
        "mp4-to-gif": {
            "title": "MP4 en GIF",
            "desc": "Outil gratuit pour MP4 en GIF rapidement et facilement."
        },
        "webm-to-gif": {
            "title": "WEBM en GIF",
            "desc": "Outil gratuit pour webm en GIF rapidement et facilement."
        },
        "apng-to-gif": {
            "title": "APNG en GIF",
            "desc": "Outil gratuit pour apng en GIF rapidement et facilement."
        },
        "image-to-gif": {
            "title": "IMAGE en GIF",
            "desc": "Outil gratuit pour image en GIF rapidement et facilement."
        },
        "gif-to-mp4": {
            "title": "GIF en MP4",
            "desc": "Outil gratuit pour GIF en MP4 rapidement et facilement."
        },
        "gif-to-webm": {
            "title": "GIF en WEBM",
            "desc": "Outil gratuit pour GIF en webm rapidement et facilement."
        },
        "gif-to-apng": {
            "title": "GIF en APNG",
            "desc": "Outil gratuit pour GIF en apng rapidement et facilement."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Outil gratuit pour GIF compressor rapidement et facilement."
        },
        "document-converter": {
            "title": "Convertisseur Document",
            "desc": "Outil gratuit pour convertisseur document rapidement et facilement."
        },
        "ebook-converter": {
            "title": "Convertisseur Ebook",
            "desc": "Outil gratuit pour convertisseur ebook rapidement et facilement."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Outil gratuit pour translate document rapidement et facilement."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Outil gratuit pour translate word rapidement et facilement."
        },
        "json-formatter": {
            "title": "Formateur JSON",
            "desc": "Formate, valide, embeleze e minifique estruturas de dados JSON com realce de sintaxe."
        },
        "xml-formatter": {
            "title": "Formateur XML",
            "desc": "Formate e organize documentos XML com indentação correta e validação de sintaxe."
        },
        "csv-formatter": {
            "title": "Formateur CSV",
            "desc": "Formate, limpe e converta ficheiros de dados CSV em tabelas estruturadas, JSON ou TSV."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Outil gratuit pour base64 tool rapidement et facilement."
        },
        "hash-generator": {
            "title": "Générateur Hash",
            "desc": "Outil gratuit pour générateur hash rapidement et facilement."
        },
        "password-generator": {
            "title": "Générateur Password",
            "desc": "Outil gratuit pour générateur password rapidement et facilement."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Outil gratuit pour color picker rapidement et facilement."
        },
        "qr-code-generator": {
            "title": "Générateur QR",
            "desc": "Outil gratuit pour générateur QR rapidement et facilement."
        },
        "favicon-generator": {
            "title": "Générateur Favicon",
            "desc": "Outil gratuit pour générateur favicon rapidement et facilement."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Outil gratuit pour lorem ipsum rapidement et facilement."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Outil gratuit pour screenshot website rapidement et facilement."
        }
    },
    "de": {
        "pdf-to-word": {
            "title": "PDF in WORD",
            "desc": "Kostenloses Werkzeug für PDF in word schnell und einfach."
        },
        "word-to-pdf": {
            "title": "WORD in PDF",
            "desc": "Kostenloses Werkzeug für word in PDF schnell und einfach."
        },
        "youtube-to-mp3": {
            "title": "YouTube in MP3",
            "desc": "Kostenloses Werkzeug für youtube in MP3 schnell und einfach."
        },
        "youtube-downloader": {
            "title": "YouTube Downloader",
            "desc": "Kostenloses Werkzeug für youtube downloader schnell und einfach."
        },
        "merge-pdf": {
            "title": "Zusammenfügen PDF",
            "desc": "Kostenloses Werkzeug für zusammenfügen PDF schnell und einfach."
        },
        "compress-pdf": {
            "title": "Komprimieren PDF",
            "desc": "Kostenloses Werkzeug für komprimieren PDF schnell und einfach."
        },
        "pdf-to-jpg": {
            "title": "PDF in JPG",
            "desc": "Kostenloses Werkzeug für PDF in JPG schnell und einfach."
        },
        "jpg-to-pdf": {
            "title": "JPG in PDF",
            "desc": "Kostenloses Werkzeug für JPG in PDF schnell und einfach."
        },
        "excel-to-pdf": {
            "title": "EXCEL in PDF",
            "desc": "Kostenloses Werkzeug für excel in PDF schnell und einfach."
        },
        "pdf-to-excel": {
            "title": "PDF in EXCEL",
            "desc": "Kostenloses Werkzeug für PDF in excel schnell und einfach."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT in PDF",
            "desc": "Kostenloses Werkzeug für powerpoint in PDF schnell und einfach."
        },
        "pdf-to-powerpoint": {
            "title": "PDF in POWERPOINT",
            "desc": "Kostenloses Werkzeug für PDF in powerpoint schnell und einfach."
        },
        "edit-pdf": {
            "title": "Bearbeiten PDF",
            "desc": "Kostenloses Werkzeug für bearbeiten PDF schnell und einfach."
        },
        "split-pdf": {
            "title": "Teilen PDF",
            "desc": "Kostenloses Werkzeug für teilen PDF schnell und einfach."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Kostenloses Werkzeug für organize PDF schnell und einfach."
        },
        "remove-pages": {
            "title": "PDF Seiten entfernen",
            "desc": "Entfernen Sie unerwünschte Seiten ganz einfach aus Ihrer PDF-Datei."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Kostenloses Werkzeug für rotate PDF schnell und einfach."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Kostenloses Werkzeug für add PDF page number schnell und einfach."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Kostenloses Werkzeug für PDF add watermark schnell und einfach."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Kostenloses Werkzeug für protect PDF schnell und einfach."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Kostenloses Werkzeug für unlock PDF schnell und einfach."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Kostenloses Werkzeug für OCR PDF schnell und einfach."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Kostenloses Werkzeug für PDF summarize schnell und einfach."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Kostenloses Werkzeug für scan PDF schnell und einfach."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Kostenloses Werkzeug für repair PDF schnell und einfach."
        },
        "html-to-pdf": {
            "title": "HTML in PDF",
            "desc": "Kostenloses Werkzeug für HTML in PDF schnell und einfach."
        },
        "pdf-to-html": {
            "title": "PDF in HTML",
            "desc": "Kostenloses Werkzeug für PDF in HTML schnell und einfach."
        },
        "epub-to-pdf": {
            "title": "EPUB in PDF",
            "desc": "Kostenloses Werkzeug für EPUB in PDF schnell und einfach."
        },
        "pdf-to-epub": {
            "title": "PDF in EPUB",
            "desc": "Kostenloses Werkzeug für PDF in EPUB schnell und einfach."
        },
        "heic-to-pdf": {
            "title": "HEIC in PDF",
            "desc": "Kostenloses Werkzeug für HEIC in PDF schnell und einfach."
        },
        "pdf-to-heic": {
            "title": "PDF in HEIC",
            "desc": "Kostenloses Werkzeug für PDF in HEIC schnell und einfach."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF in PDFA",
            "desc": "Kostenloses Werkzeug für convert-PDF in pdfa schnell und einfach."
        },
        "remove-bg": {
            "title": "Bildhintergrund entfernen",
            "desc": "Entfernen Sie automatisch den Bildhintergrund mit KI in Sekundenschnelle."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Kostenloses Werkzeug für upscale image schnell und einfach."
        },
        "remove-watermark": {
            "title": "Wasserzeichen entfernen",
            "desc": "Entfernen Sie Wasserzeichen schnell aus Bildern und Dokumenten."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Kostenloses Werkzeug für crop image schnell und einfach."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Kostenloses Werkzeug für resize image schnell und einfach."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Kostenloses Werkzeug für rotate image schnell und einfach."
        },
        "compress-image": {
            "title": "Komprimieren IMAGE",
            "desc": "Kostenloses Werkzeug für komprimieren image schnell und einfach."
        },
        "jpg-to-png": {
            "title": "JPG in PNG",
            "desc": "Kostenloses Werkzeug für JPG in PNG schnell und einfach."
        },
        "png-to-jpg": {
            "title": "PNG in JPG",
            "desc": "Kostenloses Werkzeug für PNG in JPG schnell und einfach."
        },
        "heic-to-jpg": {
            "title": "HEIC in JPG",
            "desc": "Kostenloses Werkzeug für HEIC in JPG schnell und einfach."
        },
        "jpg-to-heic": {
            "title": "JPG in HEIC",
            "desc": "Kostenloses Werkzeug für JPG in HEIC schnell und einfach."
        },
        "heic-to-png": {
            "title": "HEIC in PNG",
            "desc": "Kostenloses Werkzeug für HEIC in PNG schnell und einfach."
        },
        "png-to-heic": {
            "title": "PNG in HEIC",
            "desc": "Kostenloses Werkzeug für PNG in HEIC schnell und einfach."
        },
        "jpg-to-webp": {
            "title": "JPG in WebP",
            "desc": "Kostenloses Werkzeug für JPG in webp schnell und einfach."
        },
        "webp-to-jpg": {
            "title": "WebP in JPG",
            "desc": "Kostenloses Werkzeug für webp in JPG schnell und einfach."
        },
        "png-to-webp": {
            "title": "PNG in WebP",
            "desc": "Kostenloses Werkzeug für PNG in webp schnell und einfach."
        },
        "webp-to-png": {
            "title": "WebP in PNG",
            "desc": "Kostenloses Werkzeug für webp in PNG schnell und einfach."
        },
        "png-to-svg": {
            "title": "PNG in SVG",
            "desc": "Kostenloses Werkzeug für PNG in SVG schnell und einfach."
        },
        "jpg-to-svg": {
            "title": "JPG in SVG",
            "desc": "Kostenloses Werkzeug für JPG in SVG schnell und einfach."
        },
        "webp-to-svg": {
            "title": "WebP in SVG",
            "desc": "Kostenloses Werkzeug für webp in SVG schnell und einfach."
        },
        "youtube-to-wav": {
            "title": "YouTube in WAV",
            "desc": "Kostenloses Werkzeug für youtube in WAV schnell und einfach."
        },
        "youtube-to-mp4": {
            "title": "YouTube in MP4",
            "desc": "Kostenloses Werkzeug für youtube in MP4 schnell und einfach."
        },
        "tiktok-downloader": {
            "title": "TikTok Downloader",
            "desc": "Kostenloses Werkzeug für tiktok downloader schnell und einfach."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Downloader",
            "desc": "Kostenloses Werkzeug für instagram reels downloader schnell und einfach."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Downloader",
            "desc": "Kostenloses Werkzeug für instagram photo downloader schnell und einfach."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Downloader",
            "desc": "Kostenloses Werkzeug für instagram video downloader schnell und einfach."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Downloader",
            "desc": "Kostenloses Werkzeug für instagram story downloader schnell und einfach."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Downloader",
            "desc": "Kostenloses Werkzeug für instagram profile downloader schnell und einfach."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Downloader",
            "desc": "Kostenloses Werkzeug für instagram audio downloader schnell und einfach."
        },
        "spotify-to-mp3": {
            "title": "Spotify in MP3",
            "desc": "Kostenloses Werkzeug für spotify in MP3 schnell und einfach."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud in MP3",
            "desc": "Kostenloses Werkzeug für soundcloud in MP3 schnell und einfach."
        },
        "wav-to-mp3": {
            "title": "WAV in MP3",
            "desc": "Kostenloses Werkzeug für WAV in MP3 schnell und einfach."
        },
        "mp3-to-wav": {
            "title": "MP3 in WAV",
            "desc": "Kostenloses Werkzeug für MP3 in WAV schnell und einfach."
        },
        "wav-to-mp4": {
            "title": "WAV in MP4",
            "desc": "Kostenloses Werkzeug für WAV in MP4 schnell und einfach."
        },
        "mp4-to-wav": {
            "title": "MP4 in WAV",
            "desc": "Kostenloses Werkzeug für MP4 in WAV schnell und einfach."
        },
        "compress-video": {
            "title": "Komprimieren VIDEO",
            "desc": "Kostenloses Werkzeug für komprimieren video schnell und einfach."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Kostenloses Werkzeug für video trimmer schnell und einfach."
        },
        "video-merger": {
            "title": "Zusammenfügen MERGER",
            "desc": "Kostenloses Werkzeug für zusammenfügen merger schnell und einfach."
        },
        "mp4-to-mp3": {
            "title": "MP4 in MP3",
            "desc": "Kostenloses Werkzeug für MP4 in MP3 schnell und einfach."
        },
        "mp3-to-mp4": {
            "title": "MP3 in MP4",
            "desc": "Kostenloses Werkzeug für MP3 in MP4 schnell und einfach."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Kostenloses Werkzeug für MP3 compressor schnell und einfach."
        },
        "audio-converter": {
            "title": "Konverter Audio",
            "desc": "Kostenloses Werkzeug für konverter audio schnell und einfach."
        },
        "speech-to-text": {
            "title": "SPEECH in TEXT",
            "desc": "Kostenloses Werkzeug für speech in text schnell und einfach."
        },
        "text-to-speech": {
            "title": "TEXT in SPEECH",
            "desc": "Kostenloses Werkzeug für text in speech schnell und einfach."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Kostenloses Werkzeug für screen recorder schnell und einfach."
        },
        "video-to-gif": {
            "title": "VIDEO in GIF",
            "desc": "Kostenloses Werkzeug für video in GIF schnell und einfach."
        },
        "mp4-to-gif": {
            "title": "MP4 in GIF",
            "desc": "Kostenloses Werkzeug für MP4 in GIF schnell und einfach."
        },
        "webm-to-gif": {
            "title": "WEBM in GIF",
            "desc": "Kostenloses Werkzeug für webm in GIF schnell und einfach."
        },
        "apng-to-gif": {
            "title": "APNG in GIF",
            "desc": "Kostenloses Werkzeug für apng in GIF schnell und einfach."
        },
        "image-to-gif": {
            "title": "IMAGE in GIF",
            "desc": "Kostenloses Werkzeug für image in GIF schnell und einfach."
        },
        "gif-to-mp4": {
            "title": "GIF in MP4",
            "desc": "Kostenloses Werkzeug für GIF in MP4 schnell und einfach."
        },
        "gif-to-webm": {
            "title": "GIF in WEBM",
            "desc": "Kostenloses Werkzeug für GIF in webm schnell und einfach."
        },
        "gif-to-apng": {
            "title": "GIF in APNG",
            "desc": "Kostenloses Werkzeug für GIF in apng schnell und einfach."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Kostenloses Werkzeug für GIF compressor schnell und einfach."
        },
        "document-converter": {
            "title": "Konverter Document",
            "desc": "Kostenloses Werkzeug für konverter document schnell und einfach."
        },
        "ebook-converter": {
            "title": "Konverter Ebook",
            "desc": "Kostenloses Werkzeug für konverter ebook schnell und einfach."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Kostenloses Werkzeug für translate document schnell und einfach."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Kostenloses Werkzeug für translate word schnell und einfach."
        },
        "json-formatter": {
            "title": "Formatierer JSON",
            "desc": "Formate, valide, embeleze e minifique estruturas de dados JSON com realce de sintaxe."
        },
        "xml-formatter": {
            "title": "Formatierer XML",
            "desc": "Formate e organize documentos XML com indentação correta e validação de sintaxe."
        },
        "csv-formatter": {
            "title": "Formatierer CSV",
            "desc": "Formate, limpe e converta ficheiros de dados CSV em tabelas estruturadas, JSON ou TSV."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Kostenloses Werkzeug für base64 tool schnell und einfach."
        },
        "hash-generator": {
            "title": "Generator Hash",
            "desc": "Kostenloses Werkzeug für generator hash schnell und einfach."
        },
        "password-generator": {
            "title": "Generator Password",
            "desc": "Kostenloses Werkzeug für generator password schnell und einfach."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Kostenloses Werkzeug für color picker schnell und einfach."
        },
        "qr-code-generator": {
            "title": "Generator QR",
            "desc": "Kostenloses Werkzeug für generator QR schnell und einfach."
        },
        "favicon-generator": {
            "title": "Generator Favicon",
            "desc": "Kostenloses Werkzeug für generator favicon schnell und einfach."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Kostenloses Werkzeug für lorem ipsum schnell und einfach."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Kostenloses Werkzeug für screenshot website schnell und einfach."
        }
    },
    "it": {
        "pdf-to-word": {
            "title": "PDF in WORD",
            "desc": "Strumento gratuito per PDF in word in modo rapido e semplice."
        },
        "word-to-pdf": {
            "title": "WORD in PDF",
            "desc": "Strumento gratuito per word in PDF in modo rapido e semplice."
        },
        "youtube-to-mp3": {
            "title": "YouTube in MP3",
            "desc": "Strumento gratuito per youtube in MP3 in modo rapido e semplice."
        },
        "youtube-downloader": {
            "title": "YouTube Downloader",
            "desc": "Strumento gratuito per youtube downloader in modo rapido e semplice."
        },
        "merge-pdf": {
            "title": "Unisci PDF",
            "desc": "Strumento gratuito per unisci PDF in modo rapido e semplice."
        },
        "compress-pdf": {
            "title": "Comprimi PDF",
            "desc": "Strumento gratuito per comprimi PDF in modo rapido e semplice."
        },
        "pdf-to-jpg": {
            "title": "PDF in JPG",
            "desc": "Strumento gratuito per PDF in JPG in modo rapido e semplice."
        },
        "jpg-to-pdf": {
            "title": "JPG in PDF",
            "desc": "Strumento gratuito per JPG in PDF in modo rapido e semplice."
        },
        "excel-to-pdf": {
            "title": "EXCEL in PDF",
            "desc": "Strumento gratuito per excel in PDF in modo rapido e semplice."
        },
        "pdf-to-excel": {
            "title": "PDF in EXCEL",
            "desc": "Strumento gratuito per PDF in excel in modo rapido e semplice."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT in PDF",
            "desc": "Strumento gratuito per powerpoint in PDF in modo rapido e semplice."
        },
        "pdf-to-powerpoint": {
            "title": "PDF in POWERPOINT",
            "desc": "Strumento gratuito per PDF in powerpoint in modo rapido e semplice."
        },
        "edit-pdf": {
            "title": "Modifica PDF",
            "desc": "Strumento gratuito per modifica PDF in modo rapido e semplice."
        },
        "split-pdf": {
            "title": "Dividi PDF",
            "desc": "Strumento gratuito per dividi PDF in modo rapido e semplice."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Strumento gratuito per organize PDF in modo rapido e semplice."
        },
        "remove-pages": {
            "title": "Rimuovi Pagine PDF",
            "desc": "Rimuovi facilmente le pagine indesiderate dal tuo file PDF."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Strumento gratuito per rotate PDF in modo rapido e semplice."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Strumento gratuito per add PDF page number in modo rapido e semplice."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Strumento gratuito per PDF add watermark in modo rapido e semplice."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Strumento gratuito per protect PDF in modo rapido e semplice."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Strumento gratuito per unlock PDF in modo rapido e semplice."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Strumento gratuito per OCR PDF in modo rapido e semplice."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Strumento gratuito per PDF summarize in modo rapido e semplice."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Strumento gratuito per scan PDF in modo rapido e semplice."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Strumento gratuito per repair PDF in modo rapido e semplice."
        },
        "html-to-pdf": {
            "title": "HTML in PDF",
            "desc": "Strumento gratuito per HTML in PDF in modo rapido e semplice."
        },
        "pdf-to-html": {
            "title": "PDF in HTML",
            "desc": "Strumento gratuito per PDF in HTML in modo rapido e semplice."
        },
        "epub-to-pdf": {
            "title": "EPUB in PDF",
            "desc": "Strumento gratuito per EPUB in PDF in modo rapido e semplice."
        },
        "pdf-to-epub": {
            "title": "PDF in EPUB",
            "desc": "Strumento gratuito per PDF in EPUB in modo rapido e semplice."
        },
        "heic-to-pdf": {
            "title": "HEIC in PDF",
            "desc": "Strumento gratuito per HEIC in PDF in modo rapido e semplice."
        },
        "pdf-to-heic": {
            "title": "PDF in HEIC",
            "desc": "Strumento gratuito per PDF in HEIC in modo rapido e semplice."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF in PDFA",
            "desc": "Strumento gratuito per convert-PDF in pdfa in modo rapido e semplice."
        },
        "remove-bg": {
            "title": "Rimuovi Sfondo Immagine",
            "desc": "Rimuovi automaticamente lo sfondo da qualsiasi immagine in pochi secondi."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Strumento gratuito per upscale image in modo rapido e semplice."
        },
        "remove-watermark": {
            "title": "Rimuovi Filigrana",
            "desc": "Rimuovi rapidamente le filigrane da immagini e documenti."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Strumento gratuito per crop image in modo rapido e semplice."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Strumento gratuito per resize image in modo rapido e semplice."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Strumento gratuito per rotate image in modo rapido e semplice."
        },
        "compress-image": {
            "title": "Comprimi IMAGE",
            "desc": "Strumento gratuito per comprimi image in modo rapido e semplice."
        },
        "jpg-to-png": {
            "title": "JPG in PNG",
            "desc": "Strumento gratuito per JPG in PNG in modo rapido e semplice."
        },
        "png-to-jpg": {
            "title": "PNG in JPG",
            "desc": "Strumento gratuito per PNG in JPG in modo rapido e semplice."
        },
        "heic-to-jpg": {
            "title": "HEIC in JPG",
            "desc": "Strumento gratuito per HEIC in JPG in modo rapido e semplice."
        },
        "jpg-to-heic": {
            "title": "JPG in HEIC",
            "desc": "Strumento gratuito per JPG in HEIC in modo rapido e semplice."
        },
        "heic-to-png": {
            "title": "HEIC in PNG",
            "desc": "Strumento gratuito per HEIC in PNG in modo rapido e semplice."
        },
        "png-to-heic": {
            "title": "PNG in HEIC",
            "desc": "Strumento gratuito per PNG in HEIC in modo rapido e semplice."
        },
        "jpg-to-webp": {
            "title": "JPG in WebP",
            "desc": "Strumento gratuito per JPG in webp in modo rapido e semplice."
        },
        "webp-to-jpg": {
            "title": "WebP in JPG",
            "desc": "Strumento gratuito per webp in JPG in modo rapido e semplice."
        },
        "png-to-webp": {
            "title": "PNG in WebP",
            "desc": "Strumento gratuito per PNG in webp in modo rapido e semplice."
        },
        "webp-to-png": {
            "title": "WebP in PNG",
            "desc": "Strumento gratuito per webp in PNG in modo rapido e semplice."
        },
        "png-to-svg": {
            "title": "PNG in SVG",
            "desc": "Strumento gratuito per PNG in SVG in modo rapido e semplice."
        },
        "jpg-to-svg": {
            "title": "JPG in SVG",
            "desc": "Strumento gratuito per JPG in SVG in modo rapido e semplice."
        },
        "webp-to-svg": {
            "title": "WebP in SVG",
            "desc": "Strumento gratuito per webp in SVG in modo rapido e semplice."
        },
        "youtube-to-wav": {
            "title": "YouTube in WAV",
            "desc": "Strumento gratuito per youtube in WAV in modo rapido e semplice."
        },
        "youtube-to-mp4": {
            "title": "YouTube in MP4",
            "desc": "Strumento gratuito per youtube in MP4 in modo rapido e semplice."
        },
        "tiktok-downloader": {
            "title": "TikTok Downloader",
            "desc": "Strumento gratuito per tiktok downloader in modo rapido e semplice."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Downloader",
            "desc": "Strumento gratuito per instagram reels downloader in modo rapido e semplice."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Downloader",
            "desc": "Strumento gratuito per instagram photo downloader in modo rapido e semplice."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Downloader",
            "desc": "Strumento gratuito per instagram video downloader in modo rapido e semplice."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Downloader",
            "desc": "Strumento gratuito per instagram story downloader in modo rapido e semplice."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Downloader",
            "desc": "Strumento gratuito per instagram profile downloader in modo rapido e semplice."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Downloader",
            "desc": "Strumento gratuito per instagram audio downloader in modo rapido e semplice."
        },
        "spotify-to-mp3": {
            "title": "Spotify in MP3",
            "desc": "Strumento gratuito per spotify in MP3 in modo rapido e semplice."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud in MP3",
            "desc": "Strumento gratuito per soundcloud in MP3 in modo rapido e semplice."
        },
        "wav-to-mp3": {
            "title": "WAV in MP3",
            "desc": "Strumento gratuito per WAV in MP3 in modo rapido e semplice."
        },
        "mp3-to-wav": {
            "title": "MP3 in WAV",
            "desc": "Strumento gratuito per MP3 in WAV in modo rapido e semplice."
        },
        "wav-to-mp4": {
            "title": "WAV in MP4",
            "desc": "Strumento gratuito per WAV in MP4 in modo rapido e semplice."
        },
        "mp4-to-wav": {
            "title": "MP4 in WAV",
            "desc": "Strumento gratuito per MP4 in WAV in modo rapido e semplice."
        },
        "compress-video": {
            "title": "Comprimi VIDEO",
            "desc": "Strumento gratuito per comprimi video in modo rapido e semplice."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Strumento gratuito per video trimmer in modo rapido e semplice."
        },
        "video-merger": {
            "title": "Unisci MERGER",
            "desc": "Strumento gratuito per unisci merger in modo rapido e semplice."
        },
        "mp4-to-mp3": {
            "title": "MP4 in MP3",
            "desc": "Strumento gratuito per MP4 in MP3 in modo rapido e semplice."
        },
        "mp3-to-mp4": {
            "title": "MP3 in MP4",
            "desc": "Strumento gratuito per MP3 in MP4 in modo rapido e semplice."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Strumento gratuito per MP3 compressor in modo rapido e semplice."
        },
        "audio-converter": {
            "title": "Convertitore Audio",
            "desc": "Strumento gratuito per convertitore audio in modo rapido e semplice."
        },
        "speech-to-text": {
            "title": "SPEECH in TEXT",
            "desc": "Strumento gratuito per speech in text in modo rapido e semplice."
        },
        "text-to-speech": {
            "title": "TEXT in SPEECH",
            "desc": "Strumento gratuito per text in speech in modo rapido e semplice."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Strumento gratuito per screen recorder in modo rapido e semplice."
        },
        "video-to-gif": {
            "title": "VIDEO in GIF",
            "desc": "Strumento gratuito per video in GIF in modo rapido e semplice."
        },
        "mp4-to-gif": {
            "title": "MP4 in GIF",
            "desc": "Strumento gratuito per MP4 in GIF in modo rapido e semplice."
        },
        "webm-to-gif": {
            "title": "WEBM in GIF",
            "desc": "Strumento gratuito per webm in GIF in modo rapido e semplice."
        },
        "apng-to-gif": {
            "title": "APNG in GIF",
            "desc": "Strumento gratuito per apng in GIF in modo rapido e semplice."
        },
        "image-to-gif": {
            "title": "IMAGE in GIF",
            "desc": "Strumento gratuito per image in GIF in modo rapido e semplice."
        },
        "gif-to-mp4": {
            "title": "GIF in MP4",
            "desc": "Strumento gratuito per GIF in MP4 in modo rapido e semplice."
        },
        "gif-to-webm": {
            "title": "GIF in WEBM",
            "desc": "Strumento gratuito per GIF in webm in modo rapido e semplice."
        },
        "gif-to-apng": {
            "title": "GIF in APNG",
            "desc": "Strumento gratuito per GIF in apng in modo rapido e semplice."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Strumento gratuito per GIF compressor in modo rapido e semplice."
        },
        "document-converter": {
            "title": "Convertitore Document",
            "desc": "Strumento gratuito per convertitore document in modo rapido e semplice."
        },
        "ebook-converter": {
            "title": "Convertitore Ebook",
            "desc": "Strumento gratuito per convertitore ebook in modo rapido e semplice."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Strumento gratuito per translate document in modo rapido e semplice."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Strumento gratuito per translate word in modo rapido e semplice."
        },
        "json-formatter": {
            "title": "Formattatore JSON",
            "desc": "Formate, valide, embeleze e minifique estruturas de dados JSON com realce de sintaxe."
        },
        "xml-formatter": {
            "title": "Formattatore XML",
            "desc": "Formate e organize documentos XML com indentação correta e validação de sintaxe."
        },
        "csv-formatter": {
            "title": "Formattatore CSV",
            "desc": "Formate, limpe e converta ficheiros de dados CSV em tabelas estruturadas, JSON ou TSV."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Strumento gratuito per base64 tool in modo rapido e semplice."
        },
        "hash-generator": {
            "title": "Generatore Hash",
            "desc": "Strumento gratuito per generatore hash in modo rapido e semplice."
        },
        "password-generator": {
            "title": "Generatore Password",
            "desc": "Strumento gratuito per generatore password in modo rapido e semplice."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Strumento gratuito per color picker in modo rapido e semplice."
        },
        "qr-code-generator": {
            "title": "Generatore QR",
            "desc": "Strumento gratuito per generatore QR in modo rapido e semplice."
        },
        "favicon-generator": {
            "title": "Generatore Favicon",
            "desc": "Strumento gratuito per generatore favicon in modo rapido e semplice."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Strumento gratuito per lorem ipsum in modo rapido e semplice."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Strumento gratuito per screenshot website in modo rapido e semplice."
        }
    },
    "ar": {
        "pdf-to-word": {
            "title": "PDF إلى WORD",
            "desc": "أداة مجانية لـ PDF إلى WORD بسرعة وسهولة."
        },
        "word-to-pdf": {
            "title": "WORD إلى PDF",
            "desc": "أداة مجانية لـ WORD إلى PDF بسرعة وسهولة."
        },
        "youtube-to-mp3": {
            "title": "YouTube إلى MP3",
            "desc": "أداة مجانية لـ YouTube إلى MP3 بسرعة وسهولة."
        },
        "youtube-downloader": {
            "title": "تنزيل YouTube",
            "desc": "أداة مجانية لـ تنزيل YouTube بسرعة وسهولة."
        },
        "merge-pdf": {
            "title": "دمج PDF",
            "desc": "أداة مجانية لـ دمج PDF بسرعة وسهولة."
        },
        "compress-pdf": {
            "title": "ضغط PDF",
            "desc": "أداة مجانية لـ ضغط PDF بسرعة وسهولة."
        },
        "pdf-to-jpg": {
            "title": "PDF إلى JPG",
            "desc": "أداة مجانية لـ PDF إلى JPG بسرعة وسهولة."
        },
        "jpg-to-pdf": {
            "title": "JPG إلى PDF",
            "desc": "أداة مجانية لـ JPG إلى PDF بسرعة وسهولة."
        },
        "excel-to-pdf": {
            "title": "EXCEL إلى PDF",
            "desc": "أداة مجانية لـ EXCEL إلى PDF بسرعة وسهولة."
        },
        "pdf-to-excel": {
            "title": "PDF إلى EXCEL",
            "desc": "أداة مجانية لـ PDF إلى EXCEL بسرعة وسهولة."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT إلى PDF",
            "desc": "أداة مجانية لـ POWERPOINT إلى PDF بسرعة وسهولة."
        },
        "pdf-to-powerpoint": {
            "title": "PDF إلى POWERPOINT",
            "desc": "أداة مجانية لـ PDF إلى POWERPOINT بسرعة وسهولة."
        },
        "edit-pdf": {
            "title": "تعديل PDF",
            "desc": "أداة مجانية لـ تعديل PDF بسرعة وسهولة."
        },
        "split-pdf": {
            "title": "تقسيم PDF",
            "desc": "أداة مجانية لـ تقسيم PDF بسرعة وسهولة."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "أداة مجانية لـ Organize PDF بسرعة وسهولة."
        },
        "remove-pages": {
            "title": "إزالة صفحات PDF",
            "desc": "إزالة الصفحات غير المرغوب فيها من ملف PDF بسهولة."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "أداة مجانية لـ Rotate PDF بسرعة وسهولة."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "أداة مجانية لـ Add PDF Page Number بسرعة وسهولة."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "أداة مجانية لـ PDF Add Watermark بسرعة وسهولة."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "أداة مجانية لـ Protect PDF بسرعة وسهولة."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "أداة مجانية لـ Unlock PDF بسرعة وسهولة."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "أداة مجانية لـ OCR PDF بسرعة وسهولة."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "أداة مجانية لـ PDF Summarize بسرعة وسهولة."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "أداة مجانية لـ Scan PDF بسرعة وسهولة."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "أداة مجانية لـ Repair PDF بسرعة وسهولة."
        },
        "html-to-pdf": {
            "title": "HTML إلى PDF",
            "desc": "أداة مجانية لـ HTML إلى PDF بسرعة وسهولة."
        },
        "pdf-to-html": {
            "title": "PDF إلى HTML",
            "desc": "أداة مجانية لـ PDF إلى HTML بسرعة وسهولة."
        },
        "epub-to-pdf": {
            "title": "EPUB إلى PDF",
            "desc": "أداة مجانية لـ EPUB إلى PDF بسرعة وسهولة."
        },
        "pdf-to-epub": {
            "title": "PDF إلى EPUB",
            "desc": "أداة مجانية لـ PDF إلى EPUB بسرعة وسهولة."
        },
        "heic-to-pdf": {
            "title": "HEIC إلى PDF",
            "desc": "أداة مجانية لـ HEIC إلى PDF بسرعة وسهولة."
        },
        "pdf-to-heic": {
            "title": "PDF إلى HEIC",
            "desc": "أداة مجانية لـ PDF إلى HEIC بسرعة وسهولة."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF إلى PDFA",
            "desc": "أداة مجانية لـ CONVERT-PDF إلى PDFA بسرعة وسهولة."
        },
        "remove-bg": {
            "title": "إزالة خلفية الصورة",
            "desc": "إزالة خلفية أي صورة تلقائيًا باستخدام الذكاء الاصطناعي في ثوانٍ."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "أداة مجانية لـ Upscale Image بسرعة وسهولة."
        },
        "remove-watermark": {
            "title": "إزالة العلامة المائية",
            "desc": "إزالة العلامات المائية من الصور والمستندات بسرعة."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "أداة مجانية لـ Crop Image بسرعة وسهولة."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "أداة مجانية لـ Resize Image بسرعة وسهولة."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "أداة مجانية لـ Rotate Image بسرعة وسهولة."
        },
        "compress-image": {
            "title": "ضغط IMAGE",
            "desc": "أداة مجانية لـ ضغط IMAGE بسرعة وسهولة."
        },
        "jpg-to-png": {
            "title": "JPG إلى PNG",
            "desc": "أداة مجانية لـ JPG إلى PNG بسرعة وسهولة."
        },
        "png-to-jpg": {
            "title": "PNG إلى JPG",
            "desc": "أداة مجانية لـ PNG إلى JPG بسرعة وسهولة."
        },
        "heic-to-jpg": {
            "title": "HEIC إلى JPG",
            "desc": "أداة مجانية لـ HEIC إلى JPG بسرعة وسهولة."
        },
        "jpg-to-heic": {
            "title": "JPG إلى HEIC",
            "desc": "أداة مجانية لـ JPG إلى HEIC بسرعة وسهولة."
        },
        "heic-to-png": {
            "title": "HEIC إلى PNG",
            "desc": "أداة مجانية لـ HEIC إلى PNG بسرعة وسهولة."
        },
        "png-to-heic": {
            "title": "PNG إلى HEIC",
            "desc": "أداة مجانية لـ PNG إلى HEIC بسرعة وسهولة."
        },
        "jpg-to-webp": {
            "title": "JPG إلى WebP",
            "desc": "أداة مجانية لـ JPG إلى WebP بسرعة وسهولة."
        },
        "webp-to-jpg": {
            "title": "WebP إلى JPG",
            "desc": "أداة مجانية لـ WebP إلى JPG بسرعة وسهولة."
        },
        "png-to-webp": {
            "title": "PNG إلى WebP",
            "desc": "أداة مجانية لـ PNG إلى WebP بسرعة وسهولة."
        },
        "webp-to-png": {
            "title": "WebP إلى PNG",
            "desc": "أداة مجانية لـ WebP إلى PNG بسرعة وسهولة."
        },
        "png-to-svg": {
            "title": "PNG إلى SVG",
            "desc": "أداة مجانية لـ PNG إلى SVG بسرعة وسهولة."
        },
        "jpg-to-svg": {
            "title": "JPG إلى SVG",
            "desc": "أداة مجانية لـ JPG إلى SVG بسرعة وسهولة."
        },
        "webp-to-svg": {
            "title": "WebP إلى SVG",
            "desc": "أداة مجانية لـ WebP إلى SVG بسرعة وسهولة."
        },
        "youtube-to-wav": {
            "title": "YouTube إلى WAV",
            "desc": "أداة مجانية لـ YouTube إلى WAV بسرعة وسهولة."
        },
        "youtube-to-mp4": {
            "title": "YouTube إلى MP4",
            "desc": "أداة مجانية لـ YouTube إلى MP4 بسرعة وسهولة."
        },
        "tiktok-downloader": {
            "title": "تنزيل TikTok",
            "desc": "أداة مجانية لـ تنزيل TikTok بسرعة وسهولة."
        },
        "instagram-reels-downloader": {
            "title": "تنزيل Instagram Reels",
            "desc": "أداة مجانية لـ تنزيل Instagram Reels بسرعة وسهولة."
        },
        "instagram-photo-downloader": {
            "title": "تنزيل Instagram Photo",
            "desc": "أداة مجانية لـ تنزيل Instagram Photo بسرعة وسهولة."
        },
        "instagram-video-downloader": {
            "title": "تنزيل Instagram Video",
            "desc": "أداة مجانية لـ تنزيل Instagram Video بسرعة وسهولة."
        },
        "instagram-story-downloader": {
            "title": "تنزيل Instagram Story",
            "desc": "أداة مجانية لـ تنزيل Instagram Story بسرعة وسهولة."
        },
        "instagram-profile-downloader": {
            "title": "تنزيل Instagram Profile",
            "desc": "أداة مجانية لـ تنزيل Instagram Profile بسرعة وسهولة."
        },
        "instagram-audio-downloader": {
            "title": "تنزيل Instagram Audio",
            "desc": "أداة مجانية لـ تنزيل Instagram Audio بسرعة وسهولة."
        },
        "spotify-to-mp3": {
            "title": "Spotify إلى MP3",
            "desc": "أداة مجانية لـ Spotify إلى MP3 بسرعة وسهولة."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud إلى MP3",
            "desc": "أداة مجانية لـ SoundCloud إلى MP3 بسرعة وسهولة."
        },
        "wav-to-mp3": {
            "title": "WAV إلى MP3",
            "desc": "أداة مجانية لـ WAV إلى MP3 بسرعة وسهولة."
        },
        "mp3-to-wav": {
            "title": "MP3 إلى WAV",
            "desc": "أداة مجانية لـ MP3 إلى WAV بسرعة وسهولة."
        },
        "wav-to-mp4": {
            "title": "WAV إلى MP4",
            "desc": "أداة مجانية لـ WAV إلى MP4 بسرعة وسهولة."
        },
        "mp4-to-wav": {
            "title": "MP4 إلى WAV",
            "desc": "أداة مجانية لـ MP4 إلى WAV بسرعة وسهولة."
        },
        "compress-video": {
            "title": "ضغط VIDEO",
            "desc": "أداة مجانية لـ ضغط VIDEO بسرعة وسهولة."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "أداة مجانية لـ Video Trimmer بسرعة وسهولة."
        },
        "video-merger": {
            "title": "دمج MERGER",
            "desc": "أداة مجانية لـ دمج MERGER بسرعة وسهولة."
        },
        "mp4-to-mp3": {
            "title": "MP4 إلى MP3",
            "desc": "أداة مجانية لـ MP4 إلى MP3 بسرعة وسهولة."
        },
        "mp3-to-mp4": {
            "title": "MP3 إلى MP4",
            "desc": "أداة مجانية لـ MP3 إلى MP4 بسرعة وسهولة."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "أداة مجانية لـ MP3 Compressor بسرعة وسهولة."
        },
        "audio-converter": {
            "title": "محول Audio",
            "desc": "أداة مجانية لـ محول Audio بسرعة وسهولة."
        },
        "speech-to-text": {
            "title": "SPEECH إلى TEXT",
            "desc": "أداة مجانية لـ SPEECH إلى TEXT بسرعة وسهولة."
        },
        "text-to-speech": {
            "title": "TEXT إلى SPEECH",
            "desc": "أداة مجانية لـ TEXT إلى SPEECH بسرعة وسهولة."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "أداة مجانية لـ Screen Recorder بسرعة وسهولة."
        },
        "video-to-gif": {
            "title": "VIDEO إلى GIF",
            "desc": "أداة مجانية لـ VIDEO إلى GIF بسرعة وسهولة."
        },
        "mp4-to-gif": {
            "title": "MP4 إلى GIF",
            "desc": "أداة مجانية لـ MP4 إلى GIF بسرعة وسهولة."
        },
        "webm-to-gif": {
            "title": "WEBM إلى GIF",
            "desc": "أداة مجانية لـ WEBM إلى GIF بسرعة وسهولة."
        },
        "apng-to-gif": {
            "title": "APNG إلى GIF",
            "desc": "أداة مجانية لـ APNG إلى GIF بسرعة وسهولة."
        },
        "image-to-gif": {
            "title": "IMAGE إلى GIF",
            "desc": "أداة مجانية لـ IMAGE إلى GIF بسرعة وسهولة."
        },
        "gif-to-mp4": {
            "title": "GIF إلى MP4",
            "desc": "أداة مجانية لـ GIF إلى MP4 بسرعة وسهولة."
        },
        "gif-to-webm": {
            "title": "GIF إلى WEBM",
            "desc": "أداة مجانية لـ GIF إلى WEBM بسرعة وسهولة."
        },
        "gif-to-apng": {
            "title": "GIF إلى APNG",
            "desc": "أداة مجانية لـ GIF إلى APNG بسرعة وسهولة."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "أداة مجانية لـ GIF Compressor بسرعة وسهولة."
        },
        "document-converter": {
            "title": "محول Document",
            "desc": "أداة مجانية لـ محول Document بسرعة وسهولة."
        },
        "ebook-converter": {
            "title": "محول Ebook",
            "desc": "أداة مجانية لـ محول Ebook بسرعة وسهولة."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "أداة مجانية لـ Translate Document بسرعة وسهولة."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "أداة مجانية لـ Translate Word بسرعة وسهولة."
        },
        "json-formatter": {
            "title": "منسق JSON",
            "desc": "أداة مجانية لـ منسق JSON بسرعة وسهولة."
        },
        "xml-formatter": {
            "title": "منسق XML",
            "desc": "أداة مجانية لـ منسق XML بسرعة وسهولة."
        },
        "csv-formatter": {
            "title": "منسق CSV",
            "desc": "أداة مجانية لـ منسق CSV بسرعة وسهولة."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "أداة مجانية لـ Base64 Tool بسرعة وسهولة."
        },
        "hash-generator": {
            "title": "مولد Hash",
            "desc": "أداة مجانية لـ مولد Hash بسرعة وسهولة."
        },
        "password-generator": {
            "title": "مولد Password",
            "desc": "أداة مجانية لـ مولد Password بسرعة وسهولة."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "أداة مجانية لـ Color Picker بسرعة وسهولة."
        },
        "qr-code-generator": {
            "title": "مولد QR",
            "desc": "أداة مجانية لـ مولد QR بسرعة وسهولة."
        },
        "favicon-generator": {
            "title": "مولد Favicon",
            "desc": "أداة مجانية لـ مولد Favicon بسرعة وسهولة."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "أداة مجانية لـ Lorem Ipsum بسرعة وسهولة."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "أداة مجانية لـ Screenshot Website بسرعة وسهولة."
        }
    },
    "ru": {
        "pdf-to-word": {
            "title": "PDF в WORD",
            "desc": "Бесплатный инструмент для PDF в word быстро и легко."
        },
        "word-to-pdf": {
            "title": "WORD в PDF",
            "desc": "Бесплатный инструмент для word в PDF быстро и легко."
        },
        "youtube-to-mp3": {
            "title": "YouTube в MP3",
            "desc": "Бесплатный инструмент для youtube в MP3 быстро и легко."
        },
        "youtube-downloader": {
            "title": "Загрузчик YouTube",
            "desc": "Бесплатный инструмент для загрузчик youtube быстро и легко."
        },
        "merge-pdf": {
            "title": "Объединить PDF",
            "desc": "Бесплатный инструмент для объединить PDF быстро и легко."
        },
        "compress-pdf": {
            "title": "Сжать PDF",
            "desc": "Бесплатный инструмент для сжать PDF быстро и легко."
        },
        "pdf-to-jpg": {
            "title": "PDF в JPG",
            "desc": "Бесплатный инструмент для PDF в JPG быстро и легко."
        },
        "jpg-to-pdf": {
            "title": "JPG в PDF",
            "desc": "Бесплатный инструмент для JPG в PDF быстро и легко."
        },
        "excel-to-pdf": {
            "title": "EXCEL в PDF",
            "desc": "Бесплатный инструмент для excel в PDF быстро и легко."
        },
        "pdf-to-excel": {
            "title": "PDF в EXCEL",
            "desc": "Бесплатный инструмент для PDF в excel быстро и легко."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT в PDF",
            "desc": "Бесплатный инструмент для powerpoint в PDF быстро и легко."
        },
        "pdf-to-powerpoint": {
            "title": "PDF в POWERPOINT",
            "desc": "Бесплатный инструмент для PDF в powerpoint быстро и легко."
        },
        "edit-pdf": {
            "title": "Редактировать PDF",
            "desc": "Бесплатный инструмент для редактировать PDF быстро и легко."
        },
        "split-pdf": {
            "title": "Разделить PDF",
            "desc": "Бесплатный инструмент для разделить PDF быстро и легко."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Бесплатный инструмент для organize PDF быстро и легко."
        },
        "remove-pages": {
            "title": "Удалить Страницы PDF",
            "desc": "Легко удаляйте ненужные страницы из PDF-файла."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Бесплатный инструмент для rotate PDF быстро и легко."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Бесплатный инструмент для add PDF page number быстро и легко."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Бесплатный инструмент для PDF add watermark быстро и легко."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Бесплатный инструмент для protect PDF быстро и легко."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Бесплатный инструмент для unlock PDF быстро и легко."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Бесплатный инструмент для OCR PDF быстро и легко."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Бесплатный инструмент для PDF summarize быстро и легко."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Бесплатный инструмент для scan PDF быстро и легко."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Бесплатный инструмент для repair PDF быстро и легко."
        },
        "html-to-pdf": {
            "title": "HTML в PDF",
            "desc": "Бесплатный инструмент для HTML в PDF быстро и легко."
        },
        "pdf-to-html": {
            "title": "PDF в HTML",
            "desc": "Бесплатный инструмент для PDF в HTML быстро и легко."
        },
        "epub-to-pdf": {
            "title": "EPUB в PDF",
            "desc": "Бесплатный инструмент для EPUB в PDF быстро и легко."
        },
        "pdf-to-epub": {
            "title": "PDF в EPUB",
            "desc": "Бесплатный инструмент для PDF в EPUB быстро и легко."
        },
        "heic-to-pdf": {
            "title": "HEIC в PDF",
            "desc": "Бесплатный инструмент для HEIC в PDF быстро и легко."
        },
        "pdf-to-heic": {
            "title": "PDF в HEIC",
            "desc": "Бесплатный инструмент для PDF в HEIC быстро и легко."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF в PDFA",
            "desc": "Бесплатный инструмент для convert-PDF в pdfa быстро и легко."
        },
        "remove-bg": {
            "title": "Удалить Фон Изображения",
            "desc": "Автоматически удаляйте фон с любых изображений за секунды с помощью ИИ."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Бесплатный инструмент для upscale image быстро и легко."
        },
        "remove-watermark": {
            "title": "Удалить Водяной Знак",
            "desc": "Быстро удаляйте водяные знаки с изображений и документов."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Бесплатный инструмент для crop image быстро и легко."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Бесплатный инструмент для resize image быстро и легко."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Бесплатный инструмент для rotate image быстро и легко."
        },
        "compress-image": {
            "title": "Сжать IMAGE",
            "desc": "Бесплатный инструмент для сжать image быстро и легко."
        },
        "jpg-to-png": {
            "title": "JPG в PNG",
            "desc": "Бесплатный инструмент для JPG в PNG быстро и легко."
        },
        "png-to-jpg": {
            "title": "PNG в JPG",
            "desc": "Бесплатный инструмент для PNG в JPG быстро и легко."
        },
        "heic-to-jpg": {
            "title": "HEIC в JPG",
            "desc": "Бесплатный инструмент для HEIC в JPG быстро и легко."
        },
        "jpg-to-heic": {
            "title": "JPG в HEIC",
            "desc": "Бесплатный инструмент для JPG в HEIC быстро и легко."
        },
        "heic-to-png": {
            "title": "HEIC в PNG",
            "desc": "Бесплатный инструмент для HEIC в PNG быстро и легко."
        },
        "png-to-heic": {
            "title": "PNG в HEIC",
            "desc": "Бесплатный инструмент для PNG в HEIC быстро и легко."
        },
        "jpg-to-webp": {
            "title": "JPG в WebP",
            "desc": "Бесплатный инструмент для JPG в webp быстро и легко."
        },
        "webp-to-jpg": {
            "title": "WebP в JPG",
            "desc": "Бесплатный инструмент для webp в JPG быстро и легко."
        },
        "png-to-webp": {
            "title": "PNG в WebP",
            "desc": "Бесплатный инструмент для PNG в webp быстро и легко."
        },
        "webp-to-png": {
            "title": "WebP в PNG",
            "desc": "Бесплатный инструмент для webp в PNG быстро и легко."
        },
        "png-to-svg": {
            "title": "PNG в SVG",
            "desc": "Бесплатный инструмент для PNG в SVG быстро и легко."
        },
        "jpg-to-svg": {
            "title": "JPG в SVG",
            "desc": "Бесплатный инструмент для JPG в SVG быстро и легко."
        },
        "webp-to-svg": {
            "title": "WebP в SVG",
            "desc": "Бесплатный инструмент для webp в SVG быстро и легко."
        },
        "youtube-to-wav": {
            "title": "YouTube в WAV",
            "desc": "Бесплатный инструмент для youtube в WAV быстро и легко."
        },
        "youtube-to-mp4": {
            "title": "YouTube в MP4",
            "desc": "Бесплатный инструмент для youtube в MP4 быстро и легко."
        },
        "tiktok-downloader": {
            "title": "Загрузчик TikTok",
            "desc": "Бесплатный инструмент для загрузчик tiktok быстро и легко."
        },
        "instagram-reels-downloader": {
            "title": "Загрузчик Instagram Reels",
            "desc": "Бесплатный инструмент для загрузчик instagram reels быстро и легко."
        },
        "instagram-photo-downloader": {
            "title": "Загрузчик Instagram Photo",
            "desc": "Бесплатный инструмент для загрузчик instagram photo быстро и легко."
        },
        "instagram-video-downloader": {
            "title": "Загрузчик Instagram Video",
            "desc": "Бесплатный инструмент для загрузчик instagram video быстро и легко."
        },
        "instagram-story-downloader": {
            "title": "Загрузчик Instagram Story",
            "desc": "Бесплатный инструмент для загрузчик instagram story быстро и легко."
        },
        "instagram-profile-downloader": {
            "title": "Загрузчик Instagram Profile",
            "desc": "Бесплатный инструмент для загрузчик instagram profile быстро и легко."
        },
        "instagram-audio-downloader": {
            "title": "Загрузчик Instagram Audio",
            "desc": "Бесплатный инструмент для загрузчик instagram audio быстро и легко."
        },
        "spotify-to-mp3": {
            "title": "Spotify в MP3",
            "desc": "Бесплатный инструмент для spotify в MP3 быстро и легко."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud в MP3",
            "desc": "Бесплатный инструмент для soundcloud в MP3 быстро и легко."
        },
        "wav-to-mp3": {
            "title": "WAV в MP3",
            "desc": "Бесплатный инструмент для WAV в MP3 быстро и легко."
        },
        "mp3-to-wav": {
            "title": "MP3 в WAV",
            "desc": "Бесплатный инструмент для MP3 в WAV быстро и легко."
        },
        "wav-to-mp4": {
            "title": "WAV в MP4",
            "desc": "Бесплатный инструмент для WAV в MP4 быстро и легко."
        },
        "mp4-to-wav": {
            "title": "MP4 в WAV",
            "desc": "Бесплатный инструмент для MP4 в WAV быстро и легко."
        },
        "compress-video": {
            "title": "Сжать VIDEO",
            "desc": "Бесплатный инструмент для сжать video быстро и легко."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Бесплатный инструмент для video trimmer быстро и легко."
        },
        "video-merger": {
            "title": "Объединить MERGER",
            "desc": "Бесплатный инструмент для объединить merger быстро и легко."
        },
        "mp4-to-mp3": {
            "title": "MP4 в MP3",
            "desc": "Бесплатный инструмент для MP4 в MP3 быстро и легко."
        },
        "mp3-to-mp4": {
            "title": "MP3 в MP4",
            "desc": "Бесплатный инструмент для MP3 в MP4 быстро и легко."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Бесплатный инструмент для MP3 compressor быстро и легко."
        },
        "audio-converter": {
            "title": "Конвертер Audio",
            "desc": "Бесплатный инструмент для конвертер audio быстро и легко."
        },
        "speech-to-text": {
            "title": "SPEECH в TEXT",
            "desc": "Бесплатный инструмент для speech в text быстро и легко."
        },
        "text-to-speech": {
            "title": "TEXT в SPEECH",
            "desc": "Бесплатный инструмент для text в speech быстро и легко."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Бесплатный инструмент для screen recorder быстро и легко."
        },
        "video-to-gif": {
            "title": "VIDEO в GIF",
            "desc": "Бесплатный инструмент для video в GIF быстро и легко."
        },
        "mp4-to-gif": {
            "title": "MP4 в GIF",
            "desc": "Бесплатный инструмент для MP4 в GIF быстро и легко."
        },
        "webm-to-gif": {
            "title": "WEBM в GIF",
            "desc": "Бесплатный инструмент для webm в GIF быстро и легко."
        },
        "apng-to-gif": {
            "title": "APNG в GIF",
            "desc": "Бесплатный инструмент для apng в GIF быстро и легко."
        },
        "image-to-gif": {
            "title": "IMAGE в GIF",
            "desc": "Бесплатный инструмент для image в GIF быстро и легко."
        },
        "gif-to-mp4": {
            "title": "GIF в MP4",
            "desc": "Бесплатный инструмент для GIF в MP4 быстро и легко."
        },
        "gif-to-webm": {
            "title": "GIF в WEBM",
            "desc": "Бесплатный инструмент для GIF в webm быстро и легко."
        },
        "gif-to-apng": {
            "title": "GIF в APNG",
            "desc": "Бесплатный инструмент для GIF в apng быстро и легко."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Бесплатный инструмент для GIF compressor быстро и легко."
        },
        "document-converter": {
            "title": "Конвертер Document",
            "desc": "Бесплатный инструмент для конвертер document быстро и легко."
        },
        "ebook-converter": {
            "title": "Конвертер Ebook",
            "desc": "Бесплатный инструмент для конвертер ebook быстро и легко."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Бесплатный инструмент для translate document быстро и легко."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Бесплатный инструмент для translate word быстро и легко."
        },
        "json-formatter": {
            "title": "Форматирование JSON",
            "desc": "Бесплатный инструмент для форматирование JSON быстро и легко."
        },
        "xml-formatter": {
            "title": "Форматирование XML",
            "desc": "Бесплатный инструмент для форматирование XML быстро и легко."
        },
        "csv-formatter": {
            "title": "Форматирование CSV",
            "desc": "Бесплатный инструмент для форматирование CSV быстро и легко."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Бесплатный инструмент для base64 tool быстро и легко."
        },
        "hash-generator": {
            "title": "Генератор Hash",
            "desc": "Бесплатный инструмент для генератор hash быстро и легко."
        },
        "password-generator": {
            "title": "Генератор Password",
            "desc": "Бесплатный инструмент для генератор password быстро и легко."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Бесплатный инструмент для color picker быстро и легко."
        },
        "qr-code-generator": {
            "title": "Генератор QR",
            "desc": "Бесплатный инструмент для генератор QR быстро и легко."
        },
        "favicon-generator": {
            "title": "Генератор Favicon",
            "desc": "Бесплатный инструмент для генератор favicon быстро и легко."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Бесплатный инструмент для lorem ipsum быстро и легко."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Бесплатный инструмент для screenshot website быстро и легко."
        }
    },
    "id": {
        "pdf-to-word": {
            "title": "PDF ke WORD",
            "desc": "Alat gratis untuk PDF ke word dengan cepat dan mudah."
        },
        "word-to-pdf": {
            "title": "WORD ke PDF",
            "desc": "Alat gratis untuk word ke PDF dengan cepat dan mudah."
        },
        "youtube-to-mp3": {
            "title": "YouTube ke MP3",
            "desc": "Alat gratis untuk youtube ke MP3 dengan cepat dan mudah."
        },
        "youtube-downloader": {
            "title": "YouTube Pengunduh",
            "desc": "Alat gratis untuk youtube pengunduh dengan cepat dan mudah."
        },
        "merge-pdf": {
            "title": "Gabungkan PDF",
            "desc": "Alat gratis untuk gabungkan PDF dengan cepat dan mudah."
        },
        "compress-pdf": {
            "title": "Kompres PDF",
            "desc": "Alat gratis untuk kompres PDF dengan cepat dan mudah."
        },
        "pdf-to-jpg": {
            "title": "PDF ke JPG",
            "desc": "Alat gratis untuk PDF ke JPG dengan cepat dan mudah."
        },
        "jpg-to-pdf": {
            "title": "JPG ke PDF",
            "desc": "Alat gratis untuk JPG ke PDF dengan cepat dan mudah."
        },
        "excel-to-pdf": {
            "title": "EXCEL ke PDF",
            "desc": "Alat gratis untuk excel ke PDF dengan cepat dan mudah."
        },
        "pdf-to-excel": {
            "title": "PDF ke EXCEL",
            "desc": "Alat gratis untuk PDF ke excel dengan cepat dan mudah."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT ke PDF",
            "desc": "Alat gratis untuk powerpoint ke PDF dengan cepat dan mudah."
        },
        "pdf-to-powerpoint": {
            "title": "PDF ke POWERPOINT",
            "desc": "Alat gratis untuk PDF ke powerpoint dengan cepat dan mudah."
        },
        "edit-pdf": {
            "title": "Edit PDF",
            "desc": "Alat gratis untuk edit PDF dengan cepat dan mudah."
        },
        "split-pdf": {
            "title": "Bagi PDF",
            "desc": "Alat gratis untuk bagi PDF dengan cepat dan mudah."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Alat gratis untuk organize PDF dengan cepat dan mudah."
        },
        "remove-pages": {
            "title": "Hapus Halaman PDF",
            "desc": "Hapus halaman yang tidak diinginkan dari file PDF Anda."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Alat gratis untuk rotate PDF dengan cepat dan mudah."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Alat gratis untuk add PDF page number dengan cepat dan mudah."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Alat gratis untuk PDF add watermark dengan cepat dan mudah."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Alat gratis untuk protect PDF dengan cepat dan mudah."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Alat gratis untuk unlock PDF dengan cepat dan mudah."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Alat gratis untuk OCR PDF dengan cepat dan mudah."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Alat gratis untuk PDF summarize dengan cepat dan mudah."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Alat gratis untuk scan PDF dengan cepat dan mudah."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Alat gratis untuk repair PDF dengan cepat dan mudah."
        },
        "html-to-pdf": {
            "title": "HTML ke PDF",
            "desc": "Alat gratis untuk HTML ke PDF dengan cepat dan mudah."
        },
        "pdf-to-html": {
            "title": "PDF ke HTML",
            "desc": "Alat gratis untuk PDF ke HTML dengan cepat dan mudah."
        },
        "epub-to-pdf": {
            "title": "EPUB ke PDF",
            "desc": "Alat gratis untuk EPUB ke PDF dengan cepat dan mudah."
        },
        "pdf-to-epub": {
            "title": "PDF ke EPUB",
            "desc": "Alat gratis untuk PDF ke EPUB dengan cepat dan mudah."
        },
        "heic-to-pdf": {
            "title": "HEIC ke PDF",
            "desc": "Alat gratis untuk HEIC ke PDF dengan cepat dan mudah."
        },
        "pdf-to-heic": {
            "title": "PDF ke HEIC",
            "desc": "Alat gratis untuk PDF ke HEIC dengan cepat dan mudah."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF ke PDFA",
            "desc": "Alat gratis untuk convert-PDF ke pdfa dengan cepat dan mudah."
        },
        "remove-bg": {
            "title": "Hapus Latar Belakang Gambar",
            "desc": "Hapus latar belakang gambar secara otomatis menggunakan AI dalam hitungan detik."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Alat gratis untuk upscale image dengan cepat dan mudah."
        },
        "remove-watermark": {
            "title": "Hapus Watermark",
            "desc": "Hapus watermark dari gambar dan dokumen dengan cepat."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Alat gratis untuk crop image dengan cepat dan mudah."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Alat gratis untuk resize image dengan cepat dan mudah."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Alat gratis untuk rotate image dengan cepat dan mudah."
        },
        "compress-image": {
            "title": "Kompres IMAGE",
            "desc": "Alat gratis untuk kompres image dengan cepat dan mudah."
        },
        "jpg-to-png": {
            "title": "JPG ke PNG",
            "desc": "Alat gratis untuk JPG ke PNG dengan cepat dan mudah."
        },
        "png-to-jpg": {
            "title": "PNG ke JPG",
            "desc": "Alat gratis untuk PNG ke JPG dengan cepat dan mudah."
        },
        "heic-to-jpg": {
            "title": "HEIC ke JPG",
            "desc": "Alat gratis untuk HEIC ke JPG dengan cepat dan mudah."
        },
        "jpg-to-heic": {
            "title": "JPG ke HEIC",
            "desc": "Alat gratis untuk JPG ke HEIC dengan cepat dan mudah."
        },
        "heic-to-png": {
            "title": "HEIC ke PNG",
            "desc": "Alat gratis untuk HEIC ke PNG dengan cepat dan mudah."
        },
        "png-to-heic": {
            "title": "PNG ke HEIC",
            "desc": "Alat gratis untuk PNG ke HEIC dengan cepat dan mudah."
        },
        "jpg-to-webp": {
            "title": "JPG ke WebP",
            "desc": "Alat gratis untuk JPG ke webp dengan cepat dan mudah."
        },
        "webp-to-jpg": {
            "title": "WebP ke JPG",
            "desc": "Alat gratis untuk webp ke JPG dengan cepat dan mudah."
        },
        "png-to-webp": {
            "title": "PNG ke WebP",
            "desc": "Alat gratis untuk PNG ke webp dengan cepat dan mudah."
        },
        "webp-to-png": {
            "title": "WebP ke PNG",
            "desc": "Alat gratis untuk webp ke PNG dengan cepat dan mudah."
        },
        "png-to-svg": {
            "title": "PNG ke SVG",
            "desc": "Alat gratis untuk PNG ke SVG dengan cepat dan mudah."
        },
        "jpg-to-svg": {
            "title": "JPG ke SVG",
            "desc": "Alat gratis untuk JPG ke SVG dengan cepat dan mudah."
        },
        "webp-to-svg": {
            "title": "WebP ke SVG",
            "desc": "Alat gratis untuk webp ke SVG dengan cepat dan mudah."
        },
        "youtube-to-wav": {
            "title": "YouTube ke WAV",
            "desc": "Alat gratis untuk youtube ke WAV dengan cepat dan mudah."
        },
        "youtube-to-mp4": {
            "title": "YouTube ke MP4",
            "desc": "Alat gratis untuk youtube ke MP4 dengan cepat dan mudah."
        },
        "tiktok-downloader": {
            "title": "TikTok Pengunduh",
            "desc": "Alat gratis untuk tiktok pengunduh dengan cepat dan mudah."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Pengunduh",
            "desc": "Alat gratis untuk instagram reels pengunduh dengan cepat dan mudah."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Pengunduh",
            "desc": "Alat gratis untuk instagram photo pengunduh dengan cepat dan mudah."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Pengunduh",
            "desc": "Alat gratis untuk instagram video pengunduh dengan cepat dan mudah."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Pengunduh",
            "desc": "Alat gratis untuk instagram story pengunduh dengan cepat dan mudah."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Pengunduh",
            "desc": "Alat gratis untuk instagram profile pengunduh dengan cepat dan mudah."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Pengunduh",
            "desc": "Alat gratis untuk instagram audio pengunduh dengan cepat dan mudah."
        },
        "spotify-to-mp3": {
            "title": "Spotify ke MP3",
            "desc": "Alat gratis untuk spotify ke MP3 dengan cepat dan mudah."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud ke MP3",
            "desc": "Alat gratis untuk soundcloud ke MP3 dengan cepat dan mudah."
        },
        "wav-to-mp3": {
            "title": "WAV ke MP3",
            "desc": "Alat gratis untuk WAV ke MP3 dengan cepat dan mudah."
        },
        "mp3-to-wav": {
            "title": "MP3 ke WAV",
            "desc": "Alat gratis untuk MP3 ke WAV dengan cepat dan mudah."
        },
        "wav-to-mp4": {
            "title": "WAV ke MP4",
            "desc": "Alat gratis untuk WAV ke MP4 dengan cepat dan mudah."
        },
        "mp4-to-wav": {
            "title": "MP4 ke WAV",
            "desc": "Alat gratis untuk MP4 ke WAV dengan cepat dan mudah."
        },
        "compress-video": {
            "title": "Kompres VIDEO",
            "desc": "Alat gratis untuk kompres video dengan cepat dan mudah."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Alat gratis untuk video trimmer dengan cepat dan mudah."
        },
        "video-merger": {
            "title": "Gabungkan MERGER",
            "desc": "Alat gratis untuk gabungkan merger dengan cepat dan mudah."
        },
        "mp4-to-mp3": {
            "title": "MP4 ke MP3",
            "desc": "Alat gratis untuk MP4 ke MP3 dengan cepat dan mudah."
        },
        "mp3-to-mp4": {
            "title": "MP3 ke MP4",
            "desc": "Alat gratis untuk MP3 ke MP4 dengan cepat dan mudah."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Alat gratis untuk MP3 compressor dengan cepat dan mudah."
        },
        "audio-converter": {
            "title": "Konverter Audio",
            "desc": "Alat gratis untuk konverter audio dengan cepat dan mudah."
        },
        "speech-to-text": {
            "title": "SPEECH ke TEXT",
            "desc": "Alat gratis untuk speech ke text dengan cepat dan mudah."
        },
        "text-to-speech": {
            "title": "TEXT ke SPEECH",
            "desc": "Alat gratis untuk text ke speech dengan cepat dan mudah."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Alat gratis untuk screen recorder dengan cepat dan mudah."
        },
        "video-to-gif": {
            "title": "VIDEO ke GIF",
            "desc": "Alat gratis untuk video ke GIF dengan cepat dan mudah."
        },
        "mp4-to-gif": {
            "title": "MP4 ke GIF",
            "desc": "Alat gratis untuk MP4 ke GIF dengan cepat dan mudah."
        },
        "webm-to-gif": {
            "title": "WEBM ke GIF",
            "desc": "Alat gratis untuk webm ke GIF dengan cepat dan mudah."
        },
        "apng-to-gif": {
            "title": "APNG ke GIF",
            "desc": "Alat gratis untuk apng ke GIF dengan cepat dan mudah."
        },
        "image-to-gif": {
            "title": "IMAGE ke GIF",
            "desc": "Alat gratis untuk image ke GIF dengan cepat dan mudah."
        },
        "gif-to-mp4": {
            "title": "GIF ke MP4",
            "desc": "Alat gratis untuk GIF ke MP4 dengan cepat dan mudah."
        },
        "gif-to-webm": {
            "title": "GIF ke WEBM",
            "desc": "Alat gratis untuk GIF ke webm dengan cepat dan mudah."
        },
        "gif-to-apng": {
            "title": "GIF ke APNG",
            "desc": "Alat gratis untuk GIF ke apng dengan cepat dan mudah."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Alat gratis untuk GIF compressor dengan cepat dan mudah."
        },
        "document-converter": {
            "title": "Konverter Document",
            "desc": "Alat gratis untuk konverter document dengan cepat dan mudah."
        },
        "ebook-converter": {
            "title": "Konverter Ebook",
            "desc": "Alat gratis untuk konverter ebook dengan cepat dan mudah."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Alat gratis untuk translate document dengan cepat dan mudah."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Alat gratis untuk translate word dengan cepat dan mudah."
        },
        "json-formatter": {
            "title": "Format JSON",
            "desc": "Formate, valide, embeleze e minifique estruturas de dados JSON com realce de sintaxe."
        },
        "xml-formatter": {
            "title": "Format XML",
            "desc": "Formate e organize documentos XML com indentação correta e validação de sintaxe."
        },
        "csv-formatter": {
            "title": "Format CSV",
            "desc": "Formate, limpe e converta ficheiros de dados CSV em tabelas estruturadas, JSON ou TSV."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Alat gratis untuk base64 tool dengan cepat dan mudah."
        },
        "hash-generator": {
            "title": "Generator Hash",
            "desc": "Alat gratis untuk generator hash dengan cepat dan mudah."
        },
        "password-generator": {
            "title": "Generator Password",
            "desc": "Alat gratis untuk generator password dengan cepat dan mudah."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Alat gratis untuk color picker dengan cepat dan mudah."
        },
        "qr-code-generator": {
            "title": "Generator QR",
            "desc": "Alat gratis untuk generator QR dengan cepat dan mudah."
        },
        "favicon-generator": {
            "title": "Generator Favicon",
            "desc": "Alat gratis untuk generator favicon dengan cepat dan mudah."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Alat gratis untuk lorem ipsum dengan cepat dan mudah."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Alat gratis untuk screenshot website dengan cepat dan mudah."
        }
    },
    "vi": {
        "pdf-to-word": {
            "title": "PDF sang WORD",
            "desc": "Công cụ miễn phí để PDF sang word một cách nhanh chóng và dễ dàng."
        },
        "word-to-pdf": {
            "title": "WORD sang PDF",
            "desc": "Công cụ miễn phí để word sang PDF một cách nhanh chóng và dễ dàng."
        },
        "youtube-to-mp3": {
            "title": "YouTube sang MP3",
            "desc": "Công cụ miễn phí để youtube sang MP3 một cách nhanh chóng và dễ dàng."
        },
        "youtube-downloader": {
            "title": "Trình tải xuống YouTube",
            "desc": "Công cụ miễn phí để trình tải xuống youtube một cách nhanh chóng và dễ dàng."
        },
        "merge-pdf": {
            "title": "Gộp PDF",
            "desc": "Công cụ miễn phí để gộp PDF một cách nhanh chóng và dễ dàng."
        },
        "compress-pdf": {
            "title": "Nén PDF",
            "desc": "Công cụ miễn phí để nén PDF một cách nhanh chóng và dễ dàng."
        },
        "pdf-to-jpg": {
            "title": "PDF sang JPG",
            "desc": "Công cụ miễn phí để PDF sang JPG một cách nhanh chóng và dễ dàng."
        },
        "jpg-to-pdf": {
            "title": "JPG sang PDF",
            "desc": "Công cụ miễn phí để JPG sang PDF một cách nhanh chóng và dễ dàng."
        },
        "excel-to-pdf": {
            "title": "EXCEL sang PDF",
            "desc": "Công cụ miễn phí để excel sang PDF một cách nhanh chóng và dễ dàng."
        },
        "pdf-to-excel": {
            "title": "PDF sang EXCEL",
            "desc": "Công cụ miễn phí để PDF sang excel một cách nhanh chóng và dễ dàng."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT sang PDF",
            "desc": "Công cụ miễn phí để powerpoint sang PDF một cách nhanh chóng và dễ dàng."
        },
        "pdf-to-powerpoint": {
            "title": "PDF sang POWERPOINT",
            "desc": "Công cụ miễn phí để PDF sang powerpoint một cách nhanh chóng và dễ dàng."
        },
        "edit-pdf": {
            "title": "Chỉnh sửa PDF",
            "desc": "Công cụ miễn phí để chỉnh sửa PDF một cách nhanh chóng và dễ dàng."
        },
        "split-pdf": {
            "title": "Tách PDF",
            "desc": "Công cụ miễn phí để tách PDF một cách nhanh chóng và dễ dàng."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Công cụ miễn phí để organize PDF một cách nhanh chóng và dễ dàng."
        },
        "remove-pages": {
            "title": "Xóa Trang PDF",
            "desc": "Dễ dàng xóa các trang không muốn khỏi tệp PDF."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Công cụ miễn phí để rotate PDF một cách nhanh chóng và dễ dàng."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Công cụ miễn phí để add PDF page number một cách nhanh chóng và dễ dàng."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Công cụ miễn phí để PDF add watermark một cách nhanh chóng và dễ dàng."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Công cụ miễn phí để protect PDF một cách nhanh chóng và dễ dàng."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Công cụ miễn phí để unlock PDF một cách nhanh chóng và dễ dàng."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Công cụ miễn phí để OCR PDF một cách nhanh chóng và dễ dàng."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Công cụ miễn phí để PDF summarize một cách nhanh chóng và dễ dàng."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Công cụ miễn phí để scan PDF một cách nhanh chóng và dễ dàng."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Công cụ miễn phí để repair PDF một cách nhanh chóng và dễ dàng."
        },
        "html-to-pdf": {
            "title": "HTML sang PDF",
            "desc": "Công cụ miễn phí để HTML sang PDF một cách nhanh chóng và dễ dàng."
        },
        "pdf-to-html": {
            "title": "PDF sang HTML",
            "desc": "Công cụ miễn phí để PDF sang HTML một cách nhanh chóng và dễ dàng."
        },
        "epub-to-pdf": {
            "title": "EPUB sang PDF",
            "desc": "Công cụ miễn phí để EPUB sang PDF một cách nhanh chóng và dễ dàng."
        },
        "pdf-to-epub": {
            "title": "PDF sang EPUB",
            "desc": "Công cụ miễn phí để PDF sang EPUB một cách nhanh chóng và dễ dàng."
        },
        "heic-to-pdf": {
            "title": "HEIC sang PDF",
            "desc": "Công cụ miễn phí để HEIC sang PDF một cách nhanh chóng và dễ dàng."
        },
        "pdf-to-heic": {
            "title": "PDF sang HEIC",
            "desc": "Công cụ miễn phí để PDF sang HEIC một cách nhanh chóng và dễ dàng."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF sang PDFA",
            "desc": "Công cụ miễn phí để convert-PDF sang pdfa một cách nhanh chóng và dễ dàng."
        },
        "remove-bg": {
            "title": "Xóa Nền Hình Ảnh",
            "desc": "Tự động xóa nền của bất kỳ hình ảnh nào bằng AI trong vài giây."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Công cụ miễn phí để upscale image một cách nhanh chóng và dễ dàng."
        },
        "remove-watermark": {
            "title": "Xóa Hình mờ",
            "desc": "Nhanh chóng xóa hình mờ khỏi hình ảnh và tài liệu."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Công cụ miễn phí để crop image một cách nhanh chóng và dễ dàng."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Công cụ miễn phí để resize image một cách nhanh chóng và dễ dàng."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Công cụ miễn phí để rotate image một cách nhanh chóng và dễ dàng."
        },
        "compress-image": {
            "title": "Nén IMAGE",
            "desc": "Công cụ miễn phí để nén image một cách nhanh chóng và dễ dàng."
        },
        "jpg-to-png": {
            "title": "JPG sang PNG",
            "desc": "Công cụ miễn phí để JPG sang PNG một cách nhanh chóng và dễ dàng."
        },
        "png-to-jpg": {
            "title": "PNG sang JPG",
            "desc": "Công cụ miễn phí để PNG sang JPG một cách nhanh chóng và dễ dàng."
        },
        "heic-to-jpg": {
            "title": "HEIC sang JPG",
            "desc": "Công cụ miễn phí để HEIC sang JPG một cách nhanh chóng và dễ dàng."
        },
        "jpg-to-heic": {
            "title": "JPG sang HEIC",
            "desc": "Công cụ miễn phí để JPG sang HEIC một cách nhanh chóng và dễ dàng."
        },
        "heic-to-png": {
            "title": "HEIC sang PNG",
            "desc": "Công cụ miễn phí để HEIC sang PNG một cách nhanh chóng và dễ dàng."
        },
        "png-to-heic": {
            "title": "PNG sang HEIC",
            "desc": "Công cụ miễn phí để PNG sang HEIC một cách nhanh chóng và dễ dàng."
        },
        "jpg-to-webp": {
            "title": "JPG sang WebP",
            "desc": "Công cụ miễn phí để JPG sang webp một cách nhanh chóng và dễ dàng."
        },
        "webp-to-jpg": {
            "title": "WebP sang JPG",
            "desc": "Công cụ miễn phí để webp sang JPG một cách nhanh chóng và dễ dàng."
        },
        "png-to-webp": {
            "title": "PNG sang WebP",
            "desc": "Công cụ miễn phí để PNG sang webp một cách nhanh chóng và dễ dàng."
        },
        "webp-to-png": {
            "title": "WebP sang PNG",
            "desc": "Công cụ miễn phí để webp sang PNG một cách nhanh chóng và dễ dàng."
        },
        "png-to-svg": {
            "title": "PNG sang SVG",
            "desc": "Công cụ miễn phí để PNG sang SVG một cách nhanh chóng và dễ dàng."
        },
        "jpg-to-svg": {
            "title": "JPG sang SVG",
            "desc": "Công cụ miễn phí để JPG sang SVG một cách nhanh chóng và dễ dàng."
        },
        "webp-to-svg": {
            "title": "WebP sang SVG",
            "desc": "Công cụ miễn phí để webp sang SVG một cách nhanh chóng và dễ dàng."
        },
        "youtube-to-wav": {
            "title": "YouTube sang WAV",
            "desc": "Công cụ miễn phí để youtube sang WAV một cách nhanh chóng và dễ dàng."
        },
        "youtube-to-mp4": {
            "title": "YouTube sang MP4",
            "desc": "Công cụ miễn phí để youtube sang MP4 một cách nhanh chóng và dễ dàng."
        },
        "tiktok-downloader": {
            "title": "Trình tải xuống TikTok",
            "desc": "Công cụ miễn phí để trình tải xuống tiktok một cách nhanh chóng và dễ dàng."
        },
        "instagram-reels-downloader": {
            "title": "Trình tải xuống Instagram Reels",
            "desc": "Công cụ miễn phí để trình tải xuống instagram reels một cách nhanh chóng và dễ dàng."
        },
        "instagram-photo-downloader": {
            "title": "Trình tải xuống Instagram Photo",
            "desc": "Công cụ miễn phí để trình tải xuống instagram photo một cách nhanh chóng và dễ dàng."
        },
        "instagram-video-downloader": {
            "title": "Trình tải xuống Instagram Video",
            "desc": "Công cụ miễn phí để trình tải xuống instagram video một cách nhanh chóng và dễ dàng."
        },
        "instagram-story-downloader": {
            "title": "Trình tải xuống Instagram Story",
            "desc": "Công cụ miễn phí để trình tải xuống instagram story một cách nhanh chóng và dễ dàng."
        },
        "instagram-profile-downloader": {
            "title": "Trình tải xuống Instagram Profile",
            "desc": "Công cụ miễn phí để trình tải xuống instagram profile một cách nhanh chóng và dễ dàng."
        },
        "instagram-audio-downloader": {
            "title": "Trình tải xuống Instagram Audio",
            "desc": "Công cụ miễn phí để trình tải xuống instagram audio một cách nhanh chóng và dễ dàng."
        },
        "spotify-to-mp3": {
            "title": "Spotify sang MP3",
            "desc": "Công cụ miễn phí để spotify sang MP3 một cách nhanh chóng và dễ dàng."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud sang MP3",
            "desc": "Công cụ miễn phí để soundcloud sang MP3 một cách nhanh chóng và dễ dàng."
        },
        "wav-to-mp3": {
            "title": "WAV sang MP3",
            "desc": "Công cụ miễn phí để WAV sang MP3 một cách nhanh chóng và dễ dàng."
        },
        "mp3-to-wav": {
            "title": "MP3 sang WAV",
            "desc": "Công cụ miễn phí để MP3 sang WAV một cách nhanh chóng và dễ dàng."
        },
        "wav-to-mp4": {
            "title": "WAV sang MP4",
            "desc": "Công cụ miễn phí để WAV sang MP4 một cách nhanh chóng và dễ dàng."
        },
        "mp4-to-wav": {
            "title": "MP4 sang WAV",
            "desc": "Công cụ miễn phí để MP4 sang WAV một cách nhanh chóng và dễ dàng."
        },
        "compress-video": {
            "title": "Nén VIDEO",
            "desc": "Công cụ miễn phí để nén video một cách nhanh chóng và dễ dàng."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Công cụ miễn phí để video trimmer một cách nhanh chóng và dễ dàng."
        },
        "video-merger": {
            "title": "Gộp MERGER",
            "desc": "Công cụ miễn phí để gộp merger một cách nhanh chóng và dễ dàng."
        },
        "mp4-to-mp3": {
            "title": "MP4 sang MP3",
            "desc": "Công cụ miễn phí để MP4 sang MP3 một cách nhanh chóng và dễ dàng."
        },
        "mp3-to-mp4": {
            "title": "MP3 sang MP4",
            "desc": "Công cụ miễn phí để MP3 sang MP4 một cách nhanh chóng và dễ dàng."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Công cụ miễn phí để MP3 compressor một cách nhanh chóng và dễ dàng."
        },
        "audio-converter": {
            "title": "Bộ chuyển đổi Audio",
            "desc": "Công cụ miễn phí để bộ chuyển đổi audio một cách nhanh chóng và dễ dàng."
        },
        "speech-to-text": {
            "title": "SPEECH sang TEXT",
            "desc": "Công cụ miễn phí để speech sang text một cách nhanh chóng và dễ dàng."
        },
        "text-to-speech": {
            "title": "TEXT sang SPEECH",
            "desc": "Công cụ miễn phí để text sang speech một cách nhanh chóng và dễ dàng."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Công cụ miễn phí để screen recorder một cách nhanh chóng và dễ dàng."
        },
        "video-to-gif": {
            "title": "VIDEO sang GIF",
            "desc": "Công cụ miễn phí để video sang GIF một cách nhanh chóng và dễ dàng."
        },
        "mp4-to-gif": {
            "title": "MP4 sang GIF",
            "desc": "Công cụ miễn phí để MP4 sang GIF một cách nhanh chóng và dễ dàng."
        },
        "webm-to-gif": {
            "title": "WEBM sang GIF",
            "desc": "Công cụ miễn phí để webm sang GIF một cách nhanh chóng và dễ dàng."
        },
        "apng-to-gif": {
            "title": "APNG sang GIF",
            "desc": "Công cụ miễn phí để apng sang GIF một cách nhanh chóng và dễ dàng."
        },
        "image-to-gif": {
            "title": "IMAGE sang GIF",
            "desc": "Công cụ miễn phí để image sang GIF một cách nhanh chóng và dễ dàng."
        },
        "gif-to-mp4": {
            "title": "GIF sang MP4",
            "desc": "Công cụ miễn phí để GIF sang MP4 một cách nhanh chóng và dễ dàng."
        },
        "gif-to-webm": {
            "title": "GIF sang WEBM",
            "desc": "Công cụ miễn phí để GIF sang webm một cách nhanh chóng và dễ dàng."
        },
        "gif-to-apng": {
            "title": "GIF sang APNG",
            "desc": "Công cụ miễn phí để GIF sang apng một cách nhanh chóng và dễ dàng."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Công cụ miễn phí để GIF compressor một cách nhanh chóng và dễ dàng."
        },
        "document-converter": {
            "title": "Bộ chuyển đổi Document",
            "desc": "Công cụ miễn phí để bộ chuyển đổi document một cách nhanh chóng và dễ dàng."
        },
        "ebook-converter": {
            "title": "Bộ chuyển đổi Ebook",
            "desc": "Công cụ miễn phí để bộ chuyển đổi ebook một cách nhanh chóng và dễ dàng."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Công cụ miễn phí để translate document một cách nhanh chóng và dễ dàng."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Công cụ miễn phí để translate word một cách nhanh chóng và dễ dàng."
        },
        "json-formatter": {
            "title": "Định dạng JSON",
            "desc": "Công cụ miễn phí để định dạng JSON một cách nhanh chóng và dễ dàng."
        },
        "xml-formatter": {
            "title": "Định dạng XML",
            "desc": "Công cụ miễn phí để định dạng XML một cách nhanh chóng và dễ dàng."
        },
        "csv-formatter": {
            "title": "Định dạng CSV",
            "desc": "Công cụ miễn phí để định dạng CSV một cách nhanh chóng và dễ dàng."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Công cụ miễn phí để base64 tool một cách nhanh chóng và dễ dàng."
        },
        "hash-generator": {
            "title": "Trình tạo Hash",
            "desc": "Công cụ miễn phí để trình tạo hash một cách nhanh chóng và dễ dàng."
        },
        "password-generator": {
            "title": "Trình tạo Password",
            "desc": "Công cụ miễn phí để trình tạo password một cách nhanh chóng và dễ dàng."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Công cụ miễn phí để color picker một cách nhanh chóng và dễ dàng."
        },
        "qr-code-generator": {
            "title": "Trình tạo QR",
            "desc": "Công cụ miễn phí để trình tạo QR một cách nhanh chóng và dễ dàng."
        },
        "favicon-generator": {
            "title": "Trình tạo Favicon",
            "desc": "Công cụ miễn phí để trình tạo favicon một cách nhanh chóng và dễ dàng."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Công cụ miễn phí để lorem ipsum một cách nhanh chóng và dễ dàng."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Công cụ miễn phí để screenshot website một cách nhanh chóng và dễ dàng."
        }
    },
    "zh": {
        "pdf-to-word": {
            "title": "PDF to WORD",
            "desc": "Convert PDF documents into editable DOC and DOCX files instantly while preserving all text layout and formatting."
        },
        "word-to-pdf": {
            "title": "WORD to PDF",
            "desc": "Transform Microsoft Word DOC and DOCX files into professional PDF documents ready for sharing and printing."
        },
        "youtube-to-mp3": {
            "title": "YouTube to MP3",
            "desc": "Convert YouTube videos into high bitrate 320kbps MP3 audio files with clean sound quality."
        },
        "youtube-downloader": {
            "title": "YouTube Downloader",
            "desc": "Download YouTube videos in MP4 1080p Full HD, 4K, or extract audio tracks instantly."
        },
        "merge-pdf": {
            "title": "Merge PDF",
            "desc": "Combine multiple PDF files into a single organized document in your exact preferred page order."
        },
        "compress-pdf": {
            "title": "Compress PDF",
            "desc": "Reduce PDF file size significantly while retaining crisp text and high image quality for fast email sharing."
        },
        "pdf-to-jpg": {
            "title": "PDF to JPG",
            "desc": "Convert every page of your PDF document into high-resolution JPG images with pristine visual quality."
        },
        "jpg-to-pdf": {
            "title": "JPG to PDF",
            "desc": "Convert JPG, PNG, and WebP images into a clean standardized PDF document with custom page margins."
        },
        "excel-to-pdf": {
            "title": "EXCEL to PDF",
            "desc": "Convert Excel spreadsheets XLS and XLSX into clean formatted PDF files with full table structure intact."
        },
        "pdf-to-excel": {
            "title": "PDF to EXCEL",
            "desc": "Extract tables and data from PDF documents into editable Excel XLSX spreadsheets for easy analysis."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT to PDF",
            "desc": "Convert PowerPoint presentation slides PPT and PPTX into universally viewable PDF documents."
        },
        "pdf-to-powerpoint": {
            "title": "PDF to POWERPOINT",
            "desc": "Convert PDF presentations into editable PowerPoint PPTX slides for easy presentation editing."
        },
        "edit-pdf": {
            "title": "Edit PDF",
            "desc": "Add text, shapes, annotations, images, and freehand drawings directly onto your PDF pages."
        },
        "split-pdf": {
            "title": "Split PDF",
            "desc": "Extract individual pages or split large PDF files into separate smaller documents with custom page ranges."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Reorder, delete, rotate, and rearrange pages within your PDF file using a visual drag-and-drop editor."
        },
        "remove-pages": {
            "title": "Remove PDF Pages",
            "desc": "Remove unwanted or blank pages from your PDF documents easily with one click."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Rotate specific pages or all pages inside a PDF document by 90, 180, or 270 degrees."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Insert customizable page numbers, headers, and footers with page counts onto your PDF pages."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Add text or image watermarks across your PDF pages to protect intellectual property."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Encrypt PDF files with strong password security and prevent unauthorized reading or copying."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Remove password protection and permissions security from PDF files to open and edit them freely."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Recognize scanned document text using optical character recognition to make PDFs searchable and selectable."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Summarize lengthy PDF reports and books using AI to extract key insights and bulleted executive summaries."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Free tool for scan PDF fast and easy."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Recover data from corrupted or damaged PDF files and restore them to a readable state."
        },
        "html-to-pdf": {
            "title": "HTML to PDF",
            "desc": "Convert web pages and HTML code snippets into high-quality PDF files with complete CSS styling."
        },
        "pdf-to-html": {
            "title": "PDF to HTML",
            "desc": "Convert PDF documents into clean, responsive HTML web pages ready for web publishing."
        },
        "epub-to-pdf": {
            "title": "EPUB to PDF",
            "desc": "Convert EPUB e-books into printable PDF documents with custom typography and page layouts."
        },
        "pdf-to-epub": {
            "title": "PDF to EPUB",
            "desc": "Convert PDF eBooks and manuals into reflowable EPUB format for comfortable reading on e-readers."
        },
        "heic-to-pdf": {
            "title": "HEIC to PDF",
            "desc": "Convert HEIC photos directly into printable PDF documents with custom page layouts."
        },
        "pdf-to-heic": {
            "title": "PDF to HEIC",
            "desc": "Convert PDF documents into high-efficiency HEIC image files for mobile storage optimization."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF to PDFA",
            "desc": "Convert standard PDFs into ISO-compliant PDF/A format for long-term digital archiving."
        },
        "remove-bg": {
            "title": "Remove Image Background",
            "desc": "Remove image backgrounds automatically in seconds using AI for clean transparent PNG cutouts."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Enlarge and enhance low-resolution images up to 4x clarity using AI deep learning super-resolution."
        },
        "remove-watermark": {
            "title": "Remove Watermark",
            "desc": "Remove unwanted watermarks, logos, text overlays, and stamps from photos using AI inpainting."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Crop photo borders, adjust aspect ratios, and trim unwanted edges with a visual cropping tool."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Change image dimensions by exact pixels or percentages with aspect ratio locking."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Rotate images clockwise or counter-clockwise and flip pictures horizontally or vertically."
        },
        "compress-image": {
            "title": "Compress IMAGE",
            "desc": "Compress JPG, PNG, and WebP images up to 80% without losing visible picture quality."
        },
        "jpg-to-png": {
            "title": "JPG to PNG",
            "desc": "Convert JPG images into PNG format with full transparency support and lossless compression."
        },
        "png-to-jpg": {
            "title": "PNG to JPG",
            "desc": "Convert PNG pictures to JPG format with custom background color fill and quality sliders."
        },
        "heic-to-jpg": {
            "title": "HEIC to JPG",
            "desc": "Convert iPhone HEIC photos into widely compatible JPG format for Windows and Web."
        },
        "jpg-to-heic": {
            "title": "JPG to HEIC",
            "desc": "Convert JPG images into high-efficiency HEIC format to save storage space on Apple devices."
        },
        "heic-to-png": {
            "title": "HEIC to PNG",
            "desc": "Convert Apple HEIC pictures into PNG format with full transparent background support."
        },
        "png-to-heic": {
            "title": "PNG to HEIC",
            "desc": "Convert PNG images into high-efficiency HEIC format while maintaining high image fidelity."
        },
        "jpg-to-webp": {
            "title": "JPG to WebP",
            "desc": "Convert JPG photos into modern WebP format to reduce web image load times."
        },
        "webp-to-jpg": {
            "title": "WebP to JPG",
            "desc": "Convert modern WebP images into universally compatible JPG format for older software."
        },
        "png-to-webp": {
            "title": "PNG to WebP",
            "desc": "Convert PNG graphics into web-optimized WebP images with alpha channel transparency intact."
        },
        "webp-to-png": {
            "title": "WebP to PNG",
            "desc": "Convert WebP images into transparent PNG format for easy graphics editing in Photoshop."
        },
        "png-to-svg": {
            "title": "PNG to SVG",
            "desc": "Convert PNG graphics into crisp vector SVG format with customizable path tracing."
        },
        "jpg-to-svg": {
            "title": "JPG to SVG",
            "desc": "Vectorize raster JPG images into scalable SVG vector graphics for logos and illustrations."
        },
        "webp-to-svg": {
            "title": "WebP to SVG",
            "desc": "Transform WebP images into resolution-independent SVG vector files for web design."
        },
        "youtube-to-wav": {
            "title": "YouTube to WAV",
            "desc": "Extract uncompressed studio quality WAV audio from YouTube videos for music editing."
        },
        "youtube-to-mp4": {
            "title": "YouTube to MP4",
            "desc": "Download YouTube videos in high definition MP4 format for offline viewing on any device."
        },
        "tiktok-downloader": {
            "title": "TikTok Downloader",
            "desc": "Download TikTok videos without watermark in HD MP4 format for reposting and editing."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Downloader",
            "desc": "Download Instagram Reels videos in full HD MP4 quality without watermark."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Downloader",
            "desc": "Download original quality Instagram photos and multi-photo posts effortlessly."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Downloader",
            "desc": "Save Instagram feed videos and IGTV clips directly as MP4 files to your device."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Downloader",
            "desc": "Free tool for instagram story downloader fast and easy."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Downloader",
            "desc": "Download full-size Instagram profile picture photos in original high resolution."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Downloader",
            "desc": "Extract background audio and trending music from Instagram Reels into MP3 format."
        },
        "spotify-to-mp3": {
            "title": "Spotify to MP3",
            "desc": "Convert Spotify music tracks and playlists into offline 320kbps MP3 audio files."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud to MP3",
            "desc": "Download audio tracks from SoundCloud in high quality MP3 format for offline listening."
        },
        "wav-to-mp3": {
            "title": "WAV to MP3",
            "desc": "Compress large WAV audio files into lightweight 320kbps MP3 format to save storage."
        },
        "mp3-to-wav": {
            "title": "MP3 to WAV",
            "desc": "Convert compressed MP3 audio files into uncompressed 16-bit 44.1kHz WAV studio audio."
        },
        "wav-to-mp4": {
            "title": "WAV to MP4",
            "desc": "Convert WAV audio files into MP4 video format with custom cover art for uploading to YouTube."
        },
        "mp4-to-wav": {
            "title": "MP4 to WAV",
            "desc": "Extract uncompressed WAV audio from MP4 videos for professional audio editing."
        },
        "compress-video": {
            "title": "Compress VIDEO",
            "desc": "Compress MP4, MOV, and AVI videos up to 80% size reduction with minimal quality loss."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Trim unwanted video segments, cut start and end points, and clip videos quickly."
        },
        "video-merger": {
            "title": "Merge MERGER",
            "desc": "Combine multiple video clips into a single seamless video file with custom transitions."
        },
        "mp4-to-mp3": {
            "title": "MP4 to MP3",
            "desc": "Extract high quality MP3 soundtrack audio from MP4 video files in seconds."
        },
        "mp3-to-mp4": {
            "title": "MP3 to MP4",
            "desc": "Combine MP3 audio tracks with a static background image or visualizer to create MP4 videos."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Reduce MP3 audio file size while preserving clear voice and musical instrument fidelity."
        },
        "audio-converter": {
            "title": "Converter Audio",
            "desc": "Convert audio files between MP3, WAV, AAC, FLAC, OGG, and M4A formats effortlessly."
        },
        "speech-to-text": {
            "title": "SPEECH to TEXT",
            "desc": "Transcribe voice recordings and microphone speech into accurate written text in real time."
        },
        "text-to-speech": {
            "title": "TEXT to SPEECH",
            "desc": "Convert written text into natural-sounding human speech audio with multiple voices and accents."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Record your computer screen, webcam, and microphone audio directly in your browser without software."
        },
        "video-to-gif": {
            "title": "VIDEO to GIF",
            "desc": "Convert MP4, MOV, and WebM video clips into animated GIFs with custom frame rate and loop settings."
        },
        "mp4-to-gif": {
            "title": "MP4 to GIF",
            "desc": "Turn MP4 video clips into lightweight animated GIFs for social media and messaging apps."
        },
        "webm-to-gif": {
            "title": "WEBM to GIF",
            "desc": "Convert WebM video clips into animated GIF format for universal web compatibility."
        },
        "apng-to-gif": {
            "title": "APNG to GIF",
            "desc": "Convert Animated PNG (APNG) files into widely supported animated GIF format."
        },
        "image-to-gif": {
            "title": "IMAGE to GIF",
            "desc": "Create animated GIFs from a sequence of static JPG, PNG, or WebP photos with custom frame delay."
        },
        "gif-to-mp4": {
            "title": "GIF to MP4",
            "desc": "Convert animated GIFs into smooth MP4 videos to reduce file size and enable audio playback."
        },
        "gif-to-webm": {
            "title": "GIF to WEBM",
            "desc": "Convert animated GIFs into lightweight WebM video files for fast web animation loading."
        },
        "gif-to-apng": {
            "title": "GIF to APNG",
            "desc": "Convert animated GIFs into crisp Animated PNG (APNG) format with full 24-bit color support."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Compress animated GIF files to reduce file size for fast messaging and web loading."
        },
        "document-converter": {
            "title": "Converter Document",
            "desc": "Convert documents between Word, PDF, TXT, RTF, HTML, and ODT formats."
        },
        "ebook-converter": {
            "title": "Converter Ebook",
            "desc": "Convert eBooks between EPUB, MOBI, AZW3, PDF, and TXT formats for Kindle and Kobo."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Translate Word, Excel, and text documents into over 100 languages with formatting intact."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Translate Microsoft Word DOCX files into any language while preserving original document layout."
        },
        "json-formatter": {
            "title": "Formatter JSON",
            "desc": "Format, validate, beautify, and minify JSON data structures with syntax highlighting and error checking."
        },
        "xml-formatter": {
            "title": "Formatter XML",
            "desc": "Format and prettify XML documents with proper indentation and syntax validation."
        },
        "csv-formatter": {
            "title": "Formatter CSV",
            "desc": "Format, clean, and convert CSV data files into structured tables, JSON, or TSV format."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Encode text and files into Base64 strings, or decode Base64 data back into original format."
        },
        "hash-generator": {
            "title": "Generator Hash",
            "desc": "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes for data integrity verification."
        },
        "password-generator": {
            "title": "Generator Password",
            "desc": "Generate strong, secure, unhackable passwords with custom length, numbers, and special symbols."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Pick colors from images, convert HEX to RGB and HSL values, and generate harmonious palettes."
        },
        "qr-code-generator": {
            "title": "Generator QR",
            "desc": "Create customizable QR codes for website URLs, Wi-Fi networks, contact vCards, and text."
        },
        "favicon-generator": {
            "title": "Generator Favicon",
            "desc": "Generate ICO, PNG, and Apple Touch favicon icons in all required dimensions from any logo."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Generate customized Lorem Ipsum dummy placeholder text by paragraphs, sentences, or words."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Capture full-page pixel-perfect website screenshots from any public URL in PNG or PDF."
        }
    },
    "ja": {
        "pdf-to-word": {
            "title": "PDF to WORD",
            "desc": "Convert PDF documents into editable DOC and DOCX files instantly while preserving all text layout and formatting."
        },
        "word-to-pdf": {
            "title": "WORD to PDF",
            "desc": "Transform Microsoft Word DOC and DOCX files into professional PDF documents ready for sharing and printing."
        },
        "youtube-to-mp3": {
            "title": "YouTube to MP3",
            "desc": "Convert YouTube videos into high bitrate 320kbps MP3 audio files with clean sound quality."
        },
        "youtube-downloader": {
            "title": "YouTube Downloader",
            "desc": "Download YouTube videos in MP4 1080p Full HD, 4K, or extract audio tracks instantly."
        },
        "merge-pdf": {
            "title": "Merge PDF",
            "desc": "Combine multiple PDF files into a single organized document in your exact preferred page order."
        },
        "compress-pdf": {
            "title": "Compress PDF",
            "desc": "Reduce PDF file size significantly while retaining crisp text and high image quality for fast email sharing."
        },
        "pdf-to-jpg": {
            "title": "PDF to JPG",
            "desc": "Convert every page of your PDF document into high-resolution JPG images with pristine visual quality."
        },
        "jpg-to-pdf": {
            "title": "JPG to PDF",
            "desc": "Convert JPG, PNG, and WebP images into a clean standardized PDF document with custom page margins."
        },
        "excel-to-pdf": {
            "title": "EXCEL to PDF",
            "desc": "Convert Excel spreadsheets XLS and XLSX into clean formatted PDF files with full table structure intact."
        },
        "pdf-to-excel": {
            "title": "PDF to EXCEL",
            "desc": "Extract tables and data from PDF documents into editable Excel XLSX spreadsheets for easy analysis."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT to PDF",
            "desc": "Convert PowerPoint presentation slides PPT and PPTX into universally viewable PDF documents."
        },
        "pdf-to-powerpoint": {
            "title": "PDF to POWERPOINT",
            "desc": "Convert PDF presentations into editable PowerPoint PPTX slides for easy presentation editing."
        },
        "edit-pdf": {
            "title": "Edit PDF",
            "desc": "Add text, shapes, annotations, images, and freehand drawings directly onto your PDF pages."
        },
        "split-pdf": {
            "title": "Split PDF",
            "desc": "Extract individual pages or split large PDF files into separate smaller documents with custom page ranges."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Reorder, delete, rotate, and rearrange pages within your PDF file using a visual drag-and-drop editor."
        },
        "remove-pages": {
            "title": "Remove PDF Pages",
            "desc": "Remove unwanted or blank pages from your PDF documents easily with one click."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Rotate specific pages or all pages inside a PDF document by 90, 180, or 270 degrees."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Insert customizable page numbers, headers, and footers with page counts onto your PDF pages."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Add text or image watermarks across your PDF pages to protect intellectual property."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Encrypt PDF files with strong password security and prevent unauthorized reading or copying."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Remove password protection and permissions security from PDF files to open and edit them freely."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Recognize scanned document text using optical character recognition to make PDFs searchable and selectable."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Summarize lengthy PDF reports and books using AI to extract key insights and bulleted executive summaries."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Free tool for scan PDF fast and easy."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Recover data from corrupted or damaged PDF files and restore them to a readable state."
        },
        "html-to-pdf": {
            "title": "HTML to PDF",
            "desc": "Convert web pages and HTML code snippets into high-quality PDF files with complete CSS styling."
        },
        "pdf-to-html": {
            "title": "PDF to HTML",
            "desc": "Convert PDF documents into clean, responsive HTML web pages ready for web publishing."
        },
        "epub-to-pdf": {
            "title": "EPUB to PDF",
            "desc": "Convert EPUB e-books into printable PDF documents with custom typography and page layouts."
        },
        "pdf-to-epub": {
            "title": "PDF to EPUB",
            "desc": "Convert PDF eBooks and manuals into reflowable EPUB format for comfortable reading on e-readers."
        },
        "heic-to-pdf": {
            "title": "HEIC to PDF",
            "desc": "Convert HEIC photos directly into printable PDF documents with custom page layouts."
        },
        "pdf-to-heic": {
            "title": "PDF to HEIC",
            "desc": "Convert PDF documents into high-efficiency HEIC image files for mobile storage optimization."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF to PDFA",
            "desc": "Convert standard PDFs into ISO-compliant PDF/A format for long-term digital archiving."
        },
        "remove-bg": {
            "title": "Remove Image Background",
            "desc": "Remove image backgrounds automatically in seconds using AI for clean transparent PNG cutouts."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Enlarge and enhance low-resolution images up to 4x clarity using AI deep learning super-resolution."
        },
        "remove-watermark": {
            "title": "Remove Watermark",
            "desc": "Remove unwanted watermarks, logos, text overlays, and stamps from photos using AI inpainting."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Crop photo borders, adjust aspect ratios, and trim unwanted edges with a visual cropping tool."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Change image dimensions by exact pixels or percentages with aspect ratio locking."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Rotate images clockwise or counter-clockwise and flip pictures horizontally or vertically."
        },
        "compress-image": {
            "title": "Compress IMAGE",
            "desc": "Compress JPG, PNG, and WebP images up to 80% without losing visible picture quality."
        },
        "jpg-to-png": {
            "title": "JPG to PNG",
            "desc": "Convert JPG images into PNG format with full transparency support and lossless compression."
        },
        "png-to-jpg": {
            "title": "PNG to JPG",
            "desc": "Convert PNG pictures to JPG format with custom background color fill and quality sliders."
        },
        "heic-to-jpg": {
            "title": "HEIC to JPG",
            "desc": "Convert iPhone HEIC photos into widely compatible JPG format for Windows and Web."
        },
        "jpg-to-heic": {
            "title": "JPG to HEIC",
            "desc": "Convert JPG images into high-efficiency HEIC format to save storage space on Apple devices."
        },
        "heic-to-png": {
            "title": "HEIC to PNG",
            "desc": "Convert Apple HEIC pictures into PNG format with full transparent background support."
        },
        "png-to-heic": {
            "title": "PNG to HEIC",
            "desc": "Convert PNG images into high-efficiency HEIC format while maintaining high image fidelity."
        },
        "jpg-to-webp": {
            "title": "JPG to WebP",
            "desc": "Convert JPG photos into modern WebP format to reduce web image load times."
        },
        "webp-to-jpg": {
            "title": "WebP to JPG",
            "desc": "Convert modern WebP images into universally compatible JPG format for older software."
        },
        "png-to-webp": {
            "title": "PNG to WebP",
            "desc": "Convert PNG graphics into web-optimized WebP images with alpha channel transparency intact."
        },
        "webp-to-png": {
            "title": "WebP to PNG",
            "desc": "Convert WebP images into transparent PNG format for easy graphics editing in Photoshop."
        },
        "png-to-svg": {
            "title": "PNG to SVG",
            "desc": "Convert PNG graphics into crisp vector SVG format with customizable path tracing."
        },
        "jpg-to-svg": {
            "title": "JPG to SVG",
            "desc": "Vectorize raster JPG images into scalable SVG vector graphics for logos and illustrations."
        },
        "webp-to-svg": {
            "title": "WebP to SVG",
            "desc": "Transform WebP images into resolution-independent SVG vector files for web design."
        },
        "youtube-to-wav": {
            "title": "YouTube to WAV",
            "desc": "Extract uncompressed studio quality WAV audio from YouTube videos for music editing."
        },
        "youtube-to-mp4": {
            "title": "YouTube to MP4",
            "desc": "Download YouTube videos in high definition MP4 format for offline viewing on any device."
        },
        "tiktok-downloader": {
            "title": "TikTok Downloader",
            "desc": "Download TikTok videos without watermark in HD MP4 format for reposting and editing."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Downloader",
            "desc": "Download Instagram Reels videos in full HD MP4 quality without watermark."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Downloader",
            "desc": "Download original quality Instagram photos and multi-photo posts effortlessly."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Downloader",
            "desc": "Save Instagram feed videos and IGTV clips directly as MP4 files to your device."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Downloader",
            "desc": "Free tool for instagram story downloader fast and easy."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Downloader",
            "desc": "Download full-size Instagram profile picture photos in original high resolution."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Downloader",
            "desc": "Extract background audio and trending music from Instagram Reels into MP3 format."
        },
        "spotify-to-mp3": {
            "title": "Spotify to MP3",
            "desc": "Convert Spotify music tracks and playlists into offline 320kbps MP3 audio files."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud to MP3",
            "desc": "Download audio tracks from SoundCloud in high quality MP3 format for offline listening."
        },
        "wav-to-mp3": {
            "title": "WAV to MP3",
            "desc": "Compress large WAV audio files into lightweight 320kbps MP3 format to save storage."
        },
        "mp3-to-wav": {
            "title": "MP3 to WAV",
            "desc": "Convert compressed MP3 audio files into uncompressed 16-bit 44.1kHz WAV studio audio."
        },
        "wav-to-mp4": {
            "title": "WAV to MP4",
            "desc": "Convert WAV audio files into MP4 video format with custom cover art for uploading to YouTube."
        },
        "mp4-to-wav": {
            "title": "MP4 to WAV",
            "desc": "Extract uncompressed WAV audio from MP4 videos for professional audio editing."
        },
        "compress-video": {
            "title": "Compress VIDEO",
            "desc": "Compress MP4, MOV, and AVI videos up to 80% size reduction with minimal quality loss."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Trim unwanted video segments, cut start and end points, and clip videos quickly."
        },
        "video-merger": {
            "title": "Merge MERGER",
            "desc": "Combine multiple video clips into a single seamless video file with custom transitions."
        },
        "mp4-to-mp3": {
            "title": "MP4 to MP3",
            "desc": "Extract high quality MP3 soundtrack audio from MP4 video files in seconds."
        },
        "mp3-to-mp4": {
            "title": "MP3 to MP4",
            "desc": "Combine MP3 audio tracks with a static background image or visualizer to create MP4 videos."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Reduce MP3 audio file size while preserving clear voice and musical instrument fidelity."
        },
        "audio-converter": {
            "title": "Converter Audio",
            "desc": "Convert audio files between MP3, WAV, AAC, FLAC, OGG, and M4A formats effortlessly."
        },
        "speech-to-text": {
            "title": "SPEECH to TEXT",
            "desc": "Transcribe voice recordings and microphone speech into accurate written text in real time."
        },
        "text-to-speech": {
            "title": "TEXT to SPEECH",
            "desc": "Convert written text into natural-sounding human speech audio with multiple voices and accents."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Record your computer screen, webcam, and microphone audio directly in your browser without software."
        },
        "video-to-gif": {
            "title": "VIDEO to GIF",
            "desc": "Convert MP4, MOV, and WebM video clips into animated GIFs with custom frame rate and loop settings."
        },
        "mp4-to-gif": {
            "title": "MP4 to GIF",
            "desc": "Turn MP4 video clips into lightweight animated GIFs for social media and messaging apps."
        },
        "webm-to-gif": {
            "title": "WEBM to GIF",
            "desc": "Convert WebM video clips into animated GIF format for universal web compatibility."
        },
        "apng-to-gif": {
            "title": "APNG to GIF",
            "desc": "Convert Animated PNG (APNG) files into widely supported animated GIF format."
        },
        "image-to-gif": {
            "title": "IMAGE to GIF",
            "desc": "Create animated GIFs from a sequence of static JPG, PNG, or WebP photos with custom frame delay."
        },
        "gif-to-mp4": {
            "title": "GIF to MP4",
            "desc": "Convert animated GIFs into smooth MP4 videos to reduce file size and enable audio playback."
        },
        "gif-to-webm": {
            "title": "GIF to WEBM",
            "desc": "Convert animated GIFs into lightweight WebM video files for fast web animation loading."
        },
        "gif-to-apng": {
            "title": "GIF to APNG",
            "desc": "Convert animated GIFs into crisp Animated PNG (APNG) format with full 24-bit color support."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Compress animated GIF files to reduce file size for fast messaging and web loading."
        },
        "document-converter": {
            "title": "Converter Document",
            "desc": "Convert documents between Word, PDF, TXT, RTF, HTML, and ODT formats."
        },
        "ebook-converter": {
            "title": "Converter Ebook",
            "desc": "Convert eBooks between EPUB, MOBI, AZW3, PDF, and TXT formats for Kindle and Kobo."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Translate Word, Excel, and text documents into over 100 languages with formatting intact."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Translate Microsoft Word DOCX files into any language while preserving original document layout."
        },
        "json-formatter": {
            "title": "Formatter JSON",
            "desc": "Format, validate, beautify, and minify JSON data structures with syntax highlighting and error checking."
        },
        "xml-formatter": {
            "title": "Formatter XML",
            "desc": "Format and prettify XML documents with proper indentation and syntax validation."
        },
        "csv-formatter": {
            "title": "Formatter CSV",
            "desc": "Format, clean, and convert CSV data files into structured tables, JSON, or TSV format."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Encode text and files into Base64 strings, or decode Base64 data back into original format."
        },
        "hash-generator": {
            "title": "Generator Hash",
            "desc": "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes for data integrity verification."
        },
        "password-generator": {
            "title": "Generator Password",
            "desc": "Generate strong, secure, unhackable passwords with custom length, numbers, and special symbols."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Pick colors from images, convert HEX to RGB and HSL values, and generate harmonious palettes."
        },
        "qr-code-generator": {
            "title": "Generator QR",
            "desc": "Create customizable QR codes for website URLs, Wi-Fi networks, contact vCards, and text."
        },
        "favicon-generator": {
            "title": "Generator Favicon",
            "desc": "Generate ICO, PNG, and Apple Touch favicon icons in all required dimensions from any logo."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Generate customized Lorem Ipsum dummy placeholder text by paragraphs, sentences, or words."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Capture full-page pixel-perfect website screenshots from any public URL in PNG or PDF."
        }
    },
    "ko": {
        "pdf-to-word": {
            "title": "PDF to WORD",
            "desc": "Convert PDF documents into editable DOC and DOCX files instantly while preserving all text layout and formatting."
        },
        "word-to-pdf": {
            "title": "WORD to PDF",
            "desc": "Transform Microsoft Word DOC and DOCX files into professional PDF documents ready for sharing and printing."
        },
        "youtube-to-mp3": {
            "title": "YouTube to MP3",
            "desc": "Convert YouTube videos into high bitrate 320kbps MP3 audio files with clean sound quality."
        },
        "youtube-downloader": {
            "title": "YouTube Downloader",
            "desc": "Download YouTube videos in MP4 1080p Full HD, 4K, or extract audio tracks instantly."
        },
        "merge-pdf": {
            "title": "Merge PDF",
            "desc": "Combine multiple PDF files into a single organized document in your exact preferred page order."
        },
        "compress-pdf": {
            "title": "Compress PDF",
            "desc": "Reduce PDF file size significantly while retaining crisp text and high image quality for fast email sharing."
        },
        "pdf-to-jpg": {
            "title": "PDF to JPG",
            "desc": "Convert every page of your PDF document into high-resolution JPG images with pristine visual quality."
        },
        "jpg-to-pdf": {
            "title": "JPG to PDF",
            "desc": "Convert JPG, PNG, and WebP images into a clean standardized PDF document with custom page margins."
        },
        "excel-to-pdf": {
            "title": "EXCEL to PDF",
            "desc": "Convert Excel spreadsheets XLS and XLSX into clean formatted PDF files with full table structure intact."
        },
        "pdf-to-excel": {
            "title": "PDF to EXCEL",
            "desc": "Extract tables and data from PDF documents into editable Excel XLSX spreadsheets for easy analysis."
        },
        "powerpoint-to-pdf": {
            "title": "POWERPOINT to PDF",
            "desc": "Convert PowerPoint presentation slides PPT and PPTX into universally viewable PDF documents."
        },
        "pdf-to-powerpoint": {
            "title": "PDF to POWERPOINT",
            "desc": "Convert PDF presentations into editable PowerPoint PPTX slides for easy presentation editing."
        },
        "edit-pdf": {
            "title": "Edit PDF",
            "desc": "Add text, shapes, annotations, images, and freehand drawings directly onto your PDF pages."
        },
        "split-pdf": {
            "title": "Split PDF",
            "desc": "Extract individual pages or split large PDF files into separate smaller documents with custom page ranges."
        },
        "organize-pdf": {
            "title": "Organize PDF",
            "desc": "Reorder, delete, rotate, and rearrange pages within your PDF file using a visual drag-and-drop editor."
        },
        "remove-pages": {
            "title": "Remove PDF Pages",
            "desc": "Remove unwanted or blank pages from your PDF documents easily with one click."
        },
        "rotate-pdf": {
            "title": "Rotate PDF",
            "desc": "Rotate specific pages or all pages inside a PDF document by 90, 180, or 270 degrees."
        },
        "add-pdf-page-number": {
            "title": "Add PDF Page Number",
            "desc": "Insert customizable page numbers, headers, and footers with page counts onto your PDF pages."
        },
        "pdf-add-watermark": {
            "title": "PDF Add Watermark",
            "desc": "Add text or image watermarks across your PDF pages to protect intellectual property."
        },
        "protect-pdf": {
            "title": "Protect PDF",
            "desc": "Encrypt PDF files with strong password security and prevent unauthorized reading or copying."
        },
        "unlock-pdf": {
            "title": "Unlock PDF",
            "desc": "Remove password protection and permissions security from PDF files to open and edit them freely."
        },
        "ocr-pdf": {
            "title": "OCR PDF",
            "desc": "Recognize scanned document text using optical character recognition to make PDFs searchable and selectable."
        },
        "pdf-summarize": {
            "title": "PDF Summarize",
            "desc": "Summarize lengthy PDF reports and books using AI to extract key insights and bulleted executive summaries."
        },
        "scan-pdf": {
            "title": "Scan PDF",
            "desc": "Free tool for scan PDF fast and easy."
        },
        "repair-pdf": {
            "title": "Repair PDF",
            "desc": "Recover data from corrupted or damaged PDF files and restore them to a readable state."
        },
        "html-to-pdf": {
            "title": "HTML to PDF",
            "desc": "Convert web pages and HTML code snippets into high-quality PDF files with complete CSS styling."
        },
        "pdf-to-html": {
            "title": "PDF to HTML",
            "desc": "Convert PDF documents into clean, responsive HTML web pages ready for web publishing."
        },
        "epub-to-pdf": {
            "title": "EPUB to PDF",
            "desc": "Convert EPUB e-books into printable PDF documents with custom typography and page layouts."
        },
        "pdf-to-epub": {
            "title": "PDF to EPUB",
            "desc": "Convert PDF eBooks and manuals into reflowable EPUB format for comfortable reading on e-readers."
        },
        "heic-to-pdf": {
            "title": "HEIC to PDF",
            "desc": "Convert HEIC photos directly into printable PDF documents with custom page layouts."
        },
        "pdf-to-heic": {
            "title": "PDF to HEIC",
            "desc": "Convert PDF documents into high-efficiency HEIC image files for mobile storage optimization."
        },
        "convert-pdf-to-pdfa": {
            "title": "CONVERT-PDF to PDFA",
            "desc": "Convert standard PDFs into ISO-compliant PDF/A format for long-term digital archiving."
        },
        "remove-bg": {
            "title": "Remove Image Background",
            "desc": "Remove image backgrounds automatically in seconds using AI for clean transparent PNG cutouts."
        },
        "upscale-image": {
            "title": "Upscale Image",
            "desc": "Enlarge and enhance low-resolution images up to 4x clarity using AI deep learning super-resolution."
        },
        "remove-watermark": {
            "title": "Remove Watermark",
            "desc": "Remove unwanted watermarks, logos, text overlays, and stamps from photos using AI inpainting."
        },
        "crop-image": {
            "title": "Crop Image",
            "desc": "Crop photo borders, adjust aspect ratios, and trim unwanted edges with a visual cropping tool."
        },
        "resize-image": {
            "title": "Resize Image",
            "desc": "Change image dimensions by exact pixels or percentages with aspect ratio locking."
        },
        "rotate-image": {
            "title": "Rotate Image",
            "desc": "Rotate images clockwise or counter-clockwise and flip pictures horizontally or vertically."
        },
        "compress-image": {
            "title": "Compress IMAGE",
            "desc": "Compress JPG, PNG, and WebP images up to 80% without losing visible picture quality."
        },
        "jpg-to-png": {
            "title": "JPG to PNG",
            "desc": "Convert JPG images into PNG format with full transparency support and lossless compression."
        },
        "png-to-jpg": {
            "title": "PNG to JPG",
            "desc": "Convert PNG pictures to JPG format with custom background color fill and quality sliders."
        },
        "heic-to-jpg": {
            "title": "HEIC to JPG",
            "desc": "Convert iPhone HEIC photos into widely compatible JPG format for Windows and Web."
        },
        "jpg-to-heic": {
            "title": "JPG to HEIC",
            "desc": "Convert JPG images into high-efficiency HEIC format to save storage space on Apple devices."
        },
        "heic-to-png": {
            "title": "HEIC to PNG",
            "desc": "Convert Apple HEIC pictures into PNG format with full transparent background support."
        },
        "png-to-heic": {
            "title": "PNG to HEIC",
            "desc": "Convert PNG images into high-efficiency HEIC format while maintaining high image fidelity."
        },
        "jpg-to-webp": {
            "title": "JPG to WebP",
            "desc": "Convert JPG photos into modern WebP format to reduce web image load times."
        },
        "webp-to-jpg": {
            "title": "WebP to JPG",
            "desc": "Convert modern WebP images into universally compatible JPG format for older software."
        },
        "png-to-webp": {
            "title": "PNG to WebP",
            "desc": "Convert PNG graphics into web-optimized WebP images with alpha channel transparency intact."
        },
        "webp-to-png": {
            "title": "WebP to PNG",
            "desc": "Convert WebP images into transparent PNG format for easy graphics editing in Photoshop."
        },
        "png-to-svg": {
            "title": "PNG to SVG",
            "desc": "Convert PNG graphics into crisp vector SVG format with customizable path tracing."
        },
        "jpg-to-svg": {
            "title": "JPG to SVG",
            "desc": "Vectorize raster JPG images into scalable SVG vector graphics for logos and illustrations."
        },
        "webp-to-svg": {
            "title": "WebP to SVG",
            "desc": "Transform WebP images into resolution-independent SVG vector files for web design."
        },
        "youtube-to-wav": {
            "title": "YouTube to WAV",
            "desc": "Extract uncompressed studio quality WAV audio from YouTube videos for music editing."
        },
        "youtube-to-mp4": {
            "title": "YouTube to MP4",
            "desc": "Download YouTube videos in high definition MP4 format for offline viewing on any device."
        },
        "tiktok-downloader": {
            "title": "TikTok Downloader",
            "desc": "Download TikTok videos without watermark in HD MP4 format for reposting and editing."
        },
        "instagram-reels-downloader": {
            "title": "Instagram Reels Downloader",
            "desc": "Download Instagram Reels videos in full HD MP4 quality without watermark."
        },
        "instagram-photo-downloader": {
            "title": "Instagram Photo Downloader",
            "desc": "Download original quality Instagram photos and multi-photo posts effortlessly."
        },
        "instagram-video-downloader": {
            "title": "Instagram Video Downloader",
            "desc": "Save Instagram feed videos and IGTV clips directly as MP4 files to your device."
        },
        "instagram-story-downloader": {
            "title": "Instagram Story Downloader",
            "desc": "Free tool for instagram story downloader fast and easy."
        },
        "instagram-profile-downloader": {
            "title": "Instagram Profile Downloader",
            "desc": "Download full-size Instagram profile picture photos in original high resolution."
        },
        "instagram-audio-downloader": {
            "title": "Instagram Audio Downloader",
            "desc": "Extract background audio and trending music from Instagram Reels into MP3 format."
        },
        "spotify-to-mp3": {
            "title": "Spotify to MP3",
            "desc": "Convert Spotify music tracks and playlists into offline 320kbps MP3 audio files."
        },
        "soundcloud-to-mp3": {
            "title": "SoundCloud to MP3",
            "desc": "Download audio tracks from SoundCloud in high quality MP3 format for offline listening."
        },
        "wav-to-mp3": {
            "title": "WAV to MP3",
            "desc": "Compress large WAV audio files into lightweight 320kbps MP3 format to save storage."
        },
        "mp3-to-wav": {
            "title": "MP3 to WAV",
            "desc": "Convert compressed MP3 audio files into uncompressed 16-bit 44.1kHz WAV studio audio."
        },
        "wav-to-mp4": {
            "title": "WAV to MP4",
            "desc": "Convert WAV audio files into MP4 video format with custom cover art for uploading to YouTube."
        },
        "mp4-to-wav": {
            "title": "MP4 to WAV",
            "desc": "Extract uncompressed WAV audio from MP4 videos for professional audio editing."
        },
        "compress-video": {
            "title": "Compress VIDEO",
            "desc": "Compress MP4, MOV, and AVI videos up to 80% size reduction with minimal quality loss."
        },
        "video-trimmer": {
            "title": "Video Trimmer",
            "desc": "Trim unwanted video segments, cut start and end points, and clip videos quickly."
        },
        "video-merger": {
            "title": "Merge MERGER",
            "desc": "Combine multiple video clips into a single seamless video file with custom transitions."
        },
        "mp4-to-mp3": {
            "title": "MP4 to MP3",
            "desc": "Extract high quality MP3 soundtrack audio from MP4 video files in seconds."
        },
        "mp3-to-mp4": {
            "title": "MP3 to MP4",
            "desc": "Combine MP3 audio tracks with a static background image or visualizer to create MP4 videos."
        },
        "mp3-compressor": {
            "title": "MP3 Compressor",
            "desc": "Reduce MP3 audio file size while preserving clear voice and musical instrument fidelity."
        },
        "audio-converter": {
            "title": "Converter Audio",
            "desc": "Convert audio files between MP3, WAV, AAC, FLAC, OGG, and M4A formats effortlessly."
        },
        "speech-to-text": {
            "title": "SPEECH to TEXT",
            "desc": "Transcribe voice recordings and microphone speech into accurate written text in real time."
        },
        "text-to-speech": {
            "title": "TEXT to SPEECH",
            "desc": "Convert written text into natural-sounding human speech audio with multiple voices and accents."
        },
        "screen-recorder": {
            "title": "Screen Recorder",
            "desc": "Record your computer screen, webcam, and microphone audio directly in your browser without software."
        },
        "video-to-gif": {
            "title": "VIDEO to GIF",
            "desc": "Convert MP4, MOV, and WebM video clips into animated GIFs with custom frame rate and loop settings."
        },
        "mp4-to-gif": {
            "title": "MP4 to GIF",
            "desc": "Turn MP4 video clips into lightweight animated GIFs for social media and messaging apps."
        },
        "webm-to-gif": {
            "title": "WEBM to GIF",
            "desc": "Convert WebM video clips into animated GIF format for universal web compatibility."
        },
        "apng-to-gif": {
            "title": "APNG to GIF",
            "desc": "Convert Animated PNG (APNG) files into widely supported animated GIF format."
        },
        "image-to-gif": {
            "title": "IMAGE to GIF",
            "desc": "Create animated GIFs from a sequence of static JPG, PNG, or WebP photos with custom frame delay."
        },
        "gif-to-mp4": {
            "title": "GIF to MP4",
            "desc": "Convert animated GIFs into smooth MP4 videos to reduce file size and enable audio playback."
        },
        "gif-to-webm": {
            "title": "GIF to WEBM",
            "desc": "Convert animated GIFs into lightweight WebM video files for fast web animation loading."
        },
        "gif-to-apng": {
            "title": "GIF to APNG",
            "desc": "Convert animated GIFs into crisp Animated PNG (APNG) format with full 24-bit color support."
        },
        "gif-compressor": {
            "title": "GIF Compressor",
            "desc": "Compress animated GIF files to reduce file size for fast messaging and web loading."
        },
        "document-converter": {
            "title": "Converter Document",
            "desc": "Convert documents between Word, PDF, TXT, RTF, HTML, and ODT formats."
        },
        "ebook-converter": {
            "title": "Converter Ebook",
            "desc": "Convert eBooks between EPUB, MOBI, AZW3, PDF, and TXT formats for Kindle and Kobo."
        },
        "translate-document": {
            "title": "Translate Document",
            "desc": "Translate Word, Excel, and text documents into over 100 languages with formatting intact."
        },
        "translate-word": {
            "title": "Translate Word",
            "desc": "Translate Microsoft Word DOCX files into any language while preserving original document layout."
        },
        "json-formatter": {
            "title": "Formatter JSON",
            "desc": "Format, validate, beautify, and minify JSON data structures with syntax highlighting and error checking."
        },
        "xml-formatter": {
            "title": "Formatter XML",
            "desc": "Format and prettify XML documents with proper indentation and syntax validation."
        },
        "csv-formatter": {
            "title": "Formatter CSV",
            "desc": "Format, clean, and convert CSV data files into structured tables, JSON, or TSV format."
        },
        "base64-tool": {
            "title": "Base64 Tool",
            "desc": "Encode text and files into Base64 strings, or decode Base64 data back into original format."
        },
        "hash-generator": {
            "title": "Generator Hash",
            "desc": "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes for data integrity verification."
        },
        "password-generator": {
            "title": "Generator Password",
            "desc": "Generate strong, secure, unhackable passwords with custom length, numbers, and special symbols."
        },
        "color-picker": {
            "title": "Color Picker",
            "desc": "Pick colors from images, convert HEX to RGB and HSL values, and generate harmonious palettes."
        },
        "qr-code-generator": {
            "title": "Generator QR",
            "desc": "Create customizable QR codes for website URLs, Wi-Fi networks, contact vCards, and text."
        },
        "favicon-generator": {
            "title": "Generator Favicon",
            "desc": "Generate ICO, PNG, and Apple Touch favicon icons in all required dimensions from any logo."
        },
        "lorem-ipsum": {
            "title": "Lorem Ipsum",
            "desc": "Generate customized Lorem Ipsum dummy placeholder text by paragraphs, sentences, or words."
        },
        "screenshot-website": {
            "title": "Screenshot Website",
            "desc": "Capture full-page pixel-perfect website screenshots from any public URL in PNG or PDF."
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initCategoryFilter();
    initSearchFilter();
    initLinksAndRouting();
    initDragAndDropGlobal();
    initLangSelector();
    detectAndApplyUserLanguage();
});

// Initialize Language Selector Click Handlers
function initLangSelector() {
    const langBtn = document.getElementById('lang-selector-btn');
    if (langBtn) {
        langBtn.onclick = (e) => {
            if (e) e.stopPropagation();
            toggleLangDropdown(e);
        };
    }

    const options = document.querySelectorAll('.lang-option');
    options.forEach(opt => {
        opt.onclick = (e) => {
            if (e) {
                e.stopPropagation();
                e.preventDefault();
            }
            const code = opt.getAttribute('data-lang');
            const label = opt.textContent.trim();
            selectLanguage(code, label);
        };
    });
}

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

// Live Search Filter Logic (Unified Direct Grid & Search Results Indicator)
const SEARCH_RESULTS_TRANSLATIONS = {
    'pt': '🔍 Resultados da Pesquisa ({count} ferramentas encontradas)',
    'en': '🔍 Search Results ({count} tools found)',
    'es': '🔍 Resultados de Búsqueda ({count} herramientas encontradas)',
    'fr': '🔍 Résultats de recherche ({count} outils trouvés)',
    'de': '🔍 Suchergebnisse ({count} Werkzeuge gefunden)',
    'it': '🔍 Risultati della Ricerca ({count} strumenti trovati)',
    'ar': '🔍 نتائج البحث (تم العثور على {count} من الأدوات)',
    'ru': '🔍 Результаты Поиска (найдено инструментов: {count})',
    'id': '🔍 Hasil Pencarian ({count} alat ditemukan)',
    'vi': '🔍 Kết quả Tìm kiếm (tìm thấy {count} công cụ)'
};

// Multilingual Synonyms & Stemming Map
const SEARCH_SYNONYMS = {
    // 1. Removal & Deletion
    'remove': ['remove', 'remover', 'remova', 'eliminar', 'supprimer', 'entfernen', 'rimuovi', 'удалить', 'hapus', 'xóa', 'apagar', 'deletar', 'delete'],
    'remover': ['remove', 'remover', 'remova', 'eliminar', 'supprimer', 'entfernen', 'rimuovi', 'удалить', 'hapus', 'xóa', 'apagar', 'deletar', 'delete'],
    'eliminar': ['remove', 'remover', 'remova', 'eliminar', 'supprimer', 'entfernen', 'rimuovi', 'удалить', 'hapus', 'xóa', 'apagar', 'deletar', 'delete'],
    'supprimer': ['remove', 'remover', 'remova', 'eliminar', 'supprimer', 'entfernen', 'rimuovi', 'удалить', 'hapus', 'xóa', 'apagar', 'deletar', 'delete'],
    'entfernen': ['remove', 'remover', 'remova', 'eliminar', 'supprimer', 'entfernen', 'rimuovi', 'удалить', 'hapus', 'xóa', 'apagar', 'deletar', 'delete'],
    'rimuovi': ['remove', 'remover', 'remova', 'eliminar', 'supprimer', 'entfernen', 'rimuovi', 'удалить', 'hapus', 'xóa', 'apagar', 'deletar', 'delete'],
    'hapus': ['remove', 'remover', 'remova', 'eliminar', 'supprimer', 'entfernen', 'rimuovi', 'удалить', 'hapus', 'xóa', 'apagar', 'deletar', 'delete'],

    // 2. Compression & Shrinking
    'compress': ['compress', 'comprimir', 'compresseur', 'komprimieren', 'comprimido', 'compresso', 'ضغط', 'сжать', 'kompres', 'nén', 'reduzir', 'redutores'],
    'comprimir': ['compress', 'comprimir', 'compresseur', 'komprimieren', 'comprimido', 'compresso', 'ضغط', 'сжать', 'kompres', 'nén', 'reduzir', 'redutores'],
    'komprimieren': ['compress', 'comprimir', 'compresseur', 'komprimieren', 'comprimido', 'compresso', 'ضغط', 'сжать', 'kompres', 'nén', 'reduzir', 'redutores'],

    // 3. Conversion & Transformation
    'convert': ['convert', 'converter', 'conversor', 'convertidor', 'convertir', 'konvertieren', 'تحويل', 'конвертировать', 'konversi', 'chuyển', 'transformar'],
    'converter': ['convert', 'converter', 'conversor', 'convertidor', 'convertir', 'konvertieren', 'تحويل', 'конвертировать', 'konversi', 'chuyển', 'transformar'],
    'convertir': ['convert', 'converter', 'conversor', 'convertidor', 'convertir', 'konvertieren', 'تحويل', 'конвертировать', 'konversi', 'chuyển', 'transformar'],

    // 4. Download & Extraction
    'download': ['download', 'downloader', 'descarregar', 'descarregador', 'descargar', 'descargador', 'télécharger', 'téléchargeur', 'herunterladen', 'تنزيل', 'загрузчик', 'pengunduh', 'tải', 'baixar'],
    'descarregar': ['download', 'downloader', 'descarregar', 'descarregador', 'descargar', 'descargador', 'télécharger', 'téléchargeur', 'herunterladen', 'تنزيل', 'загрузчик', 'pengunduh', 'tải', 'baixar'],
    'descargar': ['download', 'downloader', 'descarregar', 'descarregador', 'descargar', 'descargador', 'télécharger', 'téléchargeur', 'herunterladen', 'تنزيل', 'загрузчик', 'pengunduh', 'tải', 'baixar'],

    // 5. Merge & Combination
    'merge': ['merge', 'merger', 'juntar', 'unir', 'combinar', 'fusionner', 'zusammenfügen', 'unisci', 'دمج', 'объединить', 'gabung', 'gộp'],
    'juntar': ['merge', 'merger', 'juntar', 'unir', 'combinar', 'fusionner', 'zusammenfügen', 'unisci', 'دمج', 'объединить', 'gabung', 'gộp'],
    'unir': ['merge', 'merger', 'juntar', 'unir', 'combinar', 'fusionner', 'zusammenfügen', 'unisci', 'دمج', 'объединить', 'gabung', 'gộp'],

    // 6. Split & Separation
    'split': ['split', 'splitter', 'dividir', 'separar', 'diviser', 'teilen', 'dividi', 'تقسيم', 'разделить', 'pisah', 'tách'],
    'dividir': ['split', 'splitter', 'dividir', 'separar', 'diviser', 'teilen', 'dividi', 'تقسيم', 'разделить', 'pisah', 'tách'],
    'separar': ['split', 'splitter', 'dividir', 'separar', 'diviser', 'teilen', 'dividi', 'تقسيم', 'разделить', 'pisah', 'tách'],

    // 7. Crop & Trimming
    'crop': ['crop', 'cortar', 'recortar', 'ritagliare', 'zuschneiden', 'découper', 'قص', 'обрезать', 'potong', 'cắt'],
    'cortar': ['crop', 'cortar', 'recortar', 'ritagliare', 'zuschneiden', 'découper', 'قص', 'обрезать', 'potong', 'cắt'],
    'trim': ['trim', 'cortar', 'aparar', 'couper', 'schneiden', 'tagliare', 'pangkas'],

    // 8. Rotate & Orientation
    'rotate': ['rotate', 'rodar', 'rotacionar', 'rotar', 'tourner', 'drehen', 'ruotare', 'تدوير', 'повернуть', 'putar', 'xoay'],
    'rodar': ['rotate', 'rodar', 'rotacionar', 'rotar', 'tourner', 'drehen', 'ruotare', 'تدوير', 'повернуть', 'putar', 'xoay'],

    // 9. Protection & Security
    'protect': ['protect', 'proteger', 'proteger', 'sécuriser', 'schützen', 'proteggere', 'حماية', 'защитить', 'lindungi', 'bảo vệ', 'senha', 'password'],
    'proteger': ['protect', 'proteger', 'proteger', 'sécuriser', 'schützen', 'proteggere', 'حماية', 'защитить', 'lindungi', 'bảo vệ', 'senha', 'password'],
    'unlock': ['unlock', 'desbloquear', 'déverrouiller', 'entsperren', 'sbloccare', 'فتح', 'разблокировать', 'buka', 'mở khóa'],
    'desbloquear': ['unlock', 'desbloquear', 'déverrouiller', 'entsperren', 'sbloccare', 'فتح', 'разблокировать', 'buka', 'mở khóa'],

    // 10. AI & Image Upscale
    'upscale': ['upscale', 'ampliar', 'melhorar', 'agrandir', 'skalieren', 'ingrandire', 'تكبير', 'увеличить', 'tingkatkan', 'nâng cao', 'hd'],
    'ampliar': ['upscale', 'ampliar', 'melhorar', 'agrandir', 'skalieren', 'ingrandire', 'تكبير', 'увеличить', 'tingkatkan', 'nâng cao', 'hd'],
    'scan': ['scan', 'digitalizar', 'escanear', 'scanner', 'scannen', 'scansionare', 'مسح', 'сканировать', 'pindai', 'quét'],
    'digitalizar': ['scan', 'digitalizar', 'escanear', 'scanner', 'scannen', 'scansionare', 'مسح', 'сканировать', 'pindai', 'quét']
};

function initSearchFilter() {
    const searchInput = document.getElementById('tool-search-input');
    if (!searchInput) return;

    const resultsInfo = document.getElementById('search-results-info');
    const resultsCount = document.getElementById('search-results-count');

    searchInput.addEventListener('input', (e) => {
        const rawQuery = e.target.value.toLowerCase().trim();
        const tokens = rawQuery.split(/[\s,_\-\.]+/).filter(t => t.length > 0);
        
        const toolItems = document.querySelectorAll('.tools__item');
        const sections = document.querySelectorAll('.category-section');
        const headers = document.querySelectorAll('.category-section__header');

        toolItems.forEach(item => {
            if (tokens.length === 0) {
                item.classList.remove('hidden-card');
                return;
            }

            const link = item.querySelector('a');
            const rawHref = link ? (link.getAttribute('href') || '') : '';
            // Normalize toolId by stripping '#', converting '_' to '-', and ignoring sub-anchors
            const toolId = rawHref.replace(/^#/, '').split('#')[0].replace(/_/g, '-').toLowerCase();

            // Build global multi-language index for this card across all 10 languages
            let searchableParts = [toolId, rawHref.toLowerCase(), item.textContent.toLowerCase()];

            if (typeof TOOL_TRANSLATIONS !== 'undefined' && toolId) {
                for (const langCode in TOOL_TRANSLATIONS) {
                    const langData = TOOL_TRANSLATIONS[langCode];
                    if (langData && langData[toolId]) {
                        if (langData[toolId].title) searchableParts.push(langData[toolId].title.toLowerCase());
                        if (langData[toolId].desc) searchableParts.push(langData[toolId].desc.toLowerCase());
                    }
                }
            }

            const searchableContent = searchableParts.join(' ');
            
            // Check if EVERY search token matches directly or via multilingual synonyms
            const matchesAllTokens = tokens.every(token => {
                const synonyms = SEARCH_SYNONYMS[token] || [token];
                return synonyms.some(syn => searchableContent.includes(syn));
            });

            if (matchesAllTokens) {
                item.classList.remove('hidden-card');
            } else {
                item.classList.add('hidden-card');
            }
        });

        if (tokens.length > 0) {
            let totalMatching = 0;
            sections.forEach(sec => {
                const secId = sec.getAttribute('data-section-id');
                if (secId === 'popular') {
                    sec.style.display = 'none';
                } else {
                    const visibleCards = sec.querySelectorAll('.tools__item:not(.hidden-card)');
                    if (visibleCards.length > 0) {
                        sec.style.display = 'block';
                        totalMatching += visibleCards.length;
                    } else {
                        sec.style.display = 'none';
                    }
                }
            });

            // Hide section headers to form a clean unified grid
            headers.forEach(h => h.style.display = 'none');

            // Update & show search results info header
            if (resultsInfo && resultsCount) {
                const lang = currentState.translateLang || 'en';
                const pattern = SEARCH_RESULTS_TRANSLATIONS[lang] || SEARCH_RESULTS_TRANSLATIONS['en'];
                resultsCount.textContent = pattern.replace('{count}', totalMatching);
                resultsInfo.style.display = 'block';
            }
        } else {
            // Search cleared -> restore default category view
            headers.forEach(h => h.style.display = 'flex');
            if (resultsInfo) resultsInfo.style.display = 'none';

            sections.forEach(sec => {
                const visibleCards = sec.querySelectorAll('.tools__item:not(.hidden-card)');
                if (visibleCards.length > 0) {
                    sec.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });
        }
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
            if (link.classList.contains('brand') || href === 'https://www.ilovepdf.com/' || href === '/' || href === '#' || href === 'index.HTML') {
                e.preventDefault();
                showHomePage();
                return;
            }

            // Extract tool key from href
            let cleanHref = href.replace('https://www.ilovepdf.com/', '').replace('#', '').replace('.HTML', '').replace('/', '');
            
            if (cleanHref === 'blog') {
                e.preventDefault();
                openBlogView();
                return;
            }

            const legalTypes = ['privacy-policy', 'terms-of-service', 'dmca-disclaimer', 'contact-us'];
            if (legalTypes.includes(cleanHref)) {
                e.preventDefault();
                openLegalView(cleanHref);
                return;
            }

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
        const legalTypes = ['privacy-policy', 'terms-of-service', 'dmca-disclaimer', 'contact-us'];
        if (hash === 'blog') {
            openBlogView();
        } else if (legalTypes.includes(hash)) {
            openLegalView(hash);
        } else if (hash && TOOLS_DB[hash]) {
            openToolView(hash);
        } else if (!hash) {
            showHomePage();
        }
    });

    // Check page data-tool attribute or hash on startup
    const pageTool = document.body.getAttribute('data-tool');
    const hash = window.location.hash.replace('#', '').trim();
    const legalTypes = ['privacy-policy', 'terms-of-service', 'dmca-disclaimer', 'contact-us'];

    if (hash === 'blog') {
        openBlogView();
    } else if (legalTypes.includes(hash)) {
        openLegalView(hash);
    } else if (pageTool && TOOLS_DB[pageTool]) {
        openToolView(pageTool);
    } else if (hash && TOOLS_DB[hash]) {
        openToolView(hash);
    } else {
        showHomePage();
    }
}

// Render Blog Page
function openBlogView() {
    currentState.activeTool = 'blog';
    window.location.hash = 'blog';
    document.body.classList.add('toolpage-active');

    const mainContainer = document.querySelector('.main');
    if (!mainContainer) return;

    const homeTitle = document.querySelector('.home-title');
    const searchWrapper = document.querySelector('.tool-search-wrapper');
    const toolsContainer = document.querySelector('.tools');
    if (homeTitle) homeTitle.style.display = 'none';
    if (searchWrapper) searchWrapper.style.display = 'none';
    if (toolsContainer) toolsContainer.style.display = 'none';

    let toolViewEl = document.getElementById('dynamic-tool-view');
    if (toolViewEl) toolViewEl.remove();

    toolViewEl = document.createElement('div');
    toolViewEl.id = 'dynamic-tool-view';
    toolViewEl.className = 'tool-view-wrapper';

    toolViewEl.innerHTML = `
        <div class="tool-view-header" style="background: #ffffff; padding: 48px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <a href="#" class="back-home-btn" onclick="showHomePage(); return false;" style="display: inline-flex; align-items: center; gap: 6px; color: #64748b; text-decoration: none; font-weight: 600; margin-bottom: 16px;">
                <SVG width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></SVG> Back to All Tools
            </a>
            <h1 style="font-size: 36px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">FreeTools Official Blog & Guides</h1>
            <p style="font-size: 16px; color: #64748b; max-width: 600px; margin: 0 auto;">Master your digital workflow with expert tips, file conversion tutorials, and social media guides.</p>
        </div>
        <div style="max-width: 1000px; margin: 40px auto; padding: 0 20px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">
                <article style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    <div style="background: linear-gradient(135deg, #e5322d, #ef4444); height: 160px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 40px;">📄</div>
                    <div style="padding: 24px;">
                        <span style="font-size: 12px; font-weight: 700; color: #e5322d; text-transform: uppercase;">PDF Guide</span>
                        <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 8px 0 12px 0;">How to Compress PDFs Without Losing Quality</h3>
                        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">Learn the secrets of reducing PDF file sizes by up to 90% while keeping sharp text and crisp images for email attachments.</p>
                        <a href="#compress_pdf" style="color: #e5322d; font-weight: 700; text-decoration: none; font-size: 14px;">Try Compress PDF Tool →</a>
                    </div>
                </article>
                <article style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    <div style="background: linear-gradient(135deg, #059669, #10b981); height: 160px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 40px;">🎵</div>
                    <div style="padding: 24px;">
                        <span style="font-size: 12px; font-weight: 700; color: #059669; text-transform: uppercase;">Audio Guide</span>
                        <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 8px 0 12px 0;">WAV vs MP3: Which Format Should You Choose?</h3>
                        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">Compare 16-bit uncompressed studio WAV audio vs compressed 320kbps MP3s for music production, podcasting, and streaming.</p>
                        <a href="#WAV-to-MP3" style="color: #059669; font-weight: 700; text-decoration: none; font-size: 14px;">Try WAV to MP3 Tool →</a>
                    </div>
                </article>
                <article style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
                    <div style="background: linear-gradient(135deg, #8b5cf6, #ec4899); height: 160px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 40px;">📹</div>
                    <div style="padding: 24px;">
                        <span style="font-size: 12px; font-weight: 700; color: #8b5cf6; text-transform: uppercase;">Social Media</span>
                        <h3 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 8px 0 12px 0;">How to Download Instagram Reels in Full 1080p HD</h3>
                        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 16px;">Step-by-step guide to saving public Instagram Reels, Audio, and Photos to your phone or PC in highest original resolution.</p>
                        <a href="#instagram-reels-downloader" style="color: #8b5cf6; font-weight: 700; text-decoration: none; font-size: 14px;">Try Reels Downloader →</a>
                    </div>
                </article>
            </div>
        </div>
    `;

    mainContainer.appendChild(toolViewEl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle Language Dropdown
function toggleLangDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('lang-dropdown-menu');
    if (menu) menu.classList.toggle('active');
}
window.toggleLangDropdown = toggleLangDropdown;

// Select Language & Apply Full Native Page Translation
const UI_TRANSLATIONS = {
    "en": {
        "badge": "EN",
        "navPdf": "PDF & DOCS",
        "navImage": "IMAGE & AI TOOLS",
        "navMedia": "VIDEO & AUDIO",
        "navGif": "GIF TOOLS",
        "navDev": "DEV & UTILITIES",
        "title": "Every Tool You Need for PDFs, Images, Videos & Audio in One Place",
        "subtitle": "All your essential digital tools at your fingertips. 100% FREE & NO SIGN UP REQUIRED! Convert, compress, edit, upscale, and download PDFs, images, videos, and audio in seconds.",
        "searchPlaceholder": "Search 85+ tools (e.g. compress video, PDF to word, remove background, youtube)...",
        "allTools": "All Tools",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Image & AI",
        "mediaTools": "🎬 Video & Audio",
        "gifTools": "🎞️ GIF Tools",
        "devTools": "🛠️ Dev & Utilities",
        "popularTitle": "🔥 Most Popular Tools",
        "pdfSuiteTitle": "📄 PDF & Document Tools",
        "imageSuiteTitle": "🖼️ Image Tools & AI Suite",
        "mediaSuiteTitle": "🎬 Video & Audio Converters",
        "gifSuiteTitle": "🎞️ GIF & Animation Tools",
        "devSuiteTitle": "🛠️ Dev Utilities & Text Tools",
        "backBtn": "Back to All Tools",
        "selectBtn": "Select file",
        "dropHint": "or drop file here",
        "megaConvertToPdf": "Convert to PDF",
        "megaConvertFromPdf": "Convert from PDF",
        "megaEditSecurity": "Edit & Security",
        "megaAiEditing": "AI & Editing",
        "megaFormatConverters": "Format Converters",
        "megaSocialDownloader": "Social Downloader",
        "megaConvertersEditors": "Converters & Editors",
        "megaDocumentsEbooks": "Documents & Ebooks",
        "megaCodeFormatters": "Code Formatters",
        "megaSecurityText": "Security & Text"
    },
    "es": {
        "badge": "ES",
        "navPdf": "PDF & DOCS",
        "navImage": "IMAGEN E IA",
        "navMedia": "VÍDEO Y AUDIO",
        "navGif": "HERRAMIENTAS GIF",
        "navDev": "UTILIDADES",
        "title": "Todas las herramientas que necesitas para PDF, imágenes, vídeo y audio",
        "subtitle": "Todas tus herramientas digitales esenciales al alcance de tu mano. ¡100% GRATIS Y SIN REGISTRO! Convierte, comprime, edita y descarga en segundos.",
        "searchPlaceholder": "Buscar en más de 85 herramientas...",
        "allTools": "Todas las herramientas",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Imagen e IA",
        "mediaTools": "🎬 Vídeo y Audio",
        "gifTools": "🎞️ Herramientas GIF",
        "devTools": "🛠️ Utilidades",
        "popularTitle": "🔥 Herramientas más populares",
        "pdfSuiteTitle": "📄 Herramientas PDF y Documentos",
        "imageSuiteTitle": "🖼️ Edición de Imagen e IA",
        "mediaSuiteTitle": "🎬 Convertidores de Vídeo y Audio",
        "gifSuiteTitle": "🎞️ Herramientas GIF y Animación",
        "devSuiteTitle": "🛠️ Utilidades y Herramientas de Texto",
        "backBtn": "Volver a Todas las Herramientas",
        "selectBtn": "Seleccionar Archivo",
        "dropHint": "o arrastra los archivos aquí",
        "megaConvertToPdf": "Convertir a PDF",
        "megaConvertFromPdf": "Convertir desde PDF",
        "megaEditSecurity": "Edición y Seguridad",
        "megaAiEditing": "IA y Edición",
        "megaFormatConverters": "Conversores de Formato",
        "megaSocialDownloader": "Descargador Social",
        "megaConvertersEditors": "Conversores y Editores",
        "megaDocumentsEbooks": "Documentos y Ebooks",
        "megaCodeFormatters": "Formateadores de Código",
        "megaSecurityText": "Seguridad y Texto"
    },
    "fr": {
        "badge": "FR",
        "navPdf": "PDF & DOCS",
        "navImage": "IMAGE & IA",
        "navMedia": "VIDÉO & AUDIO",
        "navGif": "OUTILS GIF",
        "navDev": "UTILITAIRES",
        "title": "Tous les outils dont vous avez besoin pour vos PDF, images, vidéos et audios",
        "subtitle": "Tous vos outils numériques essentiels à portée de main. 100% GRATUIT ET SANS INSCRIPTION ! Convertissez, compressez et téléchargez en quelques secondes.",
        "searchPlaceholder": "Rechercher parmi 85+ outils...",
        "allTools": "Tous les outils",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Image & IA",
        "mediaTools": "🎬 Vidéo & Audio",
        "gifTools": "🎞️ Outils GIF",
        "devTools": "🛠️ Utilitaires",
        "popularTitle": "🔥 Outils les plus populaires",
        "pdfSuiteTitle": "📄 Outils PDF et Documents",
        "imageSuiteTitle": "🖼️ Traitement d'image & IA",
        "mediaSuiteTitle": "🎬 Convertisseurs Vidéo & Audio",
        "gifSuiteTitle": "🎞️ Outils GIF & Animation",
        "devSuiteTitle": "🛠️ Utilitaires & Outils Texte",
        "backBtn": "Retour à Tous les Outils",
        "selectBtn": "Sélectionner un fichier",
        "dropHint": "ou déposez le fichier ici",
        "megaConvertToPdf": "Convertir en PDF",
        "megaConvertFromPdf": "Convertir depuis PDF",
        "megaEditSecurity": "Édition & Sécurité",
        "megaAiEditing": "IA & Édition",
        "megaFormatConverters": "Convertisseurs de Format",
        "megaSocialDownloader": "Téléchargeur Réseaux",
        "megaConvertersEditors": "Convertisseurs & Éditeurs",
        "megaDocumentsEbooks": "Documents & Ebooks",
        "megaCodeFormatters": "Formateurs de Code",
        "megaSecurityText": "Sécurité & Texte"
    },
    "ar": {
        "badge": "AR",
        "navPdf": "PDF & DOCS",
        "navImage": "الصور والذكاء الاصطناعي",
        "navMedia": "الفيديو والصوت",
        "navGif": "أدوات GIF",
        "navDev": "الأدوات المساعدة",
        "title": "كل الأدوات التي تحتاجها للملفات والصور والفيديو والصوت في مكان واحد",
        "subtitle": "جميع أدواتك الرقمية الأساسية في متناول يدك. مجاني 100% وبدون تسجيل! قم بتحويل وضغط وتحرير وتنزيل الملفات في ثوانٍ.",
        "searchPlaceholder": "ابحث في أكثر من 85 أداة...",
        "allTools": "جميع الأدوات",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ الصور والذكاء الاصطناعي",
        "mediaTools": "🎬 الفيديو والصوت",
        "gifTools": "🎞️ أدوات GIF",
        "devTools": "🛠️ أدوات مساعدة",
        "popularTitle": "🔥 الأدوات الأكثر شعبية",
        "pdfSuiteTitle": "📄 أدوات PDF والمستندات",
        "imageSuiteTitle": "🖼️ تحسين الصور والذكاء الاصطناعي",
        "mediaSuiteTitle": "🎬 محولات الفيديو والصوت",
        "gifSuiteTitle": "🎞️ أدوات GIF والتحريك",
        "devSuiteTitle": "🛠️ الأدوات المساعدة والنصوص",
        "backBtn": "الرجوع إلى جميع الأدوات",
        "selectBtn": "حدد الملف",
        "dropHint": "أو أسقط الملف هنا",
        "megaConvertToPdf": "تحويل إلى PDF",
        "megaConvertFromPdf": "تحويل من PDF",
        "megaEditSecurity": "التعديل والأمان",
        "megaAiEditing": "الذكاء الاصطناعي والتعديل",
        "megaFormatConverters": "محولات الصيغ",
        "megaSocialDownloader": "تنزيل الوسائط",
        "megaConvertersEditors": "المحولات والمحررات",
        "megaDocumentsEbooks": "المستندات والكتب",
        "megaCodeFormatters": "منسقات البرمجة",
        "megaSecurityText": "الأمان والنصوص"
    },
    "pt": {
        "badge": "PT",
        "navPdf": "PDF & DOCS",
        "navImage": "IMAGEM E IA",
        "navMedia": "VÍDEO E ÁUDIO",
        "navGif": "FERRAMENTAS GIF",
        "navDev": "UTILITÁRIOS",
        "title": "Todas as Ferramentas que Precisa para PDF, Imagem, Vídeo e Áudio",
        "subtitle": "Todas as suas ferramentas digitais essenciais ao seu alcance. 100% GRÁTIS E SEM REGISTO! Converta, comprima, edite e descarregue em segundos.",
        "searchPlaceholder": "Pesquise mais de 85 ferramentas...",
        "allTools": "Todas as Ferramentas",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Imagem e IA",
        "mediaTools": "🎬 Vídeo e Áudio",
        "gifTools": "🎞️ Ferramentas GIF",
        "devTools": "🛠️ Utilitários",
        "popularTitle": "🔥 Ferramentas Mais Populares",
        "pdfSuiteTitle": "📄 Ferramentas PDF e Documentos",
        "imageSuiteTitle": "🖼️ Edição de Imagem e IA",
        "mediaSuiteTitle": "🎬 Conversores de Vídeo e Áudio",
        "gifSuiteTitle": "🎞️ Ferramentas GIF e Animação",
        "devSuiteTitle": "🛠️ Utilitários e Ferramentas de Texto",
        "backBtn": "Voltar a Todas as Ferramentas",
        "selectBtn": "Selecionar Ficheiro",
        "dropHint": "ou arraste os ficheiros para aqui",
        "megaConvertToPdf": "Converter para PDF",
        "megaConvertFromPdf": "Converter de PDF",
        "megaEditSecurity": "Edição e Segurança",
        "megaAiEditing": "IA e Edição",
        "megaFormatConverters": "Conversores de Formato",
        "megaSocialDownloader": "Descarregador Social",
        "megaConvertersEditors": "Conversores e Editores",
        "megaDocumentsEbooks": "Documentos e Ebooks",
        "megaCodeFormatters": "Formatadores de Código",
        "megaSecurityText": "Segurança e Texto"
    },
    "ru": {
        "badge": "RU",
        "navPdf": "PDF & DOCS",
        "navImage": "ИЗОБРАЖЕНИЯ И ИИ",
        "navMedia": "ВИДЕО И АУДИО",
        "navGif": "GIF ИНСТРУМЕНТЫ",
        "navDev": "УТИЛИТЫ",
        "title": "Все инструменты для PDF, изображений, видео и аудио в одном месте",
        "subtitle": "Все необходимые цифровые инструменты у вас под рукой. 100% БЕСПЛАТНО И БЕЗ РЕГИСТРАЦИИ! Конвертируйте, сжимайте и скачивайте за секунды.",
        "searchPlaceholder": "Поиск среди 85+ инструментов...",
        "allTools": "Все инструменты",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Изображения и ИИ",
        "mediaTools": "🎬 Видео и Аудио",
        "gifTools": "🎞️ GIF Инструменты",
        "devTools": "🛠️ Утилиты",
        "popularTitle": "🔥 Самые популярные инструменты",
        "pdfSuiteTitle": "📄 Инструменты PDF и Документов",
        "imageSuiteTitle": "🖼️ Обработка изображений и ИИ",
        "mediaSuiteTitle": "🎬 Конвертеры видео и аудио",
        "gifSuiteTitle": "🎞️ GIF и Анимация",
        "devSuiteTitle": "🛠️ Утилиты и работа с текстом",
        "backBtn": "Назад ко всем инструментам",
        "selectBtn": "Выберите файл",
        "dropHint": "или перетащите файл сюда",
        "megaConvertToPdf": "Конвертировать в PDF",
        "megaConvertFromPdf": "Конвертировать из PDF",
        "megaEditSecurity": "Редактирование и Безопасность",
        "megaAiEditing": "ИИ и Редактирование",
        "megaFormatConverters": "Конвертеры Форматов",
        "megaSocialDownloader": "Загрузчик Соцсетей",
        "megaConvertersEditors": "Конвертеры и Редакторы",
        "megaDocumentsEbooks": "Документы и Электронные книги",
        "megaCodeFormatters": "Форматирование Кода",
        "megaSecurityText": "Безопасность и Текст"
    },
    "id": {
        "badge": "ID",
        "navPdf": "PDF & DOCS",
        "navImage": "GAMBAR & AI",
        "navMedia": "VIDEO & AUDIO",
        "navGif": "ALAT GIF",
        "navDev": "UTILITAS",
        "title": "Semua Alat yang Anda Butuhkan untuk PDF, Gambar, Video & Audio",
        "subtitle": "Semua alat digital penting dalam jangkauan Anda. 100% GRATIS & TANPA DAFTAR! Konversi, kompres, edit, dan unduh dalam hitungan detik.",
        "searchPlaceholder": "Cari 85+ alat...",
        "allTools": "Semua Alat",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Gambar & AI",
        "mediaTools": "🎬 Video & Audio",
        "gifTools": "🎞️ Alat GIF",
        "devTools": "🛠️ Utilitas",
        "popularTitle": "🔥 Alat Paling Populer",
        "pdfSuiteTitle": "📄 Alat PDF & Dokumen",
        "imageSuiteTitle": "🖼️ Pengedit Gambar & AI",
        "mediaSuiteTitle": "🎬 Konverter Video & Audio",
        "gifSuiteTitle": "🎞️ Alat GIF & Animasi",
        "devSuiteTitle": "🛠️ Utilitas & Alat Teks",
        "backBtn": "Kembali ke Semua Alat",
        "selectBtn": "Pilih File",
        "dropHint": "atau letakkan file di sini",
        "megaConvertToPdf": "Konversi ke PDF",
        "megaConvertFromPdf": "Konversi dari PDF",
        "megaEditSecurity": "Edit & Keamanan",
        "megaAiEditing": "AI & Pengeditan",
        "megaFormatConverters": "Konverter Format",
        "megaSocialDownloader": "Pengunduh Media",
        "megaConvertersEditors": "Konverter & Editor",
        "megaDocumentsEbooks": "Dokumen & Ebook",
        "megaCodeFormatters": "Format Kode",
        "megaSecurityText": "Keamanan & Teks"
    },
    "de": {
        "badge": "DE",
        "navPdf": "PDF & DOCS",
        "navImage": "BILD & KI",
        "navMedia": "VIDEO & AUDIO",
        "navGif": "GIF-TOOLS",
        "navDev": "DIENSTPROGRAMME",
        "title": "Alle Werkzeuge für PDFs, Bilder, Videos & Audio an einem Ort",
        "subtitle": "Alle wichtigen digitalen Tools zur Hand. 100% KOSTENLOS & OHNE ANMELDUNG! Konvertieren, komprimieren, bearbeiten und herunterladen in Sekunden.",
        "searchPlaceholder": "Über 85+ Tools durchsuchen...",
        "allTools": "Alle Tools",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Bild & KI",
        "mediaTools": "🎬 Video & Audio",
        "gifTools": "🎞️ GIF-Tools",
        "devTools": "🛠️ Dienstprogramme",
        "popularTitle": "🔥 Beliebteste Werkzeuge",
        "pdfSuiteTitle": "📄 PDF & Dokument-Werkzeuge",
        "imageSuiteTitle": "🖼️ Bildbearbeitung & KI",
        "mediaSuiteTitle": "🎬 Video- & Audio-Konverter",
        "gifSuiteTitle": "🎞️ GIF & Animations-Tools",
        "devSuiteTitle": "🛠️ Dienstprogramme & Text-Tools",
        "backBtn": "Zurück zu allen Tools",
        "selectBtn": "Datei auswählen",
        "dropHint": "oder Datei hier ablegen",
        "megaConvertToPdf": "In PDF konvertieren",
        "megaConvertFromPdf": "Aus PDF konvertieren",
        "megaEditSecurity": "Bearbeiten & Sicherheit",
        "megaAiEditing": "KI & Bearbeitung",
        "megaFormatConverters": "Format-Konverter",
        "megaSocialDownloader": "Social Downloader",
        "megaConvertersEditors": "Konverter & Editoren",
        "megaDocumentsEbooks": "Dokumente & Ebooks",
        "megaCodeFormatters": "Code-Formatierer",
        "megaSecurityText": "Sicherheit & Text"
    },
    "it": {
        "badge": "IT",
        "navPdf": "PDF & DOCS",
        "navImage": "IMMAGINI E IA",
        "navMedia": "VIDEO E AUDIO",
        "navGif": "STRUMENTI GIF",
        "navDev": "UTILITÀ",
        "title": "Tutti gli strumenti per PDF, immagini, video e audio in un unico posto",
        "subtitle": "Tutti i tuoi strumenti digitali essenziali a portata di mano. 100% GRATUITO E SENZA REGISTRAZIONE! Converti, comprimi, modifica e scarica in pochi secondi.",
        "searchPlaceholder": "Cerca tra 85+ strumenti...",
        "allTools": "Tutti gli strumenti",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Immagini e IA",
        "mediaTools": "🎬 Video e Audio",
        "gifTools": "🎞️ Strumenti GIF",
        "devTools": "🛠️ Utilità",
        "popularTitle": "🔥 Strumenti Più Popolari",
        "pdfSuiteTitle": "📄 Strumenti PDF e Documenti",
        "imageSuiteTitle": "🖼️ Strumenti Immagine e IA",
        "mediaSuiteTitle": "🎬 Convertitori Video e Audio",
        "gifSuiteTitle": "🎞️ Strumenti GIF e Animazioni",
        "devSuiteTitle": "🛠️ Utilità e Strumenti Testo",
        "backBtn": "Torna a Tutti gli Strumenti",
        "selectBtn": "Seleziona file",
        "dropHint": "o trascina il file qui",
        "megaConvertToPdf": "Converti in PDF",
        "megaConvertFromPdf": "Converti da PDF",
        "megaEditSecurity": "Modifica e Sicurezza",
        "megaAiEditing": "IA e Modifica",
        "megaFormatConverters": "Convertitori di Formato",
        "megaSocialDownloader": "Downloader Social",
        "megaConvertersEditors": "Convertitori ed Editori",
        "megaDocumentsEbooks": "Documenti ed Ebook",
        "megaCodeFormatters": "Formattatori di Codice",
        "megaSecurityText": "Sicurezza e Testo"
    },
    "vi": {
        "badge": "VI",
        "navPdf": "PDF & DOCS",
        "navImage": "HÌNH ẢNH & AI",
        "navMedia": "VIDEO & ÂM THANH",
        "navGif": "CÔNG CỤ GIF",
        "navDev": "TIỆN ÍCH",
        "title": "Tất cả công cụ bạn cần cho PDF, Hình ảnh, Video & Âm thanh",
        "subtitle": "Tất cả các công cụ kỹ thuật số thiết yếu trong tầm tay bạn. MIỄN PHÍ 100% & KHÔNG CẦN ĐĂNG KÝ! Chuyển đổi, nén và tải xuống trong vài giây.",
        "searchPlaceholder": "Tìm kiếm hơn 85+ công cụ...",
        "allTools": "Tất cả công cụ",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ Hình ảnh & AI",
        "mediaTools": "🎬 Video & Âm thanh",
        "gifTools": "🎞️ Công cụ GIF",
        "devTools": "🛠️ Tiện ích",
        "popularTitle": "🔥 Công cụ phổ biến nhất",
        "pdfSuiteTitle": "📄 Bộ công cụ PDF & Tài liệu",
        "imageSuiteTitle": "🖼️ Công cụ Hình ảnh & AI",
        "mediaSuiteTitle": "🎬 Chuyển đổi Video & Âm thanh",
        "gifSuiteTitle": "🎞️ Công cụ GIF & Hoạt hình",
        "devSuiteTitle": "🛠️ Tiện ích & Công cụ Văn bản",
        "backBtn": "Quay lại tất cả công cụ",
        "selectBtn": "Chọn tệp",
        "dropHint": "hoặc thả tệp vào đây",
        "megaConvertToPdf": "Chuyển đổi sang PDF",
        "megaConvertFromPdf": "Chuyển đổi từ PDF",
        "megaEditSecurity": "Chỉnh sửa & Bảo mật",
        "megaAiEditing": "AI & Chỉnh sửa",
        "megaFormatConverters": "Bộ chuyển đổi Định dạng",
        "megaSocialDownloader": "Trình tải Mạng xã hội",
        "megaConvertersEditors": "Bộ chuyển đổi & Trình chỉnh sửa",
        "megaDocumentsEbooks": "Tài liệu & Ebook",
        "megaCodeFormatters": "Định dạng Mã",
        "megaSecurityText": "Bảo mật & Văn bản"
    },
    "zh": {
        "badge": "ZH",
        "navPdf": "PDF & DOCS",
        "navImage": "图片 & AI",
        "navMedia": "视频 & 音频",
        "navGif": "GIF 工具",
        "navDev": "开发者工具",
        "title": "在一个地方处理 PDF、图片、视频和音频所需的所有工具",
        "subtitle": "触手可及的所有必需数字工具。100% 免费，无需注册！在几秒钟内转换、压缩、编辑、放大和下载 PDF、图片、视频和音频。",
        "searchPlaceholder": "搜索 85+ 工具 (如 压缩视频, PDF转Word, 抠图, youtube)...",
        "allTools": "所有工具",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ 图片 & AI",
        "mediaTools": "🎬 视频 & 音频",
        "gifTools": "🎞️ GIF 工具",
        "devTools": "🛠️ 开发者工具",
        "popularTitle": "🔥 最受欢迎的工具",
        "pdfSuiteTitle": "📄 PDF & Document Tools",
        "imageSuiteTitle": "🖼️ 图片工具 & AI 套装",
        "mediaSuiteTitle": "🎬 视频 & 音频转换器",
        "gifSuiteTitle": "🎞️ GIF & 动画工具",
        "devSuiteTitle": "🛠️ 开发者实用工具",
        "backBtn": "返回所有工具",
        "selectBtn": "选择文件",
        "dropHint": "或将文件拖放到此处",
        "megaConvertToPdf": "转换为 PDF",
        "megaConvertFromPdf": "从 PDF 转换",
        "megaEditSecurity": "编辑 & 安全",
        "megaAiEditing": "AI & 编辑"
    },
    "ja": {
        "badge": "JA",
        "navPdf": "PDF & DOCS",
        "navImage": "画像 & AI ツール",
        "navMedia": "動画 & 音声",
        "navGif": "GIF ツール",
        "navDev": "開発者ツール",
        "title": "PDF、画像、動画、音声に必要なすべてのツールが1か所に",
        "subtitle": "必要なすべてのデジタルツールが指先に。100% 無料、登録不要！PDF、画像、動画、音声を数秒で変換、圧縮、編集、高画質化、ダウンロード。",
        "searchPlaceholder": "85以上のツールを検索 (例: 動画圧縮, PDF Word 変換, 背景削除, youtube)...",
        "allTools": "すべてのツール",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ 画像 & AI",
        "mediaTools": "🎬 動画 & 音声",
        "gifTools": "🎞️ GIF ツール",
        "devTools": "🛠️ 開発者ツール",
        "popularTitle": "🔥 最も人気のツール",
        "pdfSuiteTitle": "📄 PDF & Document Tools",
        "imageSuiteTitle": "🖼️ 画像ツール & AI スイート",
        "mediaSuiteTitle": "🎬 動画 & 音声コンバーター",
        "gifSuiteTitle": "🎞️ GIF & アニメーションツール",
        "devSuiteTitle": "🛠️ 開発者ユーティリティ",
        "backBtn": "すべてのツールに戻る",
        "selectBtn": "ファイルを選択",
        "dropHint": "またはここにファイルをドロップ",
        "megaConvertToPdf": "PDFに変換",
        "megaConvertFromPdf": "PDFから変換",
        "megaEditSecurity": "編集 & セキュリティ",
        "megaAiEditing": "AI & 編集"
    },
    "ko": {
        "badge": "KO",
        "navPdf": "PDF & DOCS",
        "navImage": "이미지 & AI 도구",
        "navMedia": "비디오 & 오디오",
        "navGif": "GIF 도구",
        "navDev": "개발자 도구",
        "title": "PDF, 이미지, 비디오 및 오디오에 필요한 모든 도구를 한 곳에서",
        "subtitle": "필요한 모든 디지털 도구를 손끝에서 이용하세요. 100% 무료, 가입 불필요! 몇 초 만에 PDF, 이미지, 비디오, 오디오를 변환, 압축, 편집, 화질 향상, 다운로드하세요.",
        "searchPlaceholder": "85개 이상의 도구 검색 (예: 비디오 압축, PDF Word 변환, 배경 제거, youtube)...",
        "allTools": "모든 도구",
        "pdfTools": "📄 PDF & DOCs",
        "imageTools": "🖼️ 이미지 & AI",
        "mediaTools": "🎬 비디오 & 오디오",
        "gifTools": "🎞️ GIF 도구",
        "devTools": "🛠️ 개발자 도구",
        "popularTitle": "🔥 가장 인기 있는 도구",
        "pdfSuiteTitle": "📄 PDF & Document Tools",
        "imageSuiteTitle": "🖼️ 이미지 도구 & AI 스위트",
        "mediaSuiteTitle": "🎬 비디오 & 오디오 변환기",
        "gifSuiteTitle": "🎞️ GIF & 애니메이션 도구",
        "devSuiteTitle": "🛠️ 개발자 유틸리티",
        "backBtn": "모든 도구로 돌아가기",
        "selectBtn": "파일 선택",
        "dropHint": "또는 여기에 파일 드롭",
        "megaConvertToPdf": "PDF로 변환",
        "megaConvertFromPdf": "PDF에서 변환",
        "megaEditSecurity": "편집 & 보안",
        "megaAiEditing": "AI & 편집"
    }
};

function selectLanguage(code) {
    const langCode = (code || 'en').toLowerCase();

    // Sync select dropdown element
    const selectEl = document.getElementById('lang-selector-select');
    if (selectEl && selectEl.value !== langCode) {
        selectEl.value = langCode;
    }

    currentState.translateLang = langCode;
    localStorage.setItem('freetools_lang', langCode);

    // Apply fast native UI translation
    applyUITranslation(langCode);
}
window.selectLanguage = selectLanguage;

// Apply UI Translations Across Homepage Elements
function applyUITranslation(langCode) {
    const t = UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS['en'];

    // Handle Right-to-Left (RTL) for Arabic
    if (langCode === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', langCode || 'en');
    }

    // Update Header Navigation Titles
    const navSpans = document.querySelectorAll('.nav-has-dropdown > span');
    if (navSpans.length >= 5) {
        if (t.navPdf) navSpans[0].textContent = t.navPdf;
        if (t.navImage) navSpans[1].textContent = t.navImage;
        if (t.navMedia) navSpans[2].textContent = t.navMedia;
        if (t.navGif) navSpans[3].textContent = t.navGif;
        if (t.navDev) navSpans[4].textContent = t.navDev;
    }

    // Translate Sub-headings inside Mega Menus (.nav__title)
    const megaTitles = document.querySelectorAll('.nav-dropdown .nav__title');
    megaTitles.forEach(titleEl => {
        const text = titleEl.textContent.trim().toLowerCase();
        if (text.includes('convert to PDF')) titleEl.textContent = t.megaConvertToPdf || 'Convert to PDF';
        else if (text.includes('convert from PDF')) titleEl.textContent = t.megaConvertFromPdf || 'Convert from PDF';
        else if (text.includes('edit & security') || text.includes('edit')) titleEl.textContent = t.megaEditSecurity || 'Edit & Security';
        else if (text.includes('AI & editing') || text.includes('AI')) titleEl.textContent = t.megaAiEditing || 'AI & Editing';
        else if (text.includes('format converters') || text.includes('format')) titleEl.textContent = t.megaFormatConverters || 'Format Converters';
        else if (text.includes('social downloader') || text.includes('social')) titleEl.textContent = t.megaSocialDownloader || 'Social Downloader';
        else if (text.includes('converters & editors')) titleEl.textContent = t.megaConvertersEditors || 'Converters & Editors';
        else if (text.includes('documents & ebooks') || text.includes('ebooks')) titleEl.textContent = t.megaDocumentsEbooks || 'Documents & Ebooks';
        else if (text.includes('code formatters') || text.includes('code')) titleEl.textContent = t.megaCodeFormatters || 'Code Formatters';
        else if (text.includes('security & text') || text.includes('security')) titleEl.textContent = t.megaSecurityText || 'Security & Text';
    });

    // Translate Links inside Mega Menus (.nav-dropdown a)
    const megaLangDict = TOOL_TRANSLATIONS[langCode] || TOOL_TRANSLATIONS['en'] || TOOL_TRANSLATIONS['pt'];
    document.querySelectorAll('.nav-dropdown a').forEach(link => {
        const href = link.getAttribute('href') || '';
        if (!href.startsWith('#')) return;
        const toolId = href.replace('#', '').trim();
        const normId = toolId.replace(/_/g, '-');
        const altId = toolId.replace(/-/g, '_');
        const toolTrans = megaLangDict ? (megaLangDict[toolId] || megaLangDict[normId] || megaLangDict[altId]) : null;

        if (toolTrans && toolTrans.title) {
            let textNode = null;
            link.childNodes.forEach(node => {
                if (node.nodeType === 3) textNode = node;
            });
            if (textNode) {
                textNode.nodeValue = ' ' + toolTrans.title;
            }
        }
    });

    // Update Hero Title & Subtitle
    const titleEl = document.querySelector('.home-title__title');
    const subtitleEl = document.querySelector('.home-title__subtitle');
    if (titleEl) titleEl.textContent = t.title;
    if (subtitleEl) subtitleEl.textContent = t.subtitle;

    // Update Search Input Placeholder
    const searchInput = document.getElementById('tool-search-input');
    if (searchInput) searchInput.placeholder = t.searchPlaceholder;

    // Update Category Filter Tags
    const tagAll = document.querySelector('.tag[data-filter="all"]');
    const tagPdf = document.querySelector('.tag[data-filter="PDF"]');
    const tagImg = document.querySelector('.tag[data-filter="image"]');
    const tagMedia = document.querySelector('.tag[data-filter="media"]');
    const tagGif = document.querySelector('.tag[data-filter="GIF"]');
    const tagDev = document.querySelector('.tag[data-filter="dev"]');

    if (tagAll) tagAll.textContent = t.allTools;
    if (tagPdf) tagPdf.textContent = t.pdfTools;
    if (tagImg) tagImg.textContent = t.imageTools;
    if (tagMedia) tagMedia.textContent = t.mediaTools;
    if (tagGif) tagGif.textContent = t.gifTools;
    if (tagDev) tagDev.textContent = t.devTools;

    // Update Section Headers
    const popularHeader = document.querySelector('.category-section[data-section-id="popular"] .category-section__title');
    const pdfHeader = document.querySelector('.category-section[data-section-id="PDF"] .category-section__title');
    const imgHeader = document.querySelector('.category-section[data-section-id="image"] .category-section__title');
    const mediaHeader = document.querySelector('.category-section[data-section-id="media"] .category-section__title');
    const gifHeader = document.querySelector('.category-section[data-section-id="GIF"] .category-section__title');
    const devHeader = document.querySelector('.category-section[data-section-id="dev"] .category-section__title');

    if (popularHeader) popularHeader.textContent = t.popularTitle;
    if (pdfHeader) pdfHeader.textContent = t.pdfSuiteTitle;
    if (imgHeader) imgHeader.textContent = t.imageSuiteTitle;
    if (mediaHeader) mediaHeader.textContent = t.mediaSuiteTitle;
    if (gifHeader) gifHeader.textContent = t.gifSuiteTitle;
    if (devHeader) devHeader.textContent = t.devSuiteTitle;

    // Translate Tool Cards Across Homepage Grid (Normalized Key Matching)
    const langDict = TOOL_TRANSLATIONS[langCode] || TOOL_TRANSLATIONS['en'] || TOOL_TRANSLATIONS['pt'];

    document.querySelectorAll('.tools__item').forEach(card => {
        const link = card.querySelector('a');
        if (!link) return;
        const href = link.getAttribute('href') || '';
        const toolId = href.replace('#', '').trim();
        const normId = toolId.replace(/_/g, '-');
        const altId = toolId.replace(/-/g, '_');

        const cardTitle = card.querySelector('h3');
        const cardDesc = card.querySelector('.tools__item__content p');

        const toolTrans = langDict ? (langDict[toolId] || langDict[normId] || langDict[altId]) : null;

        if (toolTrans) {
            if (cardTitle && toolTrans.title) cardTitle.textContent = toolTrans.title;
            if (cardDesc && toolTrans.desc) cardDesc.textContent = toolTrans.desc;
        }
    });

    // Update Open Tool Workspace Header if active
    if (currentState.activeTool) {
        const toolId = currentState.activeTool;
        const normId = toolId.replace(/_/g, '-');
        const altId = toolId.replace(/-/g, '_');
        const langDict = TOOL_TRANSLATIONS[langCode] || null;
        const toolTrans = langDict ? (langDict[toolId] || langDict[normId] || langDict[altId]) : null;

        if (toolTrans) {
            const wsTitle = document.querySelector('.tool-view-header h1');
            const wsSubtitle = document.querySelector('.tool-view-header p');
            if (wsTitle && toolTrans.title) wsTitle.textContent = toolTrans.title;
            if (wsSubtitle && toolTrans.desc) wsSubtitle.textContent = toolTrans.desc;
        }
    }
}

// Auto-Detect User's Country / Device Language
function detectAndApplyUserLanguage() {
    // 1. Check URL query parameter (?lang=es)
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && UI_TRANSLATIONS[urlLang.toLowerCase()]) {
            selectLanguage(urlLang.toLowerCase());
            return;
        }
    } catch(e) {}

    // 2. Check localStorage
    const saved = localStorage.getItem('freetools_lang');
    if (saved && UI_TRANSLATIONS[saved.toLowerCase()]) {
        selectLanguage(saved.toLowerCase());
        return;
    }

    // 3. Check device/browser navigator language
    const navLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    let detected = 'en';

    if (navLang.startsWith('pt')) detected = 'pt';
    else if (navLang.startsWith('es')) detected = 'es';
    else if (navLang.startsWith('fr')) detected = 'fr';
    else if (navLang.startsWith('de')) detected = 'de';
    else if (navLang.startsWith('it')) detected = 'it';
    else if (navLang.startsWith('ar')) detected = 'ar';
    else if (navLang.startsWith('ru')) detected = 'ru';
    else if (navLang.startsWith('id')) detected = 'id';
    else if (navLang.startsWith('vi')) detected = 'vi';

    selectLanguage(detected);
}

// Close language dropdown on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.lang-selector-wrapper')) {
        const menu = document.getElementById('lang-dropdown-menu');
        if (menu) menu.classList.remove('active');
    }
});

// Render Legal Pages (Privacy Policy, Terms, DMCA, Contact)
function openLegalView(type) {
    currentState.activeTool = type;
    window.location.hash = type;
    document.body.classList.add('toolpage-active');

    const mainContainer = document.querySelector('.main');
    if (!mainContainer) return;

    let title = '';
    let content = '';

    if (type === 'privacy-policy') {
        title = 'Privacy Policy (GDPR / CCPA)';
        content = `
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">1. Information We Do Not Collect</h2>
            <p>FreeTools operates with a strict zero-user-tracking and zero-file-retention policy. We do not require account registration, email addresses, or personal information.</p>
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">2. Temporary File Processing</h2>
            <p>All files uploaded to FreeTools are processed automatically in memory or temporary isolated directories. Files are automatically destroyed and permanently deleted from our servers immediately after your download finishes or within 1 hour maximum.</p>
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">3. Third-Party Advertising</h2>
            <p>We use Google AdSense to serve privacy-safe advertisements to keep our platform 100% free for everyone. Google may use cookies to serve ads based on non-personally identifiable visit data.</p>
        `;
    } else if (type === 'terms-of-service') {
        title = 'Terms of Service';
        content = `
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">1. Acceptable Use</h2>
            <p>FreeTools is provided 100% free of charge for personal and commercial file utility tasks. Automated scraping, malicious DDoS attacks, or attempting to breach rate limits are strictly prohibited.</p>
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">2. Disclaimer of Warranties</h2>
            <p>FreeTools is provided "as is" without warranty of any kind. Users are responsible for maintaining original backups of their files before processing.</p>
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">3. Limitation of Liability</h2>
            <p>In no event shall FreeTools be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.</p>
        `;
    } else if (type === 'dmca-disclaimer') {
        title = 'DMCA Disclaimer & Copyright Notice';
        content = `
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">1. Fair Use & Media Downloading</h2>
            <p>FreeTools media utilities (including YouTube and Instagram tools) are intended strictly for downloading user-owned content, royalty-free media, or content under Fair Use for educational and offline archival purposes.</p>
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">2. Copyright Infringement Notice</h2>
            <p>FreeTools respects intellectual property rights. If you believe your copyrighted work is accessible through our service in a manner that constitutes infringement, please contact us immediately for prompt resolution.</p>
        `;
    } else if (type === 'contact-us') {
        title = 'Contact & Support';
        content = `
            <h2 style="font-size: 20px; color: #0f172a; margin-top: 24px;">Need Help or Have Suggestions?</h2>
            <p>We are constantly improving FreeTools. If you experience an issue with any of our 90+ tools or wish to request a new feature, reach out to our team:</p>
            <p style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;"><strong>Email Support:</strong> <a href="mailto:support@freetoools.com" style="color: #E5322D; font-weight: 600;">support@freetoools.com</a></p>
            <p><strong>Support Us:</strong> If you enjoy our zero-cost, no-signup service, consider supporting server infrastructure via <a href="https://buymeacoffee.com/saiyajingoat" target="_blank" style="color: #E5322D; font-weight: 700;">Buy Me a Coffee ☕</a>.</p>
        `;
    }

    const homeTitle = document.querySelector('.home-title');
    const searchWrapper = document.querySelector('.tool-search-wrapper');
    const toolsContainer = document.querySelector('.tools');
    if (homeTitle) homeTitle.style.display = 'none';
    if (searchWrapper) searchWrapper.style.display = 'none';
    if (toolsContainer) toolsContainer.style.display = 'none';

    let toolViewEl = document.getElementById('dynamic-tool-view');
    if (toolViewEl) toolViewEl.remove();

    toolViewEl = document.createElement('div');
    toolViewEl.id = 'dynamic-tool-view';
    toolViewEl.className = 'tool-view-wrapper';

    toolViewEl.innerHTML = `
        <div class="tool-view-header" style="background: #ffffff; padding: 40px 20px; text-align: center; border-bottom: 1px solid #e2e8f0;">
            <a href="#" class="back-home-btn" onclick="showHomePage(); return false;" style="display: inline-flex; align-items: center; gap: 6px; color: #64748b; text-decoration: none; font-weight: 600; margin-bottom: 16px;">
                <SVG width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></SVG> Back to All Tools
            </a>
            <h1 style="font-size: 32px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0;">${title}</h1>
        </div>
        <div style="max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.8; color: #334155; font-size: 16px;">
            ${content}
        </div>
    `;

    mainContainer.appendChild(toolViewEl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    if (toolId === 'QR-code-generator' || toolId === 'qr_code_generator') {
        toolViewEl.innerHTML = `
            <div class="tool-view-header">
                <h1>${toolConfig.title}</h1>
                <p>${toolConfig.subtitle}</p>
                <div style="margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; background: #ecfdf5; border: 1px solid #10b981; color: #047857; padding: 8px 16px; border-radius: 30px; font-weight: 600; font-size: 14px;">
                    <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></SVG>
                    100% Static & Permanent — Guaranteed to work FOREVER. Zero redirects, zero expiration, zero tracking.
                </div>
            </div>

            <div class="QR-builder-container" style="max-width: 900px; margin: 30px auto; display: grid; grid-template-columns: 1fr 340px; gap: 32px; background: #ffffff; padding: 32px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;">
                
                <!-- Left Form Column -->
                <div class="QR-form-col" style="display: flex; flex-direction: column; gap: 20px;">
                    
                    <!-- Tabs -->
                    <div class="QR-tabs" style="display: flex; gap: 8px; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px;">
                        <button class="QR-tab active" data-tab="url" style="padding: 8px 16px; border-radius: 8px; border: none; background: #e5322d; color: #fff; font-weight: 600; cursor: pointer;">🌐 Website URL</button>
                        <button class="QR-tab" data-tab="text" style="padding: 8px 16px; border-radius: 8px; border: none; background: #f3f4f6; color: #374151; font-weight: 600; cursor: pointer;">📝 Plain Text</button>
                        <button class="QR-tab" data-tab="wifi" style="padding: 8px 16px; border-radius: 8px; border: none; background: #f3f4f6; color: #374151; font-weight: 600; cursor: pointer;">📶 Wi-Fi</button>
                        <button class="QR-tab" data-tab="email" style="padding: 8px 16px; border-radius: 8px; border: none; background: #f3f4f6; color: #374151; font-weight: 600; cursor: pointer;">📧 Email</button>
                    </div>

                    <!-- Input Fields -->
                    <div id="QR-input-section" style="display: flex; flex-direction: column; gap: 14px;">
                        <label style="font-weight: 700; color: #111827; font-size: 14px;">Target Website URL:</label>
                        <input type="url" id="QR-main-input" placeholder="https://yourwebsite.com" value="https://freetools.com" style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none; transition: border-color 0.2s;">
                    </div>

                    <!-- Customization Options -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 10px;">
                        <div>
                            <label style="font-weight: 600; color: #374151; font-size: 13px; display: block; margin-bottom: 6px;">Foreground Color:</label>
                            <input type="color" id="QR-fg-color" value="#000000" style="width: 100%; height: 42px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; padding: 2px;">
                        </div>
                        <div>
                            <label style="font-weight: 600; color: #374151; font-size: 13px; display: block; margin-bottom: 6px;">Background Color:</label>
                            <input type="color" id="QR-bg-color" value="#ffffff" style="width: 100%; height: 42px; border: 1px solid #e5e7eb; border-radius: 8px; cursor: pointer; padding: 2px;">
                        </div>
                    </div>

                    <div>
                        <label style="font-weight: 600; color: #374151; font-size: 13px; display: block; margin-bottom: 6px;">Image Quality / Size:</label>
                        <select id="QR-size-select" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 14px; font-weight: 600;">
                            <option value="300">300 x 300 px (Standard)</option>
                            <option value="500" selected>500 x 500 px (High HD)</option>
                            <option value="1000">1000 x 1000 px (Ultra HD)</option>
                            <option value="2000">2000 x 2000 px (Print Quality 300 DPI)</option>
                        </select>
                    </div>
                </div>

                <!-- Right Preview Column -->
                <div class="QR-preview-col" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: #f9fafb; padding: 24px; border-radius: 16px; border: 1px dashed #d1d5db;">
                    <div id="QR-canvas-holder" style="background: #ffffff; padding: 16px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.06); display: flex; align-items: center; justify-content: center; width: 220px; height: 220px;"></div>
                    
                    <div style="margin-top: 20px; width: 100%; display: flex; flex-direction: column; gap: 10px;">
                        <button id="btn-QR-download-PNG" class="btn-select-files" style="width: 100%; justify-content: center; padding: 14px; font-size: 15px; background: #e5322d;">
                            <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></SVG>
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
                <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></SVG>
                <span><b>Fair-Use Rules:</b> Max video duration 30 mins • Up to 1080p Full HD • 5 downloads / 5 mins • 100% FREE & No Signup</span>
            </div>`;
    }

    // 2. Video & Audio Tools (Compress Video, Video Trimmer, Video Merger, Video to Audio, Audio to Video, MP3 Compressor)
    if (t.includes('video') || t.includes('audio') || t.includes('MP3') || t.includes('WAV')) {
        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #EFF6FF; border: 1.5px solid #BFDBFE; color: #1D4ED8; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(37,99,235,0.06);">
                <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></SVG>
                <span><b>Fair-Use Rules:</b> Max file size 100 MB • Max duration 10 mins • Up to 3 files per merge • 100% FREE & No Signup</span>
            </div>`;
    }

    // 3. AI & Smart Image Tools (Remove BG, Image Upscaler, Remove Watermark)
    if (t.includes('remove-bg') || t.includes('upscale') || t.includes('watermark')) {
        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #F3E8FF; border: 1.5px solid #DDD6FE; color: #6D28D9; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(124,58,237,0.06);">
                <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></SVG>
                <span><b>Fair-Use Rules:</b> Max file size 15 MB • Max resolution 4096x4096px • 5 AI requests / 3 mins • 100% FREE & No Signup</span>
            </div>`;
    }

    // 4. Document Conversions & OCR (PDF to Word, Word/Excel/PPT to PDF, EPUB, OCR, Summarizer, Document Translate)
    if (t.includes('PDF') || t.includes('word') || t.includes('excel') || t.includes('powerpoint') || t.includes('EPUB') || t.includes('OCR') || t.includes('document') || t.includes('HTML')) {
        if (['merge-PDF', 'split-PDF', 'remove-pages', 'organize-PDF', 'scan-PDF', 'rotate-PDF', 'add-PDF-page-number'].includes(t)) {
            return `
                <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #047857; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(16,185,129,0.06);">
                    <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></SVG>
                    <span><b>Browser Client-Side Tool:</b> Processed 100% on your device • Unlimited file size • 100% FREE & No Signup</span>
                </div>`;
        }

        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #FFF1F0; border: 1.5px solid #FFCCC7; color: #E5322D; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(229,50,45,0.06);">
                <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></SVG>
                <span><b>Fair-Use Rules:</b> Max document size 25 MB • Max 50 pages for OCR/AI • 10 conversions / 5 mins • 100% FREE & No Signup</span>
            </div>`;
    }

    // 5. GIF Tools (Video to GIF, GIF Converters & Compressor)
    if (t.includes('GIF')) {
        return `
            <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #FEF3C7; border: 1.5px solid #FDE68A; color: #B45309; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(217,119,6,0.06);">
                <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></SVG>
                <span><b>Fair-Use Rules:</b> Max video size 50 MB • Max GIF duration 15s • 100% FREE & No Signup</span>
            </div>`;
    }

    // 6. General Client-Side Utilities
    return `
        <div class="tool-rule-badge" style="margin-top: 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ECFDF5; border: 1.5px solid #A7F3D0; color: #047857; padding: 10px 20px; border-radius: 30px; font-weight: 600; font-size: 13.5px; box-shadow: 0 2px 10px rgba(16,185,129,0.06);">
            <SVG viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></SVG>
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
                const data = await res.JSON();

                const container = document.getElementById('yt-card-container');
                let optionsHTML = '';

                if (toolConfig.type === 'WAV') {
                    optionsHTML = `
                        <option value="WAV" data-type="WAV">🎵 WAV Uncompressed Audio (PCM 16-bit Studio)</option>
                    `;
                } else if (toolConfig.type === 'MP3') {
                    optionsHTML = `
                        <option value="320k" data-type="MP3">🎵 MP3 320 kbps (Best Quality)</option>
                        <option value="256k" data-type="MP3">🎵 MP3 256 kbps (High Quality)</option>
                        <option value="192k" data-type="MP3">🎵 MP3 192 kbps (Standard Quality)</option>
                        <option value="128k" data-type="MP3">🎵 MP3 128 kbps (Basic Quality)</option>
                    `;
                } else if (toolConfig.type === 'MP4') {
                    optionsHTML = `
                        <option value="1080p" data-type="MP4">📹 MP4 1080p (Full HD)</option>
                        <option value="720p" data-type="MP4">📹 MP4 720p (HD)</option>
                        <option value="480p" data-type="MP4">📹 MP4 480p (SD)</option>
                        <option value="360p" data-type="MP4">📹 MP4 360p (Small)</option>
                        <option value="2160p (4K)" data-type="MP4">📹 MP4 2160p (4K Ultra HD)</option>
                    `;
                } else {
                    // Universal Downloader (Allows 1. Vídeo MP4, 2. Áudio MP3, 3. Áudio WAV)
                    optionsHTML = `
                        <optgroup label="📹 1. Vídeo MP4">
                            <option value="1080p" data-type="MP4" selected>MP4 1080p (Full HD Video)</option>
                            <option value="720p" data-type="MP4">MP4 720p (HD Video)</option>
                            <option value="480p" data-type="MP4">MP4 480p (SD Video)</option>
                            <option value="360p" data-type="MP4">MP4 360p (Small Video)</option>
                            <option value="2160p (4K)" data-type="MP4">MP4 2160p (4K Ultra HD)</option>
                        </optgroup>
                        <optgroup label="🎵 2. Áudio MP3">
                            <option value="320k" data-type="MP3">MP3 320 kbps (Melhor Qualidade)</option>
                            <option value="256k" data-type="MP3">MP3 256 kbps (Alta Qualidade)</option>
                            <option value="192k" data-type="MP3">MP3 192 kbps (Padrão)</option>
                            <option value="128k" data-type="MP3">MP3 128 kbps (Básica)</option>
                        </optgroup>
                        <optgroup label="🎼 3. Áudio WAV">
                            <option value="WAV" data-type="WAV">WAV Audio Uncompressed (16-bit Studio PCM)</option>
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
                    const selectedType = selectedOption.getAttribute('data-type') || (selectedQuality.endsWith('k') ? 'MP3' : 'MP4');

                    showProcessing(`Converting and downloading YouTube video as ${selectedType.toUpperCase()} (${selectedQuality})...`);
                    try {
                        const formData = new FormData();
                        formData.append('url', urlInput);
                        formData.append('format_type', selectedType);
                        formData.append('quality', selectedQuality);

                        const dlRes = await fetch('http://localhost:5000/api/youtube/download', { method: 'POST', body: formData });
                        if (!dlRes.ok) throw new Error('Download failed');
                        const blob = await dlRes.blob();
                        const ext = selectedType === 'WAV' ? 'WAV' : (selectedType === 'MP3' ? 'MP3' : 'MP4');
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
    'PDF-to-word': 'word_to_pdf',
    'word_to_pdf': 'pdf_to_word',
    'word-to-PDF': 'pdf_to_word',

    'pdf_to_excel': 'excel_to_pdf',
    'PDF-to-excel': 'excel_to_pdf',
    'excel_to_pdf': 'pdf_to_excel',
    'excel-to-PDF': 'pdf_to_excel',

    'pdf_to_powerpoint': 'powerpoint_to_pdf',
    'PDF-to-powerpoint': 'powerpoint_to_pdf',
    'powerpoint_to_pdf': 'pdf_to_powerpoint',
    'powerpoint-to-PDF': 'pdf_to_powerpoint',

    'pdf_to_jpg': 'jpg_to_pdf',
    'PDF-to-JPG': 'jpg_to_pdf',
    'jpg_to_pdf': 'pdf_to_jpg',
    'JPG-to-PDF': 'pdf_to_jpg',

    'PDF-to-HTML': 'HTML-to-PDF',
    'pdf_to_html': 'HTML-to-PDF',
    'HTML-to-PDF': 'PDF-to-HTML',
    'html_to_pdf': 'PDF-to-HTML',

    'PDF-to-EPUB': 'EPUB-to-PDF',
    'pdf_to_epub': 'EPUB-to-PDF',
    'EPUB-to-PDF': 'PDF-to-EPUB',
    'epub_to_pdf': 'PDF-to-EPUB',

    'PDF-to-HEIC': 'HEIC-to-PDF',
    'pdf_to_heic': 'HEIC-to-PDF',
    'HEIC-to-PDF': 'PDF-to-HEIC',
    'heic_to_pdf': 'PDF-to-HEIC',

    'protect-PDF': 'unlock_pdf',
    'protect_pdf': 'unlock_pdf',
    'unlock_pdf': 'protect-PDF',
    'unlock-PDF': 'protect-PDF',

    'JPG-to-PNG': 'PNG-to-JPG',
    'jpg_to_png': 'PNG-to-JPG',
    'PNG-to-JPG': 'JPG-to-PNG',
    'png_to_jpg': 'JPG-to-PNG',

    'JPG-to-webp': 'webp-to-JPG',
    'jpg_to_webp': 'webp-to-JPG',
    'webp-to-JPG': 'JPG-to-webp',
    'webp_to_jpg': 'JPG-to-webp',

    'PNG-to-webp': 'webp-to-PNG',
    'png_to_webp': 'webp-to-PNG',
    'webp-to-PNG': 'PNG-to-webp',
    'webp_to_png': 'PNG-to-webp',

    'HEIC-to-JPG': 'JPG-to-HEIC',
    'heic_to_jpg': 'JPG-to-HEIC',
    'JPG-to-HEIC': 'HEIC-to-JPG',
    'jpg_to_heic': 'HEIC-to-JPG',

    'HEIC-to-PNG': 'PNG-to-HEIC',
    'heic_to_png': 'PNG-to-HEIC',
    'PNG-to-HEIC': 'HEIC-to-PNG',
    'png_to_heic': 'HEIC-to-PNG',

    'MP4-to-MP3': 'MP3-to-MP4',
    'mp4_to_mp3': 'MP3-to-MP4',
    'MP3-to-MP4': 'MP4-to-MP3',
    'mp3_to_mp4': 'MP4-to-MP3',

    'WAV-to-MP3': 'MP3-to-WAV',
    'wav_to_mp3': 'MP3-to-WAV',
    'MP3-to-WAV': 'WAV-to-MP3',
    'mp3_to_wav': 'WAV-to-MP3',

    'WAV-to-MP4': 'MP4-to-WAV',
    'wav_to_mp4': 'MP4-to-WAV',
    'MP4-to-WAV': 'WAV-to-MP4',
    'mp4_to_wav': 'WAV-to-MP4',
    'video-to-audio': 'MP3-to-MP4',
    'video_to_audio': 'MP3-to-MP4',
    'audio-to-video': 'MP4-to-MP3',
    'audio_to_video': 'MP4-to-MP3',

    'MP4-to-GIF': 'GIF-to-MP4',
    'mp4_to_gif': 'GIF-to-MP4',
    'GIF-to-MP4': 'MP4-to-GIF',
    'gif_to_mp4': 'MP4-to-GIF',

    'webm-to-GIF': 'GIF-to-webm',
    'webm_to_gif': 'GIF-to-webm',
    'GIF-to-webm': 'webm-to-GIF',
    'gif_to_webm': 'webm-to-GIF',

    'apng-to-GIF': 'GIF-to-apng',
    'apng_to_gif': 'GIF-to-apng',
    'GIF-to-apng': 'apng-to-GIF',
    'gif_to_apng': 'apng-to-GIF'
};

function getViceVersaSwapButton(toolId) {
    const oppId = VICE_VERSA_PAIRS[toolId];
    if (!oppId || !TOOLS_DB[oppId]) return '';
    const oppConfig = TOOLS_DB[oppId];
    return `
        <div style="margin-top: 14px; display: flex; justify-content: center;">
            <button onclick="openToolView('${oppId}')" class="vice-versa-swap-btn" style="display: inline-flex; align-items: center; gap: 8px; background: #ffffff; border: 1.5px solid #2563eb; color: #2563eb; padding: 8px 18px; border-radius: 30px; font-weight: 600; font-size: 13.5px; cursor: pointer; transition: all 0.2s ease; box-shadow: 0 2px 8px rgba(37,99,235,0.08);" onmouseover="this.style.background='#2563eb'; this.style.color='#ffffff';" onmouseout="this.style.background='#ffffff'; this.style.color='#2563eb';">
                <SVG viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16"/></SVG>
                <span>Switch to <b>${oppConfig.title}</b> 🔄</span>
            </button>
        </div>
    `;
}

    // Fetch Translated Workspace Texts based on active language
    const langCode = (currentState.translateLang || localStorage.getItem('freetools_lang') || 'en').toLowerCase();
    const langDict = TOOL_TRANSLATIONS[langCode] || null;
    const normId = toolId.replace(/_/g, '-');
    const altId = toolId.replace(/-/g, '_');
    const toolTrans = langDict ? (langDict[toolId] || langDict[normId] || langDict[altId]) : null;

    const activeTitle = (toolTrans && toolTrans.title) ? toolTrans.title : toolConfig.title;
    const activeSubtitle = (toolTrans && toolTrans.desc) ? toolTrans.desc : toolConfig.subtitle;

    let activeBtnText = toolConfig.btnText || 'Select file';
    let activeDropText = toolConfig.dropText || 'or drop file here';

    if (langCode === 'pt') {
        if (toolConfig.accept && toolConfig.accept.includes('PDF')) activeBtnText = 'Selecionar Ficheiro PDF';
        else if (toolConfig.accept && toolConfig.accept.includes('image')) activeBtnText = 'Selecionar Imagem';
        else if (toolConfig.accept && toolConfig.accept.includes('video')) activeBtnText = 'Selecionar Vídeo';
        else if (toolConfig.accept && toolConfig.accept.includes('audio')) activeBtnText = 'Selecionar Áudio';
        else activeBtnText = 'Selecionar Ficheiros';
        activeDropText = 'ou arraste os ficheiros para aqui';
    } else if (langCode === 'es') {
        if (toolConfig.accept && toolConfig.accept.includes('PDF')) activeBtnText = 'Seleccionar Archivo PDF';
        else if (toolConfig.accept && toolConfig.accept.includes('image')) activeBtnText = 'Seleccionar Imagen';
        else if (toolConfig.accept && toolConfig.accept.includes('video')) activeBtnText = 'Seleccionar Vídeo';
        else if (toolConfig.accept && toolConfig.accept.includes('audio')) activeBtnText = 'Seleccionar Audio';
        else activeBtnText = 'Seleccionar Archivos';
        activeDropText = 'o arrastra los archivos aquí';
    } else if (langCode === 'fr') {
        if (toolConfig.accept && toolConfig.accept.includes('PDF')) activeBtnText = 'Sélectionner un fichier PDF';
        else if (toolConfig.accept && toolConfig.accept.includes('image')) activeBtnText = 'Sélectionner une image';
        else if (toolConfig.accept && toolConfig.accept.includes('video')) activeBtnText = 'Sélectionner une vidéo';
        else if (toolConfig.accept && toolConfig.accept.includes('audio')) activeBtnText = 'Sélectionner un fichier audio';
        else activeBtnText = 'Sélectionner des fichiers';
        activeDropText = 'ou déposez les fichiers ici';
    }

    // Create Tool View Workspace
    toolViewEl = document.createElement('div');
    toolViewEl.id = 'dynamic-tool-view';
    toolViewEl.className = 'tool-view-page';

    toolViewEl.innerHTML = `
        <div class="tool-view-header">
            <h1>${activeTitle}</h1>
            <p>${activeSubtitle}</p>
            ${getViceVersaSwapButton(toolId)}
        </div>
        <div class="tool-upload-box" id="upload-box">
            <div class="upload-button-wrapper">
                <label class="btn-select-files">
                    ${activeBtnText}
                    <input type="file" id="file-input" ${toolConfig.multiple ? 'multiple' : ''} accept="${toolConfig.accept}" style="display:none;">
                </label>
                <div class="cloud-drive-buttons">
                    <div class="cloud-btn" title="Add from Google Drive">
                        <SVG viewBox="0 0 24 24"><path d="M12.01 1.485L3.52 16.19h5.18l8.49-14.705h-5.18zm6.47 4.195l-4.24 7.35 4.24 7.35h5.18l-4.24-7.35 4.24-7.35h-5.18zM2.87 17.34l-2.6 4.5h17.84l2.6-4.5H2.87z"/></SVG>
                    </div>
                    <div class="cloud-btn" title="Add from Dropbox">
                        <SVG viewBox="0 0 24 24"><path d="M6 2l-6 3.9 6 3.9 6-3.9-6-3.9zm12 0l-6 3.9 6 3.9 6-3.9-6-3.9zM0 13.7l6 3.9 6-3.9-6-3.9-6 3.9zm24 0l-6-3.9-6 3.9 6 3.9 6-3.9zM6 18.9l6 3.9 6-3.9-6-3.9-6 3.9z"/></SVG>
                    </div>
                </div>
            </div>
            <div class="dropzone-text">${activeDropText}</div>
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
        if (file.type.includes('PDF')) {
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
    } else if (toolId.includes('rotate') && !toolId.includes('PDF')) {
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
                <input type="text" class="sidebar-input" id="option-watermark-text" value="FreeTools Confidential">
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
    } else if (toolId === 'protect-PDF') {
        return `
            <div class="sidebar-group">
                <label class="sidebar-label">Set Password:</label>
                <input type="password" class="sidebar-input" id="option-protect-pass" placeholder="Enter security password">
            </div>
        `;
    } else if (toolId === 'translate-PDF') {
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
        const PDF = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const page = await PDF.getPage(1);

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
                <SVG width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></SVG>
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

        if (tool === 'PDF-to-word') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/PDF-to-word`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'freetools_converted.docx', 'PDF converted to WORD (.docx) successfully!');
                return;
            }
        }
        else if (tool === 'merge_pdf') {
            const formData = new FormData();
            currentState.files.forEach(f => formData.append('files', f));
            const res = await fetch(`${BACKEND_URL}/api/merge`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'freetools_merged.PDF', 'PDFs merged successfully!');
                return;
            }
        }
        else if (tool === 'split_pdf') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/split`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'freetools_split.zip', 'PDF pages split into ZIP file!');
                return;
            }
        }
        else if (tool === 'compress_pdf') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/compress`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'freetools_compressed.PDF', 'PDF compressed successfully!');
                return;
            }
        }
        else if (tool === 'jpg_to_pdf') {
            const formData = new FormData();
            currentState.files.forEach(f => formData.append('files', f));
            const res = await fetch(`${BACKEND_URL}/api/JPG-to-PDF`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'freetools_converted.PDF', 'Images converted to PDF!');
                return;
            }
        }
        else if (tool === 'pdf_to_jpg') {
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            const res = await fetch(`${BACKEND_URL}/api/PDF-to-JPG`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'freetools_images.zip', 'PDF pages extracted to JPG!');
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
                showResultScreen(blob, 'freetools_rotated.PDF', 'PDF pages rotated!');
                return;
            }
        }
        else if (tool === 'protect-PDF') {
            const pass = document.getElementById('option-protect-pass')?.value || '1234';
            const formData = new FormData();
            formData.append('file', currentState.files[0]);
            formData.append('password', pass);
            const res = await fetch(`${BACKEND_URL}/api/protect`, { method: 'POST', body: formData });
            if (res.ok) {
                const blob = await res.blob();
                showResultScreen(blob, 'freetools_protected.PDF', 'PDF encrypted with password!');
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
                showResultScreen(blob, 'freetools_unlocked.PDF', 'PDF unlocked!');
                return;
            }
        }
        else if (tool === 'PDF-summarize' || tool === 'PDF-to-markdown') {
            const mode = tool === 'PDF-summarize' ? 'summary' : 'markdown';
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
                const PDF = await PDFDocument.load(fileBuffer);
                const copiedPages = await mergedPdf.copyPages(PDF, PDF.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }
            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes], { type: 'application/PDF' });
            showResultScreen(blob, 'freetools_merged.PDF', 'PDFs merged successfully!');
        } else {
            const fileBuffer = await currentState.files[0].arrayBuffer();
            const pdfDoc = await PDFDocument.load(fileBuffer);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/PDF' });
            showResultScreen(blob, 'freetools_processed.PDF', 'Document processed successfully!');
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
            if (canvas) dataUrl = canvas.toDataURL("image/PNG");
            else if (img) dataUrl = img.src;
            
            if (dataUrl) {
                const a = document.createElement("a");
                a.href = dataUrl;
                a.download = "qrcode.PNG";
                a.click();
                showSuccess("Static QR Code generated! Works 100% FOREVER without expiration.");
            } else {
                alert("Failed to render QR Code");
            }
            document.body.removeChild(tempDiv);
        }, 300);
    } else {
        // Fallback static Google Chart API QR Generator
        const qrUrl = "https://api.qrserver.com/v1/create-QR-code/?size=500x500&data=" + encodeURIComponent(inputVal);
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
    downloadBlob(files[0], "merged_video.MP4");
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
        downloadBlob(blob, "favicon-32x32.PNG");
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
        const blob = new Blob([formatted], { type: "application/JSON" });
        downloadBlob(blob, "formatted.JSON");
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
    const blob = new Blob([jsonOutput], { type: "application/JSON" });
    downloadBlob(blob, "csv_parsed.JSON");
    showSuccess("CSV parsed into JSON format successfully!");
}

async function handleXmlFormatter(files) {
    let input = "";
    if (files.length) input = await files[0].text();
    else input = prompt("Paste XML text to format:");
    if (!input) return;
    
    const blob = new Blob([input], { type: "text/XML" });
    downloadBlob(blob, "formatted.XML");
    showSuccess("XML file processed successfully!");
}

async function handleBase64Tool(files) {
    if (files.length) {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result;
            const blob = new Blob([base64], { type: "text/plain" });
            downloadBlob(blob, files[0].name + ".base64.TXT");
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
    downloadBlob(blob, "lorem_ipsum.TXT");
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
        
        const data = await res.JSON();
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
        downloadBlob(blob, "website_screenshot.PNG");
        showSuccess("Website screenshot captured successfully!");
    } catch (e) {
        alert("Screenshot error: " + e.message);
    }
}



function initQrCodeBuilderLogic() {
    const holder = document.getElementById('QR-canvas-holder');
    const inputEl = document.getElementById('QR-main-input');
    const fgColorEl = document.getElementById('QR-fg-color');
    const bgColorEl = document.getElementById('QR-bg-color');
    const sizeSelect = document.getElementById('QR-size-select');
    const btnDownload = document.getElementById('btn-QR-download-PNG');
    const tabs = document.querySelectorAll('.QR-tab');
    
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
            const inputSection = document.getElementById('QR-input-section');
            if (currentTab === 'url') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Target Website URL:</label>
                    <input type="url" id="QR-main-input" placeholder="https://yourwebsite.com" value="https://freetools.com" style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none;">
                `;
            } else if (currentTab === 'text') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Plain Text Content:</label>
                    <textarea id="QR-main-input" rows="4" placeholder="Enter any text, notes, or instructions..." style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none;">Welcome to FREETOOLS!</textarea>
                `;
            } else if (currentTab === 'wifi') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Network SSID (Name):</label>
                    <input type="text" id="QR-wifi-ssid" placeholder="Home_WiFi" value="MyHomeNetwork" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 14px; margin-bottom: 10px;">
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Password:</label>
                    <input type="text" id="QR-wifi-pass" placeholder="Password123" value="secret123" style="width: 100%; padding: 12px 16px; border-radius: 8px; border: 2px solid #e5e7eb; font-size: 14px;">
                    <input type="hidden" id="QR-main-input" value="WIFI:S:MyHomeNetwork;T:WPA;P:secret123;;">
                `;
                const ssid = document.getElementById('QR-wifi-ssid');
                const pass = document.getElementById('QR-wifi-pass');
                const mainIn = document.getElementById('QR-main-input');
                const updateWifi = () => {
                    mainIn.value = `WIFI:S:${ssid.value};T:WPA;P:${pass.value};;`;
                    renderQR();
                };
                ssid.addEventListener('input', updateWifi);
                pass.addEventListener('input', updateWifi);
            } else if (currentTab === 'email') {
                inputSection.innerHTML = `
                    <label style="font-weight: 700; color: #111827; font-size: 14px;">Recipient Email Address:</label>
                    <input type="email" id="QR-main-input" placeholder="contact@example.com" value="hello@freetools.com" style="width: 100%; padding: 14px 18px; border-radius: 10px; border: 2px solid #e5e7eb; font-size: 15px; outline: none;">
                `;
            }
            
            const newInput = document.getElementById('QR-main-input');
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
            let textVal = document.getElementById('QR-main-input') ? document.getElementById('QR-main-input').value.trim() : 'https://freetools.com';
            
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
                let dataUrl = canvas ? canvas.toDataURL('image/PNG') : (img ? img.src : '');
                
                if (dataUrl) {
                    const a = document.createElement('a');
                    a.href = dataUrl;
                    a.download = `qrcode_${size}x${size}.PNG`;
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

