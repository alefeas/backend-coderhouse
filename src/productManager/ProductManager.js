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
        console.log("Producto no encontrado")
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
        const allCarts = await this.getCarts()
        const cart = await this.getCartById(cartId)
        const cartIndex = allCarts.findIndex(item => item.id === cart.id)
        if(cart.error){
            return cart.error
        }
        const existingProduct = cart.products.find(prod => prod.product === productId)
        if(existingProduct){
            const updatedCart = cart.products.map(prod => {
                if(prod.product === productId){
                    return {
                        product: prod.id,
                        quantity: ++prod.quantity 
                    }
                }else{
                    return prod
                }
            })
        }else{
            cart.products.push({
                product: productId,
                quantity: 1
            })
        }
        allCarts[cartIndex] = cart
        const cartString = JSON.stringify(allCarts, null, '\t')
        await fs.writeFile(this.path, cartString)
        console.log('Producto agregado')
        return cart
    }
}

module.exports = ProductManager