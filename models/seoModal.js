const mongoose = require('mongoose');

const seoSchema = mongoose.Schema({

    select_page: {
        type: String,
        require: true
    },

    meta_title: {
        type: String,
        require: true
    },

    meta_description: {
        type: String,
        require: true
    },

    meta_keyword: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Seo', seoSchema);