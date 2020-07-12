import React from 'react';
import StarRatings from 'react-star-ratings';



function Rating({item}){
    return(
        <React.Fragment>
            <StarRatings rating={item} starRatedColor="#FA6400" numberOfStars={5} name='dfficulty' starDimension="20px" starSpacing="0px" />
            {item === 1  || item === 2 ? <p>Difficulty: Beginner</p> : null}
            {item === 3 ? <p>Difficulty: Intermediate</p> : null}
            {item === 4 ? <p>Difficulty: Advanced</p> : null}
            {item === 5 ? <p>Difficulty: Athlete</p> : null}
        </React.Fragment>
    )
}


export default Rating;