const mongoose = require('mongoose');
const NhanVienSchema = new mongoose.Schema({
    ten: {
        type: String,
        require:true
    },
    diachi: {
        type: String
    },
    luong:{
        type: Number,
    }
})
const NhanVienModel = new mongoose.model('nhanvien', NhanVienSchema);

module.exports = NhanVienModel;