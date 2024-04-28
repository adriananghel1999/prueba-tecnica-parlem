import {
  VuexAction,
  VuexMutation,
  VuexModule,
  Module,
} from 'nuxt-property-decorator'
import { customer } from '~/interfaces/customer'
import { $axios } from '~/utils/api'

@Module({
  name: 'Customer',
  stateFactory: true,
  namespaced: true,
})
export default class extends VuexModule {
  customers: customer[] = []

  @VuexMutation
  setCustomer(customer: any) {
    this.customers = customer
  }

  @VuexAction
  async getCustomers() {
    const customer = await $axios.$get(`/customers`)
    this.setCustomer(customer)
    return this.customers
  }
}
