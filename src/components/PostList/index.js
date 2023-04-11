import { ImageList,ImageListItem,ImageListItemBar } from "@mui/material"
import { paste } from "@testing-library/user-event/dist/paste"
import { useNavigate } from "react-router-dom"
const PostList = ({posts})=>{
    const navigate = useNavigate()
    const postDetalis =(post)=>{
        if(window.confirm("would you like to switch to the post detalispage??")){
            navigate("/profile/post/"+post.id)
        }
    }
    return <div>
        
        <ImageList sx={{width:800}} cols={3} variant="masonry">
        {
            posts.map(post=>{
                return(
                    <ImageListItem key={post.id}>
                        <img src={post.photo} onClick={()=>postDetalis(post)}/>
                        <ImageListItemBar
                        title={post.title}
                        subtitle={post.likes.length+"linkes"}
                        />

                    </ImageListItem>

                )
            })
        }
        </ImageList>


        
    </div>
}
export default PostList