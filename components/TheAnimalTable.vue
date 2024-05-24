<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Animal } from '~/types'
import useCalculateAgeInYears from '../utils/useCalculateAgeInYears'
import useCalculateNeededFood from '../utils/useCalculateNeededFood'

const props = defineProps<{
  animals: Animal[]
}>()

const expandedAnimalIndex = ref<number | null>(null)

const animalsSortedByName = computed(() =>
  props.animals.slice().sort((animalA, animalB) =>
    animalA.name.localeCompare(animalB.name)
  )
)

const toggleAnimalDetails = (index: number) => {
  expandedAnimalIndex.value = expandedAnimalIndex.value === index ? null : index
}
</script>

<template>
  <div class="container mx-auto p-4">
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr class="bg-gray-800 text-white">
          <th class="px-4 py-2">Index</th>
          <th class="px-4 py-2">Species</th>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Gender</th>
          <th class="px-4 py-2">Age (yrs)</th>
          <th class="px-4 py-2">Weight (kg)</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(animal, index) in animalsSortedByName" :key="index">
          <tr 
            @click="toggleAnimalDetails(index)" 
            class="cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <td class="border-r border-gray-200 px-4 py-2">{{ index + 1 }}</td>
            <td class="px-4 py-2">{{ animal.species }}</td>
            <td class="px-4 py-2">{{ animal.name }}</td>
            <td class="px-4 py-2">{{ animal.gender }}</td>
            <td class="px-4 py-2">{{ useCalculateAgeInYears(animal.birthdate) }}</td>
            <td class="px-4 py-2">{{ animal.weight }}</td>
          </tr>
          <tr v-if="expandedAnimalIndex === index">
            <td colspan="6" class="p-4 bg-gray-50">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Species:</strong> {{ animal.species }}</p>
                  <p><strong>Name:</strong> {{ animal.name }}</p>
                  <p><strong>Gender:</strong> {{ animal.gender }}</p>
                  <p><strong>Age (yrs):</strong> {{ useCalculateAgeInYears(animal.birthdate) }}</p>
                </div>
                <div>
                  <p><strong>Weight (kg):</strong> {{ animal.weight }}</p>
                  <p><strong>Height (m):</strong> {{ animal.height }}</p>
                  <p><strong>Favourite Fruit:</strong> {{ animal.favouriteFruit }}</p>
                  <p><strong>Needed Food per month (kg):</strong> {{ useCalculateNeededFood(animal) }}</p>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  @apply table-auto w-full text-left;
}
th {
  @apply px-4 py-2;
}
td {
  @apply px-4 py-2;
}
td:first-of-type {
  @apply border-r border-gray-200;
}
tr {
  @apply border-b-2;
}
tbody tr:hover {
  @apply bg-gray-100;
}
</style>
