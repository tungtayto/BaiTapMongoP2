const express = require('express')
const expressHbs = require('express-handlebars');
const mongodb = require('mongodb');

const app = express()

const mongoose = require('mongoose');
const uri = 'mongodb+srv://tungktph27675:tung07daidong@cluster0.e6ajppi.mongodb.net/Bai1?retryWrites=true&w=majority';
const NhanVienModel = require('./NhanVienModel');

app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'main',
}));

app.set('view engine', '.hbs');

app.get('/', async (req, res) => {
  await mongoose.connect(uri);
  console.log('Ket Noi Thanh Cong');
  // let arrNV = await NhanVienModel.find();
  const nvList = await NhanVienModel.find().lean();
  res.render('layouts/main', { nvList })
});

app.get('/buttonAdd', (req, res) => {
  res.render('emptyViews', {
    layout: 'formAddNV'
  }
  )
});

app.get('/addNV', async (req, res) => {
  let name = req.query.nameNV;
  let address = req.query.addressNV;
  let salary = req.query.salaryNV;

  let nv = new NhanVienModel({
    ten: name,
    diachi: address,
    luong: salary,
  })
  try {
    await nv.save()
    res.redirect('/')
  } catch (error) {

  }
})

app.get('/updateNV', async (req, res) => {
  let idUpdate = req.query.editId;
  try {
    const list = await NhanVienModel.find().lean()
    let nv = await NhanVienModel.find({ _id: new mongodb.ObjectId(`${idUpdate}`) }).lean()
    res.render('emptyViews', {layout: 'formUpdateNV', dataNV: list, nv: nv[0], index: idUpdate })
  } catch (error) {
    console.log(error);
  }
})

app.get('/upNV', async (req, res) => {
  let name = req.query.nameNV
  let address = req.query.addressNV
  let salary = req.query.salaryNV
  let idNV = req.query.idNVien
  try {
      await mongoose.connect(uri)
      await NhanVienModel.collection.updateOne({ _id: new mongodb.ObjectId(`${idNV}`)}, { $set: { ten: name, diachi:address, luong: salary } })
      res.redirect('/')        
  } catch (error) {

  }
})

app.get('/deleteNV', async (req, res) => {
  let deleteId = req.query.idNV
  try {
    NhanVienModel.collection.deleteOne({ _id: new mongodb.ObjectId(`${deleteId}`) })
    res.redirect('/')
  } catch (error) {

  }
  console.log(deleteId)
})

const port = 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})