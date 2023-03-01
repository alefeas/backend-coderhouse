import { Router } from 'express'
import { roleMiddleware } from '../../middlewares/role.middleware.js'
import passport from "../../middlewares/passport.middleware.js"

export const router = Router()

router.post('/login',
    roleMiddleware, 
    passport.authenticate('login', 
    { failureRedirect: '/loginerror' }),
    (req, res) => {
        if (!req.user) {
            return res.status(400).send('Wrong user or password')
        }
        const sessionUser = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email,
            role: req.user.role
        }
        req.session.user = sessionUser
        res.redirect('/products')
    }
)

router.post('/register',
    passport.authenticate('register', {failureRedirect: '/session/failRegister'}), 
    (req, res) => {
        const sessionUser = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email
        }
        req.session.user = sessionUser
        res.redirect('/products')
    }
)

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/github-error'}),
    async (req, res) => {
        const sessionUser = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email,
        }
        req.session.user = sessionUser;
        res.redirect('/products');
    }
);

router.get('/logout', (req, res)=>{
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