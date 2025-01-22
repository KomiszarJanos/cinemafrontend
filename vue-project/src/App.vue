<script setup>
import { useCounterStore } from "./stores/counter";
import { PencilIcon, StarIcon, TrashIcon } from '@heroicons/vue/24/solid';

const Store=useCounterStore();

</script>

<template>
<div class="container p-0">
  <div class="row justify-content-between align-items-flex mx-auto">
        <MovieForm
        v-if="Store.showMovieForm"
        @update:modelValue="saveMovie"
        :modelValue="currentMovie"
        @cancel="hideForm" />
  
    <div class="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-start ms-0 mt-3 ">
      <span>Total Movies: {{ Store.totalMovies }}</span>
      <span> / </span>
      <span>Average Rating: {{ Store.averageRating }}</span>
    </div>
    <div class="col-sm-12 col-md-6 col-lg-4 d-flex align-content-end me-0 mt-3">
      <button class="p-2 rounded-pill text-sm button-primary "
          @click="Store.removeRatings" >  Remove Ratings
      </button>
      <button class="p-2 rounded-pill text-sm self-end "
          :class="{ 'button-primary': !Store.showMovieForm,
                    'button-disabled': Store.showMovieForm, }"
          @click="Store.showForm"  :disabled="Store.showMovieForm" >
          Add Movie 
      </button>
    </div>
  </div>
  <div class="row justify-content-center align-items-flex gap-0">
    <div class="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch my-2 group"
        v-for="movie in Store.movies"  :key="movie.id" >
      <div class="align-items-center p-0 m-3 position-relative">
         <div class="position-absolute top-0 end-0">
              <StarIcon id="rating" class="starwidth"
                :class="{ 'textyellow': !notRated,
                          'textgray': notRated,  }" />
              <div class="position-absolute placingrat">
                <span v-if="!notRated" id="rating-stars" class="rated" >
                     {{ movie.rating }}
                 </span>
                <span v-else class="notrated"> - </span>
              </div>
          </div>       
          <div>
              <img
              v-if="movie?.image"
              :src="movie.image"
              class="card-img-top img-fluid imageheight"
              :alt="movie.name" />
              <img v-else
              src="../public/no-image-icon-23494.png"
              class="card-img-top img-fluid imageheight">
          </div>
          <div class="mt-3">
            <h3>{{ movie.name }}</h3>
          </div>
          <div class="d-flex justify-content-start mb-3">
            <span v-for="genre in movie.genres"
                  :key="`${movie.id}-${genre}`"
                  class="rounded-pill text-sm bg-warning text-center me-1 p-1"
                  >{{ genre }}
            </span>
          </div>
          <div class="mb-2">
              <p class="textalign">{{ movie.description }}</p>
          </div>
          <div class="mb-2 d-flex justify-content-between">
              <div class="d-flex justify-content-start">
              <div>
              <span class="movie-item-rating-text">
                Rating: ({{ movie.rating }}/5)
              </span>
              </div>
              <button class="d-flex justify-content-start align-items buttons">
                <div v-for="star in 5" :key="star"
                  class="p-0 m-0"
                  :class="[star <= movie.rating ? 'textyellow' : 'textgray',            ]"
                  :disabled="star === movie.rating" @click="Store.updateRating(movie.id, star)">
                  <StarIcon class="iconwidth" />
              </div>
            </button>
            </div>
              <div class="target">
                <div class="movie-item-actions-list-wrapper">
                  <button class="buttons" @click="Store.editMovie()">
                        <PencilIcon class="iconwidth" />
                  </button>
                  <button class="buttons"
                        @click="Store.removeMovie()">
                        <TrashIcon class="iconwidth" />
                  </button>
                </div>
              </div>
          </div>
          
      </div>
    </div>
  </div>
</div>
    

  
  

</template>

<style scoped>
.starwidth {width: 65px;}
.rated {color:brown; font-size: larger;}
.notrated {color:gray; font-size:larger;}
.imageheight {max-height: 400px;}
.textyellow {color:yellow;}
.textgray {color:gray;}
.textalign{text-align: justify;}
.iconwidth {width: 20px;}
.target {display:none;}
.group:hover .target { display: flex;}
.buttons {all:unset;}
.buttons:hover {cursor:pointer;}
.placingrat {inset: 0; display:flex; justify-content: center; text-align: center; top: 16px}
</style>
