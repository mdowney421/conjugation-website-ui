import { useState } from 'react';
import './App.css'
import './../node_modules/bootstrap/dist/css/bootstrap.css'
import './../node_modules/bootstrap/dist/css/bootstrap-utilities.css'
import data from './assets/data';
import Navbar from './components/navbar/navbar';
import HomePage from './components/hompage/homepage';

const App = () => {

  const [activePage, setActivePage] = useState('home')

  return (
    <>
      <Navbar />

      {activePage === 'home' ?
        <HomePage />
      : null}

      <hr className="my-5" />

      <div className='display-4 text-center'>
        Verbs
      </div>
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

      <hr className="my-5" />

      <div className='container text-center'>

        <div className='row'>
          <div className='display-4'>
            Practice
          </div>
        </div>

        <div className='row'>
          <p className='display-5'>
            Do you want irregular verbs?
          </p>
          <form>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked='checked' />
              <label className="form-check-label" for="inlineRadio1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label" for="inlineRadio2">No</label>
            </div>
          </form>
        </div>

        <div className='row'>
          <p className='display-5'>
            Do you want to include "vosotros"?
          </p>
          <form>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked='checked' />
              <label className="form-check-label" for="inlineRadio1">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
              <label className="form-check-label" for="inlineRadio2">No</label>
            </div>
          </form>
        </div>

        <div className='row'>
          <p className='display-5'>
            Which tenses would you like to practice?
          </p>
          <div className="form-check form-check-inline d-flex justify-content-center">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
            <label className="form-check-label" for="inlineCheckbox1">Presente (I go)</label>
          </div>
          <div className="form-check form-check-inline d-flex justify-content-center">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
            <label className="form-check-label" for="inlineCheckbox2">Pretérito Indefinido (I went)</label>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button type="button" className="btn btn-success mx-3">Let's conjugate!</button>
          </div>
        </div>
      </div>

      <hr className="my-5" />
    </>
  );
}

export default App;
