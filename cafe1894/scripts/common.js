var ua = navigator.userAgent.toLowerCase();
$.ua = {
  isWindows: /windows/.test(ua),  // Windows
  isMac: /macintosh/.test(ua),  // Mac
  isIE: /msie (\d+)/.test(ua),  // IE
  isIE6: /msie (\d+)/.test(ua) && RegExp.$1 == 6,  // IE6
  isIE7: /msie (\d+)/.test(ua) && RegExp.$1 == 7,  // IE7
  isLtIE8: /msie (\d+)/.test(ua) && RegExp.$1 < 8,  // IE8未満
  isLtIE9: /msie (\d+)/.test(ua) && RegExp.$1 < 9,  // IE9未満
  isFirefox: /firefox/.test(ua),  // Firefox
  isWebKit: /applewebkit/.test(ua),  // WebKit
  isTouchDevice: 'ontouchstart' in window,  // touchDevice
  isIOS: /i(phone|pod|pad)/.test(ua),  // iOS
  isIPhone: /i(phone|pod)/.test(ua),   // iPhone, iPod touch
  isIPad: /ipad/.test(ua),  // iPad
  isAndroid: /android/.test(ua),  // Android
  isAndroidMobile: /android(.+)?mobile/.test(ua)  // Android mobile
};


var el = $("<div>");
$.supportBrowser = {
  transform  : typeof el.css("transform") === "string",
  transition : typeof el.css("transitionProperty") === "string"
};


/*
if (!('console' in window)) {
  window.console = {};
  window.console.log = function(str){
    //return str;
  };
}
*/
if(/index_.php/.test(location.href)){
  location.href = './';
}

var common = {

  init : function(){
    for (var key in this) {
      var member = this[key];
      if (typeof member != 'object') {
        continue;
      }
      member.root = this;
    }

    var self = this;
    self.lang = $('html').hasClass('en') ? 'en' : 'ja';

    self.setBodyClass();

    $(function(){
      self.winInit();
      self.hashChange();
      self.supersize.init();
      self.commonElements.init();
      self.sns.init();
      self.globalNav.init();
      self.globalPager.init();
      self.addEvent();
      self.scope();
      self.setPopup();
      self.smoothscroll();
      self.overopacity();
      //各ページ
      self.loading.init();
      self.intro.init();
      self.top.init();
      self.hours.init();
      self.history.init();
      self.access.init();
      self.menu.init();
      self.drink.init();
      self.plan.init();
      self.media.init();
      self.premium.init();
      $('.over').rollover('_over');
    });
  },

  pageMoving: false,
  pageOrder: {
    loading:   0,
    intro:   0,
    top:     1,
    history: 2,
    hours:   3,
    access:  4,
    menu:    5,
    drink:   6,
    plan:    7,
    media:   8,
    premium:   9
  },
  currentPage: 'loading',
  loading: {
    init: function(){
      var self = this;
      self.$thisPage = $('#loading');
      self.$thisPage.show();
      self.$prog = $('#progressBar');
      self.checkDirectLink();
      self.progress();
    },
    progress: function(){
      var self = this;
      var dynamicImgs = [];
      //サンプル（imgを追加）;
/*
      for ( var i = 0; i < 20; i++){
        var img = new Image();
        var rand = Math.ceil(Math.random()*1000);
        img.src = 'http://lorempixel.com/400/400/?' + rand;
        dynamicImgs.push(img);
      }
*/
      var count = 0;
      var $bar = self.$prog.find('span');
      var $loadingImg = self.$prog.find('img');

      //render progress;
      $('.bg').imagesLoaded()
        .always( function( instance ) {
//          console.log('all images loaded');
          $('.page').css({visibility: 'visible'});
          self.hideLoading();
        })
        .done( function( instance ) {
//          console.log('all images successfully loaded');
        })
        .fail( function() {
//          console.log('all images loaded, at least one is broken');
        })
        .progress( function( instance, image ) {
          count++;
          var ratio = 100 / instance.images.length;
          $bar.animate({height: count * ratio + '%' },100);
          $loadingImg.animate({bottom: count * ratio + '%' },100);
        });
    },
    checkDirectLink: function(){
      var self = this;
      self.anc = getUrlVars('anc');
      if ( self.anc ){
        self.directLink = true;
      }
    },
    hideLoading: function(){
      var self = this;

//      //ダイレクトにリンク
//      if ( self.directLink ){
//        self.$prog.delay(500).animate({
//          bottom: '100%'
//        },1000,'easeInCubic',function(){
//          self.$prog.hide();
//          setTimeout(function(){
//            $('#globalNav').find('a[href*=#'+self.anc+']').click();
//          },500);
//          setTimeout(function(){
//            self.root.globalNav.show();
//            self.root.globalPager.showContent();
//            self.root.commonElements.showContent()
//          },2000);
//        });
      //hashChange
      if ( location.hash ){
        var hash = location.hash.replace(/#\//, '') || 'top';
        self.$prog.delay(2000).animate({
          bottom: '100%'
        },1000,'easeInCubic',function(){
          self.$prog.hide();
          setTimeout(function(){
            $(window).hashchange();
          },500);
          setTimeout(function(){
            self.root.globalNav.show();
            self.root.globalPager.showContent();
            self.root.commonElements.showContent()
          },2000);
        });
      } else {
        //イントロへ
        self.root.currentPage = 'intro',
        self.root.intro.showContent();
        self.$prog.delay(2000).animate({
          bottom: '100%'
        },1000,'easeInCubic',function(){
          self.$prog.hide();
          setTimeout(function(){
            self.$thisPage.stop(true,true).fadeOut(2000,'easeInOutCubic');
          },500);
        });
      }
    },
    showContent: function(){
    },
    hideContent: function(){
    }
  },

  commonElements: {
    init: function(){
      var self = this;
      self.$header = $('header');
      self.$footer = $('footer');
    },
    showContent: function(){
      var self = this;
      self.$header.animate({
        top: 0
      },500,'easeOutCubic');
      self.$footer.animate({
        bottom: 0
      },500,'easeOutCubic');
    }
  },

  globalNav: {
    init: function(){
      var self = this;
      self.$globalNav = $('#globalNav');
      self.$globalNav.find('ul').append('<div class="dot">');
      self.$dot = self.$globalNav.find('.dot');
      self.$globalNav.css({right: -200 });
      self.$navLi = self.$globalNav.find('li');
      self.$navLi.click(function(){
        var idx = self.$navLi.index(this);
        var next = $(this).find('a').attr('href').replace(/#/, '');
        var hash = location.hash.replace(/#\//, '');
        if ( self.root.pageMoving == false ){
          location.hash = '#/' + next;
          self.setCurrent(idx);
        }
      });

    },
    setCurrent: function(idx){
      var self = this;
      self.$navLi.removeClass('cur');
      self.$navLi.eq(idx).addClass('cur');
      self.$dot.stop().animate({
        top: idx*29+27
      },1000,'easeInOutQuint');

    },
    show: function(){
      var self = this;
      self.$globalNav.stop().animate({right: 0 },700,'easeOutCubic');
//      self.$globalNav.stop().fadeIn(700);
    },
    hide: function(){
      var self = this;
    }
  },
  hashChange: function(){
    var self = this;
    $(window).hashchange(function(){
      var hash = location.hash.replace(/#\//, '') || 'top';
      self.pageMoving = true;
      self.changePage.showContent(hash);
      //SNSボタンをアップデート
      var dir = hash != 'top' ? hash + '/' : ''
/*
      common.sns.createTweetBtn(dir);
      common.sns.createFaceBookBtn(dir);
*/
      //グローバルナビゲーションのカレント表示
      var idx = $('#globalNav').find('li').index( $('#globalNav').find('.nav_'+hash) );
      self.globalNav.setCurrent(idx);
    });
  },

  globalPager: {
    init: function(){
      var self = this;
      self.$pager = $('#globalPager');
      var $gabalNavli = $('#globalNav').find('li');
      var $next = self.$pager.find('.next');
      var $back = self.$pager.find('.back');

      self.$pager.find('li').click(function(){
        if ( self.root.pageMoving == false ){
          var idx = $gabalNavli.index( $('#globalNav').find('.cur'));
//          降順
          idx =  $(this).is('.next') ? idx +1 : idx-1;
//        逆順
//          idx =  $(this).is('.next') ? idx -1 : idx+1;
          //ループの場合じゃない場合
          idx = idx < 0 ? 0 :
                idx > 8 ? 8 :
                idx;

/*
          //ループの場合
          idx = idx < 0 ? 6 :
                idx > 6 ? 0 :
                idx;
          // changePage内でも止める必要あり
*/
          $('#globalNav').find('li').eq(idx).click();
        }
      });
    },
    showContent: function(){
      var self = this;
      self.$pager.show();
    },
    hide: function(){
      var self = this;

    }
  },


  intro: {
    init: function(){
      var self = this;
      self.$intro = $('#intro');
    },
    showContent: function(){
      var self = this;
      self.$intro.show();
      self.$intro.find('.enter').click(function(){
        self.$intro.find('.noSplit').fadeOut(function(){
          //モダンブラウザ向け
/*
          if ( $.supportBrowser.transform && $.supportBrowser.transition ){
            // ページを分割
            self.$intro.find('.splitL').removeClass('full');
            self.root.createSplitPage(self.$intro);
            $('#top').css({transform: 'scale(0.8,0.8)', transition: '0s', opacity:0, display: 'block'});
            self.root.changePage.contentPositonCenter($('#top'));

            // transition アニメーション
            setTimeout(function(){
              self.$intro.find('.splitL,.splitR').addClass('pers');
              self.root.currentPage = 'top';
              $('#top').css({transform: 'scale(1,1)', transition: '2000ms ease-out',opacity:1});
              setTimeout(function(){
                self.$intro.hide();
                self.root.globalNav.show();
              },2100);
            },0);
          } else {
*/
            //通常の遷移
//            self.root.changePage.showContent('top');
            location.hash = '/top';
            setTimeout(function(){
              self.root.globalNav.show();
              self.root.globalPager.showContent();
              self.root.commonElements.showContent()
            },1000);
/*           } */
        });
      });
    },
    hideContent: function(){
    }
  },
  scope: function(){
    //共通イベント
    //scope マウスオーバー
    self.$page = $('.page');
    $('.scope').each(function(){
      var scopeTimer;
      var $this = $(this);
      var $icn = $this.find('img');
      var $home = $this.parents('.bgWrap');
      //.infoの大きさを固定
      var $info = $this.find('.info');
      $info.css({
        width: $info.width(),
        height: $info.height()
      })
      //.maskを生成
      var h = $info.outerHeight();
      var w = $info.outerWidth();
      $info.wrap('<div class="mask" />');
      var $mask = $this.find('.mask');
      //.cloneを生成
      var $clone = $mask.clone().addClass('clone').insertBefore($mask);
      $clone.find('p').remove();
      //開くスピード
      var speed = 0.5;
      var is_animate = false;
      $this.on({
        mouseenter: function(){
          if ( is_animate == false ){
            clearTimeout(scopeTimer);
            is_animate = true;
            var pos = {
              left: $this.offset().left,
              top:  $this.offset().top
            }
            $this.css({left: pos.left,top: pos.top }).appendTo('#wrapper');
            $this.addClass('icn');
            $icn.css({opacity:0});
            $mask.show();
            $mask.stop().animate({
              width: w,
            },w*speed,'linear',function(){
              $mask.stop().animate({
                height: h,
              },h*speed,'linear',function(){
                $info.find('p').stop().animate({opacity: 1},200);
                is_animate = false;
              });
            });

            $clone.show();
            $clone.stop().animate({
              height: h,
            },h*speed,'linear',function(){
              $clone.stop().animate({
                width: w,
              },w*speed,'linear');
            });

          }
        },
        mouseleave: function(){
          clearTimeout(scopeTimer);
          scopeTimer = setTimeout( function(){
            $info.find('p').stop().animate({opacity: 0},200,function(){
              $mask.stop().animate({
                height: 1,
              },h*speed,'linear',function(){
                $mask.stop().animate({
                  width: 1,
                },w*speed,'linear',function(){
                  $(this).hide();
                  $icn.css({opacity:1});
                  $this.removeClass('icn');
                  $this.appendTo($home);
                  $(window).resize();
                  is_animate = false;
                });
              });

              $clone.stop().animate({
                width: 1,
              },w*speed,'linear',function(){
                $clone.stop().animate({
                  height: 1,
                },h*speed,'linear',function(){
                  $(this).hide();
                });
              });
            });
          }, 500);
        },
        mousemove: function(){
          clearTimeout(scopeTimer);
        }
      });
    });
  },

  addEvent: function(){
    //共通イベント
  },

  sns : {
    init: function(){
      var self = this;
      var $sns = $('#sns');
      self.baseUrl = '/Users/mizunokeita/cafe1894/';
      $sns.find('li').each(function(){
        var balloon = $(this).find('.balloon');
        $(this).on({
          mouseenter: function(){
            balloon.css({width:130});
          },
          mouseleave: function(){
            balloon.css({width:0});
          }
        });
      });
    },
    createFaceBookBtn: function(directory){
      var self = this;
      var dir = directory || '';
      var shareUrl = self.baseUrl + dir;
      var tmp = '<div class="fb-like" data-href="'+shareUrl+'" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false"></div>';
      $('#tagFacebook').html(tmp);
      setTimeout(function(){
        FB.XFBML.parse();
      },1000);
    },
    createTweetBtn: function(directory){
      var self = this;
      var pageTitle = $('title').text();
      var dir = directory || '';
      var shareUrl = self.baseUrl + dir;
      var tmp = '<a href="https://twitter.com/share" class="twitter-share-button" data-url="'+shareUrl+'" data-text="'+pageTitle+'" data-lang="'+self.root.lang+'" data-hashtags="mimt">ツイート</a>';
      $('#tagTweet').html(tmp);
      if ( twttr ) {
        setTimeout(function(){
        twttr.widgets.load();
        },1000);
      }
    }
  },

  top: {
    init: function(){
      var self = this;
      self.$top = $('#top');
      var $menu = self.$top.find('.menu');
      $menu.find('a').click(function(){
        var anc = $(this).attr('href').replace(/#/,'');
        $('#globalNav').find('a[href*=#'+anc+']').click();
      });

      $menu.find('li').each(function(){
        var hover = $(this).find('span');
        $(this).on({
          mouseenter: function(){
            hover.stop().animate({height: 64 },200,'easeInOutCubic');
          },
          mouseleave: function(){
            hover.stop().animate({ height: 0 },200,'easeInOutCubic');
          }
        });
      });
      self.getBlogPost();
      // cinemaGraph用;
      self.timer = '';
      self.$bg = self.$top.find('.change');  ///////////////////////////////////////////////

      //営業ステータス
      var openStatusPath,openStatusText;
      var date = new Date();
      var days = ['日','月','火','水','木','金','土'];
      var daysEN = ['Sun','Mon','Tue','Wed','thu','Fri','Sat'];
      var today,openText,closeText,textEQ;

      if(self.root.lang=='ja'){
        today = (date.getMonth()+1)+'月'+date.getDate()+'日（'+days[date.getDay()]+'）';
        openText = '本日営業日｜';
        closeText = '本日休業日｜';
        textEQ = 2;
      } else {
        today = (date.getMonth()+1)+'/'+date.getDate()+' ('+daysEN[date.getDay()]+')';
        openText = 'OPEN | ';
        closeText = 'CLOSE | ';
        textEQ = 3;
      }

      if(/test/.test(location.href)){
        openStatusPath = '/blog/cafe/?page_id=1169';
      } else {
        openStatusPath = '/blog/cafe/?page_id=1176';
      }

      $.ajax({
        url : openStatusPath,
        dataType : 'html'
      }).done(function(html){
        if(!/Nothing/.test(html)){
          $(html).find('li').each(function(){
            var thisText = $(this).text();
            if(/Charter/.test(thisText)){
              openStatusText = openText+today+thisText.split('@')[1]+' 貸切';
            } else if(/Close/.test(thisText)){
              openStatusText = closeText+today;
            } else if(/change_time/.test(thisText)){
              if(thisText.split('@')[textEQ] == ''){
                openStatusText = openText+today+thisText.split('@')[1];
              } else {
                openStatusText = openText+today+thisText.split('@')[textEQ];
              }
            } else {
              openStatusText = openText+today+' 11:00〜23:00';
            }
          });
        } else {
          openStatusText = openText+today+' 11:00〜23:00';
        }
        self.$top.find('.status').text(openStatusText);
      });
      //facybox
      $('#contactBtn a').fancybox({
        wrapCSS       : 'fancybox-custom',
        margin        : 50,
      });
      $('#contact a').click(function(){
        $.fancybox.close( true )
      });
    },
    getBlogPost: function(){
      var self = this;
      $.ajax({
        url: '/blog/cafe/?json=1',
        dataType: 'json',
      }).done(function(json){
        var data = json.posts;
        var tmp = '<li><a target="_blank"><span class="date"></span><span class="blogTitle"></span></a></li>';
        var posts = [];
        $.each(data,function(i){
          t = $(tmp);
          var dateFormat = this.date.replace(/-/g, '/');
          var date = new Date(dateFormat);
          var y = date.getFullYear();
          var m = ('0' + (date.getMonth()+1)).slice(-2);
          var d = ('0' + date.getDate()).slice(-2);;
          t.find('.date').html(y+'年'+m+'月'+d+'日');
          if ( this.title.length>21) {
            this.title = this.title.substring(0,20) + '…';
          };
          t.find('.blogTitle').html(this.title);
          t.find('a').attr('href',this.url);
          posts.push(t);
          if ( i == 2 ){ return false; }
        });
        $('#blogPosts').append(posts);
      });
    },
    showContent: function(){
      var self = this;
      clearTimeout(self.timer);
      self.timer = setTimeout( function(){
        self.cinemaGraph();
      } ,1000);
    },
    cinemaGraph: function(){
      var self = this;
      self.$bg.stop(true,true).animate({opacity: 0},1000,function(){
        self.$bg.stop(true,true).animate({opacity: 1},500,function(){
          self.timer = setTimeout( function(){
            self.cinemaGraph();
          } ,3000);
        });
      });
    },
    hideContent: function(){
      var self = this;
      self.$bg.stop(true,true);
      clearTimeout(self.timer);
    }
  },
  history: {
    init: function(){
      var self = this;
      self.$history = $('#history');
      self.timer = '';
      self.$bg = self.$history.find('.change');  ///////////////////////////////////////////////
      //facybox
      self.$history.find('.photos a').fancybox({
        prevEffect    : 'fade',
        nextEffect    : 'fade',
        wrapCSS       : 'fancybox-custom',
        beforeLoad    : function() {
          var $title = $(this.element).parent().find('.fancyTitle');
          if ($title.length) {
            this.title = $title.html();
          }
        }
      });
    },
    showContent: function(){
      var self = this;
      clearTimeout(self.timer);
      self.timer = setTimeout( function(){
        self.cinemaGraph();
      } ,1000);
    },
    cinemaGraph: function(){
      var self = this;
      self.$bg.stop(true,true).animate({opacity: 0},1000,function(){
        self.$bg.stop(true,true).animate({opacity: 1},500,function(){
          self.timer = setTimeout( function(){
            self.cinemaGraph();
          } ,3000);
        });
      });
    },
    hideContent: function(){
      var self = this;
      self.$bg.stop(true,true);
      clearTimeout(self.timer);
    }
  },
  hours: {
    init: function(){
      var self = this;
      self.$hours = $('#hours');
      self.timer = '';
      self.$bg = self.$hours.find('.change');
    },
    showContent: function(){
      var self = this;
      clearTimeout(self.timer);
      self.timer = setTimeout( function(){
        self.cinemaGraph();
      } ,1000);
    },
    cinemaGraph: function(){
      var self = this;
      self.$bg.stop(true,true).animate({opacity: 0},1000,function(){
        self.$bg.stop(true,true).animate({opacity: 1},500,function(){
          self.timer = setTimeout( function(){
            self.cinemaGraph();
          } ,3000);
        });
      });
    },
    hideContent: function(){
      var self = this;
      self.$bg.stop(true,true);
      clearTimeout(self.timer);
    }
  },
  access: {
    init: function(){
      var self = this;
      self.$access = $('#access');
      var $map = self.$access.find('.map');
      var hoveImg = $map.find('img');
      hoveImg.css({opacity:0});
      var duration = $.ua.isLtIE9 ? 0 : 300;
      hoveImg.on({
        mouseenter: function(){
          $(this).animate({opacity:1},duration);
        },
        mouseleave: function(){
          $(this).animate({opacity:0},duration);
        }
      });

      $map.find('a').fancybox({
        helpers : {
          overlay : {
            css : {
              background : '#000'
            }
          }
        }
      });
      self.timer = '';
      self.$bg = self.$access.find('.change');
    },
    showContent: function(){
      var self = this;
      clearTimeout(self.timer);
      self.timer = setTimeout( function(){
        self.cinemaGraph();
      } ,1000);
    },
    cinemaGraph: function(){
      var self = this;
      self.$bg.stop(true,true).animate({opacity: 0},1000,function(){
        self.$bg.stop(true,true).animate({opacity: 1},500,function(){
          self.timer = setTimeout( function(){
            self.cinemaGraph();
          } ,3000);
        });
      });
    },
    hideContent: function(){
      var self = this;
      self.$bg.stop(true,true);
      clearTimeout(self.timer);
    }
  },
  menu: {
    init: function(){
      var self = this;
      var $menu = $('#menu');
      var $tabHeader = $menu.find('.tabHeader');
      var $tabCont = $menu.find('.tabCont');
      var $tabContWrapper = $menu.find('.tabContWrapper');
      var contHeight = 0;
      $tabCont.each(function(){
        var h = $(this).height();
        contHeight = contHeight < h ? h : contHeight;
        $(this).find('.scroll').jScrollPane({
          verticalGutter: 0,
        });
        $(this).hide();
      });
      $tabContWrapper.height(contHeight);
      //facybox
      $tabCont.find('dd a').fancybox({
        prevEffect    : 'fade',
        nextEffect    : 'fade',
        wrapCSS       : 'fancybox-custom',
        margin        : 50,
        beforeLoad    : function() {
          var $title = $(this.element).parent().find('.fancyTitle');
          if ($title.length) {
            this.title = $title.html();
          }
        },
        beforeShow    : function() {
          var title = $('.fancybox-title .child');
          title.css({opacity:0});
          title.animate({opacity:1},500);
          var $cate = $(this.element).parent().find('.fancyCate');
          if ($cate.length) {
            $('.fancybox-skin').append($cate.clone().show());
          }
        }
      });

      var $tabli = $tabHeader.find('li');
      $tabli.click(function(){
        var idx = $tabli.index(this);
        $tabli.removeClass('cur');
        $tabli.eq(idx).addClass('cur');
        $tabCont.hide();
        $tabCont.eq(idx).fadeIn();
      });
      // デフォルトで開くメニュー
      $tabli.eq(0).trigger('click');
    },
    showContent: function(){
    },
    hideContent: function(){
    }
  },
  drink: {
    init: function(){
      self.$drink = $('#drink');
    },
    showContent: function(){
      self.$drink.show();
//      self.$drink.find('.scroll').jScrollPane({
//        showArrows: true,
//        verticalGutter: 20,
////        autoReinitialise: true,
//        verticalArrowPositions: 'after',
//        horizontalArrowPositions: 'after'
//      });
//      $('#drink .jspArrowUp').empty().append('<img src="images/common/icn_arrow_up_bk50.png" width="7" height="4" />')
//      $('#drink .jspArrowDown').empty().append('<img src="images/common/icn_arrow_down_bk50.png" width="7" height="4" />')
    },
    hideContent: function(){
    }
  },
  plan: {
    init: function(){
      var $plan = $('#plan');
      var $tabHeader = $plan.find('.tabHeader');
      var $tabCont = $plan.find('.tabCont');
      var $tabContWrapper = $plan.find('.tabContWrapper');
      var contHeight = 0;
      $tabCont.each(function(){
        var h = $(this).height();
        contHeight = contHeight < h ? h : contHeight;
        $(this).hide();
      });
      $tabContWrapper.height(contHeight);
      $tabCont.eq(0).show();

      var $tabli = $tabHeader.find('li');
      $tabli.click(function(){
        var idx = $tabli.index(this);
        $tabli.removeClass('cur');
        $tabli.eq(idx).addClass('cur');
        $tabCont.hide();
        $tabCont.eq(idx).fadeIn();
      });
      $tabli.eq(1).click();
    },
    showContent: function(){
    },
    hideContent: function(){
    }
  },

  media: {
    init: function(){
      self.$media = $('#media');
    },
    showContent: function(){
      self.$media.show();
      self.$media.find('.scroll').jScrollPane({
        verticalGutter: 0,
      });
    },
    hideContent: function(){
    }
  },

  premium: {
    init: function(){
      var self = this;
      var $premium = $('#premium');
      var $tabHeader = $premium.find('.tabHeader');
      var $tabCont = $premium.find('.tabCont');
      var $tabContWrapper = $premium.find('.tabContWrapper');
      var contHeight = 0;
      $tabCont.each(function(){
        var h = $(this).height();
        contHeight = contHeight < h ? h : contHeight;
        $(this).find('.scroll').jScrollPane({
          verticalGutter: 0,
        });
        $(this).hide();
      });
      $tabContWrapper.height(contHeight);
      $tabCont.eq(0).show();

      var $tabli = $tabHeader.find('li');
      $tabli.click(function(){
        var idx = $tabli.index(this);
        $tabli.removeClass('cur');
        $tabli.eq(idx).addClass('cur');
        $tabCont.hide();
        $tabCont.eq(idx).fadeIn();
      });
      $tabli.eq(0).click();
      //facybox
      $('#premium .content a').fancybox({
        wrapCSS       : 'fancybox-custom',
        margin        : 50,
      });
      $('#premiumGuideline a').click(function(){
        $.fancybox.close( true )
      });
    },
    showContent: function(){
    },
    hideContent: function(){
    }
  },

  //ページを分割
  createSplitPage: function($target){
    var self = this;
    var $splitL = $target.find('.splitL');
    var $splitR = $splitL.clone(true).removeClass('splitL').addClass('splitR').hide();
    $target.find('.baseWrap').prepend($splitR);
//    $splitL.removeClass('full');
  },

  // ページを切り替え
  changePage: {
    init: function(){
      var self = this;
    },
    showContent: function(nextPage){
      var self = this;
      var root = this.root;
      self.nextPage = nextPage;
      self.curentPageOrder = root.pageOrder[root.currentPage];
      self.nextPageOrder = root.pageOrder[self.nextPage];
      self.dir = self.curentPageOrder < self.nextPageOrder ? 'ahead':
                 self.curentPageOrder > self.nextPageOrder ? 'back':
                 null;

      if ( self.dir != null ){
        //pager用の処理
        var $pagerNext = $('#globalPager').find('.next');
        var $pagerBack = $('#globalPager').find('.back');
        if ( self.nextPage == 'premium' ){ $pagerNext.addClass('hide'); } else { $pagerNext.removeClass('hide'); }
        if ( self.nextPage == 'top' ){ $pagerBack.addClass('hide'); } else { $pagerBack.removeClass('hide'); }
        //ページ遷移
        self[self.dir]();
      } else {
        self.root.pageMoving = false;
        return false;
      }

    },
    ahead: function(){
      var self = this;
      var root = this.root;
      var $nextPage = $('#'+self.nextPage);
      var $currentPage = $('#'+root.currentPage);
      self.root[root.currentPage].hideContent();
      root.currentPage = self.nextPage;
      self.root.createSplitPage($currentPage);
      //初期状態をセット
      $('.page').css({transform: 'scale(1,1)', transition: '0s', opacity:1, display: 'none'});
      $nextPage.find('.splitL').addClass('full');
      $nextPage.find('.splitL').css({ left: '0%' });
      $nextPage.find('.splitR').css({ left: '50%' });
      $nextPage.css({transform: 'scale(0.9,0.9)', transition: '0s', opacity:0});
      $nextPage.show();
      self.contentPositonCenter($nextPage);
      $currentPage.find('.splitL').css({ left: '0%' });
      $currentPage.find('.splitR').css({ left: '50%' });
      $currentPage.show();
      //動かす
      $currentPage.find('.splitL').removeClass('full').stop().animate({ left: '-50%' },1000,'easeInOutCubic');
      $currentPage.find('.splitR').show().stop().animate({ left: '100%' },1000,'easeInOutCubic',function(){
        $currentPage.find('.splitR').remove();
        $currentPage.hide();
        self.root.pageMoving = false;
      });
      if ( $.supportBrowser.transition ){
        $nextPage.css({transform: 'scale(1,1)', transition: '1000ms ease-out',opacity:1});
      } else {
        $nextPage.css({opacity:1,transform: 'scale(1)'});
      }
      //各ページの設定へジャンプ
      self.root[root.currentPage].showContent();
    },
    back: function(){
      var self = this;
      var root = this.root;
      var $nextPage = $('#'+self.nextPage);
      var $currentPage = $('#'+root.currentPage);
      self.root[root.currentPage].hideContent();
      root.currentPage = self.nextPage;
      self.root.createSplitPage($nextPage);
      //初期状態をセット
      $('.page').css({transform: 'scale(1,1)', transition: '0s', opacity: 1, display: 'none'});
      $currentPage.find('.splitL').css({ left: '0%' });
      $currentPage.find('.splitR').css({ left: '50%' });
      $currentPage.css({transform: 'scale(1,1)', transition: '0s',opacity: 1});
      $currentPage.show();
      $nextPage.find('.splitL').css({ left: '-50%' });
      $nextPage.find('.splitR').css({ left: '100%' });
      $nextPage.show();
      self.contentPositonCenter($nextPage)
      //動かす
      $nextPage.find('.splitL').removeClass('full').stop().animate({ left: '0%' },1000,'easeInOutCubic');
      $nextPage.find('.splitR').show().stop().animate({ left: '50%' },1000,'easeInOutCubic',function(){
        $nextPage.find('.splitR').remove();
        $nextPage.find('.splitL').addClass('full');
        $currentPage.hide();
        self.root.pageMoving = false;
      });
      if ( $.supportBrowser.transition ){
        $currentPage.css({transform: 'scale(0.9,0.9)', transition: '1000ms ease-in',opacity:0});
      } else {
        $currentPage.css({opacity:1,transform: 'scale(1)'});
      }
      //各ページの設定へジャンプ
      self.root[root.currentPage].showContent();

    },
    contentPositonCenter: function($page){
      var $page = $page.find('.splitL .content');
      $page.css({
        marginTop: - $page.height()/2
      });

    }
  },





  setBodyClass: function(){
    if($.ua.isLtIE9){
      $('html').addClass('ltIE9');
    }
    if($.ua.isLtIE8){
      $('html').addClass('ltIE8');
    }
    if($.ua.isIPad){
      $('html').addClass('iPad');
    }
    $('html').removeClass('nojs');
  },

  winInit: function(){
    var self = this;
    self.win = $(window);
    self.win.on({
      resize: function(){
        self.win.h = $(this).height();
        self.win.w = $(this).width();
      }
    }).resize();
  },

  //ウィンドウサイズにBG画像サイズをフィット
  supersize : {
    init : function(){
      var self = this;
      self.$target  = $('.bgWrap');
//      var $wrapper = $('#wrapper');
      self.ratioW = 1100;
      self.ratioH = 702;
      if ( $.supportBrowser.transform ){
//        self.transformSizing();
        self.cssSizing();
      } else {
        self.cssSizing();
      }
    },
    transformSizing: function(){
      var self = this;
      self.root.win.on({
        resize: function(){
          var w = common.win.w >= self.ratioW ? common.win.w / self.ratioW : 1;
          var h = common.win.h >= self.ratioH ? common.win.h / self.ratioH : 1;;
          self.root.maxSize = w > h ? w : h;
          self.$target.css({
            transform: 'translate(-50%,-50%) scale('+self.root.maxSize+','+self.root.maxSize+')'
          });
          //一緒に拡大したい要素
          $('.relScale').css({
             transform: 'translate(0%,0%) scale('+self.root.maxSize+','+self.root.maxSize+')'
          });
        }
      }).resize();
    },
    cssSizing: function(){
      var self = this;
      self.root.win.on({
        resize: function(){
          var w = common.win.w >= self.ratioW ? common.win.w / self.ratioW : 1;
          var h = common.win.h >= self.ratioH ? common.win.h / self.ratioH : 1;;
          self.root.maxSize = w > h ? w : h;
          self.$target.css({
            width: Math.round( self.root.maxSize * self.ratioW ),
            height: Math.round( self.root.maxSize * self.ratioH ),
            marginLeft: Math.round( - ( self.root.maxSize * self.ratioW ) / 2 ),
            marginTop: Math.round( - ( self.root.maxSize * self.ratioH ) / 2 )
          });

          $('.relScale').each(function(){
            $(this).find('img').css({
              width: Math.round( self.root.maxSize * $(this).data('width') ),
              height: Math.round( self.root.maxSize * $(this).data('height') )
            });
          });

          $('.relPos').each(function(){
            $(this).css({
              left: Math.round(  ( self.root.maxSize *$(this).data('left') )  ),
              top: Math.round(  ( self.root.maxSize *$(this).data('top') )  )
            });
          });

          if ( $.ua.isLtIE9 ){
            if ( common.win.h < 702 ){
              $('footer').addClass('ieFix');
            } else {
              $('footer').removeClass('ieFix');
            }
          }
        }
      }).resize();
    }

  },


  //スムーススクロール
  smoothscroll : function(){
    var self = this;
    self.$htmlbody = $('html, body');

    $(document).on({
      click : function() {
        if(this.hash){
          var duration=1000;
          var easing='easeOutExpo';
          var newHash=this.hash;
          var target=$(this.hash).offset().top;
          var oldLocation=window.location.href.replace(window.location.hash, '');
          var newLocation=this;
          if(oldLocation+newHash==newLocation){
            self.$htmlbody.stop().animate({ scrollTop: target }, duration, easing, function() {
              //window.location.href=newLocation;
            });
          }
        }
        return false;
      }
    },'a[href*=#]');
    //マウスホイールでキャンセル
    self.$htmlbody.on({ mousewheel: function() { $(this).stop(); } });
  },

  //ポップアップ
  setPopup: function(){
    var self = this;
    var screenW = window.screen.width;
    var screenH = window.screen.height;
    $(document).on({
      click: function(){
        var href = $(this).attr('href');
        var width = $(this).data('width') || 800;
        var height = $(this).data('height') || 500;
        var popup = window.open( href, 'popup', 'left='+(screenW-width)/2+', top='+(screenH-height)/2+', width='+width+', height='+height+', menubar=no, toolbar=no, scrollbars=yes');
        popup.focus();
        return false;
      }
    },'.popup');
  },

  //簡易マウスオーバー
  overopacity : function(){
    var self = this;
    $(document).on({
      mouseenter: function(){
        $(this).addClass('hover');
      },
      mouseleave: function(){
        $(this).removeClass('hover');
      }
    },'.opa');
//    $('.opa.cur').css({opacity:1});
  },

};

common.init();

//rollover
$.fn.rollover = function(suffix, hoverClass, opacity ) {
  var suffix = suffix || '_over';
  var hoverClass = hoverClass ? hoverClass.replace('.','') : 'hover'
  var opa = opacity ? opacity : '0.5';
  var target = this;
  return target.each(function() {
    if ( ( $(this).is('img') == true || $(this).is('input[type=image]') == true )    && $(this).not ('[src*="'+ suffix +'."]') ){
//        $(this).not ('[src*="'+ suffix +'."]').each(function(j) {
        var img = $(this);
        var src = img.attr('src');
        var _on = [
          src.substr(0, src.lastIndexOf('.')),
          src.substring(src.lastIndexOf('.'))
        ].join(suffix);
        $('<img>').attr('src', _on);
        img.on({
          mouseenter: function(){
            img.attr('src', _on);
          },
          mouseleave: function(){
            img.attr('src', src);
          }
        });
//        });
    } else {
      $(this).find('img').not('[src*="'+ suffix +'."]').each(function(j) {
        var img = $(this);
        var src = img.attr('src');
        var _on = [
          src.substr(0, src.lastIndexOf('.')),
          src.substring(src.lastIndexOf('.'))
        ].join(suffix);
        if ( !($(this).hasClass('noOv')) ){
          $('<img>').attr('src', _on);
        }

        target.on({
          mouseenter: function(){
            $(this).addClass(hoverClass);
            $(this).find(img).each(function(i){
              if ( !$(this).hasClass('noOv')) {
                $(this).attr('src', _on);
              }
            });
          },
          mouseleave: function(){
            $(this).removeClass(hoverClass);
            $(this).find(img).each(function(i){
              if ( !$(this).hasClass('noOv')) {
                $(this).attr('src', src);
              }
            });
          }
        });
      });
    }
  });
}

function getUrlVars( key ){
  var vars = {}, val;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++){
    val = hashes[i].split('=');
    vars[val[0]] = val[1];
  }
  if ( key ){ return vars[key]; }
  return vars;
}

Array.prototype.shuffle = function() {
  var i = this.length;
  while(i){
    var j = Math.floor(Math.random()*i);
    var t = this[--i];
    this[i] = this[j];
    this[j] = t;
  }
  return this;
}
