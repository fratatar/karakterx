import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { image, style } = req.body;
    if (!image) return res.status(400).json({ error: "Resim yüklenmedi" });

    const output = await replicate.run(
      "stability-ai/sdxl:7762fd39730083977f570bb4a73ad791057d36a0d0d4d0034c7c30497be2517a",
      {
        input: {
          image: `data:image/jpeg;base64,${image}`,
          prompt: `A ${style} style character portrait, 3d render, masterpiece, high quality, 8k resolution`,
          image_strength: 0.45,
          guidance_scale: 7.5
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;
    return res.status(200).json({ imageUrl: imageUrl });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
