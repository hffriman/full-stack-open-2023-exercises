import './App.css';
import { useState } from 'react';

const Statistics = (props) => {

  const {good, neutral, bad, total, average, positivePortion} = props
 
  return (
   <>
     <h1>Statistics</h1>
     <p>good {good}</p>
     <p>neutral {neutral}</p>
     <p>bad {bad}</p>
     <p>all {total}</p>
     <p>average {average}</p>
     <p>positive {positivePortion} %</p>
   </>
  )
}

const Button = (props) => {

  const {handleClick, text} = props

  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivePortion, setPositivePortion] = useState(0)


  const increaseGood = () => {
    const goodNew = good + 1
    const totalNew = goodNew + neutral + bad
    setGood(goodNew)
    setTotal(totalNew)
    calculateAverage(goodNew, bad, totalNew)
    calculatePositivePortion(goodNew, totalNew)
  }

  const increaseNeutral = () => {
    const neutralNew = neutral + 1
    const totalNew = good + neutralNew + bad
    setNeutral(neutralNew)
    setTotal(totalNew)
    calculateAverage(good, bad, totalNew)
    calculatePositivePortion(good, totalNew)
  }

  const increaseBad = () => {
    const badNew = bad + 1
    const totalNew = good + neutral + badNew
    setBad(badNew)
    setTotal(totalNew)
    calculateAverage(good, badNew, totalNew)
    calculatePositivePortion(good, totalNew)
  }

  const calculateAverage = (good, bad, total) => {
    const averageNew = ((good - bad) / total)
    setAverage(averageNew)
  }

  const calculatePositivePortion = (good, total) => {
    const positivePortionNew = (good / total) * 100
    setPositivePortion(positivePortionNew)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <div>
        <Button handleClick={increaseGood} text="good"/>
        <Button handleClick={increaseNeutral} text="neutral"/>
        <Button handleClick={increaseBad} text="bad"/>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePortion={positivePortion}
      />      
    </div>
  );
}

export default App;
