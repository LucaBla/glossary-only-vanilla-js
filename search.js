export function processSearchInput(event, searchResults, terms){
  var searchTerm = event.target.value.toLowerCase();
  var filteredTerms = terms.filter(function(term) {
    if(searchTerm !== ''){
      return term.title.toLowerCase().includes(searchTerm);
    }
    else{
      return null
    }
  });

  renderSearchResults(filteredTerms, searchTerm, searchResults);
}

function renderSearchResults(results, searchTerm, searchResults) {
  searchResults.innerHTML = '';

  if(searchTerm === ''){
    return
  }

  if (results.length === 0) {
    const listItem = document.createElement('li');
    listItem.textContent = 'Keine Ergebnisse gefunden';
    searchResults.appendChild(listItem);
  } 
  else {
    results.forEach(function(result) {
      const listItem = document.createElement('li');
      const link = document.createElement('a');

      link.href = 'show.html?id=' + result.id;
      link.innerHTML = result.title  + '<ion-icon name="chevron-forward-outline"></ion-icon>';
      listItem.appendChild(link);
      searchResults.appendChild(listItem);
    });
  }
}