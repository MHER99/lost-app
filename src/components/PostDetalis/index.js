import {collection,getDoc,doc,where,query,updateDoc} from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams,useOutletContext,useNavigate } from "react-router-dom"
import {db} from "../../firebase-config"
import { Button } from "@mui/material"
import { async } from "@firebase/util"
const PostDetalis = ()=>{
    const {id} = useParams()
    const {user} = useOutletContext()
    const [post,setPost]=useState(null)
    const navigate = useNavigate()
    const [didILike,setDidILike]= useState(false)

    const getPostInfo = async (id)=>{   
        const item =doc(db,"posts",id)
        const obj = await getDoc(item)
        // console.log(user)
        if(!obj._document){
            return navigate ("/profile")
        }
        if(obj.data().likes.includes(user)){
            setDidILike(true)
        }
        setPost(obj.data())

    }
    const handleLink = async ()=>{
        //console.log("PostDetalis line_28")
        const currentPost = doc(db,"posts",id)
        let likes =[...post.likes,user]
        await updateDoc(currentPost,{likes})
        setDidILike(true)
        
        setPost({...post,likes:likes})

    }
    const handleUnlink = async ()=>{
        const currentPost = doc(db,"posts",id)
        let temp = [...post.likes]
        temp.splice(post.likes.indexOf(user),1)
        await updateDoc(currentPost,{likes:temp})
        setDidILike(false)
        setPost({...post,likes:[...temp]})

    }
    useEffect(()=>{
        
        getPostInfo(id)

    },[])
    return <div>
        <h1>post Detalis</h1>
        {
                    post && <div className="post">
                    {
                        didILike
                        ?
                        <Button variant="containde" onClick={handleUnlink}>Unlike</Button>
                        :
                        <Button variant="containde" onClick={handleLink}>Like</Button>
                    }
        
                    <h3>{post.title} ({post.likes.length} Likes)</h3>
                    <img src = {post.photo}/>

                </div>

        }
        
    </div>
}
export default PostDetalis