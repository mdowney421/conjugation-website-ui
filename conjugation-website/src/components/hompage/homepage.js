import React from "react";

const HomePage = () => {

  return (
		<>
			<div className="jumbotron text-center">
				<h1 className="display-3 mt-5">🐊 The ConjuGator 🐊</h1>
				<p className="lead">Welcome to your conjugation destination, a one-stop shop for all your Spanish conjugations.</p>
			</div>

			<hr className="my-5" />

			<div className='container'>
				<div className='row'>
					<div className='col'>
						<div className='display-5 text-center mb-5'>
							What do you want to do today?
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col d-flex justify-content-center'>
						<button type="button" className="btn btn-success mx-3">I want to look up verbs!</button>
						<button type="button" className="btn btn-success mx-3">I want to practice conjugating!</button>
					</div>
				</div>
			</div>
		</>
  )
}

export default HomePage