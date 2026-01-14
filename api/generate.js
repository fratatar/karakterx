import Replicate from "replicate";

export default async function handler(req, res) {
    // ikas ve dış erişim için CORS ayarları
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Yalnızca POST kabul edilir.' });

    try {
        const { image, style } = req.body;
        
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error("Vercel ayarlarında REPLICATE_API_TOKEN eksik!");
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        // HATA VEREN KISIM DÜZELTİLDİ: Tam Model ID'si eklendi
        const output = await replicate.run(
            "tencentarc/photomaker:ddfc2b6a23f9d9f751b244743ce9405a051aeed4f9d0d7f4b11c13f993f772f1",
            {
                input: {
                    input_image: image,
                    prompt: `img a ${style} style character, cinematic lighting, masterpiece, high quality`,
                    num_steps: 30,
                    style_strength_ratio: 20
                }
            }
        );

        return res.status(200).json({ imageUrl: output[0] });
    } catch (error) {
        console.error("Replicate Hatası:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
