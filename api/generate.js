import Replicate from "replicate";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { image, style } = req.body;
        const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

        // ÇALIŞAN TAM MODEL ID'Sİ (ddfc2b...772f1)
        const output = await replicate.run(
            "tencentarc/photomaker:ddfc2b6a23f9d9f751b244743ce9405a051aeed4f9d0d7f4b11c13f993f772f1",
            {
                input: {
                    input_image: image,
                    prompt: `img a ${style} style character, masterpiece, high quality`,
                    num_steps: 30,
                    style_strength_ratio: 20
                }
            }
        );

        return res.status(200).json({ imageUrl: output[0] });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
