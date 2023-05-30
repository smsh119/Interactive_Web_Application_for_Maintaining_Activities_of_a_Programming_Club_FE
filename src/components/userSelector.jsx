import React, { useEffect, useState } from "react";
import Select from "react-select";
import http from "../services/httpService";

function UserSelector({ onChange, error }) {
  const [users, setUsers] = useState(null);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await http.get("/programmers");
        setUsers(data);
        mapOptions(data);
        setLoading(false);
      } catch (e) {
        console.log(e.response.status);
      }
    }
    fetchData();
  }, []);

  const mapOptions = (data) => {
    let optns = [];
    for (let i = 0; i < data.length; i++) {
      optns.push({
        label: data[i].profileId.name + " | " + data[i].sid,
        value: data[i].profileId._id,
      });
    }
    setOptions(optns);
  };

  const handleChange = (e) => {
    const indx = options.indexOf(e);
    // console.log(users[indx]);
    const obj = {
      name: users[indx].profileId.name,
      profileId: users[indx].profileId._id,
      sid: users[indx].sid,
    };
    onChange(obj);
  };

  if (loading) return null;
  //   console.log(users);
  return (
    <div>
      <Select options={options} isSearchable onChange={handleChange} />
      {error && <div className="alert alert-danger errdiv">{error}</div>}
    </div>
  );
}

export default UserSelector;
