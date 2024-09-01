import axios from 'axios'

interface Product {
  plan_code: string
  name: string
  description: string
  status: string
  product_id: string
  recurring_price: number
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>('/products')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

export const fetchProduct = async (planCode: string): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>(`/products/${planCode}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch product')
  }
}

// // Example of transforming the response data
// const transformResponse = (data: Product[]): Product[] => {
//   return data
// }
