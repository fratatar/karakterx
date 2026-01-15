exports.handler = async (event) => {
    const { style, step } = event.queryStringParameters || {};

    // ADIM 2: RESİM OLUŞTURMA VE GÖSTERME
    if (step === 'show') {
        const seed = Math.floor(Math.random() * 9999999);
        const prompt = encodeURIComponent(`${style} style 3D character portrait, masterpiece, high resolution`);
        const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
        
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
            body: `
                <html>
                <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
                    <div style="max-width:380px; margin:auto; padding:20px; border:1px solid #eee; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
                        <h3 style="margin-top:0;">Karakterin Hazır!</h3>
                        <img src="${imageUrl}" style="width:100%; border-radius:15px; border:2px solid #000; margin-bottom:15px;">
                        <a href="/.netlify/functions/generate" style="display:block; text-decoration:none; color:white; background:black; padding:15px; border-radius:10px; font-weight:bold; margin-bottom:10px;">Yeniden Oluştur ✨</a>
                        <p style="font-size:13px; color:green; font-weight:bold;">✓ Tasarımı beğendiysen sayfayı kapatıp ürünü sepete ekleyebilirsin.</p>
                    </div>
                </body>
                </html>`
        };
    }

    // ADIM 1: GİRİŞ FORMU (JavaScript içermez, ikas CSP'sine takılma riski yoktur)
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
        body: `
            <html>
            <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
            <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
                <div style="max-width:380px; margin:auto; padding:25px; border:1px solid #eee; border-radius:20px; box-shadow:0 5px 20px rgba(0,0,0,0.05);">
                    <h2 style="margin-top:0; color:#000;">KarakterX Studio</h2>
                    <p style="font-size:14px; color:#666; margin-bottom:20px;">Stilini seç ve 3D karakterini oluştur.</p>
                    <form action="/.netlify/functions/generate" method="GET">
                        <input type="hidden" name="step" value="show">
                        <select name="style" style="width:100%; padding:15px; border-radius:12px; border:1.5px solid #ddd; font-size:16px; margin-bottom:20px; outline:none;">
                            <option value="3D Pixar animated">3D Pixar Tarzı</option>
                            <option value="Anime manga portrait">Anime Tarzı</option>
                            <option value="Cyberpunk neon futuristic">Cyberpunk Tarzı</option>
                            <option value="Realistic photo style portrait">Gerçekçi Tarzı</option>
                        </select>
                        <button type="submit" style="width:100%; padding:18px; background:black; color:white; border:none; border-radius:12px; font-weight:bold; font-size:16px; cursor:pointer;">
                            Karakterimi Çiz 🚀
                        </button>
                    </
