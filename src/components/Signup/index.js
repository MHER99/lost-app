import { TextField,Button } from "@mui/material"
import style from "./style.module.css"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import { collection,addDoc } from "firebase/firestore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { db } from "../../firebase-config"
// import bcrypt from "bcryptjs"
import {encrypt} from "n-krypta"
const Signup = () =>{
    const [user,setUser]= useState({name:"",surname:"",login:"",password:""})
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const auth = getAuth()
    const userList = collection(db,"users")
    const handleSubmit = event=>{
        event.preventDefault()
        const secretKey = 'key'
        const hashedPasword = encrypt(user.password,secretKey)
        console.log(user.password +"->"+ hashedPasword)
        createUserWithEmailAndPassword(auth,user.login,hashedPasword)
        .then(async r=>{
            //console.log("success",r.user.uid)
            setError("")
            await addDoc(userList,{
                name:user.name,
                surname:user.surname,
                profilePicture:"",
                userId:r.user.uid

            })
            navigate("/")
        })
        .catch(err=>{
            //console.log(err.message)
            setError(err.message)
        })
    }
    return <div className={style.bigBox}>
        <h1>Sign up</h1>
        {error&& <p style={{color:"red"}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                label="name"
                value={user.name}
                onChange ={e=>setUser({...user,name:e.target.value})}
                />
            </div>

            <div>
                <TextField
                label="surname"
                value={user.surname}
                onChange ={e=>setUser({...user,surname:e.target.value})}
                />
            </div>

            <div>
                <TextField
                label="login"
                value={user.login}
                required
                onChange ={e=>setUser({...user,login:e.target.value})}
                />
            </div>

            <div>
                <TextField
                label="password"
                value={user.password}
                type="password"
                required
                onChange ={e=>setUser({...user,password:e.target.value})
                }
                />
            </div>

            <div>
                <Button type="submit">Save</Button>
            </div>
        </form>
    </div>
}
export default Signup