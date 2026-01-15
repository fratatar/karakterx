export default async function handler(req, res) {
    try {
        const { style, step } = req.query;

        // ADIM 2: RESİM OLUŞTURMA VE GÖSTERME
        if (step === 'show') {
            const seed = Math.floor(Math.random() * 9999999);
            const prompt = encodeURIComponent(`${style} style 3D character portrait, masterpiece, high resolution`);
            const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
            
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            return res.status(200).send(`
                <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
                    <div style="max-width:380px; margin:auto; padding:20px; border:1px solid #eee; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
                        <h3 style="margin-top:0;">Karakterin Hazır!</h3>
                        <img src="${imageUrl}" style="width:100%; border-radius:15px; border:2px solid #000; margin-bottom:15px;">
                        <a href="/api/generate" style="display:block; text-decoration:none; color:white; background:black; padding:15px; border-radius:10px; font-weight:bold; margin-bottom:10px;">Yeniden Oluştur ✨</a>
                        <p style="font-size:13px; color:green; font-weight:bold;">✓ Tasarımı beğendiysen sayfayı kapatıp ürünü sepete ekleyebilirsin.</p>
                    </div>
                </body>
            `);
        }

        // ADIM 1: GİRİŞ FORMU (JavaScript içermez, ikas CSP'sine takılmaz)
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(`
            <body style="font-family:sans-serif; text-align:center; padding:20px; background:#fff;">
                <div style="max-width:380px; margin:auto; padding:25px; border:1px solid #eee; border-radius:20px; box-shadow:0 5px 20px rgba(0,0,0,0.05);">
                    <h2 style="margin-top:0;">KarakterX Studio</h2>
                    <p style="font-size:14px; color:#666; margin-bottom:20px;">Stilini seç ve karakterini oluştur.</p>
                    <form action="/api/generate" method="GET">
                        <input type="hidden" name="step" value="show">
                        <select name="style" style="width:100%; padding:15px; border-radius:12px; border:1.5px solid #ddd; font-size:16px; margin-bottom:20px;">
                            <option value="3D Pixar animated">3D Pixar Tarzı</option>
                            <option value="Anime manga portrait">Anime Tarzı</option>
                            <option value="Cyberpunk neon futuristic">Cyberpunk Tarzı</option>
                        </select>
                        <button type="submit" style="width:100%; padding:18px; background:black; color:white; border:none; border-radius:12px; font-weight:bold; font-size:16px; cursor:pointer;">
                            Karakterimi Çiz 🚀
                        </button>
                    </form>
                </div>
            </body>
        `);
    } catch (error) {
        return res.status(200).send("Bir hata oluştu, lütfen sayfayı yenileyin.");
    }
}
