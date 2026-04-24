import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as any,
});

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
    const { serviceTitle, servicePrice, serviceDuration, therapistName, date, time, customerName, customerEmail } = req.body;

    if (!serviceTitle || !servicePrice || !therapistName || !date || !time) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Parse price string like "$50" or "$80" to cents
    const priceNum = parseFloat(servicePrice.replace(/[^0-9.]/g, ''));
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: 'Precio inválido' });
    }
    const amountInCents = Math.round(priceNum * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceTitle,
              description: `Sesión con ${therapistName} — ${date} a las ${time} (${serviceDuration || 60} min)`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        serviceTitle,
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
