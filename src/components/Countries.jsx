import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import { useCountriesContext } from '../api/CountriesApi'
import { ThemeContext } from '../contexts/ThemeContext'

const Countries = () => {

    const { getAll, getByRegion, countries, setCountries, searchTerm, setSearchTerm, isLoading } = useCountriesContext()
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark
    const [allCountries, setAllCountries] = useState(countries)
    const [region, setRegion] = useState('')
    console.log(region)

    useEffect(() => {
        if (region === '') {
            getAll()
        } else {
            getByRegion(region)
        }
    }, [region])

    useEffect(() => {
        const filteredData = countries?.filter((country) => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
        setAllCountries(filteredData)
    }, [searchTerm, countries])

    if (isLoading) return 'Loading...'

    return (
        <>
            <div className='search-select-grp'>
                <div className='search-box'>
                    <input
                        style={{ background: theme.bg, color: theme.txt, boxShadow: theme.bxSdw }}
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search for a country...' />
                </div>
                <div className='select-box'>
                    <select
                        style={{ background: theme.bg, color: theme.txt, boxShadow: theme.bxSdw }}
                        onChange={(e) => setRegion(e.target.value)}
                    >
                        <option value='all' selected>Filter by region</option>
                        <option value='Africa'>Africa</option>
                        <option value='America'>America</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Oceania'>Oceania</option>
                    </select>
                </div>
            </div>
            <div className='countries'>
                {allCountries.map((country, index) => (
                    <Link to={`/countries/${country.name.common}`} key={index} className='card' style={{ boxShadow: theme.bxSdw, color: theme.txt }}>
                        <img className='flag' src={country.flags.svg} alt={country.name.common} />
                        <div className='card-details'>
                            <p>{country.name.common}</p>
                            <p>Population: {country.population}</p>
                            <p>Region: {country.region}</p>
                            <p>Capital : {country.capital}</p>
                        </div>

                    </Link>
                ))}
            </div>
        </>
    )
}

export default Countries