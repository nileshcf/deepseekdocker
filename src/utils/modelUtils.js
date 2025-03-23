const tf = require('@tensorflow/tfjs');

const preprocessData = (data) => {
    const features = data.map(item => [item.feature1, item.feature2]); // Adjust based on your data
    const labels = data.map(item => item.label); // Adjust based on your data

    return {
        features: tf.tensor2d(features),
        labels: tf.tensor1d(labels),
    };
};

module.exports = { preprocessData };