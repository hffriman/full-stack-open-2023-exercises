const Header = ({ name }) => {
  
    return(
      <div>
        <h3>{name}</h3>
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

  const Course = ({ course }) => {

    return(
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }
  
  export default Course