import {useEffect, useState} from "react";
import fetchApi from "../../script/fetchApi.js";

export default function useFilterItems(fieldItem) {
    const MAX_RETRIES = 3
    const [retries, setRetries] = useState(0)
    const [fieldItems, setFieldItems] = useState()

    const getFields = async () => {
        return await fetchApi(
            'get_fields',
            {
                field: fieldItem
            }
        )
    }
    useEffect(() => {
        const fetchItem = () => {
            getFields()
                .then((res) => {
                    setFieldItems(res.data.result)
                }).catch((err) => {
                console.log(err)
                if (retries < MAX_RETRIES) {
                    setRetries(retries + 1)
                    fetchItem()
                }
            })
        }
        fetchItem()
    }, []);

    return [fieldItems,setFieldItems, retries]
}