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

    const res = response.data.manufacturerPartNumberSearchReturn.products;
    const parts = res.filter(part =>part.translatedManufacturerPartNumber === partNumber);

    if (!parts || parts.length === 0) return null;

    let bestPrice = null;

    for (const part of parts) {
      const priceBreaks = part.prices;

      if (!priceBreaks || priceBreaks.length === 0) continue;

      for (const priceBreak of priceBreaks) {
        if (volume >= priceBreak.from && volume <= priceBreak.to) {
          const unitPrice = parseFloat(priceBreak.cost);
          if (!bestPrice || unitPrice < bestPrice.unitPrice) {
            bestPrice = {
              partNumber: part.translatedManufacturerPartNumber,
              manufacturer: part.vendorName,
              unitPrice: unitPrice,
              currency: 'INR', // Assuming currency is INR
              totalPrice: unitPrice * volume
            };
          }
        }
      }
    }

    return bestPrice;


  } catch (error) {
    console.error('Error fetching data from Element14:', error);
    return null;
  }
};

module.exports = { getPrice };
