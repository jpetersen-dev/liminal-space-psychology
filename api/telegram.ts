export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Falta TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en las variables de entorno");
    return res.status(500).json({ error: 'Missing Telegram configuration' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: `*Nuevo mensaje de paciente:*\n\n${message}`,
        parse_mode: 'Markdown'
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.text();
      console.error(`Error de Telegram: ${errorData}`);
      return res.status(500).json({ error: 'Failed to send message to Telegram' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error procesando la solicitud:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
