#Edicy gallery lightbox widget

Gallery widget with both click based and touchscreen swipe functionality. 

##Usage

Add stylesheet to `head`:


    <link rel="stylesheet" href="edys_gallery.css" />


And to required place add:

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