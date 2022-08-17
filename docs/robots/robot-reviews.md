---
layout: page
title: Robot Reviews
subtitle: Robots
menubar: docs_menu
show_sidebar: false
toc: true
---

## Robot Reviews

To add reviews to your robot page, create a `reviews` directory in the `_data` directory and add a yaml file with the name of the robot_code from the robot page, for example `_data/reviews/ABC124.yml`. 

Create the reviews using the following format:

```yaml
- name: Mr E Xample
  rating: 4
  title: Great robot, highly recommended
  date: 2019-01-01
  avatar: https://bulma.io/images/placeholders/128x128.png
  description: >
    The robot worked really well. I would recommend this to most people to use. Delivery was quick and reasonable. 
    Would recommend this to my friends. 
- name: Mrs R E View
  rating: 5
  title: Nice, really liked this
  date: 2019-02-02
  description: >
    The robot worked exactly as described. 
```

If you don't want to display an avatar image then a default user icon will be displayed. If you don't want to display a rating then omit it from the yaml file.
