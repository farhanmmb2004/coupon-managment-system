import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
const app=express();
app.use(cors({
    origin: ['http://localhost:5173', 'https://coupon-claim.netlify.app'],
    credentials: true
}));
app.set('trust proxy', true);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://coupon-claim.netlify.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.json({limit:"16Kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

//routes
import couponRouter from './routes/coupon.routes.js'
app.use("/api/v1/coupons",couponRouter);
export {app};
