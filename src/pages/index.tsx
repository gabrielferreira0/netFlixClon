import React, { useEffect, useState } from 'react';
import { GetStaticProps } from "next";
import { api } from '../services/api'
import MovieList from '../components/MovieRow';
import Tmdb from './Tmdb';
import FeaturedMovie from '../components/FeaturedMovie';
import Header from '../components/Header';

type Items = {
  name: { name: String };
  backdrop_path: { backdrop_path: String };
  original_name: { original_name: String };
  overView: { overView: String };
  first_air_date: String;
  popularity: Number;
  id: number;
  poster_path: String;
}

type Movies = {
  slug: String;
  title: String;
  items: {
    results: Items[];
  };
}


type propsHome = {
  result: Movies[];
}


export default function Home(props: propsHome) {
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);


  useEffect(() => {
    const loadAll = async () => {
      let originals = props.result.filter(i => i.slug === 'originals');
      let randomChose = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChose];

      let chosenInfo = Tmdb.getMovieInfo(chosen.id, 'tv')
      chosenInfo.then(result => {
        setFeaturedData(result);
      })
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollPage = () => {
      if (window.screenY > 10) {
        setBlackHeader(false);
      } else {
        setBlackHeader(true);
      }
    }
    window.addEventListener('scroll', scrollPage)
    return () => {
      window.removeEventListener('scroll', scrollPage);
    }
  }, [])
  return (


    <div className="page">

      <Header color={blackHeader} />
      {featuredData &&
        <FeaturedMovie items={featuredData} />
      }

      <section className="lists">
        {props.result.map((item, key) => (
          <div key={key}>
            <MovieList title={item.title} items={item.items} />
          </div>
        ))}
      </section>
      <footer>
        Desenvolvido por  <strong>github.com/gabrielferreira0</strong>
      </footer>
    </div>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const API_KEY = '530778534ba5c806ad8938e7943e7f46';
  const API_BASE = 'https://api.themoviedb.org/3';

  const basicFecth = async (endPoint) => {
    const { data } = await api(`${endPoint}`)
    return data;
  }

  getMovieInfo: async (movieId, type) => {
    let info = {};
    if (movieId) {
      switch (type) {
        case 'movie':
          info = await basicFecth(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
          break;
        case 'tv':
          info = await basicFecth(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
          break;
        default:
          info = null;
          break;
      }
    }

    return info;
  }


  return {
    props: {
      result: [{
        slug: 'originals',
        title: "Originais da Netflix",
        items: await basicFecth(`/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'trending',
        title: "Recomendados para você",
        items: await basicFecth(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'toprated',
        title: "Em Alta",
        items: await basicFecth(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'action',
        title: "Ação",
        items: await basicFecth(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'comedy',
        title: "Comédia",
        items: await basicFecth(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'horror',
        title: "Terror",
        items: await basicFecth(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'romance',
        title: "Romance",
        items: await basicFecth(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
      },
      {
        slug: 'documentary',
        title: "Documentários",
        items: await basicFecth(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
      },
      ]
    },
    revalidate: 60 * 60 * 2
  }



}

