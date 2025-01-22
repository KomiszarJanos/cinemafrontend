<script setup>
import { useCounterStore } from "../stores/counter";
import {ref, reactive} from 'vue'
const Store=useCounterStore();

const genres = reactive([
  { text: "Drama", value: "Drama" },
  { text: "Crime", value: "Crime" },
  { text: "Action", value: "Action" },
  { text: "Comedy", value: "Comedy" },
]);

function cancelForm() {
  Store.Name = null;
  Store.Description = null;
  Store.Image = null;
  Store.Genres = null;
  Store.InTheaters = false;
  clearErrors();}

</script>

<template>
  <form @submit.prevent="Store.saveMovie" class="formstyle">
    <input type="hidden" name="id" v-model="Store.Id" />
    <div class="d-flex flex-row align-items-start justify-content-start mx-auto">
      <label class="ms-2 labelwidth" for="name">Name</label>
      <input
        type="text"
        name="name"
        v-model="Store.Name"
        class="bg-secondary-subtle rounded-2 ms-5 thingswidth"  />
        
    </div>
    <div class="d-flex flex-row align-items-start justify-content-start mx-auto mt-2">
      <label class="ms-2 labelwidth" for="description">Description</label>
      <textarea
        type="text"
        name="description"
        v-model="Store.Description"
        class="ms-5 bg-secondary-subtle rounded-2 thingswidth" 
      />
      
    </div>
    <div class="d-flex flex-row align-items-start justify-content-start mx-auto mt-2">
      <label class="ms-2 labelwidth" for="image">Image</label>
      <input
        type="text"
        name="image"
        v-model="Store.Image"
        class="ms-5 bg-secondary-subtle rounded-2 thingswidth"
      />
      
    </div>
    <div class="d-flex flex-row align-items-start justify-content-start mx-auto mt-2">
      <label class="ms-2 labelwidth" for="genre">Genres</label>
      <select
        name="genre"
        v-model="Store.Genres"
        class="ms-5 bg-secondary-subtle rounded-2 thingswidth"
        multiple >
        <option
          v-for="option in genres"
          :key="option.value"
          :value="option.value" >
          {{ option.text }}
        </option>
      </select>
      
    </div>
    <div class="d-flex flex-row align-items-start justify-content-start mx-auto mt-2">
      <label for="checkbox" >
        <input
          type="checkbox"
          v-model="Store.InTheaters"
          :true-value="true"
          :false-value="false"
          class="ms-2 me-5 mb-3 mt-3"   />
        <span>In theaters</span>
      </label>
      
    </div>
    <div class="d-flex flex-row align-items-start justify-content-between mx-auto mt-2">
      <button type="button" class="btn btn-primary ms-3" @click="cancelForm">Cancel</button>

      <button type="submit" class="btn btn-primary me-3">
        <span v-if="Store.Id">Save</span>
        <span v-else>Create</span>
      </button>
    </div>
  </form>

  

</template>

<style scoped>
.labelwidth {width:80px}
.thingswidth {width:200px;}
.formstyle {background-color:beige; width: 380px; border: black 2px solid; padding:8px; border-radius: 10px;}
</style>
