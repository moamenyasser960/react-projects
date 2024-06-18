import React from "react";

const Home = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
      <p className="text-lg mb-4">
        Hi, I&apos;m [Your Name], a passionate developer skilled in web development.
        Take a look at my projects, skills, and resume to know more about me.
      </p>
      <img
        src="your-profile-image.jpg"
        alt="Your Name"
        className="mx-auto rounded-full w-48 h-48 mb-4"
      />
      <p className="text-lg">
        Feel free to reach out to me via email at{" "}
        <a href="mailto:your-email@example.com" className="text-blue-600">
          your-email@example.com
        </a>
      </p>
    </div>
  );
};

export default Home;
