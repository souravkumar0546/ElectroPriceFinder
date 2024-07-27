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

    const res = response.data;
    const parts=res.filter(part =>part.mpn === partNumber);;


    if (!parts || parts.length === 0) return null;

    let bestPrice = null;

    for (const part of parts) {
      const priceBreaks = part.pricebreaks;
      if (!priceBreaks || priceBreaks.length === 0) continue;

      let basePrice = parseFloat(part.price);

      if (volume < priceBreaks[0].quantity && volume > 0) {
        const unitPrice = basePrice;
        if (!bestPrice || unitPrice < bestPrice.unitPrice) {
          bestPrice = {
            partNumber: part.mpn,
            manufacturer: part.manufacturer,
            unitPrice: unitPrice,
            currency: part.currency
          };
        }
      } else{
        for (const priceBreak of priceBreaks) {
          if (volume >= priceBreak.quantity) {
            const unitPrice = parseFloat(priceBreak.price);
            if (!bestPrice || unitPrice < bestPrice.unitPrice) {
              bestPrice = {
                partNumber: part.mpn,
                manufacturer: part.manufacturer,
                unitPrice: unitPrice,
                currency: part.currency
              };
            }
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
