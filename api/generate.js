export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { style, image } = req.body; 
        const seed = Math.floor(Math.random() * 9999999);
        
        // Kullanıcı foto yüklediyse prompt'a ekliyoruz
        const prompt = encodeURIComponent(`${style} style 3D character portrait, masterpiece`);
        let imageUrl = `https://gen.pollinations.ai/image/${prompt}?model=flux&width=1024&height=1024&seed=${seed}&enhance=true&nologo=true`;
        
        // Eğer bir görsel URL'si geldiyse parametre olarak ekle
        if (image) {
            imageUrl += `&image=${encodeURIComponent(image)}`;
        }

        return res.status(200).json({ imageUrl: imageUrl });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
