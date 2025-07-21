import Swal from 'sweetalert2';
import React, {useEffect,useState} from 'react';
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [movieList, setMovieList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(()=> setDebouncedSearchTerm(searchTerm), 500,[searchTerm]);

    const fetchMovies = async (query = '') => {

        setIsLoading(true);
        setErrorMessage('');

        try{
            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok){
                throw new Error('Failed to fetch Movies');
            }

            const data = await response.json();

            if (data.Response === 'false'){
                setErrorMessage(data.Error || 'Failed to fetch Movies');
                setMovieList([]);
                return;

            }

            setMovieList(data.results || [] );

            if(query && data.results.length > 0){
                await updateSearchCount(query,data.results[0]);
            }

        }
        catch (error) {
            console.error(`Error fetching movies : ${error}`);

            setErrorMessage(
            <div>
                <style>
                {`
                    @keyframes zoomInOut {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.5); }
                    }

                    .zoom-animation {
                    display: inline-block;
                    animation: zoomInOut 1s infinite;
                    }
                `}
                </style>

                <p style={{ color: 'red', fontWeight: 'bold', fontSize: '25px' }}>
                ❗ Movies may not load due to DNS settings.
                </p>
                <br />
                <p style={{ color: '#00FF00', fontSize: '18px' }}>
                <span className="zoom-animation" style={{fontSize: '40px' }}>&#x2714;</span> Recommended Fix :<br /><br />
                Change DNS to:<br />
                Preferred : <strong>8.8.8.8</strong><br />
                Alternate : <strong>8.8.4.4</strong><br /><br />
                Or use Cloudflare DNS :<br />
                <strong>1.1.1.1 / 1.0.0.1</strong>
                </p>
                <br />
                <p style={{ color: 'red', fontWeight: 'bold', fontSize: '25px' }}>Still not working ?</p>
                <p>
                • Try mobile hotspot<br />
                • Use VPN<br /><br /></p>
                <p style={{fontSize: '18px' }}>
                Then Reopen:{" "}
                <a
                    href="https://popcine-app.netlify.app"
                    style={{ color: '#00FF00', fontWeight: 'bold', fontSize: '25px' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    https://popcine-app.netlify.app
                </a>
                </p>
            </div>
            );
        }

        finally {
            setIsLoading(false)
        }
    }

    const loadTrendingMovies = async (query = '') => {
        try{
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);

        }catch(error){
            console.error(`Error fetching trending movies : ${error}`);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);


    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    })

    useEffect(() => {
        Swal.fire({
        title: "🎬 Popcine Welcomes You!",
        html: `
            <p><strong style="color:red;">❗ Movies may not load due to DNS issues.</strong></p>
            <p>Change DNS to <span style="color:green;font-size:23px;">( 8.8.8.8  &  8.8.4.4 )</span> or <span style="color:green;font-size:23px;">( 1.1.1.1  &  1.0.0.1 )</span>.</p>
            <p>Reopen: <a href="https://popcine-app.netlify.app" target="_blank">Popcine Website</a></p>
        `,
        icon: 'info'
        });
    }, []);


  return (
      <main>
        <div className="pattern"/>

        <div className="wrapper">
          <header>

              <img src = './hero.png' alt='Hero Banner'/>
            <h1>Find <span className="text-gradient">Movies</span> you'll Enjoy Without the Hassle</h1>

              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          </header>

            {trendingMovies.length > 0 && (
                <section className="trending">
                    <h2>Trending Movies</h2>

                    <ul>
                        {trendingMovies.map((movie,index) => (
                            <li key = {movie.$id}>
                                <p>{index+1}</p>
                                <img src={movie.poster_url} alt = {movie.title} />
                            </li>
                        ))}
                    </ul>

                </section>
            )}

            <section className="all-movies">
                <h2>All Movies</h2>

                {isLoading ? (
                    <Spinner/>
                ) : errorMessage ? (
                    <p className="text-red-500">{errorMessage}</p>
                ) : (
                    <ul>
                        {movieList.map((movie)=>(
                            <MovieCard key={movie.id} movie={movie}/>
                        ))}
                    </ul>
                )}
            </section>
        </div>
      </main>
  );
}

export default App;