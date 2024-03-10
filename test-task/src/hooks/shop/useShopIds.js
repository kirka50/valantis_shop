
import {useEffect, useState} from "react";
import createMD5 from "../../script/createMD5.js";
import removeDoubles from "../../script/removeDoubles.js";
import fetchApi from "../../script/fetchApi.js";

export default function useShopIds(page) {
    page = page - 1
    const MAX_RETRIES = 3
    const [retries, setRetries] = useState(0)
    const [data, setData] = useState([])
    const [error, setError] = useState([{}])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchId = () => {
            setLoading(true)
            fetchApi(
                'get_ids',
                {
                    limit: 50,
                    offset: page * 50
                }
            ).then((res) => {
                setData(removeDoubles(res.data.result))
            }).catch((err) => {
                setError(err.massage)
                if (retries < MAX_RETRIES) {
                    setRetries(retries + 1)
                    fetchId()
                }
            }).finally(() => {
                setLoading(false)
            })
        }
        fetchId()
    },[page,retries])
    return {data,error,loading}
}
