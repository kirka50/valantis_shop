import {useEffect, useRef, useState} from "react";
import useFilterItems from "../../hooks/useFilterItems.js";

export function FilterItem({item, chooseFilterItem}){
    const isClicked = useRef(false)
    const [chosenItem, setChosenItem] = useState()
    const [fieldItems, setFieldItems] = useFilterItems(item)
    const handleChange = (event) => {
        setChosenItem(event.target.value)
    }

    if(item == 'product') {
        return(
            <>
                Поиск по имени:
                <input/>
            </>)
    }

    return (
        <>  Поиск по {item}
            <select value={chosenItem} onChange={handleChange}>
                <option></option>
                {
                    fieldItems ? fieldItems.map((item,index) => {
                        if(item) { return(
                            <option key={index} value={item}>
                                {item}
                            </option>)}
                    }) : ''
                }
            </select>

        </>
    )
}

