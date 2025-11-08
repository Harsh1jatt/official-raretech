llimport React, { useState, useEffect } from 'react';
import './css/Home.css';
import accounts from './images/accounts.png';
import graphic from './images/graphic.png';
import hardware from './images/hardware.png';
import learnVideoEditing from './images/learn-video-editing.png';
import SEO from './images/SEO.png';
import web from './images/web.png';
import webdesign from './images/webdesign.avif';
import account from './images/tally-accounts.jpg';
import graphics from './images/graphic.jpg';
import dca from './images/dca.png';
import adca from './images/pda.png';
import office from './images/msoffice.png';
import Card from './components/Card';
import p5 from './images/p5.png';
import { Link } from 'react-router-dom'; // ← Add this at the top
const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [accounts, graphic, hardware, learnVideoEditing, SEO, web];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero">
        <img src={images[currentImageIndex]} alt="hero" className="hero-bg" />
        <div className="hero-overlay">
          <h1>Empowering Careers with Technology</h1>
          <p>Learn from professionals. Build real-world skills. Get placed.</p>
          <div className="hero-btns">
            <button className="cta-btn primary">Explore Courses</button>
            <button className="cta-btn secondary">Contact Us</button>
          </div>
        </div>
        <div className="prev-btn sliderbtn" onClick={prevImage}>
          &#10094;
        </div>
        <div className="next-btn sliderbtn" onClick={nextImage}>
          &#10095;
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about split">
        <div className="about-text">
          <h2>About Raretech Institute</h2>
          <p>
            Raretech is an ISO 9001 Certified & Govt. Registered Institute with over 
            <strong> 10+ years of excellence </strong> in IT training. 
            We believe in <strong>concept-based, practical learning</strong> 
            that prepares students for industry demands. From Web Development to Tally, 
            our courses ensure students are future-ready.
          </p>
          <button className="cta-btn primary">Know More</button>
        </div>
        <div className="about-image">
          <img src={graphic} alt="About Us" />
        </div>
      </section>

      {/* COURSES SECTION */}
      <section className="courses">
        <h2>Our Popular Courses</h2>
        <p className="section-subtitle">Industry-ready programs designed for your success</p>
        <div className="course-grid">
          <Card image={webdesign} title={'Web Design & Development'} para={`Hands-on training with Java, PHP, MySQL & industry projects.`}/>
          <Card image={graphics} title={'Graphic Designing'} para={`Master Photoshop, CorelDRAW, 2D/3D Animation & Video Editing.`}/>
          <Card image={account} title={'Accounts (Tally)'} para={`Learn Tally, Bookkeeping & Financial Accounting.`}/>
          <Card image={dca} title={'DCA'} para={`MS Office, Internet, Email & basic Accounting.`}/>
          <Card image={adca} title={'ADCA'} para={`Advanced MS Office & computerized accounting.`}/>
          <Card image={office} title={'MS OFFICE'} para={`Excel, Word, PowerPoint & Access for professionals.`}/>
        </div>
      </section>

      {/* PLACEMENTS SECTION */}
      <section className="placement">
        <div className="placement-text">
          <h2>Placements & Careers</h2>
          <p>
            We don’t just educate — we provide <strong>career opportunities</strong>. 
            Our students have been successfully placed in IT companies, schools, 
            industries, and corporates as Developers, Designers, and Accountants.
          </p>
          <div className="stats">
            <div><h3>500+</h3><p>Students Placed</p></div>
            <div><h3>50+</h3><p>Industry Partners</p></div>
            <div><h3>10+</h3><p>Years of Experience</p></div>
          </div>
        </div>
        <div className="placement-img">
          <img src={p5} alt="Placements" />
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <h2>Ready to start your IT journey?</h2>
        <p>Enroll now and transform your future with Raretech.</p>
          <Link to="/contact">
    <button className="cta-btn primary">Enroll Today</button>
  </Link>
      </section>

    </div>
  );
};

export default Home;
