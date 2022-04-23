const timeEl=document.getElementById('time');
const dateEl=document.getElementById('date');
const currentweatherItemsEl=document.getElementById('current-weather-items');
const timezone=document.getElementById('time-zone');
const countryEl=document.getElementById('country');
const weatherForecastEl=document.getElementById('weather-forecast');
const currentTempEl=document.getElementById('current-temp');
const days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const API_KEY='a248f51a84d6a7d245e40788fbf7b2b5';
setInterval(()=>{

 const time=new Date();
 const month=time.getMonth();
 const date=time.getDate();
 const day=time.getDay();
 const hour=time.getHours();
 const minutes=time.getMinutes();
 const hoursIn12HrFormat=hour>=13?hour%12:hour;
  const ampm=hour>=12 ?'PM':'AM';
  timeEl.innerHTML=hoursIn12HrFormat + ':' +(minutes < 10? '0'+minutes: minutes)+' '+ `<span id="am-pm">${ampm}</span>`
  dateEl.innerHTML=days[day]+', ' + date +' '+months[month];


},1000)
getweatherData();
function getweatherData()
{
    navigator.geolocation.getCurrentPosition((sucess)=>{

     let {latitude,longitude}=sucess.coords;
     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data=>{



        console.log(data);
        showweatherdata(data);
     })
     

    })
}


function showweatherdata(data)
{
  let {humidity,pressure,sunrise,sunset,wind_speed}=data.current;
  timezone.innerHTML=data.timezone;
  countryEl.innerHTML=data.lat + 'N'+ data.lon+ 'E';
  currentweatherItemsEl.innerHTML=
 ` <div class="weather-item">
  <div> Humidity </div>
  <div>${humidity}</div>
</div>
<div class="weather-item">
<div>Pressure</div>
<div>${pressure}</div>
</div>
<div class="weather-item">
<div>wind speed</div>
<div>${wind_speed}</div>
  
</div>
</div>
<div class="weather-item">
<div>Sunrise</div>
<div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
</div>
<div class="weather-item">
<div>Sunset</div>
<div>${window.moment(sunset*1000).format('HH:mm a')}</div>
</div>




`;
let otherdayforecast="";
data.daily.forEach((day,idx)=>{
console.log("day is "+day);
console.log("idx is "+idx);

 if(idx==0){
   currentTempEl.innerHTML=`
  <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="  weather-icon" class="w-icon">
  <div class="other">
      <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
  <div class="temp">Night - ${day.temp.night}&#176; C </div>
  <div class="temp">Day - ${day.temp.day}&#176; C </div>

  </div>
    `
 }
 else {
  otherdayforecast+=`
  <div class="weather-forecast-item">
  <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
  <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="  weather-icon" class="w-icon">
 
  <div class="temp">NIght - ${day.temp.night}&#176; C </div>
  <div class="temp">Day - ${day.temp.day}&#176; C </div>

</div>
  `

    


 }
})
weatherForecastEl.innerHTML=otherdayforecast;


}