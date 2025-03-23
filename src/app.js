const express = require('express');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes');
const modelRoutes = require('./routes/modelRoutes');
const { swaggerUi, specs } = require('./config/swagger');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/data', dataRoutes);
app.use('/api/model', modelRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});