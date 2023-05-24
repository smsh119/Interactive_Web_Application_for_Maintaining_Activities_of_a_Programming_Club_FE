import { useEffect, useState } from "react";
import { getNotices } from "../services/noticeService";
import { Navigate, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const NoticeboardHome = (props) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const { data } = await getNotices();
      data.reverse();
      setNotices(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return null; // to fix the async works in use effect
  return (
    <>
      <h2>Noticeboard</h2>
      <div className="noticeboard" onClick={() => navigate("/notices")}>
        {notices.map((notice) => {
          return (
            <div className="notice" key={notice._id}>
              <marquee>
                {dayjs(notice.date).format("YYYY/MM/DD")} | {notice.header}
              </marquee>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NoticeboardHome;
