const searchFood = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    if (searchText == '') {
        alert('put something')
    }
    else {
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearch(data.meals))
        document.getElementById('coocking').innerHTML = ''
    }
}

const displaySearch = (meals) => {
    const searchResult = document.getElementById('search-result');
    searchResult.innerHTML = '';
    if (meals == null) {
        alert(`didn't match`)
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'none';
    }
    else {
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add = 'col';
            div.innerHTML = `
    <div onclick="showDetails(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 220)}...</p>
            </div>
    `
            searchResult.appendChild(div)
        });
        const spinner = document.getElementById('spinner');
        spinner.style.display = 'none';
    }
}

const showDetails = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => cook(data.meals[0]))
}

const cook = details => {
    const cooking = document.getElementById('coocking');
    cooking.innerHTML = `
                            <h2 class="text-center text-info opacity-50">Coocking tips of ${details.strMeal}</h2>
                            <button type="button" id="btn" onclick="document.getElementById('coocking').innerHTML=''" class="btn-close" aria-label="Close"></button>
                            <p class="overflow-auto mh-25" style="max-height:180px;">${details.strInstructions}</p>

`
}