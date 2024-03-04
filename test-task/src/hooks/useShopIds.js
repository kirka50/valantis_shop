
import {useEffect, useState} from "react";
import createMD5 from "../script/createMD5.js";
import removeDoubles from "../script/removeDoubles.js";
import fetchApi from "../script/fetchApi.js";

export default function useShopIds(itemsQty) {
    const [data, setData] = useState([])
    const [error, setError] = useState([{}])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetchApi(
            'get_ids',
            {
                limit: itemsQty
            }
        ).then((res) => {
            setData(removeDoubles(res.data.result))
        }).catch((err) => {
            setError(err.massage)
        }).finally(() => {
            setLoading(false)
        })
        //console.log('Вызов медота shop id')
    },[itemsQty])
    return {data,error,loading}
}
