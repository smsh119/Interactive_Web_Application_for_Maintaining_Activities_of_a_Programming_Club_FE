import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import profile_thumb from "../assets/profile_thumb.jpg";
import {
  getProfile,
  addProfilePicture,
  getVjudgeRatingStats,
} from "../services/profileService";
import { getContest } from "../services/contestService";
import auth from "../services/authService";
import divider from "../assets/divider.png";
import getExternalUrl from "../utils/externalLinks";
import { InputText } from "primereact/inputtext";
import getImgUrl from "../services/imgService";
import ProfileUpdateUser from "./profileUpdateUser";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import ImagePopUp from "./imagePopUp";
import getHandleNameFromUrl from "../utils/functions";
import Loading from "./common/loading";

function Profiles(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [showUpdateImgBtn, setShowUpdateImgBtn] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [contests, setContests] = useState([]);
  const [ratingStats, setRatingStats] = useState(null);
  const [file, setFile] = useState(null); //for image pop up

  const user = auth.getCurrentUser();
  const userId = params.id;
  const ownProfile = user
    ? user.profileId === userId || userId === "me"
    : false;

  if (user && !user.isUpdated) return <ProfileUpdateUser />;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: profile } = await getProfile(userId);
        setProfileInfo(profile);
        const conts = [];
        for (let i = 0; i < profile.contests.length; i++) {
          const { data } = await getContest(profile.contests[i]);
          conts.push(data);
        }
        conts.reverse();
        setContests(conts);

        const { data: rstats } = await getVjudgeRatingStats(userId);
        setRatingStats(rstats);

        setLoading(false);
      } catch (e) {
        console.log(e.response);
        window.location = "/notFound";
      }
    }
    fetchData();
  }, []);

  const handleProPicChange = async (e) => {
    e.preventDefault();
    const file = profilePicture;
    if (file && file.type.substring(0, 5) === "image") {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);
      try {
        await addProfilePicture(
          formData,
          profileInfo._id,
          profileInfo.profilePicture
        );
        window.location = `/profiles/${profileInfo._id}`;
      } catch (e) {
        console.log(e);
      }

      setShowUpdateImgBtn(false);
    } else {
      setImg(null);
    }
  };
  const handleImg = ({ currentTarget: input }) => {
    const img = input.files[0];
    setProfilePicture(img);
  };

  const handleShowDetails = (contest) => {
    const conts = [...contests];
    let indx = conts.indexOf(contest);
    conts[indx] = { ...conts[indx] };
    for (let i = 0; i < conts.length; i++) {
      if (i != indx) conts[i].show = false;
    }
    conts[indx].show = !conts[indx].show;
    setContests(conts);
  };

  const renderContests = () => {
    return contests.map((contest) => {
      return (
        <div key={contest._id}>
          <div
            className="profileContest row"
            onClick={() => handleShowDetails(contest)}
          >
            <p className="contestHeading col-md-3">{contest.header}</p>
            <p className="col-md-3 hideClass">{contest.contestType}</p>
            <p className="col-md-3 hideClass">
              {dayjs(contest.date).format("YYYY/MM/DD")}
            </p>
            <p className="col-md-3 hideClass">{contest.rank}</p>
          </div>

          {contest.show && (
            <div className="row contestCard">
              <div className="col-lg-4 contestCardPicDiv">
                <div
                  className="img imgLeft"
                  onClick={() => setFile(contest.imgLink[0])}
                >
                  <img src={getImgUrl(contest.imgLink[0])} alt="" />
                </div>
                <div
                  className="img imgRight"
                  onClick={() => setFile(contest.imgLink[1])}
                >
                  <img src={getImgUrl(contest.imgLink[1])} alt="" />
                </div>
                <div
                  className="img imgLeft"
                  onClick={() => setFile(contest.imgLink[2])}
                >
                  <img src={getImgUrl(contest.imgLink[2])} alt="" />
                </div>
                <div
                  className="img imgRight"
                  onClick={() => setFile(contest.imgLink[3])}
                >
                  <img src={getImgUrl(contest.imgLink[3])} alt="" />
                </div>
              </div>
              <div className="col-lg-1 divider">
                <img src={divider} alt="" />
              </div>
              <div className="col-lg contestCardDesDiv">
                <h1>{contest.header}</h1>
                <h4>
                  Contest Type: <span>{contest.contestType}</span>
                </h4>
                <h4>Participants:</h4>
                <ul>
                  <li>
                    <Link
                      onClick={() =>
                        (window.location =
                          "/profiles/" + contest.participant1.profileId)
                      }
                    >
                      {contest.participant1.name}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() =>
                        (window.location =
                          "/profiles/" + contest.participant2.profileId)
                      }
                    >
                      {contest.participant2.name}
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() =>
                        (window.location =
                          "/profiles/" + contest.participant3.profileId)
                      }
                    >
                      {contest.participant3.name}
                    </Link>
                  </li>
                </ul>
                <p>
                  <span>Description : </span> {contest.description}
                </p>
                <p>
                  <span>Date : </span>
                  {dayjs(contest.date).format("YYYY/MM/DD")}
                </p>
                <h4>Rank: {contest.rank}</h4>
                <a href={`//${getExternalUrl(contest.link)}`} target="_blank">
                  Standings
                </a>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="profileWrap">
      <div className="row picAndBioSection">
        <div className="col-lg-4 picAndNameSec ">
          <div className="profilePicDiv">
            <img
              src={
                profileInfo.profilePicture
                  ? getImgUrl(profileInfo.profilePicture)
                  : profile_thumb
              }
              alt=""
            />
          </div>
          {ownProfile && (
            <>
              <button
                className="btn custom-btn ProPicUpdateButton"
                onClick={() => setShowUpdateImgBtn(!showUpdateImgBtn)}
              >
                Update Picture
              </button>
              {showUpdateImgBtn && (
                <form onSubmit={handleProPicChange}>
                  <InputText type="file" accept="/img/*" onChange={handleImg} />
                  <input type="submit" />
                </form>
              )}
            </>
          )}
          <h3>{profileInfo.name}</h3>
          <h5>
            <span>ID: </span>
            {profileInfo.sid}
          </h5>
          {ownProfile && (
            <button
              className="btn custom-btn"
              onClick={() => navigate("/profiles/profileForm")}
            >
              Edit profile
            </button>
          )}
        </div>
        <div className="col-lg bioAndContactSec">
          <h4>Bio</h4>
          <p>{profileInfo.bio}</p>
          <h4>Current status</h4>
          <p>{profileInfo.currentStatus}</p>
          <h4>Contacts</h4>
          <p>
            <span>Phone :</span> +880{profileInfo.contacts.phone} <br />
            <span>Email :</span>{" "}
            <a href={`mailto:${profileInfo.contacts.email}`}>
              {profileInfo.contacts.email}
            </a>{" "}
            <br />
            <span>Facebook :</span>{" "}
            <Link
              to={`//${getExternalUrl(profileInfo.contacts.fbLink)}`}
              target="_blank"
            >
              {`${profileInfo.contacts.fbLink}`}
            </Link>{" "}
            <br />
            <span>LinkedIn :</span>{" "}
            <Link
              to={`//${getExternalUrl(profileInfo.contacts.linkedinLink)}`}
              target="_blank"
            >
              {`${profileInfo.contacts.linkedinLink}`}
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="statistics row mb-5">
        <div className="cfCards col-md-4 mx-1">
          <div className="cfCardsHeadingWrap">
            <h3>Contest Statistics</h3>
          </div>
          <div className="cfCard">
            <span>Rating</span>
            {Number(Number(ratingStats.rating).toFixed(3))}
          </div>
          <div className="cfCard">
            <span>Total Points</span>
            {Number(Number(ratingStats.totalPoints).toFixed(3))}
          </div>
          <div className="cfCard">
            <span>Total Panalties</span>
            {ratingStats.totalPanalties}
          </div>
        </div>

        <div className="cfCards col-md mx-1 ">
          <div className="cfCardsHeadingWrap">
            <h3>Codeforces Statistics</h3>
          </div>
          <div className="cfCard">
            <span>CF Rank</span>
            {profileInfo.codeforcesId.rank}
          </div>
          <div className="cfCard">
            <span>CF Max Rank</span>
            {profileInfo.codeforcesId.maxRank}
          </div>
          <div className="cfCard">
            <span>CF Rating</span>
            {profileInfo.codeforcesId.rating}
          </div>
          <div className="cfCard">
            <span>CF Max Rating</span>
            {profileInfo.codeforcesId.maxRating}
          </div>
          <div className="cfCard">
            <span>CF Solved Problems</span>
            {profileInfo.codeforcesId.solvedProblem}
          </div>
          <div className="cfCard">
            <span>CF Contests</span>
            {profileInfo.codeforcesId.totalContest}
          </div>
        </div>
      </div>
      <div className="linksSection">
        <h2>Online Profile Links</h2>
        <a
          href={`//${getExternalUrl(profileInfo.onlineJudgeLink.githubLink)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/badge/${"Github"}-${getHandleNameFromUrl(
              profileInfo.onlineJudgeLink.githubLink
            )}-blue`}
            alt=""
          />
        </a>
        <a
          href={`//${getExternalUrl(
            profileInfo.onlineJudgeLink.codeforcesLink
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/badge/${"Codeforces"}-${
              profileInfo.onlineJudgeHandle.codeforces
            }-blue`}
            alt=""
          />
        </a>
        <a
          href={`//${getExternalUrl(profileInfo.onlineJudgeLink.leetcodeLink)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/badge/${"Leetcode"}-${getHandleNameFromUrl(
              profileInfo.onlineJudgeLink.leetcodeLink
            )}-blue`}
            alt=""
          />
        </a>
        <a
          href={`//${getExternalUrl(
            profileInfo.onlineJudgeLink.stopstalkLink
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://img.shields.io/badge/${"Stopstalks"}-${getHandleNameFromUrl(
              profileInfo.onlineJudgeLink.stopstalkLink
            )}-blue`}
            alt=""
          />
        </a>
      </div>

      {contests.length > 0 && (
        <div className="profileContests">
          <h2>Participated Contests</h2>
          <div className="profileContestColumnName">
            <p>Contest Name</p>
            <p>Contest Type</p>
            <p>Date</p>
            <p>Rank</p>
          </div>
          {renderContests()}
        </div>
      )}

      <ImagePopUp file={file} setFile={setFile} />
    </div>
  );
}

export default Profiles;
