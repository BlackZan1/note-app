import React from 'react';
import { AiOutlineClear, AiOutlineDelete, AiFillQuestionCircle } from 'react-icons/ai';

import { removeHTMLtags } from '../../utils/textHelper';

import styles from './WrapperItem.module.css';
import { Modal } from 'antd';

const WrapperItem = ({ title, body, isSelected, id, setNote, deleteNote }) => {
    let classname = styles.wrapperItem;
    let innerText = body;

    if(innerText.trim().length) {
        innerText = removeHTMLtags(body);

        if(innerText.trim().length > 33) {
            innerText = innerText.substring(0, 33) + '...';
        }
    }

    if(isSelected) {
        classname += ' item-active';
    }

    const onDeleteHandler = () => {
        Modal.confirm({
            icon: <AiFillQuestionCircle style={{ fontSize: '24px', color: 'crimson' }} />,
            content: 'Do you want to delete this note?',
            onOk() {
                deleteNote(id);
            },
            onCancel() {
                console.log('Canceled');
            }
        })
    }

    return (
        <div className={ classname } onClick={() => setNote({ title, body, id }, id)}>
            <div className={ styles.wrapperItem_info }>
                <p>{ title }</p>

                <span>{ innerText }</span>
            </div>

            <div style={{ display: 'flex' }}>
                <button>
                    <AiOutlineClear />
                </button>
                
                <button>
                    <AiOutlineDelete onClick={onDeleteHandler} />
                </button>
            </div>
        </div>
    )
}

export default WrapperItem;