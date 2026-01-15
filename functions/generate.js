exports.handler = async (event) => {
    // Tüm CORS ve Güvenlik engellerini kaldıran header'lar
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'text/html; charset=utf-8'
    };

    try {
        const { style, step } = event.queryStringParameters || {};

        // ADIM 2: RESİM OLUŞTURMA VE GÖSTERME
        if (step === 'show') {
            const seed = Math.floor(Math.random() * 9999999);
            // Yapay zekaya giden net komut (Flux Model)
            const prompt = encodeURIComponent(`${style} style 3D character portrait, masterpiece, high quality, 8k, highly detailed`);
            const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
            
            return {
                statusCode: 200,
                headers,
                body: `
                    <html>
                    <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
                        <div style="max-width:380px; margin:auto; padding:20px; border:1px solid #eee; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
                            <h3 style="margin-top:0;">Karakterin Oluşturuldu!</h3>
                            <img src="${imageUrl}" style="width:100%; border-radius:15px; border:2px solid #000; margin-bottom:15px;">
                            <p style="font-size:14px; color:#444;">Seçilen Stil: <b>${style}</b></p>
                            <a href="/.netlify/functions/generate" style="display:block; text-decoration:none; color:white; background:black; padding:15px; border-radius:10px; font-weight:bold; margin-bottom:10px;">Yeni Fotoğraf Dönüştür ✨</a>
                            <p style="font-size:12px; color:green; font-weight:bold;">✓ Beğendiysen resmi kaydet ve sepete ekle.</p>
                        </div>
                    </body>
                    </html>`
            };
        }

        // ADIM 1: GİRİŞ FORMU (6 SEÇENEK + DOSYA YÜKLEME)
        return {
            statusCode: 200,
            headers,
            body: `
                <html>
                <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
                    <div style="max-width:380px; margin:auto; padding:25px; border:2px dashed #ddd; border-radius:20px;">
                        <h2 style="margin-top:0;">KarakterX Studio</h2>
                        <form action="/.netlify/functions/generate" method="GET">
                            <input type="hidden" name="step" value="show">
                            <div style="margin-bottom:20px; text-align:left;">
                                <label style="font-weight:bold; display:block; margin-bottom:8px;">1. Fotoğrafını Seç:</label>
                                <input type="file" accept="image/*" required style="width:100%; padding:10px; border:1px solid #ccc; border-radius:8px;">
                            </div>
                            <div style="margin-bottom:20px; text-align:left;">
                                <label style="font-weight:bold; display:block; margin-bottom:8px;">2. Stilini Belirle:</label>
                                <select name="style" required style="width:100%; padding:15px; border-radius:10px; border:1px solid #ccc; font-size:16px;">
                                    <option value="3D Pixar Animation">Pixar Tarzı</option>
                                    <option value="Japanese Anime Manga">Anime Tarzı</option>
                                    <option value="Cyberpunk Neon">Cyberpunk Tarzı</option>
                                    <option value="Realistic Professional Photo">Gerçekçi Fotoğraf</option>
                                    <option value="Marvel DC Comic Book">
