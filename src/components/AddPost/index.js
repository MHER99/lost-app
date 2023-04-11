import {collection,addDoc} from "firebase/firestore"
import {db, storage} from "../../firebase-config"
import { getDownloadURL,ref,uploadBytesResumable, } from "firebase/storage"
import { useState,useRef} from "react"
import { Button,TextField } from "@mui/material"
import { useOutletContext } from "react-router-dom"
import { async } from "@firebase/util"
const AddPost =()=>{
    const postList = collection(db,"posts")
    const [text,setText] = useState("")
    const [loading,setLoading]=useState(false)
    const {user} = useOutletContext()
    const photoRef = useRef()
    const handleSubmut = event=>{
        event.preventDefault()
        const file = photoRef.current.files[0]
        setLoading(true)
        if(!file){
            setLoading(false)
            console.log("error in AddPost components line 17")
            return
        }
        const storageRef = ref(storage,`posts/${Date.now()+file.name}`)
        const uploadTask = uploadBytesResumable(storageRef,file)
        uploadTask.on("state_changed",null,null,()=>{
            console.log("uploaded")
            getDownloadURL(uploadTask.snapshot.ref)
            .then(async(downloadURL)=>{
                await addDoc(postList,{
                    userId:user,
                    photo:downloadURL,
                    title:text,
                    likes:[]

                })
                setText("")
                photoRef.current.value=""
                setLoading(false)

            })

        })
    }
    return <div>
        <h1>AddPost</h1>
        <form onSubmit={handleSubmut}>
            <TextField
            required
            fullWidth
            variant="filled"
            label ="Whats on your mind"
            value={text}
            onChange={e=>setText(e.target.value)}
            />
            <input type="file" ref={photoRef}/>
            <div>
                <Button disabled={loading} variant="contained" type="submit">Post</Button>
            </div>

        </form>
    </div>
}
export default AddPost