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
      <Part part={props.part1}/>
      <Part part={props.part2}/>
      <Part part={props.part3}/>
    </div>
  )
}

const Part = (props) => {

  return(
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )

}

const Total = (props) => {

  let totalSum = 0;

  props.exercisesTotal.forEach(value => {
    totalSum += value;
  });

  return(
    <div>
      <p>Number of exercises {totalSum}</p>
    </div>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <div>
        <Header course={course}/>
        <Content 
          part1={part1} 
          part2={part2}
          part3={part3}
        />
        <Total exercisesTotal={[part1.exercises, part2.exercises, part3.exercises]}/>
    </div>
  );
}

export default App;
