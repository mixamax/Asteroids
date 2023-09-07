import styles from "./Header.module.css";

export const Header: React.FC = () => {
    return (
        <div className={styles["header-container"]}>
            <span className={styles["header-logo"]}>Armageddon 2023</span>
            <span className={styles["header-text"]}>
                ООО “Команда им. Б. Уиллиса”.{"\n"}Взрываем астероиды с 1998
                года.
            </span>
        </div>
    );
};
