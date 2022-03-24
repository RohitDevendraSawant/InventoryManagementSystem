const mongoose = require('mongoose');
const {schema} = mongoose.Schema;

const productsMasterSchema = new Schema({
    serialNo : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('productsMaster', productsMasterSchema);