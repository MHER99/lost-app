import AddPost from "../AddPost/index"
import PostList from "../PostList"
import { getDocs,collection,query,where } from "firebase/firestore"
import { useEffect,useState } from "react"
import { useOutletContext, } from "react-router-dom"
import { db } from "../../firebase-config"
import { async } from "@firebase/util"
import { Button } from "@mui/material"
import shadows from "@mui/material/styles/shadows"
const Gallery=()=>{
    const postList = collection(db,"posts")
    const {user} = useOutletContext()
    const [posts,setPosts]=useState([])
    const [showWindow,setShowWindow]=useState(false)
    const getPosts = async()=>{
        const items = await getDocs(query(postList,where("userId","==",user)))
        setPosts(items.docs.map(elm=>({
            ...elm.data(),
            id:elm.id
        })))
        //console.log("galery line18")

    }
    useEffect(()=>{
        getPosts()
    },[])
    return<div className="gallery">
        <Button onClick={()=>setShowWindow(!showWindow)}>
            {showWindow ? "close":"open"}
        </Button>
        {showWindow&&<AddPost/>}
        <PostList posts={posts}/>
        

    </div>
}
export default Gallery