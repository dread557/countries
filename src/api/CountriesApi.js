import React, { useState, createContext, useContext } from 'react'

const CountriesContext = createContext()
const baseUrl = 'https://restcountries.com/v3.1'

export const CountriesContextProvider = ({ children }) => {
    const [countries, setCountries] = useState([])
    const [countryData, setCountryData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')


    const getAll = async () => {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/all`)
        const data = await response.json()
        // console.log(data)
        setCountries(data)
        setIsLoading(false)
    }

    const getByName = async (name) => {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/name/${name}?fullText=true`)
        const data = await response.json()
        console.log(data)
        setCountryData(data)
        setIsLoading(false)
    }

    const getByRegion = async (name) => {
        setIsLoading(true)
        const response = await fetch(`${baseUrl}/region/${name}`)
        const data = await response.json()
        // console.log(data)
        setCountries(data)
        setIsLoading(false)
    }

    return (
        <CountriesContext.Provider value={{ getAll, getByName, getByRegion, countryData, countries, setCountries, isLoading, searchTerm, setSearchTerm }}>
            {children}
        </CountriesContext.Provider>
    )

}

export const useCountriesContext = () => useContext(CountriesContext)