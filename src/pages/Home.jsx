import React, { useState, useEffect } from 'react';
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
        const interval = setInterval(nextImage, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home-container">
            {/* HERO SECTION */}
            <section className="slider">
                <img
                    src={images[currentImageIndex]}
                    alt="slider"
                    className="slider-image"
                />
                <div className="overlay">
                    <h1>Raretech Institute of Information Technology</h1>
                    <p>Empowering Students with Professional Computer Education</p>
                    <button className="cta-btn">Get Started</button>
                </div>
                <div className="prev-btn sliderbtn" onClick={prevImage}>
                    &#10094;
                </div>
                <div className="next-btn sliderbtn" onClick={nextImage}>
                    &#10095;
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section className="about">
                <h2>About Us</h2>
                <p>
                    An ISO 9001 Certified & Govt. Registered Institute with 10+ years of
                    excellence in concept-based computer education. We focus on practical,
                    industry-ready training in Web Development, Graphic Design, Tally
                    Accounts, MS Office, Video Editing, and more.
                </p>
            </section>

            {/* COURSES SECTION */}
            <section className="courses">
                <h2>Our Popular Courses</h2>
                <div className="course-grid">
                    <Card image={webdesign} title={'Web Design & Development'} para={`Hands-on training with Java, PHP, MySQL & industry projects.`}/>
                    <Card image={graphics} title={'Graphic Designing'} para={`Master Photoshop, CorelDRAW, 2D/3D Animation & Video Editing.`}/>
                    <Card image={account} title={'Accounts'} para={`Learn Tally Accounting Software, Bookkeeping & Finance basics.`}/>
                    <Card image={dca} title={'DCA'} para={`Learn MS Office, Internet, Email & basic Accounting.`}/>
                    <Card image={adca} title={'ADCA'} para={`Advanced MS Office & computerized accounting systems.`}/>
                    <Card image={office} title={'MS OFFICE'} para={`Excel, Word, PowerPoint & Access for professional use.`}/>
                </div>
            </section>

            {/* PLACEMENT SECTION */}
            <section className="placement">
                <h2>Placements & Careers</h2>
                <p>
                    We not only educate but also help our students build their careers.
                    With strong placement support, our students have secured jobs in
                    industries, schools, and companies as Developers, Designers,
                    Accountants, and IT Executives.
                </p>
                <img src={p5} alt="Placements" className="placement-img" />
            </section>

        </div>
    );
};

export default Home;
