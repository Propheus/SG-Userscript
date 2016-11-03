// ==UserScript==
// @name         SG Easy Input Giveaway ID
// @namespace    https://steamcommunity.com/id/Ruphine/
// @version      0.1
// @description  test
// @author       Ruphine
// @match        https://www.steamgifts.com/*
// @icon         https://cdn.steamgifts.com/img/favicon.ico
// ==/UserScript==

var searchbox = "<input type='text' placeholder='Gib ID' style='width: 70px; margin-right: 5px;' maxlength='5'>";
$(searchbox)
	.insertBefore(".nav__left-container")
	.on('keyup', function (e) {
    	if (e.keyCode == 13){
    		var code = $(e.target).val().replace(/[^0-9a-z]/gi, '');
			window.open("/giveaway/" + code + "/");
		}
	});
