<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Animal } from '~/types'
import useCalculateAgeInYears from '../utils/useCalculateAgeInYears'

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
  <table>
    <thead>
      <tr>
        <th>Index</th>
        <th>Species</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Age (yrs)</th>
        <th>Weight (kg)</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(animal, index) in animalsSortedByName" :key="index">
        <tr @click="toggleAnimalDetails(index)" class="cursor-pointer">
          <td>{{ index + 1 }}</td>
          <td>{{ animal.species }}</td>
          <td>{{ animal.name }}</td>
          <td>{{ animal.gender }}</td>
          <td>{{ useCalculateAgeInYears(animal.birthdate) }}</td>
          <td>{{ animal.weight }}</td>
        </tr>
        <tr v-if="expandedAnimalIndex === index">
          <td colspan="6" class="p-4 bg-gray-100">
            <div>
              <p><strong>Species:</strong> {{ animal.species }}</p>
              <p><strong>Name:</strong> {{ animal.name }}</p>
              <p><strong>Gender:</strong> {{ animal.gender }}</p>
              <p><strong>Age (yrs):</strong> {{ useCalculateAgeInYears(animal.birthdate) }}</p>
              <p><strong>Weight (kg):</strong> {{ animal.weight }}</p>
              <p><strong>Height (m):</strong> {{ animal.height }}</p>
              <p><strong>Favourite Fruit:</strong> {{ animal.favouriteFruit }}</p>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  @apply table-auto w-full text-left;
}
td {
  @apply w-40;
}
tr {
  @apply border-b-2;
}
tbody tr {
  @apply hover:bg-gray-200 cursor-pointer;
}
</style>
