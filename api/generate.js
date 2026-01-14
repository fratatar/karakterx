export default async function handler(req, res) {
    // 1. IFrame ve Dış Dünya İzinleri (CORS Ayarları)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Tarayıcıların ön kontrol (preflight) isteğine yanıt veriyoruz
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Frontend'den gelen stil bilgisini alıyoruz
        const { style } = req.body;
        
        // Her seferinde benzersiz resim üretmek için rastgele sayı (seed)
        const seed = Math.floor(Math.random() * 9999999);
        
        // Pollinations'ın ücretsiz ve hızlı FLUX modeline talimat gönderiyoruz
        const promptText = `${style} style 3D character portrait, high resolution, professional lighting, masterpiece`;
        const promptEncoded = encodeURIComponent(promptText);
        
        // Dokümantasyondaki yapıya uygun, API anahtarı gerektirmeyen URL
        const imageUrl = `https://gen.pollinations.ai/image/${promptEncoded}?model=flux&width=1024&height=1024&seed=${seed}&enhance=true&nologo=true`;

        // Başarılı sonucu frontend'e gönder
        return res.status(200).json({ imageUrl: imageUrl });

    } catch (error) {
        // Hata oluşursa 500 koduyla hatayı bildir
        return res.status(500).json({ error: error.message });
    }
}
