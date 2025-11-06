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
      para:
        "Master modern web design & development with HTML, CSS, JavaScript, React and live project training.",
    },
    {
      image: graphics,
      title: "Graphic Designing",
      para:
        "Learn Photoshop, CorelDRAW, Illustrator, 2D/3D basics, and professional design workflows.",
    },
    {
      image: account,
      title: "Tally Accounting",
      para:
        "Hands-on Tally ERP training: GST, bookkeeping and real-world business accounting practices.",
    },
    {
      image: dca,
      title: "DCA (Diploma in Computer Applications)",
      para:
        "Foundation course covering computer basics, MS Office, internet, and digital literacy.",
    },
    {
      image: adca,
      title: "ADCA (Advanced DCA)",
      para:
        "Advanced office automation, Excel skills, and computerized accounting systems for careers.",
    },
    {
      image: office,
      title: "MS Office",
      para:
        "Become proficient in Word, Excel, PowerPoint and Access for professional use.",
    },
    {
      image: python,
      title: "Python Programming",
      para:
        "Learn Python from basics to building real projects — automation, scripts and simple apps.",
    },
    {
      image: prog,
      title: "Programming Fundamentals",
      para:
        "Strong basics in C, C++ and Python — logic, data structures intro and practice problems.",
    },
    {
      image: learnVideoEditing,
      title: "Video Editing & Mixing",
      para:
        "Professional video editing & sound mixing for YouTube, marketing and creative media.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-white via-slate-50 to-white py-20 px-6 md:px-16 font-sans">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Our Professional Courses
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Job-oriented computer & IT courses with practical training. Pick a
          course and start building real skills.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((c, i) => (
          <article
            key={i}
            className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transform transition duration-400 ease-out hover:-translate-y-2"
            aria-labelledby={`course-${i}`}
          >
            {/* Image + overlay */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* CTA that appears on hover */}
              <a
                href="#"
                className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6 transform transition-all duration-400"
                aria-label={`View details for ${c.title}`}
              >
                <button className="bg-white/95 text-slate-900 py-2 px-4 rounded-full text-sm font-medium shadow-md hover:scale-105 transition">
                  View Details
                </button>
              </a>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4">
              <h2
                id={`course-${i}`}
                className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-blue-600"
              >
                {c.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {c.para}
              </p>

              <div className="flex items-center justify-between gap-4">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
                >
                  Learn more
                  <svg
                    className="w-4 h-4 inline-block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </a>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">Duration</span>
                  <span className="text-sm font-semibold text-slate-800 bg-slate-100 px-3 py-1 rounded-full">
                    1–3 months
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Row */}
      <div className="max-w-3xl mx-auto mt-12 text-center">
        <a
          href="#contact"
          className="inline-block bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-full font-semibold shadow-lg hover:from-blue-700 hover:to-cyan-600 transform hover:-translate-y-1 transition"
        >
          Enroll Now
        </a>
      </div>
    </section>
  );
};

export default Courses;
