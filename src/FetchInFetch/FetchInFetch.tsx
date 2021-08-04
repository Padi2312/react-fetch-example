import React, { useEffect, useState } from 'react'
import BackButton from '../BackButton/BackButton'
import IJoke from '../Models/IJokeResponse'
import './FetchInFetch.scss'

export default function FetchInFetch() {

    const [jokeList, setJokeList] = useState<IJoke[]>([])
    const [jokesLoaded, setJokesLoaded] = useState(0)

    useEffect(() => {
        getJokes()
        return () => { }
    }, [])


    const getJokes = async () => {
        //Fetch a list of jokes
        const response = await fetch(`https://official-joke-api.appspot.com/jokes/ten`)
        const jokes = await response.json()

        //Because of an async function in the for-loop
        //you cannot use for-each it won't work
        //so you have to use a for-of loop :)
        let counter = 0
        for (const element of jokes) {
            //But everyone likes images ... so put some images beside the jokes.
            element.image = await getRandomImages()
            counter += 1
            setJokesLoaded(counter)
        }
        //Trigger rerender
        setJokeList(jokes)
    }


    //Get the URL of a random image 
    const getRandomImages = async () => {
        return fetch(`https://picsum.photos/100`).then(res => {
            return res.url
        })
    }

    //Map and return the jokes as html layout 
    const renderJokes = () => {
        return (
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>TYPE</th>
                        <th>SETUP</th>
                        <th>PUNCHLINE</th>
                        <th>RANDOM IMAGE</th>
                    </tr>
                    {jokeList.map(joke => {
                        return (
                            <tr key={joke.id}>
                                <td>{joke.id}</td>
                                <td>{joke.type}</td>
                                <td>{joke.setup}</td>
                                <td>{joke.punchline}</td>
                                <td>
                                    <img src={joke.image} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )

    }

    const toggleLayout = () => {
        if (jokeList.length === 0) {
            return (<div>
                <h1 id="heading">Loading Jokes</h1>
                <div id="loading">
                    <div id="text">
                        {jokesLoaded} / 10
                </div>
                </div>
            </div>
            )
        }
        else {
            return renderJokes()
        }
    }

    return (
        <div className="FetchInFetch">
            <BackButton/>
            {toggleLayout()}
        </div>
    )
}
