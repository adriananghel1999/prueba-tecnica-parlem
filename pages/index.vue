<template>
  <div class="container pt-3 pb-3">
    <ObjectList :items="customers"></ObjectList>
    <CustomerViewer v-show="selectedCustomer !== null" :customer="selectedCustomer"></CustomerViewer>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "nuxt-property-decorator"
import ObjectList from "../components/ObjectList.vue";
import CustomerViewer from "../components/CustomerViewer.vue";
import { customer } from "../interfaces/customer";
import { customerStore } from "../store";

@Component({
  components: {
    ObjectList, CustomerViewer
  }
})
export default class IndexPage extends Vue {
  customers: customer[] = [];
  selectedCustomer: customer | any = null;

  async created() {
    this.customers = await customerStore.getCustomers();
  }

  mounted() {
    this.$root.$on('customerSelected', (selectedCustomer: customer) => {
      this.selectedCustomer = selectedCustomer;
    })
  }
}
</script>
