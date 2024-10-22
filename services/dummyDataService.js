// services/dummyDataService.js
export const getDummyLeads = () => {
    return [
        { name: "John Doe", email: "john@example.com", status: "New" },
        { name: "Jane Doe", email: "jane@example.com", status: "Contacted" },
        { name: "Mike Smith", email: "mike@example.com", status: "Interested" },
        // Add more dummy data as needed
    ];
};

export const getDummyCampaigns = () => {
    return [
        { title: "Winter Sale", status: "Active" },
        { title: "Summer Clearance", status: "Completed" },
        // Add more dummy campaigns as needed
    ];
};
