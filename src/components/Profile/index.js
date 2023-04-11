import { useOutletContext } from "react-router-dom"
import Gallery from "../Gallery"
import { useEffect, useState } from "react"
import {collection,getDocs,query,where} from "firebase/firestore"
import {db} from "../../firebase-config"
import style from "./style.module.css"
const Profile = (props) =>{
    const {user} = useOutletContext()
    const [account,setAccount]=useState(null)
    const userList = collection(db,"users")
    const defaultPicture = "https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png"
    const getUserProfile = async ()=>{
        const q = query(userList,where("userId","==" ,user));
        const info = await getDocs(q)
        if(info.size>0){
            const obj = info.docs[0]
            setAccount({...obj.data(),id:obj.id})

        }
    }
    useEffect(()=>{
        console.log("getiong....",user)
        getUserProfile();

    },[])
    return <div className={style.profileBox}>
        {
            !account
            ?
            <p>plesas wait loading....</p>
            :
            <div>
                <div className={style.imgBox}>
                <img
                className={style.profile_picture}
                src={account.profilePicture?account.profilePicture:defaultPicture}
                />
            </div>
            <h1>{account.name} {account.surname}</h1>
            <Gallery/>

            </div>

            
        }
    </div>
}
export default Profile