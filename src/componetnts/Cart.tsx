import styles from "./Content.module.css";
export const Cart: React.FC = () => {
    return (
        <div className={styles.cart}>
            <div className={styles["cart-text"]}>
                <span className={styles["cart-title"]}>Корзина</span>
                <span className={styles["cart-value"]}>2 астероида</span>
            </div>
            <button className={styles["cart-btn"]}>Отправить</button>
        </div>
    );
};
