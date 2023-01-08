/* eslint-disable no-unused-vars */
import { React, useState} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { send } from 'emailjs-com'

export default function SignUp() {
    const [toSend, setToSend] = useState({
        to_name: '',
        reply_to: '',
      });

    const schema = yup.object().shape(
        {
            password: yup.string().required("Please enter password").matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?.&])[A-Za-z\d@$!%*#?&]{8,}/,
            "Must contain 8 characters, One Capital Letter, One Lowercase, One Number and One Special Case Character")
        }
    )

    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            resolver: yupResolver(schema)
        }
    )

    const onSubmit = (event) =>{ 
        send(
            'service_nda2awd',
            'template_504tu6a',
            toSend,
            'jt-O6au2VBMiNKReC'
        )
        .then(res =>{
            alert('SUCCESS!', res.status, res.text)
        })
        .catch(err =>{
            alert('FAILED! Invalid email', err)
        })
        setToSend({
            to_name: '',
            reply_to: ''
        })
        document.getElementById('password').value = ''
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setToSend(prevFormData =>{
            return{
                ...prevFormData,
                [name]: value
            }
        })
    }
  return (
    <div className='Sign--up'>
        <nav>
            <img src='Image/logo.svg' alt=''/>
        </nav>
        <h2>Create an account</h2>
        <p>Let's get started with your 30-day free trial</p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Name: </label>
        <input 
            type='text' 
            id='name'
            name='to_name'
            value={toSend.to_name}
            onChange={handleChange}
            />
        <hr/>
        <br/>
        <label htmlFor='email'>Email: </label>
        <input 
            type='text' 
            id='email'
            name='reply_to'
            value={toSend.reply_to}
            onChange={handleChange}
            required
            />
        <hr/>
        <span className="message">{errors.email?.message}</span>
        <br/>
        <label htmlFor='password'>Password: </label>
        <input 
            type='password' 
            id='password' 
            {...register('password')}/>
        <hr/>
        <span className="message">{errors.password?.message}</span>
        <br/>
        <div className='btn--div'>
            <button type='submit'>Create account</button>
        </div>
        </form>
    </div>
  )
}
