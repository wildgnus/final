// Получение ID фильма из URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

// Функция для получения данных о фильме
const getMovieDetails = async () => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=0a4b185412dd761023ebb7e1b0b10cea&append_to_response=videos,credits`);
        if (response.status === 200) {
            const movie = await response.json();

            // Заполнение данных фильма
            document.getElementById('movie-title').textContent = movie.title;
            document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            document.getElementById('movie-overview').textContent = movie.overview;
            document.getElementById('movie-genres').textContent = movie.genres.map(genre => genre.name).join(', ');

            // Актёры
            const actors = movie.credits.cast.slice(0, 5); // Берём только 5 главных актёров
const actorsList = document.getElementById('movie-actors');
actors.forEach(actor => {
    const actorDiv = document.createElement('div');
    actorDiv.classList.add('actor');

    actorDiv.innerHTML = `
        <img src="${actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Image'}" alt="${actor.name}">
        <p>${actor.name}</p>
    `;
    actorsList.appendChild(actorDiv);
});

            // Трейлер
            const trailer = movie.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
                const trailerDiv = document.getElementById('movie-trailer');
                trailerDiv.innerHTML = `
                    <h3>Trailer:</h3>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                `;
            }
        } else {
            console.log('Failed to fetch movie details.');
        }
    } catch (error) {
        console.log(error);
    }
};

// Вызов функции
getMovieDetails();
