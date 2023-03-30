const express = require('express')

//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');

const app = express()

const mongoose = require('mongoose');
const uri = 'mongodb+srv://tungktph27675:tung07daidong@cluster0.e6ajppi.mongodb.net/Bai1?retryWrites=true&w=majority';
const NhanVienModel = require('./NhanVienModel');

app.engine('.hbs', expressHbs.engine({ 
  extname: "hbs", 
  defaultLayout: 'main', 
  layoutsDir: "views/layouts/" }));

  app.set('view engine', '.hbs');
  app.set('views', './views');

app.get('/', async (req, res) => {
    await mongoose.connect(uri);
    console.log('Ket Noi Thanh Cong');
    // let arrNV = await NhanVienModel.find();
    const nvList = await NhanVienModel.find().lean();
    res.render('layouts/main',{nvList})
  });
  app.get('/add_nv', async (req, res) => {
    await mongoose.connect(uri);

    console.log('Ket noi DB thanh cong');

    let nvMoi = {
        ten: 'Nguyen Thao Trang',
        diachi: 'HN',
        luong: 12
    };

    let kq = await NhanVienModel.insertMany(nvMoi);

    console.log(kq);

    let arrNV = await NhanVienModel.find();

    res.send(arrNV);
})
  const port = 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})