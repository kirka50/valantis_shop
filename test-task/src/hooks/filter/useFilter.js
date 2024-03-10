import {useEffect, useState} from "react";
import fetchApi from "../../script/fetchApi.js";

export default function useFilter(filterParams) {
    const MAX_RETRIES = 3
    const [retries, setRetries] = useState(0)
    const [filteredIds, setFilteredIds] = useState([])
    const getFilteredIds = async () => {
        return await fetchApi(
            'filter',
            filterParams
        )
    }
    console.log(filterParams)
    useEffect(() => {
        const fetchFilter = () => {
            if (Object.keys(filterParams).length > 0) {
                getFilteredIds()
                    .then((res) => {
                        console.log(res)
                        setFilteredIds(res.data.result)
                    }).catch((err) => {
                    console.log(err)
                    if (retries < MAX_RETRIES) {
                        setRetries(retries + 1)
                        fetchFilter()
                    }
                })
            } else {
                setFilteredIds([])
            }
        }
        fetchFilter()
    }, [filterParams, retries]);

    return filteredIds
}