import { TextField,Box,Button } from "@mui/material"
import { useState } from "react"
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import {db} from "../../firebase-config"
import style from './style.module.css'
import {encrypt} from "n-krypta"
const Login = () =>{
    const [user,setUser]=useState({login:"",password:""})
    const [error,setError]=useState("")
    const auth = getAuth()
    const navigate = useNavigate()
    const handleSubmit = event =>{
        event.preventDefault()
        console.log("aaaaa")
        const secretKey = 'key'
        const hashedPasword = encrypt(user.password,secretKey)
       console.log(user.password+"->"+ hashedPasword)
        signInWithEmailAndPassword(auth,user.login,hashedPasword )
        .then(r=>{
            navigate("/profile")
        })
        .catch(err=>{
            console.log(err.message)
            setError(err.message)
        })

    }
    return <div>
        <h1>Login</h1>
         <div >
         {error && <p style={{color:"red"}}>{error}</p>}
                <form style={style.form1} onSubmit={handleSubmit}>
                    <div>
                        <TextField
                        required
                        fullWidth
                        value={user.login}
                        label="Email address"
                        onChange={e=>setUser({...user,login:e.target.value})}
                        />
                    </div>

                    <div>
                        <TextField
                        required
                        fullWidth
                        type="password"
                        value={user.password}
                        label="password"
                        onChange={e=>setUser({...user,password:e.target.value})}
                        />
                    </div>
                    <div className={style.box2}>
                    <div >
                        <Button variant="contained" type="submit">Login</Button>
                    </div>
                    <div>
                        <Button variant="contained">
                        <Link style={{textDecoration:'none',color:'white'}} variant="contained" to={"/signup"}>Signup</Link>
                        </Button>
                        
                    </div>

                    </div>

                </form>

         </div>
{/* 
            <Box sx={{width:500}}>


            </Box> */}
    </div>
}
export default Login