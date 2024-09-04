<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchProduct } from '@/Services/productService'
import UserInformationPage from '../components/UserInformationPage.vue'
import { createHostedPage } from '@/services/checkoutService'
import CheckoutPage from '../components/CheckoutPage.vue'

const route = useRoute()
const dialog = ref(false)
const hostedPage = ref([])
const product = reactive({
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
  country: 'USA' as string | null
})
const planCode = route.params.id as string

onMounted(async () => {
  try {
    const productData = await fetchProduct(planCode)
    product.checkedItem = productData.data
    product.price = product?.recurring_price
  } catch (error) {
    console.error('Failed to load product data:', error)
  }
})

const imageSrc = new URL('@/assets/logo.png', import.meta.url).href

const hostedPageStep = async () => {
  hostedPage.value = await createHostedPage(product)
  dialog.value = true
}
</script>

<template>
  <v-app>
    <v-app-bar app color="#FAFAFA" dark>
      <v-col class="pl-4">
        <v-img :src="imageSrc" alt="Logo" contain width="15%" height="70%" class="mr-3"></v-img>
      </v-col>
    </v-app-bar>

    <v-main>
      <v-row>
        <!-- Product Details -->
        <v-col cols="12" md="12">
          <h1>{{ product?.checkedItem?.name }}</h1>
          <h2>Get Started Here</h2>
          <p></p>
        </v-col>
        <v-col cols="12" md="12">
          <UserInformationPage :data="product" />
        </v-col>
        <v-col cols="12" style="justify-content: end; display: flex">
          <v-btn v-if="product.firstName" color="primary" rounded="lg" @click="hostedPageStep"
            >Go Checkout</v-btn
          >
        </v-col>
      </v-row>
    </v-main>

    <v-dialog v-model="dialog" width="70%">
      <CheckoutPage :data="product" />
    </v-dialog>
  </v-app>
</template>

<style scoped>
h1 {
  text-align: center;
  font-size: 70px;
  font-weight: 600;
}
h2 {
  text-align: center;
  font-size: 25px;
  font-weight: 600;
}
.product-page {
  margin-top: 2rem;
}
</style>
