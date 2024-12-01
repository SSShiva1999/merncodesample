import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    queryType: '',
    companyName: '',
    companyContact: '',
    companyLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('https://merncodesample-server.vercel.app/api/submit',  {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            queryType: formData.queryType, // Make sure to send the queryType
            companyName: formData.companyName,  // Send company name if Job Opportunities is selected
            companyContact: formData.companyContact,  // Send company contact if Job Opportunities is selected
            companyLocation: formData.companyLocation,  // Send company location if Job Opportunities is selected
        });
        alert(response.data.message);
    } catch (error) {
        console.error(error);
        alert('Error submitting form');
    }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Entry Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Query Type:</label>
          <select
            name="queryType"
            value={formData.queryType}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            <option value="Job Opportunities">Job Opportunities</option>
            <option value="Project Collaboration">Project Collaboration</option>
            <option value="Consultation or Advice">Consultation or Advice</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Resume Review or Feedback">Resume Review or Feedback</option>
            <option value="Networking Opportunities">Networking Opportunities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Conditional Inputs for Job Opportunities */}
        {formData.queryType === 'Job Opportunities' && (
          <div>
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Company Contact Number:</label>
              <input
                type="text"
                name="companyContact"
                value={formData.companyContact}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Company Location:</label>
              <input
                type="text"
                name="companyLocation"
                value={formData.companyLocation}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
