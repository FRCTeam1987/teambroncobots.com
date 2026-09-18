---
title: "2026 KC FIRST Robotics Conference"
start: "2026-09-19T08:40:00"
end: "2026-09-19T15:20:00"
location: "Lee's Summit High School"
address: "400 SE Blue Pkwy, Lee's Summit, Missouri 64063"
layout: event
---

<p>Join us for the 2026 KC FIRST Robotics Conference!</p>

<p>If you would like to give a presentation, then please submit your talk(s): <a href="https://forms.gle/YcCGjmsmxKE6qB4GA">here</a></p>

<p>If there is a topic you'd like to hear about at the conferences, then please <a href="mailto:broncobots@gmail.com">tell us</a>! We'll work to find someone who can present on it!</p>

<p>Note: we’re back at LSHS this year, home of <a href="https://cttd.teamdriven.us/">Cow Town ThrowDown</a> and the Learning Staircase!</p>

<h2 style="margin: auto; font-family:Rockwell, Roboto, sans-serif; text-align:center">Sneak Peek: Sessions</h2>
<p style="text-align:center">Here's a preview of talks submitted so far. Full agenda coming soon!</p>
<br/>

<style>.tag.is-purple { background-color: #6b21a8; color: #fff; }</style>

<div id="session-filters" class="field is-grouped is-grouped-multiline" role="group" aria-label="Filter sessions by category" style="justify-content:center; margin-bottom:1rem;"></div>
<div class="field" style="text-align:center; margin-bottom:1.5rem;">
  <div class="control">
    <div class="select">
      <select id="session-sort">
        <option value="team">Sort by Team Number</option>
        <option value="title">Sort by Session Title</option>
        <option value="category">Sort by Category</option>
      </select>
    </div>
  </div>
</div>

<div id="session-grid" class="columns is-multiline"></div>

{% raw %}
<script>
(function () {
  var CATEGORY_TAGS = {
    'Technical': 'is-primary',
    'Scouting and Strategy': 'is-info',
    'Awards': 'is-warning',
    'Team Organization': 'is-purple',
    'Event Logistics': 'is-black',
    'Culture': 'is-danger',
    'Fundraising': 'is-success'
  };

  var SESSIONS = [{
    teams: [1710],
    category: `Fundraising`,
    title: `Fueling Your Team: Fundraising and Grant Tips for Robotics Teams`,
    presenters: `Rhonda Swails`,
    blurb: `A practical look at diversifying revenue, finding funding opportunities in your community, and navigating the grant-seeking process from application to demonstrating impact.`
  }, {
    teams: [1730, 1710],
    category: `Team Organization`,
    title: `Rookieing 101`,
    presenters: `Ava P. &amp; panelists`,
    blurb: `A student panel covering everything from getting involved on your team to balancing life, school, and robotics as a rookie.`
  }, {
    teams: [1730, 1987, 9410],
    category: `Event Logistics`,
    title: `Drive Team Panel`,
    presenters: `Spencer Werremeyer, Jon Smith, &amp; Chad Lee`,
    blurb: `Drive coaches from three teams share how to select, prepare, and run a drive team at competition, with lessons learned and time for your questions.`
  }, {
    teams: [1730],
    category: `Team Organization`,
    title: `Effective Kickoff Strategy`,
    presenters: `Spencer Werremeyer`,
    blurb: `How Team 1730 revamped its approach to kickoff in 2026&mdash;what worked, and ideas to improve your own kickoff experience.`
  }, {
    teams: [1939],
    category: `Scouting and Strategy`,
    title: `How Do I Get to Houston?: Championship Advancement 2027`,
    presenters: `Victoria Cook &amp; Andy Shimamoto`,
    blurb: `A breakdown of how Regional Points and Championship advancement work for 2027, with real examples from the 2026 season.`
  }, {
    teams: [1939],
    category: `Awards`,
    title: `Impact Award: Changes and Discussion`,
    presenters: `Victoria Cook &amp; Andy Shimamoto`,
    blurb: `What's new in the Impact Award submission&mdash;the divided essay, the new "Sustained" term, and how to tell your team's unique story&mdash;plus plenty of time for Q&amp;A.`
  }, {
    teams: [1939],
    category: `Scouting and Strategy`,
    title: `Scout-a-lot: How We Built a Scouting App (and how you can, too!)`,
    presenters: `Alec S., James B., &amp; Eric X.`,
    blurb: `Three students walk through building team 1939's own scouting app&mdash;the practical considerations, tools, and tradeoffs along the way.`
  }, {
    teams: [1987],
    category: `Technical`,
    title: `Strategic Design &ndash; Build Your Best Bot`,
    presenters: `Levi Madden`,
    blurb: `Real KC-region statistics reveal how to apply Karthik's Strategic Design principles to plan a robot built around your team's on-field goals.`
  }, {
    teams: [1987],
    category: `Scouting and Strategy`,
    title: `FRC Game Theory: How to Develop Optimal Strategies for FRC Games`,
    presenters: `Scott Hasek`,
    blurb: `Using game theory to identify optimal robot strategies and weigh strategic objectives against robot complexity.`
  }, {
    teams: [1987],
    category: `Team Organization`,
    title: `Building the Pit and Pit Crew &ndash; Precompetition`,
    presenters: `Ken Kleffner`,
    blurb: `How to select, prepare, and develop an effective pit crew throughout the season&mdash;because "the robot roboted" is the only stat that matters.`
  }, {
    teams: [1987],
    category: `Event Logistics`,
    title: `Managing the Pit and Pit Crew &ndash; During Competition`,
    presenters: `Ken Kleffner`,
    blurb: `Running a calm, organized pit under competition pressure, with a look at the Broncobots' own modular road-case pit.`
  }, {
    teams: [1987],
    category: `Technical`,
    title: `Autonomous: The Juice Is Worth The Squeeze`,
    presenters: `Jon Smith`,
    blurb: `Why autonomous deserves priority in your robot design and strategy, what makes a routine effective, consistent, and alliance-first, and the trickle-down effect of an automated robot.`
  }, {
    teams: [1987],
    category: `Technical`,
    title: `2027 Systemcore + WPILib`,
    presenters: `Jon Smith`,
    blurb: `A hands-on look at Systemcore and the big changes coming in 2027 WPILib, with walkthroughs, demos, and time for your questions as you prep for next season.`
  }, {
    teams: [1987],
    category: `Technical`,
    title: `Design For Electrical &amp; Automation`,
    presenters: `Jon Smith`,
    blurb: `Tips, tricks, and best practices for designing a robot that sets your electrical and programming sub-teams up for success and reduces the risk of costly failures.`
  }, {
    teams: [1987],
    category: `Culture`,
    title: `Gather Around the Campfire`,
    presenters: `Jon Smith`,
    blurb: `The robot isn't the point, it's the excuse&mdash;a look at how that idea should reshape the way we coach, recruit, handle failure, and measure a season's success.`
  }, {
    teams: [1987],
    category: `Technical`,
    title: `Pit Perfect: Building a Pit That Works for You`,
    presenters: `Joshua Wentworth`,
    blurb: `How to identify what your pit actually needs, weigh common FRC pit architectures, and tailor your setup&mdash;robot cart included&mdash;to supercharge productivity in the shop and at competition.`
  }, {
    teams: [1987],
    category: `Team Organization`,
    title: `Built to Last: Engineering a Sustainable Team`,
    presenters: `Lynn Griffith &amp; Hillary Griffith`,
    blurb: `How to move your team from reactive survival to sustainable operations, with the documentation, systems, and succession plans that keep it resilient beyond graduation.`
  }, {
    teams: [1987],
    category: `Culture`,
    title: `Beyond the Robot: Cultivating a Culture of Transformation`,
    presenters: `Hillary Griffith &amp; Lynn Griffith`,
    blurb: `How to shift your team's focus from technical output to genuine student development, aligning daily actions with your mission so the robot becomes a vehicle for transformative growth.`
  }, {
    teams: [1987, 1939],
    category: `Event Logistics`,
    title: `Fireside Chat with an FTA, Head Ref, and Lead Robot Inspector`,
    presenters: `Ken Schenke, Cameron Talley, &amp; Andy Shimamoto`,
    blurb: `Ask anything: three veteran volunteers with a combined 30 years of experience answer your inspection and on-field questions.`
  }, {
    teams: [1989],
    category: `Awards`,
    title: `Impact Panel`,
    presenters: `Victoria Cook &amp; Andy Shimamoto`,
    blurb: `A panel of veteran mentors on the criteria and strategies behind winning Impact submissions, crafting your team's story, and demonstrating community impact&mdash;plus time for your questions.`
  }, {
    teams: [5126],
    category: `Event Logistics`,
    title: `Volunteer for FIRST`,
    presenters: `Melinda Mongar`,
    blurb: `Why volunteering with FIRST is one of the most rewarding ways to give back&mdash;and how a few hours can open doors to a STEM career.`
  }, {
    teams: [5268],
    category: `Technical`,
    title: `You Only Need to Build Two Types of Robots`,
    presenters: `David Swed`,
    blurb: `Every FRC game in the last 15 years can be played with just two robot architectures. Learn what to prep in the offseason so build season goes to creativity and prototyping, not reinventing the wheel.`
  }, {
    teams: [6424],
    category: `Culture`,
    title: `More Than Robots`,
    presenters: `Ruth Adams`,
    blurb: `How Gracious Professionalism shapes team culture, competition, and the relationships that outlast the season.`
  }, {
    teams: [9410],
    category: `Technical`,
    title: `It Works&mdash;But Is It Good Code?`,
    presenters: `Chad Lee`,
    blurb: `Clean-code and software-design principles for FRC teams ready to move past "it works" toward code that's understandable, maintainable, and reusable season after season.`
  }, {
    teams: [9410],
    category: `Technical`,
    title: `Coding With AI: From Prompt to Proven Code`,
    presenters: `Chad Lee`,
    blurb: `Practical ways FRC students can use AI to learn concepts, explore APIs, and generate code&mdash;while still verifying and understanding what it produces.`
  }];

  function formatTeams(teams) {
    if (teams.length === 1) return 'Team ' + teams[0];
    if (teams.length === 2) return 'Teams ' + teams[0] + ' &amp; ' + teams[1];
    return 'Teams ' + teams.slice(0, -1).join(', ') + ', &amp; ' + teams[teams.length - 1];
  }

  var grid = document.getElementById('session-grid');
  var filterContainer = document.getElementById('session-filters');
  var sortSelect = document.getElementById('session-sort');
  var activeFilter = 'all';

  function cardHTML(s) {
    return '<div class="column is-4-desktop is-6-tablet">' +
      '<div class="box">' +
      '<p class="tag ' + (CATEGORY_TAGS[s.category] || 'is-light') + '">' + s.category + '</p>' +
      '<p><strong>' + s.title + '</strong><br/>' + s.presenters + ' &mdash; ' + formatTeams(s.teams) + '</p>' +
      '<p>' + s.blurb + '</p>' +
      '</div></div>';
  }

  function refresh() {
    var list = SESSIONS.filter(function (s) { return activeFilter === 'all' || s.category === activeFilter; });
    var mode = sortSelect.value;
    list = list.slice().sort(function (a, b) {
      if (mode === 'team') return a.teams[0] - b.teams[0];
      if (mode === 'category') return a.category.localeCompare(b.category);
      return a.title.localeCompare(b.title);
    });
    grid.innerHTML = list.map(cardHTML).join('');
  }

  var categories = Array.from(new Set(SESSIONS.map(function (s) { return s.category; }))).sort();
  ['all'].concat(categories).forEach(function (value) {
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'tag is-medium';
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.setAttribute('aria-pressed', 'false');
    button.textContent = value === 'all' ? 'All' : value;
    button.addEventListener('click', function () {
      activeFilter = value;
      Array.from(filterContainer.children).forEach(function (el) {
        var isActive = el === button;
        el.classList.toggle('is-dark', isActive);
        el.setAttribute('aria-pressed', String(isActive));
      });
      refresh();
    });
    filterContainer.appendChild(button);
  });
  filterContainer.firstChild.classList.add('is-dark');
  filterContainer.firstChild.setAttribute('aria-pressed', 'true');

  sortSelect.addEventListener('change', refresh);

  refresh();
})();
</script>
{% endraw %}
