import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
const app=express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));
app.use(express.json({limit:"16Kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static('public'));
app.use(cookieParser());

//routes
import couponRouter from './routes/coupon.routes.js'
app.use("/api/v1/coupons",couponRouter);
export {app};
