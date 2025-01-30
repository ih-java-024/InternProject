import React from 'react'
// import Prof from './Home/Prof'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Log from './Home/Log'
import RegistrationForm from './Home/reg/RegistrationForm'
import User from './Home/reg/User'
import Plan from './Home/plans/Plan'
import Pay from './Home/Pay'
import Review from './Home/plans/Review'
import PolicyDetails from './Home/PolicyDetails'
import Profile from './Home/Profiledetails/Profile'




function App () {
  return (
    <div>
      <BrowserRouter>
         <Routes>
                 <Route path='/' element={ <Log/> }/>
                 {/* <Route path='/prof'element={ <Prof/> }/> */}
                 <Route path='/Policydetails' element={ <PolicyDetails/>}/>
                 <Route path='/registration'element={ <RegistrationForm/> }/>
                 <Route path='/user'element={ <User/> }/>
                 <Route path='/plan'element={ <Plan/> }/>
                 <Route path='/pay'element={ <Pay/> }/>
                 <Route path='/review'element={ <Review/> }/>
                 <Route path='/profile'element={ <Profile/>}/>

         </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App