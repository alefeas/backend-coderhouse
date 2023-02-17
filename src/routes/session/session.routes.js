import { Router } from 'express'
import { UserModel } from '../../models/user.model.js'
import { roleMiddleware } from '../../middlewares/role.middleware.js'

export const router = Router()

router.get('/', (req, res)=>{
    try {
        res.render('session', {
            title: "Account",
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            error: error.message
        })
    }
})

router.post('/register', async (req, res)=>{
    try {
        const email = req.body.email
        let user = await UserModel.findOne({ email });
        if (user) {
            return res.send('Error: Email already registered');
        }
        await UserModel.create(req.body)
        res.redirect('/login')
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status:'error',
            error: error
        })
    }
})

router.post('/login', roleMiddleware, async (req,res)=>{
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({email: email}).lean()
        if(user.password !== password){
            return res.send('incorrect password')
        }
        if(!user){
            return res.send('User not found')
        }
        const userSession = {
            ...user,
            role: 'user'
        } 
        req.session.user = userSession
        req.session.save(err => {
            if (err){
                console.log('session error: ', err);
            } 
            else {
                res.redirect('/products');
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error: error
        })
    }
})

router.get('/logout', async (req, res)=>{
    try {
        req.session.destroy(err => {
            if (err) {
                console.log(err);
            }
            else {
                res.clearCookie('session')
            }
        })
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error: error
        })   
    }
})