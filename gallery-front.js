(function(){
    var $,google,jQuery;

    var G = {
        defaults: {
            jquery_atleast_version: '1.5',
            jquery_url: 'ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js',
            jquery_mobile_url: 'http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.js',
            gallery_elements: '.edys-gallery',
            gallery_template: false,

            popup_template: '<div class="{popup_class}">\
                                <div class="{close_class}"></div>\
                                <div class="{buttons_class}"></div>\
                                <div class="{content_wrap_class}">\
                                   <div class="{left_wrap_class}"><div class="{left_class}"></div></div>\
                                   <div class="{right_wrap_class}"><div class="{right_class}"></div></div>\
                                   <div class="{image_wrap_class}"></div>\
                                   <div class="{title_class}"></div>\
                                </div>\
                            </div>',
            stylesheet: '',

            classnames: {
                overlay:        'edys-gallery-overlay',
                loading:        'edys-gallery-loading',
                popup:          'edys-gallery-popup',
                left_btn:       'edys-gallery-left',
                right_btn:      'edys-gallery-right',
                left_btn_wrap:  'edys-gallery-left-wrap',
                right_btn_wrap: 'edys-gallery-right-wrap',
                close_btn:      'edys-gallery-close',
                additional_btns:'edys-gallery-btns',
                content_wrap:   'edys-gallery-content-wrap',
                image_wrap:     'edys-gallery-image-wrap',
                title:          'edys-gallery-title'
            },

            system_classnames: {
                overlay:        'edys-gal-gallery-overlay',
                loading:        'edys-gal-gallery-loading',
                popup:          'edys-gal-gallery-popup',
                left_btn:       'edys-gal-gallery-left',
                right_btn:      'edys-gal-gallery-right',
                left_btn_wrap:  'edys-gal-gallery-left-wrap',
                right_btn_wrap: 'edys-gal-gallery-right-wrap',
                close_btn:      'edys-gal-gallery-close',
                additional_btns:'edys-gal-gallery-btns',
                content_wrap:   'edys-gal-gallery-content-wrap',
                image_wrap:     'edys-gal-gallery-image-wrap',
                title:          'edys-gal-gallery-title'
            },

            image_to_wiewport_max_ratio: 0.8,

            jumping_mode: 'strict',

            texts: {

            }
        },

        init: function(){
            G.get_jquery(G.defaults.jquery_url, G.defaults.jquery_atleast_version, function(){
                  //$('body').live('pagecreate',function(event){
                $(document).ready(function(){
                    init_swipe();
                    if(isset(window.edys_gallery_options) !='undefined'){
                        $.extend(G.defaults, window.edys_gallery_options);
                    }
                    G.run();
                });
            });
        },

        run: function(){
            var def = G.defaults;
            if(def.jumping_mode == 'strict'){
                var gals = $(def.gallery_elements);
                gals.each(function(){
                    var links = $(this).find('a');
                    G.set_link_clicks(links);
                });
            } else {
                var links = $(def.gallery_elements).find('a');
                G.set_link_clicks(links);
            }
        },

        set_link_clicks: function(links){
            var L = G.get_link_arr(links);
            for (var i in L){
                with({n:i}){ /* escape closure for i */
                    L[i].el.click(function(e){
                        e.preventDefault();
                        G.popup.show(parseInt(n),L);
                        return false;
                    });
                }
            }
        },

        get_link_arr: function(ls){
            var r = [];
            ls.each(function(){
                var l = $(this);
                r.push({
                    'href': l.attr('href'),
                    'rel': l.attr('rel'),
                    'el': l
                });
            });
            return r;
        },

        popup: {
            overlay: null,
            pop: null,

            show: function(index,list){
                var p =  G.popup,
                    sc = G.defaults.system_classnames;
                    
                p.current_list = list;
                p.current_index = index;    
                if(p.overlay === null){ p.overlay = p.make_overlay(); }
                if(p.pop === null){ 
                    p.pop = p.make_popup(); 
                    p.set_next_prev_buttons();
                }
                p.set_overlay_size();
                $(window).resize(function() {
                   p.set_overlay_size();
                });
                p.overlay.show();
                p.loading.show();
                p.preload_image(list[index].href,function(img){
                    p.pop.find('.'+sc.image_wrap).html(img);
                    p.pop.css('visibility','hidden').show();
                    $('.'+sc.title).html(list[index].rel);
                    p.set_popup_size_pos();
                    p.set_overlay_size();
                    p.pop.css('visibility','visible');
                    p.loading.hide();
                });
            },

            hide: function(){
                var sc = G.defaults.system_classnames;
                $('.'+sc.popup+', .'+sc.overlay).hide();
                $(window).unbind('resize');
                G.popup.loading.hide();
            },

            make_overlay: function(){
                var o = $("<div />").addClass(
                        G.defaults.classnames.overlay+' '+G.defaults.system_classnames.overlay
                    ).css({
                        'top':'0px',
                        'left': '0px'
                    }).click(function(){
                        G.popup.hide();
                    }).hide();
                $("body").prepend(o);
                return o;
            },

            set_overlay_size: function(){
                var   o = G.popup.overlay;
                o.width(1).height(1);
                var w = $(document).width(),
                    h = $(document).height();
                o.width(w).height(h);
            },

            make_popup: function (){
                var dc =    G.defaults.classnames,
                    sc =    G.defaults.system_classnames,
                    popSrc = format_template(G.defaults.popup_template,{
                            'popup_class': dc.popup+' '+sc.popup,
                            'close_class': dc.close_btn+' '+sc.close_btn,
                            'left_class': dc.left_btn+' '+sc.left_btn,
                            'right_class': dc.right_btn+' '+sc.right_btn,
                            'left_wrap_class': dc.left_btn_wrap+' '+sc.left_btn_wrap,
                            'right_wrap_class': dc.right_btn_wrap+' '+sc.right_btn_wrap,
                            'buttons_class': dc.additional_btns+' '+sc.additional_btns,
                            'content_wrap_class': dc.content_wrap+' '+sc.content_wrap,
                            'image_wrap_class': dc.image_wrap+' '+sc.image_wrap,
                            'title_class': dc.title+' '+sc.title
                    }),
                    pop =   $(popSrc);

                pop.css({
                    'position':'absolute'
                }).hide().find('.'+sc.close_btn).click(function(){
                    G.popup.hide();
                });

                $("body").prepend(pop);
                return pop;
            },

            loading:{
                show: function(){
                    var sc =    G.defaults.system_classnames,
                        dc =    G.defaults.classnames,
                        vw =    $(window).width(),
                        vh =    $(window).height();

                    $('.'+sc.loading).remove();
                    var loading = $('<div />',{
                        'class': sc.loading+' '+dc.loading
                    }).css('visibility','hidden');
                    $('body').prepend(loading);
                    var h = loading.outerHeight(),
                        w = loading.outerWidth();
                    loading.css({
                        'top': ((vh/2)-(h/2))+'px',
                        'left': ((vw/2)-(w/2))+'px',
                        'visibility':'visible'
                    });
                },

                hide: function(){
                    var sc =    G.defaults.system_classnames;
                    $('.'+sc.loading).remove();
                }
            },

            set_img_size: function(){
                var pop =   G.popup.pop,
                    def =   G.defaults,
                    img_wrap = pop.find('.'+def.system_classnames.image_wrap),
                    img =   img_wrap.find('img'),
                    w =     img.width(),
                    h =     img.height();

                img.height(1);
                var vw =    $(window).width(),
                    vh =    $(window).height(),
                    nph = def.image_to_wiewport_max_ratio*vh,
                    npw = w/(h/nph);
                if (h > def.image_to_wiewport_max_ratio*vh){
                    img.add('.'+def.system_classnames.content_wrap).height(nph).width(npw);
                } else {
                    img.height(h);
                }
            },

            get_img_size: function(img){
                var pop =   G.popup.pop,
                    def =   G.defaults,
                    w =     img.width(),
                    h =     img.height();

                img.height(1).show();
                var vw =    $(window).width(),
                    vh =    $(window).height();

                if (h > def.image_to_wiewport_max_ratio*vh){
                    var newh = def.image_to_wiewport_max_ratio*vh;
                } else {
                    newh = h;
                }
                img.height(h).hide();
                return {
                    h: newh,
                    w: w/(h/newh),
                    vw: vw,
                    vh: vh
                }
            },

            set_popup_size_pos: function(){
                var pop =       G.popup.pop,
                    def =       G.defaults,
                    img =       pop.find('.'+def.system_classnames.image_wrap+' img'),
                    img_wrap =  pop.find('.'+def.system_classnames.image_wrap);

                G.popup.set_img_size();

                var vw =    $(window).width(),
                    vh =    $(window).height();

                var pw =    pop.outerWidth(),
                    ph =    pop.outerHeight(),
                    pleft = (vw/2)-(pw/2)+$(document).scrollLeft(),
                    ptop = (vh/2)-(ph/2)+$(document).scrollTop();

                img.css({
                    'left':   (img_wrap.outerWidth()/2)-(img.width()/2)
                });

                pop.css({
                    'left': pleft+'px',
                    'top': ptop+'px'
                });
            },

            preload_image: function(img,f){
                var i = $('<img />').load(function(){
                    f($(this));
                }).attr('src',img);
            },

            set_next_prev_buttons: function(){
                var p = G.popup,
                    list = p.current_list,
                    index = p.current_index
                    pop = p.pop,
                    sc = G.defaults.system_classnames,
                    r_btn = pop.find('.'+sc.right_btn_wrap),
                    l_btn = pop.find('.'+sc.left_btn_wrap),
                    img_wrap = pop.find('.'+sc.image_wrap);
                    
                p.show_hide_next_prev();

                r_btn.unbind('click').click(function(e){
                    if((p.current_index+1 < p.current_list.length)){
                        p.current_index++;
                        p.change_to_image(p.current_index,list);
                        p.show_hide_next_prev();
                    }
                });

                l_btn.unbind('click').click(function(e){
                    if(p.current_index-1 >= 0){
                        p.current_index--;
                        p.change_to_image(p.current_index,list);
                        p.show_hide_next_prev();
                    }
                });
                
                $(img_wrap).swipe({
                    swipeLeft: function() { 
                        if((p.current_index+1 < p.current_list.length)){
                            p.current_index++;
                            p.change_to_image(p.current_index,list);
                            p.show_hide_next_prev();
                        }
                    },
                    swipeRight: function() {
                        if(p.current_index-1 >= 0){
                            p.current_index--;
                            p.change_to_image(p.current_index,list);
                            p.show_hide_next_prev();
                        }
                    },
                });
                
                
            },
            
            show_hide_next_prev: function(){
                var p = G.popup,
                    list = p.current_list,
                    index = p.current_index,
                    pop = p.pop,
                    sc = G.defaults.system_classnames,
                    r_btn = pop.find('.'+sc.right_btn_wrap),
                    l_btn = pop.find('.'+sc.left_btn_wrap),
                    has_next = (index+1 < list.length),
                    has_prev = (index-1 >= 0);
                 
                if(isTouchDevice()){
                    r_btn.add(l_btn).hide();
                } else {
                    if(has_next){
                        r_btn.show();
                    } else {
                        r_btn.hide();
                    }

                    if(has_prev){
                        l_btn.show();
                    } else {
                        l_btn.hide();
                    }
                }
            },

            change_to_image: function (index,list){
                
                var p = G.popup,
                    pop = p.pop,
                    sc = G.defaults.system_classnames;
                
                
                p.loading.show();
                p.preload_image(list[index].href,function(new_image){
                    var old_img = $('.'+sc.image_wrap+' img'),
                        ow = old_img.width(),
                        oh = old_img.height();

                    new_image.css({'position':'absolute', 'visibility':'hidden'}).show();
                    pop.find('.'+sc.image_wrap).prepend(new_image);
                    $('.'+sc.title).html(list[index].rel);

                    var ni = p.get_img_size(new_image);
                    var nw =    ni.w,
                        nh =    ni.h,
                        vw =    $(window).width(),
                        vh =    $(window).height();
                        oleft = (vw/2)-(pop.outerWidth()/2)-((nw-ow)/2),
                        otop = (vh/2)-(pop.outerHeight()/2)-(nh-oh)/2;
                        
                    pop.animate({'left': oleft+'px','top': otop+'px'},300);
                    $(old_img).add(new_image).add('.'+sc.content_wrap).animate({
                        'width': nw+'px',
                        'height': nh+'px'
                    }, 300, function(){
                        new_image.css({'position': "absolute",'visibility':'visible', 'top':0, 'left':0}).fadeIn(500,function(){
                            new_image.css({'position': "static"});
                            old_img.remove();
                            
                            //p.set_next_prev_buttons();
                            p.loading.hide();
                        });
                    });
                });
            }
        },

        get_jquery: function (url,ver,f){
            if (!isset(window.jQuery) || window.jQuery.fn.jquery < ver) {
                load_script(url,function() {
                    $ = jQuery = window.jQuery.noConflict(true);
                    f();
                });
            } else {
                $ = window.jQuery;
                f();
            }
        },
        
       get_jquery_mobile: function (url,ver,f){
                load_script(url,function() {
                   /* $ = window.jQuery.noConflict(true);*/
                    f();
                });
        }
        
    }

    /* local functions */
    var load_script = function(source,f){
        (function(d, t) {
            var js = d.createElement(t);
            js.onload = f;
            var prot = (location.protocol!='file:')?location.protocol:'http:';
            js.src = prot + '//'+source;
            js.onreadystatechange = function() {
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    f();
                }
            };
            (d.getElementsByTagName('head')[0] || d.documentElement).appendChild(js);
        }(document, 'script'));
    }
    
    
    /* remove the element too in future */
    function isTouchDevice() {
        var el = document.createElement('div');
            el.setAttribute('ongesturestart', 'return;');
        if(typeof el.ongesturestart == "function"){
            return true;
        }else {
            return false
        }
    }

    var format_template =function(s,inserts){
		var t = s;
		for(var i  in inserts){
			var regx = new RegExp('{'+i+'}','gi')
			t = t.replace(regx,inserts[i]);
		}
		return t;
	}

    var isset = function(v){
		return(typeof v != 'undefined');
	}
    
    /*
    * jSwipe - jQuery Plugin
    * http://plugins.jquery.com/project/swipe
    * http://www.ryanscherf.com/demos/swipe/
    *
    * Copyright (c) 2009 Ryan Scherf (www.ryanscherf.com)
    * Licensed under the MIT license
    *
    * $Date: 2009-07-14 (Tue, 14 Jul 2009) $
    * $version: 0.1.2
    * 
    * This jQuery plugin will only run on devices running Mobile Safari
    * on iPhone or iPod Touch devices running iPhone OS 2.0 or later. 
    * http://developer.apple.com/iphone/library/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW5
    */
    var init_swipe = function(){
        $.fn.swipe = function(options) {
            
            // Default thresholds & swipe functions
            var defaults = {
                threshold: {
                    x: 30,
                    y: 400
                },
                swipeLeft: function() { alert('swiped left') },
                swipeRight: function() { alert('swiped right') }
            };
            
            var options = $.extend(defaults, options);
            
            if (!this) return false;
            
            return this.each(function() {
                
                var me = $(this)
                
                // Private variables for each element
                var originalCoord = { x: 0, y: 0 }
                var finalCoord = { x: 0, y: 0 }
                
                // Screen touched, store the original coordinate
                function touchStart(event) {
                    //console.log('Starting swipe gesture...')
                    originalCoord.x = event.targetTouches[0].pageX
                    originalCoord.y = event.targetTouches[0].pageY
                }
                
                // Store coordinates as finger is swiping
                function touchMove(event) {
                    event.preventDefault();
                    finalCoord.x = event.targetTouches[0].pageX // Updated X,Y coordinates
                    finalCoord.y = event.targetTouches[0].pageY
                }
                
                // Done Swiping
                // Swipe should only be on X axis, ignore if swipe on Y axis
                // Calculate if the swipe was left or right
                function touchEnd(event) {
                    //console.log('Ending swipe gesture...')
                    var changeY = originalCoord.y - finalCoord.y
                    if(changeY < defaults.threshold.y && changeY > (defaults.threshold.y*-1)) {
                        changeX = originalCoord.x - finalCoord.x
                        
                        if(changeX > defaults.threshold.x) {
                            defaults.swipeLeft()
                        }
                        if(changeX < (defaults.threshold.x*-1)) {
                            defaults.swipeRight()
                        }
                    }
                }
                
                // Swipe was started
                function touchStart(event) {
                    //console.log('Starting swipe gesture...')
                    originalCoord.x = event.targetTouches[0].pageX
                    originalCoord.y = event.targetTouches[0].pageY

                    finalCoord.x = originalCoord.x
                    finalCoord.y = originalCoord.y
                }
                
                // Swipe was canceled
                function touchCancel(event) { 
                    //console.log('Canceling swipe gesture...')
                }
                
                // Add gestures to all swipable areas
                this.addEventListener("touchstart", touchStart, false);
                this.addEventListener("touchmove", touchMove, false);
                this.addEventListener("touchend", touchEnd, false);
                this.addEventListener("touchcancel", touchCancel, false);
                    
            });
        };
    }

    G.init();
})();