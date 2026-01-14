import Replicate from "replicate";

export default async function handler(req, res) {
  // CORS ayarları (ikas'tan erişim için)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Yalnızca POST istekleri kabul edilir.' });
  }

  try {
    const { image, style } = req.body;

    if (!process.env.REPLICATE_API_TOKEN) {
      throw new Error("REPLICATE_API_TOKEN eksik! Vercel Settings'e ekleyin.");
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Model çalıştırma
    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b6a",
      {
        input: {
          input_image: image,
          prompt: `a ${style} style character, high quality, masterpiece`,
          num_steps: 30
        }
      }
    );

    return res.status(200).json({ imageUrl: output[0] });
  } catch (error) {
    console.error("Hata Detayı:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
