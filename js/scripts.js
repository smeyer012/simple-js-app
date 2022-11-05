let currencyRepository = (function() {

  // sets up array of currency objects
  // let currencyList = [
  //   {name: 'United States Dollar', code: 'USD', symbol: '\u0024', rate: 0.9673 },
  //   {name: 'Euro', code: 'EUR', symbol: '\u20AC', rate: 1 },
  //   {name: 'British Pound Sterling', code: 'GPB', symbol: '\u00A3', rate: 0.6088 }
  // ];

  let currencyList = [];
  let comparisonArray = [
    {name: 'USA', rate: 0.1}
  ];
  let apiUrl = 'https://api.vatcomply.com/rates';

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      let obj = json.rates;
      for (const property in obj) {
        let currency = {
          name: property,
          rate: obj[property]
        };
        add(currency);
      }
    }).catch(function (e) {
      console.error(e);
    })
  }

  // creates function to add a currency object to the array
  function add(currency) {
    // checks that new entry is an object and tests if the keys match with the existing object
    if (typeof currency === "object" && checkCurrencyKeys(currency, comparisonArray[0])) {
      // adds new object to currencyList array
      currencyList.push(currency);
    }
  }

  // sets up HTML element to display the currency list within
  let currencies = document.querySelector("#currencies");

  // adds new object entry to unordered list
  function addListItem(currency) {
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = currency.name;
    button.classList.add('currency_button');
    addEvL(button, 'click', showDetails, currency)
    // button.addEventListener("click", function() {
    //   showDetails(currency);
    // });
    listItem.appendChild(button);
    currencies.appendChild(listItem);
  }

  // toggles display of currency information
  function showDetails(currency) {
    console.log(currency);
  }

  // function to add addEventListener
  function addEvL(element, event='click', function_name, parameter) {
    element.addEventListener(event, function() {
      function_name(parameter);
    });
  }

  // checks if new currency object's keys match currencyList
  function checkCurrencyKeys(currency, comparisonArray) {
    //gets existing and new object array entries
    let newObjKeys = Object.keys(currency);
    let currObjKeys = Object.keys(comparisonArray);

    /* loops through each key of an existing object and checks that 
    the new object has the key -- will return false at the first 
    instance of a mismatch */
    return currObjKeys.every((key) => {
      return newObjKeys.includes(key);
    });

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
    loadList: loadList,
    searchList: searchList
  };

})();

// assigns array of currency objects to allCurrencies variable
let allCurrencies = currencyRepository.getAll();

currencyRepository.loadList().then(function() {
  // Now the data is loaded! 
  // loops through all available currencies and adds them to an unordered list
  allCurrencies.forEach(function(currency){
    currencyRepository.addListItem(currency);
  });
});

// executes search function on click of searchbutton
let searchbutton = document.getElementById("searchbutton");
searchbutton.addEventListener("click", function() {
  currencyRepository.searchList(searchbutton);
});
