import React from 'react';

import WrapperItem from '../../WrapperItem/WrapperItem';

const SidebarWrapper = ({ notes, resetNoteBody, selectedNoteIndex, onDeleteHandler, setNote, deleteNote }) => {
    debugger;
    
    return (
        <div>  
            {
                notes.length ?
                notes.map((note) => {
                    const isSelected = note.id === selectedNoteIndex;

                    return <WrapperItem 
                        resetNoteBody={resetNoteBody}
                        setNote={setNote}
                        deleteNote={deleteNote}
                        key={note.id}
                        id={note.id}
                        title={note.title} 
                        body={note.body} 
                        isSelected={isSelected} 
                        onDeleteHandler={onDeleteHandler}
                    />
                })
                :
                null
            }
        </div>
    )
}

export default SidebarWrapper;