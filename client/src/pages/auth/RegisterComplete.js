import React, { useState, useEffect } from 'react';
import {auth} from '../../firebase';
import {toast} from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");

    const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch()

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))
        // console.log(window.location.href)
        // console.log(window.localStorage.getItem('emailForRegistration'))
    },[])
    const handleSubmit = async (e) => {
        e.prevenDefault();
        //validation
        if(!email || !password) {
            toast.error('Email and password is required')
            return
        }

        if(password.length < 6) {
            toast.error('password must be at least 6 character long')
            return
        }

        try {
            const result = await auth.signInWithEmailLink(email,window.location.href)
            // email,
            // window.location
            console.log('RESULT',result)

            if(result.user.emailVerified) {
                window.localStorage.removeItem("emailForRegistration");
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                console.log("user",user,"idTokenResult",idTokenResult)

                createOrUpdateUser(idTokenResult.token)
                .then(
                    (res) => {
                        dispatch({
                    type: "LOGGID_IN_USER",
                    payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                    },
                });
                    }
                )
                .catch();

                history.push("/")
            }
        } catch (error) {
            // console.lof(error)
            toast.error(error.message)
        }
    };

    const completeRegistrationForm = () => <form onSubmit={handleSubmit}>
        <input type="email"  
        value={email} 
        className='form-control'
        disabled
        />
        <input type="password"  
        value={password} 
        className='form-control'
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
        />
        <br />
        <button type="submit" className='btn btn-raised'>
            Complete registration
        </button>
    </form>
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <p>register Complete</p>
                    
                    {completeRegistrationForm()}
                </div>
            </div>            
        </div>
    );
};

export default RegisterComplete;