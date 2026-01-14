import Replicate from "replicate";

const replicate = new Replicate({
  auth: "r8_7IPOZOjFRvPOOGXSTla5SmLliOVf6Gw0JOesV", // Senin verdiğin key
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const { image, style } = req.body;
    if (!image) throw new Error("Resim yüklenmedi.");

    // Image-to-Image (Kullanıcının resmini senin stiline dönüştüren model)
    const output = await replicate.run(
      "stability-ai/sdxl:7762fd39730083977f570bb4a73ad791057d36a0d0d4d0034c7c30497be2517a",
      {
        input: {
          image: `data:image/jpeg;base64,${image}`,
          prompt: `A character in ${style} style, masterpiece, high quality, 8k resolution`,
          image_strength: 0.45, // Resmi ne kadar değiştireceği (0.1 az, 0.9 çok)
          guidance_scale: 7.5
        }
      }
    );

    const imageUrl = Array.isArray(output) ? output[0] : output;
    return res.status(200).json({ imageUrl: imageUrl });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
