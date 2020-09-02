import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Input } from 'antd';

// import debounce from '../../utils/textHelper';
import SaveButton from '../SaveButton/SaveButton';

import 'react-quill/dist/quill.snow.css';

const Editor = ({ note, updateNote }) => {
    const [ data, setData ] = useState({});
    const [ isChanged, setIsChanged ] = useState(false);

    useEffect(() => {
        if(!!note && note !== null) {
            setData(note);
            setIsChanged(false);
        }
    }, [note])

    useEffect(() => {
        if(!!note) {
            if(note.title !== data.title) setIsChanged(true);
            if(note.body !== data.body) setIsChanged(true);
        }
    }, [data, note])

    if(!data.title && !data.body) return null;

    const update = () => updateNote(note.id, data);
    const onClickHandler = () => {
        setIsChanged(false);

        update();
    }

    const updateData = async (value, type) => {
        setData((state) => ({
            ...state,
            [type]: value
        }))

        // await update();
    }


    return (
        <div className='main-editor'>
            <Input 
                onChange={(ev) => updateData(ev.currentTarget.value, 'title')} 
                name='title' 
                value={data.title} 
                className='input-fixed' 
            />

            <ReactQuill 
                onChange={(value) => updateData(value, 'body')} 
                value={data.body} 
            />

            {
                isChanged && <SaveButton onClickHandler={onClickHandler} />
            }
        </div>
    )
}

export default Editor;