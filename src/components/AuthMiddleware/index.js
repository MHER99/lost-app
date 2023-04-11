import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import { useNavigate,Outlet,Link } from "react-router-dom";
import { useState,useEffect } from "react";
import style from "./style.module.css"


const AuthMiddleware = () =>{
    const auth = getAuth()
    const navigate = useNavigate()
    const [user,setUser] = useState(null)
    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(!user){
                return navigate("/")
            }else {
                setUser(user.uid)
            }
        })
    },[])
    return user && <>
    <nav className={style.navBar}>
        <ul>
        <li><Link className={style.link} to="/profile">Profile</Link></li>
        <li><Link className={style.link} to="settings">Settings</Link></li>
        <li><Link className={style.link} to="search">Search</Link></li>
        <li onClick={()=>{signOut(auth)}}>LogOut</li>

        </ul>
        <Outlet context={{user}}/>
        

    </nav>
    
    </>
}
export default AuthMiddleware