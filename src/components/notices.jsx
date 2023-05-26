import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getNotices, deleteNotice } from "../services/noticeService";
import dayjs from "dayjs";
import { toast } from "react-toastify";

function Notices(props) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data: nots } = await getNotices();
      nots.reverse();
      setNotices(nots);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleShowDetails = (notice) => {
    const nots = [...notices];
    let indx = nots.indexOf(notice);
    nots[indx] = { ...nots[indx] };
    for (let i = 0; i < nots.length; i++) {
      if (i != indx) nots[i].show = false;
    }
    nots[indx].show = !nots[indx].show;
    setNotices(nots);
  };

  const handleDelete = async (notice) => {
    const originalNotices = notices;
    const nots = originalNotices.filter((n) => n._id !== notice._id);
    setNotices(nots);

    try {
      await deleteNotice(notice._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("The notice is already deleted.");

      setNotices(originalNotices);
    }
  };

  if (loading) return; // to fix the async works in use effect
  // console.log(notices[0]._id);
  return (
    <>
      <h1>Notices</h1>
      <button
        className="btn btn-lg btn-info custom-btn"
        onClick={() => navigate("/notices/noticeForm")}
      >
        Add Notice
      </button>
      {notices.map((notice) => {
        return (
          <div key={notice._id}>
            <div>
              <div className="notice">
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <h3>{notice.header}</h3>
                  <button
                    className="btn btn-lg custom-btn"
                    style={{
                      justifySelf: "flex-end",
                      marginLeft: "auto",
                      marginRight: "10px",
                    }}
                    onClick={() => handleShowDetails(notice)}
                  >
                    Details
                  </button>
                  <button
                    className="btn btn-lg btn-danger"
                    style={{ justifySelf: "flex-end" }}
                    onClick={() => handleDelete(notice)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {notice.show && (
                <div className="noticeDetails">
                  <p>
                    <span>Date :</span>
                    {dayjs(notice.date).format("YYYY/MM/DD | hh:mm A")}
                  </p>
                  <br />
                  <p>
                    <span>Schedule :</span>{" "}
                    {dayjs(notice.programDate).format("YYYY/MM/DD | hh:mm A")}
                  </p>
                  <br />
                  <p>
                    <span>Description :</span> {notice.description}
                  </p>
                  <br />
                  <p>
                    <span>Link :</span>
                    <a href={notice.link}>{notice.link}</a>
                  </p>
                  <br />
                  <img src="" alt="" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Notices;
