import { useState } from 'react'
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
  const shopItems = useShopItem(shopItemsId.data)
  const filterFields = useFilterFields()
  const handleQtyChange = (event) => {
    setItemsQty(parseInt(event.target.value))
  }

  return (
    <>
        {shopItemsId.loading ? <div>Загрузка базы</div> : shopItems.loading ? <div>Загрузка украшений</div> :
            <div>
              <div style={{display: "flex"}} className={style.toolBar}>
                Фильтр по полям
                {filterFields ? filterFields.map((field,index) => {
                  return(
                      <FilterItem key={index} item={field}></FilterItem>
                  )
                }) : <div> Нету полей для фильтра</div>}
              </div>
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
