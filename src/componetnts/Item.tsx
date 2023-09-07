import styles from "./Item.module.css";
import { ReactComponent as DistArrow } from "./distArrow.svg";

function declination(num: number): string {
    if (num % 10 === 1) {
        return "лунная орбита";
    }
    if (num > 10 && num < 15) {
        return "лунных орбит";
    }
    if (num % 10 > 1 && num % 10 < 5) {
        return "лунные орбиты";
    }

    return "лунных орбит";
}

type TProps = {
    approach: string;
    distanceKm: string;
    distanceLunar: string;
    measureKM: boolean;
    name: string;
    diameter: number;
    hazard: boolean;
    // isImortant?: boolean;
    // images?: string[];
    // tags?: TTags[];
};

export const Item: React.FC<TProps> = ({
    approach,
    distanceKm,
    distanceLunar,
    measureKM,
    name,
    diameter,
    hazard,
}) => {
    return (
        <div className={styles["item-container"]}>
            <div className={styles["item-date"]}>{approach}</div>
            <div className={styles["item-info"]}>
                <div className={styles["item-distance"]}>
                    {measureKM && (
                        <span className={styles["item-distance_text"]}>
                            {Number(
                                Number(distanceKm).toFixed()
                            ).toLocaleString("ru-RU")}{" "}
                            км
                        </span>
                    )}
                    {!measureKM && (
                        <span className={styles["item-distance_text"]}>
                            {Number(
                                Number(distanceLunar).toFixed()
                            ).toLocaleString("ru-RU")}{" "}
                            {declination(
                                Number(Number(distanceLunar).toFixed())
                            )}
                        </span>
                    )}
                    <DistArrow />
                </div>
                <img
                    className={styles["item-asterimage"]}
                    src="images/aster.png"
                    alt="астероид"
                />
                <div className={styles["item-name-diametr"]}>
                    <span className={styles["item-name"]}>
                        {name.slice(1, -1)}
                    </span>
                    <span className={styles["item-diametr"]}>
                        Ø {Math.round(diameter)} м
                    </span>
                </div>
            </div>
            <div className={styles["item-orderbtn-danger"]}>
                <button className={styles["item-orderbtn"]}>ЗАКАЗАТЬ</button>
                <div className={styles["item-danger"]}>
                    {hazard ? "⚠️ Опасен " : "Не опасен"}
                </div>
            </div>
        </div>
    );
};
