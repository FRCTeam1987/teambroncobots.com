---
layout: page
title: Branding
subtitle: Our Team Identity
show_sidebar: false
hero_image: ../images/Assets/Branding/HighResBroncobotLogo.png
hero_darken: true 
hero_height: is-large
--- 
<div class="full" style="text-align: center">
<p>Branding is a vital and crucial part of Team 1987. Below you can find our standards in branding.</p>

<h2><center>Logo</center></h2>

<p>Our team offers three usable logos. </p>

<p>We offer a scalable svg file, used when possible.</p>

<a href="../images/Assets/Branding/broncobots.svg" download>
    <img width="300px" src="../images/Assets/Branding/broncobots.svg" alt="../images/NoImage.png">
</a>
                                               
<p>In addition we provide a high resolution logo. Used whenever svg is not a viable option and it is expected to be enlarged or seen at a large scale.</p>
<a href="../images/Assets/Branding/HighResBroncobotLogo.png" download>
    <img width="300px" src="../images/Assets/Branding/HighResBroncobotLogo.png" alt="../images/NoImage.png">
</a>
<p>Completing the set we have the original Broncobots logo. In its original quality, to be used when the logo is smaller scaled or when the only feasable option.</p>
<a href="../images/Assets/Branding/OfficialBroncobotLogo.png" download>
    <img width="300px" src="../images/Assets/Branding/OfficialBroncobotLogo.png" alt="../images/NoImage.png">
</a>
<h2>Colors</h2>
<p> Our team colors are Maroon, Black, and Gray. We determine which color is used based off of availability and choice of the creator.</p>

<a href="../images/Assets/Branding/colors.png" download>
    <img src="../images/Assets/Branding/colors.png" alt="../images/NoImage.png">
</a>

<h2>Fonts</h2>
<p>We use Rockwell as our team font. Used in all logos, when available.</p>
<p class="hidden-when-failed" style="color: black; font-family: Rockwell; font-size: 64px;">Rockwell</p>
<p class="hidden-when-failed" style="color: black; font-family: Rockwell; font-size: 28px;">"The quick brown fox jumps over the lazy dog."</p>
<p id="font-message" style="color: red; font-size: 16px;" class="font-message"></p>
</div>



<style>
    .font-message {
        color: black;
        font-family: Rockwell, sans-serif;
        font-size: 28px;
    }
</style>
<script>
    function isFontLoaded(fontName) {
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        var text = "abcdefghijklmnopqrstuvwxyz0123456789";
        context.font = "40px " + fontName + ", sans-serif";
        var originalWidth = context.measureText(text).width;
        context.font = "40px sans-serif";
        var fallbackWidth = context.measureText(text).width;
        return originalWidth !== fallbackWidth;
    }
    
    // Check if Rockwell font is loaded
    window.onload = function() {
        if (!isFontLoaded("Rockwell")) {
            var messageElement = document.getElementById("font-message");
            messageElement.innerHTML = "It appears that you're using a browser that is not compatible with the Rockwell font. This can be caused by an unexpected MIME type and/or an outdated browser. For the best viewing experience please use a different browser.";
            
            // Hide the lines that should only be displayed when Rockwell font is rendered correctly
            var hiddenElements = document.getElementsByClassName("hidden-when-failed");
            for (var i = 0; i < hiddenElements.length; i++) {
                hiddenElements[i].style.display = "none";
            }
        }
    }
</script>
