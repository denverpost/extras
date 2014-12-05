function scrollDownTo(whereToScroll, scrollOffset) {
    scrollOffset = typeof scrollOffset !== 'undefined' ? scrollOffset : 60;
    $('html,body').animate({
        scrollTop: ($(whereToScroll).offset().top - scrollOffset)
    }, 300);
}

function getNodePosition(node) {
    var eTop = $(node).offset().top;
    return Math.abs(eTop - $(window).scrollTop());
}
function isElementInViewport(el) {
    var rect = document.getElementById(el).getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document. documentElement.clientWidth) /*or $(window).width() */ &&
        rect.top < (window.innerHeight || document. documentElement.clientHeight) /*or $(window).height() */;
}

$('.top-top').click(function(evt) {
    $('.toggle-topbar').click();
});

var moreAd = true;
var titleFade = true;

function fadeNavBar(reverse) {
    if (reverse) {
        $('#name1').animate({opacity:1},500);
        $('#name2').animate({opacity:0},500);
        titleFade = true;
    } else {
        $('#name1').animate({opacity:0},500);
        $('#name2').animate({opacity:1},500);
        titleFade = false;
    }
}

function hideAdManual() {
    $('#adwrapper').fadeOut(300);
    $('#adwrapper a.boxclose').css('display', 'none');
    $('#footer-bar').delay(150).animate({marginBottom:'0'},300);
    $('#adframewrapper').html('');
    moreAd = false;
}

$(document).keyup(function(e) {
    if (!moreAd && e.keyCode == 27) {
        hideAdManual();
    }    
});

function getAdSize() {
    if ( $(window).width() >= 740 ) {
        var adSizes = ['ad=medium','728','90'];
        return adSizes;
    } else {
        return false;
    }
    /* else if ( $(window).width() >= 300 && $(window).width() < 740 ) {
        var adSizes = ['ad=small','300','50'];
        return adSizes;
    }*/
}

function showAd() {
    var adSize = getAdSize();
    if (moreAd && adSize) {
        $('#adframewrapper').html('<iframe src="' + pathRoot + 'ad.html?' + adSize[0] + '" seamless height="' + adSize[2] + '" width="' + adSize[1] + '" frameborder="0"></iframe>');
        $('#adwrapper').fadeIn(400);
        $('a.boxclose').fadeIn(400);
        var adH = $('#adwrapper').height();
        $('#footer-bar').css('margin-bottom',adH);
        moreAd = false;
    }
}

function getAdTimes(numAds) {
    var adReturns = [];
    var docHeight = $(document).height();
    var chunkHeight = docHeight / numAds;
    var innerHeight = (window.innerHeight * 2);
    for (i=1;i<=numAds;i++) {
        adReturns.push( Math.round( innerHeight + (chunkHeight * i) ) );
    }
    return adReturns;
}

var adTimes = getAdTimes(1);

$(document).ready(function() {
    checkHash();
    if ( !isElementInViewport('intro') && titleFade ) {
        fadeNavBar(false);
    }
    if ( $(window).scrollTop() > adTimes[0] ) {
        if (moreAd) {
            showAd();
        }
    }
});

$(window).scroll(function() {
    for (var i = 1; i < adTimes.length; i++) {
        if (adTimes[i] > ($(window).scrollTop() - 35) && adTimes[i] < ($(window).scrollTop() + 35)) {
            hideAdManual();
            moreAd = true;
        }
    }
    if ($(window).scrollTop() > adTimes[0] ) {
        if (moreAd) {
            showAd();
        }
    }
    if ( !isElementInViewport('intro') && titleFade ) {
        fadeNavBar(false);
    } else if (isElementInViewport('intro') && !titleFade) {
        fadeNavBar(true);
    }
});