const axios = require('axios');

const ELEMENT14_API_URL = 'http://api.element14.com/catalog/products';
const ELEMENT14_API_KEY = 'wb9wt295qf3g6m842896hh2u';

const getPrice = async (partNumber, volume) => {
  try {
    const response = await axios.get(ELEMENT14_API_URL, {
      params: {
        term: `manuPartNum:${partNumber}`,
        'storeInfo.id': 'in.element14.com',
        'resultsSettings.offset': 0,
        'resultsSettings.numberOfResults': 1,
        'resultsSettings.refinements.filters': 'inStock',
        'resultsSettings.responseGroup': 'medium',
        'callInfo.omitXmlSchema': false,
        'callInfo.callback': '',
        'callInfo.responseDataFormat': 'json',
        'callinfo.apiKey': ELEMENT14_API_KEY
      }
    });

    const products = response.data.manufacturerPartNumberSearchReturn.products;

    if (!products || products.length === 0) return null;

    const product = products[0];
    const priceBreaks = product.prices;

    let bestPrice = null;

    for (const priceBreak of priceBreaks) {
      if (volume >= priceBreak.from && volume <= priceBreak.to) {
        const unitPrice = parseFloat(priceBreak.cost);
        bestPrice = {
          partNumber: product.translatedManufacturerPartNumber,
          manufacturer: product.vendorName,
          unitPrice: unitPrice,
          currency: 'USD', // Assuming currency is USD
          totalPrice: unitPrice * volume
        };
        break; // Found the correct price break, no need to continue
      }
    }

    return bestPrice;

  } catch (error) {
    console.error('Error fetching data from Element14:', error);
    return null;
  }
};

module.exports = { getPrice };
