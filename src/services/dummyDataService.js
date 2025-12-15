const getData = (path) => {
  switch (path) {
    case "/homeData":
      return {
        data: {
          ICPC: 4,
          IUPC: 6,
          IDPC: 10,
          programmers: 10,
          weeklycontestscount: 2,
        },
      };

    case "/notices":
      return {
        data: [
          {
            _id: "001",
            date: "2023-06-12T10:00",
            header: "Next contest will held next week",
          },
          {
            _id: "002",
            date: "2023-01-06T13:00",
            header: "Selection contest for ICPC will be conducted on VJudge",
          },
          {
            _id: "003",
            date: "2022-11-10T09:00",
            header: "Seminar on programming: 2023-01-01 | Programming Club",
          },
        ],
      };
  }
};
const postData = () => {};
const putData = () => {};
const deleteData = () => {};
const setJwt = () => {};

const http = {
  get: getData,
  post: postData,
  put: putData,
  delete: deleteData,
  setJwt,
};

export default http;
