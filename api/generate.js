export default async function handler(req, res) {
    // Güvenlik İzinleri
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // POST İsteği (Dönüştür butonuna basıldığında çalışır)
    if (req.method === 'POST') {
        try {
            const { style } = req.body;
            const seed = Math.floor(Math.random() * 9999999);
            const prompt = encodeURIComponent(`${style} style 3D character portrait, masterpiece`);
            const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&nologo=true`;
            
            return res.status(200).json({ imageUrl: imageUrl });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // GET İsteği (Sayfa ilk açıldığında ekrana gelecek olan Arayüz)
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: sans-serif; text-align: center; padding: 20px; background: #fff; }
                .card { max-width: 380px; margin: auto; padding: 25px; border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #eee; }
                input, select, button { width: 100%; padding: 12px; margin: 10px 0; border-radius: 10px; border: 1px solid #ddd; box-sizing: border-box; }
                button { background: #000; color: #fff; font-weight: bold; cursor: pointer; border: none; }
                #resultImg { width: 100%; margin-top: 20px; border-radius: 15px; display: none; }
                #loader { display: none; margin: 15px 0; font-weight: bold; color: #555; }
            </style>
        </head>
        <body>
            <div class="card">
                <h2>KarakterX Studio</h2>
                <input type="file" id="fileInput">
                <select id="styleSelect">
                    <option value="3D Pixar">3D Pixar Tarzı</option>
                    <option value="Anime Masterpiece">Anime Tarzı</option>
                </select>
                <button id="btn" onclick="generate()">Karakterimi Oluştur ✨</button>
                <div id="loader">⚡ Hazırlanıyor...</div>
                <img id="resultImg" src="">
            </div>

            <script>
                async function generate() {
                    const btn = document.getElementById('btn');
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
                            img.src = data.imageUrl;
                            img.onload = () => {
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
                }
            </script>
        </body>
        </html>
    `);
}
