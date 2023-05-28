//Variables to store Alarm Data
//Define the array to lists the saved alarm

let alarms = [];

//Get DOM Elements

const display = document.getElementById('clock-display');
console.log(display);
const setAlarm = document.getElementById('set-alarm-btn');
console.log(setAlarm);

const alarmList = document.getElementById("alarm-lists");

//Function to update clock time each second
function updateTime(){
  const now = new Date();
  const time = now.toLocaleTimeString();
  display.textContent = time;
  // console.log('Time Shown');
  checkAlarm(now);
}

//Function to set Alarm
function setNewAlarm(){
  console.log('Inside');
  console.log(alarms);
  // alert('Hi');
  
  const hour = document.getElementById('hours').value;
  const minutes = document.getElementById('minutes').value;
  const seconds = document.getElementById('seconds').value;
  const ampm = document.getElementById('ampm').value;

  const alarmTime = {
    hour: hour,
    minute: minutes,
    second: seconds,
    ampm: ampm
  };
  alarms.push(alarmTime);
  console.log(alarms);
  lists();
  
}


//Function the list down the alarm saved
function lists(){
  alarmList.innerHTML = '';
  //Traverse through each array element to show the alarm lists
  //Create li for each list
  alarms.forEach((alarm, index) => {
    const alarmIndividualList = document.createElement('li');
    alarmIndividualList.textContent = `${alarm.hour}:${alarm.minute}:${alarm.second} ${alarm.ampm}`
    
    //Also Append a delete button with every list to give a functionality of deletio of alarm
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteAlarm(index));
    
    alarmIndividualList.appendChild(deleteBtn);
    alarmList.appendChild(alarmIndividualList);
  });
}

//Function to delete an alarm
function deleteAlarm(index){
  alarms.splice(index, 1);
  lists();
}

//Functionality to check the alarm time and actual time
function checkAlarm(now){
  // console.log('Inside');
  alarms.forEach((alarm, index) => {
    //Use ParseInt to convert the value in Number to compare
    const hourI = parseInt(alarm.hour);
    const minI = parseInt(alarm.minute);
    const secI = parseInt(alarm.second);
    const ampmU = alarm.ampm.toUpperCase();

    
    let currentHour = now.getHours();
    let currentAmPm = 'AM';

    if(currentHour >= 12){
      currentAmPm = 'PM';
    }

    //convert current hour to 12-hour format
    if(currentHour > 12){
      currentHour -= 12;
    }else if(currentHour === 0){
      currentHour = 12;
    }

    if(
      hourI === currentHour &&
      minI === now.getMinutes() &&
      secI === now.getSeconds() &&
      ampmU === currentAmPm
      ){
        playSong();
        deleteAlarm(index);
      }
  });
}

//Function to Play Alarm Song
function playSong(){
  const audio = new Audio('emergency-alarm-with-reverb-29431.mp3');
  audio.addEventListener('canplaythrough', ()=>{
    audio.play()
    .then(()=>{
      //Playback started
      //Add event listener to stop audio
      showAlert();
      audio.addEventListener('ended', ()=>{
        audio.pause();
      });
    }).catch(error => {
      console.error('Error while playing');
    });
  });
  audio.load();
}

//Function to show error
function showAlert(){
  alert('Wake Up, Time Up!!');
}

//Update Display Time Every Second
setInterval(updateTime, 1000);


setAlarm.addEventListener('click', setNewAlarm);

console.log(alarms);







