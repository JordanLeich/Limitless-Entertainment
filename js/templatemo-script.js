const reqURL = "https://api.rss2json.com/v1/api.json?rss_url=" +
  encodeURIComponent("https://www.youtube.com/feeds/videos.xml?channel_id=");

function loadVideo(iframe) {
  $.getJSON(reqURL + iframe.getAttribute('cid'), function (data) {
    const videoNumber = (iframe.getAttribute('vnum') ? Number(iframe.getAttribute('vnum')) : 0);
    console.log(videoNumber);
    const link = data.items[videoNumber].link;
    const id = link.substr(link.indexOf("=") + 1);
    iframe.setAttribute("src", `https://youtube.com/embed/${id}?controls=0&autoplay=1`);
  });
}

const iframes = document.getElementsByClassName('latestVideoEmbed');
Array.from(iframes).forEach(loadVideo);

const initBg = (autoplay = true) => {
  const bgImgs = ['forza.jpg', 'ascension.jpg', 'skyrim.jpg', 'anor.jpg', 'gorod.png']
    .map(img => `img/${img}`);

  $.backstretch(bgImgs, { duration: 3000, fade: 3000 });

  if (!autoplay) {
    $.backstretch('pause');
  }
};

const setBg = id => {
  $.backstretch('show', id);
};

const setBgOverlay = () => {
  const windowWidth = window.innerWidth;
  const bgHeight = $('body').height();
  const tmBgLeft = $('.tm-bg-left');

  $('.tm-bg').height(bgHeight);

  if (windowWidth > 768) {
    tmBgLeft.css('border-left', '0').css('border-top', `${bgHeight}px solid transparent`);
  } else {
    tmBgLeft.css('border-left', `${windowWidth}px solid transparent`).css('border-top', '0');
  }
};

$(document).ready(function () {
  const autoplayBg = true; // set Auto Play for Background Images
  initBg(autoplayBg);
  setBgOverlay();

  const bgControlsWrapper = $(".tm-bg-controls-wrapper");
  const bgControlTemplate = '<li class="tm-bg-control" data-id="%id%"></li>';

  // Dynamically generate background controls based on the number of images
  const bgImgsCount = 0; // Adjust this based on the actual number of background images
  for (let i = 0; i < bgImgsCount; i++) {
    bgControlsWrapper.append(bgControlTemplate.replace('%id%', i));
  }

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
    const current = bgControlsWrapper.find(`[data-id=${index}]`);
    current.addClass('active');
  });

  $(window).resize(function () {
    setBgOverlay();
  });
});

