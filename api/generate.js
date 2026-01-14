export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { style } = req.body;
        
        // Rastgele bir sayı üreterek her seferinde farklı görsel gelmesini sağlarız
        const seed = Math.floor(Math.random() * 1000000);
        const prompt = encodeURIComponent(`A ${style} style character, high quality, 3d render, masterpiece`);
        
        // API Key istemeyen direkt görsel linki
        const imageUrl = `https://pollinations.ai/p/${prompt}?width=1024&height=1024&seed=${seed}&model=flux`;

        return res.status(200).json({ imageUrl: imageUrl });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
