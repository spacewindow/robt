function makeSlider(divID) {
  var slider = $("#" + divID).royalSlider({
    imageScaleMode: 'fit',
    controlNavigation: 'none',
    arrowsNav: false
  }).data('royalSlider');

  var customNav = $("#" + divID + '-nav');
  sliderLeft = customNav.children(".slider__arrow--left");
  sliderRight = customNav.children(".slider__arrow--right");

  // slider Nav

  sliderLeft.click(function() {
    slider.prev();
  });
  sliderRight.click(function() {
    slider.next();
  });

  // set Nav state

  slider.ev.on('rsAfterSlideChange', function(){
    if (slider.currSlideId === 0){
      customNav.attr('class', 'slider__nav start');
    }else if(slider.currSlideId === (slider.numSlides - 1)){
      customNav.attr('class', 'slider__nav end');
    }else{
      customNav.attr('class', 'slider__nav middle');
    }
  });

  // play Videos on slide

  var prevSlideVideo;
  var playSlideVideo = function() {
    if (prevSlideVideo) {
      prevSlideVideo.pause();
    }
    var video = slider.currSlide.content.find('video');
    if (video.length) {
      prevSlideVideo = video[0];
      prevSlideVideo.play();
    } else {
      prevSlideVideo = null;
    }
  };
  slider.ev.on('rsAfterSlideChange', playSlideVideo);
  playSlideVideo();

  return slider;
}



$(document).ready(function() {

  var slider1 = makeSlider("slider-hangtime");


});
