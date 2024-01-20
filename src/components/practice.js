import { React, useState } from "react";
import data from "../assets/data";

const PracticePage = (props) => {

	const [useIrregularVerbs, setUseIrregularVerbs] = useState()
  const [useVosotros, setUseVosotros] = useState()
  const [tenseSelection, setTenseSelection] = useState([])
	const [questionNumber, setQuestionNumber] = useState(1)
	const [randomVerbIndex, setRandomVerbIndex] = useState()
	const [randomTense, setRandomTense] = useState()
	const [randomPronounIndex, setRandomPronounIndex] = useState()

	const pronounList = ['yo', 'tú', 'él/ella/usted', 'nosotros/as', 'ellos/as', 'vosotros/as']

	const handleFirstQuestion = (userResponse) => {
		setUseIrregularVerbs(userResponse)
		setQuestionNumber(2)
	}

	const handleSecondQuestion = (userResponse) => {
		setUseVosotros(userResponse)
		setQuestionNumber(3)
	}

	const handleThirdQuestion = (userResponse) => {
		if (tenseSelection.includes(userResponse)) {
			const newTenseSelection = tenseSelection.filter((tense) => tense !== userResponse)
			setTenseSelection(newTenseSelection)
		} else {
			setTenseSelection([...tenseSelection, userResponse])
		}
	}

	const generateRandomVerb = () => {

		let verbIndex = Math.floor(Math.random() * data.length)
		setRandomTense(tenseSelection[Math.floor(Math.random() * tenseSelection.length)])

		if (useIrregularVerbs) {
			setRandomVerbIndex(verbIndex)
		} else {
			if (data[verbIndex][randomTense].isRegular) {
				setRandomVerbIndex(verbIndex)
			} else {
				generateRandomVerb()
			}
		}
		
		if (useVosotros) {
			setRandomPronounIndex(Math.floor(Math.random() * 6))
		} else {
			setRandomPronounIndex(Math.floor(Math.random() * 5))
		}
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
							<button type="button" className={tenseSelection.includes('presente') ? "btn btn-success mx-3" : "btn btn-outline-success mx-3"} onClick={() => handleThirdQuestion('presente')}>Presente</button>
							<button type="button" className={tenseSelection.includes('preteritoIndefinido') ? "btn btn-success mx-3" : "btn btn-outline-success mx-3"} onClick={() => handleThirdQuestion('preteritoIndefinido')}>Pretérito Indefinido</button>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<button type="button" className="btn btn-outline-success mx-3" onClick={generateRandomVerb}>Let's conjugate!</button>
						</div>
					</div>
				</div>
				: null}
				<div className="constainer d-flex justify-content-center">
					<div className="row">
						<div className="col">
							<p className="display-5">Translate {data[randomVerbIndex]?.verb ?? null}</p>
							<p className="display-5">in the {pronounList[randomPronounIndex] ?? null} form</p>
							<p className="display-5">using the {data[randomVerbIndex]?.[randomTense]?.tenseName ?? null} tense</p>
							<form>
								<div className="form-group">
									{/* <label for="conjugationGuess">RANDOMLY GENERATED VERB</label> */}
									<input type="conjugation" className="form-control" id="conjugationGuess" placeholder="Enter your conjugation" />
								</div>
								<button type="submit" className="btn btn-outline-success">Check Answer</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
  )
}

export default PracticePage