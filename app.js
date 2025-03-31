import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// const errorPage = require("./utlis/errorPage");
  
const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE' ,"PUT"],
    }
))

// app.use(cookieParser())
// app.use("/api/v1/auth", authRouter);
 

// app.use(errorPage); 

export default app

