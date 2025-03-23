const { processJsonData, processCsvData, processTextData } = require('../utils/dataProcessor');
const fs = require('fs');
const path = require('path');

const uploadData = async (req, res) => {
    const { dataType, data } = req.body;
    const file = req.file;

    try {
        let processedData;

        switch (dataType) {
            case 'json':
                processedData = processJsonData(data);
                break;
            case 'csv':
                processedData = await processCsvData(file.path);
                break;
            case 'text':
                processedData = processTextData(data);
                break;
            default:
                return res.status(400).json({ error: 'Invalid data type' });
        }

        // Save processed data
        const filePath = path.join(__dirname, '../../uploaded-data.json');
        fs.writeFileSync(filePath, JSON.stringify(processedData, null, 2));

        res.status(200).json({ message: 'Data processed and saved', data: processedData });
    } catch (error) {
        res.status(500).json({ error: 'Error processing data', details: error.message });
    }
};

module.exports = { uploadData };