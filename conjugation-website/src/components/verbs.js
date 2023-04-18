import React from "react";
import data from "../assets/data";

const VerbsPage = (props) => {

  return (
		<>
			<div className='display-4 text-center'>
        Verbs
      </div>

			<hr className="my-5" />

      {data.map((verb) => {
        return (
          <div className='container'>
            <div className='row'>
              <div className='col'>
                {verb.verb} - {verb.translation}
              </div>
            </div>
          </div>
        )
      })};
		</>
  )
}

export default VerbsPage