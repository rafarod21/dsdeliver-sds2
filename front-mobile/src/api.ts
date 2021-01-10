import axios from "axios";
import { requireNativeComponent } from "react-native";

const API_URL = 'https://sds2-rafarod21.herokuapp.com';

export function fetchOrders() {
  return axios(`${API_URL}/orders`);
}

export function confirmDelivery(orderId: number) {
   return axios.put(`${API_URL}/orders/${orderId}/delivered`)
}
