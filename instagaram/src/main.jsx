import React, { useEffect } from 'react'

import { Routes, Route} from 'react-router-dom'

import Landing from './pages/landing'
import Login from './pages/login'
import { useDispatch, useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state)

  return (
    <div>
      <Routes>
      <Route path='/' element={<Landing/>}/>
        <Route path='/admin' element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App;