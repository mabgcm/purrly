/* eslint-disable no-unused-vars */
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret);

admin.initializeApp();


exports.createStripeCheckoutSession = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        const { items, customerEmail } = req.body;

        const transformedItems = items.map(item => {
            console.log('Transformed Item:', {
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                imageUrl: item.imageUrl
            });  // Log the entire item to ensure everything is correct
            return {
                quantity: item.quantity,
                price_data: {
                    currency: 'usd',
                    unit_amount: item.price * 100,
                    product_data: {
                        name: item.name,
                        images: [item.imageUrl],  // Include the image URL here
                    },
                },
            };
        });

        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: transformedItems,
                mode: 'payment',
                success_url: 'https://dollshop.vercel.app/success',
                cancel_url: 'https://dollshop.vercel.app/cancel',
                customer_email: customerEmail,
            });

            res.status(200).json({ id: session.id });
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
});

