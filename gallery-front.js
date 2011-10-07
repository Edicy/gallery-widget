(function(){
    var $,google,jQuery;

    var G = {
        defaults: {
            jquery_atleast_version: '1.5',
            jquery_url: 'ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js',
            jquery_mobile_url: 'http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.js',
            gallery_elements: '.edys-gallery',

            user_defined_templates : false,
            gallery_template: null,
            gallery_touch_template: null,

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
                    p.popup_el.width(viewport.width())
                                    .css({
                                            'top':$(document).scrollTop()+'px',
                                            'left': $(document).scrollLeft()+'px'
                                    }).show(); /* set popup size/pos and show */

                    /* make swipable gallery elements, bind automatic loading to images and show gallery */
                    p.popup.touch_mode.make_all_img_element(index,list,function(){

                        /* setup scroller */
                        p.pic_scroll.scrollable_element = p.popup_el.find(G.get_classes('image_wrap'));
                        p.pic_scroll.scroller_elemets = p.popup_el
                                                         .add(p.overlay_el)
                                                         .add(p.popup_el.find(G.get_classes('image_wrap')+' img'));
                        p.pic_scroll.fixed_stop_width = viewport.width();
                        p.pic_scroll.max_stops = list.length-1;
                        p.pic_scroll.move_treshold = G.defaults.swipe_move_treshold;
                        p.pic_scroll.bind_events();

                        /* set gallery position to clicked image */
                        p.pic_scroll.center_to_index(index);
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
                    if(G.is_touch){
                        p.popup_el.width(viewport.width())
                                  .css({
                                    'left': $(document).scrollLeft()+'px',
                                    'top': $(document).scrollTop()+'px'
                                  });
                        img_wrap_boxes.width(viewport.width());
                    } else {
                        p.popup.click_mode.set_popup_size_pos();
                        var title_height= $(G.get_classes('title')).outerHeight(),
                            wrap_size = G.gallery.get_img_size(imgs);
                        $(G.get_classes('content_wrap')).width(wrap_size.w).height(wrap_size.h +title_height );
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
                    var popSrc = (G.defaults.user_defined_templates === false) ? format_template(G.defaults.popup_template,{
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
                    if(G.is_touch){
                        pop.find(G.get_classes('right_btn_wrap')).hide();
                        pop.find(G.get_classes('left_btn_wrap')).hide();
                    }

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
                                }
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
                                oh = old_img.height(),
                                old_title_height= $(G.get_classes('title')).outerHeight();

                            new_image.css({'position':'absolute', 'visibility':'hidden'}).show();
                            pop.find(G.get_classes('image_wrap')).prepend(new_image);
                            $(G.get_classes('title')).html(list[index].rel);

                            var ni =    p.get_img_size(new_image);
                            var nw =    ni.w,
                                nh =    ni.h,
                                vw =    viewport.width(),
                                vh =    viewport.height(),
                                title_height= $(G.get_classes('title')).outerHeight(),
                                title_change = title_height - old_title_height
                                oleft = (vw/2)-(pop.outerWidth()/2)-((nw-ow)/2),
                                otop =  (vh/2)-(pop.outerHeight()/2)-(((nh+title_height)-(oh+old_title_height))/2);

                            pop.animate({'left': oleft+'px','top': otop+'px'},300);
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

                            $(G.get_classes('content_wrap')).animate({
                                'width': nw+'px',
                                'height': (nh+title_height)+'px'
                            }, 300);

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
                    //img.add(G.get_classes('content_wrap')).height(nph).width(npw);
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
        this.move_treshold = 0.15;
        this.is_touch = "ontouchstart" in window;

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