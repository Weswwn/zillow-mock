const cors = require('cors');
const morgan = require('morgan');
const csv = require('csv-parser');
const express = require('express');
const fs = require('fs');
const results = [];
let listOfNormalizedResults = [];
// ['ADDRESS', 'CITY', 'STATE OR PROVINCE', 'ZIP OR POSTAL CODE']
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    listOfNormalizedResults = results.map(item => ({
      address: item.ADDRESS,
      city: item.CITY,
      zip: item['ZIP OR POSTAL CODE'],
      state: item['STATE OR PROVINCE']
    }))
  })

const app = express();
const port = 3002;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get(`/address`, (req, res) => {
  const searchQuery = req.query.search.toLowerCase().trim();
  console.log(searchQuery);
  const matchedLocations = [];
  listOfNormalizedResults.forEach(location => {
    console.log(location.address.toLowerCase().trim())
    if (location.address.toLowerCase().trim().includes(searchQuery) ||
        location.city.toLowerCase().trim().includes(searchQuery) ||
        location.zip.toLowerCase().trim().includes(searchQuery) ||
        location.state.toLowerCase().trim().includes(searchQuery)
    ) {
      matchedLocations.push(location);  
    }
  })
  res.send(matchedLocations).sendStatus(200);
})



app.listen(port, () => {
  console.log(`Mock listening at http://localhost:${port}`)
})