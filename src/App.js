import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider } from 'react-router-dom'
import './app.css'
import {Home, Signin , Signup , Topics, Main, Profile , CheackEmail,ChatRoom , Notification, Messages , CreateExchangePage , CreateRequestPage , Offers , Users , ProfileUsers , WishList , EditProfile , EditInfromations} from './Pages/index'




const router = createBrowserRouter(
    createRoutesFromElements(
            <Route>
                <Route path='/' element = {<Home/>}></Route> {/* done (5as el video bark)*/}
                <Route path='/Signin' element = {<Signin/>}></Route> {/* done */}
                <Route path='/Signup' element = {<Signup/>}></Route> {/* done */}
                <Route path='/Main' element={<Main/>}></Route> {/* done */}
                <Route path='/Profile' element={<Profile/>}></Route> {/* done but add fetching later on */}
                <Route path='/Topics' element= {<Topics/>}></Route>
                <Route path='/CheackEmail' element={<CheackEmail/>}></Route>
                <Route path='/ChatRoom' element={<ChatRoom/>}></Route>
                <Route path='/Notification' element={<Notification/>}></Route>
                <Route path='/Messages' element={<Messages/>}></Route>
                <Route path='/CreateExchangePage' element={<CreateExchangePage/>}></Route>
                <Route path='/CreateRequestPage' element={<CreateRequestPage/>}></Route>
                <Route path='/Offers/:requestId' element={<Offers />} /> 
                <Route path='/Users' element={<Users/>}></Route>
                <Route path='/ProfileUsers' element={<ProfileUsers/>}></Route>
                <Route path='/WishList' element={<WishList/>}></Route>
                <Route path='/EditInfromations' element={<EditInfromations/>}></Route>
            </Route>
       
    )
)

const App = () => {
    return(
     <RouterProvider router = {router}/> 

    )
}
export default App