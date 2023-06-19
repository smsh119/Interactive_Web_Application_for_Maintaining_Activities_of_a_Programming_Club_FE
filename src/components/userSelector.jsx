import Select from "react-select";

function UserSelector({ onChange, error, options, users }) {
  const handleChange = (e) => {
    const indx = options.indexOf(e);
    const obj = {
      name: users[indx].profileId.name,
      profileId: users[indx].profileId._id,
      sid: users[indx].sid,
    };
    onChange(obj);
  };

  return (
    <div>
      <Select options={options} isSearchable onChange={handleChange} />
      {error && <div className="alert alert-danger errdiv">{error}</div>}
    </div>
  );
}

export default UserSelector;
