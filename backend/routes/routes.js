import eventRouter from './event.routes.js'
import userRouter from './user.routes.js'
import baseRouter from './base.routes.js'
import authRouter from './auth.routes.js'
import publicRouter from './public.routes.js'
import passport from '../configs/passport.js'
import './schemas.js'

// Middleware для защиты маршрутов
const authenticateJWT = passport.authenticate('jwt', { session: false })

export { 
    eventRouter, 
    userRouter, 
    baseRouter, 
    authRouter, 
    publicRouter,
    authenticateJWT 
}
