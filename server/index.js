const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Allow specific origin(s)
app.use(cors({
  origin: '"*"',
  credentials: true
}));



// "*", "https://talku-talku-v3.vercel.app", "https://talku-talku-v3-server-5wgbjqivt-vinyl-davyl.vercel.app", "https://talku-talku-v3-server.vercel.app"

// Simple endpoint to handle form submission
app.post('/api/submit', (req, res) => {
    const { name, email, message, queryType, companyName, companyContact, companyLocation } = req.body;
  
    // Check if the required fields are present
    if (!name || !email || !message || !queryType) {
      console.log('Form submission failed: Missing fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // If "Job Opportunities" is selected, we need to ensure company-related fields are provided
    if (queryType === 'Job Opportunities' && (!companyName || !companyContact || !companyLocation)) {
      console.log('Form submission failed: Missing company details');
      return res.status(400).json({ message: 'Please provide company details for Job Opportunities' });
    }
  
    // Log the received data to the console
    console.log('Form submission received:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);
    console.log(`Query Type: ${queryType}`);
    
    if (queryType === 'Job Opportunities') {
      console.log(`Company Name: ${companyName}`);
      console.log(`Company Contact: ${companyContact}`);
      console.log(`Company Location: ${companyLocation}`);
    }
  
    // Respond with success
    res.status(200).json({ message: 'Form submitted successfully!' });
});

// Set the port for the server
const PORT = process.env.PORT || 5001;  // Change 5000 to another port, like 5001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
