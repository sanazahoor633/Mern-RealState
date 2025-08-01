import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
name: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
adress: {
    type: String,
    required: true
},

regularPrice: {
    type: Number,
    required: true
},
discountedPrice: {
    type: Number,
    required: true
},
bedrooms: {
    type: Number,
    required: true
},
furnished: {
    type: Boolean,
    required: true
},
parking: {
    type: Boolean,
    required: true
},
type: {
    type: String,
    required: true
},
offer: {
    type: Boolean,
    required: true
},
imageUrls: {
    type: Array,
    required: true
},
userRefe: {
    type: String,
    required: true
},

}, {timestamps: true} 
);


const Listing = mongoose.model('Listing', listingSchema);

export default Listing