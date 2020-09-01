import { createStore, createEvent, combine } from 'effector';
import { useEffect, useState } from 'react';

export const setNotesAction = createEvent();
export const selectNoteAction = createEvent();
export const selectNoteIndexAction = createEvent();

export const useEffectorStore = () => {
    const [state, setState] = useState({});

    const selectedNote = createStore(null).on(selectNoteAction, (state, payload) => payload);
    const selectedNoteIndex = createStore(null).on(selectNoteIndexAction, (state, payload) => payload);
    const notes = createStore([]).on(setNotesAction, (state, payload) => payload);

    const combineStore = combine({
        selectedNote,
        selectedNoteIndex,
        notes
    })

    useEffect(() => {
        setState(combineStore.getState());
    }, [state, combineStore])

    return {
        state
    }
}

// --------------
class EffectorStore {
    constructor(state, action) {
        this.store = createStore(state);
        this.store = this.store.on(action, (state, payload) => payload);
    }
}

export class Effector {
    constructor() {
        this.notes = new EffectorStore([], setNotesAction);
        this.selectedNote = new EffectorStore(null, selectNoteAction);
        this.selectedNoteIndex = new EffectorStore(null, selectNoteIndexAction);

        this.store = combine({
            selectedNote: this.selectedNote,
            selectedNoteIndex: this.selectedNoteIndex,
            notes: this.notes
        })
    }

    setNotes(data) {
        setNotesAction(data);
    }

    selectNote(data) {
        selectNoteAction(data);
    }

    selectNoteIndex(data) {
        selectNoteIndexAction(data);
    }

    getState() {
        const state = this.store.getState()

        return state;
    }
}