import { API_URL } from "../../constants";

export function addToCart(item) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: 'POST',
        body: JSON.stringify(item),
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

export function fetchItemsByUserId() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart`, {
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

export function updateCart(update) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart/${update.id}`, {
        method: 'PATCH',
        body: JSON.stringify(update),
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

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${API_URL}/cart/${itemId}`, {
        method: 'DELETE',
        headers: { 'content-type': 'application/json' },
        credentials: 'include'
      });
      if (response.ok) {
        resolve({ data: { id: itemId } });
      } else {
        reject({ message: 'Delete failed' });
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function resetCart() {
  // Clearing cart on frontend level
  return new Promise(async (resolve) => {
    resolve({ data: 'success' });
  });
}
