exports.handler = async (event) => {
    try {
        const { style, step } = event.queryStringParameters || {};

        // ADIM 2: RESİM OLUŞTURMA VE YENİ SEKMEDE GÖSTERME
        if (step === 'show') {
            const seed = Math.floor(Math.random() * 9999999);
            const prompt = encodeURIComponent(`${style} style 3D character portrait, masterpiece, high quality`);
            const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
            
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'text/html; charset=utf-8' },
                body: `
                    <html>
                    <body style="font-family:sans-serif; text-align:center; padding:40px;">
                        <h2 style="color:green;">✓ Karakterin Başarıyla Oluşturuldu!</h2>
                        <p>Resmin şimdi yeni sekmede açılacak...</p>
                        <script>
                            window.open("${imageUrl}", "_blank");
                            setTimeout(() => { window.location.href = "/.netlify/functions/generate"; }, 3000);
                        </script>
                        <p style="margin-top:20px;">Eğer açılmadıysa: <a href="${imageUrl}" target="_blank" style="font-weight:bold; color:black; font-size:18px;">BURAYA TIKLA VE RESMİ GÖR</a></p>
                        <br><br>
                        <p style="font-size:14px; color:#666;">Resmi bilgisayarına kaydet ve ürünü sepete eklerken dosya olarak yükle.</p>
                    </body>
                    </html>`
            };
        }

        // ADIM 1: GİRİŞ FORMU
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html; charset=utf-8' },
            body: `
                <html>
                <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                <body style="font-family:sans-serif; text-align:center; padding:20px;">
                    <div style="max-width:380px; margin:auto; padding:25px; border:2px dashed #ddd; border-radius:20px;">
                        <h2 style="margin-top:0;">KarakterX Studio</h2>
                        <form action="/.netlify/functions/generate" method="GET">
                            <input type="hidden" name="step" value="show">
                            <div style="margin-bottom:20px; text-align:left;">
                                <label style="font-weight:bold; display:block; margin-bottom:8px;">1. Fotoğrafını Seç:</label>
                                <input type="file" accept="image/*" required style="width:100%; padding:10px; border:1px solid #ccc; border-radius:8px;">
                            </div>
                            <div style="margin-bottom:20px; text-align:left;">
                                <label style="font-weight:bold; display:block; margin-bottom:8px;">2. Stilini Seç:</label>
                                <select name="style" required style="width:100%; padding:15px; border-radius:10px; border:1px solid #ccc; font-size:16px;">
                                    <option value="3D Pixar Animation">Pixar Tarzı</option>
                                    <option value="Japanese Anime Manga">Anime Tarzı</option>
                                    <option value="Cyberpunk Neon">Cyberpunk Tarzı</option>
                                    <option value="Realistic Photo">Gerçekçi Fotoğraf</option>
                                    <option value="Comic Book">Çizgi Roman</option>
                                    <option value="Oil Painting">Yağlı Boya</option>
                                </select>
                            </div>
                            <button type="submit" style="width:100%; padding:18px; background:black; color:white; border:none; border-radius:12px; font-weight:bold; font-size:18px; cursor:pointer;">
                                Karakterimi Oluştur 🚀
                            </button>
                        </form>
                    </div>
                </body>
                </html>`
        };
    } catch (error) {
        return { statusCode: 200, body: "Sistem meşgul, lütfen tekrar deneyin." };
    }
};
