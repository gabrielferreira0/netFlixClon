import React from 'react';
import styles from './styles.module.scss';


export default function List({ title, items }) {

    return (
        <>
            <div className={styles.movieRow}>
                <h2>{title}</h2>

                <div className="movieRowList">
                    {items.results.length > 0 && items.results.map((items, key) => (
                        <div key={key} className="movieRowItem">
                            <img key={key} src={`https://image.tmdb.org/t/p/w300${items.poster_path}`} alt={items.original_title} />
                        </div>
                    ))
                    }
                </div>
            </div>
        </>
    )
}