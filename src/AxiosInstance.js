import axios from "axios";


const AxiosInstance = axios.create({
    baseURL:"http://api.paathshaala.me/api/"
 })

export default AxiosInstance;