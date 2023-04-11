import { TextField } from "@mui/material"
import { useState } from "react"
import {collection,getDocs,query,where}from "firebase/firestore"
import SearchItems from "../SearchItems"
import {db} from "../../firebase-config"
const SerachUsers=()=>{
    const [text,setText]=useState("")
    const [result,setResult]=useState([])
    const userList =collection(db,"users")
    const handleSearch = async e=>{
        let current = e.target.value
        setText(current)
        const items = await getDocs(query(userList,where("name","==",current)))
        setResult(items.docs.map(elm=>{
            return{
                ...elm.data(),
                id:elm.id
            }
        }))
        
    }
    return <div>
        <TextField
        label="Search"
        fullWidth
        required
        value={text}
        onChange={handleSearch}/>
        <div className="grid">
            {
                result.map(elm=><SearchItems key={elm.id} person={elm}/>)
            }

        </div>
        
    </div>
}
export default SerachUsers