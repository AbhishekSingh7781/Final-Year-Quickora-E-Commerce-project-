const categoryImages = {
  "Mobiles": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
  "Laptops": "https://images.unsplash.com/photo-1531297172867-4f5111ce3581?auto=format&fit=crop&q=80&w=800",
  "Audio": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
  "Fashion": "https://images.unsplash.com/photo-1489987707023-af823617e19f?auto=format&fit=crop&q=80&w=800",
  "Cameras": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800",
  "Appliances": "https://images.unsplash.com/photo-1584824486509-112e4181f1b6?auto=format&fit=crop&q=80&w=800",
  "Home": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800",
  "Toys": "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
  "Beauty": "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=800",
  "Sports": "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
};

const mockProducts = [
    {
        id: "mock-1", title: "iPhone 15 Pro", description: "The iPhone 15 Pro features a strong and light aerospace-grade titanium design.",
        price: 134900, discountPercentage: 10, rating: 4.8, stock: 50, brand: "Apple", category: "Mobiles",
        thumbnail: `${categoryImages["Mobiles"]}&sig=111`,
        images: [`${categoryImages["Mobiles"]}&sig=111`, `${categoryImages["Mobiles"]}&sig=112`, `${categoryImages["Mobiles"]}&sig=113`],
        isDeleted: false
    },
    {
        id: "mock-2", title: "Samsung Galaxy S24 Ultra", description: "Welcome to the era of mobile AI with Galaxy S24 Ultra.",
        price: 129999, discountPercentage: 12, rating: 4.7, stock: 40, brand: "Samsung", category: "Mobiles",
        thumbnail: `${categoryImages["Mobiles"]}&sig=121`,
        images: [`${categoryImages["Mobiles"]}&sig=121`, `${categoryImages["Mobiles"]}&sig=122`, `${categoryImages["Mobiles"]}&sig=123`],
        isDeleted: false
    },
    {
        id: "mock-3", title: "MacBook Air M3", description: "Supercharged by M3, the MacBook Air is super portable and capable.",
        price: 114900, discountPercentage: 5, rating: 4.9, stock: 35, brand: "Apple", category: "Laptops",
        thumbnail: `${categoryImages["Laptops"]}&sig=131`,
        images: [`${categoryImages["Laptops"]}&sig=131`, `${categoryImages["Laptops"]}&sig=132`, `${categoryImages["Laptops"]}&sig=133`],
        isDeleted: false
    },
    {
        id: "mock-4", title: "Dell XPS 15", description: "Push your creativity with the stunning display of the Dell XPS.",
        price: 145000, discountPercentage: 15, rating: 4.6, stock: 20, brand: "Dell", category: "Laptops",
        thumbnail: `${categoryImages["Laptops"]}&sig=141`,
        images: [`${categoryImages["Laptops"]}&sig=141`, `${categoryImages["Laptops"]}&sig=142`, `${categoryImages["Laptops"]}&sig=143`],
        isDeleted: false
    },
    {
        id: "mock-5", title: "Sony WH-1000XM5", description: "Industry-leading noise cancellation overhead headphones.",
        price: 29990, discountPercentage: 8, rating: 4.8, stock: 150, brand: "Sony", category: "Audio",
        thumbnail: `${categoryImages["Audio"]}&sig=151`,
        images: [`${categoryImages["Audio"]}&sig=151`, `${categoryImages["Audio"]}&sig=152`, `${categoryImages["Audio"]}&sig=153`],
        isDeleted: false
    },
    {
        id: "mock-6", title: "Apple AirPods Pro", description: "Magic like you’ve never heard with Active Noise Cancellation.",
        price: 24900, discountPercentage: 10, rating: 4.7, stock: 200, brand: "Apple", category: "Audio",
        thumbnail: `${categoryImages["Audio"]}&sig=161`,
        images: [`${categoryImages["Audio"]}&sig=161`, `${categoryImages["Audio"]}&sig=162`, `${categoryImages["Audio"]}&sig=163`],
        isDeleted: false
    },
    {
        id: "mock-7", title: "Levi's Denim Jacket", description: "Classic mid-wash denim jacket for every casual occasion.",
        price: 4599, discountPercentage: 20, rating: 4.5, stock: 80, brand: "Levi's", category: "Fashion",
        thumbnail: `${categoryImages["Fashion"]}&sig=171`,
        images: [`${categoryImages["Fashion"]}&sig=171`, `${categoryImages["Fashion"]}&sig=172`, `${categoryImages["Fashion"]}&sig=173`],
        isDeleted: false
    },
    {
        id: "mock-8", title: "Nike Air Max 270", description: "Nike's first lifestyle Air Max brings you style, comfort and big attitude.",
        price: 12995, discountPercentage: 5, rating: 4.6, stock: 120, brand: "Nike", category: "Fashion",
        thumbnail: `${categoryImages["Fashion"]}&sig=181`,
        images: [`${categoryImages["Fashion"]}&sig=181`, `${categoryImages["Fashion"]}&sig=182`, `${categoryImages["Fashion"]}&sig=183`],
        isDeleted: false
    },
    {
        id: "mock-9", title: "Canon EOS R5", description: "Professional mirrorless camera with 45MP full-frame sensor.",
        price: 339000, discountPercentage: 5, rating: 4.9, stock: 15, brand: "Canon", category: "Cameras",
        thumbnail: `${categoryImages["Cameras"]}&sig=191`,
        images: [`${categoryImages["Cameras"]}&sig=191`, `${categoryImages["Cameras"]}&sig=192`, `${categoryImages["Cameras"]}&sig=193`],
        isDeleted: false
    },
    {
        id: "mock-10", title: "GoPro HERO12", description: "Incredible 5.3K video, plus rugged, waterproof to 33ft.",
        price: 37990, discountPercentage: 15, rating: 4.7, stock: 65, brand: "GoPro", category: "Cameras",
        thumbnail: `${categoryImages["Cameras"]}&sig=201`,
        images: [`${categoryImages["Cameras"]}&sig=201`, `${categoryImages["Cameras"]}&sig=202`, `${categoryImages["Cameras"]}&sig=203`],
        isDeleted: false
    },
    {
        id: "mock-11", title: "LG 65\" OLED TV", description: "Experience perfect blacks and infinite contrast with OLED.",
        price: 189990, discountPercentage: 25, rating: 4.8, stock: 25, brand: "LG", category: "Appliances",
        thumbnail: `${categoryImages["Appliances"]}&sig=211`,
        images: [`${categoryImages["Appliances"]}&sig=211`, `${categoryImages["Appliances"]}&sig=212`, `${categoryImages["Appliances"]}&sig=213`],
        isDeleted: false
    },
    {
        id: "mock-12", title: "Dyson V15 Detect", description: "The most powerful, intelligent cordless vacuum.",
        price: 65900, discountPercentage: 10, rating: 4.6, stock: 40, brand: "Dyson", category: "Home",
        thumbnail: `${categoryImages["Home"]}&sig=221`,
        images: [`${categoryImages["Home"]}&sig=221`, `${categoryImages["Home"]}&sig=222`, `${categoryImages["Home"]}&sig=223`],
        isDeleted: false
    },
    {
        id: "mock-13", title: "MAC Lipstick Ruby Woo", description: "The iconic matte red lipstick.",
        price: 2100, discountPercentage: 0, rating: 4.9, stock: 300, brand: "MAC", category: "Beauty",
        thumbnail: `${categoryImages["Beauty"]}&sig=231`,
        images: [`${categoryImages["Beauty"]}&sig=231`, `${categoryImages["Beauty"]}&sig=232`, `${categoryImages["Beauty"]}&sig=233`],
        isDeleted: false
    },
    {
        id: "mock-14", title: "Lego Technic Porsche", description: "Discover engineering excellence piece by piece.",
        price: 15499, discountPercentage: 5, rating: 4.8, stock: 45, brand: "Lego", category: "Toys",
        thumbnail: `${categoryImages["Toys"]}&sig=241`,
        images: [`${categoryImages["Toys"]}&sig=241`, `${categoryImages["Toys"]}&sig=242`, `${categoryImages["Toys"]}&sig=243`],
        isDeleted: false
    },
    {
        id: "mock-15", title: "Wilson Tennis Racket", description: "Pro staff performance for precision and control.",
        price: 18999, discountPercentage: 12, rating: 4.7, stock: 55, brand: "Wilson", category: "Sports",
        thumbnail: `${categoryImages["Sports"]}&sig=251`,
        images: [`${categoryImages["Sports"]}&sig=251`, `${categoryImages["Sports"]}&sig=252`, `${categoryImages["Sports"]}&sig=253`],
        isDeleted: false
    }
];

// Extend with random generated variants to fill up the store to 40 items total
const categoriesList = ["Mobiles", "Laptops", "Audio", "Fashion", "Cameras", "Appliances", "Home", "Toys", "Beauty", "Sports"];

for(let i=16; i<=50; i++) {
    let cat = categoriesList[i % categoriesList.length];
    let baseImg = categoryImages[cat];
    mockProducts.push({
        id: `mock-${i}`,
        title: `Premium ${cat} Product ${i}`,
        description: `Excellence and quality in our signature ${cat.toLowerCase()} collection.`,
        price: 1500 + (i * 150),
        discountPercentage: (i % 15) + 5,
        rating: 4.0 + (i % 10) / 10,
        stock: 50 + i,
        brand: "Quickora",
        category: cat,
        thumbnail: `${baseImg}&sig=${i}`,
        images: [
            `${baseImg}&sig=${i}1`,
            `${baseImg}&sig=${i}2`,
            `${baseImg}&sig=${i}3`,
            `${baseImg}&sig=${i}4`
        ],
        isDeleted: false
    });
}

module.exports = { mockProducts };
