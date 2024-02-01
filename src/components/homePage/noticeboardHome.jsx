import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotices } from "../../services/noticeService";
import Loading from "../common/loading";

const NoticeboardHome = () => {
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

    if (loading) return <Loading />;
    return (
        <>
            <h2>Noticeboard</h2>
            <div className="noticeboard" onClick={() => navigate("/notices")}>
                {notices.map((notice) => {
                    return (
                        <div className="notice-home" key={notice._id}>
                            <marquee>
                                {dayjs(notice.date).format(
                                    "YYYY/MM/DD hh:mm A"
                                )}{" "}
                                | {notice.header}
                            </marquee>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default NoticeboardHome;
