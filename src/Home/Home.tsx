import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

export default function Home() {
    return (
        <div className="Home">
            <h2>Welcome to the fetchsample page.</h2>
            <p>
                Below you can click on the links to test some examples.
                It's a good behaviour to do so and look at the code in parallel.
            </p>

            <h4>Collection of example links:</h4>
            <div id="link-list">
                <Link to="/getsample">
                    Simple GET-Request example
                </Link>
                <Link to="/postsample">
                    Simple POST-Request example
                </Link>
            </div>
        </div>
    )
}
