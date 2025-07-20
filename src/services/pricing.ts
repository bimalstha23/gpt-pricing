import axios from 'axios';

const getPricing = async () => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const res = await axios({
      method: 'get',
      baseURL: baseUrl,
      url: '/api/pricing',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    throw error;
  }
};

export default getPricing;
