export default async function handler(req, res) {
    // Güvenlik izinleri
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { style } = req.body;
        
        // Her seferinde benzersiz bir görsel için rastgele sayı
        const seed = Math.floor(Math.random() * 999999);
        const prompt = encodeURIComponent(`masterpiece, high quality, 3d render, ${style} style character`);
        
        // Pollinations linki
        const imageUrl = `https://pollinations.ai/p/${prompt}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

        // ÖNEMLİ: ikas'ın görseli tanıması için objeyi net gönderiyoruz
        return res.status(200).json({ 
            success: true,
            imageUrl: imageUrl 
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
