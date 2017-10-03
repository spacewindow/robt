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
      prevSlideVideo.currentTime = 0;
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

// scrolling animation

var lastScroll = 0;

var scrollDirection = function(section) {
  if (section.scrollTop > lastScroll) {
    lastScroll = section.scrollTop;
    return 'down';
  } else {
    lastScroll = section.scrollTop;
    return 'up';
  }
};

var cgu_mod_TL = new TimelineMax({paused: true});

$(window).on('load', function() {

  cgu_mod_TL
    .from('[src*="mod-block-1"]', 1, {
      x: '-50%',
      y: '-100%'
    }, 'start+=0.3')
    .from('[src*="mod-block-2"]', 1, {
      x: '20%',
      y: '-20%'
    }, 'start')
    .from('[src*="mod-block-3"]', 1, {
      x: '50%',
      y: '-150%'
    }, 'start+=0.3')
    .from('[src*="mod-block-4"]', 1, {
      x: '50%',
      y: '70%'
    }, 'start+=0.6')
  ;

  $(window).on('scroll', function(){
    // modular blocks animation
    var cgu_mod_progress = progress('#email-main', 200);
    cgu_mod_TL.progress(cgu_mod_progress);

    // mobile mail animation
    var cgu_mail_progress = progress('#cgu-mobile-edm', 400);
    console.log(cgu_mail_progress);
    $('#cgu-mobile-edm').css('transform', 'translateY(-' + 32 * cgu_mail_progress + '%)');

  });

});


function progress(element, offsetStart){ // element is the selector string

  var scrollElement= $(element);
  var scrollTopStart = scrollElement.offset().top - offsetStart;
  var scrollTopEnd = scrollElement.height() / 2 + scrollTopStart;

  var currentPosition = window.scrollY;
  var progress;
  if (currentPosition < scrollTopStart) {
      progress = 0;
  } else if (currentPosition > scrollTopEnd) {
      progress = 100;
  } else {
      progress = ((currentPosition - scrollTopStart) / (scrollTopEnd - scrollTopStart));
  }
  return progress;

}



$(document).ready(function() {

  var sliderHangtime = makeSlider("slider-hangtime");
  var sliderCampaigns = makeSlider("slider-campaigns");
  var sliderCharts = makeSlider("slider-charts");
  var sliderDownload = makeSlider("slider-download");
  var sliderWattyl1 = makeSlider("slider-wattyl1");
  var sliderWattyl2 = makeSlider("slider-wattyl2");
  var sliderPoetry = makeSlider("slider-poetry");

  $('#wattyl-video').on('click', function(){
    $(this).removeClass('placeholder').children('video').get(0).play();
  });

  var redHighlights = $('[src*="email-red"]');
  var redTL = new TimelineMax({repeat: -1});

  redTL
  .staggerFrom(redHighlights, 0.4, {
    opacity:0
  }, 1.5, 'start')
  .staggerTo(redHighlights, 0.4, {
    opacity:0,
    delay: 1.5
  }, 1.5, 'start');

  $('.app__menu__button').click(function(){
    $('.app__menu').toggleClass('show');
  });


});
