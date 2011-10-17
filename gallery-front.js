(function(){
    var $,google,jQuery;

    var G = {
        defaults: {
            jquery_atleast_version: '1.5',
            jquery_url: 'ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js',

            gallery_elements: '.edys-gallery',
            user_defined_templates : false,
            gallery_template: null,
            gallery_touch_template: null,

            popup_template: '<div class="{popup_class}">\
                                <div class="{overlay_class}"></div>\
                                <div class="{buttons_class}"></div>\
                                <div class="{bottom_buttons_class}">\
                                    <div class="{btn_wrap_class}"><div class="{left_class}"></div></div>\
                                    <div class="{btn_wrap_class} {btn_wrap_middle_class}"><div class="{close_class}"></div></div>\
                                    <div class="{btn_wrap_class}"><div class="{right_class}"></div></div>\
                                </div>\
                                <div class="{content_wrap_class}">\
                                   <div class="{image_wrap_class}"></div>\
                                   <div class="{title_class}"></div>\
                                </div>\
                            </div>',

            stylesheet: '.edys-gal-gallery-overlay, .edys-gal-gallery-overlay-touch, .edys-gallery-overlay, .edys-gallery-overlay-touch { position: fixed; background: #000000; opacity: 0.75; filter: alpha(opacity = 50); z-index: 1001; margin:0; padding:0; overflow: hidden; left:0; top:0; } .edys-gal-gallery-popup, .edys-gallery-popup, .edys-gal-gallery-popup-touch, .edys-gallery-popup-touch { position: absolute; z-index: 1000; margin:0; padding:0; text-align: center; font-family: Helvetica, Arial; height: 100%; width: 100%; left:0; top:0; overflow: hidden; } .edys-gal-gallery-popup-touch, .edys-gallery-popup-touch { text-align: left; } .edys-gal-gallery-close, .edys-gallery-close, .edys-gal-gallery-close-touch, .edys-gallery-close-touch { background: url("close.gif") no-repeat; width: 33px; height: 33px; display: inline-block; cursor: pointer; vertical-align: middle; } .edys-gal-gallery-bottom-btns, .edys-gallery-bottom-btns, .edys-gal-gallery-bottom-btns-touch, .edys-gallery-bottom-btns-touch { background: rgb(38,44,47); background: rgba(27,33,36,0.8); border-radius: 4px; padding: 10px; display: inline-block; position: absolute; bottom: 0px; margin-bottom: 0.5%; left: 50%; margin-left: -97px; z-index: 1004; } .edys-gal-gallery-btn-wrap, .edys-gallery-btn-wrap, .edys-gal-gallery-btn-wrap-touch, .edys-gallery-btn-wrap-touch { width: 48px; height: 48px; display: inline-block; vertical-align: middle; line-height: 48px; text-align: center; } .edys-gallery-btn-wrap-middle, edys-gal-gallery-btn-wrap-middle, .edys-gallery-btn-wrap-middle-touch, edys-gal-gallery-btn-wrap-middle-touch { border-width: 0px 1px 0px 1px; border-style: solid; border-color: #3c4143; padding: 0 10px; text-align: center; } .edys-gal-gallery-content-wrap, .edys-gallery-content-wrap { clear: both; position: absolute; text-align: center; z-index: 1003; } .edys-gal-gallery-content-wrap-touch, .edys-gallery-content-wrap-touch { width: 100%; position: relative; overflow: hidden; z-index: 1003; margin-top: 0.5%; } .edys-gal-gallery-image-wrap, .edys-gallery-image-wrap { box-shadow: 2px 0px 10px #000000; overflow: hidden; } .edys-gal-gallery-image-wrap img, .edys-gallery-image-wrap img { display: block; border:0; margin:0; } .edys-gal-gallery-image-wrap-box-touch, .edys-gallery-image-wrap-box-touch { display: inline-block; width: 100%; vertical-align: middle; margin-top: -30px; text-align: center; } .edys-gal-gallery-image-wrap-box-touch img, .edys-gallery-image-wrap-box-touch img{ box-shadow: 2px 0px 10px #000000; } .edys-gal-gallery-image-wrap-touch, .edys-gallery-image-wrap-touch{ position: relative; white-space:nowrap; } .edys-gal-gallery-right, .edys-gallery-right, .edys-gal-gallery-right-touch, .edys-gallery-right-touch { background: url("right_arrow.gif") no-repeat 8px center; width: 41px; height: 41px; display: inline-block; cursor: pointer; vertical-align: middle; } .edys-gal-gallery-left, .edys-gallery-left, .edys-gal-gallery-left-touch, .edys-gallery-left-touch { background: url("left_arrow.gif") no-repeat 8px center; width: 41px; height: 41px; display: inline-block; cursor: pointer; vertical-align: middle; } .edys-gal-gallery-loading, .edys-gallery-loading { position: absolute; z-index: 1010; background: url("wait.gif") no-repeat; height: 32px; width: 32px; } .edys-gal-gallery-loading-touch, .edys-gallery-loading-touch { background: url("wait.gif") no-repeat center 0; height: 32px; width: 100%; display: block; clear:both; } .edys-gal-gallery-title, .edys-gallery-title{ background: rgb(38,44,47); background: rgba(27,33,36,0.8); color: #ffffff; display: inline-block; position: relative; z-index: 1010; bottom: 52px; line-height: 18px; border-radius: 4px; padding: 7px 20px; font-size: 14px; } .edys-gal-gallery-title-touch, .edys-gallery-title-touch { background: rgb(38,44,47); background: rgba(27,33,36,0.8); color: #ffffff; display: inline-block; position: relative; z-index: 1010; top: 40px; line-height: 18px; border-radius: 4px; padding: 7px 20px; font-size: 14px; } .edys-gal-gallery-title-touch.edys-gal-gallery-title-notitle-touch, .edys-gallery-title-touch.edys-gallery-title-notitle-touch { visibility: hidden; }',

            default_styles: true,

            classnames: {
                overlay:        'edys-gallery-overlay',
                loading:        'edys-gallery-loading',
                popup:          'edys-gallery-popup',
                left_btn:       'edys-gallery-left',
                right_btn:      'edys-gallery-right',
                btn_wrap:       'edys-gallery-btn-wrap',
                btn_wrap_middle:'edys-gallery-btn-wrap-middle',
                close_btn:      'edys-gallery-close',
                additional_btns:'edys-gallery-btns',
                bottom_btns:    'edys-gallery-bottom-btns',
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
                btn_wrap:       'edys-gal-gallery-btn-wrap',
                btn_wrap_middle:'edys-gal-gallery-btn-wrap-middle',
                close_btn:      'edys-gal-gallery-close',
                additional_btns:'edys-gal-gallery-btns',
                bottom_btns:    'edys-gal-gallery-bottom-btns',
                content_wrap:   'edys-gal-gallery-content-wrap',
                image_wrap:     'edys-gal-gallery-image-wrap',
                image_wrap_box: 'edys-gal-gallery-image-wrap-box',
                title:          'edys-gal-gallery-title',
                notitle:        'edys-gal-gallery-title-notitle'
            },

            title_dissapear_time: 1.5,
            title_dissapear_time_touch: 3,

            touchscreen_class_suffix: '-touch',
            image_to_wiewport_max_ratio_x: 0.8,
            image_to_wiewport_max_ratio_y: 0.8,
            image_to_wiewport_max_ratio_touch_x: 0.8,
            image_to_wiewport_max_ratio_touch_y: 0.97,
            swipe_move_treshold: 0.10,
            tap_move_treshold: 0,
            jumping_mode: 'strict',
            mode: "auto"
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
                    init_delay_fix();
                    G.run();
                });
            });
        },

        run: function(){
            var def = G.defaults;
            if (def.default_styles) {
                G.startup_functions.add_stylesheet(def.stylesheet);
            }
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
                G.is_touch = (G.defaults.mode=="auto") ? isTouchDevice() : (G.defaults.mode=="touch") ? true : false;
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
                        'rel': (isset(l.attr('rel')) && l.attr('rel') != '') ? l.attr('rel') : '&nbsp;',
                        'el': l
                    });
                });
                return r;
            },

            add_stylesheet: function(source) {
                var styles = $("head").children("style, link");
                var style = $("<style>" + source + "</style>").attr("type", "text/css");
                if (styles.length > 0){
                    styles.eq(0).before(style);
                } else {
                    $("head").append(style);
                }
            }
        },

        get_classes: function(name,include_nonsys,include_dot){
            var sc =                G.defaults.system_classnames,
                dc =                G.defaults.classnames,
                include_nonsys =    (isset(include_nonsys)||G.defaults.user_defined_templates !== false)?include_nonsys:false,
                include_dot =       isset(include_dot)?include_dot:true,
                suf =               (G.is_touch)?G.defaults.touchscreen_class_suffix:'',
                dot =               (include_dot)?'.':'',
                n =                 dot+sc[name]+suf;
            if(G.defaults.user_defined_templates !== false){
                return dot+dc[name]+suf;
            } else {
                if(include_nonsys){ n += ' ' + dot+dc[name] + suf;}
                return n;
            }
        },

        gallery: {
            overlay_el:     null,
            popup_el:       null,
            current_list:   null,
            current_index:  null,
            pic_scroll : new scroller(),

            show: function(index,list){
                var p = G.gallery;

                /* save popup image list and current index */
                p.current_list = list;
                p.current_index = index;

                /* make popup and overlay first time */
                //if(p.overlay_el === null){ p.overlay_el = p.overlay.make(); }
                if(p.popup_el === null){
                    p.popup_el = p.popup.make();
                    if (!G.is_touch) {
                        p.popup.click_mode.set_next_prev_buttons();
                    } else {
                        p.popup.touch_mode.set_next_prev_buttons();
                    }
                    p.overlay_el = p.popup_el.find(G.get_classes('overlay'));
                    if(!G.is_touch){
                        p.overlay_el.click(function(){
                            G.gallery.hide();
                        })
                    }
                }

                $(document).unbind('keydown').keydown(function(e){
                    switch(e.which){
                        case 39: /* fw */
                            G.gallery.next();
                        break;
                        case 37:
                            G.gallery.previous();
                        break;
                        case 27:
                            G.gallery.hide();
                        break;
                    }
                });

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
                $(document).unbind('keydown');
            },

            /* initiation functions */
            initiate: {
                touch_mode: function(){
                    var p =     G.gallery,
                        index = p.current_index,
                        list =  p.current_list;

                    p.loading.hide();
                    p.popup_el.find(G.get_classes('title')).remove(); /* hide global title element. all touch pictures have their own title */

                    p.popup_el.width(viewport.width())
                                    .css({
                                            'top':$(document).scrollTop()+'px',
                                            'left': $(document).scrollLeft()+'px'
                                    }).show(); /* set popup size/pos and show */

                    /* make swipable gallery elements, bind automatic loading to images and show gallery */
                    p.popup.touch_mode.make_all_img_element(index,list,function(){

                        if(G.defaults.title_dissapear_time_touch > -1){
                            var btns =       p.popup_el.find(G.get_classes('bottom_btns')),
                                titl =       p.popup_el.find(G.get_classes('title')),
                                hidables = btns.add(titl);

                            hidables.stop(true, true).show().css('opacity',1).delay(G.defaults.title_dissapear_time_touch*1000).fadeTo(400,0);
                            p.pic_scroll.tap = function(){
                                hidables.stop(true, true).show().css('opacity',1);
                                hidables.stop(true, true).delay(G.defaults.title_dissapear_time_touch*1000).fadeTo(400,0);
                            }
                        }

                        /* setup scroller */
                        p.pic_scroll.scrollable_element = p.popup_el.find(G.get_classes('image_wrap'));
                        p.pic_scroll.scroller_elemets = p.popup_el
                                                         .add(p.overlay_el)
                                                         .add(p.popup_el.find(G.get_classes('image_wrap')+' img'));
                        p.pic_scroll.fixed_stop_width = viewport.width();
                        p.pic_scroll.max_stops = list.length-1;
                        p.pic_scroll.move_treshold = G.defaults.swipe_move_treshold;
                        p.pic_scroll.tap_treshold = G.defaults.tap_move_treshold;
                        p.pic_scroll.bind_events();

                        /* set gallery position to clicked image */
                        p.pic_scroll.center_to_index(index);
                        p.pic_scroll.after_stop = function (ind){
                            p.current_index = ind;
                            p.popup.click_mode.show_hide_next_prev();
                        }
                        p.popup.click_mode.show_hide_next_prev();

                    });
                },

                click_mode: function(){
                    var p =     G.gallery,
                        index = p.current_index,
                        list =  p.current_list,
                        title = $(G.get_classes('title'));

                    /*preload clicked image */
                    p.preload_image(list[index].href,function(img){
                        /* set title */
                        if(list[index].rel != '&nbsp;'){
                            title.show().html(list[index].rel);
                            if(G.defaults.title_dissapear_time > -1){
                                title.stop(true, true).delay(G.defaults.title_dissapear_time*1000).fadeOut();
                                $(G.get_classes('content_wrap')).unbind('mousemove').bind('mousemove',function(){
                                    if(G.gallery.current_list[G.gallery.current_index].rel != "&nbsp;"){
                                        title.stop(true, true).show().css('opacity',1);
                                        $(this).unbind('mouseleave').one("mouseleave",function(){
                                            title.stop(true, true).delay(G.defaults.title_dissapear_time*1000).fadeOut();
                                        });
                                    }
                                });

                            }

                        } else {
                            $(G.get_classes('title')).hide();
                        }

                        /* draw first preloaded image */
                        p.popup_el.find(G.get_classes('image_wrap')).html(img);

                        /* reset popup and overlay size */
                        p.popup_el.css('visibility','hidden').show();
                        p.popup.click_mode.set_popup_size_pos();
                        p.overlay.resize();
                        p.popup_el.css('visibility','visible');
                        p.popup.click_mode.show_hide_next_prev();

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
                    if(G.is_touch){
                        p.popup_el.width(viewport.width())
                                  .css({
                                    'left': $(document).scrollLeft()+'px',
                                    'top': $(document).scrollTop()+'px'
                                  });
                        img_wrap_boxes.width(viewport.width());
                    } else {
                        p.popup.click_mode.set_popup_size_pos();
                        var wrap_size = G.gallery.get_img_size(imgs);
                        $(G.get_classes('content_wrap')).width(wrap_size.w).height(wrap_size.h);
                    }

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
                    p.pic_scroll.fixed_stop_width = viewport.width();
                    p.pic_scroll.center_to_index();
                }
            },

            overlay:{
                resize: function(){
                    var   o = G.gallery.overlay_el;
                    o.width(1).height(1);
                    var w = viewport.width(),
                        h = $(document).height();
                    o.width(w).height(h);
                }
            },

            popup: {
                make: function (){
                    var popSrc = (G.defaults.user_defined_templates === false) ? format_template(G.defaults.popup_template,{
                            'popup_class':              G.get_classes('popup',true,false),
                            'close_class':              G.get_classes('close_btn',true,false),
                            'left_class':               G.get_classes('left_btn',true,false),
                            'right_class':              G.get_classes('right_btn',true,false),
                            'btn_wrap_class':           G.get_classes('btn_wrap',true,false),
                            'btn_wrap_middle_class':    G.get_classes('btn_wrap_middle',true,false),
                            'buttons_class':            G.get_classes('additional_btns',true,false),
                            'content_wrap_class':       G.get_classes('content_wrap',true,false),
                            'image_wrap_class':         G.get_classes('image_wrap',true,false),
                            'title_class':              G.get_classes('title',true,false),
                            'bottom_buttons_class':     G.get_classes('bottom_btns',true,false),
                            'clickable_bg_class':       G.get_classes('popup_click_bg',true,false),
                            'overlay_class':            G.get_classes('overlay',true,false)
                        }) : (G.is_touch) ? G.defaults.gallery_touch_template : G.defaults.gallery_template,
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
                    /*if(G.is_touch){
                        pop.find(G.get_classes('right_btn')).hide();
                        pop.find(G.get_classes('left_btn')).hide();
                    }*/

                    $("body").prepend(pop);
                    return pop;
                },

                /* touch mode specific popup functions */
                touch_mode: {
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
                        if(list[index].rel == '&nbsp;'){
                            current_title.addClass(G.get_classes('notitle',true,false));
                        }
                        img_w_c.append(current_title).append('<br/>');
                        imgs_wrap.width((max+1)*viewport.width()).html(img_w_c);

                        G.gallery.preload_image(list[index].href,function(img_c){
                            img_w_c.find(G.get_classes('loading')).remove();
                            img_w_c.append(img_c);
                            var s_c = G.gallery.get_img_size(img_c);
                            img_c.height(s_c.h).width(s_c.w).show();
                        });

                        if(index < max){
                            for(var incr = index+1; incr <= max; incr++){
                                (function(inc){
                                    var img_i = img_tpl.clone();
                                    var titl = $('<div/>').addClass(G.get_classes('title',true,false)).html(list[inc].rel);
                                    if(list[inc].rel == '&nbsp;'){
                                        titl.addClass(G.get_classes('notitle',true,false));
                                    }
                                    img_i.append(titl).append('<br/>');
                                    imgs_wrap.append(img_i);
                                    G.gallery.preload_image(list[inc].href,function(img){
                                        //G.gallery.set_img_size(img);
                                        img_i.find(G.get_classes('loading')).remove();
                                        img_i.append(img);
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
                                    if(list[dec].rel == '&nbsp;'){
                                        titl.addClass(G.get_classes('notitle',true,false));
                                    }
                                    img_d.append(titl).append('<br/>');
                                    imgs_wrap.prepend(img_d);
                                    G.gallery.preload_image(list[dec].href,function(img){
                                       // G.gallery.set_img_size(img);
                                       img_d.find(G.get_classes('loading')).remove();
                                       img_d.append(img);
                                       var s= G.gallery.get_img_size(img);
                                       img.height(s.h).width(s.w).show();
                                    });
                                })(decr);
                            }
                        }

                        f();
                    },

                    set_next_prev_buttons: function(){
                        var p = G.gallery,
                            list = p.current_list,
                            index = p.current_index
                            pop = p.popup_el,
                            r_btn = pop.find(G.get_classes('right_btn')),
                            l_btn = pop.find(G.get_classes('left_btn')),
                            img_wrap = pop.find(G.get_classes('image_wrap'));

                        p.popup.click_mode.show_hide_next_prev();

                        if(isTouchDevice()){
                            r_btn.get(0).addEventListener("touchstart",function(){
                                G.gallery.next();
                            }, false);

                            l_btn.get(0).addEventListener("touchstart",function(){
                                G.gallery.previous();
                            }, false);
                        } else {
                            r_btn.click(function(e){
                                 G.gallery.next();
                            });

                            l_btn.click(function(e){
                                G.gallery.previous();
                            });
                        }
                    }
                },

                /* touch mode specific popup functions */
                click_mode: {
                    set_popup_size_pos: function(){
                        var pop =       G.gallery.popup_el,
                            img =       pop.find(G.get_classes('image_wrap') +' img'),
                            //img_wrap =  pop.find(G.get_classes('image_wrap')),
                            wrp = pop.find(G.get_classes('content_wrap')),
                            btns = pop.find(G.get_classes('bottom_btns'));

                        pop.height(1);
                        var    mh = viewport.height()+$(document).scrollTop();
                        pop.height(mh);
                        G.gallery.set_img_size(img);

                        var vw =    viewport.width(),
                            vh =    viewport.height();

                        wrp.css({
                            'height': 'auto',
                            'width': 'auto'
                        })

                        var pw =    wrp.outerWidth(),
                            ph =    wrp.outerHeight(true),
                            pleft = (vw/2)-(pw/2)+$(document).scrollLeft(),
                            ptop = ((vh-btns.outerHeight(true))/2)-(ph/2)+$(document).scrollTop();

                        /*img.css({
                            'left':   (img_wrap.outerWidth()/2)-(img.width()/2)
                        });*/

                        wrp.css({
                            'left': pleft+'px',
                            'top': ptop+'px'
                        });

                        pop.height(mh);

                    },

                    set_next_prev_buttons: function(){
                        var p = G.gallery,
                            list = p.current_list,
                            index = p.current_index
                            pop = p.popup_el,
                            r_btn = pop.find(G.get_classes('right_btn')),
                            l_btn = pop.find(G.get_classes('left_btn')),
                            img_wrap = pop.find(G.get_classes('image_wrap'));

                        p.popup.click_mode.show_hide_next_prev();

                        r_btn.unbind('click').click(function(e){
                            G.gallery.next();
                        });

                        l_btn.unbind('click').click(function(e){
                            G.gallery.previous();
                        });

                        if(isTouchDevice()){
                            $(img_wrap).swipe({
                                swipeLeft: function() {
                                    G.gallery.next();
                                },
                                swipeRight: function() {
                                    G.gallery.previous();
                                }
                            });
                        }

                    },

                    show_hide_next_prev: function(){
                        var p = G.gallery,
                            list = p.current_list,
                            index = p.current_index,
                            pop = p.popup_el,
                            r_btn = pop.find(G.get_classes('right_btn')),
                            l_btn = pop.find(G.get_classes('left_btn')),
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
                            pop = p.popup_el,
                            wrp = pop.find(G.get_classes('content_wrap')),
                            btns = pop.find(G.get_classes('bottom_btns'));

                        p.loading.show();
                        $(G.get_classes('content_wrap')).unbind('mouseleave');
                        p.preload_image(list[index].href,function(new_image){
                            var old_img = $(G.get_classes('image_wrap')+' img'),
                                ow = old_img.width(),
                                oh = old_img.height();

                            new_image.css({'position':'absolute', 'visibility':'hidden'}).show();
                            pop.find(G.get_classes('image_wrap')).prepend(new_image);
                            if(list[index].rel != '&nbsp;'){
                                $(G.get_classes('title')).stop(true, true).show().css('opacity',1).html(list[index].rel);
                                if(G.defaults.title_dissapear_time > -1){
                                    $(G.get_classes('title')).stop(true, true).delay(G.defaults.title_dissapear_time*1000).fadeOut();
                                }
                            } else {
                                $(G.get_classes('title')).html('');
                                $(G.get_classes('title')).hide();
                            }

                            var ni =    p.get_img_size(new_image);
                            var nw =    ni.w,
                                nh =    ni.h,
                                vw =    viewport.width(),
                                vh =    viewport.height(),
                                oleft = (vw/2)-(wrp.outerWidth() / 2)-((nw-ow)/2)+$(document).scrollLeft(),
                                otop =  ((vh-btns.outerHeight(true))/2)-((wrp.outerHeight(true))/2)-(((nh)-(oh))/2)+$(document).scrollTop();

                            wrp.animate({
                                'left': oleft+'px',
                                'top': otop+'px',
                                'width': nw+'px',
                                'height': (nh)+'px'
                            },300);
                            $(old_img).add(new_image).animate({
                                'width': nw+'px',
                                'height': (nh)+'px'
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
                        'top':          ((vh / 2) - (h / 2)) + 'px',
                        'left':         ((vw / 2) - (w / 2)) + 'px',
                        'visibility':   'visible'
                    });
                },

                hide: function(){
                    $(G.get_classes('loading')).remove();
                }
            },

            set_img_size: function(img){
                var pop =   G.gallery.popup_el,
                    def =   G.defaults,
                    w =     img.width(),
                    h =     img.height(),
                    ratio_x = (G.is_touch) ? def.image_to_wiewport_max_ratio_touch_x : def.image_to_wiewport_max_ratio_x,
                    ratio_y = (G.is_touch) ? def.image_to_wiewport_max_ratio_touch_y : def.image_to_wiewport_max_ratio_y;

                img.height(1).width(1);
                var vw =    $(window).width(),
                    vh =    viewport.height(),
                    nph = ratio_y*vh,
                    npw = w/(h/nph);

                if(npw > vw*ratio_x){
                    npw = vw*ratio_x;
                    nph = h/(w/npw);
                }

                if (h > nph){
                    img.add(G.get_classes('content_wrap')).height(nph).width(npw);
                    //img.add(G.get_classes('content_wrap')).height(nph).width(npw);
                } else {
                    img.height(h).width(w);
                }
            },

            get_img_size: function(img){
                var pop =   G.gallery.popup_el,
                    def =   G.defaults,
                    w =     img.width(),
                    h =     img.height(),
                    ratio_x = (G.is_touch) ? def.image_to_wiewport_max_ratio_touch_x : def.image_to_wiewport_max_ratio_x,
                    ratio_y = (G.is_touch) ? def.image_to_wiewport_max_ratio_touch_y : def.image_to_wiewport_max_ratio_y;

                img.height(1).width(1).show();
                var vw =    viewport.width(),
                    vh =    viewport.height(),
                    nph = ratio_y*vh,
                    npw = w/(h/nph);

                if(npw > vw*ratio_x){
                    npw = vw*ratio_x;
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

            next: function(){
                var p = G.gallery;
                if (p.current_index+1 < p.current_list.length) {
                    p.current_index++;
                    if (G.is_touch) {
                        p.pic_scroll.next();
                    } else {
                        p.popup.click_mode.change_to_image(p.current_index,p.current_list);
                    }
                    p.popup.click_mode.show_hide_next_prev();
                }
            },

            previous: function(){
                var p = G.gallery;
                if (p.current_index-1 >= 0) {
                    p.current_index--;
                    if (G.is_touch) {
                        p.pic_scroll.previous();
                    } else {
                        p.popup.click_mode.change_to_image(p.current_index,p.current_list);
                    }
                    p.popup.click_mode.show_hide_next_prev();
                }
            },

            preload_image: function(img,f){
                var i = $('<img />').load(function(){
                    f($(this));
                }).attr('src',img);
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
			var regx = new RegExp('{'+i+'}','gi');
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

    /* scroller class. needs jQuery to operate */
    function scroller(){
        this.start_x = null;
        this.end_x = null;
        this.start_offset = null;
        this.scrollable_element = null;
        this.scroller_elemets = null;
        this.x=0;
        this.current_index =0;
        this.fixed_stops = true;
        this.fixed_stop_width = 0;
        this.max_stops = 0;
        this.move_treshold = 0.01;
        this.is_touch = "ontouchstart" in window;
        this.tap_treshold = 0;
        this.tap = function(){ alert('TAP');};
        this.after_stop =  function(index){  };

        var me = this;

        function isset(v){
            return(typeof v != 'undefined');
        }

        function mouse_x(e){
            return (isset(e.targetTouches)) ? e.targetTouches[0].pageX : e.pageX;
        }

        this.bind_events = function(){
            if(this.is_touch){
                this.bind_touch_events();
            } else {
                this.bind_click_events();
            }
        }

        function start(e){
            e.preventDefault();
            me.start_x = me.end_x = mouse_x(e);
            if($.browser.webkit){
                me.scrollable_element.css("-webkit-transition-duration", "0s");
            }
        }

        function move(e){
            e.preventDefault();
            if(me.start_x !== null && me.scrollable_element !== null){
                me.end_x = mouse_x(e);
                var val = me.x+(me.end_x-me.start_x);
                if($.browser.webkit){
                    me.scrollable_element.css("-webkit-transform", "translate3d("+val +"px,0px,0px)");
                } else {
                    me.scrollable_element.css({'left':val+'px'});
                }
            }
        }

        function end(e){
            e.preventDefault();
            if(me.fixed_stops && me.start_x !== null && me.end_x !== null && me.scrollable_element !== null){
                me.move_to_closest();

                /* detect tap */
                var move_x = Math.abs(me.start_x - me.end_x);
                if (move_x <= me.tap_treshold * me.fixed_stop_width) {
                    me.tap();
                }
            }

            me.start_x = me.end_x = null;
        }

        function cancel(e){
            e.preventDefault();
            if(me.fixed_stops && me.start_x !== null && me.end_x !== null && me.scrollable_element !== null){
                me.move_to_closest();
            }
            me.start_x = me.end_x = null;
        }

        this.move_to_closest = function (){
            var move_x = this.start_x-this.end_x,
                curr_i = Math.round((-1*this.x) / this.fixed_stop_width),
                new_i = curr_i,
                newloc = this.fixed_stop_width*(curr_i);

            if(move_x > this.move_treshold*this.fixed_stop_width && curr_i+1 <= (this.max_stops)){
                new_i = curr_i+1;
            }

            if(((-1)*move_x) > this.move_treshold*this.fixed_stop_width && curr_i-1 >= 0){
                 new_i = curr_i-1;
            }

            newloc = Math.round(this.fixed_stop_width*(new_i));
            this.current_index = new_i;
            this.x = -1*(newloc);

            if($.browser.webkit){
                this.scrollable_element.css("-webkit-transition-duration", "0.5s");
                this.scrollable_element.css("-webkit-transform", "translate3d("+(-1*newloc) +"px,0px,0px)");
            } else {
                this.scrollable_element.stop().animate({'left': (-1*newloc)},800);
            }

            this.after_stop(new_i);

        }

        this.move_to = function(index){
            var newloc = this.fixed_stop_width*(index);
            if($.browser.webkit){
                this.scrollable_element.css("-webkit-transition-duration", "0.5s");
                this.scrollable_element.css("-webkit-transform", "translate3d("+(-1*newloc) +"px,0px,0px)");
            } else {
                this.scrollable_element.stop().animate({'left': (-1*newloc)},800);
            }
            this.current_index = index;
            this.x = -1*(newloc);
            this.after_stop(index);
        }

        this.next = function(){
            if(this.current_index+1 <= this.max_stops){
                this.move_to(this.current_index+1);
            }
        }

        this.previous = function(){
            if(this.current_index-1 >= 0){
                this.move_to(this.current_index-1);
            }
        }

        /* set image with index to viewport center */
        this.center_to_index = function (index){
            if (this.scrollable_element !== null){
                if(isset(index)){
                    this.current_index = index;
                } else {
                    var index = this.current_index;
                }
                var loc = -1*((index)*this.fixed_stop_width);
                if($.browser.webkit){
                    this.scrollable_element.css({
                        "-webkit-transform": "translate3d("+loc+"px,0px,0px)",
                        "-webkit-transition-duration": "0s"
                    });
                } else {
                    this.scrollable_element.stop().css('left',loc+'px');
                }
                this.x = loc;
            }
        }

        this.bind_touch_events = function(){
            if(this.scroller_elemets !== null){
                this.scroller_elemets.each(function(){
                    /* remove old events */
                    this.removeEventListener("touchstart", start, false);
                    this.removeEventListener("touchmove", move, false);
                    this.removeEventListener("touchend", end, false);
                    this.removeEventListener("touchcancel", cancel, false);

                    /* add events */
                    this.addEventListener("touchstart", start, false);
                    this.addEventListener("touchmove", move, false);
                    this.addEventListener("touchend", end, false);
                    this.addEventListener("touchcancel", cancel, false);
                });
            }
        }

        this.bind_click_events = function(){
            if(this.scroller_elemets !== null){
                /* remove old events */
                this.scroller_elemets.unbind('mousedown')
                                     .unbind('mousemove')
                                     .unbind('mouseup');

                /* add events */
                this.scroller_elemets.mousedown(start)
                                     .mousemove(move)
                                     .mouseup(end);
            }
        }

    }

    /* jquery delay is flawed - does not queue delay. untill fix has been implemented into new version this has to be implemented */
    var init_delay_fix = function(){
        $.fn.delay = function(time, callback){
            // Empty function:
            jQuery.fx.step.delay = function(){};
            // Return meaningless animation, (will be added to queue)
            return this.animate({delay:1}, time, callback);
        }
    }

    /* add swipe to jquery */
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