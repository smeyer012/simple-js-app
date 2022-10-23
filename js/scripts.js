let currencyRepository = (function() {

  // sets up array of currency objects
  let currencyList = [
    {name: 'United States Dollar', code: 'USD', symbol: '\u0024' },
    {name: 'Euro', code: 'EUR', symbol: '\u20AC' },
    {name: 'British Pound Sterling', code: 'GPB', symbol: '\u00A3' }
  ];

  // creates function to add a currency object to the array
  function add(currency) {
    currencyList.push(currency);
  }

  // creates function to return all objects in array
  function getAll() {
    return currencyList;
  }

  // returns functions as key-value pairs
  return {
    add: add,
    getAll: getAll
  };

})();

// tests functions
currencyRepository.add({ name: 'Japanese Yen', code: 'JPY', symbol: '\u00A5' });
console.log(currencyRepository.getAll());


// saves currency types as objects within the currencyList array

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
let allCurrencies = currencyRepository.getAll();
allCurrencies.forEach(function(currency) {
  document.write('<li>' + currency.name + ' (' + currency.symbol + ')');
  // displays text for European currency
  if (currency.code === 'EUR') {
    document.write(' - How European!');
  }
  document.write('</li>');
});
