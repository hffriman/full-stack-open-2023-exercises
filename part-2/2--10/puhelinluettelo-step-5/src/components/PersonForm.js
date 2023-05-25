const PersonForm = (props) => {

    const {
        onSubmit, 
        textForName, 
        newNameValue, 
        handleNewNameOnChange, 
        textForNumber,
        newNumberValue, 
        handleNewNumberOnChange, 
        buttonText
    } = props

    return(
      <form onSubmit={onSubmit}>
      <div>
          <div>
            {textForName}
            <input 
              value={newNameValue}
              onChange={handleNewNameOnChange}
            />
          </div>
          <div>
              {textForNumber}:
              <input
                value={newNumberValue}
                onChange={handleNewNumberOnChange}
              />
          </div>
        </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
    )
}

export default PersonForm