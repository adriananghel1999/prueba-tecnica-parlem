<template>
  <div>
    <div v-if="items.length !== 0">
      <b-form-group label="Filter" label-for="filter-input" label-cols-sm="1" label-align-sm="right" label-size="sm"
        class="mb-0">
        <b-input-group size="sm">
          <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
        </b-input-group>
      </b-form-group>

      <b-table @row-clicked="onRowSelected" sortable hover selectable :select-mode="'single'" :items="items"
        :fields="fields" :filter="filter">
        <template v-for="field in fields" v-slot:[`head(${field})`]="data">
          {{ data.field.label }}
        </template>

        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Cargando...</strong>
          </div>
        </template>
      </b-table>
    </div>
    <div v-else-if="items.length === 0">No data found</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
import { customer } from "../interfaces/customer";
import { product } from "../interfaces/product";

@Component
export default class ObjectList extends Vue {
  @Prop({ required: true }) items!: customer[] | product[];
  fields: any = []
  filter: string = "";
  selectedItem?: customer | product;

  @Watch("items")
  generateFields() {
    if (this.items.length > 0) {
      this.fields = Object.keys(this.items[0]).map(key => {
        return { key, label: key.toUpperCase(), sortable: true }
      })
    }
  }

  onRowSelected(item: any) {
    if ("customerId" in item && "givenName" in item) {
      this.selectedItem = item;
      this.$root.$emit('customerSelected', this.selectedItem);
    }
  }
}
</script>