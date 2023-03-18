const InputSection = document.querySelector('.inputSection')
const climaCiudades = document.querySelector('.climaCiudades')

const api = InputSection.addEventListener('click', (event) => {
    const apiKey = "cb32846691d52184e90754f8945f27eb";
    const baseURL = "https://api.openweathermap.org/";
    const city = document.querySelector('.cityInput').value
    const tag = event.target.nodeName

    if (tag == 'BUTTON') {
        if (city == '') {
            alert('Ingresa una ciudad')
        }
        else {
            const api = `${baseURL}data/2.5/weather?q=${city}&appid=${apiKey}&lang=sp`; 

            window
            .fetch(api)
            .then(respuesta => respuesta.json())
            .then((respuestaJson) => {
                if (respuestaJson.cod == '404') {
                    alert('Ingresa una ubicacion valida')
                }else{
                    const mainContainerWeather = document.createElement('div')

                    const cityName = document.createElement('p')
                    cityName.textContent = respuestaJson.name
                    cityName.className = "cityName"

                    const cityAbreviatura = document.createElement('span')
                    cityAbreviatura.textContent = respuestaJson.sys['country']
                    cityAbreviatura.className = 'AbreviaturaCity'
                    cityName.append(cityAbreviatura)

                    const temp = document.createElement('p')
                    const tempKelvin = respuestaJson.main['temp']
                    const tempcelciues = Math.round(tempKelvin - 273.15)
                    temp.textContent = tempcelciues
                    temp.className = "cityTemp"

                    const celciusIcon = document.createElement('span')
                    celciusIcon.textContent = '°C'
                    temp.append(celciusIcon)

                    const containerNameTemp = document.createElement('div')
                    containerNameTemp.append(cityName, temp)
                    containerNameTemp.className = "nameTempContainer"

                    const weatherIcon = document.createElement('img')
                    const icon = respuestaJson.weather[0]['icon']
                    console.log(icon)
                    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`
                    weatherIcon.className = 'imgIcon'

                    const descriptionWether = document.createElement('p')
                    descriptionWether.textContent = respuestaJson.weather[0]['description']
                    descriptionWether.className = 'descriptionWeather'

                    const containerIconDescription = document.createElement('div')
                    containerIconDescription.append(weatherIcon, descriptionWether)
                    containerIconDescription.className = 'containerIconDescription'
                    mainContainerWeather.append(containerNameTemp, containerIconDescription)

                    climaCiudades.append(mainContainerWeather)
                    mainContainerWeather.className = 'mainContainerWeather'
                }
            })
        }
    }

    
})

