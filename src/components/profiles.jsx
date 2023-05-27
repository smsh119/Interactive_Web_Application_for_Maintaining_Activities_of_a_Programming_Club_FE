import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import profile_thumb from "../assets/profile_thumb.jpg";
import { getProfile, addProfilePicture } from "../services/profileService";
import auth from "../services/authService";

import { InputText } from "primereact/inputtext";
import getImgUrl from "../services/imgService";
import ProfileUpdateUser from "./profileUpdateUser";

function Profiles(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [showUpdateImgBtn, setShowUpdateImgBtn] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const user = auth.getCurrentUser();
  const userId = params.id;

  if (!user.isUpdated) return <ProfileUpdateUser />;

  useEffect(() => {
    async function fetchData() {
      const { data: profile } = await getProfile();
      setProfileInfo(profile);
      setLoading(false);
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
    console.log(profilePicture);
  };

  if (loading) return null;
  // console.log("user id : ", user._id);
  // console.log("profile id : ", user.profileId);
  // console.log("profile id frm profile : ", profileInfo._id);
  // console.log("params id : ", userId);
  // console.log(profileInfo);
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
          <h3>{profileInfo.name}</h3>
          <h5>
            <span>ID: </span>
            {user.sid}
          </h5>
          <button
            className="btn custom-btn"
            onClick={() => navigate("/profiles/profileForm")}
          >
            Edit profile
          </button>
        </div>
        <div className="col-lg bioAndContactSec">
          <h4>Bio</h4>
          <p>{profileInfo.bio}</p>
          <h4>Current status</h4>
          <p>{profileInfo.currentStatus}</p>
          <h4>Contacts</h4>
          <p>
            <span>Phone :</span> {profileInfo.contacts.phone} <br />
            <span>Email :</span> {profileInfo.contacts.email} <br />
            <span>Facebook :</span> {profileInfo.contacts.fbLink} <br />
            <span>LinkedIn :</span> {profileInfo.contacts.linkedinLink}
          </p>
          <div className="cfCards">
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
          </div>
        </div>
      </div>

      <div className="contestLinksSection">
        <h2>Online Judge Links</h2>
        <img
          onClick={() =>
            (window.location = `https://${profileInfo.onlineJudgeLink.githubLink}`)
          }
          src={`https://img.shields.io/badge/${"Github"}-${"github"}-blue`}
          alt=""
        />
        <img
          onClick={() =>
            (window.location = `https://${profileInfo.onlineJudgeLink.codeforcesLink}`)
          }
          src={`https://img.shields.io/badge/${"Codeforces"}-${
            profileInfo.onlineJudgeHandle.codeforces
          }-blue`}
          alt=""
        />
        <img
          onClick={() =>
            (window.location = `https://${profileInfo.onlineJudgeLink.leetcodeLink}`)
          }
          src={`https://img.shields.io/badge/${"Leetcode"}-${"leetcode"}-blue`}
          alt=""
        />
        <img
          onClick={() =>
            (window.location = `https://${profileInfo.onlineJudgeLink.stopstalkLink}`)
          }
          src={`https://img.shields.io/badge/${"Stopstalk"}-${"stopstalk"}-blue`}
          alt=""
        />
      </div>
    </div>
  );
}

export default Profiles;
