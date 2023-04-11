import {collection,getDoc,getDocs,doc,query,where} from "firebase/firestore"
import {db} from "../../firebase-config"
import { useState,useEffect } from "react"
import { useParams,useNavigate } from "react-router-dom"
import PostList from "../PostList"
import { async } from "@firebase/util"
const Account = ()=>{ 
    const postList = collection(db,"posts")
    const defaultPic = "https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png"
    const [user,setUser] = useState(null)
    const [posts,setPosts] =useState([])
    const {id}=useParams()
    const navigate = useNavigate()
    const getPosts = async(id)=>{
        const items = await getDocs(query(postList,where("userId","==",id)))
        setPosts(items.docs.map(elm=>{
            return {
                ...elm.data(),
                id:elm.id
            }
        }))

    }
    const getUser = async()=>{
        const docRef =doc(db,"users",id)
        const obj =await getDoc(docRef)
        getPosts(obj.data().userId)
        setUser({...obj.data(),id:obj.id})
    }

    useEffect(()=>{
        getUser()
    },[])
    return<div>
        <h1>Account1</h1>
        {
            
            !user
            ?
            <p>Loading ...please wait</p>
            :
            <div className="grid">
                <div>
                    <img
                    className="profile-picture"
                    src={user.profilePicture||defaultPic}
                    />
                    <h3>{user.name} {user.surname}</h3>
                    <PostList posts={posts}/>

                </div>

            </div>
        }
    </div>
}
export default Account