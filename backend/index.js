const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
  origin: 'http://localhost:3000', 
}));

app.use(express.json());

const searchRoutes = require('./routes/searchRoutes');
app.use('/api', searchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
