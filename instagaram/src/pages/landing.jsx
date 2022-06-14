import { useSelector } from "react-redux"
function Landing(){
    const global = useSelector((state)=>state)
    const admin = global.admin
    return (
        <div>
            {admin.username}
        </div>
    )
}

export default Landing