const express = require('express')
const rateLimit = require('express-rate-limit')
const  { createProxyMiddleware} =require('http-proxy-middleware')
const {ServerConfig, Logger} =require('./config')
const apiRoutes = require('./routes')
const app =express();

const limiter = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 3
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(limiter);
app.use('/flightsService',createProxyMiddleware({target: ServerConfig.FLIGHT_SERVICE,changeOrigin:true, pathRewrite:{'^/flightService':'/'}}))

app.use('/bookingService',createProxyMiddleware({target: ServerConfig.BOOKING_SERVICE,changeOrigin:true}))
app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`server started on ${ServerConfig.PORT}`);
    Logger.info("Sucessfully started server ",{})
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoiYWJAYWRtaW4uY29tIiwiaWF0IjoxNjg1ODU2Mzk3LCJleHAiOjE2ODU4NTk5OTd9.qipvTe7SEFb6mD4iR2WY_RzltPQjdhFde58wDCStFj0";
    // const response = Auth.verifyToken(token);
    // console.log(response)
});