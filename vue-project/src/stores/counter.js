import { ref, computed } from 'vue'
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
  
  function removeMovie(id) {
    movies.value = movies.value.filter((movie) => movie.id !== id);
  }
  function editMovie(id) {
    currentMovie.value = movies.value.find((movie) => movie.id === id);
    showForm();
  }
  
  const showMovieForm = ref(false);
  
  function hideForm() {
    showMovieForm.value = false;
    currentMovie.value = null;
  }
  function showForm() {
    showMovieForm.value = true;
  }
  const averageRating = computed(() => {
    const avg = movies.value
      .map((movie) => parseInt(movie.rating || 0))
      .reduce((a, b) => a + b, 0);
    return Number(avg / movies.value.length).toFixed(1);
  });
  const totalMovies = computed(() => {
    return movies.value.length;
  });
  function removeRatings() {
    movies.value = movies.value.map((movie) => {
      movie.rating = null;
      return movie;
    })};
    function saveMovie(data) {
      const isNew = !!movies.value.find((movie) => movie.id === data.id);
      if (!isNew) {
        addMovie(data);
      } else {
        updateMovie(data);
      } }
      function updateRating(id, rating) {
        movies.value = movies.value.map((movie) => {
          if (movie.id === id) {
            movie.rating = rating;
          }
          return movie;
        });
      }
  
  

  return { movies, showMovieForm, hideForm, showForm, saveMovie, totalMovies, averageRating, removeRatings, removeMovie, editMovie, updateRating }
})
