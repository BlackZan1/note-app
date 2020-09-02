import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

const SaveButton = ({ onClickHandler }) => {
    return (
        <div className='save-btn' onClick={onClickHandler}>
            <div>
                <AiOutlineCheck />
            </div>
        </div>
    )
}

export default SaveButton;