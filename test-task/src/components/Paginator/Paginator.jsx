import style from './paginator.module.scss'

export default function Paginator({selectedPage, pervPage, nextPage}) {

    return <div className={style.body}>
        <button onClick={pervPage}>Пред страница</button>
        <ul className={style.pagination}>
            <li>
                <a>
                    {selectedPage}
                </a>
            </li>
        </ul>
        <button onClick={nextPage}> След страница</button>
    </div>
}