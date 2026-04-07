const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    addresses: { type: [Schema.Types.Mixed] },
    orders: { type: [Schema.Types.Mixed] },
    isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Virtual for ID
const virtualId = userSchema.virtual('id');
virtualId.get(function () {
    return this._id;
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

userSchema.set('toObject', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

exports.User = mongoose.model('User', userSchema);