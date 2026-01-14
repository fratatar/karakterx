export default async function handler(req, res) {
    // Güvenlik Ayarları (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { style } = req.body;
        const seed = Math.floor(Math.random() * 999999);
        const prompt = encodeURIComponent(`masterpiece, high quality, 3d render, ${style} style character`);
        const url = `https://pollinations.ai/p/${prompt}?width=1024&height=1024&seed=${seed}&model=flux&nologo=true`;

        // Görseli arka planda indiriyoruz
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        
        // Görseli Base64 formatına çeviriyoruz (İkas'ın en sevdiği format)
        const base64Image = Buffer.from(arrayBuffer).toString('base64');
        const finalImage = `data:image/jpeg;base64,${base64Image}`;

        return res.status(200).json({ 
            imageUrl: finalImage 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
