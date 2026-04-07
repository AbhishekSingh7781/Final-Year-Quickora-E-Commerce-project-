const mongoose = require("mongoose");
const Product = require("./models/Product");

const categories = [
  {
    name: "Mobiles",
    brands: ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi"],
    imageKeywords: ["iphone", "smartphone", "samsung-galaxy", "pixel-phone", "mobile-tech"],
    basePrice: 50000,
    priceRange: 100000,
  },
  {
    name: "Laptops",
    brands: ["Apple", "Dell", "HP", "ASUS", "Lenovo", "Microsoft"],
    imageKeywords: ["laptop", "macbook", "ultrabook", "gaming-laptop", "workspace"],
    basePrice: 60000,
    priceRange: 150000,
  },
  {
    name: "Audio",
    brands: ["Sony", "Bose", "JBL", "Sennheiser", "Marshall"],
    imageKeywords: ["headphones", "earbuds", "speaker", "audio-gear", "music-tech"],
    basePrice: 5000,
    priceRange: 45000,
  },
  {
    name: "Fashion",
    brands: ["Nike", "Adidas", "Zara", "H&M", "Puma", "Levis"],
    imageKeywords: ["sneakers", "tshirt", "fashion-model", "clothing", "streetwear"],
    basePrice: 2000,
    priceRange: 15000,
  },
  {
    name: "Watches",
    brands: ["Rolex", "Casio", "Seiko", "Apple", "Tissot", "Fossil"],
    imageKeywords: ["watch", "luxury-watch", "smartwatch", "timepiece", "rolex"],
    basePrice: 10000,
    priceRange: 200000,
  },
  {
    name: "Furniture",
    brands: ["IKEA", "Urban Ladder", "Pepperfry", "West Elm"],
    imageKeywords: ["chair", "sofa", "interior-design", "desk", "decor"],
    basePrice: 15000,
    priceRange: 80000,
  },
  {
    name: "Fragrances",
    brands: ["Chanel", "Dior", "Gucci", "Versace", "Tom Ford"],
    imageKeywords: ["perfume", "fragrance", "cologne", "luxury-scent"],
    basePrice: 8000,
    priceRange: 25000,
  }
];

const adjectives = ["Premium", "Ultra", "Elite", "Classic", "Pro", "Next-Gen", "Sleek", "Deluxe", "Ultimate", "Essential"];
const models = ["X1", "S Series", "Plus", "Edition", "Advanced", "Infinity", "Horizon", "Nebula", "Alpha", "Zen"];

// High-quality base Image IDs from Unsplash to ensure diversity
const imagePool = [
    "1523275335684-37898b6baf30", "1505740420928-5e560c06d30e", "1542291026-7eec264c27ff", "1526170375885-e01089b0afe0",
    "1585333127302-3ac84777b783", "1603302576837-37561b2e2302", "1484154218962-a197022b5858", "1553062407-98eeb64c6a62",
    "1612817288484-6f916006741a", "1491553895911-0055eca6402d", "1503602642458-232111445657", "1581091226825-a6a2a5aee158",
    "1511707171634-5f897ff02aa9", "1546054454-aa26e2b734c7", "1593642702821-c8da63c1d79a", "1572635196237-14b3f281503f",
    "1560343090-f0409e92791a", "1543163521-1bf539c55dd2", "1584917865442-de89df76afd3", "1542496658-e33a6d0d50f6"
];

function generateProducts(count) {
  const generated = [];
  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const brand = category.brands[Math.floor(Math.random() * category.brands.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const model = models[Math.floor(Math.random() * models.length)];
    
    const title = `${brand} ${adjective} ${model} ${i + 1}`;
    const price = Math.floor(category.basePrice + Math.random() * category.priceRange);
    const discount = Math.floor(Math.random() * 30);
    const rating = (4 + Math.random()).toFixed(1);
    const stock = Math.floor(Math.random() * 200) + 10;
    
    // Choose a semi-random image from our high-quality pool or search
    const imgId = imagePool[i % imagePool.length];
    const imageKeyword = category.imageKeywords[i % category.imageKeywords.length];
    const thumbnail = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&q=80&w=800&sig=${i}`;
    
    generated.push({
      title,
      description: `Experience the best of ${category.name} with the ${title}. Featuring cutting-edge ${brand} technology, this ${adjective} device is designed for professionals who demand excellence. It offers an intuitive interface and premium build quality that sets a new industry standard.`,
      price,
      discountPercentage: discount,
      rating: parseFloat(rating),
      stock,
      brand,
      category: category.name,
      thumbnail,
      images: [
        thumbnail,
        `https://images.unsplash.com/photo-${imagePool[(i + 1) % imagePool.length]}?auto=format&fit=crop&q=80&w=800&sig=${i+100}`,
        `https://images.unsplash.com/photo-${imagePool[(i + 2) % imagePool.length]}?auto=format&fit=crop&q=80&w=800&sig=${i+200}`
      ],
      colors: ["Midnight Gold", "Lunar Silver", "Space Gray", "Ocean Blue"].sort(() => 0.5 - Math.random()).slice(0, 2),
      sizes: ["Standard", "Pro", "Max", "Mini"].sort(() => 0.5 - Math.random()).slice(0, 2),
      highlights: [
        `Integrated ${brand} smart features`,
        "Sustainable and durable materials",
        "Award-winning ergonomic design",
        "Exclusive limited edition series"
      ],
      isDeleted: false
    });
  }
  return generated;
}

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/quickora");
    console.log("Seed: Connected to DB");

    await Product.deleteMany({});
    console.log("Seed: Cleared existing products");

    const count = 510; // More than 500
    const products = generateProducts(count);
    
    // Chunk insert to avoid large object errors
    const chunkSize = 100;
    for (let i = 0; i < products.length; i += chunkSize) {
        await Product.insertMany(products.slice(i, i + chunkSize));
        console.log(`Seed: Inserted ${Math.min(i + chunkSize, products.length)} of ${products.length} products...`);
    }
    
    console.log("Seed: Successfully seeded 500+ premium products with diverse images!");
    process.exit();
  } catch (error) {
    console.error("Seed: Error during seeding", error);
    process.exit(1);
  }
}

seed();