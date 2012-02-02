(function(){
    var $;
    
    //fgnass.github.com/spin.js#v1.2.2 */
    (function(a,b,c){function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1);return g}function h(a,b,c){c&&!c.parentNode&&h(a,c),a.insertBefore(b,c||null);return a}function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");h(b.getElementsByTagName("head")[0],a);return a.sheet||a.styleSheet}(),o=function r(a){if(!this.spin)return new r(a);this.opts=m(a||{},r.defaults,p)},p=o.defaults={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:.25,fps:20},q=o.prototype={spin:function(a){this.stop();var b=this,c=b.el=l(g(),{position:"relative"}),d,e;a&&(e=n(h(a,c,a.firstChild)),d=n(c),l(c,{left:(a.offsetWidth>>1)-d.x+e.x+"px",top:(a.offsetHeight>>1)-d.y+e.y+"px"})),c.setAttribute("aria-role","progressbar"),b.lines(c,b.opts);if(!f){var i=b.opts,j=0,k=i.fps,m=k/i.speed,o=(1-i.opacity)/(m*i.trail/100),p=m/i.lines;(function q(){j++;for(var a=i.lines;a;a--){var d=Math.max(1-(j+a*p)%m*o,i.opacity);b.opacity(c,i.lines-a,d,i)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))})()}return b},stop:function(){var a=this.el;a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c);return this}};q.lines=function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:"translate3d(0,0,0)",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},q.opacity=function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)},function(){var a=l(g("group"),{behavior:"url(#default#VML)"}),b;if(!k(a,"transform")&&a.adj){for(b=4;b--;)i.addRule(["group","roundrect","fill","stroke"][b],"behavior:url(#default#VML)");q.lines=function(a,b){function k(a,d,i){h(f,h(l(e(),{rotation:360/b.lines*a+"deg",left:~~d}),h(l(g("roundrect",{arcsize:1}),{width:c,height:b.width,left:b.radius,top:-b.width>>1,filter:i}),g("fill",{color:b.color,opacity:b.opacity}),g("stroke",{opacity:0}))))}function e(){return l(g("group",{coordsize:d+" "+d,coordorigin:-c+" "+ -c}),{width:d,height:d})}var c=b.length+b.width,d=2*c,f=e(),i=~(b.length+b.radius+b.width)+"px",j;if(b.shadow)for(j=1;j<=b.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=b.lines;j++)k(j);return h(l(a,{margin:i+" 0 0 "+i,zoom:1}),f)},q.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}else f=k(a,"animation")}(),a.Spinner=o})(window,document);

    var Edys_gallery_init = {
        settings: {
            jquery_atleast_version: "1.5",
            jquery_url: "ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js",
            google_api_url: "http://www.google.com/jsapi",
            gallery_elements: '.edys-gallery',
            autorun_init: true,
            autorun_gallery: true,
            init_complete: null,
        }, 
        
        preopened_image: null,
        pre_spinner: null,
        pre_spinner_el: null,
        templinks: null,
        
           
        run: function(){
            var me = this;
            
            this._set_temp_link_clicks();
            /* propagate preload functions before jquery initialized */
            if ( typeof window.edys_gallery_options !='undefined' ) {
                if ( typeof window.edys_gallery_options.autorun_init !='undefined' ) {
                    this.settings.autorun_init = window.edys_gallery_options.autorun_init;
                }
                if ( typeof window.edys_gallery_options.autorun_gallery !='undefined' ) {
                    this.settings.autorun_gallery = window.edys_gallery_options.autorun_search;
                }
            } else {
                window.edys_gallery_options = {};
            }

            if ( this.settings.autorun_init ){
                if (typeof window.edys_gallery_options.loaded == "undefined") {
                    window.edys_gallery_options.loaded = true;
                    this.get_jquery( function() { 
                        me.add_spinner_fn();
                        me.handeAllLoaded();
                    });
                }
            }
        },
        
        _handle_temp_link_click: function ( o ){
            this.preopened_image = o;
            if(this.pre_spinner_el == null){
                var el = document.createElement('div');
                el.className = 'edys-gallery-loading-wrap';
                el.style.position = 'fixed';
                el.style.left = '50%';
                el.style.top = '50%';
                document.body.appendChild(el);
                this.pre_spinner_el = el;
                this.pre_spinner = new Spinner({color:"#ffffff"}).spin(el);
            }         
        },
        
        _set_temp_link_clicks: function(){
            var L = this._get_links(),
                me = this;
            this.templinks = L;
            for ( var i = 0, max = L.length; i < max ; i++ ){
                (function(j){
                    L[j].link.onclick = function (e) { e.preventDefault(); me._handle_temp_link_click.call( me, L[j] ); };
                })(i);
                
            }
        },
        
        _remove_temp_link_clicks: function(){
           if(this.templinks != null){
               for ( var i = 0, max = this.templinks.length; i < max ; i++ ){
                    this.templinks[i].link.onclick = function () {}; 
               }
           }
        },
        
        _get_elements_by_class: function(name){
            if(document.getElementsByClassName){
                return document.getElementsByClassName(name);
            } else {
                var all = document.getElementsByTagName('*'),
                    classes = [];
                for ( var i = 0, max = all.length; i < max ; i++ ){
                    if( all[i].className == name ) {
                        classes.push(all[i]);
                    }
                }
                return classes;
            }
        },
        
        _get_links: function (){
            var gal_class = this.settings.gallery_elements.replace(/^\./,""),
                gal_els = this._get_elements_by_class(gal_class),
                links_obj = [],
                links;
            
            for ( var i = 0, max = gal_els.length; i < max ; i++ ){
                links = gal_els[i].getElementsByTagName('a');
                for ( var j = 0, max_link = links.length; j < max_link; j++ ){
                    links_obj.push({
                        'link': links[j],
                        'gallery': gal_els[i]
                    });
                }
            }
            return links_obj;
        },
        
        _remove_preload_spinner: function(){
            if( this.pre_spinner_el != null ){
                this.pre_spinner.stop();
                this.pre_spinner_el.parentNode.removeChild(this.pre_spinner_el);
            }
        },
        
        add_spinner_fn: function (){
            $.fn.spin = function(opts) {
                this.each( function() {
                    var $this = $(this),
                        data = $this.data();
                    
                    if (data.spinner) {
                        data.spinner.stop();
                        delete data.spinner;
                    }
                    if (opts !== false) {
                        data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
                    }
                });
                return this;
            };
        },
        
        handeAllLoaded: function() {
            $.extend(true, this.settings, window.edys_gallery_options);
            apply_edys_gallery_module($);
            if ( this.settings.autorun_gallery ) {
                $(document).ready( $.proxy(function() {
                    this._remove_preload_spinner();
                   // this._remove_temp_link_clicks();
                    $(this.settings.gallery_elements).edys_gallery(this.settings);
                    if(this.settings.init_complete){
                        this.settings.init_complete($);
                    } else {
                        $('body').trigger('Edys_gallery_init_complete',$);
                    }
                    if(this.preopened_image != null ){
                        $(this.preopened_image.gallery).edys_gallery('get_object').show(this.preopened_image.link);
                    }
                }, this));
            } else {
                this._remove_preload_spinner();
              //  this._remove_temp_link_clicks();
                if(this.settings.init_complete){
                    this.settings.init_complete($);
                } else {
                    $('body').trigger('Edys_gallery_init_complete',$);
                }
            }
        },
        
        /* function to get script dynamically without jquery loaded */
        load_script: function(source, f) {
            (function(d, t) {
                var js = d.createElement(t);
                if(typeof js.onreadystatechange == "undefined") { js.onload = f; }
                var prot = (location.protocol != "file:") ? location.protocol : "http:";
                js.src = prot + '//'+source;
                js.onreadystatechange = function() {
                    if (this.readyState == 'complete' || this.readyState == 'loaded') {
                        f();
                    }
                };
                (d.getElementsByTagName('head')[0] || d.documentElement).appendChild(js);
            }(document, 'script'));
        },

        get_jquery: function(f) {
            var old_doc_load = document.body.onload || function () {},
                me = this;
                if (window.jQuery === undefined ) {
                    me.load_script(me.settings.jquery_url,function() {
                       $ = window.jQuery.noConflict(true);
                       f();
                    });
                } else if ( window.jQuery.fn.jquery < me.settings.jquery_atleast_version ) {
                    var old_script = window.jQuery;
                    var old$ = (window.$ !== undefined ) ? window.$ : null;
                    me.load_script(me.settings.jquery_url,function() {
                        $ = window.jQuery.noConflict(true);
                        window.jQuery = old_script;
                        if( old$ != null ) { window.$ = old$; }
                        f();
                    });
                } else {
                    $ = window.jQuery;
                    f();
                }
          
        }
    };
    
    /* wrapper function for applying jQuery edys_gallery plugin */
    var apply_edys_gallery_module = function($){
        
        var G = function(gal_elements, user_options){
            this.defaults = {
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
                                       <div class="{onimage_nav}">\
                                           <div class="{onimage_nav_rev}"></div>\
                                           <div class="{onimage_nav_fw}"></div>\
                                       </div>\
                                       <div class="{image_wrap_class}"></div>\
                                       <div class="{title_class}"></div>\
                                    </div>\
                                </div>',
                loader_template: '<div class="{loader_wrap_class}">\
                                     <div class="{loader_class}">\
                                     </div>\
                                 </div>',

                classnames: {
                    overlay:        'edys-gallery-overlay',
                    loading:        'edys-gallery-loading',
                    loading_wrap:   'edys-gallery-loading-wrap',
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
                    notitle:        'edys-gallery-title-notitle',
                    onimage_nav:     'edys-gallery-onimage-nav',
                    onimage_nav_rev:'edys-gallery-onimage-nav-rev',
                    onimage_nav_fw: 'edys-gallery-onimage-nav-fw'
                },

                system_classnames: {
                    overlay:        'edys-gal-gallery-overlay',
                    loading:        'edys-gal-gallery-loading',
                    loading_wrap:   'edys-gallery-loading-wrap',
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
                    notitle:        'edys-gal-gallery-title-notitle',
                    onimage_nav:     'edys-gal-gallery-onimage-nav',
                    onimage_nav_rev:'edys-gal-gallery-onimage-nav-rev',
                    onimage_nav_fw: 'edys-gal-gallery-onimage-nav-fw'
                },
                
                spinner_options: {
                    lines: 10,
                    length: 8,
                    width:6,
                    radius: 9,
                    trail: 57,
                    speed: 1.4
                },

                title_dissapear_time: 3,
                title_dissapear_time_touch: 3,
                touchscreen_class_suffix: '-touch',
                image_to_wiewport_max_ratio_x: 0.8,
                image_to_wiewport_max_ratio_y: 0.8,
                image_to_wiewport_max_ratio_touch_x: 0.8,
                image_to_wiewport_max_ratio_touch_y: 0.97,
                swipe_move_treshold: 0.10,
                tap_move_treshold: 0,
                click_onimage_nav: true,
                jumping_mode: 'strict',
                mode: "auto",
                texts: {
                    wait: "Wait"
                }

            };
            
            this.gallery_elements = gal_elements;
            this.is_touch =         false;
            this.overlay_el =       null;
            this.popup_el =         null;
            this.current_list =     null;
            this.lists =            [];
            this.current_index =    null;
            this.pic_scroll =       new scroller();
            this.oc_timer =         null;
            
            this.init( user_options );
        };

        G.prototype = {
            init: function( options ) {
               if ( options ) { $.extend( true, this.defaults, options ); }
               this.set_touch_mode();
               init_swipe();
               init_delay_fix();
               this.run();
            },

            run: function() {
                var def = this.defaults,
                    me = this;
                
                if ( def.jumping_mode == 'strict' ) {
                    this.gallery_elements.each( function() {
                        var links = $(this).find('a');
                        me.set_link_clicks(links);
                    });
                } else {
                    var links = $(this.gallery_elements).find('a');
                    this.set_link_clicks(links);
                }
                
                this.gallery_elements.data("EdysGalleryObject", this);
            },

            set_touch_mode: function(){
                this.is_touch = (this.defaults.mode=="auto") ? isTouchDevice() : (this.defaults.mode=="touch") ? true : false;
            },

            set_link_clicks: function(links){
                var L = this.get_link_arr(links),
                    me = this;
                
                this.lists.push(L);
                for (var i in L){
                    with({n:i}){ /* escape closure for i */
                        L[i].el.click(function(e){
                            e.preventDefault();
                            me.show_gallery(parseInt(n,10),L);
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

            get_classes: function(name,v_include_nonsys,v_include_dot){
                var sc =                this.defaults.system_classnames,
                    dc =                this.defaults.classnames,
                    include_nonsys =    ( isset(v_include_nonsys) || this.defaults.user_defined_templates !== false ) ? v_include_nonsys : false,
                    include_dot =       isset(v_include_dot) ? v_include_dot : true,
                    suf =               (this.is_touch) ? this.defaults.touchscreen_class_suffix : '',
                    dot =               (include_dot) ? '.' : '',
                    n =                 dot+sc[name]+suf;
                if(this.defaults.user_defined_templates !== false){
                    return dot+dc[name]+suf;
                } else {
                    if(include_nonsys){ n += ' ' + dot+dc[name] + suf;}
                    return n;
                }
            },
            
            _get_img_list_index: function ( img ){
                var ind = -1,
                    l = null;
                    
                for ( var j in this.lists ){
                    for (var i in this.lists[j] ){
                        if( this.lists[j][i].el.get(0) == img ){
                            ind = i;
                            l = this.lists[j];
                        }
                    }
                    
                } 
                
                return (ind > -1 ) ? {
                  'index': ind,
                  'list': l   
                } : null;
            },
            
            show: function( img ){
                var pic = this._get_img_list_index( img );
                this.show_gallery( pic.index, pic.list );
            },

            show_gallery: function(index,list){
                /* save popup image list and current index */
                this.current_list = list;
                this.current_index = index;

                /* make popup and overlay first time */
                if(this.popup_el === null){
                    this.popup_el = this.popup_make();
                    if (!this.is_touch) {
                        this.click_set_next_prev_buttons();
                    } else {
                        this.touch_set_next_prev_buttons();
                    }
                    this.overlay_el = this.popup_el.find( this.get_classes('overlay') );
                    if(!this.is_touch){
                        this.overlay_el.click( $.proxy( function(){
                            this.hide_gallery();
                        }, this));
                    }
                }

                $(document).unbind('keydown').keydown($.proxy(function(e){
                    switch(e.which){
                        case 39: /* fw */
                            this.next();
                        break;
                        case 37: /*rev */
                            this.previous();
                        break;
                        case 27: /* esc */
                            this.hide_gallery();
                        break;
                    }
                },this));

                /* bind resize to window resize event */
                this.overlay_resize();
                if("onorientationchange" in window){
                    window.removeEventListener('orientationchange', $.proxy(this.resize_window_event,this), false);
                    window.addEventListener('orientationchange', $.proxy(this.resize_window_event,this), false);
                } else {
                    $(window).unbind('resize').resize( $.proxy( function() {
                        this.resize_window_function();
                    }, this) );
                }

                /* show popup and overlay */
                this.overlay_el.show();
                this.loading_show();

                if(this.is_touch){
                    this.initiate_touch_mode();
                } else {
                    this.initiate_click_mode();
                }
            },

            hide_gallery: function(){
                this.current_list = null;
                this.current_index = null;

                $(this.get_classes('popup')+','+this.get_classes('overlay')).hide();
                $(window).unbind('resize');
                this.loading_hide();
                $(document).unbind('keydown');
            },

            /* initiation functions */
            initiate_touch_mode: function(){
                var index = this.current_index,
                    list =  this.current_list,
                    btns =  this.popup_el.find( this.get_classes('bottom_btns') );

                 this.loading_hide();
                 this.popup_el.find(this.get_classes('title')).remove(); /* hide global title element. all touch pictures have their own title */
                 this.align_touch_popup();
                 this.popup_el.show();

                 /* make swipable gallery elements, bind automatic loading to images and show gallery */
                 this.make_all_img_element( index, list, $.proxy( function() {
                    /* setup picture titles */
                     if ( this.defaults.title_dissapear_time_touch > -1 ) {
                        var titl = this.popup_el.find(this.get_classes('title')),
                                   hidables = btns.add(titl);

                        hidables.stop(true, true).show().css('opacity',1).delay( this.defaults.title_dissapear_time_touch * 1000 ).fadeTo( 400, 0 );
                        this.pic_scroll.tap = $.proxy( function(){
                            hidables.stop(true, true).show().css('opacity',1);
                            hidables.stop(true, true).delay( this.defaults.title_dissapear_time_touch * 1000 ).fadeTo( 400, 0 );
                        }, this);
                    }

                    /* setup scroller */
                    this.pic_scroll.scrollable_element =  this.popup_el.find(this.get_classes('image_wrap'));
                    this.pic_scroll.scroller_elemets   =  this.popup_el
                                                                   .add(this.overlay_el)
                                                              .add(this.popup_el.find(this.get_classes('image_wrap')+' img'))
                                                              .add(this.popup_el.find(this.get_classes('title')))
                                                              .add(this.popup_el.find(this.get_classes('image_wrap')))
                                                              .add(this.popup_el.find(this.get_classes('loading')))
                                                              .add(this.popup_el.find(this.get_classes('loading_wrap')))
                                                              .add(this.popup_el.find(this.get_classes('btn_wrap')))
                                                              .add(this.popup_el.find(this.get_classes('btn_wrap_middle')))
                                                              .add(this.popup_el.find(this.get_classes('additional_btns')))
                                                              .add(this.popup_el.find(this.get_classes('edys-gallery-bottom-btns')))
                                                              .add(this.popup_el.find(this.get_classes('content_wrap')))
                                                              .add(this.popup_el.find(this.get_classes('image_wrap_box')));

                    this.pic_scroll.fixed_stop_width     = viewport.width();
                    this.pic_scroll.max_stops             = list.length-1;
                    this.pic_scroll.move_treshold         = this.defaults.swipe_move_treshold;
                    this.pic_scroll.tap_treshold         = this.defaults.tap_move_treshold;
                    this.pic_scroll.bind_events();
                    this.pic_scroll.center_to_index(index); /* set gallery position to clicked image */
                    this.pic_scroll.after_stop             = $.proxy( function (ind){
                        this.current_index = ind;
                        this.show_hide_next_prev();
                    }, this );
    
                    this.show_hide_next_prev();
                }, this));
            },

            initiate_click_mode: function(){
                var index = this.current_index,
                    list  = this.current_list,
                    title = $( this.get_classes('title') );

                /*preload clicked image */
                this.preload_image( list[index].href, $.proxy( function(img) {
                    this.popup_el.find( this.get_classes('image_wrap') ).html(img); /* draw first preloaded image */
                    this.popup_el.css( 'visibility', 'hidden' ).show(); /* reset popup and overlay size */
                    /* setup title */
                    title.css({
                        'visibility':'visible',
                        'display':'inline'
                    });
                    if ( list[index].rel != '&nbsp;' && list[index].rel != '' ) {
                        title.show().html( list[index].rel );
                        if( this.defaults.title_dissapear_time > -1 ){
                            title.stop(true, true).delay( this.defaults.title_dissapear_time * 1000 ).fadeOut();
                            $( this.get_classes('content_wrap') ).unbind( 'mousemove' ).bind( 'mousemove', $.proxy( function(){
                                if( this.current_list[ this.current_index ].rel != "&nbsp;" ) {
                                    title.stop( true, true ).show().css( 'opacity', 1 );
                                    $( this ).unbind( 'mouseleave' ).one( "mouseleave", function(){
                                        title.stop(true, true).delay( this.defaults.title_dissapear_time * 1000 ).fadeOut();
                                     });
                                }
                            }, this));
                        }
                    } else {
                        title.html('').css('visibility','hidden').hide();
                    }
                    this.set_popup_size_pos();
                    this.overlay_resize();
                    this.popup_el.css('visibility','visible');
                    this.show_hide_next_prev();
                    this.loading_hide(); /* hide loading icon */
                }, this));
            },

            resize_window_event: function(){ /* called on window resize and orientation change */
                if (this.oc_timer !== null) { clearTimeout( this.oc_timer ); }
                this.oc_timer = setTimeout( $.proxy( function () {
                    this.resize_window_function();
                }, this), 500);
            },

            resize_window_function: function(){
                var imgs =  this.popup_el.find( this.get_classes('image_wrap') +' img' ),
                    img_wrap_boxes = this.popup_el.find( this.get_classes('image_wrap_box') ),
                    me = this;
                this.overlay_resize();
                
                if(imgs.length > 0){
                    /* keep popup element in viewport */
                    if ( this.is_touch ) {
                        this.align_touch_popup();
                        img_wrap_boxes.width( viewport.width() );
                    } else {
                        this.set_popup_size_pos();
                        var wrap_size = this.get_img_size(imgs);
                        $( this.get_classes('content_wrap') ).width(wrap_size.w).height(wrap_size.h);
                    }
                    /* resize all images to fit */
                    imgs.each(function(){
                        $(this).css({
                            'visibility':'hidden',
                            'width':'auto',
                            'height':'auto'
                        }).show();
                        var s = me.get_img_size($(this));
                        $(this).height(s.h).width(s.w).css( 'visibility', 'visible' ).show();
                    });
                }
                
                /* set current image to viewport center */
                this.pic_scroll.fixed_stop_width = viewport.width();
                this.pic_scroll.center_to_index();
            },

            overlay_resize: function(){
                var   o = this.overlay_el;
                o.width(1).height(1);
                var w = $(document).width(),
                    h = $(document).height();
                o.width(w).height(h);
            },

            popup_make: function (){
                var popSrc = ( this.defaults.user_defined_templates === false ) ? format_template( this.defaults.popup_template, {
                          'popup_class':              this.get_classes('popup',true,false),
                          'close_class':              this.get_classes('close_btn',true,false),
                          'left_class':               this.get_classes('left_btn',true,false),
                          'right_class':              this.get_classes('right_btn',true,false),
                          'btn_wrap_class':           this.get_classes('btn_wrap',true,false),
                          'btn_wrap_middle_class':    this.get_classes('btn_wrap_middle',true,false),
                          'buttons_class':            this.get_classes('additional_btns',true,false),
                          'content_wrap_class':       this.get_classes('content_wrap',true,false),
                          'image_wrap_class':         this.get_classes('image_wrap',true,false),
                          'title_class':              this.get_classes('title',true,false),
                          'bottom_buttons_class':     this.get_classes('bottom_btns',true,false),
                          'clickable_bg_class':       this.get_classes('popup_click_bg',true,false),
                          'overlay_class':            this.get_classes('overlay',true,false),
                          'onimage_nav':               this.get_classes('onimage_nav', true, false),
                          'onimage_nav_rev':           this.get_classes('onimage_nav_rev', true, false),
                          'onimage_nav_fw':           this.get_classes('onimage_nav_fw', true, false)
                    }) : ( this.is_touch ) ? this.defaults.gallery_touch_template : this.defaults.gallery_template,
                    pop =   $(popSrc);
                
                pop.hide();
                /* close button click/touch */
                var cbtn = pop.find( this.get_classes('close_btn') );
                if (isTouchDevice()) {
                    pop.find(this.get_classes('onimage_nav')).remove();
                    cbtn.get(0).addEventListener("touchend", $.proxy( function(){
                        this.hide_gallery();
                    }, this), false);
                } else {
                    if ( !this.defaults.click_onimage_nav ) {
                        pop.find(this.get_classes('onimage_nav')).remove();
                    }
                    cbtn.click( $.proxy( function(){
                        this.hide_gallery();
                    }, this ));
                }

                $("body").prepend(pop);
                return pop;
            },

            /* touch mode specific popup functions */
            make_all_img_element: function(index,list,f) {
                var imgs_wrap       = this.popup_el.find( this.get_classes('image_wrap') ),
                    max             = list.length-1,
                    img_tpl         = $('<div />').addClass( this.get_classes('image_wrap_box',true,false) )
                                                    .width( viewport.width() )
                                                    .html(this.get_loading_html())
                                                    .css({ 'min-height':'10px' }),
                    img_w_c         = img_tpl.clone(),
                    current_title   = $('<div/>').addClass( this.get_classes('title', true, false) ).html( list[index].rel ),
                    me              = this;
                    
                if ( list[index].rel == '&nbsp;' ) {
                    current_title.addClass( this.get_classes('notitle',true,false) );
                }

                img_w_c.append( current_title ).append('<br/>');
                imgs_wrap.width( ( max + 1 ) * viewport.width() ).html(img_w_c);
                imgs_wrap.find(this.get_classes('loading')).spin(this.defaults.spinner_options);
                this.preload_image( list[index].href, $.proxy( function(img_c) {
                    img_w_c.find( this.get_classes('loading_wrap') ).remove();
                    img_w_c.append(img_c);
                    var s_c = this.get_img_size(img_c);
                    img_c.height(s_c.h).width(s_c.w).show();
                }, this));

                if ( index < max ) {
                    for(var incr = index + 1; incr <= max; incr++ ) {
                        ( function(inc) {
                            var img_i = img_tpl.clone();
                            var titl = $('<div/>').addClass( me.get_classes('title',true,false) ).html(list[inc].rel);
                            if(list[inc].rel == '&nbsp;'){
                                titl.addClass( me.get_classes('notitle',true,false) );
                            }
                            img_i.append(titl).append('<br/>');
                            imgs_wrap.append(img_i);
                            img_i.find(me.get_classes('loading')).spin(me.defaults.spinner_options);
                            me.preload_image( list[inc].href, function(img) {
                                img_i.find( me.get_classes('loading_wrap') ).remove();
                                img_i.append(img);
                                var s= me.get_img_size(img);
                                img.height(s.h).width(s.w).show();
                            });
                        })(incr);
                    }
                }

                if ( index > 0 ) {
                    for ( var decr = index-1; decr >= 0; decr-- ) {
                        ( function (dec) {
                            var img_d = img_tpl.clone();
                            var titl = $('<div/>').addClass( me.get_classes('title',true,false) ).html( list[dec].rel );
                            if(list[dec].rel == '&nbsp;'){
                                titl.addClass( me.get_classes('notitle',true,false) );
                            }
                            img_d.append(titl).append('<br/>');
                            imgs_wrap.prepend(img_d);
                            img_d.find(me.get_classes('loading')).spin(me.defaults.spinner_options);
                            me.preload_image( list[dec].href, function (img) {
                               img_d.find( me.get_classes('loading_wrap') ).remove();
                               img_d.append(img);
                               var s = me.get_img_size(img);
                               img.height(s.h).width(s.w).show();
                            });
                        })(decr);
                    }
                }
                f();
            },

            touch_set_next_prev_buttons: function(){
                var list = this.current_list,
                    index = this.current_index,
                    pop = this.popup_el,
                    r_btn = pop.find( this.get_classes('right_btn') ),
                    l_btn = pop.find( this.get_classes('left_btn') ),
                    img_wrap = pop.find( this.get_classes('image_wrap') );

                this.show_hide_next_prev();

                if ( isTouchDevice() ) {
                    r_btn.get(0).addEventListener( "touchstart", $.proxy( function() {
                        this.next();
                    } , this ), false);

                    l_btn.get(0).addEventListener("touchstart", $.proxy( function(){
                        this.previous();
                    }, this ), false);
                } else {
                    r_btn.click( $.proxy( function(e){
                         this.next();
                    }, this ));

                    l_btn.click( $.proxy( function(e){
                        this.previous();
                    }, this ));
                }
            },

            align_touch_popup: function() {
                var btns    = this.popup_el.find( this.get_classes('bottom_btns') ),
                    img_wrp = this.popup_el.find( this.get_classes('image_wrap') );
                    
                //img_wrp.width( viewport.width() ).css({'margin-left': });
                  
                this.popup_el.width( viewport.width() ).height( viewport.height() )
                              .css({
                                 'padding-top'        : $(document).scrollTop() + 'px',
                                 'padding-left'        : $(document).scrollLeft() + 'px',
                                 'padding-right'    : ( $(document).width() - viewport.width() - $(document).scrollLeft() ) + 'px',
                                 'padding-bottom'    : ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px'
                              }); /* set popup size/pos and show */
                 btns.css({
                     "bottom": ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px',
                     "left": (( viewport.width() / 2 ) + $(document).scrollLeft()) + 'px'
                 });
            },

            /* click mode specific popup functions */
            set_popup_size_pos: function() {
                var pop =    this.popup_el,
                    img =   pop.find( this.get_classes('image_wrap') +' img'),
                    wrp =     pop.find( this.get_classes('content_wrap') ),
                    btns =     pop.find( this.get_classes('bottom_btns') );
                
                pop.height(1);
                var mh = viewport.height() + $(document).scrollTop();
                pop.height($(document).height());
                pop.width($(document).width());
                this.set_img_size(img);
                var vw =    viewport.width(),
                    vh =    viewport.height();
                wrp.css({
                    'height': 'auto',
                    'width': 'auto'
                });

                var pw =    img.outerWidth(),
                    ph =    img.outerHeight(),
                    pleft = ( vw / 2 ) - ( pw / 2 ) + $(document).scrollLeft(),
                    ptop = (( vh - btns.outerHeight(true) ) / 2 ) - ( ph / 2 ) + $(document).scrollTop();
                wrp.css({
                    'left': pleft+'px',
                    'top': ptop+'px',
                    'height': pop.find( this.get_classes('image_wrap') +' img' ).height() + 'px'
                });

                pop.height($(document).height());
                btns.css({
                    "bottom": ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px',
                    "left": (( viewport.width() / 2 ) + $(document).scrollLeft()) + 'px'
                });
            },

            click_set_next_prev_buttons: function(){
                var list = this.current_list,
                    index = this.current_index,
                    pop = this.popup_el,
                    r_btn = pop.find( this.get_classes('right_btn') ),
                    l_btn = pop.find( this.get_classes('left_btn') ),
                    img_wrap = pop.find( this.get_classes('image_wrap') );

                this.show_hide_next_prev();

                r_btn.unbind('click').click( $.proxy( function(e){
                    this.next();
                }, this ));

                l_btn.unbind('click').click( $.proxy( function(e){
                    this.previous();
                }, this ));

                if ( this.defaults.click_onimage_nav ) {
                    var osk_next = pop.find( this.get_classes('onimage_nav_fw') ),
                        osk_prev = pop.find( this.get_classes('onimage_nav_rev') );
                    
                    osk_next.unbind('click').click( $.proxy( function(e){
                        this.next();
                    }, this )).hover( 
                        function() {
                            if ( !r_btn.hasClass('disabled') ){
                                r_btn.parent().addClass('over');
                            }
                        },
                        function() {
                            r_btn.parent().removeClass('over');
                        }
                    );

                    osk_prev.unbind('click').click( $.proxy( function(e){
                        this.previous();
                    }, this )).hover( 
                        function() {
                            if ( !l_btn.hasClass('disabled') ){
                                l_btn.parent().addClass('over');
                            }
                        },
                        function() {
                            l_btn.parent().removeClass('over');
                        }
                    );
                    
                }

                if ( isTouchDevice() ) {
                    $(img_wrap).swipe({
                        swipeLeft: $.proxy( function() {
                            this.next();
                        }, this ),
                        swipeRight: $.proxy( function() {
                            this.previous();
                        }, this )
                    });
                }

            },

            show_hide_next_prev: function(){
                var list = this.current_list,
                    index = this.current_index,
                    pop = this.popup_el,
                    r_btn = pop.find( this.get_classes('right_btn') ),
                    l_btn = pop.find( this.get_classes('left_btn') ),
                    has_next = (index+1 < list.length),
                    has_prev = (index-1 >= 0);

                if(has_next){
                    r_btn.removeClass("disabled");
                } else {
                     r_btn.addClass("disabled");
                }

                if(has_prev){
                    l_btn.removeClass("disabled");
                } else {
                    l_btn.addClass("disabled");
                }
            },

            change_to_image: function (index,list){
                var pop =       this.popup_el,
                    wrp =       pop.find( this.get_classes('content_wrap') ),
                    img_wrp =   pop.find( this.get_classes('image_wrap') ),
                    btns =      pop.find( this.get_classes('bottom_btns') ),
                    me = this;

                this.loading_show();
                $( this.get_classes('content_wrap') ).unbind('mouseleave');

                this.preload_image( list[index].href, $.proxy( function(new_image) {
                    var old_img = $( this.get_classes('image_wrap')+' img:not(.edys_image_ending_anim)');
                    $( this.get_classes('title') ).css('visibility','visible');    

                    $( this.get_classes('image_wrap')+' img.edys_image_ending_anim').stop(true,true).remove();
                    old_img.addClass('edys_image_ending_anim');
                    wrp.stop(true,true);
                    $(old_img).stop(true,true);
                    
                    var ow = old_img.width(),
                        oh = old_img.height();
                    
                    btns.css({
                        "bottom": ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px',
                        "left": (( viewport.width() / 2 ) + $(document).scrollLeft()) + 'px'
                    });
                    new_image.css({'position':'absolute', 'visibility':'hidden'}).show();
                    pop.find( this.get_classes('image_wrap') ).prepend(new_image);
                    if ( list[index].rel != '&nbsp;' ) {
                        $( this.get_classes('title') ).stop( true, true ).show().css( 'opacity', 1 ).html( list[index].rel );
                        if( this.defaults.title_dissapear_time > -1 ){
                            $( this.get_classes('title') ).stop( true, true ).delay( this.defaults.title_dissapear_time * 1000 ).fadeOut();
                        }
                    } else {
                        $( this.get_classes('title') ).html('').css('visibility','hidden');
                        $( this.get_classes('title') ).hide();
                    }

                    var ni =    this.get_img_size(new_image);
                    var nw =    ni.w,
                        nh =    ni.h,
                        vw =    viewport.width(),
                        vh =    viewport.height(),
                        oleft = ( vw / 2 )-( wrp.outerWidth() / 2 ) - ( (nw - ow) / 2 ) + $(document).scrollLeft(),
                        otop =  ( (vh - btns.outerHeight(true)) / 2 ) - ( (wrp.outerHeight(true)) / 2 ) - ( (nh - oh) / 2 )+ $(document).scrollTop();

                    wrp.animate({
                        'left': oleft+'px',
                        'top': otop+'px',
                        'width': nw+'px',
                        'height': (nh)+'px'
                    }, 300 );
                    $(old_img).animate({
                        'width': nw+'px',
                        'height': (nh)+'px'
                    },300 );

                    $(new_image).animate({
                        'width': nw+'px',
                        'height': (nh)+'px'
                    }, 300, function() {
                        new_image.css({'position': "absolute",'visibility':'visible', 'top':0, 'left':0}).fadeIn( 300, $.proxy(function() {
                            old_img.remove();
                            new_image.css( {'position': "static"} );
                            me.loading_hide();
                        }, me));
                    });

                }, this));
            },

            loading_show: function(){
                var vw =   viewport.width(),
                    vh =   viewport.height(),
                    loading = $(this.get_loading_html()).css( 'visibility', 'hidden' );

                $( this.get_classes('loading_wrap') ).remove();
                $('body').prepend(loading);
                var h = loading.outerHeight(),
                    w = loading.outerWidth();
                loading.css({
                    'top':          ((vh / 2) - (h / 2) + $(document).scrollTop()) + 'px',
                    'left':         ((vw / 2) - (w / 2) + $(document).scrollLeft()) + 'px',
                    'visibility':   'visible'
                });
                
                loading.spin(this.defaults.spinner_options);
            },

            get_loading_html: function(){
                var html = format_template( this.defaults.loader_template, {
                        'loader_class': this.get_classes('loading',true,false),
                        'loader_wrap_class': this.get_classes('loading_wrap',true,false)
                    });
                return html;
            },

            loading_hide: function(){
                if( /chrome/.test(navigator.userAgent.toLowerCase()) ) { 
                    setTimeout( $.proxy( function() { $(this.get_classes('loading_wrap')).spin(false).remove(); }, this), 200);
                } else {
                    $(this.get_classes('loading_wrap')).spin(false).remove();
                }
            },

            set_img_size: function(img){
                var pop     = this.popup_el,
                    def     = this.defaults,
                    w         = img.width(),
                    h         = img.height(),
                    ratio_x = ( this.is_touch ) ? def.image_to_wiewport_max_ratio_touch_x : def.image_to_wiewport_max_ratio_x,
                    ratio_y = ( this.is_touch ) ? def.image_to_wiewport_max_ratio_touch_y : def.image_to_wiewport_max_ratio_y;

                img.height(1).width(1);
                var vw =    viewport.width(),
                    vh =    viewport.height(),
                    nph = ratio_y*vh,
                    npw = w/(h/nph);

                if(npw > vw*ratio_x){
                    npw = vw*ratio_x;
                    nph = h/(w/npw);
                }

                if (h > nph){
                    img.add( this.get_classes('content_wrap') ).height(nph).width(npw);
                } else {
                    img.height(h).width(w);
                }
            },

            get_img_size: function(img){
                var pop =   this.popup_el,
                    def =   this.defaults,
                    w =     img.width(),
                    h =     img.height(),
                    ratio_x = ( this.is_touch ) ? def.image_to_wiewport_max_ratio_touch_x : def.image_to_wiewport_max_ratio_x,
                    ratio_y = ( this.is_touch ) ? def.image_to_wiewport_max_ratio_touch_y : def.image_to_wiewport_max_ratio_y,
                    newh,neww;

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
                    newh = nph;
                    neww = npw;
                } else {
                    newh = h;
                    neww = w;
                }
                img.height(h).width(w).hide();
                return {
                    h: newh,
                    w: w/(h/newh),
                    vw: vw,
                    vh: vh
                };
            },

            next: function(){
                if (this.current_index+1 < this.current_list.length) {
                    this.current_index++;
                    if ( this.is_touch ) {
                        this.pic_scroll.next();
                    } else {
                        this.change_to_image( this.current_index, this.current_list );
                    }
                    this.show_hide_next_prev();
                }
            },

            previous: function(){
                if ( this.current_index-1 >= 0 ) {
                    this.current_index--;
                    if ( this.is_touch ) {
                        this.pic_scroll.previous();
                    } else {
                        this.change_to_image( this.current_index, this.current_list );
                    }
                       this.show_hide_next_prev();
                }
            },

            preload_image: function(img,f){
                var i = $('<img />').load(function(){
                    f($(this));
                }).attr('src',img);
            }
        
        };

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
        };

        var isTouchDevice = function() {
            return "ontouchstart" in window;
        };

        var format_template =function(s,inserts){
            var t = s;
            for(var i  in inserts){
                var regx = new RegExp('{'+i+'}','gi');
                t = t.replace(regx,inserts[i]);
            }
            return t;
        };

        var viewport ={
            width: function(){
                return (typeof window.innerWidth != "undefined") ? window.innerWidth : $(window).width();
            },

            height: function(){
                return (typeof window.innerHeight != "undefined") ? window.innerHeight : $(window).height();
            }
        };

        var isset = function(v){
            return(typeof v != 'undefined');
        };

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
            this.tap = function(){ };
            this.after_stop =  function(index){  };

            var me = this;

            function isset(v){
                return(typeof v != 'undefined');
            };

            function mouse_x(e){
                return (isset(e.targetTouches)) ? e.targetTouches[0].pageX : e.pageX;
            };

            this.bind_events = function(){
                if(this.is_touch){
                    this.bind_touch_events();
                } else {
                    this.bind_click_events();
                }
            };

            function start(e){
                e.preventDefault();
                me.start_x = me.end_x = mouse_x(e);
                if($.browser.webkit){
                    me.scrollable_element.css("-webkit-transition-duration", "0s");
                }
            };

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
            };

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
            };

            function cancel(e){
                e.preventDefault();
                if(me.fixed_stops && me.start_x !== null && me.end_x !== null && me.scrollable_element !== null){
                    me.move_to_closest();
                }
                me.start_x = me.end_x = null;
            };

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

            };

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
            };

            this.next = function(){
                if(this.current_index+1 <= this.max_stops){
                    this.move_to(this.current_index+1);
                }
            };

            this.previous = function(){
                if(this.current_index-1 >= 0){
                    this.move_to(this.current_index-1);
                }
            };

            /* set image with index to viewport center */
            this.center_to_index = function (v_index){
                var index;
                if (this.scrollable_element !== null){
                    if(isset(v_index)){
                        this.current_index = v_index;
                        index = v_index;
                    } else {
                        index = this.current_index;
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
            };

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
            };

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
            };

        };

        /* jquery delay is flawed - does not queue delay. untill fix has been implemented into new version this has to be implemented */
        var init_delay_fix = function(){
            $.fn.delay = function(time, callback){
                // Empty function:
                $.fx.step.delay = function(){};
                // Return meaningless animation, (will be added to queue)
                return this.animate({delay:1}, time, callback);
            };
        };

        /* add swipe to jquery */
        var init_swipe = function(){
            $.fn.swipe = function(v_options) {
                // Default thresholds & swipe functions
                var defaults = {
                    threshold: {
                        x: 30,
                        y: 400
                    },
                    swipeLeft: function() {},
                    swipeRight: function() {}
                };

                var options = $.extend(defaults, v_options);

                if (!this) return false;

                return this.each(function() {
                    var originalCoord = { x: 0, y: 0 };
                    var finalCoord = { x: 0, y: 0 };

                    function touchMove(event) {
                        event.preventDefault();
                        finalCoord.x = event.targetTouches[0].pageX; // Updated X,Y coordinates
                        finalCoord.y = event.targetTouches[0].pageY;
                    };

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
                    };

                    function touchStart(event) {
                        originalCoord.x = event.targetTouches[0].pageX;
                        originalCoord.y = event.targetTouches[0].pageY;
                        finalCoord.x = originalCoord.x;
                        finalCoord.y = originalCoord.y;
                    };

                    function touchCancel(event) {
                    };

                    // Add gestures to all swipable areas
                    this.addEventListener("touchstart", touchStart, false);
                    this.addEventListener("touchmove", touchMove, false);
                    this.addEventListener("touchend", touchEnd, false);
                    this.addEventListener("touchcancel", touchCancel, false);

                });
            };
        };
         /* ENDOF LOCAL FUNCTIONS */
    
        /* jQuery module initiation */
        var methods = {
            init: function( options ) {
                new G($(this), options);
                return this;
            },

            get_object: function() {
                return this.eq(0).data('EdysGalleryObject');
            }
        };

        $.fn.edys_gallery = function( method ) {
            if ( methods[method] ) {
                return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.edys_gallery' );
                return null;
            }
        };
        
    };
  
    window.apply_edys_gallery_module = apply_edys_gallery_module;
    Edys_gallery_init.run();
    /* initialisation module end*/
})();