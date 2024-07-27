const axios = require('axios');

const MOUSER_API_URL = 'https://api.mouser.com/api/v1/search/partnumber?apiKey=82675baf-9a58-4d5a-af3f-e3bbcf486560';

const getPrice = async (partNumber, volume) => {
  try {
    const response = await axios.post(
      MOUSER_API_URL,
      {
        SearchByPartRequest: {
          mouserPartNumber: partNumber,
          partSearchOptions: 'string'
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const res = response.data.SearchResults.Parts;
    const parts=res.filter(part =>part.ManufacturerPartNumber === partNumber);

    if (!parts || parts.length === 0) return null;

    let bestPrice = null;

    for (const part of parts) {
      const priceBreaks = part.PriceBreaks;

      if (!priceBreaks || priceBreaks.length === 0) continue;

      for (const priceBreak of priceBreaks) {
        if (volume >= priceBreak.Quantity) {
          const unitPrice = parseFloat(priceBreak.Price.replace('₹', ''));
          if (!bestPrice || unitPrice < bestPrice.unitPrice) {
            bestPrice = {
              partNumber: part.ManufacturerPartNumber,
              manufacturer: part.Manufacturer,
              unitPrice: unitPrice,
              currency: priceBreak.Currency
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
    console.error('Error fetching data from MOUSER:', error.response ? error.response.data : error.message);
    return null;
  }
};

module.exports = { getPrice };
