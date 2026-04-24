import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const update = req.body;

    // Solo procesamos si es un mensaje de texto y si es una respuesta a otro mensaje
    if (update.message && update.message.reply_to_message && update.message.text) {
      const originalText = update.message.reply_to_message.text;
      const botReply = update.message.text;

      // Extraer el sessionId del mensaje original.
      // Esperamos el formato: "ID: {sessionId}"
      const match = originalText?.match(/ID:\s*([a-f0-9\-]+)/i);
      
      if (match && match[1]) {
        const sessionId = match[1];

        // Usamos las variables de entorno para conectarnos a Supabase
        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseAnonKey) {
          const supabase = createClient(supabaseUrl, supabaseAnonKey);

          // Guardamos la respuesta en la base de datos
          const { error } = await supabase.from('chat_messages').insert([{
            session_id: sessionId,
            role: 'bot',
            content: botReply
          }]);

          if (error) {
            console.error("Error al insertar el mensaje en Supabase:", error);
          }
        } else {
           console.error("Faltan las credenciales de Supabase en el webhook");
        }
      }
    }

    // Siempre debemos responder 200 OK a Telegram para que sepa que recibimos el mensaje
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error procesando el Webhook de Telegram:', error);
    // Respondemos 200 para que Telegram no intente re-enviar el mensaje repetidamente en caso de error
    return res.status(200).json({ ok: true });
  }
}
