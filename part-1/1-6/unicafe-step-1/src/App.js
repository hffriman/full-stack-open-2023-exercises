import './App.css';
import { useState } from 'react';


const Button = (props) => {

  const {handleClick, text} = props

  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={increaseGood} text="good"/>
        <Button handleClick={increaseNeutral} text="neutral"/>
        <Button handleClick={increaseBad} text="bad"/>
      </div>
      <h1>Statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
}

export default App;
