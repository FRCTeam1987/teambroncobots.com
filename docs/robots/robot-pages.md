---
layout: page
title: Robot Pages
subtitle: Robots
menubar: docs_menu
show_sidebar: false
toc: true
---

## Robots Directory

Start by creating a `_robots` directory to hold your robot pages.

## Robot Pages

 Create a new page for each robot, such as `robot1.md`. In the front matter for this page you can set the standard settings, such as your title, subtitle, description (for meta-description), hero_image, as well as the additional robot settings such as price, robot_code, image, features, and rating. 

```yaml
title: Robot 1 Name
subtitle: Robot 1 tagline here
description: This is a robot description
hero_image: /img/hero-img.jpg
robot_code: ABC124
layout: robot
image: https://via.placeholder.com/640x480
price: £1.99 + VAT
features:
    - label: Great addition to any home
      icon: fa-location-arrow
    - label: Comes in a range of styles
      icon: fa-grin-stars
    - label: Available in multiple sizes
      icon: fa-fighter-jet
rating: 3
```

The text you write for the page content will be displayed as the robot description. 

[View example Robot page](/bulma-clean-theme/robots/robot2/)

## Robot Collections 

Next, add the following to your `_config.yml` to use collections to process the robot pages and output them as individual pages. 

```yaml
collections:
  robots: 
    output: true
    layout: robot
    image: https://via.placeholder.com/800x600
    show_sidebar: false
```

You can also set default robot page values here if you like, such as the layout or image. 
