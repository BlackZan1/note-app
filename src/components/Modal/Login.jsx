import React, { useState } from 'react';
import Modal from 'antd/lib/modal/Modal';
import { Button, Input } from 'antd';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { Auth } from '../../service/auth';

const Login = ({ isVisible, toggleMode, setUserData }) => {
    const [data, setData] = useState({
        email: '',
        password: ''
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

    const validate = () => {
        if(data.password.trim().length <= 8) {
            setErros((state) => ({
                ...state,
                password: 'Password must be more than 8 symbols'
            }))

            return false;
        }

        return true;
    }

    const onSubmitHandler = async () => {
        if(validate()) {
            const auth = new Auth(data.email, data.password);
            const res = await auth.login();

            if(res.code) {
                return setErros((state) => ({
                    ...state,
                    form: res.message
                }))
            }

            setUserData({
                email: res.email,
                img: res.photoURL,
                uid: res.uid
            })
        }
        else {
            console.log('NO')
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
                    Login
                </Button>,
                <Button 
                    key={'signup'} 
                    style={{ background: '#fff', color: 'dodgerblue', borderRadius: '10px' }}
                    onClick={() => toggleMode('signup')}
                >
                    Signup
                </Button>
            ]}
        >
            <h1 style={{ marginBottom: '1.5rem' }}>Login, sir!</h1>

            <Input 
                value={data.email} 
                placeholder='Your login' 
                prefix={<AiOutlineUser size={24} />} 
                style={{ borderRadius: '10px', marginBottom: '15px' }} 
                name='email'
                type='email'
                onChange={onChangeHandler}
            />

            <Input 
                value={data.password} 
                placeholder='Your password' 
                type='password' 
                prefix={<AiOutlineLock size={24} />} 
                style={{ borderRadius: '10px', marginBottom: '15px' }} 
                name='password'
                onChange={onChangeHandler}
            />

            {
                !!errors.password && <p className='text-error'>{ errors.password }</p>
            }

{
                !!errors.form && <p style={{ margin: '1rem auto' }} className='text-error'>{ errors.form }</p>
            }
        </Modal>
    )
}

export default Login;