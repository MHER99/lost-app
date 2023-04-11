import { BrowserRouter,Routes,Route } from "react-router-dom";
import AuthMiddleware from "./components/AuthMiddleware";
import Login from "./components/login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Settings from "./components/Settings";
import SeaechUsers from "./components/SearchUsers";
import Account from "./components/Account"
import PostDetalis from "./components/PostDetalis"
const MyRoutes = ()=>{
    return <BrowserRouter>
    <Routes>
        <Route index element={<Login/>}/>
        <Route path="/profile" element={<AuthMiddleware/>}>
         <Route path="" element={<Profile/>}/>
         <Route  path ="settings" element={<Settings/>}/>
         <Route path="search" element={<SeaechUsers/>}/>
         <Route path="user/account/:id" element={<Account/>}/>
         <Route path = "post/:id" element={<PostDetalis/>}/>
        </Route>
        {/* <Route path="" element={<Profile/>}/> */}
        <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
}
export default MyRoutes