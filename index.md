---
title: Broncobots
subtitle: FRC Team 1987
layout: page
callouts: home_callouts
show_sidebar: false
hero_image: images/Homeimg.jpg
hero_height: is-large
sponsorCarousel: sponsors

---
<link rel="stylesheet" href="/assets/css/buttonHover.css">
<link rel="stylesheet" href="/assets/css/animatedLink.css">

 <style>
.zoom {
/*  padding: 50px;*/
/*  background-color: green;*/
  transition: transform .2s; /* Animation */
/*  width: 200px;*/
/*  height: 200px;*/
  margin: 0 auto;
}
@import "TextAnimationEffect.scss";

.zoom:hover {
  backface-visibility: hidden; 
  transform: scale(1.05); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  
}

.iframe-container {
    position: relative;
    width: 100%;
    padding-top: 50%; /* 1:1 aspect ratio (height equals width) */
}

.iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
}

.split-screen {
    display: flex;
    flex-direction: row; /* Default: side by side */
}

.left {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column; /* Stack elements on top of each other */
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    text-align: right;
}

.right {
    flex: 1;
    padding: 20px;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
    .split-screen {
        flex-direction: column; /* Stack elements on top of each other */
    }
    
    .left,
    .right {
        text-align: center;
        flex: none; /* Disable equal width for stacking */
    }

    .iframe-container {
        padding-top: 100%; /* 1:2 aspect ratio */
    }
}


</style>

<h1 style="font-size:64px;text-align: center;">
    Broncobots are
  <span
     class="txt-rotate"
     data-period="2000"
     data-rotate='["innovators.", "inspirational.", "engineers.", "designers.", "accepting.", "listeners.", "thinkers.", "a family." ]'></span>
</h1>

<div class="split-screen">
    <div class="left">
        <h2 style="font-size: 3.75rem">We are the Broncobots <br> FRC Team 1987!</h2>
        <p>Based out of Lee's Summit, Missouri. The team is made up of many students and 5 coaches from <a href="https://lsnhs.lsr7.org/" target="_blank">Lee's Summit North High School</a></p>
    </div>
    <div class="right">
        <div class="iframe-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.8072996290653!2d-94.3791996235168!3d38.928381744874386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4e0f9bf16fb459af%3A0x3c12c65ddeb2e600!2sLSN%20Broncobots!5e0!3m2!1sen!2sus!4v1693766080380!5m2!1sen!2sus" width="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</div>

<p style="text-align: center; font-size: 3rem; margin-bottom: 0.1rem;">
    We are dedicated to 
    <a href="https://www.firstinspires.org/" target="_blank" style="display: inline-block; vertical-align: middle;">
        <img width="350" src="./images/Assets/Branding/firstinspires.svg" alt="First" style="vertical-align: middle;">
    </a>
    <i class="fa-solid fa-circle-info fa-bounce" style="font-size:0.3em" onclick="FIRSTinfo()"></i>
    <p id="FIRSTinfo" style="display:none;text-align: center;font-size: 0.9rem;margin-bottom: 0.4rem;">(For Inspiration and Recognition of Science and Technology)</p>


<p style="text-align: center; font-size: 3rem; margin-bottom: 1.5rem;">
    and encouraging  
    <a href="https://www.kcstem.org/" target="_blank" style="display: inline-block; vertical-align: middle;">
        <img width="350" src="./images/Assets/Branding/kcSTEM_logo.svg" alt="First" style="vertical-align: middle;">
    </a>
   <i class="fa-solid fa-circle-info fa-bounce" style="font-size:0.3em;mar: translate(0,90%);" onclick="KCstem()" data-fa-transform="left-10"></i>
    <p id="KCstem" style="display:none;text-align: center;font-size: 0.9rem;margin-bottom: 1.25rem;">(Science, Technology, Engineering, and Math)</p>
<div class="descriptors">

<script src="{{ site.baseurl }}/assets/js/TextAnimation.js"></script>
</div>

<div style="text-align:center; vertical-align: middle; padding:0px 0;">
    <img src="images/2023TeamPic.jpg" alt=" " class="zoom" width="800" height="auto" >
</div>

<div class="zoom"></div> 

<h2 style="color:maroon;text-align:center">About us</h2>

<div style="text-align: center">
<buttonhover class="noWrap full-rounded" onclick="teamFocus()"><span class="noWrap">Team Focus</span><div class="border full-rounded"></div></buttonhover>
<buttonhover class="noWrap full-rounded" onclick="missionStatement()"><span class="noWrap">Mission Statement</span><div class="border full-rounded"></div></buttonhover>
<buttonhover class="noWrap full-rounded" onclick="teamHistory()"><span class="noWrap">Team History</span><div class="border full-rounded"></div></buttonhover>
</div>

<div id="missStat" style="display:none">
<br>
      The Broncobots are dedicated to helping the future through the recognition and advocacy of science, technology, engineering, and math. As FIRST participants, we strive to build a community devoted to education, innovation, and inspiration. By creating strong partnerships with mentors, teachers, and sponsors, we encourage communication and leadership as crucial parts of team success.  
</div>

<div id="teamFoc" style="display:none">
<br>
      <p>
         The focus of our team has been to reach out to our community in every way possible. We have attended school carnivals, school presentations, bingo raffles, Boy Scout meetings, school board meetings, and business meetings. We have been featured numerous times in publications, including three local newspapers, Honeywell newsletters, and even two books: FIRST Robotics: Rack N Roll and FIRST Robots: Behind The Design. The team created a video as an introduction to FIRST for the Lee's Summit community that aired on the local government channel and published a book about our team and our history.
    <br><br>
        In our own school, we have hosted booths at Freshmen Orientation Day, sponsored "Math and Science Teacher Appreciation Day," set up booths at football games, participated in Safe Halloween, and set up FIRST Robotics displays throughout the year. In cooperation with the two other Lee's Summit robotics teams, we have held PR meetings to schedule banquets, school visits, open houses, and community outreach projects. For three weeks this past summer, we sponsored robotics and engineering camps for elementary students.
    <br><br>
        We've made our name known throughout the community in various ways. We have presented at numerous Lee's Summit elementary schools, in addition to Lee's Summit middle schools, and a private Catholic school in a neighboring city. We have attended and presented at meetings for the Rotary Club, the Optimist Club, the National Tool and Machining Association, the Lee's Summit Economic Development Council, and the Kauffman Foundation. We also were excited to give presentations at Gail's Harley Davidson, Honeywell, the Engineering and Science Summit Institute at Kansas State University, and the Lee's Summit Chalk Walk. Together with the other two Lee's Summit robotics teams our team rotated staffing a booth at Downtown Days to reach out to all Lee's Summit citizens.
    <br><br>
        Over four years, we have sent over 1,500 letters to government officials. In 2008, there was a "Lee's Summit Robotics Day" proclamation from the mayor, and Governor Matt Blunt officially recognized and commended the FIRST Robotics Competition in the state of Missouri. Along with starting a mail campaign to government officials (fifteen different officials and federal offices), took the classic Flat Stanley and combined it with the spirit of FIRST to start our Flat Creation Campaign. This was designed to reach people outside our direct area of influence, like families and friends from other states and countries. During its time traveling, Flat Mammoth (from our 2008 Flat Creation Campaign) has visited a second grade classroom, attended a robot-themed movie night, enjoyed the warm weather in Honduras, and sat in the Missouri House of Representatives! 
    </p>
</div>

<div id="teamHist" style="display:none">
<br>
  <p>
     Over the years, the Broncobots have had many significant achievements. We've attended over 16 regionals over the years, going to the Greater Kansas City Regional and an out-of-state regional each year. Team 1987 has also competed in summer competitions such as Ozark Mountain Brawl and Lee's Summit's CowTown ThrowDown. We haven't kept quiet about what we do either. We've had over 60 presentations at schools and businesses. This number does not include our countless booths at Missouri State Fair, Lee's Summit's Downtown Days, Oktoberfest, and Kansas City Maker Faire. The team has been featured in countless newspaper articles, been on TV, and is even mentioned in a book. We've also initiated letter campaigns, media broadcasts, toilet paper drives, and much more. Team 1987 The Broncobots has accomplished much since our founding year. 
  </p>
</div>

<script>

function FIRSTinfo() {
    let FIRSTinfo = document.getElementById("FIRSTinfo");
  if (FIRSTinfo.style.display === "none") {
    FIRSTinfo.style.display = "block";
  } else {
    FIRSTinfo.style.display = "none";
  }
}

function KCstem() {
    let KCstem = document.getElementById("KCstem");
  if (KCstem.style.display === "none") {
    KCstem.style.display = "block";
  } else {
    KCstem.style.display = "none";
  }
}


function missionStatement() {
    let m = document.getElementById("missStat");
    let f = document.getElementById("teamFoc");
    let h = document.getElementById("teamHist");
    f.style.display = "none";
    h.style.display = "none";
    if (m.style.display === "none") {
        m.style.display = "block";
    } else {
        m.style.display = "none";
    }
}
function teamFocus() {
    let m = document.getElementById("missStat");
    let f = document.getElementById("teamFoc");
    let h = document.getElementById("teamHist");
    m.style.display = "none";
    h.style.display = "none";
  if (f.style.display === "none") {
    f.style.display = "block";
  } else {
    f.style.display = "none";
  }
}
function teamHistory() {
    let m = document.getElementById("missStat");
    let f = document.getElementById("teamFoc");
    let h = document.getElementById("teamHist");
    f.style.display = "none";
    m.style.display = "none";
  if (h.style.display === "none") {
    h.style.display = "block";
  } else {
    h.style.display = "none";
  }
}
</script>
