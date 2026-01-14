import Replicate from "replicate";

export default async function handler(req, res) {
    // ikas'tan gelen isteklere izin ver (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Yalnızca POST' });

    try {
        const { image, style } = req.body;
        
        if (!process.env.REPLICATE_API_TOKEN) {
            throw new Error("REPLICATE_API_TOKEN Vercel'de eksik!");
        }

        const replicate = new Replicate({
            auth: process.env.REPLICATE_API_TOKEN,
        });

        // PhotoMaker Modelini Tetikle
        const output = await replicate.run(
            "tencentarc/photomaker:ddfc2b6a",
            {
                input: {
                    input_image: image,
                    prompt: `img a ${style} style character, cinematic lighting, high resolution`,
                    num_steps: 30,
                    style_strength_ratio: 20
                }
            }
        );

        return res.status(200).json({ imageUrl: output[0] });
    } catch (error) {
        console.error("Hata Mesajı:", error.message);
        return res.status(500).json({ error: error.message });
    }
}
