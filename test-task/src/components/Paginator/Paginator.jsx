import style from './paginator.module.scss'

export default function Paginator({itemsQty, totalShopItems, selectedPage, pervPage, nextPage}) {
    const maxPage = Math.ceil(totalShopItems / itemsQty)


    return <div className={style.body}>
        <button className={ selectedPage === 1 ? style.buttonDisabled : ''} onClick={pervPage}>Пред страница</button>
        <ul className={style.pagination}>
            <li>
                <a>
                    {selectedPage}
                </a>
            </li>
        </ul>
        <button className={ selectedPage === maxPage ? style.buttonDisabled : ''} onClick={nextPage}> След страница</button>
    </div>
}