// home page
let page = 1;

// button previous page
const btnPrev = document.getElementById('btnPrev');
btnPrev.addEventListener('click', () =>{
    if(page > 1){
        page -= 1;
        getMovies();
    }
});

// button next page
const btnNext = document.getElementById('btnNext');
btnNext.addEventListener('click', () =>{
    if(page < 1000){
        page += 1;
        getMovies();
    }
});

// api request movies
const getMovies = async () =>{
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=514b087562a5b5f4f0136590c7714195&page=${page}`);
        // response status ok
        if(response.status === 200){
            const data = await response.json();
            let movies = '';
            data.results.forEach(movie => {
                movies += `
                    <div class='movie'>
                        <img class='poster' src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                        <div class='overview'>
                            <h3>Overview</h3>
                            <p>${movie.overview}</p>
                        </div>
                        <h3 class='title'>${movie.title}</h3>
                    </div>
                    
                `;
            });
            document.getElementById('content').innerHTML = movies;
        } else if (response.status === 401){
            console.log('Wrong API key introduced');
        } else if (response.status === 404){
            console.log(`The movie you're looking for doesn't exists.`);
        } else {
            console.log('There was an unknown error.');
        }
    } catch(error){
        console.log(error)
    }
}

getMovies();

const pageIndex = document.getElementById('index');


// return to home
function goHome(){
    page = 1;
    getMovies();
    input.value = '';
    pageIndex.style.visibility='visible';
}

const searchbar = document.getElementById('searchbar');
const input = document.getElementById('input');

function searchMovie(){
    const searchTerm = input.value;
    if(searchTerm) {
        const getResults = async () =>{
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=514b087562a5b5f4f0136590c7714195&query=${searchTerm}&page=${page}`);
                // response status ok
                if(response.status === 200){
                    const data = await response.json();
                    let movies = '';
                    data.results.forEach(movie => {
                        movies += `
                            <div class='movie'>
                                <img class='poster' src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                                <div class='overview'>
                                    <h3>Overview</h3>
                                    <p>${movie.overview}</p>
                                </div>
                                <h3 class='title'>${movie.title}</h3>
                            </div>
                            
                        `;
                    });
                    document.getElementById('content').innerHTML = movies;
                } else if (response.status === 401){
                    console.log('Wrong API key introduced');
                } else if (response.status === 404){
                    prompt(`The movie you're looking for doesn't exists.`);
                } else {
                    prompt('There was an unknown error.');
                }
            } catch(error){
                console.log(error)
            }
        }
        ;
        getResults();
        pageIndex.style.visibility="hidden";
    }
}