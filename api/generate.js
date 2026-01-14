import Replicate from "replicate";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    try {
        const { image, style } = req.body;
        const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

        const output = await replicate.run(
            "tencentarc/photomaker:ddfc2b6a",
            {
                input: {
                    input_image: image,
                    prompt: `img a ${style} style character`,
                    num_steps: 20,
                    style_strength_ratio: 15
                }
            }
        );

        return res.status(200).json({ imageUrl: output[0] });
    } catch (error) {
        // Hatanın ne olduğunu ikas ekranında görmek için hatayı gönderiyoruz
        return res.status(500).json({ error: error.message });
    }
}
