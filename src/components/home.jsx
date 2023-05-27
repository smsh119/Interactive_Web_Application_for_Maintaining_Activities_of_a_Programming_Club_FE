import React, { useEffect } from "react";
import ruLogo from "../assets/ru-logo.png";
import { Link } from "react-router-dom";
import NoticeboardHome from "./noticeboardHome";
const renderWelcomeSection = () => {
  return (
    <div className="welcomeSection">
      <div className="row">
        <div className="col-5">
          <div className="ruLogoAndName">
            <img src={ruLogo} alt="RU Logo" />
            <h2>
              Information and Communication Engineering <br /> University of
              Rajshahi
            </h2>
          </div>
        </div>
        <div className="col">
          <div className="welcomeAndName">
            <h1>Welcome</h1>
            <h2>ICE Programming Club</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

const renderHomeCards = () => {
  return (
    <div className="homeCards">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-2 mx-1 homeCard ">
          <h4>Founded</h4>
          <p>1 January, 2015</p>
        </div>
        <div className="col-md-2 mx-1 homeCard">
          <h4>ICPC Participation</h4>
          <p>6</p>
        </div>
        <div className="col-md-2 mx-1 homeCard">
          <h4>IUPC Participation</h4>
          <p>10</p>
        </div>
        <div className="col-md-2 mx-1 homeCard">
          <h4>Programmers</h4>
          <p>121</p>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
};

const renderIntroAndNotice = () => {
  return (
    <div className="introAndNotice">
      <div className="row gx-4">
        <div className="col-md-6 clubInto">
          <h2> ICE Programming CLub</h2>
          <p>
            ICE Programming Club, University of Rajshahi, provides a
            stimulating, cooperative environment where students can interact and
            learn from each other by solving various programming problems. This
            programming club is first formed during 2015-2016 academic year. ICE
            programming club is organizing Intra-department programming contest
            periodically and members of the ICE programming club are trying to
            enter teams into national wide programming competitions. The key
            objective of this ICE programming club are the following: Gain and
            develop good programming skills and general problem solving skills
            Learn how to work in a team Develop programming solutions using
            various data structures, sorting algorithms, arithmetic, algebra,
            graph algorithms, and number theory Enhance your career prospects
            Start a potential research project which may lead to postgraduate
            studies Learn from senior and more experienced students Have fun
            with other fellow students!
          </p>
        </div>
        <div className="col-md-6">
          <NoticeboardHome />
        </div>
      </div>
    </div>
  );
};

const renderBigCards = () => {
  return (
    <div className="bigCards">
      <div className="bigCardsRow">
        <Link className="bigCard" to="/programmersList">
          Programmer's List
        </Link>
        <Link className="bigCard" to="/contestHistory">
          Contest History
        </Link>
        <Link className="bigCard" to="/photoGallery">
          Photo Gallery
        </Link>
      </div>
    </div>
  );
};

const renderFooter = () => {
  return (
    <>
      <div className="footer">
        <div className="row">
          <div className="col-md-4 footerSection">
            <h4>Address</h4>
            <p>
              Dr M. A. Wazed Miah Academic Building <br />
              University of Rajsahi <br />
              Matihar, Rajshahi, Bangladesh
            </p>
          </div>
          <div className="col-md-4 footerSection">
            <h4>Quick Links</h4>
            <div>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Faculty Members
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Officers
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Staff List
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Department Notices
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Events
              </a>
            </div>
          </div>
          <div className="col-md-4 footerSection">
            <h4>Important Links</h4>
            <div>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -University Grants Commision(UGC)
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Bangladesh Research and Education Network (BdREN)
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -BdREN ZOOMt
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Google Classroom
              </a>
              <a href={`//google.com`} target="_blank" className="footerLinks">
                -Plagarism Detection Software | Thenticate
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footerAllRights">
        <p>
          All rights reserved © {new Date().getFullYear()}, Dept. of Information
          & Communication Engineering. Powered by ICT Center, RU.
        </p>
      </div>
    </>
  );
};

function Home(props) {
  useEffect(() => {
    document.title = "ICE_PC";
  }, []);

  return (
    <>
      {renderWelcomeSection()}
      {renderHomeCards()}
      {renderIntroAndNotice()}
      {renderBigCards()}
      {renderFooter()}
    </>
  );
}

export default Home;
