<template>
  <div>
    <h1>Selected client data</h1>
    <h2>{{ customer?.givenName }} {{ customer?.familyName1 }}</h2>
    <p>Email: {{ customer?.email }}</p>
    <p>Doctype: {{ customer?.docType }}</p>
    <p>Docnum: {{ customer?.docNum }}</p>
    <p>Customerid: {{ customer?.customerId }}</p>
    <p>Phone: {{ customer?.phone }}</p>
    <p>Id: {{ customer?.id }}</p>
    <div>Products related to client</div>

    <ObjectList :items="customerProducts"></ObjectList>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
import { customer } from "../interfaces/customer";
import { product } from "../interfaces/product";
import ObjectList from "./ObjectList.vue";
import { productStore } from "../store";

@Component({
  components: {
    ObjectList
  }
})
export default class CustomerViewer extends Vue {
  @Prop({ required: true }) customer: customer | undefined;
  products: product[] = [];
  customerProducts: product[] = [];

  async created() {
    this.products = await productStore.getProducts();
  }
  
  @Watch("customer")
  showCustomerProducts() {
    this.customerProducts = this.products.filter(product => product.customerId === this.customer?.customerId);
  }

}
</script>
