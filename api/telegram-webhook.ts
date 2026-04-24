import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const update = req.body;
    console.log("Recibido webhook de Telegram:", JSON.stringify(update, null, 2));

    // Solo procesamos si es un mensaje de texto y si es una respuesta a otro mensaje
    if (update.message && update.message.reply_to_message && update.message.text) {
      const originalText = update.message.reply_to_message.text || update.message.reply_to_message.caption;
      const botReply = update.message.text;
      
      console.log("Texto original:", originalText);
      console.log("Respuesta del bot:", botReply);

      // Extraer el sessionId del mensaje original.
      const match = originalText?.match(/ID:\s*([a-f0-9\-]+)/i);
      console.log("Regex match:", match);
      
      if (match && match[1]) {
        const sessionId = match[1];
        console.log("Session ID extraído:", sessionId);

        const supabaseUrl = process.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

        if (supabaseUrl && supabaseAnonKey) {
          const supabase = createClient(supabaseUrl, supabaseAnonKey);

          const { error } = await supabase.from('chat_messages').insert([{
            session_id: sessionId,
            role: 'bot',
            content: botReply
          }]);

          if (error) {
            console.error("Error al insertar el mensaje en Supabase:", error);
          } else {
            console.log("Mensaje insertado con éxito en Supabase");
          }
        } else {
           console.error("Faltan las credenciales de Supabase en el webhook");
        }
      } else {
        console.log("No se pudo encontrar el ID en el mensaje original");
      }
    } else {
      console.log("El update no es una respuesta válida. Faltan propiedades:", Object.keys(update.message || {}));
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error procesando el Webhook de Telegram:', error);
    return res.status(200).json({ ok: true });
  }
}
