import React, { useEffect, useState } from "react";
import { getInfo } from "../services/aboutService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function About(props) {
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getInfo();
        // console.log(data[data.length - 1]);
        if (data.length === 0) setInfo(null);
        else setInfo(data[data.length - 1]);
        setLoading(false);
        // console.log(info);
      } catch (error) {
        // console.log(error.response.data);
        toast.error("Info not found!");
      }
    };
    fetch();
  }, []);

  if (loading) return null;
  return (
    <div className="aboutWrap">
      <h1>About</h1>

      <h2>ICE Programming Club</h2>
      <p>
        ICE Programming Club, University of Rajshahi, provides a stimulating,
        cooperative environment where students can interact and learn from each
        other by solving various programming problems. This programming club is
        first formed during 2015-2016 academic year. <br /> <br />
        ICE programming club is organizing Intra-department programming contest
        periodically and members of the ICE programming club are trying to enter
        teams into national wide programming competitions. <br /> <br />
        The key objective of this ICE programming club are the following: <br />
        <br />
      </p>
      <ul>
        <li>
          Gain and develop good programming skills and general problem solving
          skills
        </li>
        <li>Learn how to work in a team</li>
        <li>
          Develop programming solutions using various data structures, sorting
          algorithms, arithmetic, algebra, graph algorithms, and number theory
        </li>
        <li>Enhance your career prospects</li>
        <li>
          Start a potential research project which may lead to postgraduate
          studies
        </li>
        <li>Learn from senior and more experienced students</li>
        <li>Have fun with other fellow students!</li>
      </ul>

      <h2>Member Registration</h2>

      <p>
        The club is open to all ICE students including undergraduate and post
        graduate students. The only requirement is a keen interest in computer
        programming.
      </p>

      <h2>Meeting</h2>

      <p>
        In general, meetings are held weekly on alternating days, and focus on
        programming problem study, project collaboration, and student
        networking.
      </p>
      <div>
        <h2>Executive Committee</h2>
        <button
          className="btn btn-lg custom-btn"
          onClick={() => navigate("/about/edit")}
        >
          Edit
        </button>
      </div>
      <div>
        <h4>President:</h4>

        {info && (
          <p>
            &#x2022; <span>{info.committee.president.name}, </span>
            {info.committee.president.designation}
          </p>
        )}

        <h4>Vice President:</h4>
        {info && (
          <p>
            &#x2022; <span>{info.committee.vicePresident1.name}, </span>
            {info.committee.vicePresident1.designation}
          </p>
        )}
        {info && (
          <p>
            &#x2022; <span>{info.committee.vicePresident2.name}, </span>
            {info.committee.vicePresident2.designation}
          </p>
        )}

        <h4>Tresurer:</h4>
        {info && (
          <p>
            &#x2022; <span>{info.committee.treasurer.name}, </span>
            {info.committee.treasurer.designation}
          </p>
        )}
      </div>
      <div>
        <h2>Student Executive Member</h2>
        <button
          className="btn btn-lg custom-btn"
          onClick={() => navigate("/about/edit")}
        >
          Edit
        </button>
      </div>
      <div>
        <p>
          <span>General Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" + info.studentCommittee.generalSecretary.profileId
              }
            >
              {info.studentCommittee.generalSecretary.name}
            </Link>
          )}
        </p>
        <p>
          <span>Assistant General Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" +
                info.studentCommittee.assistantGeneralSecretary.profileId
              }
            >
              {info.studentCommittee.assistantGeneralSecretar}y.name
            </Link>
          )}
        </p>
        <p>
          <span>Office Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" + info.studentCommittee.officeSecretary.profileId
              }
            >
              {info.studentCommittee.officeSecretary.name}
            </Link>
          )}
        </p>
        <p>
          <span>Assistant Office Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" +
                info.studentCommittee.assistantOfficeSecretary.profileId
              }
            >
              {info.studentCommittee.assistantOfficeSecretary.name}
            </Link>
          )}
        </p>
        <p>
          <span>Finance Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" + info.studentCommittee.financeSecretary.profileId
              }
            >
              {info.studentCommittee.financeSecretary.name}
            </Link>
          )}
        </p>
        <p>
          <span>Assistant Finance Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" +
                info.studentCommittee.assistantFinanceSecretary.profileId
              }
            >
              {info.studentCommittee.assistantFinanceSecretar}y.name
            </Link>
          )}
        </p>
        <p>
          <span>Publication Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" +
                info.studentCommittee.publicationSecretary.profileId
              }
            >
              {info.studentCommittee.publicationSecretary.name}
            </Link>
          )}
        </p>
        <p>
          <span>Assistant Publication Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" +
                info.studentCommittee.assistantPublicationSecretary.profileId
              }
            >
              {info.studentCommittee.assistantPublicationSe}cretary.name
            </Link>
          )}
        </p>
        <p>
          <span>Social Welfare Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" +
                info.studentCommittee.socialWelfareSecretary.profileId
              }
            >
              {info.studentCommittee.socialWelfareSecretary.name}
            </Link>
          )}
        </p>
        <p>
          <span>Assistant Social Welfare Secretary: </span>
          {info && (
            <Link
              to={
                "/profiles/" +
                info.studentCommittee.assistantSocialWelfareSecretary.profileId
              }
            >
              {info.studentCommittee.assistantSocialWelfareSecretary.name}
            </Link>
          )}
        </p>
      </div>

      <h3>Feel free to contact with us for further information.</h3>
    </div>
  );
}

export default About;
