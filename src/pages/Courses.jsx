import React from 'react'
import './css/Courses.css'
import webdesign from './images/webdesign.avif';
import account from './images/tally-accounts.jpg';
import graphics from './images/graphic.jpg';
import dca from './images/dca.png';
import adca from './images/pda.png';
import office from './images/msoffice.png';
import prog from './images/prog.png';
import python from './images/python.png';
import learnVideoEditing from './images/learn-video-editing.png';
import Card from './components/Card';

const Courses = () => {
  return (
    <div>
      <div className="top">
        <h1>
          Courses
        </h1>
      </div>
            <div className="part2-content">
                <Card image={webdesign} title={'Web Design & Development'} para={`We provide industrial training for Web Design & Development in Java, PHP & MySQL and provide live training on industry projects.`}/>
                <Card image={graphics} title={'Graphic Desining'} para={`We teach Graphic Designing with the help of latest designing tool like Photoshop , Coral Draw, 2D & 3D animations, video mixing & sound animations etc.`}/>
                <Card image={account} title={'Accounts'} para={`We provide training to the student on Tally Accounting Software to cater to the needs of Financial Accounting and Bookkeeping.`}/>
                <Card image={dca} title={'DCA'} para={`Explore fundamental computer skills, MS Office, and basics of accounting to enhance your career.`}/>
                <Card image={adca} title={'ADCA'} para={`Learn advanced concepts in computer applications, MS Office, and computerized accounting systems.`}/>
                <Card image={office} title={'MS OFFICE'} para={`Build expertise in MS Word, Excel, PowerPoint, and Access for professional applications.`}/>
                <Card image={python} title={'Python'} para={`Python is an interpreted, object-oriented, high-level programming language with dynamic semantics.`}/>
                <Card image={prog} title={'Programming Fundamentals'} para={`Learn programming basics in C, C++, Python, and more, to kickstart your coding journey.`}/>
                <Card image={learnVideoEditing} title={'Video Editing And Mixing'} para={`A video editing and mixing course teaches skills in editing footage, sound mixing, and creating professional content.`}/>
            </div>
    </div>
  )
}

export default Courses
