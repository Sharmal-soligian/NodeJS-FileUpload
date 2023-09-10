const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String
    },
    size: {
        type: Number
    }
},
{
    versionKey: false,
    timestamps: true
});

const File = mongoose.model('File', fileSchema);
module.exports = File;