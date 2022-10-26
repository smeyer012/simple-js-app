let currencyRepository = (function() {

  // sets up array of currency objects
  let currencyList = [
    {name: 'United States Dollar', code: 'USD', symbol: '\u0024', rate: 0.9673 },
    {name: 'Euro', code: 'EUR', symbol: '\u20AC', rate: 1 },
    {name: 'British Pound Sterling', code: 'GPB', symbol: '\u00A3', rate: 0.6088 }
  ];

  // creates function to add a currency object to the array
  function add(currency) {
    // checks that new entry is an object and tests if the keys match with the existing object
    if (typeof currency === "object" && checkCurrencyKeys(currency, currencyList[0])) {
      // adds new object to currencyList array
      currencyList.push(currency);
    }
  }

  // adds new object entry to unordered list
  function addListItem(newCurrency) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = newCurrency.name;
    button.classList.add('currency_button');
    listItem.appendChild(button);
    currencies.appendChild(listItem);
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

  // creates search function that filters the currency array objects by exchange rate
  function searchList(button) {

    // sets up HTML element to display the results within
    let searchlist = document.getElementById("searchResultList");

    // filter function
    let searchResults = currencyList.filter(function (currency) {
      if (currency.rate < 1) {
        return true;
      }
      return false;
    });

    // adds results of filter to an unordered list
    let currencyListInner = '';
    searchResults.forEach(function (searchArrayItem) {
      currencyListInner = currencyListInner + '<li>' + searchArrayItem.name + ' - rate: ' + searchArrayItem.rate + '</li>';
    });
    searchlist.innerHTML = currencyListInner;

    // hides search button once clicked
    button.style.display = 'none';

  }

  // creates keys that allow the functions to be accessible outside of the scope of this function's state
  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    searchList: searchList
  };

})();

// tests add function
currencyRepository.add({ name: 'Japanese Yen', code: 'JPY', symbol: '\u00A5', rate: 101.71 }); // will be added
currencyRepository.add({ name: 'something', color: 'red', size: 10, function: 'task' }); // will not pass checkCurrencyKeys
console.log(currencyRepository.getAll());

// assigns array of currency objects to allCurrencies variable
let allCurrencies = currencyRepository.getAll();

// sets up HTML element to display the currency list within
let currencies = document.querySelector("#currencies");

// loops through all available currencies and adds them to an unordered list
allCurrencies.forEach(function(currency) {
  currencyRepository.addListItem(currency);
});

// executes search function on click of searchbutton
let searchbutton = document.getElementById("searchbutton");
searchbutton.addEventListener("click", function() {
  currencyRepository.searchList(searchbutton);
});
