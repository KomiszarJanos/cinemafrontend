import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
const movies= ref(
     [
		{
			"id": 1,
			"name": "The Godfather",
			"description": "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
			"image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY1982_.jpg",
			"rating": 4,
			"genres": [
				"Crime",
				"Drama"
			],
			"inTheaters": false
		},
		{
			"id": 2,
			"name": "The Shawshank Redemption",
			"description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
			"image": "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1200_.jpg",
			"rating": 4,
			"genres": [
				"Drama"
			],
			"inTheaters": false
		},
		{
			"id": 3,
			"name": "The Dark Knight",
			"description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
			"image": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UY2048_.jpg",
			"rating": 3,
			"genres": [
				"Action",
				"Crime",
				"Drama"
			],
			"inTheaters": false
		}
	]);
  
const Id=ref();
const Name=ref();
const Description=ref();
const Image=ref();
const InTheaters=ref();
const Genres=ref();
const Rating=ref();

const form = reactive({
  id: Id,
  name: Name,
  description: Description,
  image: Image,
  inTheaters: InTheaters,
  genres: Genres,
  rating: Rating });

const currentMovie=ref();

function removeMovie(id) {movies.value = movies.value.filter((movie) => movie.id !== id);}

function editMovie(id) {
    
    currentMovie.value = movies.value.find((movie) => movie.id === id);
    Id.value=currentMovie.value.id;
    Name.value=currentMovie.value.name;
    Description.value=currentMovie.value.description;
    Image.value=currentMovie.value.image;
    Rating.value=currentMovie.value.rating;
    Genres.value=currentMovie.value.genres;
    InTheaters.value=currentMovie.value.inTheaters;
    console.log(form);
    showForm(); }

function saveMovie() {
    const isNotNew = movies.value.find((movie) => movie.id === form.id);
    if (!isNotNew) { 
      Id.value=Number(Date.now());
      movies.value.push({...form});} 
    else { console.log('update'); updateMovie(form); }
    hideForm(); }

function updateMovie(data) { movies.value = movies.value.map((m) => {
        if (m.id === data.id) { data.rating = m.rating; return data; }
        return m; });  }


const showMovieForm = ref(false);
  
function hideForm() { showMovieForm.value = false; currentMovie.value = null; }

function showForm() { showMovieForm.value = true; }

const averageRating = computed(() => {
      const avg = movies.value.map((movie) => parseInt(movie.rating || 0))
      .reduce((a, b) => a + b, 0);
      return Number(avg / movies.value.length).toFixed(1);
  });

const totalMovies = computed(() => {return movies.value.length;});

function removeRatings() { movies.value = movies.value.map((movie) => {
      movie.rating = null; return movie;  })};
    
function updateRating(id, rating) {
        movies.value = movies.value.map((movie) => {
          if (movie.id === id) { movie.rating = rating; }
          return movie;  });  }
const notRated = computed(() => { return Boolean(movies.rating); });
  

  return { notRated, movies, showMovieForm, hideForm, showForm, saveMovie, 
    totalMovies, averageRating, removeRatings, removeMovie, editMovie, updateRating,
  Name, Genres, Description,InTheaters, Id, Image, Rating, form }
})
