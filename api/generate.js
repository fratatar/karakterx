export default async function handler(req, res) {
    // Tüm dış kaynaklardan gelen isteklere (ikas, localhost vb.) izin veriyoruz
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Tarayıcı ön kontrol isteği
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { style } = req.body;
        const seed = Math.floor(Math.random() * 9999999);
        
        // Pollinations Ücretsiz Hızlı API
        const promptText = `${style} style 3D character portrait, high resolution, professional lighting, masterpiece`;
        const promptEncoded = encodeURIComponent(promptText);
        
        // Görsel URL'sini oluşturuyoruz
        const imageUrl = `https://gen.pollinations.ai/image/${promptEncoded}?model=flux&width=1024&height=1024&seed=${seed}&enhance=true&nologo=true`;

        // Loglarda gördüğümüz 200 yanıtını burası gönderiyor
        return res.status(200).json({ imageUrl: imageUrl });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
