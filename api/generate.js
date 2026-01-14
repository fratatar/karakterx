export default async function handler(req, res) {
    // Güvenlik izinleri (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Sadece POST isteği kabul edilir" });
    }

    try {
        const { style } = req.body;
        
        // Her seferinde farklı sonuç için rastgele sayı
        const seed = Math.floor(Math.random() * 999999);
        
        // Pollinations üzerinden hızlı görsel üretimi
        const prompt = encodeURIComponent(`A high quality ${style} style character portrait, 8k resolution, masterpiece`);
        const imageUrl = `https://pollinations.ai/p/${prompt}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

        // İndeks.html'in beklediği formatta cevap dönüyoruz
        return res.status(200).json({ imageUrl: imageUrl });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
