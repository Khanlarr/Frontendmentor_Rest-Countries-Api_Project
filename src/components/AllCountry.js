import React from 'react';
import '../App.css'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
let url = "https://restcountries.com/v3.1/all";
export default function AllCountry() {
    const [data, setData] = useState([]);
    const [urlset, setUrl] = useState(url);
    const [search, setSearch] = useState();
    const [pedding, setPedding] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            fetch(urlset)
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Not Found...")
                    }
                    return res.json();
                })
                .then(datas => {
                    setData(datas)
                    console.log(datas)
                    console.log(datas.area)
                    setPedding(false)
                    setError(null)
                })
                .catch(err => {
                    setPedding(false)
                    setError(err.message)
                })
        }, 1000);
    }, [urlset]);
    const getRegion = (type) => {
        if (type == "All") { url = "https://restcountries.com/v3.1/all" }
        if (type == "Africa") { url = "https://restcountries.com/v3.1/region/africa" }
        if (type == "America") { url = "https://restcountries.com/v3.1/region/america" }
        if (type == "Asia") { url = "https://restcountries.com/v3.1/region/asia" }
        if (type == "Europe") { url = "https://restcountries.com/v3.1/region/europe" }
        if (type == "Oceania") { url = "https://restcountries.com/v3.1/region/oceania" }
        setUrl(url)
    }
    const searchCountry = () => {
        if (search) {
            url = "https://restcountries.com/v3.1/name/" + search;
            setUrl(url)
        }
        else {
            url = "https://restcountries.com/v3.1/all";
            setUrl(url)
        }
    }
    return (
        <div>
            <div className='form'>
                <form>
                    <div className='input'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder='Search for a country...'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            onKeyUp={searchCountry} />
                    </div>
                    <div className='select'>
                        <select name="country" id="country" onClick={(e) => getRegion(e.target.value)}>
                            <option value="" disabled selected hidden>Filter by Region</option>
                            <option value="All">All</option>
                            <option value="Africa">Africa</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Europe">Europe</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                </form>
            </div>
            {pedding && <div className='loading'>Loading...</div>}
            {error && <div className='loading'>{error}</div>}
            <div className='container'>
                {error === null && (data.map((dt) => {
                    return (   
                            <div className='countries'> 
                            <Link to={`/lists/${dt.capital}`} className="link">
                                <div className='country_img'>
                                    <img src={dt.flags.png} alt="" />
                                </div>
                                <div className='country_info'>
                                    <h3>{dt.name.common}</h3>
                                    <p><strong>Population: </strong>{dt.population}</p>
                                    <p><strong>Region: </strong>{dt.region}</p>
                                    <p><strong>Capital: </strong>{dt.capital}</p>
                                </div> </Link>
                            </div>
                       
                    )
                }))
                }
            </div>
        </div>
    );
}
