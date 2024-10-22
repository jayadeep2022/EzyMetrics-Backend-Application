import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    title: String,
    status: String,
});

export const Campaign = mongoose.model('Campaign', campaignSchema);
