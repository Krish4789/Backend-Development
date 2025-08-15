// Import necessary modules
const express = require('express'); // Web framework for Node.js
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const path = require('path'); // Module for handling file and directory paths
const mailgun = require('mailgun-js'); // Mailgun module for sending emails
require('dotenv').config(); // Load environment variables from a .env file

// Initialize the Express application
const app = express();
const port = 3000; // Define the port number for the server

// Set up Mailgun with API key and domain from environment variables
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
});

// Serve static files (like CSS and images) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies

// Serve the HTML form when the root URL is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Send the HTML file for the form
});

// Handle form submissions
app.post('/', async (req, res) => {
    const { Firstname, Lastname, Email } = req.body; // Extract form data

    console.log('Form Data:', { Firstname, Lastname, Email }); // Log form data

    // Create the email message
    const data = {
        from: process.env.FROM_EMAIL, // Must be a verified Mailgun sender from .env
        to: Email, // Recipient's email address
        subject: 'Welcome to DEV@Deakin!', // Subject
        text: `Hi ${Firstname} ${Lastname},\n\nWelcome to DEV@Deakin! We're excited to have you on board.\n\nBest regards,\nThe DEV@Deakin Team`,
        html: `<p>Hi ${Firstname} ${Lastname},</p><p>Welcome to DEV@Deakin! We're excited to have you on board.</p><p>Best regards,<br>The DEV@Deakin Team</p>`
    };

    try {
        const body = await mg.messages().send(data); // Send the email
        console.log('Email sent successfully:', body); // Log Mailgun response
        res.send('Subscription successful! Check your email for a welcome message.');
    } catch (error) {
        console.error('Error sending email:', error); // Log any errors
        res.status(500).send('Error sending email. Please try again later.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
