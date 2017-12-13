	const head  = document.querySelector('head');
	const btn_ligth = document.querySelector('#light');
	const btn_dark = document.querySelector('#dark');
	const btn_group_themes = document.querySelector('.button_group_themes');
	const form = document.querySelector('#form');
	const inp_search = document.querySelector('#inp_search');
	const group_btn = document.querySelector('.button_group');
	const popular = document.querySelector('#btn_popular');
	const latest = document.querySelector('#btn_popular');
	const rated = document.querySelector('#btn_rated');
	const moviesCardList = document.querySelector('.gallery_movies');
	let movies = '';
	const getTemplateString = (cardWrap) => {
		const card = document.querySelector(cardWrap).textContent.trim();
		const compiled = _.template(card);
		let html = '';
		movie.forEach(item => {
			html += compiled(item);
			moviesCardList.innerHTML = html;
		});	
	}
	const getMoviesCard = (searchQuery, url) => {
		const page = 1;
		const year = 2017;
		const lang = 'en-US';
		const prim = 2017;
		const query = `query=${searchQuery}`;
		const inclAbult = false;
		const key = 'f24a0fd18f52218851075901c5a108a0';
		const request = `${url}api_key=${key}&language=${lang}&page=${page}&include_adult=${inclAbult}&${query}`;
		fetch(request)
		.then(response => {
			if(response.ok) {
				inp_search.value = '';
				return response.json();
			}
			throw new Error('error' + response.statusText);
		})
		.then(data => {
			window.movie = data.results.map(item => {
				return {
						poster: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
						title: item.title,
						overview: item.overview,
						date: item.release_date,
						popularity: item.popularity
				}
				
			});
			getTemplateString('#card');
			console.log(movie);
			
				
		})
		.catch(err => console.log(err));
	}

	const theme_key = 'theme';
	const link_theme  = document.querySelector('#link_theme');
	let currentStylePath = link_theme.getAttribute('href');

	const setThemes = (themePath) => {
		link_theme.setAttribute('href', themePath);
		currentStylePath = themePath;
	}
	const setSettings = (key, value) => {
		if ('localStorage' in window && window['localStorage'] !== null) {
			try {
				localStorage.setItem(key, value);
			} catch (e) {
				// if (e == QUOTA_EXCEEDED_ERR) {
				//     alert('Переполнение хранилища!');
				// }
			}
		} else {
			alert('Данные не сохранятся, ваш браузер не поддерживает Localstorage');
		}
	};
	const getSettings = (key) => {
		if ('localStorage' in window && window['localStorage'] !== null) {
			return localStorage.getItem(key);
		} else {
			alert('Данные не восстановлены! Вваш браузер не поддерживает Localstorage');
			return null;
		}
	} 

	document.addEventListener("DOMContentLoaded", () => {
		const currentThemePath = getSettings(theme_key);
		if(currentThemePath !== null){
			setThemes(currentThemePath);
		}
	});

	btn_group_themes.addEventListener('click', (event) => {
		let target = event.target;
		const themePath = target.getAttribute('data-themePath');
		if(target.id === 'light') {
			setSettings(theme_key, themePath);
			setThemes(themePath);
			btn_dark.classList.remove('active');
			btn_ligth.classList.add('active');
		}
		else if(target.id === 'dark') {
			setSettings(theme_key, themePath);
			setThemes(themePath);
			btn_ligth.classList.remove('active');
			btn_dark.classList.add('active');
			
		}
	});

	group_btn.addEventListener('click', (event) => {
		event.preventDefault();
		const target = event.target;
		if(target.id === 'btn_popular') {
			getMoviesCard('https://api.themoviedb.org/3/movie', 'https://api.themoviedb.org/3/movie/popular?');
		}
		else if(target.id === 'btn_latest') {
			getMoviesCard('https://api.themoviedb.org/3/movie', 'https://api.themoviedb.org/3/movie/upcoming?');
		}
		else if(target.id === 'btn_rated') {
			getMoviesCard('https://api.themoviedb.org/3/movie', 'https://api.themoviedb.org/3/movie/top_rated?');
		}
	});
	
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		if(inp_search.value === '') {
			alert('Ты дурак');
		}
		else {
			getMoviesCard(inp_search.value, 'https://api.themoviedb.org/3/search/movie?');
		}
	});
	
