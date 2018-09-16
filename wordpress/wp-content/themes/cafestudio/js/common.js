
/*-------------------------------------------------- loader --------------------------------------------------*/

/*------------------------- loading -------------------------*/

/*----- home -----*/
jQuery(function(){
    var h = jQuery(window).height();
    if (jQuery(window).width() >= 1080) {
        jQuery("#kv").height(h - 160);
    } else {
        jQuery("#kv").height(h - 60);
    }
    jQuery("#loaded").css("opacity","0");
    jQuery("#loading").height(h).css("display","block");
    jQuery("body.home #loading .logo").delay(500).fadeIn(500);
    jQuery("#loading .bg").delay(500).fadeIn(500);
});
jQuery(window).load(function() {
    setTimeout(function () {
        jQuery("body.home #logo02").fadeIn(200);
        var logo02 = new Vivus("logo02", {type: "scenario-sync", duration: 5, pathTimingFunction: Vivus.EASE })
    }, 100);
    setTimeout(function () {
        jQuery("body.home #logo03").fadeIn(500);
    }, 500);
    jQuery("body.home #loading .loader").delay(250).fadeOut(250);
    jQuery("body.home #loading .bg").delay(3000).fadeOut(500);
    jQuery("body.home #loading .logo").delay(3000).fadeOut(500);
    jQuery("body.home #loading").delay(3000).fadeOut(500);
    jQuery("body.home #loaded").css("opacity","1");
    jQuery("body.home #header h1").delay(3000).animate({"top":"20px","opacity":"1"},600,"easeInQuart");
    jQuery("body.home #kv .text .copy").delay(3000).animate({"margin-top":"0"},600,"easeInQuart");
    jQuery("body.home #kv .text .name").delay(3000).animate({"margin-top":"0"},1000,"easeInQuart");
    jQuery("body.home #kv .bg").delay(3000).animate({"opacity":"1"},1000);
    //lower
    jQuery("body.single #loaded,body.page #loaded,body.search #loaded").css("opacity","1");
    jQuery("body.single #loading,body.page #loading,body.search #loading").delay(500).fadeOut(500);
    jQuery("body.single #loading .bg,body.page #loading .bg,body.search #loading .bg").delay(500).fadeOut(500);
    jQuery("body.single #header h1,body.page #header h1,body.search #header h1").delay(500).animate({"top":"20px","opacity":"1"},600,"easeInQuart");
});
jQuery(function(){
    setTimeout(function () {
        jQuery("body.home #loading .loader").delay(250).fadeOut(250);
        jQuery("body.home #loading .bg").delay(3000).fadeOut(500);
        jQuery("body.home #loading .logo").delay(3000).fadeOut(500);
        jQuery("body.home #loading").delay(3000).fadeOut(500);
        jQuery("body.home #loaded").css("opacity","1");
        jQuery("body.home #header h1").delay(3000).animate({"top":"20px","opacity":"1"},600,"easeInQuart");
        jQuery("body.home #kv .text .copy").delay(3000).animate({"margin-top":"0"},600,"easeInQuart");
        jQuery("body.home #kv .text .name").delay(3000).animate({"margin-top":"0"},1000,"easeInQuart");
        jQuery("body.home #kv .bg").delay(3000).animate({"opacity":"1"},1000);
        //lower
        jQuery("body.single #loaded,body.page #loaded,body.search #loaded").css("opacity","1");
        jQuery("body.single #loading,body.page #loading,body.search #loading").delay(500).fadeOut(500);
        jQuery("body.single #loading .bg,body.page #loading .bg,body.search #loading .bg").delay(500).fadeOut(500);
        jQuery("body.single #header h1,body.page #header h1,body.search #header h1").delay(500).animate({"top":"20px","opacity":"1"},600,"easeInQuart");
    }, 5000);
});

/*-------------------------------------------------- loaded --------------------------------------------------*/
jQuery(window).load(function(){

    "use strict";

    /*------------------------- schedule -------------------------*/
    if (jQuery(window).width() < 1080) {
        jQuery("body.home #schedule .content_toggle").css({"height":"0"});
    }
    jQuery("#schedule .btn_toggle").click(function(){
        if(jQuery("#schedule .btn_toggle").hasClass("active")) {
            jQuery("#schedule .content_toggle").css({"height":"0"});
            jQuery("#schedule .btn_toggle").removeClass("active");
        } else {
            jQuery("#schedule .content_toggle").css({"height":"auto"});
            jQuery("#schedule .btn_toggle").addClass("active");
        }
    });

    /*------------------------- header -------------------------*/
    jQuery(window).on("scroll", function() {
        if (jQuery(this).scrollTop() > 80) {
            jQuery("#header").addClass("scroll");
        } else {
            jQuery("#header").removeClass("scroll");
        }
    });
    jQuery("#btn_gnav,#gnav .bg").click(function(){
        jQuery("#btn_gnav").toggleClass("active");
        jQuery("#header").toggleClass("open");
        if(jQuery("#btn_gnav").hasClass("active")) {
            jQuery("#gnav").animate({"left":"0"},500,"easeOutQuart");
            jQuery("#gnav .bg").fadeIn(500);
            setTimeout(function () {
                jQuery("#logo04").fadeIn(500);
                var logo04 = new Vivus("logo04", {type: "scenario-sync", duration: 7.5, pathTimingFunction: Vivus.EASE })
                jQuery("#logo05").fadeIn(500);
            }, 500);
            setTimeout(function () {
                var delaySpeed = 150;
                var fadeSpeed = 500;
                jQuery("#gnav .content ul li").each(function(i){
                    jQuery(this).delay(i*(delaySpeed)).animate({"margin-left":"0","opacity":"1"},fadeSpeed);
                });
            }, 500);
            setTimeout(function () {
                jQuery("#gnav .content .bottom").fadeIn(500);
            }, 500);
            jQuery("#header").animate({"opacity":"0"});
        } else {
            if (jQuery(window).width() >= 1080) {
                jQuery("#gnav").animate({"left": "-50%"}, 500, "easeOutQuart");
            } else {
                jQuery("#gnav").animate({"left": "-100%"}, 500, "easeOutQuart");
            }
            jQuery("#gnav .bg").fadeOut(500);
            jQuery("#logo04").fadeOut(500);
            jQuery("#logo05").fadeOut(500);
            jQuery("#gnav .content ul li").animate({"margin-left":"-20px","opacity":"0"},500,"easeOutQuart");
            jQuery("#gnav .content .bottom").fadeOut(500);
            jQuery("#header").animate({"opacity":"1"});
        }
    });

    /*------------------------- pallarax -------------------------*/
    jQuery(window).scroll(function () {
        var scrolled = jQuery(window).scrollTop();
        if (jQuery(window).width() >= 1080) {
            jQuery("#kv .text").css("margin-top", ((scrolled * .2) - 80) + "px");
            jQuery("#schedule").css("background-position-y", ((scrolled * -.08)) + "px");
        }
    });

    /*------------------------- inview -------------------------*/
    jQuery("#intro p").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery("#intro p").delay(500).animate({"margin-top":"0","opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#menu").on("inview", function(event, isInView) {
        if (isInView) {
            setTimeout(function () {
                jQuery("#menu .left .ttl").delay(500).animate({"top":"0","left":"1"},750,"easeOutQuart");
                jQuery("#menu .left .bg").delay(500).animate({"bottom":"0","right":"1"},750,"easeOutQuart");
            }, 500);
            setTimeout(function () {
                var delaySpeed = 300;
                var fadeSpeed = 600;
                jQuery("#menu .right ul li").each(function(i){
                    jQuery(this).delay(i*(delaySpeed)).animate({"opacity":"1"},fadeSpeed);
                });
                jQuery("#menu .right ul li .thumb").each(function(i){
                    jQuery(this).delay(i*(delaySpeed)).animate({"margin-top":"5px","margin-bottom":"5px","margin-left":"5px","width":"135px"});
                });
            }, 1000);
        }
    });
    jQuery("#schedule").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery("#schedule").delay(500).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#plan").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery("#plan .left").delay(750).animate({"left":"0","opacity":"1"},1000,"easeOutQuart");
            jQuery("#plan .right").delay(750).animate({"right":"0","opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#promotion").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery("#promotion .left").delay(750).animate({"left":"0","opacity":"1"},1000,"easeOutQuart");
            jQuery("#promotion .right").delay(750).animate({"right":"0","opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#instagram").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery("#instagram .wrap_widget").delay(500).animate({"padding-top":"0","opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#footer").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery("#footer").delay(500).animate({"opacity":"1"},1000,"easeOutQuart");
            jQuery("#footer .before").delay(500).animate({"left":"0","width":"100%"},1000,"easeOutQuart");
            jQuery("#footer .after").delay(500).animate({"left":"0","width":"100%"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_01").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_02").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_03").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_04").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_05").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_06").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_07").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("#main .wrap_sec_menu_08").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("body.page-id-21 #main .sec01").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("body.page-id-21 #main .sec02").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("body.page-id-21 #main .sec03").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("body.page-id-23 #main .sec01").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("body.page-id-23 #main .sec02").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("body.page-id-23 #main .sec03").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });
    jQuery("body.page-id-23 #main .sec04").on("inview", function(event, isInView) {
        if (isInView) {
            jQuery(this).delay(100).animate({"opacity":"1"},1000,"easeOutQuart");
        }
    });

});













