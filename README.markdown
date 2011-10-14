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
