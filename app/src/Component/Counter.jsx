import React, { useEffect } from 'react'

export default function Counter(props) {
  useEffect(() => {
    var countDownDate = new Date(Number(props.time) * 1000).getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
    //   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      if (document.getElementById("demo")) {
        document.getElementById("demo").innerHTML = hours + "h "
          + minutes + "m " + seconds + "s ";
      } else {
        clearInterval(x);
      }
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "";
        props.cb();
      }
    }, 1000);
  }, []);
  return (
    <div id={"demo"}>

    </div>
  )
}