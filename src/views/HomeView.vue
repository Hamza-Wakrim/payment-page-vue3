<script setup lang="ts">
import Items from '../components/Items.vue'
import UserInformationPage from '../components/UserInformationPage.vue'
import CheckoutPage from '../components/CheckoutPage.vue'
import { ref, reactive, onMounted } from 'vue'
import { fetchProducts } from '@/services/productService'
import { createHostedPage } from '@/services/checkoutService'

const step = ref(1)
const dummyData = reactive([])
const cartData = reactive({
  checkedItem: null as object | null,
  price: null as number | null,
  firstName: null as string | null,
  lastName: null as string | null,
  zip: null as string | null,
  email: null as string | null,
  phone: null as string | null,
  address: null as string | null,
  city: null as string | null,
  state: null as string | null,
  country: null as string | null
})

onMounted(async () => {
  try {
    const products = await fetchProducts()
    dummyData.push(...products.data)
  } catch (error) {
    console.error(error)
  }
})

// Event handler to update cartData from the child component
const updateCartData = (newData: { checkedItem: object; price: number }) => {
  cartData.checkedItem = newData.checkedItem
  cartData.price = newData.price
}

const nextStep = () => {
  if (step.value < 3) step.value += 1
}

const prevStep = () => {
  if (step.value > 1) step.value -= 1
}

const hostedPageStep = async () => {
  const hostedPage = await createHostedPage(cartData)
  if (step.value < 3) step.value += 1
}
</script>

<template>
  <v-stepper
    hide-actions
    alt-labels
    v-model="step"
    :items="['Products', 'User Information', 'Checkout']"
  >
    <template v-slot:item.1>
      <!-- Pass the reactive dummyData and handle the emitted event -->
      <Items :items="dummyData" :data="cartData" @update:data="updateCartData" />
      <v-card-actions class="justify-end">
        <v-btn
          v-if="cartData.checkedItem"
          variant="outlined"
          width="14%"
          color="primary"
          rounded="lg"
          @click="nextStep"
          >Next</v-btn
        >
      </v-card-actions>
    </template>

    <template v-slot:item.2>
      <v-card flat>
        <!-- Displaying cartData -->
        <UserInformationPage :data="cartData" />

        <v-card-actions class="justify-end">
          <v-row d-flex class="pt-3">
            <v-col cols="6">
              <v-btn variant="outlined" width="18%" rounded="lg" @click="prevStep">Back</v-btn>
            </v-col>
            <v-col cols="6" style="justify-content: end; display: flex">
              <v-btn
                v-if="cartData.firstName"
                variant="outlined"
                width="50%"
                color="primary"
                rounded="lg"
                @click="hostedPageStep"
                >Go Checkout</v-btn
              >
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </template>

    <template v-slot:item.3>
      <v-card flat>
        <CheckoutPage :data="cartData" />

        <v-card-actions class="justify-end">
          <v-row d-flex class="pt-3">
            <v-col cols="6">
              <v-btn variant="outlined" width="18%" rounded="lg" @click="prevStep">Back</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </template>
  </v-stepper>
</template>
