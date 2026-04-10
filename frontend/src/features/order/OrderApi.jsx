import { API_URL } from "../../constants";

export function createOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject(data);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders/user`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject(data);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders/${order.id}`, {
        method: 'PATCH',
        body: JSON.stringify(order),
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data });
      } else {
        reject(data);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = '';
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/orders?${queryString}`, {
        credentials: 'include'
      });
      const data = await response.json();
      const totalOrders = await response.headers.get('X-Total-Count');
      if (response.ok) {
        resolve({ data: { orders: data, totalOrders: +totalOrders } });
      } else {
        reject(data);
      }
    } catch (err) {
      reject(err);
    }
  });
}
