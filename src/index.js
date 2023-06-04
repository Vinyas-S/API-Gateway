const express = require('express')

const {ServerConfig, Logger} =require('./config')
const apiRoutes = require('./routes')
const { Auth} = require('./utils/common')
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT,()=>{
    console.log(`server started on ${ServerConfig.PORT}`);
    Logger.info("Sucessfully started server ",{})
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoiYWJAYWRtaW4uY29tIiwiaWF0IjoxNjg1ODU2Mzk3LCJleHAiOjE2ODU4NTk5OTd9.qipvTe7SEFb6mD4iR2WY_RzltPQjdhFde58wDCStFj0";
    const response = Auth.verifyToken(token);
    console.log(response)
});