const fs = require("fs/promises")

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    const data = await fs.readFile(this.path, "utf-8")
    const items = await JSON.parse(data)
    return items;
  }

  async writeFile(data) {
    const stringData = JSON.stringify(data, null, "\t");
    return await fs.writeFile(this.path, stringData, "utf-8")
  }

  async getProductById(id) {
    const items = await this.getProducts();
    const itemSelected = items.find((item) => item.id === id)
    if (itemSelected) {
      return itemSelected
    } else {
      console.log("Product not found")
    }
  }

  async addProduct(product) {
    let products = await this.getProducts();
    const newId = products.length > 0 ? products[products.length -1 ].id + 1 : 1
    const newProduct = { id: newId, ...product }
    products.push(newProduct)
    await this.writeFile(products)
    return products;
  }

  async updateProduct(pid, properties) {
    const products = await this.getProducts()
    const foundProduct = await this.getProductById(pid)
    const productUpdated = { ...foundProduct, ...properties }

    if (foundProduct) {
      const updatedList = products.map((obj) => {
        if (obj.id === productUpdated.id) {
          return productUpdated;
        } else {
          return obj;
        }
      });
      this.writeFile(updatedList)
      return updatedList
    } else {
      console.log("no se encontro el producto")
    }
  }

  async deleteProduct(pid) {
    const products = await this.getProducts()
    const filteredProducts = products.filter((product) => product.id !== pid)
    await this.writeFile(filteredProducts)
    return filteredProducts;
  }

  // CART
  async createCart() {
    let cart = await this.getProducts()
    const newCart = { id: cart.length + 1, products: [] }
    cart.push(newCart)
    await this.writeFile(cart)
    return cart
  }

  async addToCart(cid, pid) {
    let cart = await this.getProducts()
    const newProduct = { prodId: pid, quantity: 1 }

    cart[cid - 1].products.push(newProduct)
    await this.writeFile(cart)
    return cart;
  }
}

module.exports = ProductManager
