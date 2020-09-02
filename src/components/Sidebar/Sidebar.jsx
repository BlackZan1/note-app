import React, { useState, Fragment } from 'react';
import { Button, Input } from 'antd';
import { AiOutlineFileAdd, AiOutlineFileExcel } from 'react-icons/ai';

import SidebarWrapper from './SidebarWrapper/SidebarWrapper';

import styles from './Sidebar.module.css';

const Sidebar = ({ notes, selectedNoteIndex, onDeleteHandler, setNote, addNewNote, resetNoteBody, deleteNote }) => {
    const [ isAdding, setIsAdding ] = useState(false);
    const [ title, setTitle ] = useState('');

    const inputChangeHandler = (ev) => {
        const { value } = ev.currentTarget;

        setTitle(value);
    }

    const buttonClickHandler = () => {
        setIsAdding(!isAdding);
    }

    const _showNoteForm = () => {
        return (
            <div className={styles.sidebarAddForm}>
                <Input onChange={inputChangeHandler} value={title} placeholder='Enter a new note title' />

                <Button onClick={() => addNewNote(title)} type={'primary'} disabled={!title.trim().length}>
                    Add note
                </Button>
            </div>
        )
    }

    return (
        <div className='main-sidebar'>
            <Button className={styles.sidebarAddBtn} onClick={buttonClickHandler}>
                {
                    isAdding ? 
                    <Fragment>
                        <AiOutlineFileExcel /> Cancel
                    </Fragment>
                    : 
                    <Fragment>
                        <AiOutlineFileAdd /> New note
                    </Fragment>
                }
            </Button>

            {
                isAdding && _showNoteForm()
            }

            <SidebarWrapper 
                resetNoteBody={resetNoteBody}
                onDeleteHandler={onDeleteHandler} 
                notes={notes} 
                selectedNoteIndex={selectedNoteIndex} 
                setNote={setNote}
                deleteNote={deleteNote}
            />
        </div>
    )
}

export default Sidebar;