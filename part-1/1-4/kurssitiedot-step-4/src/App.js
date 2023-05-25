import './App.css';

const Header = (props) => {

  return(
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {

  return(
    <div>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>
    </div>
  )
}

const Part = (props) => {

  return(
    <div>
      <p>{props.parts.name} {props.parts.exercises}</p>
    </div>
  )

}

const Total = (props) => {

  let totalSum = 0;

  props.parts.forEach(value => {
    totalSum += value.exercises;
  });

  return(
    <div>
      <p>Number of exercises {totalSum}</p>
    </div>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    { 
      name: 'Using props to pass data',
      exercises: 7,
    },
    { 
      name: 'State of a component',
      exercises: 14,
    }
  ]
  
  return (
    <div>
        <Header course={course}/>
        <Content parts={parts} />
        <Total parts={parts}/>
    </div>
  );
}

export default App;
