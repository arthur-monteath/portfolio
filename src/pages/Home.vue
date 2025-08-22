<script setup lang="ts">
import { ChevronsDown } from 'lucide-vue-next';
import { ref, computed, defineComponent, h } from 'vue';

type Category = "Academic" | "Professional" | "Artistic";
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
            'transition-opacity pointer-events-none select-none duration-500 h-full',
            opacityClass.value,
          ], 'aria-hidden': !props.selected,
        },
        slots.default ? slots.default() : []
      )
  },
})

const categoryBg: Record<Category, string> = {
  Academic: 'bg-amber-500 + ',
  Professional: 'bg-sky-500 + ',
  Artistic: 'bg-rose-600 + '
}
</script>

<template>
  <main class="relative overflow-visible h-full bg-black w-[100vw] flex flex-col items-stretch justify-center">
    
    <div class="z-10 inset-0 relative h-full flex items-stretch">
      <div v-for="category in ['Academic', 'Professional', 'Artistic']" :key="category"
      :class="[
        'relative flex items-center justify-center h-full basis-0 min-w-0 overflow-hidden transition-[flex-grow] duration-500 select-none cursor-pointer',
        growClass(category as Category), categoryBg[category as Category]
      ]"
      @click="selected === category ? selected = '' : selected = (category as Category)"
      >
      <div class="absolute inset-0 bg-radial w-full h-full from-white/15 opacity-20 hover:opacity-100 duration-500 transition-all from-40% to-transparent"/>
      <ContentWrapper :selected="selected === '' || selected === category">
        <h1 class="z-10 text-white font-bold text-4xl tracking-tight">{{category}}</h1>
      </ContentWrapper>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-4xl w-full max-w-5xl mx-auto p-6">
      Card
    </div>

    <!-- <span class="absolute bottom-2 flex flex-col items-center">
      <ChevronsDown class="w-16 h-16 animate-bounce " />
      <p class="text-lg font-semibold">Scroll for Overview</p>
    </span> -->
  </main>
</template>
