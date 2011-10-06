(function(){
    var $,google,jQuery;

    var G = {
        defaults: {
            jquery_atleast_version: '1.5',
            jquery_url: 'ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js',
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
                image_wrap_box: 'edys-gallery-image-wrap-box',
                title:          'edys-gallery-title',
                notitle:        'edys-gallery-title-notitle'
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
                image_wrap_box: 'edys-gal-gallery-image-wrap-box',
                title:          'edys-gal-gallery-title',
                notitle:        'edys-gal-gallery-title-notitle'
            },

            touchscreen_class_suffix: '-touch',
            image_to_wiewport_max_ratio_x: 0.7,
            image_to_wiewport_max_ratio_y: 0.7,
            swipe_move_treshold: 0.10,
            jumping_mode: 'strict',
            mode: "auto",
            texts: {

            }
        },

        is_touch: false,

        init: function(){
            G.get_jquery(G.defaults.jquery_url, G.defaults.jquery_atleast_version, function(){
                $(document).ready(function(){
                    with(G.startup_functions){
                        extend_defaults();
                        set_touch_mode();
                    }
                    init_swipe();
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
                    G.startup_functions.set_link_clicks(links);
                });
            } else {
                var links = $(def.gallery_elements).find('a');
                G.startup_functions.set_link_clicks(links);
            }
        },

        startup_functions:{
            extend_defaults: function (){
                if(isset(window.edys_gallery_options)){
                    $.extend(G.defaults, window.edys_gallery_options);
                }
            },

            set_touch_mode: function(){
                G.is_touch = (G.defaults.mode=="auto")?isTouchDevice():(G.defaults.mode=="touch")?true:false;
            },

            set_link_clicks: function(links){
                var L = G.startup_functions.get_link_arr(links);
                for (var i in L){
                    with({n:i}){ /* escape closure for i */
                        L[i].el.click(function(e){
                            e.preventDefault();
                            G.gallery.show(parseInt(n),L);
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
            }
        },

        get_classes: function(name,include_nonsys,include_dot){
            var sc =                G.defaults.system_classnames,
                dc =                G.defaults.classnames,
                include_nonsys =    isset(include_nonsys)?include_nonsys:false,
                include_dot =       isset(include_dot)?include_dot:true,
                suf =               (G.is_touch)?G.defaults.touchscreen_class_suffix:'',
                dot =               (include_dot)?'.':'',
                n =                 dot+sc[name]+suf;

            if(include_nonsys){ n += ' ' + dot+dc[name] + suf;}
            return n;
        },

        gallery: {
            overlay_el:     null,
            popup_el:       null,
            current_list:   null,
            current_index:  null,

            show: function(index,list){
                var p = G.gallery;

                /* save popup image list and current index */
                p.current_list = list;
                p.current_index = index;

                /* make popup and overlay first time */
                if(p.overlay_el === null){ p.overlay_el = p.overlay.make(); }
                if(p.popup_el === null){
                    p.popup_el = p.popup.make();
                    if(!G.is_touch) { p.popup.click_mode.set_next_prev_buttons(); }
                }

                /* set overlay size and bind resize to window resize event */
                p.overlay.resize();
                if("onorientationchange" in window){
                    window.removeEventListener('orientationchange', G.gallery.initiate.resize_window_event, false);
                    window.addEventListener('orientationchange', G.gallery.initiate.resize_window_event, false);
                } else {
                    $(window).unbind('resize').resize(function() {
                        G.gallery.initiate.resize_window_event();
                    });
                }

                /* show popup and overlay */
                p.overlay_el.show();
                p.loading.show();


                if(G.is_touch){
                    G.gallery.initiate.touch_mode();
                } else {
                    G.gallery.initiate.click_mode();
                }
            },

            hide: function(){
                var p = G.gallery;

                p.current_list = null;
                p.current_index = null;

                $(G.get_classes('popup')+','+G.get_classes('overlay')).hide();
                $(window).unbind('resize');
                p.loading.hide();
            },

            /* initiation functions */
            initiate: {
                touch_mode: function(){
                    var p =     G.gallery,
                        index = p.current_index,
                        list =  p.current_list;

                    p.loading.hide();
                    p.popup_el.find(G.get_classes('title')).hide(); /* hide global title element. all touch pictures have their own title */
                    p.popup_el.width(viewport.width())//$(document.body).width())
                                    .css({
                                            'top':$(document).scrollTop()+'px',
                                            'left': $(document).scrollLeft()+'px'
                                    }).show(); /* set popup size/pos and show */

                    /* make swipable gallery elements, bind automatic loading to images and show gallery */
                    p.popup.touch_mode.make_all_img_element(index,list,function(){
                        var draggelements = p.popup_el
                                             .add(p.overlay_el)
                                             .add(p.popup_el.find(G.get_classes('image_wrap')+' img'));

                        /* bind navigation events */
                        if(isTouchDevice()){
                            p.popup.touch_mode.bind_events(draggelements);
                        } else {
                            p.popup.touch_mode.bind_alternate_click_events(draggelements);
                        }

                        /* set gallery position to clicked image */
                        p.popup.touch_mode.center_to_image(index);
                    });
                },

                click_mode: function(){
                    var p =     G.gallery,
                        index = p.current_index,
                        list =  p.current_list;

                    /*preload clicked image */
                    p.preload_image(list[index].href,function(img){
                        /* set title */
                        $(G.get_classes('title')).html(list[index].rel);

                        /* draw first preloaded image */
                        p.popup_el.find(G.get_classes('image_wrap')).html(img);

                        /* reset popup and overlay size */
                        p.popup_el.css('visibility','hidden').show();
                        p.popup.click_mode.set_popup_size_pos();
                        p.overlay.resize();
                        p.popup_el.css('visibility','visible');

                        /* hide loading icon */
                        p.loading.hide();
                    });
                },

                resize_window_event: function(){ /* called on window resize and orientation change */
                    var p =     G.gallery,
                        imgs =  p.popup_el.find(G.get_classes('image_wrap')+' img'),
                        img_wrap_boxes = p.popup_el.find(G.get_classes('image_wrap_box'));

                    p.overlay.resize();

                    /* keep popup element in viewport */
                    p.popup_el.width(viewport.width())
                              .css({
                                'left': $(document).scrollLeft()+'px',
                                'top': $(document).scrollTop()+'px',
                              });
                    img_wrap_boxes.width(viewport.width());

                    /* resize all images to fit */
                    imgs.each(function(){
                        $(this).css({
                            'visibility':'hidden',
                            'width':'auto',
                            'height':'auto'
                        }).show();
                        var s= G.gallery.get_img_size($(this));
                        $(this).height(s.h).width(s.w).css('visibility','visible').show();
                    });

                    /* set current image to viewport center */
                    p.popup.touch_mode.center_to_image(index);
                }
            },



            overlay:{
                make: function(){
                    var o = $("<div />").addClass(
                            G.get_classes('overlay',true,false)
                        ).css({
                            'top':'0px',
                            'left': '0px'
                        }).hide();

                    /* if not in touch mode bind close gallery to overlay click event */
                    if(!G.is_touch){
                        o.click(function(){
                            G.gallery.hide();
                        })
                    }

                    $("body").prepend(o);
                    return o;
                },

                resize: function(){
                    var   o = G.gallery.overlay_el;
                    o.width(1).height(1);
                    var w = $(document).width(),
                        h = $(document).height();
                    o.width(w).height(h);
                }
            },

            popup: {
                make: function (){
                    var popSrc = format_template(G.defaults.popup_template,{
                                'popup_class': G.get_classes('popup',true,false),
                                'close_class': G.get_classes('close_btn',true,false),
                                'left_class': G.get_classes('left_btn',true,false),
                                'right_class': G.get_classes('right_btn',true,false),
                                'left_wrap_class': G.get_classes('left_btn_wrap',true,false),
                                'right_wrap_class': G.get_classes('right_btn_wrap',true,false),
                                'buttons_class': G.get_classes('additional_btns',true,false),
                                'content_wrap_class': G.get_classes('content_wrap',true,false),
                                'image_wrap_class': G.get_classes('image_wrap',true,false),
                                'title_class': G.get_classes('title',true,false)
                        }),
                        pop =   $(popSrc);

                    pop.css({
                        'position':'absolute'
                    }).hide();

                    /* close button click/touch */
                    var cbtn = pop.find(G.get_classes('close_btn'));
                    if(isTouchDevice()){
                        cbtn.get(0).addEventListener("touchend",function(){
                            G.gallery.hide();
                        }, false);
                    } else {
                        cbtn.click(function(){
                            G.gallery.hide();
                        });
                    }

                    /* hide next prev buttons if touch mode */
                    if(G.is_touch){
                        pop.find(G.get_classes('right_btn_wrap')).hide();
                        pop.find(G.get_classes('left_btn_wrap')).hide();
                    }

                    $("body").prepend(pop);
                    return pop;
                },

                /* touch mode specific popup functions */
                touch_mode: {
                    bind_events: function(elements){
                        elements.each(function(){
                            /* remove old events */
                            this.removeEventListener("touchstart", G.gallery.pic_drag.start, false);
                            this.removeEventListener("touchmove", G.gallery.pic_drag.move, false);
                            this.removeEventListener("touchend", G.gallery.pic_drag.end, false);
                            this.removeEventListener("touchcancel", G.gallery.pic_drag.cancel, false);

                            /* add events */
                            this.addEventListener("touchstart", G.gallery.pic_drag.start, false);
                            this.addEventListener("touchmove", G.gallery.pic_drag.move, false);
                            this.addEventListener("touchend", G.gallery.pic_drag.end, false);
                            this.addEventListener("touchcancel", G.gallery.pic_drag.cancel, false);
                        });
                    },

                    bind_alternate_click_events: function(elements){
                        /* remove old events */
                        elements.unbind('mousedown').unbind('mousemove').unbind('mouseup');

                        /* add events */
                        elements.mousedown(G.gallery.pic_drag.start)
                                 .mousemove(G.gallery.pic_drag.move)
                                 .mouseup(G.gallery.pic_drag.end);
                    },

                    /* set image with index to viewport center */
                    center_to_image: function (ind){
                        var loc = -1*((ind)*viewport.width());
                        if($.browser.webkit){ /* webkit has hardware acceleration for translate3d especially on iDevices */
                            G.gallery.popup_el.find(G.get_classes('image_wrap')).css({
                                "-webkit-transform": "translate3d("+loc+"px,0px,0px)",
                                "-webkit-transition-duration": "0s"
                            });
                        } else {
                            G.gallery.popup_el.find(G.get_classes('image_wrap')).stop().css('left',loc+'px');
                        }
                        G.gallery.pic_drag.x = loc;
                    },

                    make_all_img_element: function(index,list,f){
                        var imgs_wrap    = G.gallery.popup_el.find(G.get_classes('image_wrap')),

                            max     = list.length-1,
                            img_tpl = $('<div />').addClass(G.get_classes('image_wrap_box',true,false))
                                                  .html($('<div/>',{
                                                    'class': G.get_classes('loading',true,false)
                                                  }))
                                                  .width(viewport.width())
                                                  .css({ 'min-height':'10px' })//$(document).width()),
                            img_w_c = img_tpl.clone(),
                            current_title = $('<div/>').addClass(G.get_classes('title',true,false)).html(list[index].rel);

                        if(list[index].rel == ''){
                            current_title.addClass(G.get_classes('notitle',true,false));
                        }
                        img_w_c.append('<br/>').append(current_title);
                        imgs_wrap.width((max+1)*viewport.width()).html(img_w_c);

                        G.gallery.preload_image(list[index].href,function(img_c){
                            img_w_c.find(G.get_classes('loading')).remove();
                            img_w_c.prepend(img_c);
                            var s_c = G.gallery.get_img_size(img_c);
                            img_c.height(s_c.h).width(s_c.w).show();
                        });

                        if(index < max){
                            for(var incr = index+1; incr <= max; incr++){
                                (function(inc){
                                    var img_i = img_tpl.clone();
                                    var titl = $('<div/>').addClass(G.get_classes('title',true,false)).html(list[inc].rel);
                                    if(list[inc].rel == ''){
                                        titl.addClass(G.get_classes('notitle',true,false));
                                    }
                                    img_i.append('<br/>').append(titl);
                                    imgs_wrap.append(img_i);
                                    G.gallery.preload_image(list[inc].href,function(img){
                                        //G.gallery.set_img_size(img);
                                        img_i.find(G.get_classes('loading')).remove();
                                        img_i.prepend(img);
                                        var s= G.gallery.get_img_size(img);
                                        img.height(s.h).width(s.w).show();
                                    });
                                })(incr);
                            }

                        }

                        if(index > 0){
                            for(var decr = index-1; decr >= 0; decr--){
                                (function(dec){
                                    var img_d = img_tpl.clone();
                                    var titl = $('<div/>').addClass(G.get_classes('title',true,false)).html(list[dec].rel);
                                    if(list[dec].rel == ''){
                                        titl.addClass(G.get_classes('notitle',true,false));
                                    }
                                    img_d.append('<br/>').append(titl);
                                    imgs_wrap.prepend(img_d);
                                    G.gallery.preload_image(list[dec].href,function(img){
                                       // G.gallery.set_img_size(img);
                                       img_d.find(G.get_classes('loading')).remove();
                                       img_d.prepend(img);
                                       var s= G.gallery.get_img_size(img);
                                       img.height(s.h).width(s.w).show();
                                    });
                                })(decr);
                            }

                        }

                        f();
                    }
                },


                /* touch mode specific popup functions */
                click_mode: {
                    set_popup_size_pos: function(){
                        var pop =       G.gallery.popup_el,
                            img =       pop.find(G.get_classes('image_wrap') +' img'),
                            img_wrap =  pop.find(G.get_classes('.image_wrap'));

                        G.gallery.set_img_size(img);

                        var vw =    viewport.width(),
                            vh =    viewport.height();

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

                    set_next_prev_buttons: function(){
                        var p = G.gallery,
                            list = p.current_list,
                            index = p.current_index
                            pop = p.popup_el,
                            r_btn = pop.find(G.get_classes('right_btn_wrap')),
                            l_btn = pop.find(G.get_classes('left_btn_wrap')),
                            img_wrap = pop.find(G.get_classes('image_wrap'));

                        p.popup.click_mode.show_hide_next_prev();

                        r_btn.unbind('click').click(function(e){
                            if((p.current_index+1 < p.current_list.length)){
                                p.current_index++;
                                p.popup.click_mode.change_to_image(p.current_index,list);
                                p.popup.click_mode.show_hide_next_prev();
                            }
                        });

                        l_btn.unbind('click').click(function(e){
                            if(p.current_index-1 >= 0){
                                p.current_index--;
                                p.popup.click_mode.change_to_image(p.current_index,list);
                                p.popup.click_mode.show_hide_next_prev();
                            }
                        });

                        if(isTouchDevice()){

                            $(img_wrap).swipe({
                                swipeLeft: function() {
                                    if((p.current_index+1 < p.current_list.length)){
                                        p.current_index++;
                                        p.popup.click_mode.change_to_image(p.current_index,list);
                                        p.popup.click_mode.show_hide_next_prev();
                                    }
                                },
                                swipeRight: function() {
                                    if(p.current_index-1 >= 0){
                                        p.current_index--;
                                        p.popup.click_mode.change_to_image(p.current_index,list);
                                        p.popup.click_mode.show_hide_next_prev();
                                    }
                                },
                            });
                        }

                    },

                    show_hide_next_prev: function(){
                        var p = G.gallery,
                            list = p.current_list,
                            index = p.current_index,
                            pop = p.popup_el,
                            r_btn = pop.find(G.get_classes('right_btn_wrap')),
                            l_btn = pop.find(G.get_classes('left_btn_wrap')),
                            has_next = (index+1 < list.length),
                            has_prev = (index-1 >= 0);

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
                    },

                    change_to_image: function (index,list){
                        var p = G.gallery,
                            pop = p.popup_el;

                        p.loading.show();
                        p.preload_image(list[index].href,function(new_image){
                            var old_img = $(G.get_classes('image_wrap')+' img'),
                                ow = old_img.width(),
                                oh = old_img.height();

                            new_image.css({'position':'absolute', 'visibility':'hidden'}).show();
                            pop.find(G.get_classes('image_wrap')).prepend(new_image);
                            $(G.get_classes('title')).html(list[index].rel);

                            var ni =    p.get_img_size(new_image);
                            var nw =    ni.w,
                                nh =    ni.h,
                                vw =    viewport.width(),
                                vh =    viewport.height();
                                oleft = (vw/2)-(pop.outerWidth()/2)-((nw-ow)/2),
                                otop =  (vh/2)-(pop.outerHeight()/2)-(nh-oh)/2;

                            pop.animate({'left': oleft+'px','top': otop+'px'},300);
                            $(old_img).add(new_image).add(G.get_classes('content_wrap')).animate({
                                'width': nw+'px',
                                'height': nh+'px'
                            }, 300, function(){
                                new_image.css({'position': "absolute",'visibility':'visible', 'top':0, 'left':0}).fadeIn(500,function(){
                                    new_image.css({'position': "static"});
                                    old_img.remove();
                                    p.loading.hide();
                                });
                            });
                        });
                    }
                }


            },

            loading:{
                show: function(){
                    var vw =    viewport.width(),
                        vh =   viewport.height();

                    $(G.get_classes('loading')).remove();
                    var loading = $('<div />',{
                        'class': G.get_classes('loading',true,false)
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
                    $(G.get_classes('loading')).remove();
                }
            },

            pic_drag: {
                start_x:null,
                end_x:null,
                start_offset: null,
                img_wrap: null,
                x:0,

                start: function(e){
                    e.preventDefault();
                    var x = (isset(e.targetTouches))?e.targetTouches[0].pageX:e.pageX;
                    G.gallery.pic_drag.start_x = G.gallery.pic_drag.end_x = x;
                    G.gallery.pic_drag.img_wrap = G.gallery.popup_el.find(G.get_classes('image_wrap'));
                    if($.browser.webkit){
                        G.gallery.pic_drag.img_wrap.css("-webkit-transition-duration", "0s");
                    }
                },

                move: function(e){
                    e.preventDefault();
                    var x = (isset(e.targetTouches))?e.targetTouches[0].pageX:e.pageX;
                    if(G.gallery.pic_drag.start_x !== null && G.gallery.pic_drag.img_wrap !== null){
                        G.gallery.pic_drag.end_x = x;
                        var val = G.gallery.pic_drag.x+(x-G.gallery.pic_drag.start_x);
                        if($.browser.webkit){
                            G.gallery.pic_drag.img_wrap.css("-webkit-transform", "translate3d("+val +"px,0px,0px)");
                        } else {
                            G.gallery.pic_drag.img_wrap.css({'left':val+'px'});
                        }
                    }
                },

                end: function(e){
                    e.preventDefault();
                    if(G.gallery.pic_drag.start_x !== null){
                        G.gallery.pic_drag.move_to_closest();
                        G.gallery.pic_drag.start_x = G.gallery.pic_drag.end_x = G.gallery.pic_drag.start_offset = G.gallery.pic_drag.img_wrap = null;
                    } else {
                        G.gallery.pic_drag.start_x = G.gallery.pic_drag.end_x = G.gallery.pic_drag.start_offset = G.gallery.pic_drag.img_wrap = null;
                    }
                },

                cancel: function(e){
                    e.preventDefault();
                    G.gallery.pic_drag.move_to_closest();
                    G.gallery.pic_drag.start_x = G.gallery.pic_drag.end_x = G.gallery.pic_drag.start_offset = G.gallery.pic_drag.img_wrap =  null;
                },

                move_to_closest: function (){
                    var move_x = G.gallery.pic_drag.start_x-G.gallery.pic_drag.end_x,
                        curr_i = Math.round((-1*G.gallery.pic_drag.x) / viewport.width()),
                        max = G.gallery.current_list.length-1,
                        new_i = curr_i,
                        newloc = viewport.width()*(curr_i);

                    if(move_x > G.defaults.swipe_move_treshold*viewport.width() && curr_i+1 <= (max)){
                        new_i = curr_i+1;
                    }

                    if(((-1)*move_x) > G.defaults.swipe_move_treshold*viewport.width() && curr_i-1 >= 0){
                         new_i = curr_i-1;
                    }

                    newloc = Math.round(viewport.width()*(new_i));
                    G.gallery.pic_drag.x = -1*(newloc);
                    G.gallery.current_index = new_i;

                    if($.browser.webkit){
                        G.gallery.pic_drag.img_wrap.css("-webkit-transition-duration", "0.5s");
                        G.gallery.pic_drag.img_wrap.css("-webkit-transform", "translate3d("+(-1*newloc) +"px,0px,0px)");
                    } else {

                        G.gallery.popup_el.find(G.get_classes('image_wrap')).stop().animate({
                            'left': (-1*newloc)
                        },800);
                    }
                }
            },

            set_img_size: function(img){
                var pop =   G.gallery.popup_el,
                    def =   G.defaults,
                    w =     img.width(),
                    h =     img.height();

                img.height(1).width(1);
                var vw =    $(window).width(),
                    vh =    viewport.height(),
                    nph = def.image_to_wiewport_max_ratio_y*vh,
                    npw = w/(h/nph);

                if(npw > vw*def.image_to_wiewport_max_ratio_x){
                    npw = vw*def.image_to_wiewport_max_ratio_x;
                    nph = h/(w/npw);
                }

                if (h > nph){
                    img.add(G.get_classes('content_wrap')).height(nph).width(npw);
                } else {
                    img.height(h).width(w);
                }
            },

            get_img_size: function(img){
                var pop =   G.gallery.popup_el,
                    def =   G.defaults,
                    w =     img.width(),
                    h =     img.height();


                img.height(1).width(1).show();
                var vw =    viewport.width(),
                    vh =    viewport.height(),
                    nph = def.image_to_wiewport_max_ratio_y*vh,
                    npw = w/(h/nph);

                if(npw > vw*def.image_to_wiewport_max_ratio_x){
                    npw = vw*def.image_to_wiewport_max_ratio_x;
                    nph = h/(w/npw);
                }

                if (h > nph){
                    var newh = nph;
                    var neww = npw;
                } else {
                    var newh = h,
                        neww = w;
                }
                img.height(h).width(w).hide();
                return {
                    h: newh,
                    w: w/(h/newh),
                    vw: vw,
                    vh: vh
                }
            },

            preload_image: function(img,f){
                var i = $('<img />').load(function(){
                    f($(this));
                }).attr('src',img);
            },
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
        }
    }

    /* LOCAL FUNCTIONS */


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

    var isTouchDevice = function() {
        return "ontouchstart" in window;
    }

    var format_template =function(s,inserts){
		var t = s;
		for(var i  in inserts){
			var regx = new RegExp('{'+i+'}','gi')
			t = t.replace(regx,inserts[i]);
		}
		return t;
	}

    var viewport ={
        width: function(){
            return (window.innerWidth < $(window).width()) ? window.innerWidth : $(window).width();
        },

        height: function(){
            return (window.innerHeight < $(window).height()) ? window.innerHeight : $(window).height();
        }
    }

    var isset = function(v){
		return(typeof v != 'undefined');
	}

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
                var originalCoord = { x: 0, y: 0 }
                var finalCoord = { x: 0, y: 0 }

                function touchStart(event) {
                    originalCoord.x = event.targetTouches[0].pageX;
                    originalCoord.y = event.targetTouches[0].pageY;
                }

                function touchMove(event) {
                    event.preventDefault();
                    finalCoord.x = event.targetTouches[0].pageX; // Updated X,Y coordinates
                    finalCoord.y = event.targetTouches[0].pageY;
                }

                function touchEnd(event) {
                    //console.log('Ending swipe gesture...')
                    var changeY = originalCoord.y - finalCoord.y;
                    if(changeY < defaults.threshold.y && changeY > (defaults.threshold.y*-1)) {
                        changeX = originalCoord.x - finalCoord.x;

                        if(changeX > defaults.threshold.x) {
                            defaults.swipeLeft();
                        }
                        if(changeX < (defaults.threshold.x*-1)) {
                            defaults.swipeRight();
                        }
                    }
                }

                function touchStart(event) {
                    originalCoord.x = event.targetTouches[0].pageX;
                    originalCoord.y = event.targetTouches[0].pageY;
                    finalCoord.x = originalCoord.x;
                    finalCoord.y = originalCoord.y;
                }

                function touchCancel(event) {
                }

                // Add gestures to all swipable areas
                this.addEventListener("touchstart", touchStart, false);
                this.addEventListener("touchmove", touchMove, false);
                this.addEventListener("touchend", touchEnd, false);
                this.addEventListener("touchcancel", touchCancel, false);

            });
        };
    }

    /* ENDOF LOCAL FUNCTIONS */

    G.init();
})();