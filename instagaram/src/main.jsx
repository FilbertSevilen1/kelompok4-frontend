import React, { useEffect } from 'react'

import { Routes, Route} from 'react-router-dom'

import Navigationbar from './components/navbar'
import  Axios  from 'axios';
import Login from './pages/login'
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state)

  useEffect(()=>{
    const uid = localStorage.getItem("token")
    Axios.get(`http://localhost:5000/api/users/${uid}`)
    .then((respond)=>{
      dispatch({type:'LOGIN', payload:respond.data[0]})
    })
    .catch((error)=>{
      console.log(error.response.data)
    })
  },[])
  return (
    <div>
      <Routes>
        <Route path='/admin' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App;