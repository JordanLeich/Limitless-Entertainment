var reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");

function loadVideo(iframe) {
  $.getJSON(reqURL + iframe.getAttribute('cid'),
    function (data) {
      var videoNumber = (iframe.getAttribute('vnum') ? Number(iframe.getAttribute('vnum')) : 0);
      console.log(videoNumber);
      var link = data.items[videoNumber].link;
      id = link.substr(link.indexOf("=") + 1);
      iframe.setAttribute("src", "https://youtube.com/embed/" + id + "?controls=0&autoplay=1");
    }
  );
}

var iframes = document.getElementsByClassName('latestVideoEmbed');
for (var i = 0, len = iframes.length; i < len; i++) {
  loadVideo(iframes[i]);
}


const initBg = (autoplay = true) => {
  const bgImgsNames = ['diagoona-bg-1.jpg', 'diagoona-bg-2.jpg', 'diagoona-bg-3.jpg'];
  const bgImgs = bgImgsNames.map(img => "img/" + img);

  $.backstretch(bgImgs, { duration: 4000, fade: 500 });

  if (!autoplay) {
    $.backstretch('pause');
  }
}

const setBg = id => {
  $.backstretch('show', id);
}

const setBgOverlay = () => {
  const windowWidth = window.innerWidth;
  const bgHeight = $('body').height();
  const tmBgLeft = $('.tm-bg-left');

  $('.tm-bg').height(bgHeight);

  if (windowWidth > 768) {
    tmBgLeft.css('border-left', `0`)
      .css('border-top', `${bgHeight}px solid transparent`);
  } else {
    tmBgLeft.css('border-left', `${windowWidth}px solid transparent`)
      .css('border-top', `0`);
  }
}

$(document).ready(function () {
  const autoplayBg = true;	// set Auto Play for Background Images
  initBg(autoplayBg);
  setBgOverlay();

  const bgControl = $('.tm-bg-control');
  bgControl.click(function () {
    bgControl.removeClass('active');
    $(this).addClass('active');
    const id = $(this).data('id');
    setBg(id);
  });

  $(window).on("backstretch.after", function (e, instance, index) {
    const bgControl = $('.tm-bg-control');
    bgControl.removeClass('active');
    const current = $(".tm-bg-controls-wrapper").find(`[data-id=${index}]`);
    current.addClass('active');
  });

  $(window).resize(function () {
    setBgOverlay();
  });
});