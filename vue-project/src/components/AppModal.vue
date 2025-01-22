<script setup>
import { XMarkIcon } from "@heroicons/vue/20/solid";
import { useCounterStore } from "../stores/counter.js";
const Store=useCounterStore();


</script>

<template>
  <div>
    <Transition>
         <div class="formstyle">
          <button class="position-absolute buttonstyle" @click="Store.hideForm">
            <XMarkIcon class="iconheight" />
          </button>
          <div>
            <slot />
          </div>
        </div>
      </Transition>
  </div>
</template>

<style scoped>
.iconheight {height: 28px;}
.formstyle { box-shadow: grey 8px 8px 2px; position:absolute; 
    border-radius: 20px; }
.buttonstyle { all:unset; top:3px; right: 3px; color:black;}
.buttonstyle:hover {color:red;}

.v-enter-active,
.v-leave-active,
.v-enter-active .formstyle,
.v-leave-active .formstyle {
  transition: all 22s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-enter-from .formstyle,
.v-leave-to .formstyle {
  transform: translateX(-350px);
}
</style>
