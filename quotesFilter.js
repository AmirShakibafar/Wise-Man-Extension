const fs = require('fs');

// Load the JSON file
const jsonData = JSON.parse(fs.readFileSync('quotes.json', 'utf8'));

// Function to iterate and modify quotes based on conditions
function processQuotes() {
    let count = 0
    for (const quote of jsonData.quotes) {
        if (quote.quote.length + quote.author.length + 3 > 142) {
            quote.toDelete = true;
            count ++;
        }
    }
    jsonData.quotes = jsonData.quotes.filter(quote => !quote.toDelete);
    jsonData.total = jsonData.total - count
}
// Run processQuotes function
processQuotes()
// Save the updated JSON back to the file
fs.writeFileSync('filteredQuotes.json', JSON.stringify(jsonData, null, 4));
