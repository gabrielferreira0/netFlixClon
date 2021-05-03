const API_BASE = 'https://api.themoviedb.org/3';
const API_KEY = '530778534ba5c806ad8938e7943e7f46';


const basicFecth = async (endPoint) => {

    const req = (await fetch(`${API_BASE}${endPoint}`))
    const result = await req.json();
    return result;
}

export default {
    getMovieInfo: async (movieId, type) => {
        let info = {};
        if (movieId) {
            switch (type) {
                case 'movei':
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
}