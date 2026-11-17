export const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

/** Unsplash image URL helper (sample imagery for the demo). */
export const img = (id: string, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`
