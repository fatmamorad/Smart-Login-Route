const searchTerm =document.getElementById("SearchSection")
const searchButton=document.getElementById("SearchButton")
searchButton.addEventListener("click",async function(){
    let city=searchTerm.value||"cairo";
    console.log(city)
    if(city===""){
      alert("Enter Valid Countery")
      return
    }
    const apiKey = "911a4db6d9984651b04144421253006";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    var res= await fetch(url)
    res=await res.json()
    console.log(res)
    const localtime =res.location.localtime; 
    const dateObj = new Date(localtime);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    let date=formattedDate.split(" ")
    console.log(date)

     document.getElementById("row-data").innerHTML=`<div class=" col-lg-4 col-md-12 mb-4">
  <div class=" card card-info ">
  
    <div class=" p-2 different-color d-flex justify-content-between align-items-center">
      <p class="day mb-0">${date[0]}</p>
      <p class="date mb-0">${date[2] + date[1]}</p>
    </div>
    <div class="more-info text-center">
      <p class="region px-3 pt-1">${res.location.region}</p>
      <p class="degree px-3">${res.current.temp_c}&deg;C</p>
      <img class="px-5" src="https:${res.current.condition.icon}" alt="Weather Icon">
      <p class="text-info px-3">${res.current.condition.text}</p>
      <div class="d-flex  justify-content-between align-items-center gap-3 p-3">

    
        <div class="d-flex align-items-center">
          <img class="me-1" src="WeatherImages/imgi_3_icon-umberella.png" alt="Humidity">
          <p class="mb-0">${res.current.humidity}%</p>
        </div>

        <!-- سرعة الرياح -->
        <div class="d-flex align-items-center">
          <img class="me-1" src="WeatherImages/imgi_4_icon-wind.png" alt="Wind Speed">
          <p class="mb-0">${res.current.wind_kph} km/h</p>
        </div>

        <!-- اتجاه الرياح -->
        <div class="d-flex align-items-center">
          <img class="me-1" src="WeatherImages/imgi_5_icon-compass.png" alt="Wind Direction">
          <p class="mb-0">${res.current.wind_dir}</p>
        </div>

      </div>
    </div>

  </div>
</div>

        `



    res=await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=city&days=2`)
    data=await res.json()
  const forecastDays = data.forecast.forecastday;
     console.log(data)
  forecastDays.forEach(day => {
    const date = new Date(day.date); // تحويل التاريخ لعنصر Date
    const options = { weekday: 'long' }; // علشان نجيب اسم اليوم
    const dayName = date.toLocaleDateString('en-US', options); // مثال: "Monday"

    const maxTemp = day.day.maxtemp_c;
    const minTemp = day.day.mintemp_c;
       document.getElementById("row-data").innerHTML+=`<div class="  bg-bg-primary col-lg-4 col-md-12 mb-4">
  <div class=" card card-info h-100">
    
    <div class=" different-color p-2 d-flex justify-content-between align-items-center">
      <p class="day mb-0">${dayName}</p>
  
    </div>

    <div class="more-info text-center">
     <img class="px-5" src="https:${day.day.condition.icon}" alt="Weather Icon">

      <p class="degree px-3 h3">${maxTemp}&deg;C</p>
      <p class=" px-3 h4">${minTemp}&deg;C</p>
      <p class="text-info px-3">${day.day.condition.text}</p>

   
    </div>

  </div>
</div>

        `
  
  });
  
   console.log()
})