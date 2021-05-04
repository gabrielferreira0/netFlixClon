import React from 'react';
import styles from './styles.module.scss';

export default function Featured({ items }) {



    let firstDate = new Date(items.last_air_date);
    let genres = [];
    for (let i in items.genres) {
        genres.push(items.genres[i].name);
    }

    return (
        <section className={styles.featured} style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${items.backdrop_path})`
        }}>
            <div className={styles.featuredVertical}>
                <div className={styles.featuredHorizontal}>
                    <div className={styles.featuredName}>{items.original_name} </div>
                    <div className={styles.featuredInfo}>
                        <div className={styles.featuredPoints}>{items.vote_average} pontos</div>
                        <div className={styles.featuredYear}>{firstDate.getFullYear()}</div>
                        <div className={styles.featuredSeasons}>{items.number_of_seasons} Temporada{items.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className={styles.featuredDescription}>
                        {items.overview}
                    </div>
                    <div className={styles.featuredButtons}>
                        <a className={styles.watch}> ▶ Assistir</a>
                        <a className={styles.addList}> + Minha Lista</a>
                    </div>
                    <div className={styles.featuredGenres}>
                        <strong>Gêneros:</strong> {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )
}