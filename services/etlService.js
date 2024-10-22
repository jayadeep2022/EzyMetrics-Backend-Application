// services/etlService.js
import { Lead } from '../models/leadModel.js';
import { Campaign } from '../models/campaignModel.js';

export const etlProcess = async (leads, campaigns) => {
    // Clear existing data
    await Lead.deleteMany({});
    await Campaign.deleteMany({});

    // Store new data
    await Lead.insertMany(leads);
    await Campaign.insertMany(campaigns);
};
