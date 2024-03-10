import {useEffect, useRef, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import style from './App.module.scss'
import ShopItem from "./components/ShopItem/ShopItem";
import useShopIds from "./hooks/useShopIds.js";
import useShopItem from "./hooks/useShopItem.js";
import useFilterFields from "./hooks/useFilterFields.js";
import {FilterItem} from "./components/filterItem/FilterItem";
function App() {
  const [itemsQty, setItemsQty] = useState(50)
  const shopItemsId = useShopIds(itemsQty)
  const [shopItems, setShopItems] = useShopItem(shopItemsId.data)
  const filterFields = useFilterFields()
  const filter = useRef({})

  const changeFilter = (chosenItem, filterField) => {
    console.log('comparison', chosenItem, filter.current.filterField)
    if ([filterField] in filter.current) {
      if (filter.current.filterField !== chosenItem) {
        if (chosenItem == '') {
          const updatedFilter = {...filter.current}
          delete updatedFilter[filterField]
          console.log('want to delete')
          filter.current = updatedFilter
        } else {
          filter.current[filterField] = chosenItem;
          console.log('sas')
        }

      }
    } else {
      console.log('sus')
      filter.current = {...filter.current, [filterField]: chosenItem}
    }
    console.log(filter.current)
  }
  const handleQtyChange = (event) => {
    setItemsQty(parseInt(event.target.value))
  }
  return (
    <>
      <div style={{display: "flex", gap: '10px'}} className={style.toolBar}>
        {filterFields ? filterFields.map((field,index) => {
          return(
              <FilterItem key={index} item={field} chooseFilterItem={changeFilter}></FilterItem>
          )
        }) : <div> Нету полей для фильтра</div>}
      </div>
        {shopItemsId.loading ? <div>Загрузка базы</div> : shopItems.loading ? <div>Загрузка украшений</div> :
            <div>
              <div className={style.body}>
                {shopItems.data.map((item,index) => {
                  return <ShopItem key={index} item={item}/>
                })}
              </div>
            </div>
}
    </>
  )
}

export default App
