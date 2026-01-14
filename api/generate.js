import Replicate from "replicate";

// DİKKAT: Anahtarı buraya elle yazmıyoruz, Vercel'den güvenli şekilde çekiyoruz.
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  // ikas ve tarayıcı güvenlik izinleri
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: "Sadece POST" });

  try {
    const { image, style } = req.body;
    if (!image) return res.status(400).json({ error: "Resim yüklenmedi" });

    // Replicate üzerinden Image-to-Image işlemi
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
    // Hatayı ikas ekranında görebilmen için detaylı gönderiyoruz
    return res.status(500).json({ error: error.message });
  }
}
