<template>
  <div class="relative w-full h-screen overflow-visible">
    <div class="absolute w-full h-full left-0 top-0" ref="orbitContainer">
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="absolute w-[160px] h-[220px] rounded-xl overflow-hidden bg-zinc-800 shadow-xl"
        :style="getTransformStyle(i)"
      >
        <div
          class="absolute inset-0 bg-cover bg-center opacity-60"
          :style="{ backgroundImage: `url(${card.image})` }"
        ></div>
        <div class="absolute bottom-0 text-white p-4 z-10">
          <h2 class="text-lg font-bold">{{ card.title }}</h2>
          <p class="text-sm">{{ card.description }}</p>
        </div>
      </div>
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="absolute w-[160px] h-[220px] rounded-xl overflow-hidden bg-zinc-800 shadow-xl"
        :style="getInvertedTransformStyle(i)"
      >
        <div
          class="absolute inset-0 bg-cover bg-center opacity-60"
          :style="{ backgroundImage: `url(${card.image})` }"
        ></div>
        <div class="absolute bottom-0 text-white p-4 z-10">
          <h2 class="text-lg font-bold">{{ card.title }}</h2>
          <p class="text-sm">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

interface Card {
  title: string
  description: string
  image: string
}

const cards = ref<Card[]>([
  { title: 'Card 1', description: 'Fun', image: `https://placehold.co/240x320?text=Fun` },
  { title: 'Card 2', description: 'Cards', image: 'https://placehold.co/240x320?text=Cards' },
  { title: 'Card 3', description: 'Spinning', image: 'https://placehold.co/240x320?text=Spinning' },
  { title: 'Card 4', description: 'On', image: 'https://placehold.co/240x320?text=On' },
  { title: 'Card 5', description: 'A', image: 'https://placehold.co/240x320?text=A' },
  { title: 'Card 6', description: 'Vue', image: 'https://placehold.co/240x320?text=Vue' },
  { title: 'Card 1', description: 'Tailwind', image: 'https://placehold.co/240x320?text=&' },
  { title: 'Card 2', description: 'Built', image: 'https://placehold.co/240x320?text=Tailwind' },
  { title: 'Card 3', description: 'Orbital', image: 'https://placehold.co/240x320?text=Built' },
  { title: 'Card 4', description: 'Cards', image: 'https://placehold.co/240x320?text=Orbital' },
  { title: 'Card 5', description: 'Carousel', image: 'https://placehold.co/240x320?text=Cards' },
  { title: 'Card 6', description: ':)', image: 'https://placehold.co/240x320?text=Carousel' },
])

// Settings
const radius = 500
const zAmplitude = 300
const yAmplitude = 200
const zTilt = 0.3 // Z tilt in radians
const xTilt = 0.15 // Up/Down tilt in radians
const center = ref({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
const speed = 0.005

// State
const angleOffset = ref(0)
let frame: number

const getTransformStyle = (index: number) => {
  const count = cards.value.length
  const angle = angleOffset.value + (index * (2 * Math.PI / count))

  const x = center.value.x + radius * Math.cos(angle)
  const y = center.value.y + yAmplitude * Math.sin(angle)
  const z = zAmplitude * Math.sin(angle)

  const dx = center.value.x - x
  const dy = center.value.y - y
  const angleToCenter = Math.atan2(dx, dy)

  const rotateY = `rotateY(${angleToCenter}rad)`
  const angleZ = (angle % Math.PI) - Math.PI * 0.5;
  const rotateZ = `rotateZ(${angleZ * zTilt}rad)`
  const rotateX = `rotateX(${-dy * xTilt / yAmplitude}rad)`

  const translate = `translate3d(${x - 80}px, ${y - 110}px, ${z}px)`

  return {
    transform: `${translate} ${rotateY} ${rotateZ} ${rotateX}`,
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
    transition: 'none',
  }
}

const getInvertedTransformStyle = (index: number) => {
  const count = cards.value.length
  const angle = angleOffset.value + (index * (2 * Math.PI / count))

  const x = center.value.x + radius * Math.cos(angle)
  const y = center.value.y + yAmplitude * Math.sin(angle)
  const z = zAmplitude * Math.sin(angle)

  const dx = center.value.x - x
  const dy = center.value.y - y
  const angleToCenter = Math.atan2(dx, -dy)

  const rotateY = `rotateY(${angleToCenter}rad)`
  const angleZ = (angle % Math.PI) - Math.PI * 0.5;
  const rotateZ = `rotateZ(${angleZ * zTilt}rad)`
  const rotateX = `rotateX(${-dy * xTilt / yAmplitude}rad)`

  const translate = `translate3d(${x - 80}px, ${y - 110}px, ${z}px)`

  return {
    transform: `${translate} ${rotateY} ${rotateZ} ${rotateX}`,
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
    transition: 'none',
  }
}


const animate = () => {
  angleOffset.value += speed
  frame = requestAnimationFrame(animate)
}

onMounted(() => {
  frame = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
})
</script>
