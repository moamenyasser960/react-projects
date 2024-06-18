import React from 'react';

const projects = [
  {
    name: 'Project One',
    description: 'Description for project one.',
    link: 'https://github.com/yourusername/project-one'
  },
  {
    name: 'Project Two',
    description: 'Description for project two.',
    link: 'https://github.com/yourusername/project-two'
  },
  // Add more projects here
];

const Projects = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
            <p className="mb-2">{project.description}</p>
            <a href={project.link} className="text-blue-600" target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
