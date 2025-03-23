const csvParser = require('csv-parser');
const fs = require('fs');

const processJsonData = (data) => {
    return JSON.parse(data);
};

const processCsvData = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => results.push(row))
            .on('end', () => {
                fs.unlinkSync(filePath); // Delete the uploaded file
                resolve(results);
            })
            .on('error', (error) => reject(error));
    });
};

const processTextData = (data) => {
    return data.split('\n').map(line => line.trim());
};

module.exports = { processJsonData, processCsvData, processTextData };