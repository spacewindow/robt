function makeSlider(id, type) {

}



$(document).ready(function() {

  var sliderDivID = "slider-hangtime";
  var sliderNavID = sliderDivID + "-nav";
  var slider = $("#" + sliderDivID).royalSlider({
    imageScaleMode: 'fit',
    controlNavigation: 'none',
    arrowsNav: false
  }).data('royalSlider');

  var sliderNav = $("#" + sliderNavID);
  var sliderLeft = sliderNav.children(".slider__arrow--left");
  var sliderRight = sliderNav.children(".slider__arrow--right");

  console.log(sliderLeft);
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
      sliderNav.attr('class', 'slider__nav start');
    }else if(slider.currSlideId === (slider.numSlides - 1)){
      sliderNav.attr('class', 'slider__nav end');
    }else{
      sliderNav.attr('class', 'slider__nav middle');
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

});
