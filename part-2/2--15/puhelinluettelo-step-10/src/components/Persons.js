import Person from './Person'

const Persons = ({ persons, removePerson }) => {

    return(
        <div>
            {persons.map(person => {
                return(
                    <Person key={person.id} person={person} removePerson={removePerson}/>
                )
            })}
        </div>
    )
}

export default Persons