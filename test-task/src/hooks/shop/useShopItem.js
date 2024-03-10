import {useState, useEffect} from "react";
import fetchApi from "../../script/fetchApi.js";

export default function useShopItem(shopItemsId= []) {
    const [data, setData] = useState([
        {
            brand: '',
            price: 0,
            product:''
        }
    ])
    const [error, setError] = useState({massage: ''})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (shopItemsId.length > 0) {
            setLoading(true)
            fetchApi(
                'get_items',
                {
                    ids: shopItemsId
                }
            ).then(response => {
                setData(response.data.result)
            }).catch(err => {
                setError(err.massage)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [shopItemsId]);
    return {data, error, loading}
}
