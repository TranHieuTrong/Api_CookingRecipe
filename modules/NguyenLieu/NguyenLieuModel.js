const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NguyenLieuSchema = new Schema({
    name: { type: String, required: true },
    img: { type: String, required: true },
});

module.exports = mongoose.model('NguyenLieu', NguyenLieuSchema);