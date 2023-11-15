import passport from 'passport';
import LocalStrategy from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { userModel } from '../dao/db/models/user.model.js';
import CartManager from '../controllers/cartManager.js';
import bcrypt from 'bcrypt';
import jwt from "passport-jwt";

import { config }from "dotenv";
config()

const cartManager = new CartManager();

const JwtStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies['token'];
    }
  
    return token;
};


const initializePassport = () => {
    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' },
            async (req, username, password, done) => {
                const { first_name, last_name, age } = req.body;
                let rol = "usuario";

                try {
                    const findUser = await userModel.findOne({ email: username });

                    if (findUser) {
                        return done(null, false);
                    }

                    if (username === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                        rol = "admin";
                    }

                    const cart ={ products: [] }
                    const userCart = await cartManager.createCart(cart)

                    const user = await userModel.create({
                        first_name,
                        last_name,
                        age,
                        email: username,
                        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                        rol,
                        cart: userCart._id,
                    });

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },
            async (username, password, done) => {
                const user = await userModel.findOne({ email: username });

                if (!user) {
                    return done(null, false);
                }

                if (!bcrypt.compareSync(password, user.password)) {
                    return done(null, false);
                }

                done(null, user);
            }
        )
    );

    passport.use(
        "github",
        new GitHubStrategy(
            {
                clientID: 'Iv1.9ebde67251aaef22',
                clientSecret: '63aa642124628e43d01a8355fad4c25e57ee620f',
                callbackURL: 'http://localhost:8080/api/githubcallback',
                scope: ['user:email'],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const email = profile.emails[0].value;
                    const user = await userModel.findOne({ email: email });
    
                    if (user) {
                        return done(null, user);
                    } else {
                        const createUser = userModel.create({
                            first_name: profile.username,
                            last_name:'',
                            age: 19,
                            email: email,
                            password: '',
                            rol: 'usuario',
                        });
    
                        return done(null, createUser);
                    }
                } catch (error) {
                    return done(error);
                }

            }
        )
    )
        
    passport.use(
        'jwt', 
        new JwtStrategy(
        {
            jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET,
        },
        async(jwt_payload, done)=>{
            try {
                done(null, jwt_payload)
            } catch (error) {
                done(error)
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        done(null, user);
    });
}

export default initializePassport;
