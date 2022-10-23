// saves currency types as objects within the currencyList array
let currencyList = [
  {name: 'United States Dollar', code: 'USD', symbol: '\u0024' },
  {name: 'Euro', code: 'EUR', symbol: '\u20AC' },
  {name: 'British Pound Sterling', code: 'GPB', symbol: '\u00A3' }
];

// loops through list of currency and writes name and symbol into a list item
// for (let i=0; i<currencyList.length; i++) {
//   document.write('<li>' + currencyList[i].name + ' (' + currencyList[i].symbol + ')');
//   // displays text for European currency
//   if (currencyList[i].code === 'EUR') {
//     document.write(' - How European!');
//   }
//   document.write('</li>');
// }

// loops through each object in the currency array and writes the currency name and symbol into a list item
currencyList.forEach(function(currency) {
  document.write('<li>' + currency.name + ' (' + currency.symbol + ')');
  // displays text for European currency
  if (currency.code === 'EUR') {
    document.write(' - How European!');
  }
  document.write('</li>');
});
