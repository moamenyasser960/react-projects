import React from 'react';

const Resume = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Resume</h2>
      <p className="mb-4">Download my resume <a href="your-resume-link.pdf" className="text-blue-600" target="_blank" rel="noopener noreferrer">here</a>.</p>
      <h3 className="text-2xl font-bold mb-2">Experience</h3>
      <ul className="list-disc list-inside mb-4">
        <li className="mb-2">Job Title at Company - (Year - Year)</li>
        <li className="mb-2">Job Title at Company - (Year - Year)</li>
        {/* Add more experience here */}
      </ul>
      <h3 className="text-2xl font-bold mb-2">Education</h3>
      <ul className="list-disc list-inside">
        <li className="mb-2">Degree at University - (Year - Year)</li>
        {/* Add more education here */}
      </ul>
    </div>
  );
};

export default Resume;
