<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    selected: string
}>()

const accentColor = computed(() => {
    switch (props.selected) {
        case 'Academic':
            return 'text-amber-500'
        case 'Applied':
            return 'text-sky-500'
        case 'Artistic':
            return 'text-rose-600'
        default:
            return ''
    }
})

</script>

<template>
<div class="w-[80vw] max-w-4xl flex flex-col shadow-4xl rounded-2xl bg-radial from-white/90 to-white shadow-[0_0_15px]">
    <div class="flex p-16  justify-between gap-16">
        <div class="flex flex-col gap-4 w-[25vw] max-w-74">
            <h2 class="text-left text-4xl text-slate-800 font-bold">Hi, I'm <strong class="transition-all" :class="accentColor">Arthur</strong>!</h2>
            <p class="text-left text-xl text-slate-800 font-medium">
                I'm a self-proclaimed <strong>polymath</strong>, interested in most things one can name. But above all, I like to <strong>learn</strong>, <strong>create</strong>, and <strong>share</strong>.
            </p>
        </div>
        <img class="rounded-2xl max-w-fit w-[30vw]" src="https://placehold.co/400x480" alt="About Image">
    </div>
</div>
</template>