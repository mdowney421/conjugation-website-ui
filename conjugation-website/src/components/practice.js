import { React, useState } from "react";
import data from "../assets/data";

const PracticePage = (props) => {

	const [useIrregularVerbs, setUseIrregularVerbs] = useState()
  const [useVosotros, setUseVosotros] = useState()
  const [tenseSelection, setTenseSelection] = useState([])
	const [questionNumber, setQuestionNumber] = useState(1)

	const handleFirstQuestion = (userResponse) => {
		setUseIrregularVerbs(userResponse)
		setQuestionNumber(2)
	}

	const handleSecondQuestion = (userResponse) => {
		setUseVosotros(userResponse)
		setQuestionNumber(3)
	}

  return (
		<>
			<div className='container text-center'>

				<div className='row'>
					<div className='display-4'>
						Practice
					</div>
				</div>

				<hr className="my-5" />

				{questionNumber === 1 ?
				<div className='row'>
					<p className='display-5'>
						Do you want irregular verbs?
					</p>
					<div className='row'>
						<div className='col'>
							<button type="button" className="btn btn-outline-success mx-3" onClick={() => handleFirstQuestion(true)}>Yes</button>
							<button type="button" className="btn btn-outline-success mx-3" onClick={() => handleFirstQuestion(false)}>No</button>
						</div>
					</div>
				</div>
				: questionNumber === 2 ?
				<div className='row'>
					<p className='display-5'>
						Do you want to include "vosotros"?
					</p>
					<div className='row'>
						<div className='col'>
							<button type="button" className="btn btn-outline-success mx-3" onClick={() => handleSecondQuestion(true)}>Yes</button>
							<button type="button" className="btn btn-outline-success mx-3" onClick={() => handleSecondQuestion(false)}>No</button>
						</div>
					</div>
				</div>
				: questionNumber === 3 ?
				<div className='row'>
					<p className='display-5'>
						Which tenses would you like to practice?
					</p>
					<div className='row'>
						<div className='col'>
							<button type="button" className="btn btn-outline-success mx-3" onClick={() => setTenseSelection([...tenseSelection, 'presente'])}>Presente</button>
							<button type="button" className="btn btn-outline-success mx-3" onClick={() => setTenseSelection([...tenseSelection, 'preterito indefinido'])}>Pretérito Indefinido</button>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<button type="button" className="btn btn-outline-success mx-3">Let's conjugate!</button>
						</div>
					</div>
				</div>
				: null}
			</div>
		</>
  )
}

export default PracticePage