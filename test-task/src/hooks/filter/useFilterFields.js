import {useEffect, useState} from "react";
import fetchApi from "../../script/fetchApi.js";

export default function useFilterFields() {
    const MAX_RETRIES = 3
    const [retries, setRetries] = useState(0)
    const [filterFields, setFilterFields] = useState()
    const getFields = async () => {
        return await fetchApi(
            'get_fields',
        )
    }
    useEffect(() => {
        const fetchFields = () => {
            getFields()
                .then((res) => {
                    setFilterFields(res.data.result)
                }).catch((err) => {
                console.log(err)
                if (retries < MAX_RETRIES) {
                    setRetries(retries + 1)
                    fetchFields()
                }
            })
        }
        fetchFields()
    }, [retries]);
    return filterFields
}