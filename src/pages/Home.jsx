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

    // Automatically change the image every 2 seconds
    useEffect(() => {
        const interval = setInterval(nextImage, 2000); // 2000ms = 2 seconds
        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div>
            <div className="slider">
                <img
                    src={images[currentImageIndex]}
                    alt="slider"
                    className="slider-image"
                    id='slider-image'
                />
                <div className="prev-btn sliderbtn" onClick={prevImage}>
                    &#10094;
                </div>
                <div className="next-btn sliderbtn" onClick={nextImage}>
                    &#10095;
                </div>
            </div>
            <div className="part1">
                <h1>Welcome To Raretech Institute Of Information Technology</h1>
                <p>An ISO 9001 Certified & Govt. Registered Institute. We are providing quality concept based computer education at reasonable rates for the last 10+ years, Institute is run by the Professionals, for the Professionals. Raretech Institute Of Information Technology, Ludhiana focuses on concept based training instead of cramming using latest art of technology. We are teaching PHP, Web Designing, Website Design & Development, Live Projects, Dreamweaver, Coral Draw, Photoshop, Tally, HTML & CSS etc., We offer 6 months Industrial Training with Live Project, 6 weeks (Six Weeks) - 45 Days training for B-Tech students and all types of Training for BCA & MCA Final Year students for Projects preparation and submission to their respective university.
                </p>
            </div>
            <div className="part2">
                <div className="part2-content">
                    <Card image={webdesign} title={'Web Design & Development'} para={`We provide industrial training for Web Design & Development in Java, PHP & MySQL and provide live training on industry projects.`}/>
                    <Card image={graphics} title={'Graphic Desining'} para={`We teach Graphic Designing with the help of latest designing tool like Photoshop , Coral Draw, 2D & 3D animations, video mixing & sound animations etc.`}/>
                    <Card image={account} title={'Accounts'} para={`We provide training to the student on Tally Accounting Software to cater to the needs of Financial Accounting and Bookkeeping.`}/>
                    <Card image={dca} title={'DCA'} para={`Explore fundamental computer skills, MS Office, and basics of accounting to enhance your career.`}/>
                    <Card image={adca} title={'ADCA'} para={`Learn advanced concepts in computer applications, MS Office, and computerized accounting systems.`}/>
                    <Card image={office} title={'MS OFFICE'} para={`Build expertise in MS Word, Excel, PowerPoint, and Access for professional applications.`}/>
                </div>
            </div>
            <div className="part3 part1">
                <h1>We Just Don’t Educate, We Also Provide Placements.</h1>
                <p>Raretech Institute has a renowned name in job placements and has been in this field for long years. All merit students are given an opportunity for best placements in industries, schools and colleges.</p>
                <p>We have been able to guide our students and provide placement in manufacturing industries for posts such as computer operator, designers, accounting executive and for other official posts.</p>
                <p>Students passing out of Raretech are also given proper advice and consulting to appear and apply for the various post that appears in Newspaper and  Periodicals</p>
                <p>We understand placement is vital for candidates to apply his her knowledge in the real world. Hence for the last 10 years, we have been able to place a lot of students to industries in Ludhiana and also in our own academy.</p>
            </div>
            <img src={p5} alt="A Choice That makes a Big Difference in your Career" />
        </div>
    );
};

export default Home;
