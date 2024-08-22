import express from 'express';
import publicRoutes from './routes/public.js'

const app = express();
app.use(express.json())
app.use('/', publicRoutes)

app.get('/',(req,res)=>{
    return res.json({message:'alexxxx'})
})

app.listen(3000, ()=> console.log('oi'))
