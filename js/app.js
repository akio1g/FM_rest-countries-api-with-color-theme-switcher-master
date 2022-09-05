async function loadSections(flagsrc, countryName, countryPopulation, countryRegion, countryCapital) {
    document.querySelector('article').innerHTML += 
        '<section class="country">' + 
            '<img id="country-image" src="' + flagsrc + '" alt="flag">' +
            '<div>' +
                '<h2 id="country-name">' + countryName + '</h2>' +
                '<h4>Population: <span id="country-population">' + countryPopulation + '</span></h4>' +
                '<h4>Region: <span id="country-region">' + countryRegion + '</span></h4>' + 
                '<h4>Capital: <span id="country-capital">' + countryCapital + '</span></h4>' + 
            '</div>'+
        '</section>';
}