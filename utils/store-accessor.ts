import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Product from '~/store/Product';
import Customer from '~/store/Customer';

let productStore: Product;
let customerStore: Customer;

function initialiseStores(store: Store<any>): void {
    productStore = getModule(Product, store);
    customerStore = getModule(Customer, store);
}

export { initialiseStores, productStore, customerStore };