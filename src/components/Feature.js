import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import '../App.css'
export default function Feature() {
    let history = useNavigate();
    const { capital } = useParams();
    let url = 'https://restcountries.com/v3.1/capital/' + capital;
    const [feature, setFeature] = useState(null);
    const [pedding, setPedding] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        setTimeout(() => {
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Not Found..")
                    }
                    return res.json();
                })
                .then(data => {
                    setFeature(data)
                    console.log(data)
                    setPedding(false)
                    setError(null)
                })
                .catch(err => {
                    setPedding(false)
                    setError(err.message)
                })
        }, 1000);
    }, [url])
    function handleClick(e) {
        history("/");
        e.preventDefault();
    }
    return (
        <div>
            {error && <div className='loading'>{error}</div>}
            {pedding && <div className='loading'>Loading...</div>}
            {feature && (
                <div className='features'>
                    <button onClick={handleClick}>Back</button>
                    <div className='feature'>
                        <div className='img'><img src={feature[0].flags.png} alt="" /></div>
                        <div className='main'> 
                        <h3>{feature[0].name.common}</h3>
                            <div className='parent1'>    
                                <div className='child1'>
                                    <p><strong>Native Name:</strong>{Object.values(Object.values(feature[0].name.nativeName)[0])[0]}</p>
                                    <p><strong>Population:</strong>{feature[0].population}</p>
                                    <p><strong>Region:</strong>{feature[0].region}</p>
                                    <p><strong>Sub Region:</strong>{feature[0].subregion}</p>
                                    <p><strong>Capital:</strong>{feature[0].capital}</p>
                                </div>
                                <div className='child2'>
                                    <p><strong>Top Level Domain:</strong>{feature[0].tld}</p>
                                    <p><strong>Currencies:</strong>{Object.values(Object.values(feature[0].currencies)[0])[0]}</p>
                                    <p><strong>Languages:</strong>{Object.values(feature[0].languages)+"."}</p>
                                </div>
                            </div>
                            <div className='parent2'>
                                <p><strong>Borders:</strong>{feature[0].borders&&feature[0].borders.map(element=><span className='borders'>{element}</span>)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    );
}
