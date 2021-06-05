import React from 'react'
import "./AboutPage.css"
import { Link } from 'react-router-dom';
import bio from "./../../ressources/Frame 1.png"
import about from "./../../ressources/1129342 1.png"
import { USER_IP } from '../../IPConfig';

function AboutPage() {
    const link = "https://"+USER_IP+":5000/uploads/Biografie_Niederkofler_Johann.pdf"
    return (
        <div className="div-aboutPage-main">
            <a href={link} download="Biografie_Niederkofler_Johann">
                <div className="div-aboutPage-leftBio">
                    <img src={bio}></img>
                </div>
            </a>
            <div className="div-aboutPage-rightAbout">
                <img src={about}></img>
            </div>
        </div>
    )
}

export default AboutPage
