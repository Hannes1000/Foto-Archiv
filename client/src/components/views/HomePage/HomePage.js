import React from 'react'
import "./HomePage.css"
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import pergament1 from "./../../ressources/png-transparent-kraft-paper-kraft-paper-old-paper-nostalgic-background-removebg 2.png"
import pergament2 from "./../../ressources/png-transparent-kraft-paper-kraft-paper-old-paper-nostalgic-background-removebg 1.png"
import logo from "./../../ressources/logo 1.svg"
import card1 from "./../../ressources/Frame 7.svg"

function HomePage() {
    return (
        <div className="div-homepage-main">
            <div className="div-pergament1-homePage">
                <img className="img-pergament1-homePage" src={pergament1}></img>
            </div>
            <div className="div-pergament2-homePage">
                <img className="img-pergament2-homePage" src={pergament2}></img>
            </div>
            <div className="div-homePage-cardandlogo">
                <div className="logo-homePage-mainlogo">
                    <Link to="/aboutPage">
                        <div className="card1-homePage-josef">
                            <img src={card1}></img>
                        </div>
                    </Link>
                </div>
                <div className="card-homePage-mainCard">
                    <Link to="/landingPage">
                        <div className="logo-homePage-main">
                            <img src={logo}></img>
                        </div>
                    </Link>
                    <Link to="/login">
                        <Button type="primary" size="large" className="button-homePage-login">
                            Anmelden
                    </Button>
                    </Link>
                    <Link to="/register">
                        <Button size="large" className="button-homePage-register">
                            Registrieren
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage
