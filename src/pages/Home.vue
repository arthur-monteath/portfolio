<script setup lang="ts">
import { ChevronsDown } from 'lucide-vue-next';
import { ref, computed, defineComponent, h } from 'vue';

type ContentType = "Academic" | "Professional" | "Artistic" | "";
const selected = ref<ContentType>("");

const basePanelClass = 'flex items-center justify-center h-full basis-0 min-w-0 overflow-hidden transition-[flex-grow] duration-300 select-none';

const growClass = (name : ContentType) =>
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
            'transition-opacity pointer-events-none select-none duration-300',
            opacityClass.value,
          ], 'aria-hidden': !props.selected,
        },
        slots.default ? slots.default() : []
      )
  },
})

</script>

<template>
  <div class="absolute bg-black inset-0 w-full h-full flex flex-row items-stretch justify-center cursor-pointer">
    <div
      :class="[
        basePanelClass,
        'bg-red-500',
        growClass('Academic')
      ]"
      @click="selected === 'Academic' ? selected = '' : selected = 'Academic'"
      role="button"
      tabindex="0"
    >
      <ContentWrapper :selected="selected === '' || selected === 'Academic'">
        <h1>Academic</h1>
      </ContentWrapper>
    </div>
    <div
      :class="[
        basePanelClass,
        'bg-green-500',
        growClass('Professional')
      ]"
      @click="selected === 'Professional' ? selected = '' : selected = 'Professional'"
      role="button"
      tabindex="1"
    >
      <ContentWrapper :selected="selected === '' || selected === 'Professional'">
        <h1>Professional</h1>
      </ContentWrapper>
    </div>
    <div
      :class="[
        basePanelClass,
        'bg-blue-500',
        growClass('Artistic')
      ]"
      @click="selected === 'Artistic' ? selected = '' : selected = 'Artistic'"
      role="button"
      tabindex="2"
    >
      <ContentWrapper :selected="selected === '' || selected === 'Artistic'">
        <h1>Artistic</h1>
      </ContentWrapper>
    </div>

    <span class="absolute bottom-2 flex flex-col items-center">
      <!-- <ChevronsDown class="w-16 h-16 animate-bounce " /> -->
      <p class="text-lg font-semibold">Scroll for Overview</p>
    </span>
  </div>

  <div class="flex w-full h-full bg-white z-10">ABC</div>
</template>
