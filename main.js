var app = new Vue ({
  el: '#app',
  data: {
    product: 'Socks',
    image: 'vmSocks-green-onWhite.jpg',
    link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
    inventory: 10, 
    inStock: true,
    sale: true,
    details: ["80% Cotton", "20% Polyester", "Gender Neutral"],
    variants: [{
        variantId: 2234,
        variantColor: "green",
        variantImage: 'vmSocks-green-onWhite.jpg'
      },

      {
        variantId: 2235,
        variantColor: "blue",
        variantImage: "vmSocks-blue-onWhite.jpg"
      }],
    sizes: ["Small", "Medium", "Large"],
    cart: 0
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    removeFromCart() {
      this.cart -= 1
    },

    updateProduct(variantImage) {
      this.image = variantImage
    }
  }
})
