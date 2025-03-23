const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const path = require('path');
const { preprocessData } = require('../utils/modelUtils');

const trainModel = async (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(path.join(__dirname, '../../uploaded-data.json')));
        const { features, labels } = preprocessData(data);

        const model = tf.sequential();
        model.add(tf.layers.dense({ units: 10, inputShape: [2], activation: 'relu' }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

        model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

        await model.fit(features, labels, { epochs: 10, batchSize: 32, validationSplit: 0.2 });

        await model.save('file://./trained-model');
        res.status(200).json({ message: 'Model trained and saved' });
    } catch (error) {
        res.status(500).json({ error: 'Error training model', details: error.message });
    }
};

const predict = async (req, res) => {
    const input = req.body.input;

    try {
        const model = await tf.loadLayersModel('file://./trained-model/model.json');
        const prediction = model.predict(tf.tensor2d([input]));
        res.status(200).json({ prediction: prediction.arraySync() });
    } catch (error) {
        res.status(500).json({ error: 'Error making prediction', details: error.message });
    }
};

module.exports = { trainModel, predict };