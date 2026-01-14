export default async function handler(req, res) {
    // ikas ve tarayıcı güvenlik izinleri (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { style } = req.body;
        const seed = Math.floor(Math.random() * 999999);
        
        // Dokümantasyondaki 'flux' modelini kullanıyoruz
        const prompt = encodeURIComponent(`${style} style 3D character portrait, high quality, masterpiece, 8k`);
        
        // Bu URL doğrudan resmin kendisini döner, API KEY istemez
        const imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&enhance=true&nologo=true`;

        return res.status(200).json({ imageUrl: imageUrl });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
