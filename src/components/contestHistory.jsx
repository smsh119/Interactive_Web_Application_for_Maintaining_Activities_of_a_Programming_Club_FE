import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../services/authService";
import divider from "../assets/divider.png";
import ImagePopUp from "./imagePopUp";
import {
  deleteContest,
  getContests,
  updateContest,
} from "../services/contestService";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import getImgUrl from "../services/imgService";

function ContestHistory(props) {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequests, setShowRequests] = useState(false);
  const [file, setFile] = useState(null); //for image pop up

  const navigate = useNavigate();

  let isAdmin = auth.getCurrentUser() ? auth.getCurrentUser().isAdmin : false;
  let isSuperAdmin = auth.getCurrentUser()
    ? auth.getCurrentUser().isSuperAdmin
    : false;

  useEffect(() => {
    async function fetchData() {
      try {
        await getContests();
        const { data: consts } = await getContests();
        consts.reverse();
        setContests(consts);
        setLoading(false);
      } catch (e) {
        console.log(e.response.status);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (contest) => {
    const originalContests = contests;
    const consts = originalContests.filter((c) => c._id !== contest._id);
    setContests(consts);

    try {
      await deleteContest(contest._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("The contest is already deleted.");

      setNotices(originalContests);
    }
  };

  const handleApprove = async (contest) => {
    await updateContest(contest);
    const conts = [...contests];
    const indx = conts.indexOf(contest);
    const cont = { ...conts[indx] };
    cont.isApproved = true;
    conts[indx] = cont;
    setContests(conts);
  };

  if (loading) return;

  return (
    <div className="mb-5 contestHistoryWrapper">
      <h1>Contest History</h1>
      {auth.getCurrentUser() && (
        <div>
          <button
            className="btn btn-lg custom-btn"
            onClick={() => navigate("/contestHistory/contestForm")}
          >
            Add Contest
          </button>
          <button
            className="btn btn-lg custom-btn contestHistoryReqBtn"
            onClick={() => setShowRequests(!showRequests)}
          >
            {showRequests ? "Approved Contests" : "Requests"}
          </button>
        </div>
      )}

      {contests.map((contest) => {
        if (!isAdmin && !contest.isApproved) return;
        if (
          (contest.isApproved && showRequests) ||
          (!contest.isApproved && !showRequests)
        )
          return;
        return (
          <div key={contest._id} className="row contestCard">
            {isAdmin && !contest.isApproved && (
              <button
                className="btn btn-lg custom-btn"
                style={{ margin: "0px 0px 10px 0px" }}
                onClick={() => handleApprove(contest)}
              >
                Approve Post
              </button>
            )}
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
                  <Link to={"/profiles/" + contest.participant1.profileId}>
                    {contest.participant1.name}
                  </Link>
                </li>
                <li>
                  <Link to={"/profiles/" + contest.participant2.profileId}>
                    {contest.participant2.name}
                  </Link>
                </li>
                <li>
                  <Link to={"/profiles/" + contest.participant3.profileId}>
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
              <a href={`//${contest.link}`} target="_blank">
                Standings
              </a>
              <br />
              {isAdmin && isSuperAdmin && (
                <button
                  className="btn btn-danger btn-lg"
                  onClick={() => handleDelete(contest)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        );
      })}
      <ImagePopUp file={file} setFile={setFile} />
    </div>
  );
}

export default ContestHistory;
