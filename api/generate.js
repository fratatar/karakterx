import Replicate from "replicate";

export default async function handler(req, res) {
    // ikas'tan (farklı domainden) gelen isteklere izin ver
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Tarayıcı kontrol isteği (Preflight)
    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Yalnızca POST' });

    try {
        const { image, style } = req.body;
        
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error("Vercel Settings > Environment Variables kısmında REPLICATE_API_TOKEN tanımlı değil!");
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        // KESİN ÇÖZÜM: 422 hatasını bitiren tam Model Sürüm ID'si
        const output = await replicate.run(
            "tencentarc/photomaker:ddfc2b6a23f9d9f751b244743ce9405a051aeed4f9d0d7f4b11c13f993f772f1",
            {
                input: {
                    input_image: image,
                    prompt: `img a ${style} style character, cinematic lighting, high resolution, masterpiece`,
                    num_steps: 30,
                    style_strength_ratio: 20
                }
            }
        );

        // Oluşan ilk görselin linkini gönder
        return res.status(200).json({ imageUrl: output[0] });
    } catch (error) {
        console.error("Teknik Hata:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
