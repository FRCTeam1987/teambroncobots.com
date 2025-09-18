---
layout: page
title: KC FIRST Robotics Conference
hide_hero: true
show_sidebar: false
--- 

<link rel="stylesheet" href="/assets/css/animatedLink.css">
<div style="margin: auto; font-family:Rockwell, Roboto, sans-serif; text-align:center">
  <h1 style="font-size:3rem">KC FIRST Robotics Conference</h1>
  <h2>September 20, 2025</h2>
  <h3>
  Lee's Summit North High School<br/>
  901 NE Douglas<br/>
  Lee's Summit, MO 64086
  </h3>
</div>
<div style="text-align: center;">
  <a href="https://docs.google.com/document/d/1jelquaOQKcfWOMz9lfRB0CYazLT06d_GE2dEvwJTht8/edit?usp=sharing" target="_blank">Booklet</a>
  <br/>
  <iframe style="width: 100%; max-width:1075px; height: 550px; display: inline-block;" src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTm9EsbK42GlSYvK6h2ruIa_32aEPybs_p2qffBRrdBMxs5hjm4uHci5xY5E8vK29s1sEQOOeyMVSaT/pubhtml?gid=629658563&amp;single=true&amp;widget=false&amp;headers=false&amp;chrome=false&amp;range=A1:G14"></iframe>
</div>
<div class="columns is-multiline is-centered">
  {% for sponsor in site.data.conference_sponsors %}
    <div class="column is-3-desktop is-6-tablet">
      <div class="card">
        <div class="card-image">
          {% if sponsor.image %}
            <img src="{{ sponsor.image }}" alt=" ">
          {% endif %}
        </div>
        <div class="card-content">
          <div class="content">
            <p class="title is-5 has-text-centered">{{ sponsor.name }}</p>
              {% if sponsor.description %}
                <p class="has-text-black has-text-centered">{{ sponsor.description }}</p>
              {% endif %}
              <div class="cta">
                <a href="{{ sponsor.link }}" target="_blank" style="color:#830506; font-size: smaller">
                  <span class="hover-underline-animation">Go There Now</span>
                </a>
                <svg viewBox="0 0 46 16" height="10" width="30" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                  <path transform="translate(30,0)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10" />
                </svg>
              </div>
            </div>
        </div>
      </div>
    </div>
  {% endfor %}
</div>
