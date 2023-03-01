import passport from "passport"
import { UserModel } from "../models/user.model.js"
import { isValidPassword, hashPassword } from "../utils.js"
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as GitHubStrategy } from "passport-github2"

passport.use('login', new LocalStrategy(
    {usernameField: 'email'},
    async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ email: username })
            if (!user) {
                done(null, false)
            } else {
                if(user.password !== password) {
                    done(null, false)
                } else {
                    const sessionUser = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        age: user.age,
                        email: user.email,
                        role: user.role
                    }
                    done(null, sessionUser)
                }
            }
        } catch (error) {
            return done(error)
        }
    }
))

/* passport.use('register', new LocalStrategy( 
    { passReqToCallback: true, userNameField: 'email' },
    async (req, username, password, done) => {
        const { firstName, lastName, age } = req.body
        try {
            const user = await UserModel.findOne({ email: username })
            if (user) {
                done(null, false)
            } else {
                const newUser = {
                    firstName,
                    lastName,
                    age,
                    email: username,
                    password: hashPassword(password)
                }
                const userDB = await UserModel.create(newUser)
                const sessionUser = {
                    _id: userDB._id,
                    firstName: userDB.firstName,
                    lastName: userDB.lastName,
                    age: userDB.age,
                    email: userDB.email
                }
                done(null, sessionUser)
            }
        } catch (error) {
            return done(error)
        }
    }
)) */

passport.use('register', new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: 'email'
    },
    async (req, username, password, done)=>{
        const { firstName, lastName, email, age } = req.body
        if(!firstName || !lastName || !age || !email || !password){
            console.log('missing fields');
            return done(null, false)
        }
        try {
            const user = await UserModel.findOne({ email: username })
            if(user){
                console.log('User already exist');
                return done(null, false)
            }
            const newUser = {
                firstName,
                lastName, 
                email,
                age,
                password: hashPassword(password)
            }
            const result = await UserModel.create(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error getting user: ' + error)
        }
    }

))

passport.use(
    new GitHubStrategy({
        clientID: 'Iv1.e2a5a6a2db253564',
        clientSecret: 'c8838aab2e36255bbea997059df485dab88f9f4c',
        callbackURL: 'http://localhost:8080/session/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // console.log(profile);
            const userData = profile._json;
            const user = await UserModel.findOne({ email: userData.email});
            if (!user) {
                const newUser = {
                firstName: userData.name.split(" ")[0],
                lastName: userData.name.split(" ")[1],
                age: userData.age || null,
                email: userData.email || null,
                password: null,
                gitHubLogin: userData.login
                };
                const response = await UserModel.create(newUser);
                done(null, response._doc);
            } else {
                done(null, user);
            }
        }
        catch(error) {
        done(error);
        }
    }
));


passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id)
    done(null, user)
})

export default passport