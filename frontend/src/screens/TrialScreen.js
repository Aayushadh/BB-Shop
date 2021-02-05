import ReactStars from 'react-rating-stars-component'
import React from 'react'

const TrialScreen = () => {
    const ratingChanged = (newRating) => {
        console.log(newRating)
    }

    return (
        <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
        />
    )
}

export default TrialScreen
