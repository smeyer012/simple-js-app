let currencyRepository = (function() {

  // sets up array of currency objects
  let currencyList = [
    {name: 'United States Dollar', code: 'USD', symbol: '\u0024' },
    {name: 'Euro', code: 'EUR', symbol: '\u20AC' },
    {name: 'British Pound Sterling', code: 'GPB', symbol: '\u00A3' }
  ];

  // creates function to add a currency object to the array
  function add(currency) {
    // checks that new entry is an object and tests if the keys match with the existing object
    if (typeof currency === "object" && checkCurrencyKeys(currency, currencyList[0])) {
      // adds new object to currencyList array
      currencyList.push(currency);
    }
  }

  // checks if new currency object's keys match currencyList
  function checkCurrencyKeys(currency, currencyList) {
    //gets existing and new object array entries
    let newObjKeys = Object.keys(currency);
    let currObjKeys = Object.keys(currencyList);

    //sets up utilitarian variables
    let keyMatch = [];
    let i = 0;

    //first test that the new object has the same number of keys
    if (newObjKeys.length === currObjKeys.length) {
      //loops through existing keys
      currObjKeys.forEach(function(key) {
        //checks if new object has each key and creates an array of true/false
        if(newObjKeys.includes(key)) {
          keyMatch[i] = true;
        }
        else {
          keyMatch[i] = false;
        }
        i++;
      });
      //checks array for a false match
      if(!keyMatch.includes(false)) {
        return true;
      } else {
        return false;
      }
    }
    else{
      return false;
    }

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
currencyRepository.add({ name: 'Japanese Yen', code: 'JPY', symbol: '\u00A5' }); // will be added
currencyRepository.add({ name: 'something', color: 'red', size: 10 }); // will not pass checkCurrencyKeys
console.log(currencyRepository.getAll());


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
