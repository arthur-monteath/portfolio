<script setup lang="ts">
import AboutCard from '../components/AboutCard.vue'
import { ref, computed, defineComponent, h } from 'vue';

type Category = "Academic" | "Applied" | "Artistic";
const selected = ref<Category | "">("");

const growClass = (name : Category) =>
  selected.value === ''
    ? 'grow hover:grow-[1.5]'
    : (selected.value === name ? 'grow' : 'grow-0')

const   ContentWrapper = defineComponent({
  name: 'ContentWrapper',
  props: {
    selected: { type: Boolean, required: true },
  },
  setup(props, { slots }) {

    const opacityClass = computed(() => (props.selected ? 'opacity-100' : 'opacity-0'))
    return () =>
      h(
        'div',
        {
          class: [
            'transition-opacity pointer-events-none select-none duration-500',
            opacityClass.value,
          ], 'aria-hidden': !props.selected,
        },
        slots.default ? slots.default() : []
      )
  },
})

const categoryBg: Record<Category, string> = {
  Academic: 'bg-amber-500',
  Applied: 'bg-sky-500',
  Artistic: 'bg-rose-600'
}
</script>

<template>
  <main class="relative overflow-visible h-full bg-black w-[100vw] flex flex-col items-stretch justify-center">
    
    <div class="relative z-1 inset-0 w-full h-[100vh] flex flex-col md:flex-row items-stretch">
      <div v-for="category in ['Academic', 'Applied', 'Artistic']" :key="category"
      :class="[
        'relative flex items-center justify-center h-full basis-0 min-w-0 overflow-hidden transition-[flex-grow] duration-500 select-none cursor-pointer',
        growClass(category as Category), categoryBg[category as Category]
      ]"
      @click="selected === category ? selected = '' : selected = (category as Category)"
      >
      <div :class="selected === category ? 'opacity-100' : 'opacity-20'" class="absolute inset-0 bg-radial w-full h-full from-white/15 hover:opacity-100 duration-500 transition-all from-40% to-transparent"/>
      <ContentWrapper class="absolute top-12 w-full h-12" :selected="selected === '' || selected === category">
        <p class="z-2 text-white font-black md:text-[clamp(2rem,5vw,4.5rem)]/12 tracking-tight">{{category}}</p>
      </ContentWrapper>
      </div>
    </div>

    <AboutCard 
      :selected
      :class="selected !== '' ? 'grid' : 'hidden md:grid'"
      class="absolute z-3 top-48 left-1/2 -translate-x-1/2"
    />

    <!-- <span class="absolute bottom-2 flex flex-col items-center">
      <ChevronsDown class="w-16 h-16 animate-bounce " />
      <p class="text-lg font-semibold">Scroll for Overview</p>
    </span> -->
  </main>
</template>
