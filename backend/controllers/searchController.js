const mouserService = require('../services/mouserService');
const rutronikService = require('../services/rutronikService');
const element14Service = require('../services/element14Service');

const convertCurrency = (price, currency) => {
  const rates = {
    USD: 84, // INR
    EUR: 90, // INR
  };
  return price * (rates[currency] || 1);
};

const searchParts = async (req, res) => {
  const { partNumber, volume } = req.body;

  try {
    const [mouserData, rutronikData, element14Data] = await Promise.all([
      mouserService.getPrice(partNumber, volume),
      rutronikService.getPrice(partNumber, volume),
      element14Service.getPrice(partNumber, volume),
    ]);

    const results = [
      { ...mouserData, dataProvider: 'Mouser', volume },
      { ...rutronikData, dataProvider: 'Rutronik', volume },
      { ...element14Data, dataProvider: 'Element14', volume },
    ].filter(result => result != null && result.unitPrice != null);

    results.forEach(result => {
      result.unitPrice = convertCurrency(result.unitPrice, result.currency);
      result.totalPrice = result.unitPrice * volume;
    });

    results.sort((a, b) => a.totalPrice - b.totalPrice);

    res.json(results);
  } catch (error) {
    console.error('Error processing search:', error);
    res.status(500).json({ error: 'Error processing search' });
  }
};

const updateCartPrice = async (req, res) => {
  const { partNumber, volume, dataProvider } = req.body;

  try {
    let updatedData;

    if (dataProvider === 'Mouser') {
      updatedData = await mouserService.getPrice(partNumber, volume);
    } else if (dataProvider === 'Rutronik') {
      updatedData = await rutronikService.getPrice(partNumber, volume);
    } else if (dataProvider === 'Element14') {
      updatedData = await element14Service.getPrice(partNumber, volume);
    }

    if (updatedData && updatedData.unitPrice != null) {
      updatedData.unitPrice = convertCurrency(updatedData.unitPrice, updatedData.currency);
      updatedData.totalPrice = updatedData.unitPrice * volume;
      updatedData={ ...updatedData, dataProvider: dataProvider,volume: volume}
      res.json(updatedData);
    } else {
      res.status(500).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error('Error updating cart price:', error);
    res.status(500).json({ error: 'Error updating cart price' });
  }
};

module.exports = { searchParts, updateCartPrice };
