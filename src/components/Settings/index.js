import { useRef } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import {db,storage} from "../../firebase-config"
import { getDownloadURL,ref,uploadBytesResumable } from "firebase/storage"
import { updateDoc,collection,doc,query,where,getDocs } from "firebase/firestore"
import { Button } from "@mui/material"
import { async } from "@firebase/util"
import { QRCodeCanvas } from "qrcode.react";

const Settings =()=>{
    const photoRef = useRef()
    const userList = collection(db,"users");
    const {user} = useOutletContext()
    const navigate = useNavigate()
    const qrcode = (
        <QRCodeCanvas
          id="qrCode"
          value="http://localhost:3000/profile/settings"
          size={300}
          bgColor={"#00ff00"}
          level={"H"}
        />
      );
    const handleSubmit = event =>{
        event.preventDefault()
        const file = photoRef.current.files[0]
        if(!file){
            return console.log("no File")
        }
        const storageRef = ref(storage,`files/${Date.now()+ file.name}`)
        const uploadTask = uploadBytesResumable(storageRef,file)
        uploadTask.on("state_changed",null,null,()=>{
            console.log("uploaded...")
            console.log(user)
            getDownloadURL(uploadTask.snapshot.ref)
            .then(async(downloadURL) => {
                const q = query(collection(db,"users"),where("userId","==",user));
                const info = await getDocs(q)
                if(info.size > 0){
                    console.log(info.docs[0])
                    let id =info.docs[0].id
                    await updateDoc(doc(db,"users",id),{profilePicture:downloadURL})
                    navigate("/profile")
                }

            })
        })


    }
    return <div>
        <h1>Settings</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" ref={photoRef}/>
            <div>
                <Button variant="contained" type="submit">Upload</Button>
            </div>
            <div>{qrcode}</div>
        </form>
    </div>
}
export default Settings