const apiKey = "149f662a156008153168efa75f2aba91";
const daysForecast = 5;
const cityCoords = {
    amsterdam: {
        lat: 52.37,
        long: 4.89
    },
    paris: {
        lat: 48.86,
        long: 2.35
    },
    stockholm: {
        lat: 59.33,
        long: 18.06
    },
    miami : {
        lat : 25.76,
        lon : 80.1
    }
};



// let hashValue = "dfsjhskjh"
// let myURL = `https://robohash.org/${hashValue}`


function createURL(lat, long, apiKey) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude={part}&appid=${apiKey}`;

    return url;
}

function convertToCelsius(kel) {
    return kel - 272.15
}

async function getData(url) {
    try {
        var response = await fetch(url)
        if (response.ok) {
            response = await response.json()
        }
        else {
            alert("GOT A 400-type ERROR!")
        }
    }
    catch (err) {
        console.log(err)
    }

    // console.log(response);
    
    let uv = document.getElementById("uv-index")
    uv.innerHTML = response["current"]["uvi"];

    let currTemp = document.getElementById("curr-temp");
    console.log(currTemp);
    currTemp.innerHTML = convertToCelsius(response["current"]["temp"])


    for (let i = 0; i < 1; i++) {
        let currID = i + "-uvi"
        let currDay = document.getElementById(currID);
        // currDay.innerHTML = 
        let daysTemp = i + "-temp";
        currDay = document.getElementById(daysTemp)
        // currDay.innerHTML = 
        // console.log(currDay);
    }
return response
}

function genFiveDayForecast(allData) {
    for (let i = 0; i < 5; i++) {
        const cardBox = document.querySelector("five-day");
        const newCard = document.createElement("DIV");
        cardBox.setAttribute("class", "box");
        const newCardBody = document.createElement("DIV");
        newCardBody.className = "card-body";
        const newTitle = document.createElement("H3");
        newTitle.className = "card-title";
        newTitle.innerText = "NEW CARD" + i;
        const newDesc = document.createElement("P");
        newDesc.className = "card-desc"
        newDesc.innerText = "Lorem ipsum, dolor sit amet consectetur adipisicing elit." + i;

        cardBox.appendChild(newCard);
        newCard.appendChild(newCardBody);
        newCardBody.appendChild(newTitle);
        newCardBody.appendChild(newDesc);
    }
    console.log(cardBox);

    return allData
}

async function getCity() {
    let city = document.getElementById("citySearch");
    
    city = city["value"].toLowerCase();
    // console.log(city);

    //check if we have data on searched city
    if (cityCoords[city]) {
        let url = createURL(cityCoords[city]["lat"], cityCoords[city]["long"], apiKey);
        let allData = await getData(url);
        genFiveDayForecast(allData["daily"]);
        console.log(allData);
        document.getElementById("city").innerHTML = city;
        // console.log(url);
    }
    else {
        alert("NO DATA ON THIS CITY");
    }
    
}




// function createURL(lat, long, apiKey) {
    
//     let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=alerts&appid=${apiKey}`;
    
//     return url;
// }

async function getWeatherReport(lat, long) {
    let promise = await fetch(createURL(lat, long, apiKey))
    // console.log(promise);
    let response = "";
    if (promise.ok) {
        console.log("ALL GOOD!");
        response = await promise.json();
        console.log(response["daily"]);
    }
}

// //Button onclick handler
// function getCity() {
//     let city = document.getElementById("citySearch");
//     city = city["value"].toLowerCase();

//     console.log("WE SEARCHED FOR::: " + city);
    
    
//     if (cityCoords[city]) {
//         console.log("WE HAVE DATA ON CITY");
//         getWeatherReport(cityCoords[city]["lat"], cityCoords[city]["long"]);
//     }
//     else {
//         console.log("NO DATA ON CITY FOUND");
//     }
// }

// getWeatherReport(cityCoords["stockholm"]["lat"], cityCoords["stockholm"]["long"]);


