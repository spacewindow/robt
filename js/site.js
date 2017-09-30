function makeSlider(divID) {
  var sliderDiv = $("#" + divID);
  if (sliderDiv.length === 0) {
    return null;
  }
  var slider = $("#" + divID).royalSlider({
    imageScaleMode: 'fit',
    controlNavigation: 'none',
    arrowsNav: true,
    fullscreen: {
  		// fullscreen options go gere
  		enabled: true,
  		nativeFS: true,
      buttonFS: true
  	}
  }).data('royalSlider');

  // add rsDefault styles

  sliderDiv.addClass('royalSlider rsDefault');

  // slider Nav

  var customNav = $("#" + divID + '-nav');
  // init style
  customNav.addClass('start');
  sliderLeft = customNav.children(".slider__arrow--left");
  sliderRight = customNav.children(".slider__arrow--right");

  sliderLeft.click(function() {
    slider.prev();
  });
  sliderRight.click(function() {
    slider.next();
  });

  // Captions

  var captions = $("#" + divID + '-captions');
  // init styles
  captions.children().first().addClass('current');
  // set Nav state

  slider.ev.on('rsBeforeAnimStart', function() {
    if (slider.currSlideId === 0) {
      customNav.attr('class', 'slider__nav start');
    } else if (slider.currSlideId === (slider.numSlides - 1)) {
      customNav.attr('class', 'slider__nav end');
    } else {
      customNav.attr('class', 'slider__nav middle');
    }
    //remove current class from all captions, then add to current
    captions.children().removeClass('current').eq(slider.currSlideId).addClass('current');
  });

  // fullscreen

  var fsButton = $("#" + divID + '-fullscreen');

  fsButton.on('click', function(){
    slider.enterFullscreen();
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

  var sliderHangtime = makeSlider("slider-hangtime");
  var sliderCampaigns = makeSlider("slider-campaigns");
  var sliderCharts = makeSlider("slider-charts");
  var sliderCharts = makeSlider("slider-download");


});
