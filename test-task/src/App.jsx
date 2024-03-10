import {useEffect, useRef, useState} from 'react'
import style from './App.module.scss'
import ShopItem from "./components/ShopItem/ShopItem";
import useShopIds from "./hooks/shop/useShopIds.js";
import useFilterFields from "./hooks/filter/useFilterFields.js";
import {FilterItem} from "./components/filterItem/FilterItem";
import useFilteredShopItems from "./hooks/shop/useFilteredShopItems.js";
import useFilter from "./hooks/filter/useFilter.js";
import Paginator from "./components/Paginator/Paginator";
function App() {
  const itemsQty = 50
  const filterFields = useFilterFields()
  const [filter,setFilter] = useState({})
  const [activePage, setActivePage] = useState(1)
  const shopItemsId = useShopIds(activePage)
  const filteredIds = useFilter(filter)
  const shopItems = useFilteredShopItems(shopItemsId.data, filteredIds, activePage)


  const changeFilter = (chosenItem, filterField) => {
    if ([filterField] in filter) {
      if (filter.filterField !== chosenItem) {
        if (chosenItem == '') {
          const updatedFilter = {...filter}
          console.log('updated filter', updatedFilter)
          delete updatedFilter[filterField]
          setFilter(updatedFilter)
        } else {
          setFilter({...filter, [filterField]: chosenItem})
          console.log('setted filter', filter)
        }
      }
    } else {
      setFilter({...filter, [filterField]: chosenItem})
      console.log('sda filter', filter)
    }
    console.log(filter)
  }

  const nextPage = () => {
    setActivePage(activePage + 1)
  }
  const pervPage = () => {
    if (activePage - 1 >= 1) {
      setActivePage(activePage - 1)
    }
  }

  const isFilterActive = () => {
    if (Object.keys(filter) == 0) {
      return true
    }
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
            {isFilterActive() ? <Paginator selectedPage={activePage} pervPage={pervPage} nextPage={nextPage}/> : '' }
            {shopItems.data.map((item,index) => {
              return <ShopItem key={index} item={item}/>
            })}
          </div>
        </div>}
    </>
  )
}

export default App
