# rj-gallery - Gallery lightbox

rj-gallery displays configurable gallery lightbox. It works separately with each gallery container on page. Gallery lightbox automatically seeks for gallery containers.
This plugin has been created for one of my commercial projects.

## How to use

1. Upload CSS, JS and IMG files to your project
2. Add proper links to files in your HTML
3. Check if url address for navigation buttons images are set properly for your project file system in CSS file (line 207)
4. Prepare HTML code for the gallery/ies as presented in "Gallery HTML" section
5. Add gallery lightbox configuration object in your HTML in a way presented in "Configuration" section

## Gallery HTML

Prepare HTML code for gallery lightbox and add this to your page. Of course there is also no problem in adding two or more separate galleries on your page.

```html
<div class="rj-container">
    <div class="rj-image-col">
        <div class="rj-image-box">
            <div class="rj-inner-box">
                <div class="rj-overlay"></div>
                <div class="rj-image">
                    <img class="rj-img-thumb" src="img/1.jpg" data-imgtitle="Title">
                </div>
            </div>
        </div>
    </div>
    <div class="rj-image-col">
        <div class="rj-image-box">
            <div class="rj-inner-box">
                <div class="rj-overlay"></div>
                <div class="rj-image">
                    <img class="rj-img-thumb" src="img/2.jpg">
                </div>
            </div>
        </div>	
    </div>	
    <div class="rj-image-col">
        <div class="rj-image-box">
            <div class="rj-inner-box">
                <div class="rj-overlay"></div>
                <div class="rj-image">
                    <img class="rj-img-thumb" src="img/3.jpg">
                </div>
            </div>
        </div>
    </div>									
</div>
```

## Configuration

To add gallery lightbox configuration object use the code below. It is important to add this object before adding `rj-gallery.js` file. Configure it in a way displayed in below snippet:

```Javascript
rjOptions = {
    counter: true,
    imgbar: true,
    expandable: true,
    title: true,
    style: 'rounded'
};
```

The code presented above is a configuration object. These are also default options so if you don't provide rjOptions object, the gallery will be working on your page with these options. Now lets get further information about every configuration options:

* `counter` - decide whether the gallery lightbox should have image counter. Choose between `true` and `false` **(boolean)**
* `imgbar` - decide whether the gallery lightbox should have images bar for choosing specific image from gallery. Choose between `true` and `false` **(boolean)**
* `expandable` - decide whether the gallery lightbox should have possibility to show image on full screen. Choose between `true` and `false` **(boolean)**
* `title` - decide whether the gallery lightbox should have image title (This can be provided by `data-imgtitle` attribute on `<img>` element). Choose between `true` and `false` **(boolean)**
* `style` - choose navigation buttons style: `square`, `square nocolor`, `rounded`, `rounded nocolor`, `leaf`, `leaf nocolor`, `noshape` or `noshape nocolor` **(string)**

## Technologies used
* JavaScript (ES5)
* CSS
* HTML

## Project status
Works properly but needs code refreshing
