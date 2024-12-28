// Инициализация переменных
let page = 1;
let totalPages = 1;

// button previous page
const btnPrev = document.getElementById('btnPrev');
btnPrev.addEventListener('click', () => {
    if (page > 1) {
        page -= 1;
        getMovies();
    }
});

// button next page
const btnNext = document.getElementById('btnNext');
btnNext.addEventListener('click', () => {
    if (page < totalPages) {
        page += 1;
        getMovies();
    }
});

// API request movies
const getMovies = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=0a4b185412dd761023ebb7e1b0b10cea&page=${page}`);
        
        if (response.status === 200) {
            const data = await response.json();
            totalPages = data.total_pages;
            let movies = '';
            data.results.forEach(movie => {
                const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'default-poster.jpg';
                movies += `
                    <div class='movie' onclick="openMovie(${movie.id})">
                        <img class='poster' src="${posterUrl}" alt="${movie.title} Poster">
                        <div class='overview'>
                            <h3>Overview</h3>
                            <p>${movie.overview}</p>
                        </div>
                        <h3 class='title'>${movie.title}</h3>
                    </div>
                `;
            });
            document.getElementById('content').innerHTML = movies;

            // Update pagination button visibility
            btnPrev.style.display = page === 1 ? 'none' : 'inline-block';
            btnNext.style.display = page === totalPages ? 'none' : 'inline-block';

            // Add animations
            const movieElements = document.querySelectorAll('.movie');
            movieElements.forEach((movie, index) => {
                movie.style.animation = `fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) ${index * 0.1}s forwards`;
            });
        } else {
            handleError(response.status);
        }
    } catch (error) {
        console.error(error);
        alert('Error fetching movies. Please try again later.');
    }
};

// Error handling
function handleError(status) {
    if (status === 401) {
        alert('Wrong API key introduced.');
    } else if (status === 404) {
        alert('The movie you\'re looking for doesn\'t exist.');
    } else {
        alert('There was an unknown error.');
    }
}

// Open movie page
function openMovie(movieId) {
    window.location.href = `movie.html?id=${movieId}`;
}

// Initialize movie loading
getMovies();

// Search for movies
const searchbar = document.getElementById('searchbar');
const input = document.getElementById('input');

document.getElementById('search-btn').addEventListener('click', searchMovie);
input.addEventListener('input', searchMovie);

// Search function
function searchMovie() {
    const searchTerm = input.value.trim();

    if (searchTerm) {
        page = 1; // Начинаем с первой страницы для нового поиска
        const getResults = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=0a4b185412dd761023ebb7e1b0b10cea&query=${searchTerm}&page=${page}`);
                
                if (response.status === 200) {
                    const data = await response.json();
                    totalPages = data.total_pages;

                    let movies = '';
                    data.results.forEach(movie => {
                        const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'default-poster.jpg';
                        movies += `
                            <div class='movie' onclick="openMovie(${movie.id})">
                                <img class='poster' src="${posterUrl}" alt="${movie.title} Poster">
                                <div class='overview'>
                                    <h3>Overview</h3>
                                    <p>${movie.overview}</p>
                                </div>
                                <h3 class='title'>${movie.title}</h3>
                            </div>
                        `;
                    });

                    document.getElementById('content').innerHTML = movies;

                    // Update pagination button visibility
                    btnPrev.style.display = page === 1 ? 'none' : 'inline-block';
                    btnNext.style.display = page === totalPages ? 'none' : 'inline-block';

                    // Покажем пагинацию при поиске
                    const pageIndex = document.getElementById('pageIndex');
                    if (pageIndex) {
                        pageIndex.style.visibility = "visible"; // Показываем пагинацию при поиске
                    }
                } else {
                    handleError(response.status);
                }
            } catch (error) {
                console.error(error);
                alert('Error searching movies. Please try again later.');
            }
        };
        getResults();
    } else {
        // Если поле поиска пустое, показываем популярные фильмы
        page = 1;
        getMovies(); // Загружаем популярные фильмы
    }
}
