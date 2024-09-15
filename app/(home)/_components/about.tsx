import React from "react";

function About() {
  return (
    <div className="py-16 px-8 bg-gray-50 text-center">
      <h2 className="text-4xl font-bold mb-8 text-gray-900 tracking-tight">
        Our Values
      </h2>
      <ul className="text-lg text-gray-700 space-y-6 max-w-md mx-auto">
        {[
          "Compassion",
          "Collaboration",
          "Unlocking potential in others",
          "Making good things happen",
          "Bringing purpose to all that we do",
        ].map((value, index) => (
          <li
            key={index}
            className="relative before:absolute before:content-['✓'] before:text-teal-500 before:left-0 before:-top-1 before:text-2xl pl-8 hover:text-gray-900 transition-colors"
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default About;
