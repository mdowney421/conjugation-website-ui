import axios from "axios";
import React, { useEffect, useState } from "react";

const VerbsPage = (props) => {
  const [verbsList, setVerbsList] = useState([]);

  const fetchVerbsList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get-all-verbs");
      setVerbsList(response.data);
    } catch (error) {
      console.error("error fetching verbs list: ", error);
    }
  };

  useEffect(() => {
    fetchVerbsList();
  }, []);

  return (
    <>
      <div className="display-4 text-center">Verbs</div>
      <hr className="my-5" />
      {verbsList.map((verb) => {
        return (
          <div className="container" key={verb}>
            <div className="row">
              <div className="col">
                {verb[0]} - {verb[1]}
              </div>
            </div>
          </div>
        );
      })}
      ;
    </>
  );
};

export default VerbsPage;
