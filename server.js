const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Use CORS middleware
app.use(cors({ origin: 'https://country-info-website-49l38y7lp-omrajpals-projects.vercel.app' }));

// Define the route with the countryName parameter
app.get('/api/country/:countryName', async (req, res) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${req.params.countryName}`);
    if (response.data && response.data.length > 0) {
      res.json(response.data[0]);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'Country not found' });
    } else {
      res.status(500).json({ error: 'Failed to fetch country data' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
