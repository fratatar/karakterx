export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { style } = req.body;
        if (!style) throw new Error("Stil seçilmedi!");

        const seed = Math.floor(Math.random() * 999999);
        const prompt = encodeURIComponent(`${style} style portrait, character, high quality`);
        const url = `https://pollinations.ai/p/${prompt}?width=512&height=512&seed=${seed}&nologo=true`;

        // Sunucu taraflı kontrol
        const response = await fetch(url);
        if (!response.ok) throw new Error("Yapay zeka sunucusu meşgul.");

        return res.status(200).json({ 
            success: true,
            imageUrl: url // Base64 yerine direkt link, ama sunucu onayıyla
        });
    } catch (error) {
        // Hata olduğunda boş dönme, hatayı İkas'a gönder ki anlayalım
        return res.status(500).json({ success: false, error: error.message });
    }
}
