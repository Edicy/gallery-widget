#Edicy gallery lightbox widget

Gallery widget with both click based and touchscreen swipe functionality. 

##Usage

Minimal required snippet:

    <div class="edys-gallery">
      <a href="big_picture1.jpg" rel="Image title"><img src="thumbnail_picture.jpg" alt="" title="" /></a>
    </div>
    <script src="gallery-front.js" type="text/javascript"></script>

##Configuration:

To configure a javascript object `edys_gallery_options` for configuration can be applied before `<script src="gallery-front.js" type="text/javascript"> </script>` tag  like this:

    <script type="text/javascript">
      var edys_gallery_options = {
        jumping_mode: 'loose',
        mode: 'auto'
      }
    </script>

###Configuration variables:

* `gallery_elements` defines DOM elements tat will be defined as gallery. Default is `.edys-gallery`
* `jumping_mode` defines if all gallery elements will be handled as a unified gallery or every gallery has its own pictures. Values: `strict` / `loose`. Default is `strict`.
* `mode` defines if gallery is displayed in touch-swipe mode, ordinary click mode or detected automatically. Both modes work with touchscreen and mouse. Values: `auto` / `touch` / `click`. Default is `auto`.
    
* `autorun_init` default is `true`. If set to false bloks all automatic loading of module. If `edys_gallery` jquery module is needed only, it can be called out in javascript `apply_edys_gallery_module(jQuery);` (jQuery must be preloaded then).
* `autorun_gallery` default is `true`. `jQuery` and `jquery.edys_gallery` modules will be loaded, but script will not be automatically bound to gallery elements.
* `init_complete` default is `null`. Function can be bound to `init_complete` and will be fired after module has been loaded. ex:  `edys_galery_options = { init_complete: function($){ alert("foo"); } }`
    
* `title_dissapear_time` time in seconds for the image title to dissapear in ordinary click mode. Default is `3`. If no fading is desired pass a value of `-1`.
* `title_dissapear_time_touch` time in seconds for the image title and navigation buttons to dissapear in touch mode. Default is `3`. If no fading is desired pass a value of `-1`.
    
`classnames` object that defines user configurable classnames for gallery. Object structure: 

    classnames: {
      overlay:        'edys-gallery-overlay',             // classname of overlay. The gray transparent background
      loading:        'edys-gallery-loading',             // loading icon
      loading_wrap:   'edys-gallery-loading-wrap',        // div around loading icon
      popup:          'edys-gallery-popup',               // popup wrap classname
      left_btn:       'edys-gallery-left',                // left button
      right_btn:      'edys-gallery-right',               // right button
      btn_wrap:       'edys-gallery-btn-wrap',            // wrap around each button element
      btn_wrap_middle:'edys-gallery-btn-wrap-middle',     // additional class to define the wrap around middle button
      close_btn:      'edys-gallery-close',               // close button
      additional_btns:'edys-gallery-btns',                // additional element for user buttons if needed. 
      bottom_btns:    'edys-gallery-bottom-btns',         // navigation buttons wrap
      content_wrap:   'edys-gallery-content-wrap',        // Image outer wrap
      image_wrap:     'edys-gallery-image-wrap',          // image inner wrap
      image_wrap_box: 'edys-gallery-image-wrap-box',      // in touch mode each image is in its own wrap. this is the classname defining these wraps
      title:          'edys-gallery-title',               // title
      notitle:        'edys-gallery-title-notitle'        // additional classname for title if empty
    }
        
* `touchscreen_class_suffix` in touch mode every classname has an additional suffix. Default is `-touch`. Example: in touch mode popup wrap has a class of `edys-gallery-popup-touch`.

* `image_to_wiewport_max_ratio_x` in click mode vertically how big can an image maximally be relative to screen. Default is `0.8`  (means max 80% of screen width).
* `image_to_wiewport_max_ratio_y` in click mode horizontally how big can an image maximally be relative to screen. Default is `0.8`  (means max 80% of screen height).  
* `image_to_wiewport_max_ratio_touch_x` in touch mode vertically how big can an image maximally be relative to screen. Default is `0.8`  (max 80% of screen width).
* `image_to_wiewport_max_ratio_touch_x` in touch mode horizontally how big can an image maximally be relative to screen. Default = `0.97`  (max 97% of screen height).

* `swipe_move_treshold` in touch mode how big move relative to the screen width is considered a swipe and picture changed according to the direction. Default is `0.1` (10% of screen width).
* `tap_move_treshold` maximal movement allowed relative to the screen width for tap detection. Default is `0`
* `user_defined_templates` default is `false`. If set to `true` system searches for a template html inside dom (can be hidden) for default design. Thus 2 additional variables must be defined: 
    * `gallery_template` template element for click mode (defined jQuery style: `#mytemplate` means `id ="mytemplate"`, `.mytemplate` means `class="mytemplate"`)
    * `gallery_touch_template`  template element for touch mode.
* `default_styles` default is `true`. Defines if gallery adds its default css into dom head before all css-es or not.
    
Textual data. Currently only wait text that is displayed only for IE <= 8 as it cannot do css3 transforms and animations for loading spinner.
    texts: {
      wait: "Wait"
    }

`loader_template` Loading spinner html template
    
    <div class="edys-gallery-loading-wrap">
        <div class="edys-gallery-loading">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
            <div class="bar4"></div>
            <div class="bar5"></div>
            <div class="bar6"></div>
            <div class="bar7"></div>
            <div class="bar8"></div>
        </div>
    </div>

`loader_template_ie_lt9` Loading spinner html template for IE up to 8
    
    <div class="edys-gallery-loading-wrap">
        <div class="edys-gallery-loading">
            {wait}
        </div>
    </div>

##Configuring manually edys_gallery on elements and its events

`edys_gallery` can be initiated manually on forms as such if `jQuery` is loaded. Options are as in main configuration variables and passed as object.

    $('#element-id').edys_gallery(options);

Gallery elements `edys_gallery` javascript object bound to it can be called out as follows to access its functions

    var obj = $('#element-id').edys_gallery('get_object');

If `jQuery` is preloaded you can access module loaded event like this (alernatively to `edys_gallery_options.init_complete`. If `edys_gallery_options.init_complete` is set this event is not listened to):

    $('body').bind('Edys_gallery_complete', function (){ alert('foo'); });

#Designing HTML and css
      
Default html for reference. For touch mode template all classes have "-touch" suffix:

    <div class="edys-gallery-popup">
        <div class="edys-gallery-overlay"></div>
        <div class="edys-gallery-btns"></div>
        <div class="edys-gallery-bottom-btns">
            <div class="edys-gallery-btn-wrap"><div class="edys-gallery-left"></div></div>
            <div class="edys-gallery-btn-wrap edys-gallery-btn-wrap-middle"><div class="edys-gallery-close"></div></div>
            <div class="edys-gallery-btn-wrap"><div class="edys-gallery-right"></div></div>
        </div>
        <div class="edys-gallery-content-wrap">
           <div class="edys-gallery-image-wrap"></div>
           <div class="edys-gallery-title"></div>
        </div>
    </div>

Css for redesigning starting point:

    .edys-gal-gallery-overlay, .edys-gal-gallery-overlay-touch, .edys-gallery-overlay, .edys-gallery-overlay-touch {
      position: absolute;
      background: #000000;
      -moz-opacity: 0.75;
      -webkit-opacity: 0.75;
      opacity: 0.75;
      filter: alpha(opacity = 75);
      z-index: 1001;
      margin: 0;
      padding: 0;
      overflow: hidden;
      left: 0;
      top: 0;
    }
    .edys-gal-gallery-popup, .edys-gallery-popup, .edys-gal-gallery-popup-touch, .edys-gallery-popup-touch {
      position: absolute;
      z-index: 1000;
      margin: 0;
      padding: 0;
      text-align: center;
      font-family: Helvetica, Arial;
      left: 0;
      top: 0;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }
    .edys-gal-gallery-popup-touch, .edys-gallery-popup-touch {
      text-align: left;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      font-family: Helvetica, Arial;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
    }
    .edys-gal-gallery-close, .edys-gallery-close, .edys-gal-gallery-close-touch, .edys-gallery-close-touch {
      background: url("http://static.kraftal.com/gallery/3.0/edys_gallery_close.gif") no-repeat center center;
      width: 68px;
      height: 48px;
      display: inline-block;
      cursor: pointer;
      margin: 10px 0;
      border-color: #3c4143;
      border-width: 0 1px;
      border-style: solid;
    }
    .edys-gal-gallery-bottom-btns, .edys-gallery-bottom-btns, .edys-gal-gallery-bottom-btns-touch, .edys-gallery-bottom-btns-touch {
      -moz-border-radius: 4px;
      -webkit-border-radius: 4px;
      border-radius: 4px;
      padding: 0px;
      display: inline;
      position: absolute;
      margin-bottom: 0.5%;
      left: 50%;
      margin-left: -102px;
      z-index: 1004;
      bottom: 0;
      background: #262c2f;
      background: rgba(27,33,36,0.8);
      margin-bottom: 1.5%;
    }
    .edys-gal-gallery-btn-wrap, .edys-gallery-btn-wrap, .edys-gal-gallery-btn-wrap-touch, .edys-gallery-btn-wrap-touch {
      width: 68px;
      height: 68px;
      display: inline-block;
      float: left;
      vertical-align: middle;
      line-height: 48px;
      text-align: center;
    }

    .edys-gal-gallery-btn-wrap:hover, .edys-gal-gallery-btn-wrap.over, .edys-gal-gallery-btn-wrap-touch:hover, .edys-gal-gallery-btn-wrap-touch.over, .edys-gallery-btn-wrap:hover, .edys-gallery-btn-wrap.over, .edys-gallery-btn-wrap-touch:hover, .edys-gallery-btn-wrap-touch.over {
      background-color: rgba(255,255,255,0.025);
    }
    .edys-gal-gallery-content-wrap, .edys-gallery-content-wrap {
      box-shadow: 2px 0px 10px #000000;
      clear: both;
      position: absolute;
      text-align: center;
      z-index: 1003;
    }
    .edys-gal-gallery-content-wrap-touch, .edys-gallery-content-wrap-touch {
      width: 100%;
      position: relative;
      overflow: hidden;
      z-index: 1003;
      margin-top: 0.5%;
    }
    .edys-gal-gallery-image-wrap, .edys-gallery-image-wrap {
      overflow: hidden;
    }
    .edys-gal-gallery-image-wrap img, .edys-gallery-image-wrap img {
      position:static;
      display: block;
      border: 0;
      margin: 0;
      max-width: none;
      padding:0;
      max-height: none;
      float: none;
      width: auto;
      height: auto;
    }
    .edys-gal-gallery-image-wrap-box-touch, .edys-gallery-image-wrap-box-touch {
      display: inline-block;
      width: 100%;
      vertical-align: middle;
      margin-top: -30px;
      text-align: center;
    }
    .edys-gal-gallery-image-wrap-box-touch img, .edys-gallery-image-wrap-box-touch img {
      position:static;
      display: block;
      border: 0;
      margin: 0;
      max-width: none;
      padding:0;
      max-height: none;
      float: none;
      width: auto;
      height: auto;
      box-shadow: 2px 0px 10px #000000;
    }
    .edys-gal-gallery-image-wrap-touch, .edys-gallery-image-wrap-touch {
      position: relative;
      white-space: nowrap;
    }
    .edys-gal-gallery-right, .edys-gallery-right, .edys-gal-gallery-right-touch, .edys-gallery-right-touch {
      background: url("http://static.kraftal.com/gallery/3.0/edys_gallery_right_arrow.gif") no-repeat center center;
      width: 68px;
      height: 68px;
      display: inline;
      display: inline-block;
      float: right;
      cursor: pointer;
      vertical-align: middle;
    }
    .edys-gal-gallery-left, .edys-gallery-left, .edys-gal-gallery-left-touch, .edys-gallery-left-touch {
      background: url("http://static.kraftal.com/gallery/3.0/edys_gallery_left_arrow.gif") no-repeat center center;
      width: 68px;
      height: 68px;
      display: inline;
      display: inline-block;
      float: left;
      cursor: pointer;
      vertical-align: middle;
    }
    .edys-gal-gallery-right.disabled, .edys-gallery-right.disabled, .edys-gal-gallery-right-touch.disabled, .edys-gallery-right-touch.disabled, .edys-gal-gallery-left.disabled, .edys-gallery-left.disabled, .edys-gal-gallery-left-touch.disabled, .edys-gallery-left-touch.disabled {
      -moz-opacity: 0.1;
      -webkit-opacity: 0.1;
      opacity: 0.1;
      filter: alpha(opacity = 10);
    }
    .edys-gal-gallery-title, .edys-gallery-title {
      background: #262c2f;
      background: rgba(27,33,36,0.8);
      color: #ffffff;
      display: inline-block;
      position: relative;
      z-index: 1010;
      bottom: 52px;
      line-height: 18px;
      border-radius: 4px;
      padding: 7px 20px;
      font-size: 14px;
    }
    .edys-gal-gallery-title-touch, .edys-gallery-title-touch {
      background: #262c2f;
      background: rgba(27,33,36,0.8);
      color: #ffffff;
      display: inline-block;
      position: relative;
      z-index: 1010;
      top: 40px;
      line-height: 18px;
      -moz-border-radius: 4px;
      -webkit-border-radius: 4px;
      border-radius: 4px;
      padding: 7px 20px;
      font-size: 14px;
    }
    .edys-gal-gallery-title-touch.edys-gal-gallery-title-notitle-touch, .edys-gallery-title-touch.edys-gallery-title-notitle-touch {
      visibility: hidden;
    }
    .edys-gallery-loading, .edys-gal-gallery-loading, .edys-gallery-loading-touch, .edys-gal-gallery-loading-touch {
      position: absolute;
      width: 40px;
      height: 40px;
      margin-top: -20px;
      z-index: 1010;
      margin-left: -5px;
      -moz-border-radius: 40px;
      -webkit-border-radius: 40px;
      border-radius: 40px;
      -webkit-animation-name: rotateThis;
      -webkit-animation-duration: 2s;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;
      -moz-animation-name: rotateThisMoz;
      -moz-animation-duration: 2s;
      -moz-animation-iteration-count: infinite;
      -moz-animation-timing-function: linear;
      -ms-animation-name: rotateThisMs;
      -ms-animation-duration: 2s;
      -ms-animation-iteration-count: infinite;
      -ms-animation-timing-function: linear;
      -o-transition-duration: 0s;
      -o-transition-timing-function: linear;
      background: #cccccc;
      background: rgba(255,255,255,0);
      padding: 10px;
    }
    .edys-gallery-loading-rotate-touch {
      -o-transition-duration: 2s;
      -o-transform: rotate(359deg);
    }
    .edys-gallery-loading-touch, .edys-gal-gallery-loading-touch {
      display: inline-block;
      position: relative;
      margin-left: 0;
    }
    .edys-gallery-loading-wrap-touch, .edys-gal-gallery-loading-wrap-touch {
      width: 100%;
      display: block;
      text-align: center;
      position: relative;
    }
    .edys-gallery-loading-wrap, .edys-gal-gallery-loading-wrap {
      position: absolute;
      width: 40px;
      height: 40px;
    }
    .edys-gallery-loading-wrap.ie-fix, .edys-gal-gallery-loading-wrap.ie-fix, .edys-gallery-loading-wrap-touch.ie-fix, .edys-gal-gallery-loading-wrap-touch.ie-fix {
        color: #ffffff;
        background-color: #2e3437
    }
    @-webkit-keyframes rotateThis {from {-webkit-transform: rotate(0deg);} to {-webkit-transform: rotate(360deg);}}
    @-moz-keyframes rotateThisMoz {from {-moz-transform: rotate(0deg);} to {-moz-transform: rotate(360deg);}}
    @-ms-keyframes rotateThisMs {from {-ms-transform: rotate(0deg);} to {-ms-transform: rotate(360deg);}}
    .edys-gallery-loading div, .edys-gal-gallery-loading div, .edys-gallery-loading-touch div, .edys-gal-gallery-loading-touch div {
      width: 10px;
      height: 10px;
      background: #000;
      -moz-border-radius: 20px;
      -webkit-border-radius: 20px;
      border-radius: 20px;
      position: absolute;
      left: 25px;
      top: 25px;
    }
    .edys-gallery-loading .bar1, .edys-gal-gallery-loading .bar1, .edys-gallery-loading-touch .bar1, .edys-gal-gallery-loading-touch .bar1 {
      -moz-transform: rotate(0deg) translate(0, -20px);
      -ms-transform: rotate(0deg) translate(0, -20px);
      -o-transform: rotate(0deg) translate(0, -20px);
      -webkit-transform: rotate(0deg) translate(0, -20px);
      opacity: 0.12;
    }
    .edys-gallery-loading .bar2 , .edys-gal-gallery-loading .bar2 , .edys-gallery-loading-touch .bar2 , .edys-gal-gallery-loading-touch .bar2 {
      -moz-transform: rotate(45deg) translate(0, -20px);
      -ms-transform: rotate(45deg) translate(0, -20px);
      -o-transform: rotate(45deg) translate(0, -20px);
      -webkit-transform: rotate(45deg) translate(0, -20px);
      opacity: 0.25;
    }
    .edys-gallery-loading .bar3, .edys-gal-gallery-loading .bar3, .edys-gallery-loading-touch .bar3, .edys-gal-gallery-loading-touch .bar3 {
      -moz-transform: rotate(90deg) translate(0, -20px);
      -ms-transform: rotate(90deg) translate(0, -20px);
      -o-transform: rotate(90deg) translate(0, -20px);
      -webkit-transform: rotate(90deg) translate(0, -20px);
      opacity: 0.37;
    }
    .edys-gallery-loading .bar4, .edys-gal-gallery-loading .bar4, .edys-gallery-loading-touch .bar4, .edys-gal-gallery-loading-touch .bar4 {
      -moz-transform: rotate(135deg) translate(0, -20px);
      -ms-transform: rotate(135deg) translate(0, -20px);
      -o-transform: rotate(135deg) translate(0, -20px);
      -webkit-transform: rotate(135deg) translate(0, -20px);
      opacity: 0.50;
    }
    .edys-gallery-loading .bar5, .edys-gal-gallery-loading .bar5, .edys-gallery-loading-touch .bar5, .edys-gal-gallery-loading-touch .bar5 {
      -moz-transform: rotate(180deg) translate(0, -20px);
      -ms-transform: rotate(180deg) translate(0, -20px);
      -o-transform: rotate(180deg) translate(0, -20px);
      -webkit-transform: rotate(180deg) translate(0, -20px);
      opacity: 0.62;
    }
    .edys-gallery-loading .bar6, .edys-gal-gallery-loading .bar6, .edys-gallery-loading-touch .bar6, .edys-gal-gallery-loading-touch .bar6 {
      -moz-transform: rotate(225deg) translate(0, -20px);
      -ms-transform: rotate(225deg) translate(0, -20px);
      -o-transform: rotate(225deg) translate(0, -20px);
      -webkit-transform: rotate(225deg) translate(0, -20px);
      opacity: 0.75;
    }
    .edys-gallery-loading .bar7, .edys-gal-gallery-loading .bar7, .edys-gallery-loading-touch .bar7, .edys-gal-gallery-loading-touch .bar7 {
      -moz-transform: rotate(270deg) translate(0, -20px);
      -ms-transform: rotate(270deg) translate(0, -20px);
      -o-transform: rotate(270deg) translate(0, -20px);
      -webkit-transform: rotate(270deg) translate(0, -20px);
      opacity: 0.87;
    }
    .edys-gallery-loading .bar8, .edys-gal-gallery-loading .bar8, .edys-gallery-loading-touch .bar8, .edys-gal-gallery-loading-touch .bar8 {
      -moz-transform: rotate(315deg) translate(0, -20px);
      -ms-transform: rotate(315deg) translate(0, -20px);
      -o-transform: rotate(315deg) translate(0, -20px);
      -webkit-transform: rotate(315deg) translate(0, -20px);
      opacity: 1;
    }


    .edys-gal-gallery-onimage-nav {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
    }
    .edys-gal-gallery-onimage-nav-rev,.edys-gal-gallery-onimage-nav-fw {
      height: 100%;
      width: 50%;
      float: left;
      background: url("http://static.kraftal.com/gallery/3.0/edys-gallery-transparent.gif");
    }

Css for IE7 and less

    .edys-gal-gallery-title-touch, .edys-gal-gallery-title, .edys-gallery-title-touch, .edys-gallery-title {
        display: inline-block;
    }
    .edys-gal-gallery-image-wrap-box-touch, .edys-gallery-image-wrap-box-touch {
        float: left;
    }
    .edys-gal-gallery-title-touch, .edys-gal-gallery-title, .edys-gallery-title-touch, .edys-gallery-title, .edys-gal-gallery-bottom-btns, .edys-gal-gallery-bottom-btns-touch, .edys-gallery-bottom-btns, .edys-gallery-bottom-btns-touch, .edys-gallery-loading, .edys-gal-gallery-loading, .edys-gallery-loading-touch, .edys-gal-gallery-loading-touch {
        background: #262c2f;
    }
    .edys-gallery-btn-wrap:hover, .edys-gallery-btn-wrap.over, .edys-gallery-btn-wrap-touch:hover, .edys-gallery-btn-wrap-touch.over {
        background-color: #2e3437;
    }
    .edys-gallery-loading.ie-fix, .edys-gal-gallery-loading.ie-fix, .edys-gallery-loading-touch.ie-fix, .edys-gal-gallery-loading-touch.ie-fix {
        color: #ffffff;
        background-color: #2e3437;
        border-radius: 5px;
        text-align: center;
        height: auto;
    }
