import {useEffect, useState} from "react";
import fetchApi from "../script/fetchApi.js";

export default function useFilterItems(fieldItem) {
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
            getFields()
                .then((res) => {
                    setFieldItems(res.data.result)
                }).catch((err) => {
                console.log(err)
                useFilterItems(fieldItem)
            })
    }, []);

    return [fieldItems,setFieldItems]
}