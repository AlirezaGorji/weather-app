import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { settings } from '../settings';

const cities = [2988507, 6173331, 5368361, 5913490, 5128581, 108410, 2673730, 3169070, 1819729, 1850147, 2147714]
const icons = ['Sunny', 'Clouds', 'Rainy', 'Snowy']

const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

function Main() {
    const tempType = useSelector(state => state.tempType);
    const [weatherResults, setWeatherResults] = useState([])
    const [selectedCity, setSelectedCity] = useState({ id: '', name: '', icon: '', description: '', temperature: 0 })

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/2.5/group?id=${cities.join(',')}&appid=${settings.apiKey}` )
            .then(function (response) {
                // handle success
                setSelectedCity({
                    id: response.data.list[0].id,
                    name: response.data.list[0].name,
                    temperature: response.data.list[0].main.temp,
                    description: response.data.list[0].weather[0].description,
                    icon: response.data.list[0].main,
                })
                setWeatherResults(response.data.list);

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    const selectCity = (item) => {
        setSelectedCity({
            id: item.id,
            name: item.name,
            temperature: item.main.temp,
            description: item.weather[0].description,
            icon: item.weather[0].main,
        });
        scrollToTop();
    }

    const modifyTempreture = (temp) => {
        var result = Math.round(temp - 273.15);
        if(!tempType){
            result = Math.round((result * 9)/5 + 32);
        }
        return result;
    }

    return (
        <div className='row mycard'>
            <div className='col-sm-8 col-xs-6'>
                <div className='weather-info-container'>
                    <div className='city-caption p-2 text-left'>
                        {selectedCity.name}
                    </div>
                    <div className='weather-info-detail'>
                        <div className='row'>
                            <div className='col-sm-4 col-xs-12'>
                                {icons.includes(selectedCity.icon) ? <img className='col large-weather-icon' src={require('../Assets/' +  selectedCity.icon + '.png')} /> :
                                    <img className='col large-weather-icon' src={require('../Assets/' + icons[0] + '.png')} />}
                            </div>
                            <div className='col-sm-8 col-xs-12 text-left'>
                                <div>{modifyTempreture(selectedCity.temperature)} °{tempType ? 'C' : 'F'}</div>
                                <div className='temp-sign'>{selectedCity.description}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-sm-4 col-xs-6'>
                <div className='cities-container'>
                    <div className='mb-2 text-left'>
                        <h5 className='p-2'>Favorite Locations</h5>
                    </div>
                    <div className='cities-list'>
                        {weatherResults.map((item) =>
                            <div
                                onClick={() => selectCity(item)}
                                className={item.id === selectedCity.id ? 'selected-row' : ''}>{icons.includes(item.weather[0].main) ? <img className='col weather-icon' src={require('../Assets/' + item.weather[0].main + '.png')} /> :
                                    <img className='col weather-icon' src={require('../Assets/' + icons[0] + '.png')} />}{item.name}
                                      
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Main