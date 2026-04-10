const categoryImagePool = {
  "Mobiles": ["photo-1598327105666-5b89351aff97", "photo-1511707171634-5f897ff02aa9", "photo-1610945265064-0e34e5519bbf", "photo-1592890288564-76628a30a657"],
  "Laptops": ["photo-1517336714731-489689fd1ca8", "photo-1496181133206-80ce9b88a853", "photo-1593642632823-8f785ba67e45", "photo-1588872657578-7efd1f1555ed"],
  "Audio": ["photo-1505740420928-5e560c06d30e", "photo-1546435770-a3e426bf472b", "photo-1484704849700-f032a568e944", "photo-1590658268037-6bf12165a8df"],
  "Fashion": ["photo-1445205170230-053b830c6039", "photo-1491336477066-31156b5e4f35", "photo-1542272604-787c3835535d", "photo-1515886657613-9f3515b0c78f"],
  "Cameras": ["photo-1516035069371-29a1b244cc32", "photo-1502920917128-1aa500764cbd", "photo-1516724562728-afc824a36e84", "photo-1526170375885-4d8ecf77b99f"],
  "Appliances": ["photo-1584622650111-993a426fbf0a", "photo-1571175484658-4b7244e2e674", "photo-1540608201573-0370601f65bb", "photo-1583394293214-28ded15ee548"],
  "Home": ["photo-1524758631624-e2822e304c36", "photo-1556228578-0d85b1a4d571", "photo-1586023492125-27b2c045efd7", "photo-1616489953149-8839cc194098"]
};

const mockProducts = [];

const brandsPool = {
  "Mobiles": ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Realme"],
  "Laptops": ["Apple", "Dell", "HP", "Lenovo", "ASUS", "Acer"],
  "Audio": ["Sony", "Bose", "JBL", "Sennheiser", "Apple", "Boat"],
  "Fashion": ["Nike", "Adidas", "Levi's", "ZARA", "Puma", "H&M"],
  "Cameras": ["Sony", "Canon", "Nikon", "Fujifilm", "GoPro"],
  "Appliances": ["LG", "Samsung", "Whirlpool", "Dyson", "Haier"],
  "Home": ["Herman Miller", "IKEA", "Home Centre", "Wakefit"]
};

const colors = ["Space Black", "Titanium Gray", "Royal Blue", "Sage Green", "Silver Metallic", "Phantom White", "Midnight Blue"];
const specs = ["(128 GB ROM, 8 GB RAM)", "(256 GB ROM, 12 GB RAM)", "(512 GB SSD, 16 GB RAM)", "(1 TB SSD, 32 GB RAM)", "Wireless High Fidelity", "Active Noise Cancellation", "Ergonomic Mesh"];

const categories = Object.keys(categoryImagePool);

// Generate 100+ HIGH QUALITY Flipkart-style products
for (let i = 1; i <= 100; i++) {
    const category = categories[i % categories.length];
    const brandPool = brandsPool[category];
    const brand = brandPool[i % brandPool.length];
    const color = colors[i % colors.length];
    const spec = specs[i % specs.length];
    
    const pool = categoryImagePool[category];
    const imgId = pool[i % pool.length];
    const imgUrl = `https://images.unsplash.com/${imgId}?auto=format&fit=crop&q=80&w=800`;
    
    mockProducts.push({
        id: `fk-gen-${i}`,
        title: `${brand} ${category === 'Mobiles' ? 'Galaxy' : ''} ${category} (${color}, ${spec})`,
        description: `Experience cutting edge technology with ${brand} ${category}. This ${category.toLowerCase()} offers premium build quality, ${spec} configuration, and exceptional performance. Trusted by millions on Flipkart/Amazon.`,
        price: 5000 + (i * 1500),
        discountPercentage: (i % 20) + 10,
        rating: 4.2 + (i % 8) / 10,
        stock: 10 + (i % 50),
        brand: brand,
        category: category,
        thumbnail: imgUrl,
        images: [imgUrl, imgUrl],
        isDeleted: false
    });
}

module.exports = { mockProducts };
