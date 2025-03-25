import React from 'react'
import './css/Legal.css';
import iso from './images/iso.png'
import udyam1 from './images/udyam1.jpeg'
import udyam2 from './images/udyam2.jpeg'
const Legal = () => {
  return (
    <div>
      <div className="top">
        <h1>Our Certificates</h1>
      </div>
      <div className="certificates">
        <div className="card">
          <div className="img">
            <img src={iso} alt="" />
          </div>
          <h3>ISO 9001:2015 Certificate</h3>
        </div>
        <div className="card">
          <div className="img">
            <img src={udyam1} alt="" />
          </div>
          <h3>Udyam Certificate Page 1</h3>
        </div>
        <div className="card">
          <div className="img">
            <img src={udyam2} alt="" />
          </div>
          <h3>Udyam Certificate Page 2</h3>
        </div>
      </div>
    </div>
  )
}

export default Legal
