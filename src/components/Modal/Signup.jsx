import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Input } from 'antd';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { Auth } from '../../service/auth';

const Signup = ({ isVisible, toggleMode }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })
    const [errors, setErros] = useState({
        email: '',
        password: '',
        form: ''
    })

    const onChangeHandler = (ev) => {
        const { name, value } = ev.currentTarget;

        setData((state) => ({
            ...state,
            [name]: value
        }))
    }

    const onTouchedHandler = (name) => {
        setTouched((state) => ({
            ...state,
            [name]: true
        }))

        setErros({
            email: '',
            password: ''
        })
    }

    const validate = () => {
        if(!data.password.trim().length) {
            setErros((state) => ({
                ...state,
                password: 'Is required!'
            }))

            return false;
        }
        else if(data.password.trim().length <= 8) {
            setErros((state) => ({
                ...state,
                password: 'Password must be more than 8 symbols'
            }))

            return false;
        }

        if(!data.email.trim().length) {
            setErros((state) => ({
                ...state,
                email: 'Is required!'
            }))

            return false;
        }

        return true;
    }

    const onSubmitHandler = async () => {
        if(validate()) {
            const auth = new Auth(data.email, data.password);
            const res = await auth.signup();

            if(res.code) {
                setErros((state) => ({
                    ...state,
                    form: res.message
                }))
            }
        }
    }

    let isOk = !!data.email.trim().length && !!data.password.trim().length;

    return (
        <Modal
            visible={isVisible}
            onCancel={() => toggleMode()}
            footer={[
                <Button 
                    disabled={!isOk} 
                    key={'login'} 
                    onClick={onSubmitHandler}
                    style={{ background: 'dodgerblue', color: '#fff', borderRadius: '10px' }}
                >
                    Signup
                </Button>,
                <Button 
                    key={'signup'} 
                    style={{ background: '#fff', color: 'dodgerblue', borderRadius: '10px' }}
                    onClick={() => toggleMode('login')}
                >
                    Login
                </Button>
            ]}
        >
            <h1 style={{ marginBottom: '1.5rem' }}>Signup, adventurer!</h1>

            <Input 
                value={data.email} 
                placeholder='Your login' 
                prefix={<AiOutlineUser size={24} />} 
                style={{ borderRadius: '10px', marginBottom: '15px' }} 
                name='email'
                type='email'
                onChange={onChangeHandler}
                onClick={() => onTouchedHandler('email')}
            />

            <Input 
                value={data.password} 
                placeholder='Your password' 
                type='password' 
                prefix={<AiOutlineLock size={24} />} 
                style={{ borderRadius: '10px', marginBottom: '15px' }} 
                name='password'
                onChange={onChangeHandler}
                onClick={() => onTouchedHandler('password')}
            />

            {
                !!errors.form && <p style={{ margin: '1rem auto' }} className='text-error'>{ errors.form }</p>
            }
        </Modal>
    )
}

export default Signup;