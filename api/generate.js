import Replicate from "replicate";

// Anahtarı Vercel'deki Environment Variables'dan çeker
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  // Tarayıcı ve ikas güvenlik izinleri (CORS)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Ön kontrol isteği (Preflight)
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Sadece POST isteklerini kabul et
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Yalnızca POST isteği kabul edilir." });
  }

  try {
    const { image, style } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Resim verisi eksik." });
    }

    // Replicate Image-to-Image İşlemi
    const output = await replicate.run(
      "stability-ai/sdxl:7762fd39730083977f570bb4a73ad791057d36a0d0d4d0034c7c30497be2517a",
      {
        input: {
          image: `data:image/jpeg;base64,${image}`,
          prompt: `A ${style} style character portrait, 3d render, masterpiece, high quality, 8k resolution`,
          image_strength: 0.45,
          guidance_scale: 7.5,
          num_outputs: 1
        }
      }
    );

    // Çıktı formatını kontrol et ve linki dön
    const imageUrl = Array.isArray(output) ? output[0] : output;
    
    if (!imageUrl) throw new Error("Görsel oluşturulamadı.");

    return res.status(200).json({ imageUrl: imageUrl });

  } catch (error) {
    console.error("Replicate Hatası:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
