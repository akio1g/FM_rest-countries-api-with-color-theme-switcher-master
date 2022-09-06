window.addEventListener('DOMContentLoaded', noFilter());

function darkMode() {
    const tag = document.getElementById('darkmode');

    if(tag.href.includes('darkmode')) {
        tag.setAttribute('href','');
    } else {
        tag.setAttribute('href','./css/darkmode.css');
    }
}


/** noFilter()
 * * load all countries without any filter
 */
async function noFilter() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,');
        const data = await response.json();
        for (let country of data) {
            const flag = country.flags.svg;
            const name = country.name.common;
            const population = country.population;
            const region = country.region;
            const capital = country.capital;
            loadSections(flag, name, population, region, capital);
        }
    } catch (e) {
        alert('Error loading API');
    } finally {
        document.getElementById('loader').style.display = 'none';
    }
}

/** loadSections()
 * * this function increment a section tag with the infos in the parameter
 */
function loadSections(flagsrc, countryName, countryPopulation, countryRegion, countryCapital) {
    document.querySelector('article').innerHTML += 
        '<section class="country" onclick="onDetail(' + `\'${countryName}\'` + ')">' + 
            '<img id="country-image" src="' + flagsrc + '" alt="flag">' +
            '<div>' +
                '<h2 id="country-name">' + countryName + '</h2>' +
                '<h4>Population: <span id="country-population">' + countryPopulation + '</span></h4>' +
                '<h4>Region: <span id="country-region">' + countryRegion + '</span></h4>' + 
                '<h4>Capital: <span id="country-capital">' + countryCapital + '</span></h4>' + 
            '</div>'+
        '</section>';
}

/** clearSections()
 *  * clear the article tag and put a loader in the middle of the page
 */
function clearSections() {
    document.querySelector('article').innerHTML = '<div id="loader" class="loader"></div>';
    document.getElementById('loader').style.display = 'block';
}

/** showMenu()
 *  * show the filter options
 */
function showMenu() {
    document.getElementById('region-options').classList.toggle('show-options');
}

/** filterByRegion()
 * * filter by the region
 * @param {REGION} regionFiltered 
 */
async function filterByRegion(regionFiltered) {
    try {
        clearSections();
        const response = await fetch(`https://restcountries.com/v3.1/region/${regionFiltered}?fields=name,capital,population,region,flags,`);
        const data = await response.json();
        for (let country of data) {
            const flag = country.flags.svg;
            const name = country.name.common;
            const population = country.population;
            const region = country.region;
            const capital = country.capital;
            loadSections(flag, name, population, region, capital);
        }
    } catch (e) {
        alert('Error loading API')
    } finally {
        document.getElementById('loader').style.display = 'none';
        showMenu();
    }
}

/** filterByCountry()
 * * filter by the country
 */
async function filterByCountry() {
    const countryFiltered = document.getElementById('text-search').value;
    if(countryFiltered) {
        clearSections();
        try {
            const response = await fetch (`https://restcountries.com/v3.1/name/${countryFiltered}?fields=name,capital,population,flags,`);
            const data = await response.json();
            for (let country of data) {
                const flag = country.flags.svg;
                const name = country.name.common;
                const population = country.population;
                const region = country.region;
                const capital = country.capital;
                loadSections(flag, name, population, region, capital);
            }
        } catch (e) {
            alert('Country not found');
            noFilter();
        } finally {
            document.getElementById('loader').style.display = 'none';
        }
    } else {
        clearSections();
        noFilter();
    }
}


async function onDetail(countryName) {
    clearSections();

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=flags,name,population,region,subregion,capital,tld,currencies,languages,borders,`);
        const data = await response.json();


    } catch(e) {
        alert('Fail Request');
    }
}

function loadDetails(flagsrc, name, nativeName, population, region, subRegion, capital, tld, currencies, languages) {
    
    
    let langString = '';
    for (let lang in languages) {
        langString += languages[lang];
    }
    
    document.getElementsByTagName('aside').style.display = 'none';
    document.getElementsByTagName('article').innerHTML = `
    <button id="back-btn" onclick="backToMenu()">&larr; Back</button>
    <section id="country-detail">
        <img src="${flagsrc}" alt="flag">
        <h1>${name}</h1>
        <div>
            <h4>Native Name: <span>${nativeName}</span></h4>
            <h4>Population: <span>${population}</span></h4>
            <h4>Region: <span>${region}</span></h4>
            <h4>Sub Region: <span>${subRegion}</span></h4>
            <h4>Capital: <span>${capital}</span></h4>
        </div>
        <div>
            <h4>TopLevel Domain: <span>${tld}</span></h4>
            <h4>Currencies: <span>${currencies}</span></h4>
            <h4>Languages: <span>${langString}</span></h4>
        </div>
        <div>
            <h2>Border Countries:</h2>
            <li id="borders-list">
            </li>
        </div>
    </section>`;
    const li = document.getElementById('borders-list');
    for(const c of borders) { // tem que testar
        let country = filterByCca3(c);
        li.innerHTML += `<button onclick="onDetail(${country})">${country}</button>`;
    }
}

async function filterByCca3(cca) {
    let countryName = '';
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3');
        const data = await response.json();

        const obj = data.filter(country => country.cca3 === cca); // filtra pra pegar o obj que tem o mesmo cca
        countryName = obj.name.common;
    } catch(e) {
        alert(e);
    }

    return countryName;
}