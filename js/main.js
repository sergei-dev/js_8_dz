window.onload = () => {
	const moviesCardList = document.querySelector('.gallery_movies');
	const form = document.querySelector('#form');
	const inp_search = document.querySelector('#inp_search');
	const group_btn = document.querySelector('.button_group');
	const popular = document.querySelector('#btn_popular');
	const latest = document.querySelector('#btn_popular');
	const rated = document.querySelector('#btn_rated');
	const getMoviesCard = (searchQuery, url) => {
		const page = 1;
		const year = 2017;
		const lang = 'en-US';
		const prim = 2017;
		const inclAbult = false;
		const key = 'f24a0fd18f52218851075901c5a108a0';
		const request = `${url}api_key=${key}&language=${lang}&page=${page}&include_adult=${inclAbult}&`;
		fetch(request + `query=${searchQuery}`)
		.then(response => {
			if(response.ok) {
				inp_search.value = '';
				return response.json();
			}
			throw new Error('error' + response.statusText);
		})
		.then(data => {
			const movies = data.results;
			let html = '';
			movies.forEach(movie => {
				html += `<div class="movie_item">
				<div class="movie_poster"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="movie poster"></div>
				<div class="movie_title"><h2>${movie.title}</h2></div>
				<div class="movie_overview">${movie.overview}</div>
				<div class="movie_date">Release date: ${movie.release_date}</div>
				<div class="movie_popularity">Rated: ${movie.popularity}</div>				
			</div>`;
			moviesCardList.innerHTML = html;
			
			});
		})
		.catch(err => console.log(err));
	}

	group_btn.onclick = (event) => {
		event.preventDefault();
		const target = event.target;
		if(target.id == 'btn_popular') {
			getMoviesCard('https://api.themoviedb.org/3/movie', 'https://api.themoviedb.org/3/movie/popular?');
		}
		else if(target.id == 'btn_latest') {
			getMoviesCard('https://api.themoviedb.org/3/movie', 'https://api.themoviedb.org/3/movie/upcoming?');
		}
		else if(target.id == 'btn_rated') {
			getMoviesCard('https://api.themoviedb.org/3/movie', 'https://api.themoviedb.org/3/movie/top_rated?');
		}
	}
	
	form.onsubmit = (event) => {
		event.preventDefault();
		getMoviesCard(inp_search.value, 'https://api.themoviedb.org/3/search/movie?');
		
	}
}