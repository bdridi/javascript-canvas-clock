  var clock = document.getElementById('clock');
  var skelton = document.getElementById('skelton');

  var contextClock = clock.getContext('2d');
  var contextSeconds = clock.getContext('2d');
  var contextHours = clock.getContext('2d');
  var contextMinutes = clock.getContext('2d');
  var contextSkelton = clock.getContext('2d');
  var contextCenter = clock.getContext('2d');


  var centerX = clock.width / 2;
  var centerY = clock.height / 2;
  var radius = 230;

  var currentTetha_Secondes = 270;
  var currentTetha_Minutes = 270;
  var currentTetha_Hours = 270;

  var radius_skelton = 227;

  initTime();
  renderSkelton();
  renderClockSkelton();
  renderSecondes();
  renderHours();
  renderMinutes();
  renderCenter();

  // Handling the moving of seconds indicator 
  setInterval(function() {
    //code goes here that will be run every 5 seconds.    
    if (currentTetha_Secondes == 360) {
      currentTetha_Secondes = 0;

    }

    currentTetha_Secondes += 6;
    renderClockSkelton();
    renderSecondes();
    renderMinutes();
    renderHours();
    renderCenter();
  }, 1000);

  // Handling the moving of minutes indicator 
  setInterval(function() {
    //code goes here that will be run every 5 seconds.    
    if (currentTetha_Minutes == 360) {
      currentTetha_Minutes = 0;
    }

    currentTetha_Minutes += 6;
    renderClockSkelton();
    renderSecondes();
    renderMinutes();
    renderHours();
    renderCenter();
  }, 60001);

  // Handling the moving of hours indicator 
  setInterval(function() {
    //code goes here that will be run every 5 seconds.    
    if (currentTetha_Hours == 360) {
      currentTetha_Hours = 0;

    }

    currentTetha_Hours += 30;
    renderClockSkelton();

    renderMinutes();
    renderHours();
    renderSecondes();
    renderCenter();

  }, 3600002);





  function renderSkelton() {


    var imageObj = new Image();

    imageObj.onload = function() {
      contextSkelton.drawImage(imageObj, 28, 28);
    };
    imageObj.src = 'clock_blank.gif';

  }


  function renderClockSkelton() {


    contextClock.beginPath();
    contextClock.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
    contextClock.fillStyle = 'gray';
    //contextClock.fillStyle = "rgba(255, 255, 255, 0.5)";

    contextClock.fill();
    contextClock.lineWidth = 1;
    contextClock.strokeStyle = '#003300';
    contextClock.stroke();
    //contextClock.globalAlpha = 0.8;



  }

  function renderCenter() {

    contextCenter.beginPath();
    contextCenter.arc(centerX, centerY, 15, 0, 2 * Math.PI, true);
    contextCenter.fillStyle = 'black';
    //contextClock.fillStyle = "rgba(255, 255, 255, 0.5)";

    contextCenter.fill();
    contextCenter.lineWidth = 1;
    contextCenter.strokeStyle = '#003300';
    contextCenter.stroke();



  }

  function renderSecondes() {

    contextSeconds.beginPath();
    contextSeconds.moveTo(centerX, centerY);
    var posX = calculateX(currentTetha_Secondes, radius, centerX);
    var posY = calculateY(currentTetha_Secondes, radius, centerY);
    contextSeconds.lineWidth = 2;
    contextSeconds.lineTo(posX, posY);
    contextSeconds.stroke();

  }

  function renderMinutes() {

    contextMinutes.beginPath();
    contextMinutes.moveTo(centerX, centerY);
    var posX = calculateX(currentTetha_Minutes, radius, centerX);
    var posY = calculateY(currentTetha_Minutes, radius, centerY);
    contextMinutes.lineTo(posX, posY);
    contextMinutes.lineWidth = 5;
    contextMinutes.strokeStyle = 'red';
    contextMinutes.stroke();


  }

  function renderHours() {

    contextHours.beginPath();
    contextHours.moveTo(centerX, centerY);
    var posX = calculateX(currentTetha_Hours, radius - 20, centerX);
    var posY = calculateY(currentTetha_Hours, radius - 20, centerY);
    contextHours.lineTo(posX, posY);
    contextHours.lineWidth = 8;
    contextHours.strokeStyle = 'blue';
    contextHours.stroke();

  }



  /* Calculte X coordinate of the point of circle circonference */
  function calculateX(angle, radius, origin) {

    var radian = getRadian(angle);
    console.log("cos(" + angle + ") :" + Math.cos(angle));
    return origin + (radius * Math.cos(radian));


  }


  function calculateY(angle, radius, origin) {
    var radian = getRadian(angle)
    console.log("sin(" + angle + ") :" + Math.sin(angle));
    return origin + (radius * Math.sin(radian));

  }


  function calculateX2(angle, radius, x1) {

    var radian = getRadian(angle);
    return x1 + (radius * Math.sin(radian));
  }


  function calculateY2(angle, radius, y1) {

    var radian = getRadian(angle);

    return y1 + (radius * (1 - Math.cos(radian)));

  }



  function FixTime() {

    t_seconds = $('#t_seconds').val();
    t_minutes = $('#t_minutes').val();
    t_hours = $('#t_hours').val();

    // Inputs Controls 
    if (t_seconds > 59 || t_seconds == '') {
      alert("Seconds error ! please try again ");
      return;
    }
    if (t_minutes > 59 || t_minutes == '') {
      alert("Minutes error ! please try again ");
      return;
    }
    if (t_hours > 24 || t_hours == '') {
      alert("Hours error ! please try again ");
      return;
    }

    currentTetha_Hours = (270 + (t_hours % 12) * 30) % 360;
    currentTetha_Minutes = (270 + t_minutes * 6) % 360;
    currentTetha_Secondes = (270 + t_seconds * 6) % 360;

  }

  function getRadian(degree) {

    return Math.PI * (degree) / 180;

  }


  // initialize time according to system time 
  function initTime() {
    var d = new Date();
    var n = d.getHours();

    currentTetha_Hours = (270 + (d.getHours() % 12) * 30) % 360;
    currentTetha_Minutes = (270 + d.getMinutes() * 6) % 360;
    currentTetha_Secondes = (270 + d.getSeconds() * 6) % 360;

  }
