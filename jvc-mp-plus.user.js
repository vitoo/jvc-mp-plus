// ==UserScript==
// @name         JVC MP Plus
// @namespace    https://github.com/vitoo
// @version      0.3
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
if(!url){ //si le bouton de pagination est présent
    return false;
}
var text = jQuery('a.btn-25-msg').text();
var nbr_message  = parseInt(text.replace ( /[^\d.]/g, '' ));
if(nbr_message < 5){ //si on a au moins 5 messages dans le bouton de pagination
    return false;
}
jQuery('a.btn-25-msg').remove();

var regexp = /(.*)?id=([0-9]*)&offset=([0-9]*)(.*)/i;
var result = url.match(regexp);
var id_mp = result[2];
var offset = parseInt(result[3]); 
var current_position = offset+nbr_message;  //nombre de message affiché dans le MP 

var paginations = [5, 10, 25, 50];
//remove useless pagination
for(i = 0 ; i < paginations.length  ; i++){
    if(paginations[i] >= current_position){
        paginations.splice(i, 4); 
    }
}

paginations.forEach(function (element, idx, array) {
    if (idx === array.length - 1) {
        //si dernier bouton on affiche 'messages'
        var message = " messages";
    }
    else {
        var message = "";
    }
    var offset_loop = current_position - element;
    var html = '<a href="/messages-prives/message.php?id=' + id_mp + '&amp;offset=' + offset_loop + '&amp;folder=1" class="btn btn-25-msg" sl-processed="1">< ' + element + message + ' </a>&nbsp;';
    jQuery('.pagination > div.action-center').append(html);

});
//debug
//console.log("nbr_message "  + nbr_message);
//console.log("current_position : " + current_position);
