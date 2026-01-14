export default async function handler(req, res) {
    // Güvenlik Başlıkları - ikas'ın reddetmemesi için en güvenli ayarlar
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // CSP hatasını aşmak için header ekliyoruz
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method === 'POST') {
        try {
            const { style } = req.body;
            const seed = Math.floor(Math.random() * 9999999);
            const prompt = encodeURIComponent(`${style} style 3D character portrait, masterpiece`);
            const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
            
            return res.status(200).json({ imageUrl: imageUrl });
        } catch (error) {
            return res.status(500).json({ error: "API Hatası" });
        }
    }

    // Arayüz - Eval içermeyen, CSP dostu saf HTML
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
        <!DOCTYPE html>
        <html lang="tr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: sans-serif; text-align: center; padding: 20px; background: #fff; }
                .card { max-width: 380px; margin: auto; padding: 25px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #eee; }
                input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: 1px solid #ddd; box-sizing: border-box; }
                button { background: #000; color: #fff; font-weight: bold; cursor: pointer; border: none; }
                button:disabled { background: #666; }
                #resultImg { width: 100%; margin-top: 20px; border-radius: 15px; display: none; }
                #loader { display: none; margin: 15px 0; font-weight: bold; color: #555; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>KarakterX Studio</h2>
                <input type="file" id="fileInput" accept="image/*">
                <select id="styleSelect">
                    <option value="3D Pixar">3D Pixar Tarzı</option>
                    <option value="Anime Masterpiece">Anime Tarzı</option>
                </select>
                <button id="btn">Karakterimi Oluştur ✨</button>
                <div id="loader">⚡ İşleniyor, lütfen bekleyin...</div>
                <img id="resultImg" src="">
            </div>

            <script>
                // CSP hatası almamak için inline event (onclick) yerine listener kullanıyoruz
                document.getElementById('btn').addEventListener('click', async function() {
                    const btn = this;
                    const loader = document.getElementById('loader');
                    const img = document.getElementById('resultImg');
                    const style = document.getElementById('styleSelect').value;

                    btn.disabled = true;
                    loader.style.display = "block";
                    img.style.display = "none";

                    try {
                        const response = await fetch('/api/generate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ style: style })
                        });
                        const data = await response.json();
                        if (data.imageUrl) {
                            const temp = new Image();
                            temp.src = data.imageUrl;
                            temp.onload = function() {
                                img.src = data.imageUrl;
                                img.style.display = "block";
                                loader.style.display = "none";
                                btn.disabled = false;
                            };
                        }
                    } catch (error) {
                        alert("Hata oluştu.");
                        btn.disabled = false;
                        loader.style.display = "none";
                    }
                });
            </script>
        </body>
        </html>
    `);
}
