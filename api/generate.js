export default async function handler(req, res) {
    const { style, result } = req.query;

    // Resim oluşturma isteği gelmişse (Sonuç Ekranı)
    if (result) {
        const seed = Math.floor(Math.random() * 9999999);
        const prompt = encodeURIComponent(`${style} style 3D character portrait, high resolution, masterpiece`);
        const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(`
            <html>
            <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
                <div style="max-width:350px; margin:auto; border:1px solid #eee; padding:20px; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
                    <h3 style="margin-bottom:15px;">Karakterin Hazır!</h3>
                    <img src="${imageUrl}" style="width:100%; border-radius:15px; border:2px solid #000;">
                    <p style="font-size:14px; color:#555; margin-top:15px;">Tasarımı beğendiysen sayfayı kapatıp ürünü sepete ekleyebilirsin.</p>
                    <a href="/api/generate" style="display:inline-block; text-decoration:none; color:white; background:black; padding:12px 25px; border-radius:10px; font-weight:bold; margin-top:10px;">Yeni Tasarım Yap ✨</a>
                </div>
            </body>
            </html>
        `);
    }

    // Giriş Ekranı (Saf HTML Form - CSP Engelini Aşar)
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
        <html>
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
            <div style="max-width:350px; margin:auto; border:1px solid #eee; padding:25px; border-radius:20px; box-shadow:0 5px 20px rgba(0,0,0,0.05);">
                <h2 style="margin-top:0;">KarakterX Studio</h2>
                <p style="font-size:14px; color:#666;">Stilini seç ve karakterini hemen oluştur.</p>
                <form action="/api/generate" method="GET">
                    <input type="hidden" name="result" value="true">
                    
                    <select name="style" style="width:100%; padding:15px; margin:15px 0; border-radius:12px; border:1.5px solid #ddd; font-size:16px;">
                        <option value="3D Pixar animated">3D Pixar</option>
                        <option value="Anime masterpiece">Anime</option>
                        <option value="Cyberpunk neon">Cyberpunk</option>
                        <option value="Realistic portrait">Gerçekçi</option>
                    </select>

                    <button type="submit" style="width:100%; padding:18px;
