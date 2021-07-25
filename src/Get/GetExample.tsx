import React, { useState } from 'react'
import BackButton from '../BackButton/BackButton';
import IAgeResponse from './../Models/IAgeResponse';

export default function GetExample() {

    const [age, setAge] = useState(-1)
    const [showError, setShowError] = useState(false)
    const [name, setName] = useState("")

    /**
     * Do a fetch to the api for guessing the age by name
     * Sets the age in State
     */
    const requireAge = () => {
        fetch(`https://api.agify.io/?name=${name}`).then(res => {
            return res.json()
        })
            .then((res: IAgeResponse) => {
                setAge(res.age)
            })
    }

    /**
     * By pressing the "Guess my age"-Buttons or hitting Enter
     * this function is called and starts guessing the age
     * @param params FormEvent
     */
    const onSubmit = (params: React.FormEvent<HTMLFormElement>) => {
        params.preventDefault(); // Prevents page reload
        requireAge()
    }

    const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        if (value === "") {
            setShowError(false)
            setName(e.target.value)
            setAge(-1)
            return
        }

        //Check if input is a number
        //Only check latest letter - because in general names haven't any numbers in it
        let valueAsNumber = Number(value.charAt(value.length - 1))
        if (isNaN(valueAsNumber)) {
            //If its not a number set the name in state
            setShowError(false)
            setName(e.target.value)
        }
        else {
            //If is is a number show funny error
            setShowError(true)
        }
    }

    /**
     * Returns either an error message in a html container 
     * or returns null if there are no errors
     * @returns HTML content
     */
    const renderError = () => {
        if (showError) {
            return (
                <div>
                    <p>Hmm seems like you typing in numbers instead of letters.</p>
                    <p>Maybe you're Elon Musks daughter (X Æ A-12)... then it's okay. :)</p>
                </div>
            )
        }
        else {
            return null
        }
    }

    /**
     * Returns the "age-container" if the age is unequal -1
     * otherwise returns null for rendering nothing
     * @returns HTML content
     */
    const renderAge = () => {
        if (age !== -1) {
            return (
                <p>
                    {name}s age is probably {age}
                </p>
            )
        }
        else {
            return null
        }
    }

    return (
        <div>
            <BackButton />
            <p>Let's try if I can guess your age by name.</p>
            <p>Type in your name:</p>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text"
                        placeholder="Your name here"
                        onChange={onTextChanged}
                        required />
                    <button type="submit">Guess my age</button>
                </div>
                <div>
                    {renderError()}
                </div>
            </form>
            <div>
                {renderAge()}
            </div>
        </div>
    )
}
