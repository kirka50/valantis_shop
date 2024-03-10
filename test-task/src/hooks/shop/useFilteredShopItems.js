import {useEffect, useState} from "react";
import useShopItem from "./useShopItem.js";
import fetchApi from "../../script/fetchApi.js";


export default function useFilteredShopItems(itemsIds, filteredIds){
    const MAX_RETRIES = 3
    const [data, setData] = useState([
        {
            brand: '',
            price: 0,
            product:''
        }
    ])
    const [error, setError] = useState({massage: ''})
    const [loading, setLoading] = useState(false)
    const [retries, setRetries] = useState(0)
    useEffect(() => {
        const fetchData = (ids) => {
            setLoading(true);
            fetchApi('get_items', { ids })
                .then(response => {
                    setData(response.data.result);
                    setRetries(0); // Сброс счетчика попыток при успешном запросе
                })
                .catch(err => {
                    setError(err.message);
                    if (retries < MAX_RETRIES) {
                        setRetries(retries + 1); // Увеличиваем счетчик попыток
                        fetchData(ids); // Повторяем запрос
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        if (filteredIds.length > 0) {
            fetchData(filteredIds);
        } else if (itemsIds.length > 0) {
            fetchData(itemsIds);
        }
    }, [itemsIds, filteredIds, retries]);
    return {data, error, loading}
}


