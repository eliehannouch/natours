/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const bookTour = async tourId => {
  const stripe = Stripe(
    'pk_test_51I5qGhI7fNLNv4uJMcx5dVfpME1mLVHE0NLbw8sEHMEcwbU7oC9Yly3a9x7DyT2i0N3fcxIrwRmzOuYaCuEQa86w00fTVF1BgQ'
  );

  try {
    // 1. Get checkout session from the API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
