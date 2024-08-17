<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  items: {
    id: number
    name: string
    price: number
    checked: boolean
  }[]
  data: {
    checkedItem: object
    price: number
    firstName: string
    lastName: string
    zip: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    country: string
  }
}>()

const emit = defineEmits(['update:data'])

const checkedItemId = ref<number | null>(props.data.checkedItem || null)

// Computed property for selected item
const selectedItem = computed(() => props.items.find((item) => item.id === checkedItemId.value))

watch(checkedItemId, (newId) => {
  const item = props.items.find((item) => item.id === newId)
  if (item) {
    emit('update:data', { checkedItem: item, price: item.price })
  }
})

const selectItem = (itemId: number) => {
  checkedItemId.value = itemId
}
</script>

<template>
  <v-row class="pb-4">
    <v-col cols="4" v-for="item in props.items" :key="item?.id" class="d-flex">
      <v-card color="tonal" style="width: 100%; height: 100%">
        <template v-slot:title>
          {{ item?.name }}
        </template>
        <v-card-text class="flex-grow-2"> </v-card-text>
        <v-card-actions>
          <v-radio v-model="checkedItemId" :value="item.id" @change="selectItem(item.id)" />
          <v-spacer></v-spacer>
          <h3>
            <b>$ {{ item.price }}/Month</b>
          </h3>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
