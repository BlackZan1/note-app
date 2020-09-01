import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Input } from 'antd';

import debounce from '../../utils/textHelper';

import 'react-quill/dist/quill.snow.css';

const Editor = ({ note, updateNote }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        if(!!note && note !== null) {
            setData(note);
        }
    }, [note])

    if(!data.title && !data.body) return null;

    const update = () => updateNote(note.id, data);

    const updateData = async (value, type) => {
        setData((state) => ({
            ...state,
            [type]: value
        }))

        await update();
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
        </div>
    )
}

export default Editor;