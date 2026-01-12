const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./backend/routes');

const app = express();

// Allow requests from your frontend (localhost:3000)
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use('/api', routes);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});