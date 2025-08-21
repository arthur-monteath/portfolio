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
            'transition-opacity pointer-events-none select-none duration-500',
            opacityClass.value,
          ], 'aria-hidden': !props.selected,
        },
        slots.default ? slots.default() : []
      )
  },
})

const categoryBg: Record<Category, string> = {
  Academic: 'bg-red-600',
  Professional: 'bg-green-600',
  Artistic: 'bg-blue-600'
}
</script>

<template>
  <main class="relative overflow-visible bg-black w-[100vw] flex flex-col items-stretch justify-center">
    
    <div class="z-10 h-screen flex items-stretch">
      <div v-for="category in ['Academic', 'Professional', 'Artistic']" :key="category"
      :class="[
        ' flex items-center justify-center h-full basis-0 min-w-0 overflow-hidden transition-[flex-grow] duration-300 select-none cursor-pointer',
        growClass(category as Category), categoryBg[category as Category]
      ]"
      @click="selected === category ? selected = '' : selected = (category as Category)"
      >
        <ContentWrapper :selected="selected === '' || selected === category">
          <h1>{{category}}</h1>
        </ContentWrapper>
      </div>
    </div>

    <!-- <span class="absolute bottom-2 flex flex-col items-center">
      <ChevronsDown class="w-16 h-16 animate-bounce " />
      <p class="text-lg font-semibold">Scroll for Overview</p>
    </span> -->
  </main>

  <footer class="bg-white"><p class="text-slate-900">©2025 Arthur Trindade</p></footer>
</template>
