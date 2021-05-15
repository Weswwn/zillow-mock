const cors = require('cors');
const morgan = require('morgan');
const csv = require('csv-parser');
const express = require('express');
const fs = require('fs');
const results = [];
let listOfNormalizedResults = [];
// ['ADDRESS', 'CITY', 'STATE OR PROVINCE', 'ZIP OR POSTAL CODE']

const normalizeStringHelper = (string) => {
  const arrOfWords = string.toLowerCase().split(' ');
  const normalizedArr = arrOfWords.map(word => {
    const formattedString = `${word[0].toUpperCase()}${word.substring(1)}`;
    return formattedString;
  });
  return normalizedArr.join(' ');
};

fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    listOfNormalizedResults = results.map(item => ({
        address: normalizeStringHelper(item.ADDRESS),
        city: normalizeStringHelper(item.CITY),
        zip: item['ZIP OR POSTAL CODE'],
        state: item['STATE OR PROVINCE']
      }));
  });

const app = express();
const port = 3002;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/address', (req, res) => {
  const searchQuery = req.query.search.toLowerCase().trim();
  const matchedLocations = [];
  listOfNormalizedResults.forEach(location => {
    const combinedLocation = `${location.address} ${location.city} ${location.zip} ${location.state}`;
    if (location.address.toLowerCase().trim().includes(searchQuery) ||
        location.city.toLowerCase().trim().includes(searchQuery) ||
        location.zip.toLowerCase().trim().includes(searchQuery) ||
        location.state.toLowerCase().trim().includes(searchQuery) || 
        combinedLocation.toLowerCase().trim().includes(searchQuery)
    ) {
      matchedLocations.push(location);  
    }
  });
  res.status(200).send(matchedLocations);
});



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});