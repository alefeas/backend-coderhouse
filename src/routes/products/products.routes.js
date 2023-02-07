import express from "express";
//import {options} from "../config/options.js"
//import { ProductFileManager } from "../daos/fileManagers/product.manager.js"
import { ProductMongoManager } from "../../daos/mongoManager/product.manager.js";

//const poductService = new ProductFileManager(options.fileSystem.productsFileName)
const productService = new ProductMongoManager()

export const router = express.Router()

router.get('/', async (req, res)=>{
    try {
        const products = await productService.getProducts(req.query)
        return res.send({
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: null,
            nexLink: null})
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post("/", async (req, res) => {
    const product = req.body
    try {
        const data = await productService.addProduct(product)
        res.status(200).json({
            product: data,
            status: "success"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "error"
        })
    }
})

router.get("/:pid", async (req,res) => {
    const {pid} = req.params
    try {
        const data = await productService.getProductById(pid)
        res.send(data)
    } catch (error) {
        res.send(error)
    }
});

router.put("/:pid", async (req,res) => {
    const {pid} = req.params
    const product = req.body
    try {
        const data = await productService.updateById(product, pid);
        res.status(200).json({
            product: data,
            status: "success"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "error"
        })
    }
});

router.delete("/:pid", async(req, res) => {
    const {pid} = req.params
    try {
        const response = await productService.deleteById(pid)
        res.status(200).json({
            message: response,
            status: "success"
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            status: "error"
        })
    }
})