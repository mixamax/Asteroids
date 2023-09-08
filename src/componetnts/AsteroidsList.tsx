import { useContext, useState } from "react";
import styles from "./Content.module.css";
import { Item } from "./Item";
import { DATAContext } from "./App";
import RingLoader from "react-spinners/RingLoader";
import { CSSProperties } from "react";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#f86600",
};

type PropTypes = {
    isLoading: boolean;
};

export const AsteroidsList: React.FC<PropTypes> = ({ isLoading }) => {
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
                <div style={{ width: "250px" }}>
                    <RingLoader
                        color="#f86600"
                        loading={isLoading}
                        cssOverride={override}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>

                {!isLoading &&
                    DATA.map((elem) => (
                        <Item
                            key={elem.id}
                            approach={
                                elem.close_approach_data[0]
                                    .close_approach_date_full
                            }
                            distanceKm={
                                elem.close_approach_data[0].miss_distance
                                    .kilometers
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
