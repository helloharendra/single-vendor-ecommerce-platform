import { img } from './utils'

// Sample catalogue for the UI demo. The complete project loads products from the admin panel / database.
export type Product = { id: string; name: string; notes: string; roast: string; origin: string; price: number; weight: string; rating: number; image: string; tag?: string }

export const products: Product[] = [
  { id: 'monsoon-malabar', name: 'Monsoon Malabar', notes: 'Earthy · Spice · Low acidity', roast: 'Dark', origin: 'Kerala', price: 649, weight: '250g', rating: 4.9, image: img('1447933601403-0c6688de566e'), tag: 'Bestseller' },
  { id: 'chikmagalur-estate', name: 'Chikmagalur Estate', notes: 'Chocolate · Caramel · Hazelnut', roast: 'Medium', origin: 'Karnataka', price: 599, weight: '250g', rating: 4.8, image: img('1559056199-641a0ac8b55e') },
  { id: 'araku-valley', name: 'Araku Valley Reserve', notes: 'Citrus · Jasmine · Honey', roast: 'Light', origin: 'Andhra Pradesh', price: 749, weight: '250g', rating: 4.9, image: img('1511920170033-f8396924c348'), tag: 'Limited' },
  { id: 'cold-brew-pack', name: 'Cold Brew Bags (10)', notes: 'Smooth · Cocoa · Sweet', roast: 'Medium-dark', origin: 'Blend', price: 449, weight: '10 × 30g', rating: 4.7, image: img('1461023058943-07fcbe16d735') },
  { id: 'espresso-blend', name: 'House Espresso Blend', notes: 'Dark chocolate · Molasses', roast: 'Dark', origin: 'Blend', price: 549, weight: '250g', rating: 4.8, image: img('1509042239860-f550ce710b93') },
  { id: 'filter-kaapi', name: 'South Indian Filter Kaapi', notes: 'Chicory 20% · Bold · Rich', roast: 'Dark', origin: 'Coorg', price: 399, weight: '500g', rating: 4.9, image: img('1495474472287-4d71bcdd2085'), tag: 'Fan favourite' },
]

export const adminStats = {
  orders: [
    { id: '#UR-10291', customer: 'Aditi R.', items: 'Monsoon Malabar ×2', amount: 1298, status: 'Shipped', city: 'Bengaluru' },
    { id: '#UR-10290', customer: 'Karan M.', items: 'Subscription · Monthly', amount: 1099, status: 'Processing', city: 'Mumbai' },
    { id: '#UR-10289', customer: 'Shreya P.', items: 'Araku Valley Reserve', amount: 749, status: 'Delivered', city: 'Pune' },
    { id: '#UR-10288', customer: 'Nikhil S.', items: 'Filter Kaapi ×3', amount: 1197, status: 'Delivered', city: 'Chennai' },
    { id: '#UR-10287', customer: 'Ira K.', items: 'Cold Brew Bags', amount: 449, status: 'Cancelled', city: 'Delhi' },
  ],
  revenue: [32, 41, 38, 52, 47, 61, 58, 72, 69, 81, 77, 92],
}
