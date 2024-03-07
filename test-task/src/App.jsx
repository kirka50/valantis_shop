import {useEffect, useState} from 'react'
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
  const [filter, setFilter] = useState({})

  const changeFilter = (event, filterField) => {
    if(filterField in filter) {
      if (filter.filterField !== event.target.value) {
        setFilter(prevState =>( {
          ...prevState,
          filter.filterField: event.target.value
        }))
      }
    }

  }
  const handleQtyChange = (event) => {
    setItemsQty(parseInt(event.target.value))
  }
  return (
    <>
      <div style={{display: "flex", gap: '10px'}} className={style.toolBar}>
        {filterFields ? filterFields.map((field,index) => {
          return(
              <FilterItem key={index} item={field}></FilterItem>
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
