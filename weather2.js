console.log("hello");

const app=document.querySelector('.weather-app');

const temp=document.querySelector('.temp');

const dateOutput=document.querySelector('.date');
const timeOutput=document.querySelector('.time');
const nameOutput=document.querySelector('.name');


const conditionOutput=document.querySelector('.condition');


const icon=document.querySelector('.icon');
const cloudOutput=document.querySelector('.cloudy');
const humidityOutput=document.querySelector('.humidity');
const windOutput=document.querySelector('.Wind');
const form=document.getElementById('locationInput');
const search=document.querySelector('.search');
const btn=document.querySelector('.submit');
const cities=document.querySelectorAll('.city');


let cityInput="London";


cities.forEach((city)=>
{
   city.addEventListener('click',(e)=>{
   
    cityInput=e.target.innerHTML;
    console.log(cityInput);
   get();

    app.style.opacity="0";

   }); 
})


 form.addEventListener('submit',(e)=>
{
   if(search.value.length==0)
   {
   alert('please type in a city name'); 
   } 
   else{
   cityInput=search.value;
   console.log(cityInput);
   get();
   search.value="";
   app.style.opacity="0";

   }


   e.preventDefault();
   });


function dayOfTheWeek(day,month,year)
{
   const weekday=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
   ] ;

return weekday[new Date(`${day}/${month}/${year}`).getDay()];

};


//console.log(dayOfTheWeek(30,8,2022));




//console.log(url);

function get()
{
   fetch(`https://api.weatherapi.com/v1/current.json?key=bac7f8a087f54aad816120140222808&q=${cityInput}`).then(response=> response.json()).then(mine);
   
   function mine(data)
   {
   console.log(data);

   temp.innerHTML= data.current.temp_c+"&#176;";
   console.log(temp);

       
        conditionOutput.innerHTML=data.current.condition.text;
        const date=data.location.localtime;

        const y=parseInt(date.substr(0,4));
        const m=parseInt(date.substr(5,2));
        const d=parseInt(date.substr(8,2));
        const time = date.substr(11);

        dateOutput.innerHTML=`${d}/${m}/${y}`;
        console.log(dateOutput);

        timeOutput.innerHTML=time;
        console.log(time);

        nameOutput.innerHTML=data.location.name;
        console.log(nameOutput);
        const iconId=data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);


        icon.src="./icons/64x64/"+iconId;
      
    
        cloudOutput.innerHTML =data.current.cloud +"%";
        //console.log(cloudOutput);
        humidityOutput.innerHTML=data.current.humidity+"%";
        //console.log(humidityOutput);
        windOutput.innerHTML=data.current.wind_kph+"km/h";
        //console.log(windOutput);

        let timeOfDay="day";
        const code=data.current.condition.code;



        if(!data.current.is_day)
        {
            timeOfDay="night";
        }
   
        if(code==1000)
        {
           app.style.backgroundImage=`url(${timeOfDay}/clear.jpg)`;
           btn.style.background="#e5ba92";
           
           
           if(timeOfDay=="night")
           {
            btn.style.background="#181e27";
           }
        }
         
        else if(
            code==1003||
            code==1006||
            code==1009||
            code==1030||
            code==1069||
            code==1087||
            code==1135||
            code==1273||
            code==1276||
            code==1279||
            code==1282
           ){
            app.style.backgroundImage=`url(${timeOfDay}/cloudy.jpg)`;
            btn.style.background="#fa6d1b";
           }

           if(timeOfDay=="night")
            {
               btn.style.background="#181e27" ;
            }
            else if( code==1003||
                code==1063||
                code==1069||
                code==1072||
                code==1150||
                code==1153||
                code==1180||
                code==1183||
                code==1186||
                code==1189||
                code==1192||
                code==1195||
                code==1204||
                code==1207||
                code==1240||
                code==1243||
                code==1246||
                code==1249||
                code==1252)
                {
                  app.style.backgroundImage=`url(${timeOfDay}/rainy.jpg)`;
                    btn.style.background="#647d75";
                    if(timeOfDay=="night")
                   {
               btn.style.background="#325c80"; 
                    }
                }
                else{
                  app.style.backgroundImage=`url(${timeOfDay}/snowy.jpg)`;
                    btn.style.background="#4d72aa";
                    if(timeOfDay=="night")
                   {
               btn.style.background="#1b1b1b" ;
                    }
                    }

         app.style.opacity="1";
          
            }  
       
        
           
        } 
       app.style.opacity="1"; 