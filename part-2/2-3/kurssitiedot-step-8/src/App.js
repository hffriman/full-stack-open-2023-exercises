import './App.css';


const Course = ({ course }) => {

  return(
    <>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

const Header = ({ name }) => {

  return(
    <div>
      <h1>{name}</h1>
    </div>
  )
}

const Content = ({ parts }) => {

  return(
    <div>
      {parts.map(part => {
        return(
          <Part 
            key={part.id} 
            name={part.name}
            exercises={part.exercises}
          />
        )
      })}
    </div>
  )
}

const Part = (props) => {

  const {name, exercises} = props

  return(
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {

  let exercisesNew = []
  let total = 0

  if (exercisesNew.length < 1) {
     exercisesNew = parts.map(part => {
      return exercisesNew.concat(part.exercises)
    })
  }

  exercisesNew.reduce((s, p) => {
    total = Number(s) + Number(p)
    return total
  })
  
  return(
    <b>total of {total} exercises</b>
  )
}


const App = () => {

  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        { 
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        { 
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        },
      ]
    },
  ]
  
  return (
    <div>
      {courses.map(course => 
        <Course key={course.id} course={course}/>
        )
      }
    </div>
  );
}

export default App;
