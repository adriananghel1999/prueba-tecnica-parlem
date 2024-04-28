import {
  VuexAction,
  VuexMutation,
  VuexModule,
  Module,
} from 'nuxt-property-decorator'
import { product } from '~/interfaces/product'
import { $axios } from '~/utils/api'

@Module({
  name: 'Product',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  products: product[] = []

  @VuexMutation
  setProducts(product: any) {
    this.products = product
  }

  @VuexAction
  async getProducts() {
    const product = await $axios.$get(`/products`)
    this.setProducts(product)
    return this.products
  }
}
