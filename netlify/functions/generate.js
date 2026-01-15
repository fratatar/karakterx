exports.handler = async (event) => {
    try {
        const { style, step } = event.queryStringParameters || {};

        // ADIM 2: YAPAY ZEKA RESMİ OLUŞTURUYOR VE GERİ YÜKLÜYOR
        if (step === 'show') {
            const seed = Math.floor(Math.random() * 9999999);
            // Seçilen stile göre yapay zekaya verilen net komut
            const prompt = encodeURIComponent(`3D character portrait, ${style} style, high quality, masterpiece, looking at camera, distinct features`);
            const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
            
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
                body: `
                    <html>
                    <body style="font-family:sans-serif; text-align:center; padding:15px; background:#fff;">
                        <div style="max-width:380px; margin:auto; padding:20px; border:1px solid #eee; border-radius:20px; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
                            <h3 style="margin-top:0;">Karakterin Oluşturuldu!</h3>
                            <img src="${imageUrl}" style="width:100%; border-radius:15px; border:2px solid #000; margin-bottom:15px;">
                            <p style="font-size:14px; color:#444;">Stil: <b>${style}</b></p>
                            <a href="/.netlify/functions/generate" style="display:block; text-decoration:none; color:white; background:black; padding:15px; border-radius:10px; font-weight:bold; margin-bottom:10px;">Yeni Fotoğraf Yükle ✨</a>
                            <p style="font-size:12px; color:green; font-weight:bold;">✓ Bu tasarımı beğendiysen ürünü sepete ekle.</p>
                        </div>
                    </body>
                    </html>`
            };
        }

        // ADIM 1: KULLANICI FOTOĞRAF YÜKLER VE STİL SEÇER
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
            body: `
                <html>
                <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="font-family:sans-serif; text-align:center; padding:15px; background:#fff;">
                    <div style="max-width:380px; margin:auto; padding:25px; border:2px dashed #ddd; border-radius:20px;">
                        <h2 style="margin-top:0;">KarakterX Studio</h2>
                        <form action="/.netlify/functions/generate" method="GET">
                            <input type="hidden" name="step" value="show">
                            
                            <div style="margin-bottom:20px; text-align:left;">
                                <label style="font-weight:bold; display:block; margin-bottom:8px;">1. Fotoğrafını Yükle:</label>
                                <input type="file" accept="image/*" required style="width:100%; padding:10px; border:1px solid #ccc; border-radius:8px;">
                            </div>

                            <div style="margin-bottom:20px; text-align:left;">
                                <label style="font-weight:bold; display:block; margin-bottom:8px;">2. Stilini Seç:</label>
                                <select name="style" required style="width:100%; padding:15px; border-radius:10px; border:1px solid #ccc; font-size:16px;">
                                    <option value="Pixar 3D Animation">Pixar Tarzı</option>
                                    <option value="Japanese Anime Manga">Anime Tarzı</option>
                                    <option value="Cyberpunk Neon">Cyberpunk Tarzı</option>
                                    <option value="Realistic Photo">Gerçekçi Fotoğraf</option>
                                    <option value="Comic Book">Çizgi Roman</option>
                                    <option value="Oil Painting">Yağlı Boya</option>
                                </select>
                            </div>

                            <button type="submit" style="width:100%; padding:18px; background:black; color:white; border:none; border-radius:12px; font-weight:bold; font-size:18px; cursor:pointer;">
                                Dönüştür ve Karakterini Gör 🚀
                            </button>
                        </form>
                    </div>
                </body>
                </html>`
        };
    } catch (error) {
        return { statusCode: 200, body: "Bir hata oluştu. Sayfayı yenileyin." };
    }
};
