const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
const objectionRoutes = require('./routes/objectionRoutes');
const scriptRoutes = require('./routes/scriptRoutes');

app.use('/api/objections', objectionRoutes);
app.use('/api/scripts', scriptRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
