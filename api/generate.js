const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Sadece POST' });

  try {
    const { image, style } = req.body;
    const output = await replicate.run(
      "tencentarc/photomaker:ddfc2b6a", // Kullandığın modelin adı
      { input: { input_image: image, prompt: `a ${style} style character` } }
    );
    res.status(200).json({ imageUrl: output[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
