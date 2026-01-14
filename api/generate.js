export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    try {
        const { image, style } = req.body;

        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-refiner-1.0",
            {
                headers: { 
                    Authorization: `Bearer ${process.env.HF_TOKEN}`,
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify({
                    inputs: `A ${style} style character masterpiece, high quality`,
                    image: image
                }),
            }
        );

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');

        return res.status(200).json({ imageUrl: `data:image/jpeg;base64,${base64}` });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
