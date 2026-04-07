export function addToWishlist(item) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:5001/wishlist', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'content-type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        resolve({ data });
    });
}

export function fetchWishlist() {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:5001/wishlist', {
            credentials: 'include'
        });
        const data = await response.json();
        resolve({ data });
    });
}

export function removeFromWishlist(id) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:5001/wishlist/' + id, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' },
            credentials: 'include'
        });
        const data = await response.json();
        resolve({ data });
    });
}
