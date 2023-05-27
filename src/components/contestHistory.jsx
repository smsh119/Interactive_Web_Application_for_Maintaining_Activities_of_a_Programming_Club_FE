import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../services/authService";
import img1 from "../assets/img1.jpg";
import divider from "../assets/divider.png";
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
  const navigate = useNavigate();
  let isAdmin = auth.getCurrentUser() ? auth.getCurrentUser().isAdmin : false;

  useEffect(() => {
    async function fetchData() {
      const { data: consts } = await getContests();
      consts.reverse();
      setContests(consts);
      setLoading(false);
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

  if (loading) return; // to fix the async works in use effect

  return (
    <div className="mb-5 contestHistoryWrapper">
      <h1>Contest History</h1>
      {auth.getCurrentUser() && (
        <button
          className="btn btn-lg custom-btn"
          onClick={() => navigate("/contestHistory/contestForm")}
        >
          Add Contest
        </button>
      )}

      {contests.map((contest) => {
        if (!isAdmin && !contest.isApproved) return;
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
              <div className="img imgLeft">
                <img src={getImgUrl(contest.imgLink[0])} alt="" />
              </div>
              <div className="img imgRight">
                <img src={getImgUrl(contest.imgLink[1])} alt="" />
              </div>
              <div className="img imgLeft">
                <img src={getImgUrl(contest.imgLink[2])} alt="" />
              </div>
              <div className="img imgRight">
                <img src={getImgUrl(contest.imgLink[3])} alt="" />
              </div>
            </div>
            <div className="col-lg-1 divider">
              <img src={divider} alt="" />
            </div>
            <div className="col-lg contestCardDesDiv">
              <h1>{contest.header}</h1>
              <h4>Participants:</h4>
              <ul>
                <li>{contest.participant1}</li>
                <li>{contest.participant2}</li>
                <li>{contest.participant3}</li>
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
              {isAdmin && (
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
    </div>
  );
}

export default ContestHistory;
