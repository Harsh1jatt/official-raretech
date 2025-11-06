import React from "react";
import webdesign from "./images/webdesign.avif";
import account from "./images/tally-accounts.jpg";
import graphics from "./images/graphic.jpg";
import dca from "./images/dca.png";
import adca from "./images/pda.png";
import office from "./images/msoffice.png";
import prog from "./images/prog.png";
import python from "./images/python.png";
import learnVideoEditing from "./images/learn-video-editing.png";

const Courses = () => {
  const courses = [
    {
      image: webdesign,
      title: "Web Design & Development",
      para: "We provide industrial training for Web Design & Development in Java, PHP & MySQL and provide live training on industry projects.",
    },
    {
      image: graphics,
      title: "Graphic Designing",
      para: "We teach Graphic Designing using tools like Photoshop, CorelDRAW, 2D & 3D animation, video editing, and sound mixing.",
    },
    {
      image: account,
      title: "Accounts",
      para: "We train students on Tally Accounting Software to meet industry standards in Financial Accounting and Bookkeeping.",
    },
    {
      image: dca,
      title: "DCA",
      para: "Explore fundamental computer skills, MS Office, and accounting basics to boost your career prospects.",
    },
    {
      image: adca,
      title: "ADCA",
      para: "Learn advanced concepts in computer applications, MS Office, and computerized accounting systems.",
    },
    {
      image: office,
      title: "MS Office",
      para: "Build expertise in MS Word, Excel, PowerPoint, and Access for professional and business applications.",
    },
    {
      image: python,
      title: "Python",
      para: "Python is an interpreted, object-oriented, high-level programming language known for simplicity and flexibility.",
    },
    {
      image: prog,
      title: "Programming Fundamentals",
      para: "Learn programming basics in C, C++, Python, and more, to kickstart your coding journey.",
    },
    {
      image: learnVideoEditing,
      title: "Video Editing & Mixing",
      para: "Master video editing, sound mixing, and content creation for YouTube and professional media projects.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-5 md:px-20 font-poppins">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Our Courses
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore a wide range of professional computer and IT courses designed
          for beginners and advanced learners.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-white shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden transform hover:-translate-y-2"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-6 flex flex-col justify-between h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {course.para}
              </p>
              <button className="mt-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-600 transition-all">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
