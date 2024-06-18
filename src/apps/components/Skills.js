import React from 'react';

const skills = [
  'JavaScript',
  'React',
  'Node.js',
  'CSS',
  'HTML',
  'Git',
  // Add more skills here
];

const Skills = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Skills</h2>
      <ul className="list-disc list-inside">
        {skills.map((skill, index) => (
          <li key={index} className="mb-2">{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
