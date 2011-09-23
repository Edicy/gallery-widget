(function(){
    var $,google,jQuery;
    
    var G = {
        defaults: {
            jquery_atleast_version: '1.5',
            jquery_url: 'ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js',
            jquery_ui_url: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js',
            
            gallery_elements: '.edys-gallery',
            gallery_template: false,
            
            popup_template: '<div class="{popup_class}">\
                                <div class="{close_class}"></div>\
                                <div class="{left_wrap_class}"><div class="{left_class}"></div></div>\
                                <div class="{right_wrap_class}"><div class="{right_class}"></div></div>\
                                <div class="{buttons_class}"></div>\
                                <div class="{content_wrap_class}">\
                                    <div class="{image_wrap_class}"></div>\
                                    <div class="{title_class}"></div>\
                                </div>\
                            </div>',
            stylesheet: '',
            
            classnames: {
                overlay:        'edys-gallery-overlay',
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
                $(document).ready(function(){
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

                if(p.overlay === null){ p.overlay = p.make_overlay(); }
                
                if(p.pop === null){ p.pop = p.make_popup(); }
                
                p.set_overlay_size();
                p.overlay.show();

                
                
                p.preload_image(list[index].href,function(img){
                    p.pop.find('.'+sc.image_wrap).html(img);
                    p.pop.css('visibility','hidden').show();
                    p.set_popup_size_pos();
                    p.set_overlay_size();
                    p.set_next_prev_buttons(index,list);
                    p.pop.css('visibility','visible');
                });
                
                
                /*p.preload_images(index,list,function(imgs){
                    p.pop.find('.'+sc.image_wrap).html(imgs.current);
                    p.pop.css('visibility','hidden').show();
                    p.set_popup_size_pos();
                    p.set_overlay_size();
                    p.set_next_prev_buttons(imgs);
                    p.pop.css('visibility','visible');
                });*/
            },
            
            hide: function(){
                var sc = G.defaults.system_classnames;
                $('.'+sc.popup+', .'+sc.overlay).hide();
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
                var w = $(document).width(),
                    h = $(document).height(),
                    o = G.popup.overlay;
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
            
            set_img_size: function(img){
                var pop =   G.popup.pop, 
                    def =   G.defaults,
                    w =     img.width(),
                    h =     img.height();
                img.height(1);
                var vw =    $(window).width(),
                    vh =    $(window).height();
                    
                if (h > def.image_to_wiewport_max_ratio*vh){ img.height(def.image_to_wiewport_max_ratio*vh); } 
            },
            
            set_popup_size_pos: function(){
                var pop =   G.popup.pop, 
                    def =   G.defaults,
                    img =   pop.find('.'+def.system_classnames.image_wrap+' img');
                
                G.popup.set_img_size(img);
                
                var vw =    $(window).width(),
                    vh =    $(window).height();

                var pw =    pop.outerWidth(),
                    ph =    pop.outerHeight(),
                    pleft = (vw/2)-(pw/2),
                    ptop = (vh/2)-(ph/2);
  
                pop.css({
                    'left': pleft+'px',
                    'top': ptop+'px'
                });
            },
            
            
            preload_image: function(img,f){
                var i = $('<img />').attr('src',img).load(function(){
                    f($(this));
                });
            },
            
            set_next_prev_buttons: function(index,list){
                var p = G.popup,
                    pop = p.pop,
                    sc = G.defaults.system_classnames,
                    r_btn = pop.find('.'+sc.right_btn_wrap),
                    l_btn = pop.find('.'+sc.left_btn_wrap),
                    has_next = (index+1 < list.length),
                    has_prev = (index-1 >= 0);
                
                /* hide next/prev btn if needed */
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
                    
                r_btn.unbind('click').click(function(e){
                    $(e.target).unbind('click');
                    if(has_next){
                        var new_index = index+1;
                        p.change_to_image(new_index,list);
                    }
                });
                
                l_btn.unbind('click').click(function(e){
                    $(e.target).unbind('click');
                    if(has_prev){
                        var new_index = index-1;
                        p.change_to_image(new_index,list);
                    }
                }); 
            },
            
            change_to_image: function (index,list){
                var p = G.popup,
                    pop = p.pop,
                    sc = G.defaults.system_classnames;
                    
                p.preload_image(list[index].href,function(new_image){
                    var old_img = $('.'+sc.image_wrap+' img');
                    new_image.css({
                        'position': "absolute",
                        'visibility':'hidden'
                    }).hide();
                    pop.find('.'+sc.image_wrap).prepend(new_image);
                    p.set_popup_size_pos();
                    new_image.css({'visibility':'visible'}).fadeIn(function(){
                        old_img.remove();
                        new_image.css({'position': "static"});
                        p.set_next_prev_buttons(index,list);
                    });
                    
                });
            }
        },
    
        get_jquery: function (url,ver,f){
            if (!isset(window.jQuery) || window.jQuery.fn.jquery < ver) {
                load_script(G.defaults.jquery_url,function() {
                   jQuery = $ = window.jQuery.noConflict(true);
                   f();
                });
            } else {
                $ = window.jQuery;
                f();
            }
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

    G.init();
})();