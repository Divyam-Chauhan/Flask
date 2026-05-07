// DOM Elements
const productGrid = document.getElementById('product-grid');
const resultsCount = document.getElementById('results-count');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    lucide.createIcons();
});


//GET Products from Flask API

async function fetchProducts() {
    try {
        const response = await fetch('http://127.0.0.1:5000/products');
        if (!response.ok) throw new Error('Failed to fetch');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.warn('Failed to fetch products:', error);
        renderProducts([]);
    }
}




function renderProducts(products) {
    // Update count
    if (resultsCount) {
        resultsCount.textContent = `Showing ${products.length} results`;
    }

    // Clear loading state
    if (productGrid) {
        productGrid.innerHTML = '';

        if (products.length === 0) {
            productGrid.innerHTML = `
                <div class="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                    <p>No products found</p>
                </div>
            `;
            return;
        }

        products.forEach((product, index) => {
            const bgColors = ['#E8F3F1', '#FDF1EB', '#F3EEF5', '#FDF8E8', '#EBF4F6'];
            const hoverColors = ['#D1E7E3', '#FCE3D7', '#E7DFEC', '#FCEFD0', '#D8EAEF'];
            const bgColor = bgColors[index % bgColors.length];
            const hoverColor = hoverColors[index % hoverColors.length];

            const card = document.createElement('div');
            // Added card-entrance class and inline style for staggered delay
            card.className = 'card-entrance group flex flex-col overflow-hidden bg-white border border-slate-100 rounded-2xl product-card';
            card.style.animationDelay = `${index * 100}ms`; // Staggered animation

            card.innerHTML = `
                <!-- Top Half - Premium Pastel Background -->
             <div class="relative flex h-72 w-full items-center justify-center overflow-hidden transition-colors duration-500"
                  style="background-color: ${bgColor};"
                  onmouseover="this.style.backgroundColor='${hoverColor}'"
                  onmouseout="this.style.backgroundColor='${bgColor}'">
                    
                    <!-- Product Image -->
                    <div class="relative z-10 h-52 w-52 flex items-center justify-center mix-blend-multiply">
                        <img 
                            src="${product.image}" 
                            alt="${product.name}"
                            class="h-full w-full object-contain drop-shadow-xl"
                            loading="lazy"
                        />
                    </div>
                </div>

                <!-- Bottom Half - White Info Area -->
                <div class="flex flex-1 flex-col items-center p-6 text-center">
                    <!-- Category Tag -->
                    <span class="mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        ${product.category || 'General'}
                    </span>

                    <!-- Product Name -->
                    <h3 class="mb-2 text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-slate-700 transition-colors">
                        ${product.name}
                    </h3>
                    
                    <!-- Description -->
                    <p class="mb-6 line-clamp-2 text-xs leading-relaxed text-slate-500 px-2 h-9">
                        ${product.description}
                    </p>

                    <!-- Premium Color Dots -->
                    <div class="mb-6 flex justify-center gap-3 opacity-80 transition-opacity group-hover:opacity-100">
                        <div class="h-3 w-3 rounded-full bg-[#FF6B6B] color-swatch transition-all cursor-pointer"></div>
                        <div class="h-3 w-3 rounded-full bg-[#4ECDC4] color-swatch transition-all cursor-pointer"></div>
                        <div class="h-3 w-3 rounded-full bg-[#292D32] color-swatch transition-all cursor-pointer"></div>
                    </div>

                    <!-- Price and Button Row -->
                    <div class="mt-auto flex w-full items-center justify-between border-t border-slate-50 pt-5">
                        <div class="flex flex-col items-start">
                            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Price</span>
                            <span class="text-xl font-bold text-slate-900 font-mono tracking-tight">
                                $${product.price.toFixed(2)}
                            </span>
                        </div>
                        <button 
                            class="btn-shine h-10 rounded-full bg-slate-900 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-slate-900/30 hover:-translate-y-0.5 transition-all active:translate-y-0"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        // Re-initialize icons for new content
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}
