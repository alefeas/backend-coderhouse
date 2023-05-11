import { Router } from "express"
import { generateProduct } from "../../mocks/mock.js"
import { apiSuccessResponse } from "../../utils/api.utils.js"
import { HTTP_STATUS } from "../../constants/api.constants.js"

export const router = Router()

router.get('/', (req, res) =>{
    const products = Array.from({ length: 100}, () => generateProduct())
    const response = apiSuccessResponse(products)
    return res.status(HTTP_STATUS.OK).json(response)
})