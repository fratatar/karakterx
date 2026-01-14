import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default async function handler(req, res) {
  // CORS ayarları (ikas'ın bağlanabilmesi için)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { image, style } = req.body;

  const prompts = {
    chibi: "chibi style, 3d render, toy figure, cute, big eyes",
    funko: "funko pop style, vinyl toy, big head, small body",
    pixar: "pixar 3d movie style, cinematic lighting, cute character",
    hasbro: "hasbro action figure style, plastic texture, articulated joints",
    roma: "white marble roman bust, ancient sculpture style",
    modern: "modern designer toy, urban vinyl style, high detail"
  };

  try {
    const output = await replicate.run(
      "fofr/face-to-many:e411ba18e7751939", //
      {
        input: {
          image: image,
          style: style,
          prompt: prompts[style] || prompts.modern,
          instant_id_strength: 0.8 //
        }
      }
    );
    res.status(200).json({ imageUrl: output[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}