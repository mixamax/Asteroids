import { useContext, useState } from "react";
import styles from "./Content.module.css";
import { Item } from "./Item";
import { DATAContext } from "./App";

export const AsteroidsList: React.FC = () => {
    const DATA = useContext(DATAContext);
    console.log(DATA);
    const [measure, setMeasure] = useState(true);
    const setMeasureHandler = () => {
        setMeasure((measure) => !measure);
    };

    return (
        <div className={styles["list-wrapper"]}>
            <div className={styles["asteroids-list"]}>
                <div className={styles["list-header"]}>
                    <h1 className={styles["list-title"]}>
                        Ближайшие подлеты астероидов
                    </h1>
                    <div className={styles["measure-unit"]}>
                        <span
                            className={`${styles["unit"]} ${
                                measure && styles["unit-active"]
                            }`}
                            onClick={setMeasureHandler}
                        >
                            в километрах
                        </span>
                        <span className={styles["unit"]}>|</span>
                        <span
                            className={`${styles["unit"]} ${
                                !measure && styles["unit-active"]
                            }`}
                            onClick={setMeasureHandler}
                        >
                            в лунных орбитах
                        </span>
                    </div>
                </div>
                {DATA.map((elem) => (
                    <Item
                        key={elem.id}
                        approach={
                            elem.close_approach_data[0].close_approach_date_full
                        }
                        distanceKm={
                            elem.close_approach_data[0].miss_distance.kilometers
                        }
                        distanceLunar={
                            elem.close_approach_data[0].miss_distance.lunar
                        }
                        measureKM={measure}
                        name={elem.name}
                        diameter={
                            elem.estimated_diameter.meters
                                .estimated_diameter_max
                        }
                        hazard={elem.is_potentially_hazardous_asteroid}
                    />
                ))}
            </div>
        </div>
    );
};
