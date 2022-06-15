import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import '../../css/admin/loginregister.css'
import { useNavigate } from 'react-router-dom'
import { Spinner, useToast } from '@chakra-ui/react'

function AdminLogin () {
    const toast = useToast();
    const user = useSelector((state) => state)
    const navigate = useNavigate();

    if(user.email){
        navigate('/')
    }
    const email = useRef("");
    const password = useRef("");

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState();
    const [showPassword, setShowPassword] = useState(false)
    const [keepLogged, setKeepLogged] = useState(false)

    const dispatch = useDispatch()

    const onSubmitButton = () =>{
        setLoading(true);

        if(!email.current.value){
            setLoading(false);
            toast({
                title: 'email cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            return setErrorMessage("email cannot be empty")
        }
        if(!password.current.value){
            setLoading(false);
            toast({
                title: 'Password cannot be empty',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            return setErrorMessage("Password cannot be empty")
        }

        const data = {
            email : email.current.value,
            password : password.current.value
        }
        console.log(data)
        Axios.post("http://localhost:5000/api/admin/login", data)
        .then((respond)=>{
            console.log(respond.data)
            setErrorMessage("Login Success")
            if(keepLogged){
                // localStorage.setItem("token",respond.data.uid)
            }
            dispatch({ type : 'ADMIN_LOGIN', payload : respond.data})
            setLoading(false);
            toast({
                title: 'Login Success!',
                description: "",
                status: 'success',
                duration: 5000,
                isClosable: true,
              })
            navigate('/')
        })
        .catch((error)=>{
            setErrorMessage("Internal Service Error")
            setLoading(false);
        })
    }
    const changeShowState = () =>{
        if(showPassword)return setShowPassword(false)
        return setShowPassword(true)
    }
    const changeKeepLogged = () =>{
        if(showPassword)return setKeepLogged(false)
        return setKeepLogged(true)
    }
    return (
        <div className='loginContainer'>
            <div className='loginForm'>
                <h1 className='loginHeader'>Admin Login</h1>
                <div className='loginFormInput'>
                    <h3 className='loginLabel'>Email</h3>
                    <input type="text" className='Input' ref={email}></input>
                </div>
                <div className='loginFormInput'>
                    <h3 className='loginLabel'>Password</h3>
                    <input type={showPassword?"text":"password"} className='Input' ref={password}></input>
                    <div className='checkboxForm'><input class="checkboxMargin" type="checkbox" id="showPassword" onClick={changeShowState} style={{cursor:"pointer"}}></input><label htmlFor='showPassword' style={{cursor:"pointer"}}>Show Password</label></div>
                </div>
                <div className='loginFormInputSmall'>
                    <div><input class="checkboxMargin" type="checkbox" id="keepLogged" onClick={changeKeepLogged} style={{cursor:"pointer"}}></input><label htmlFor='keepLogged' style={{cursor:"pointer"}}>Keep me Logged in</label></div>
                </div>
                <div className='loginFormInputSmallBottom'>
                   {errorMessage}
                </div>
                <div>
                    {
                        loading?
                        <button className='submitButton' onClick={onSubmitButton}>
                            <Spinner color='blue.500' size='sm'/> Loading
                        </button>
                        :
                        <button className='submitButton' onClick={onSubmitButton}>
                            Login
                        </button>
                    }
                    
                    <button className='submitButton' onClick={() => navigate('/admin/forget-password')}>
                        Forget Password
                    </button>
                </div>
                
            </div>
        </div>
    )
}
export default AdminLogin;