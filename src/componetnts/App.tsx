// https://mixamax/github.io/asteroids
import React from "react";
import styles from "./App.module.css";
import { Header } from "./Header";
import { Content } from "./Content";
import { useEffect, useState, createContext, useContext } from "react";
import { Cart } from "./Cart";
import { query } from "./Query";

type Asteroid = {
    absolute_magnitude_h: number;
    close_approach_data: Close_approach[];
    estimated_diameter: meters;
    id: string;
    is_potentially_hazardous_asteroid: boolean;
    is_sentry_object: boolean;
    links: object;
    name: string;
    nasa_jpl_url: string;
    neo_reference_id: string;
};
type meters = {
    meters: estimated_diameter_max;
};
type estimated_diameter_max = {
    estimated_diameter_max: number;
};
type Close_approach = {
    close_approach_date_full: string;
    miss_distance: Distance;
};
type Distance = { kilometers: string; lunar: string };
type DATAres = {
    element_count: number;
    links: object;
    near_earth_objects: object;
};

export const DATAContext = createContext<Asteroid[]>([]);

const App: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [error, setError] = useState("err");
    const arr: Asteroid[] = [];
    const [nearObjects, setNearObjects] = useState(arr);

    const isMobileHandler = (e: any) => {
        const width = e.target.innerWidth;
        if (width < 510) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        const width = window.screen.width;
        if (width < 510) {
            setIsMobile(true);
        }
        window.addEventListener("resize", isMobileHandler);
        return () => {
            window.removeEventListener("resize", isMobileHandler);
        };
    }, []);
    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(query);
                if (!response.ok) {
                    throw new Error("что-то пошло не так...");
                }

                const DATA: DATAres = await response.json();
                const nearObjectsArray = Object.values(
                    DATA.near_earth_objects
                ).flat();
                nearObjectsArray.sort(
                    (a, b) =>
                        new Date(
                            a.close_approach_data[0].close_approach_date_full
                        ).getTime() -
                        new Date(
                            b.close_approach_data[0].close_approach_date_full
                        ).getTime()
                );

                setNearObjects(nearObjectsArray);
            } catch (err: any) {
                setError(err.message);
                console.warn(error);
            }
        })();
    }, []);

    return (
        <DATAContext.Provider value={nearObjects}>
            <div className={styles.App}>
                <div className={styles.mask}>{isMobile && <Cart />}</div>
                <Header />
                <Content isMobile={isMobile} />
            </div>
        </DATAContext.Provider>
    );
};
export default App;
