// creating nav bar and restructuring document
$(document).ready(function() {

    var $b = $('body'),
        $h = $('#header'),
        panderUrl = 'https://github.com/daroczig/pander';

    // add container div
    var $container = $('<div/>', {
        class: "container"
    }).prependTo($b);

    // add sidebar
    var $sidebar = $('<div/>', {
        class: 'three columns sidebar'
    }).appendTo($container);

    // add content div
    var $content = $('<div/>', {
        class: 'twelve columns content offset-by-three content'
    }).appendTo($container);

    // all but container -> goto content div
    $b.children().not($container).appendTo($content);

    var $nav = $('<nav/>').prependTo($sidebar); // add nav to sidebar

    // add logo div
    var $logo = $('<div/>', {
        id: 'logo',
        html: $('<p/>', {
            href: panderUrl,
            target: '_blank',
	    text: 'Table of Contents'
        })
    }).prependTo($nav);

    // add ul for sidebar menu
    var $ul = $('<ul/>').appendTo($nav);
    var $header = $('<header/>').prependTo($content); // add header to content div
    // move #header contents to header and remove element
    $h.children().appendTo('header');
    $h.remove();

    $header.after('<hr class="large" />');

    // get all headings
    var $head = $content.children().not('header').filter(':header');

    $head.each(function(i, val){
        
        var linkId = val.id + "_link",
            $val = $(val);

        // insert anchor links before headings
        $('<a/>', {
            id: linkId
        }).insertBefore($val);

        // insert navigation items
        $('<li/>', {
            class: 'nnav-' + (parseInt($val.get(0).nodeName.replace('H', '')) + 1),
            html: $('<a>').attr({ href: '#' + linkId}).text($val.text())
        }).appendTo('nav > ul');
    });
    
    // wrap each table in a container div
    $content.find('table').wrap('<div class="table-container" />');
    // add math container
    $content.find('span.math').parent().wrap('<div class="math-container" />');

    // Colorbox
    var $contentImg = $content.find('img');
    $contentImg.each(function(i, e){
	$(e).colorbox({
	    inline: true,
	    href: $(e)
	});
    });

});
