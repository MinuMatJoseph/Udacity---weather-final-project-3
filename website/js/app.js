// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '7c4b7b87cbb6ecc8896e0b925b0795b3';
const countryCode = 'US';
let url;
date.innerHTML = newDate;
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    e.preventDefault();
    
    const zip =  document.getElementById('zip').value;
    const comment= document.getElementById('feelings').value;  
    const a  = /[0-9]{5}/;
    //check ZIP code is valid and creating 'url'
    if(a.test(zip)){
      // console.log("hi", zip);
      // console.log("date", newDate);
      url = `${baseURL}${zip},${countryCode}&units=metric&appid=${apiKey}`;
      // console.log("url", url);
    }
    else{
      alert('Enter valid zip code');
    }
    getWeatherDemo(url)
    .then(function (data){ 
      postData('/projectData', {
          date: newDate,
          name: data.name,
          temp: data.main.temp,
          userComment: comment,
          feels: data.main.feels_like,
          description: data.weather[0].description
        })
        updateUI();
  })

}
//Get request
const getWeatherDemo = async (url)=>{
  //1.
   
    const res = await fetch(url)
     try {
        const data = await res.json();
        // console.log("data-->",data)
        return data;
        //1. We can do something with our returned data here -like
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };
   // Post request
   const postData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log('error', error);
    }
  };
  
   // Select elements and update HTML in divs 
  
  const updateUI = async (url = '') => {
    const response = await fetch('/all');
    try {
              const allData = await response.json(); 
              const name = document.getElementById('name');   
              const date = document.getElementById('date');
              const temp = document.getElementById('temp');
              const feels = document.getElementById('feels');
              const description = document.getElementById('description');
              const content = document.getElementById('content');
             
              // console.log("allData==>", allData);
              name.innerHTML = "Location: "+allData.name;
              date.innerHTML = allData.date;
              temp.innerHTML = "Temparature: "+Math.round((allData.temp* 9.0)/5.0+32) + "\u00B0 F";
              feels.innerHTML = "Feels Like: "+Math.round((allData.feels* 9.0)/5.0+32) + "\u00B0 F";
              description.innerHTML ="Description: \""+ allData.description+'"';
              content.innerHTML = "User Comment: "+allData.userComment;
             
    } catch (error) {
              console.log({message: 'Invalid zipcode input!'}); 
    }
  };
  
  