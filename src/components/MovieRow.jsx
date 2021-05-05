import React, { useState } from 'react';
import styles from './styles.module.scss';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';


export default function List({ title, items }) {
    const [scrollX, setcrollX] = useState(-400)

    const moveLeft = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0
        }
        setcrollX(x)
    }
    const moveRight = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if (window.innerWidth - listW > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setcrollX(x)
    }

    return (
        <>
            <div className={styles.movieRow}>
                <h2>{title}</h2>

                <div onClick={moveLeft} className={styles.movieRowLeft}>
                    <NavigateBeforeIcon style={{ fontSize: 50 }} />
                </div>

                <div onClick={moveRight} className={styles.movieRowRight}>
                    <NavigateNextIcon style={{ fontSize: 50 }} />
                </div>
                <div className={styles.movieRowlistArea}>
                    <div className={styles.movieRowList} style={{
                        marginLeft: scrollX,
                        width: items.results.length * 150
                    }}>

                        {items.results.length > 0 && items.results.map((items, key) => (

                            <div key={key} className={styles.movieRowItem}>
                                <img key={key} src={`https://image.tmdb.org/t/p/w500${items.poster_path}`} alt={items.original_title} />
                            </div>

                        ))
                        }
                    </div>

                </div>
            </div>
        </>
    )
}