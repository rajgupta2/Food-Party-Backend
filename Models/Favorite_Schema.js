const mongoose = require('mongoose');

const Favorite_Schema = mongoose.Schema({
    Email:{
        type: String,
        ref:'Colls_User',
        required: true
    },
    _MenuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Colls_MenuItems',
            required: true
    }
});


module.exports = Favorite_Schema;