import { useEffect } from "react"
import { Link } from "react-router-dom"
const SearchItem =({person})=>{

     const defPicture = "https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png"
    return  <div className="search-result-item">
        <h1>Search Item</h1>
        <img src={person.profilePicture?person.profilePicture:defPicture}/>
        <h3>{person.name} {person.surname}</h3>
        <Link to={"/profile/user/account/"+person.id}>See Profile</Link>
    </div>
}
export default SearchItem