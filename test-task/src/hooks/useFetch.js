import {useEffect, useState} from "react";
import createMD5 from "../script/createMD5.js";
import axios from "axios";

export function useFetch({requestDeps, action, params}) {
    const [request, setRequest] = useState([
        {
            data: null,
            isLoading: false,
            isError: false
        }
    ])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setRequest((prev) => ({...prev, isLoading: true}));
                const response = await axios.post(
                        'https://api.valantis.store:41000/',
                        {
                            action: action,
                            params: params
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                "X-Auth": createMD5.toString()
                            }
                        },
                    );
                setRequest((prev) => ({
                    ...prev,
                    data: response.data,
                    isLoading: false,
                }))
            } catch (error) {
                console.log('Ошибка запроса', error);
                setRequest((prev) => ({
                    ...prev,
                    isLoading: false,
                    isError: true
                }))
            }
        }
       void fetchPosts();
    }, [requestDeps]);

    return {
        data: request.data,
    }
}