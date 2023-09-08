import { AsteroidsList } from "./AsteroidsList";
import { Cart } from "./Cart";
import styles from "./Content.module.css";

type PropTypes = {
    isMobile: boolean;
    isLoading: boolean;
};
export const Content: React.FC<PropTypes> = ({ isMobile, isLoading }) => {
    return (
        <div className={styles.content}>
            <img
                className={styles["img-zemlia"]}
                src="images/planeta-zemlia-kosmos-1674992560-x-16001.png"
                alt="планета Земля"
            ></img>
            <AsteroidsList isLoading={isLoading} />

            {!isMobile && <Cart />}
        </div>
    );
};
