# Usage

Minimal required snippet:

    <div class="edys-gallery">
      <a href="big_picture1.jpg" rel="Image title"><img src="thumbnail_picture.jpg" alt="" title="" /></a>
    </div>
    <script src="gallery-front.js" type="text/javascript"></script>

Required files:

    wait.gif
    close.gif
    left_arrow.gif
    right_arrow.gif

# Configuration:

To configure a javascript object "edys_gallery_options" for configuration can be applied before <script src="gallery-front.js" type="text/javascript"> </script> tag  like this:

    <script type="text/javascript">
      var edys_gallery_options = {
        jumping_mode: 'loose',
        mode: 'auto'
      }
    </script>

Configuration variables:

    gallery_elements: defines DOM elements tat will be defined as gallery. Default = ".edys-gallery"
    
    jumping_mode: defines if all gallery elements will be handled as a unified gallery or every gallery has its own pictures. Values > strict / loose. Default = strict.
    mode: defines if gallery is displayed in toush-swipe mode, ordinary click mode or detected automatically. Both modes work with touchscreen and mouse. Values > auto / touch / click. Default = auto.
    
    title_dissapear_time: time in seconds for the image title to dissapear in ordinary click mode. Default = 1.5. If no fading is desired pass a value of -1.
    title_dissapear_time_touch: time in seconds for the image title and navigation buttons to dissapear in touch mode. Default = 3. If no fading is desired pass a value of -1.
    
    classnames: object that defines user confugurable classnames for gallery. Object structure: 
        classnames: {
                overlay:        'edys-gallery-overlay',             => classname of overlay. The gray transparent background
                loading:        'edys-gallery-loading',             => loading icon classname
                popup:          'edys-gallery-popup',               => popup wrap classname
                left_btn:       'edys-gallery-left',                => left button classname
                right_btn:      'edys-gallery-right',               => right button classname
                btn_wrap:       'edys-gallery-btn-wrap',            => wrap around each button element
                btn_wrap_middle:'edys-gallery-btn-wrap-middle',     => additional class to define the wrap around middle button
                close_btn:      'edys-gallery-close',               => close button
                additional_btns:'edys-gallery-btns',                => additional element for user buttons if needed. 
                bottom_btns:    'edys-gallery-bottom-btns',         => navigation buttons wrap
                content_wrap:   'edys-gallery-content-wrap',        => Image outer wrap
                image_wrap:     'edys-gallery-image-wrap',          => image inner wrap
                image_wrap_box: 'edys-gallery-image-wrap-box',      => in touch mode each image is in its own wrap. this is the classname defining these wraps
                title:          'edys-gallery-title',               => title
                notitle:        'edys-gallery-title-notitle'        => additional classname for title if empty
        }
        
    touchscreen_class_suffix: in touch mode every classname has an additional suffix. Default = "-touch". Example: in touch mode popup wrap has a class of "edys-gallery-popup-touch".
    
    image_to_wiewport_max_ratio_x: in click mode vertically how big can an image maximally be relative to screen. default = 0.8;  (max 80% of screen width).
    image_to_wiewport_max_ratio_y: in click mode horizontally how big can an image maximally be relative to screen. default = 0.8;  means max 80% of screen height.  
    image_to_wiewport_max_ratio_touch_x: in touch mode vertically how big can an image maximally be relative to screen. default = 0.8;  (max 80% of screen width).
    image_to_wiewport_max_ratio_touch_x: in touch mode horizontally how big can an image maximally be relative to screen. default = 0.97;  (max 97% of screen height).

    swipe_move_treshold: in touch mode how big move relative to the screen width is considered a swipe and picture changed according to the direction. default = 0.1; (10% of screen width).
    tap_move_treshold: maximal movement allowed relative to the screen width for tap detection. default = 0;
    
    user_defined_templates: default = false. If set to "true" system searches for a template html inside dom (can be hidden) for default design. Thus 2 additional variables must be defined:
      gallery_template => template element for click mode (defined jQuery style: "#mytemplate" means id = mytemplate, ".mytemplate" means class="mytemplate")
      gallery_touch_template => template element for touch mode.
    
    default_styles: default = true. Defines if gallery adds its default css into dom head before all css-es or not.
    
    
#Designing HTML and css
      
Default html for reference. For touch mode template all classes have "-touch" suffix:

    <div class="edys-gallery-popup">\
        <div class="edys-gallery-overlay"></div>\
        <div class="edys-gallery-btns"></div>\
        <div class="edys-gallery-bottom-btns">\
            <div class="edys-gallery-btn-wrap"><div class="edys-gallery-left"></div></div>\
            <div class="edys-gallery-btn-wrap edys-gallery-btn-wrap-middle"><div class="edys-gallery-close"></div></div>\
            <div class="edys-gallery-btn-wrap"><div class="edys-gallery-right"></div></div>\
        </div>\
        <div class="edys-gallery-content-wrap">\
           <div class="edys-gallery-image-wrap"></div>\
           <div class="edys-gallery-title"></div>\
        </div>\
    </div>

Css for redesigning starting point:

    .edys-gallery-overlay, .edys-gallery-overlay-touch {
      position: fixed;
      background: #000000;
      opacity: 0.75;
      filter: alpha(opacity = 50);
      z-index: 1001;
      margin:0; padding:0;
      overflow: hidden;
      left:0; top:0;
    }
    .edys-gallery-popup, .edys-gallery-popup-touch {
      position: absolute;
      z-index: 1000;
      margin:0; padding:0;
      text-align: center;
      font-family: Helvetica, Arial;
      height: 100%;
      width: 100%;
      left:0; top:0;
      overflow: hidden;
    }
    .edys-gallery-popup-touch {
      text-align: left;
    }
    .edys-gallery-close, .edys-gallery-close-touch {
      background: url("close.gif") no-repeat;
      width: 33px;
      height: 33px;
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
    }
    .edys-gallery-bottom-btns,.edys-gallery-bottom-btns-touch {
      background: rgb(38,44,47);
      background: rgba(27,33,36,0.8);
      border-radius: 4px;
      padding: 10px;
      display: inline-block;
      position: absolute;
      bottom: 0px;
      margin-bottom: 0.5%;
      left: 50%;
      margin-left: -97px;
      z-index: 1004;
    }
    .edys-gallery-btn-wrap, .edys-gallery-btn-wrap-touch {
      width: 48px; height: 48px;
      display: inline-block;
      vertical-align: middle;
      line-height: 48px;
      text-align: center;
    }
    .edys-gallery-btn-wrap-middle, .edys-gallery-btn-wrap-middle-touch {
      border-width: 0px 1px 0px 1px;
      border-style: solid;
      border-color: #3c4143;
      padding: 0 10px;
      text-align: center;
    }
    .edys-gallery-content-wrap {
      clear: both;
      position: absolute;
      text-align: center;
      z-index: 1003;
    }
    .edys-gallery-content-wrap-touch {
      width: 100%;
      position: relative;
      overflow: hidden;
      z-index: 1003;
      margin-top: 0.5%;
    }
    .edys-gallery-image-wrap {
      box-shadow: 2px 0px 10px #000000;
      overflow: hidden;
    }
    .edys-gallery-image-wrap img {
      display: block;
      border:0;
      margin:0;
    }
    .edys-gallery-image-wrap-box-touch {
      display: inline-block;
      width: 100%;
      vertical-align: middle;
      margin-top: -30px;
      text-align: center;
    }
    .edys-gallery-image-wrap-box-touch img{
      box-shadow: 2px 0px 10px #000000;
    }
    .edys-gallery-image-wrap-touch{
      position: relative;
      white-space:nowrap;
    }
    .edys-gallery-right, .edys-gallery-right-touch {
      background: url("right_arrow.gif") no-repeat 8px center;
      width: 41px;
      height: 41px;
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
    }
    .edys-gallery-left, .edys-gallery-left-touch {
      background: url("left_arrow.gif") no-repeat 8px center;
      width: 41px;
      height: 41px;
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
    }
    .edys-gallery-loading {
      position: absolute;
      z-index: 1010;
      background: url('wait.gif') no-repeat;
      height: 32px;
      width: 32px;
    }
    .edys-gallery-loading-touch {
      background: url('wait.gif') no-repeat center 0;
      height: 32px;
      width: 100%;
      display: block;
      clear:both;
    }
    .edys-gallery-title{
      background: rgb(38,44,47);
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
    .edys-gallery-title-touch {
      background: rgb(38,44,47);
      background: rgba(27,33,36,0.8);
      color: #ffffff;
      display: inline-block;
      position: relative;
      z-index: 1010;
      top: 40px;
      line-height: 18px;
      border-radius: 4px;
      padding: 7px 20px;
      font-size: 14px;
    }
    .edys-gallery-title-touch.edys-gallery-title-notitle-touch {
      visibility: hidden;
    }
