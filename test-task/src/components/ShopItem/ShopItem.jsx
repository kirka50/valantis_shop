import styles from './shopItem.module.scss'
function ShopItem({item = {
    product: 'Продукт',
    price: 10,
    brand: 'Какой то брэнд'
}}) {

    if(item.id) return(
        <>
            <div className={styles.shopItem}>
                <h1>
                    {item.product}
                </h1>
                <div>
                    <p>
                        Стоит {item.price} денежных единиц
                    </p>
                    <p>
                        {!item.brand ? 'Бренд отсутствует': item.brand}
                        {item.brand}
                    </p>
                </div>
            </div>
        </>

    )

}

export default ShopItem;