import axios from "axios";
import createMD5 from "./createMD5.js";

export default async function fetchApi(action, params = null) {
    return await axios.post('https://api.valantis.store:41000/', {
        action: action,
        ...(params? {params: params} : {})
    },
        {
            headers: {
                'Content-Type': 'application/json',
                "X-Auth": createMD5.toString()
            }
        })
}