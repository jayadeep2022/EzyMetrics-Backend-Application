import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    name: String,
    email: String,
    status: String,
});

export const Lead = mongoose.model('Lead', leadSchema);
