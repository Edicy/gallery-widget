(function(){
    var $;

	var Edys_gallery_init = {
		settings: {
	    	jquery_atleast_version: "1.5",
	        jquery_url: "ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js",
	        google_api_url: "http://www.google.com/jsapi",
			gallery_elements: '.edys-gallery',
	        autorun_init: true,
	        autorun_gallery: true,
	        init_complete: null
	    }, 
	  	 
	    run: function(){
			var me = this;
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
						$.extend(true, me.settings, window.edys_gallery_options);
						apply_edys_gallery_module($);
						if ( me.settings.autorun_gallery ) {
							$(document).ready( $.proxy(function() {
                              	$(me.settings.gallery_elements).edys_gallery(me.settings);
                            	if(me.settings.init_complete){
	                            	me.settings.init_complete($);
	                            } else {
	                                $('body').trigger('Edys_gallery_init_complete',$);
	                            }
                            }, me));
                       	} else {
                            if(me.settings.init_complete){
                                me.settings.init_complete($);
                            } else {
                                $('body').trigger('Edys_gallery_init_complete',$);
                            }
                        }
					});
				}
			}
		},
		
		/* function to get script dynamically without jquery loaded */
        load_script: function(source, f) {
            (function(d, t) {
                var js = d.createElement(t);
                js.onload = f;
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
            if (window.jQuery === undefined ) {
                this.load_script(this.settings.jquery_url,function() {
                   $ = window.jQuery.noConflict(true);
                   f();
                });
			} else if ( window.jQuery.fn.jquery < this.settings.jquery_atleast_version ) {
	        	var old_script = window.jQuery;
				var old$ = (window.$ !== undefined ) ? window.$ : null;
				this.load_script(this.settings.jquery_url,function() {
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
	
	Edys_gallery_init.run();
    /* initialisation module end*/
	
	/* wrapper function for applying jQuery edys_gallery plugin */
	var apply_edys_gallery_module = function($){
		
    	var G = function(gal_elements, user_options){
	        this.defaults = {
	            user_defined_templates : false,
	            gallery_template: null,
	            gallery_touch_template: null,
		        default_styles: true,
	
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
	            loader_template:   '<div class="{loader_wrap_class}">\
	                                    <div class="{loader_class}">\
	                                        <div class="bar1"></div>\
	                                        <div class="bar2"></div>\
	                                        <div class="bar3"></div>\
	                                        <div class="bar4"></div>\
	                                        <div class="bar5"></div>\
	                                        <div class="bar6"></div>\
	                                        <div class="bar7"></div>\
	                                        <div class="bar8"></div>\
	                                    </div>\
	                                </div>',
	            loader_template_ie_lt9:   '<div class="{loader_wrap_class}">\
	                                            <div class="{loader_class}">\
	                                                {wait}\
	                                            </div>\
	                                       </div>',
	            stylesheet: '.edys-gal-gallery-overlay, .edys-gal-gallery-overlay-touch, .edys-gallery-overlay, .edys-gallery-overlay-touch { position: absolute; background: #000000; -moz-opacity: 0.75; -webkit-opacity: 0.75; opacity: 0.75; filter: alpha(opacity = 75); z-index: 1001; margin:0; padding:0; overflow: hidden; left:0; top:0; } .edys-gal-gallery-popup, .edys-gallery-popup, .edys-gal-gallery-popup-touch, .edys-gallery-popup-touch { position: absolute; z-index: 1000; margin:0; padding:0; text-align: center; font-family: Helvetica, Arial; left:0; top:0; overflow: hidden; height: 100%; width: 100%; } .edys-gal-gallery-popup-touch, .edys-gallery-popup-touch { text-align: left; overflow: hidden; position: absolute; left:0; top:0; overflow: hidden; font-family: Helvetica, Arial; margin:0; padding:0; height: 100%; width: 100%; } .edys-gal-gallery-close, .edys-gallery-close, .edys-gal-gallery-close-touch, .edys-gallery-close-touch { background: url("http://static.kraftal.com/gallery/3.0/edys_gallery_close.gif") no-repeat center center; width: 68px; height: 48px; display: inline-block; cursor: pointer; margin: 10px 0; border-color: #3c4143; border-width: 0 1px; border-style: solid; } .edys-gal-gallery-bottom-btns, .edys-gallery-bottom-btns, .edys-gal-gallery-bottom-btns-touch, .edys-gallery-bottom-btns-touch { -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; padding: 0px; display: inline; position: absolute; margin-bottom: 0.5%; left: 50%; margin-left: -102px; z-index: 1004; bottom: 0; background: #262c2f; background: rgba(27,33,36,0.8); } .edys-gal-gallery-btn-wrap, .edys-gallery-btn-wrap, .edys-gal-gallery-btn-wrap-touch, .edys-gallery-btn-wrap-touch { width: 68px; height: 68px; display: inline-block; float: left; vertical-align: middle; line-height: 48px; text-align: center; } .edys-gal-gallery-content-wrap, .edys-gallery-content-wrap { box-shadow: 2px 0px 10px #000000; clear: both; position: absolute; text-align: center; z-index: 1003; } .edys-gal-gallery-content-wrap-touch, .edys-gallery-content-wrap-touch { width: 100%; position: relative; overflow: hidden; z-index: 1003; margin-top: 0.5%; } .edys-gal-gallery-image-wrap, .edys-gallery-image-wrap { overflow: hidden; } .edys-gal-gallery-image-wrap img, .edys-gallery-image-wrap img { display: block; border:0; margin:0; } .edys-gal-gallery-image-wrap-box-touch, .edys-gallery-image-wrap-box-touch { display: inline-block; width: 100%; vertical-align: middle; margin-top: -30px; text-align: center; } .edys-gal-gallery-image-wrap-box-touch img, .edys-gallery-image-wrap-box-touch img{ box-shadow: 2px 0px 10px #000000; } .edys-gal-gallery-image-wrap-touch, .edys-gallery-image-wrap-touch{ position: relative; white-space:nowrap; } .edys-gal-gallery-right, .edys-gallery-right, .edys-gal-gallery-right-touch, .edys-gallery-right-touch { background: url("http://static.kraftal.com/gallery/3.0/edys_gallery_right_arrow.gif") no-repeat center center; width: 68px; height: 68px; display: inline; display: inline-block; float:right; cursor: pointer; vertical-align: middle; } .edys-gal-gallery-left, .edys-gallery-left, .edys-gal-gallery-left-touch, .edys-gallery-left-touch { background: url("http://static.kraftal.com/gallery/3.0/edys_gallery_left_arrow.gif") no-repeat center center; width: 68px; height: 68px; display: inline; display: inline-block; float:left; cursor: pointer; vertical-align: middle; } .edys-gal-gallery-right.disabled, .edys-gallery-right.disabled, .edys-gal-gallery-right-touch.disabled, .edys-gallery-right-touch.disabled, .edys-gal-gallery-left.disabled, .edys-gallery-left.disabled, .edys-gal-gallery-left-touch.disabled, .edys-gallery-left-touch.disabled { -moz-opacity: 0.1; -webkit-opacity: 0.1; opacity: 0.1; filter: alpha(opacity = 10); } .edys-gal-gallery-title, .edys-gallery-title{ background: #262c2f; background: rgba(27,33,36,0.8); color: #ffffff; display: inline; position: relative; z-index: 1010; bottom: 52px; line-height: 18px; border-radius: 4px; padding: 7px 20px; font-size: 14px; } .edys-gal-gallery-title-touch, .edys-gallery-title-touch { background: #262c2f; background: rgba(27,33,36,0.8); color: #ffffff; display: inline-block; position: relative; z-index: 1010; top: 40px; line-height: 18px; -moz-border-radius: 4px; -webkit-border-radius: 4px; border-radius: 4px; padding: 7px 20px; font-size: 14px; } .edys-gal-gallery-title-touch.edys-gal-gallery-title-notitle-touch, .edys-gallery-title-touch.edys-gallery-title-notitle-touch { visibility: hidden; } .edys-gallery-loading, .edys-gal-gallery-loading, .edys-gallery-loading-touch, .edys-gal-gallery-loading-touch { position:absolute; width:40px; height:40px; margin-top: -20px; z-index: 1010; margin-left: -5px; -moz-border-radius: 40px; -webkit-border-radius: 40px; border-radius: 40px; -webkit-animation-name: rotateThis; -webkit-animation-duration:2s; -webkit-animation-iteration-count:infinite; -webkit-animation-timing-function:linear; -moz-animation-name: rotateThisMoz; -moz-animation-duration:2s; -moz-animation-iteration-count:infinite; -moz-animation-timing-function:linear; -ms-animation-name: rotateThisMs; -ms-animation-duration:2s; -ms-animation-iteration-count:infinite; -ms-animation-timing-function:linear; -o-transition-duration: 0s; -o-transition-timing-function: linear; background: #cccccc; background: rgba(255,255,255,0); padding: 10px; } .edys-gallery-loading-rotate-touch { -o-transition-duration: 2s; -o-transform:rotate(359deg); } .edys-gallery-loading-touch, .edys-gal-gallery-loading-touch { display: inline-block; position: relative; margin-left:0; } .edys-gallery-loading-wrap-touch, .edys-gal-gallery-loading-wrap-touch { width: 100%; display: block; text-align: center; position: relative; } .edys-gallery-loading-wrap, .edys-gal-gallery-loading-wrap { position:absolute; width:40px; height:40px; } @-webkit-keyframes rotateThis { from {-webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(360deg);} } @-moz-keyframes rotateThisMoz { from {-moz-transform: rotate(0deg);} to {-moz-transform: rotate(360deg);} } @-ms-keyframes rotateThisMs { from {-ms-transform: rotate(0deg);} to {-ms-transform: rotate(360deg);} } .edys-gallery-loading div, .edys-gal-gallery-loading div, .edys-gallery-loading-touch div, .edys-gal-gallery-loading-touch div { width:10px; height:10px; background:#000; -moz-border-radius:20px; -webkit-border-radius:20px; border-radius:20px; position:absolute; left:25px; top:25px; } .edys-gallery-loading .bar1, .edys-gal-gallery-loading .bar1, .edys-gallery-loading-touch .bar1, .edys-gal-gallery-loading-touch .bar1 { -moz-transform:rotate(0deg) translate(0, -20px); -ms-transform:rotate(0deg) translate(0, -20px); -o-transform:rotate(0deg) translate(0, -20px); -webkit-transform:rotate(0deg) translate(0, -20px);opacity:0.12; } .edys-gallery-loading .bar2 , .edys-gal-gallery-loading .bar2 , .edys-gallery-loading-touch .bar2 , .edys-gal-gallery-loading-touch .bar2 { -moz-transform:rotate(45deg) translate(0, -20px); -ms-transform:rotate(45deg) translate(0, -20px); -o-transform:rotate(45deg) translate(0, -20px); -webkit-transform:rotate(45deg) translate(0, -20px); opacity:0.25; } .edys-gallery-loading .bar3, .edys-gal-gallery-loading .bar3, .edys-gallery-loading-touch .bar3, .edys-gal-gallery-loading-touch .bar3 { -moz-transform:rotate(90deg) translate(0, -20px); -ms-transform:rotate(90deg) translate(0, -20px); -o-transform:rotate(90deg) translate(0, -20px); -webkit-transform:rotate(90deg) translate(0, -20px); opacity:0.37; } .edys-gallery-loading .bar4, .edys-gal-gallery-loading .bar4, .edys-gallery-loading-touch .bar4, .edys-gal-gallery-loading-touch .bar4 { -moz-transform:rotate(135deg) translate(0, -20px); -ms-transform:rotate(135deg) translate(0, -20px); -o-transform:rotate(135deg) translate(0, -20px); -webkit-transform:rotate(135deg) translate(0, -20px); opacity:0.50; } .edys-gallery-loading .bar5, .edys-gal-gallery-loading .bar5, .edys-gallery-loading-touch .bar5, .edys-gal-gallery-loading-touch .bar5 { -moz-transform:rotate(180deg) translate(0, -20px); -ms-transform:rotate(180deg) translate(0, -20px); -o-transform:rotate(180deg) translate(0, -20px); -webkit-transform:rotate(180deg) translate(0, -20px); opacity:0.62; } .edys-gallery-loading .bar6, .edys-gal-gallery-loading .bar6, .edys-gallery-loading-touch .bar6, .edys-gal-gallery-loading-touch .bar6 { -moz-transform:rotate(225deg) translate(0, -20px); -ms-transform:rotate(225deg) translate(0, -20px); -o-transform:rotate(225deg) translate(0, -20px); -webkit-transform:rotate(225deg) translate(0, -20px); opacity:0.75; } .edys-gallery-loading .bar7, .edys-gal-gallery-loading .bar7, .edys-gallery-loading-touch .bar7, .edys-gal-gallery-loading-touch .bar7 { -moz-transform:rotate(270deg) translate(0, -20px); -moz-transform:rotate(270deg) translate(0, -20px); -o-transform:rotate(270deg) translate(0, -20px); -webkit-transform:rotate(270deg) translate(0, -20px); opacity:0.87; } .edys-gallery-loading .bar8, .edys-gal-gallery-loading .bar8, .edys-gallery-loading-touch .bar8, .edys-gal-gallery-loading-touch .bar8 { -moz-transform:rotate(315deg) translate(0, -20px); -ms-transform:rotate(315deg) translate(0, -20px); -o-transform:rotate(315deg) translate(0, -20px); -webkit-transform:rotate(315deg) translate(0, -20px); opacity:1; } html>body .edys-gal-gallery-image-wrap-box-touch, html>body .edys-gallery-image-wrap-box-touch { *float:left; }  .edys-gal-gallery-title-touch,   .edys-gal-gallery-title, .edys-gallery-title-touch, .edys-gallery-title, .edys-gal-gallery-bottom-btns, html>body .edys-gal-gallery-bottom-btns-touch,  .edys-gallery-bottom-btns,  .edys-gallery-bottom-btns-touch,  .edys-gallery-loading,  .edys-gal-gallery-loading,  .edys-gallery-loading-touch, .edys-gal-gallery-loading-touch  { *background: #262c2f; }',

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
	                notitle:        'edys-gallery-title-notitle'
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
	                notitle:        'edys-gal-gallery-title-notitle'
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
	            jumping_mode: 'strict',
	            mode: "auto",
	            texts: {
	                wait: "Wait"
	            }

	        };
			
			this.gallery_elements = gal_elements;
	        this.is_touch = false;
			this.overlay_el = 		null;
            this.popup_el =   		null;
            this.current_list =  	null;
            this.current_index =	null;
            this.pic_scroll = 		new scroller();
            this.oc_timer = 		null;
			
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
	            if (def.default_styles) {
	                this.add_stylesheet(def.stylesheet);
	            }
				
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
                for (var i in L){
                    with({n:i}){ /* escape closure for i */
                        L[i].el.click(function(e){
                            e.preventDefault();
                            me.show_gallery(parseInt(n),L);
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
            },

	        get_classes: function(name,include_nonsys,include_dot){
	            var sc =                this.defaults.system_classnames,
	                dc =                this.defaults.classnames,
	                include_nonsys =    (isset(include_nonsys)||this.defaults.user_defined_templates !== false)?include_nonsys:false,
	                include_dot =       isset(include_dot)?include_dot:true,
	                suf =               (this.is_touch)?this.defaults.touchscreen_class_suffix:'',
	                dot =               (include_dot)?'.':'',
	                n =                 dot+sc[name]+suf;
	            if(this.defaults.user_defined_templates !== false){
	                return dot+dc[name]+suf;
	            } else {
	                if(include_nonsys){ n += ' ' + dot+dc[name] + suf;}
	                return n;
	            }
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
                    window.removeEventListener('orientationchange', this.resize_window_event, false);
                    window.addEventListener('orientationchange', this.resize_window_event, false);
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

	                this.pic_scroll.fixed_stop_width 	= viewport.width();
	                this.pic_scroll.max_stops 			= list.length-1;
	                this.pic_scroll.move_treshold 		= this.defaults.swipe_move_treshold;
	                this.pic_scroll.tap_treshold 		= this.defaults.tap_move_treshold;
	                this.pic_scroll.bind_events();
		            this.pic_scroll.center_to_index(index); /* set gallery position to clicked image */
		            this.pic_scroll.after_stop 			= $.proxy( function (ind){
	                    this.current_index = ind;
	                    this.show_hide_next_prev();
	                }, this );
	
		            this.show_hide_next_prev();
					if ( $.browser.opera ) { this.opera_fix(); }
				}, this));
			},

            initiate_click_mode: function(){
				var index = this.current_index,
                    list  = this.current_list,
                    title = $( this.get_classes('title') );

                if ($.browser.opera) { this.opera_fix(); }
                /*preload clicked image */
                this.preload_image( list[index].href, $.proxy( function(img) {
					/* setup title */
                    if ( list[index].rel != '&nbsp;' ) {
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
						$( this.get_classes('title') ).hide();
					}

                    this.popup_el.find( this.get_classes('image_wrap') ).html(img); /* draw first preloaded image */
                    this.popup_el.css( 'visibility', 'hidden' ).show(); /* reset popup and overlay size */
                    this.set_popup_size_pos();
					this.overlay_resize();
                    this.popup_el.css('visibility','visible');
                    this.show_hide_next_prev();
                    this.loading_hide(); /* hide loading icon */
                }, this));
            },

            resize_window_event: function(){ /* called on window resize and orientation change */
				if (this.oc_timer !== null) { clearTimeout( this.oc_timer ); }
                this.oc_timer = setTimeout(function () {
                	this.resize_window_function();
                }, 500);
            },

            resize_window_function: function(){
				var imgs =  this.popup_el.find( this.get_classes('image_wrap') +' img' ),
                    img_wrap_boxes = this.popup_el.find( this.get_classes('image_wrap_box') ),
					me = this;
				
				this.overlay_resize();
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

                /* set current image to viewport center */
                this.pic_scroll.fixed_stop_width = viewport.width();
                this.pic_scroll.center_to_index();
            },

			overlay_resize: function(){
                var   o = this.overlay_el;
                o.width(1).height(1);
                var w = viewport.width(),
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
                          'overlay_class':            this.get_classes('overlay',true,false)
                    }) : ( this.is_touch ) ? this.defaults.gallery_touch_template : this.defaults.gallery_template,
                    pop =   $(popSrc);
                
				pop.hide();
                /* close button click/touch */
                var cbtn = pop.find( this.get_classes('close_btn') );
                if (isTouchDevice()) {
                    cbtn.get(0).addEventListener("touchend", $.proxy( function(){
                        this.hide_gallery();
                    }, this), false);
                } else {
                    cbtn.click( $.proxy( function(){
                        this.hide_gallery();
                    }, this ));
                }

                $("body").prepend(pop);
                return pop;
            },

            /* touch mode specific popup functions */
            make_all_img_element: function(index,list,f) {
                var imgs_wrap   	= this.popup_el.find( this.get_classes('image_wrap') ),
                    max     		= list.length-1,
                    img_tpl 		= $('<div />').addClass( this.get_classes('image_wrap_box',true,false) )
                                          		  .html( this.get_loading_html() )
                                          		  .width( viewport.width() )
                                          		  .css({ 'min-height':'10px' }),
                    img_w_c 		= img_tpl.clone(),
                    current_title 	= $('<div/>').addClass( this.get_classes('title', true, false) ).html( list[index].rel ),
					me 				= this;
					
                if ( list[index].rel == '&nbsp;' ) {
                    current_title.addClass( this.get_classes('notitle',true,false) );
                }

                img_w_c.append( current_title ).append('<br/>');
                imgs_wrap.width( ( max + 1 ) * viewport.width() ).html(img_w_c);
                this.preload_image( list[index].href, $.proxy( function(img_c) {
                    img_w_c.find( this.get_classes('loading') ).remove();
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
                            me.preload_image( list[inc].href, function(img) {
                                img_i.find( me.get_classes('loading') ).remove();
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
                            me.preload_image( list[dec].href, function (img) {
                               img_d.find( me.get_classes('loading') ).remove();
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
                    index = this.current_index
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
				var btns =  this.popup_el.find( this.get_classes('bottom_btns') );
		        this.popup_el.width( viewport.width() )
                              .css({
                                 'padding-top'		: $(document).scrollTop() + 'px',
                                 'padding-left'		: $(document).scrollLeft() + 'px',
                                 'padding-right'	: ( $(document).width() - viewport.width() - $(document).scrollLeft() ) + 'px',
                                 'padding-bottom'	: ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px'
                              }); /* set popup size/pos and show */
	             btns.css({
			                    "bottom": ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px'
			     });
			},

            /* click mode specific popup functions */
            set_popup_size_pos: function() {
                var pop =	this.popup_el,
                    img =   pop.find( this.get_classes('image_wrap') +' img'),
                    wrp = 	pop.find( this.get_classes('content_wrap') ),
                    btns = 	pop.find( this.get_classes('bottom_btns') );
				
				pop.height(1);
                var mh = viewport.height() + $(document).scrollTop();
                pop.height($(document).height());
                this.set_img_size(img);
                var vw =    viewport.width(),
                    vh =    viewport.height();
                wrp.css({
                    'height': 'auto',
                    'width': 'auto'
                })

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
			                    "bottom": ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px'
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
                        

					$( this.get_classes('image_wrap')+' img.edys_image_ending_anim').stop(true,true).remove();
					old_img.addClass('edys_image_ending_anim');
					wrp.stop(true,true);
					$(old_img).stop(true,true);
					
					var ow = old_img.width(),
                    	oh = old_img.height();
					
					btns.css({
						"bottom": ( $(document).height() - viewport.height() - $(document).scrollTop()) + 'px'
					});
                    new_image.css({'position':'absolute', 'visibility':'hidden'}).show();
                    pop.find( this.get_classes('image_wrap') ).prepend(new_image);
                    if ( list[index].rel != '&nbsp;' ) {
                        $( this.get_classes('title') ).stop( true, true ).show().css( 'opacity', 1 ).html( list[index].rel );
                        if( this.defaults.title_dissapear_time > -1 ){
                            $( this.get_classes('title') ).stop( true, true ).delay( this.defaults.title_dissapear_time * 1000 ).fadeOut();
                        }
                    } else {
                        $( this.get_classes('title') ).html('');
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
			        templ =  this.get_loading_html(),
					loading = $(templ).css( 'visibility', 'hidden' );

			    $( this.get_classes('loading_wrap') ).remove();
			    $('body').prepend(loading);
			    var h = loading.outerHeight(),
			        w = loading.outerWidth();
			    loading.css({
			        'top':          ((vh / 2) - (h / 2) + $(document).scrollTop()) + 'px',
			        'left':         ((vw / 2) - (w / 2) + $(document).scrollLeft()) + 'px',
			        'visibility':   'visible'
			    });
			},

           	get_loading_html: function(){
                var templ = ( $.browser.msie && $.browser.version < 9 ) ? format_template( this.defaults.loader_template_ie_lt9, {
                        'loader_class': this.get_classes('loading',true,false),
                        'loader_wrap_class': this.get_classes('loading_wrap',true,false),
                        'wait': this.defaults.texts.wait
                    }) : format_template( this.defaults.loader_template, {
                        'loader_class': this.get_classes('loading',true,false),
                        'loader_wrap_class': this.get_classes('loading_wrap',true,false)
                    });
                return templ;
            },

            opera_fix: function(){
                var loaders = $( this.get_classes('loading') );
                loaders.addClass( 'edys-gallery-loading-rotate-touch' ).each( function() {
                	var el = this;
                    el.addEventListener('oTransitionEnd', function(event){
                        var e = event.target;
                        $(e).removeClass( 'edys-gallery-loading-rotate-touch' );
                        setTimeout( function(){ $(e).addClass( 'edys-gallery-loading-rotate-touch' ); }, 50);
                    }, true);
                });
            },

            loading_hide: function(){
                if( /chrome/.test(navigator.userAgent.toLowerCase()) ) { 
					setTimeout( $.proxy( function() { $(this.get_classes('loading_wrap')).remove(); }, this), 200);
				} else {
					$(this.get_classes('loading_wrap')).remove();
				}
            },

            set_img_size: function(img){
                var pop 	= this.popup_el,
                    def 	= this.defaults,
                    w 		= img.width(),
                    h 		= img.height(),
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
                    ratio_y = ( this.is_touch ) ? def.image_to_wiewport_max_ratio_touch_y : def.image_to_wiewport_max_ratio_y;

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
	            $.fx.step.delay = function(){};
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
            }
        };
		
	};
   

    window.apply_edys_gallery_module = apply_edys_gallery_module;
})();