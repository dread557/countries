import React, { useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { useCountriesContext } from '../api/CountriesApi'
import { ThemeContext } from '../contexts/ThemeContext'


const CountryDetails = () => {
    const { Id } = useParams()
    const { countryData, getByName, isLoading } = useCountriesContext()
    const { isLightTheme, light, dark } = useContext(ThemeContext)
    const theme = isLightTheme ? light : dark
    const navigate = useNavigate()


    useEffect(() => {
        getByName(Id)
    }, [])
    let currentCountry = Object.keys(countryData[0]?.currencies || {})[0]
    let currentNameLang = Object.keys(countryData[0]?.name?.nativeName || {})[0]
    // let currentLang = Object.keys(countryData[0]?.languages || {})[0]
    // console.log({ currentLang })
    // console.log(countryData[0]?.languages[currentLang])
    // console.log(countryData[0])


    if (isLoading) return "Loading..."
    return (
        <div className='country-details-btn-grp'>
            <button onClick={() => navigate(-1)} style={{ background: theme.bg, boxShadow: theme.bxSdw, color: theme.txt }} > ← Back</button>
            <div className='country-details'>
                <div className='flag-lg'>
                    <img src={countryData[0]?.flags.png} alt='flag' />
                </div>
                <div className='country-details-txt'>
                    <h1>{countryData[0]?.name?.common}</h1>
                    <div className='country-details-grp'>
                        <div className='country-details-one'>
                            <p><span className='p-title'>Native Name:</span> {countryData[0]?.name?.nativeName[currentNameLang]?.official}</p>
                            <p><span className='p-title'>Population:</span> {countryData[0]?.population.toLocaleString()}</p>
                            <p><span className='p-title'>Region:</span> {countryData[0]?.region}</p>
                            <p><span className='p-title'>Sub Region:</span> {countryData[0]?.subregion}</p>
                            <p><span className='p-title'>Capital:</span> {countryData[0]?.capital[0]}</p>
                        </div>
                        <div className='country-details-two'>
                            <p><span className='p-title'>Top Level Domain:</span> {countryData[0]?.tld[0]}</p>
                            <p><span className='p-title'>Currency:</span>  {countryData[0]?.currencies[currentCountry]?.name} </p>
                            {/* <p>Languages:  {countryData[0]?.languages[currentLang]}</p> */}
                        </div>
                    </div>
                    <div className='border-countries'>
                        <p><span className='p-title'>Border countries :  </span></p>
                        <div className='border-grp'>
                            {countryData[0]?.borders?.map((border, index) => (
                                <span className='border' key={index} style={{ boxShadow: theme.bxSdw, color: theme.txt }}>
                                    {border}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CountryDetails