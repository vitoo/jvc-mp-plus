// ==UserScript==
// @name         JVC MP Plus
// @namespace    https://github.com/vitoo
// @version      0.1
// @description  Ajout de fonctionnalité aux MP
// @author       vitoo
// @match        http://www.jeuxvideo.com/messages*
// @match        https://www.jeuxvideo.com/messages*
// @grant        none
// @require 	 http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @downloadURL  https://raw.githubusercontent.com/vitoo/jvc-mp-plus/master/jvc-mp-plus.user.js
// @updateURL 	 https://raw.githubusercontent.com/vitoo/jvc-mp-plus/master/jvc-mp-plus.user.js
// ==/UserScript==


var url = jQuery('a.btn-25-msg').attr('href');
jQuery('a.btn-25-msg').text('< 25 messages');
jQuery('a.btn-25-msg').remove();
var regexp = /(.*)?id=([0-9]*)&offset=([0-9]*)(.*)/i;
var result = url.match(regexp);
var paginations = [5, 10, 25, 50];
var id_mp = result[2];
var offset = parseInt(result[3]);
paginations.forEach(function (element, idx, array) {
    if (idx === array.length - 1) {
        var message = " messages";
    }
    else {
        var message = "";
    }

    var offset_loop = offset + (25) - element;
    var html = '<a href="/messages-prives/message.php?id=' + id_mp + '&amp;offset=' + offset_loop + '&amp;folder=1" class="btn btn-25-msg" sl-processed="1">< ' + element + message + ' </a>&nbsp;';
    jQuery('.pagination > div.action-center').append(html);
});