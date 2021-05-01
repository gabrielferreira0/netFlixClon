import React, { useEffect, useState } from 'react';
import { GetStaticProps } from "next";
import { api } from '../services/api'

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


export default function Home(props: Movies) {
  console.log(props.items.results[0].name)
  return (
    <>
      <h1>{(props.items.results[0].name)}</h1>
      <img src={`https://image.tmdb.org/t/p/w300${props.items.results[0].backdrop_path}`} alt="" />
    </>
  )
}

const API_KEY = '530778534ba5c806ad8938e7943e7f46';
const API_BASE = 'https://api.themoviedb.org/3';


export const getStaticProps: GetStaticProps = async () => {

  const basicFecth = async (endPoint) => {
    const { data } = await api(`${endPoint}`)
    return data;
  }

  return {
    props: {
      slug: 'originals',
      title: "Originais Netflix",
      items: await basicFecth(`/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`)
    },
    revalidate: 60 * 60 * 2
  }

}