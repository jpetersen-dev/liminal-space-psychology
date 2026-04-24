import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any,
});

// Map service IDs to prices in cents (USD)
const SERVICE_PRICES: Record<string, { amount: number; name: string }> = {
  s1: { amount: 5000, name: 'Psicoterapia Individual (Online) - 60 min' },
  s2: { amount: 8000, name: 'Terapia de Pareja Transcultural - 90 min' },
  s3: { amount: 5000, name: 'Acompañamiento en Migración - 60 min' },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    console.error('Falta STRIPE_SECRET_KEY en las variables de entorno');
    return res.status(500).json({ error: 'Missing Stripe configuration' });
  }

  try {
    const { serviceId, therapistName, date, time, customerName, customerEmail } = req.body;

    if (!serviceId || !therapistName || !date || !time || !customerEmail) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const service = SERVICE_PRICES[serviceId];
    if (!service) {
      return res.status(400).json({ error: 'Servicio no encontrado' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: service.name,
              description: `Sesión con ${therapistName} — ${date} a las ${time}`,
              images: ['https://liminal-space-psychology.vercel.app/logo.png'],
            },
            unit_amount: service.amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        serviceId,
        therapistName,
        date,
        time,
        customerName: customerName || '',
      },
      success_url: `${req.headers.origin || 'https://liminal-space-psychology.vercel.app'}/?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://liminal-space-psychology.vercel.app'}/?payment=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Error creando sesión de Stripe:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
