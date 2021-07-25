import React from 'react'
import { Link } from 'react-router-dom';

export default function BackButton() {
    return (
        <div>
            <Link to="/">
                <button>
                    Back to homepage
                </button>
            </Link>
            <hr />

        </div>
    )
}
