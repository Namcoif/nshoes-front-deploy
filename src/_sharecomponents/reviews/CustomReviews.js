import { Rating, TextareaAutosize } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomInput from './../input/CustomInput';

function CustomReviews(props) {

    const { _getReviews } = props

    const [star, setStar] = useState(0);
    const [comment, setComment] = useState('');

    const _getComment = (name, value) => {
        setComment(value)
    }

    useEffect(() => {
        _getReviews('star', star);
        _getReviews('comment', comment);
    }, [star, comment])

    return (
        <div className='w-96 flex flex-col items-center'>
            <div className='flex flex-col items-start w-80'>
                <span>How accurate was product</span>
                <Rating
                    name="simple-controlled"
                    value={star}
                    onChange={(event, newValue) => {
                        setStar(newValue);
                    }}
                />
            </div>

            <div className='flex flex-col mt-2'>
                <span>Comments</span>
                <TextareaAutosize minRows={5}
                    placeholder="Type anything…"
                    style={{ width: 320, border: '2px solid #ccc', padding: 5 }}
                    aria-label="empty textarea"
                    onChange={(e) => {
                        setComment(e.target.value);
                    }}
                />

            </div>
        </div>
    );
}

export default CustomReviews;