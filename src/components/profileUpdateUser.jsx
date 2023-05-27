import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileUpdateUser(props) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>please update your profile first</h1>
      <button
        className="btn btn-lg custom-btn"
        onClick={() => navigate("/profiles/profileForm")}
      >
        Update
      </button>
    </div>
  );
}

export default ProfileUpdateUser;
