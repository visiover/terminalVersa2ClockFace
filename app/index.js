import { HeartRateSensor } from "heart-rate";
import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";
import { today } from "user-activity";
import { battery } from "power";
import { goals } from "user-activity";
import { today } from "user-activity";
import * as battery from "battery";
import { me as device } from "device";
import * as messaging from "messaging";
import * as util from "../common/utils";

// Update the clock every minute
clock.granularity = "seconds";


// TIME
const mytime = document.getElementById("mytime");
let elDate = document.getElementById("date");

// Updates with every tick (seconds)
clock.ontick = (evt) => {
  let today = evt.date;
  let dtDate = new Date();
  let hours = today.getHours();
  
   elDate.text = ` ${util.getDay3(dtDate.getDay())}, ${dtDate.getDate()} ${util.getMonth3(dtDate.getMonth())} `;
  
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let mins = util.zeroPad(today.getMinutes());
  let seconds = util.zeroPad(today.getSeconds());
  
  mytime.text = `${hours}:${mins}:${seconds}`;
}


// STEPS
let txtSteps = document.getElementById("txtSteps");
txtSteps.text = today.adjusted.steps || 0;


// BATTERY
const batteryHandle = document.getElementById("batteryLabel");
let batteryValue = battery.chargeLevel; // measure the battery level and send it to batteryValue
batteryHandle.text = `${batteryValue}%`;


// HEART RATE
const heartrateHandle = document.getElementById("heartrateLabel");
const hrm = new HeartRateSensor();
hrm.onreading = function() {
  heartrateHandle.text = `${hrm.heartRate} BPM`;
}
hrm.start();


// CALORIES
const myCalories = document.getElementById("myCalories");
function getCalories() {
  let val = (today.adjusted.calories || 0);
  myCalories.text = `${val}`
}

getCalories();

// DISTANCE
const myDistance = document.getElementById("myDistance");

function getDistance() {
  let val = (today.adjusted.distance || 0);
  myDistance.text = `${val}`
}

getDistance();
