import {useEffect, useState} from "react";
import fetchApi from "../script/fetchApi.js";

export default function useFilterFields() {
    const [filterFields, setFilterFields] = useState()
    const getFields = async () => {
        return await fetchApi(
            'get_fields',
        )
    }
    useEffect(() => {
        getFields()
            .then((res) => {
            setFilterFields(res.data.result)
        }).catch((err) => {
            console.log(err)
            useFilterFields()
        })
    }, []);
    return filterFields
}