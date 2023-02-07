import { ProductModel } from "../../models/product.models.js"

export class ProductMongoManager {

    async getProducts({query, sort, limit, page}) {
        try {
            const filter = (query ? {category: query} : {})

            const options = {
                sort: (sort ? {price: sort} : {}),
                limit: limit || 10,
                page: page || 1,
                lean: true
            }

            const products = await ProductModel.paginate(filter,options)

            return products
        } catch (error) {
            throw new Error(`Could not read file ${error}`)
        }
    }

    async addProduct(obj) {
        try {
            const productCreated = await ProductModel.create(obj)
            return productCreated
        } catch (error) {
            throw new Error(`Could not read file ${error}`)
        }
    }

    async getProductById(id) {
        try {
            const productFind = await ProductModel.findById(id)
            return productFind
        } catch (error) {
            throw new Error(`Could not read file ${error}`)
        }
    }

    async updateById(info, id) {
        try {
            const productUpdated = await ProductModel.findByIdAndUpdate(id, info, {new: true})
            return productUpdated
        } catch (error) {
            throw new Error(`Could not read file ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const productDeleted = await ProductModel.findByIdAndDelete(id)
            return productDeleted
        } catch (error) {
            throw new Error(`Could not read file ${error}`)
        }
    }
}