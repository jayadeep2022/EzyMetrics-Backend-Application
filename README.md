# EzyMetrics Backend Application

## Project Overview

The EzyMetrics Backend Application is a Node.js-based server that simulates a data integration platform for managing leads and campaigns. It demonstrates fetching dummy data, transforming it into meaningful metrics, generating PDF reports, and sending email notifications based on specific conditions.

The application covers the following tasks:
1. Fetch and store dummy leads and campaigns data.
2. Process the data using an ETL (Extract, Transform, Load) approach.
3. Generate a PDF report of the data, available for download.
4. Send email notifications with the report attached when certain conditions are met.

## Features

- **Dummy Data Integration**: Simulates fetching data without integrating with an actual CRM.
- **ETL Process**: Efficiently processes data before storing it in MongoDB.
- **PDF Report Generation**: Creates detailed reports of leads and campaigns.
- **Email Notifications**: Sends emails with the report attached when certain criteria are met.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (local or cloud instance)
- **npm** (Node Package Manager)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ezy-metrics-backend.git
cd ezy-metrics-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

- Replace `MONGODB_URI` with your MongoDB connection string.
- Replace `EMAIL_USER` and `EMAIL_PASS` with your email credentials. The application uses these for sending email notifications.

### 4. Run the Application

```bash
node index.js
```

The server will start on the configured port (default is 3000).

## Project Structure

```
/ezyMetrics
├── models/
│   ├── leadModel.js       # Mongoose schema for leads
│   ├── campaignModel.js   # Mongoose schema for campaigns
├── routes/
│   ├── reportRoutes.js    # Routes for handling report generation
├── services/
│   ├── emailService.js    # Service for sending emails
│   ├── etlService.js      # Service for ETL processing of data
│   ├── dummyDataService.js # Service for simulating dummy data
├── app.js                 # Main application setup
├── index.js               # Entry point of the application
├── package.json           # Dependencies and scripts
└── .env                   # Environment configuration
```

## Usage

### 1. Fetch Dummy Data

To fetch and store dummy data in the database, use the following endpoint:

```http
GET /api/fetch-data
```

This will simulate fetching data from an external source and store it in MongoDB.

### 2. Generate PDF Report

To generate and download a PDF report, send a POST request with the user's email:

```http
POST /api/generate-report
```

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:**

- The report will be downloaded as a PDF file.
- An email with the report will be sent to the specified email address if the following conditions are met:
  - More than 3 leads are present in the database.
  - There is at least one active campaign.

## Example Email Notification

The email sent to the user will include:

- Subject: `Your Report`
- HTML Content: A summary of the leads and campaigns.
- Attachment: A PDF file with the detailed report.

### Email Body Example:

```html
<h1>EzyMetrics Report</h1>
<p>Here is your report:</p>
<p>Total Leads: 5</p>
<p>Total Active Campaigns: 2</p>
```

## Sample Dummy Data

This application uses the following sample data:

### Leads

| Name       | Email             | Status     |
|------------|-------------------|------------|
| John Doe   | john@example.com  | New        |
| Jane Doe   | jane@example.com  | Contacted  |
| Mike Smith | mike@example.com  | Interested |

### Campaigns

| Title             | Status     |
|-------------------|------------|
| Winter Sale       | Active     |
| Summer Clearance  | Completed  |

## Built With

- **Node.js**: Server-side runtime
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **PDFKit**: For generating PDF reports
- **Nodemailer**: For sending emails
