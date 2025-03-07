import { useState } from "react";
import "./css/CertificatePopup.css";

const CertificatePopup = ({ student, isOpen, onClose }) => {

    return (
        <div>
            {isOpen && (
                <div className="cer-card-overlay">
                    <div className="cer-card-popup">
                        <div className="cer-card-header">
                            <h2>Certificates</h2>
                            <button className="cer-card-close" onClick={() => onClose()}>Close</button>
                        </div>
                        <div className="cer-card-container">
                            <div className="cer-card">
                                <img src={student.certificate} alt="" />
                            </div>
                            <div className="cer-card">
                                <img src={student.marksheet} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default CertificatePopup;
