import Axios from "./Axios"
import SummaryApi from "../common/SummaryApi"

const fetchUserDetails = async()=>{
    try {;
        // const token = localStorage.getItem("accessToken")
        const response = await Axios({
            ...SummaryApi.userDetails,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default fetchUserDetails