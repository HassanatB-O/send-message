/* eslint-disable no-unused-vars */
import { React, useState} from 'react'
import { send } from 'emailjs-com'

export default function SendMessage() {
    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        reply_to: '',
        send_from: '',
        message: ''
      });

    const handleSubmit = (event) =>{ 
        event.preventDefault()
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
            from_name: '',
            to_name: '',
            reply_to: '',
            send_from: '',
            message: ''
        })
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
        <h2>Send a message</h2>
        <p>Send individual emails to anyone</p>
        <form onSubmit={handleSubmit}>
        <label htmlFor='name'>From: </label>
        <input 
            type='text' 
            id='name'
            name='from_name'
            value={toSend.from_name}
            onChange={handleChange}
            />
        <hr/>
        <br/>
        <label htmlFor='receiver'>To: </label>
        <input 
            type='text' 
            id='receiver'
            name='to_name'
            value={toSend.to_name}
            onChange={handleChange}
            />
        <hr/>
        <br/>
        <label htmlFor='your-email'>Your Email: </label>
        <input 
            type='text' 
            id='your-email'
            name='send_from'
            value={toSend.send_from}
            onChange={handleChange}
            required
            />
        <hr/>
        <br/>
        <label htmlFor='their-email'>Receiver's Email: </label>
        <input 
            type='text' 
            id='their-email'
            name='reply_to'
            value={toSend.reply_to}
            onChange={handleChange}
            required
            />
        <hr/>
        <br/>
        <label htmlFor='email'>Message: </label>
        <br/>
        <textarea 
            type='text' 
            id='message'
            name='message'
            value={toSend.message}
            onChange={handleChange}
            />
        <br/>
        <div className='btn--div'>
            <button type='submit'>Send your message</button>
        </div>
        </form>
    </div>
  )
}
