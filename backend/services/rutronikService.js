const axios = require('axios');

const RUTRONIK_API_URL = 'https://www.rutronik24.com/api/search';
const RUTRONIK_API_KEY = 'cc6qyfg2yfis';

const getPrice = async (partNumber, volume) => {
  try {
    const response = await axios.get(RUTRONIK_API_URL, {
      params: {
        apikey: RUTRONIK_API_KEY,
        searchterm: partNumber
      }
    });

    const products = response.data;

    if (!products || products.length === 0) return null;

    const product = products[0];
    const priceBreaks = product.pricebreaks;

    if (!priceBreaks || priceBreaks.length === 0) return null;

    let bestPrice = null;
    let basePrice = parseFloat(product.price); // Base price for quantities below the first price break

    // Check if the volume is less than the first price break
    if (volume < priceBreaks[0].quantity && volume>0) {
      bestPrice = {
        partNumber: product.mpn,
        manufacturer: product.manufacturer,
        unitPrice: basePrice,
        currency: product.currency
      };
    } else {
      // Find the best price based on the price breaks
      for (const priceBreak of priceBreaks) {
        if (volume >= priceBreak.quantity) {
          const unitPrice = parseFloat(priceBreak.price);
          if (!bestPrice || unitPrice < bestPrice.unitPrice) {
            bestPrice = {
              partNumber: product.mpn,
              manufacturer: product.manufacturer,
              unitPrice: unitPrice,
              currency: product.currency
            };
          }
        }
      }
    }

    if (bestPrice) {
      bestPrice.totalPrice = bestPrice.unitPrice * volume;
    }

    return bestPrice;

  } catch (error) {
    console.error('Error fetching data from Rutronik:', error);
    return null;
  }
};

module.exports = { getPrice };
