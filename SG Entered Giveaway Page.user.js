// ==UserScript==
// @name         SG Entered Giveaway Page
// @namespace    https://steamcommunity.com/id/Ruphine/
// @version      3
// @description  Added point value, creator, level, and giveaway type at Giveaway > Entered page.
// @author       Ruphine
// @match        https://www.steamgifts.com/giveaways/entered*
// @icon         https://cdn.steamgifts.com/img/favicon.ico
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

const PROCESS_ENDED_GA = false; //change to [true] if you want to show info for ended GA too
const SHOW_POINT   = true; //change to [false] if you don't want to show giveaway point value
const SHOW_CREATOR = true; //change to [false] if you don't want to show giveaway creator
const SHOW_LEVEL   = true; //change to [false] if you don't want to show giveaway level
const SHOW_TYPE    = true; //change to [false] if you don't want to show giveaway type
const CACHE_TIME = 60*60*1000; //1 hour. cache data will be deleted after 1 hour not opening https://www.steamgifts.com/giveaways/entered

var LastSavedData = GM_getValue("lastchecked", 0);
var CachedData;

if(LastSavedData <  Date.now() - CACHE_TIME) //delete cache if over CACHE_TIME has passed
	CachedData = [];
else
	CachedData = JSON.parse(GM_getValue("cache", "[]"));

ProcessPage($(".widget-container"));
var observer = new MutationObserver(function(mutations)
{
	$.each(mutations, function(index, mutation){
		ProcessPage(mutation.addedNodes);
	});
});
var config = {childList: true, attributes: false, characterData: false};
$(".widget-container>div").each(function(index, element){
	observer.observe(element, config);
});

function ProcessPage(parent){
	if(SHOW_TYPE){
		$(parent).find(".table__heading .table__column--width-fill").after('<div class="table__column--width-small text-center">Type</div>');
		$(parent).find(".table__rows .table__column--width-fill").after('<div class="table__column--width-small text-center table__column-type"></div>');
	}
	if(SHOW_LEVEL){
		$(parent).find(".table__heading .table__column--width-fill").after('<div class="table__column--width-small text-center">Level</div>');
		$(parent).find(".table__rows .table__column--width-fill").after('<div class="table__column--width-small text-center table__column-level"></div>');
	}
	if(SHOW_TYPE && SHOW_LEVEL)
		$(parent).find(".table__column--width-small").css("width", 0); // remove responsive column width, to gain more spaces
	//process each giveaway
	$(parent).find(".table__row-outer-wrap").each(function(index, element){
		if($(element).find("input").length > 0 || PROCESS_ENDED_GA){ //check if giveaway is still running. ended giveaways don't have remove button.
			var GiveawayID = $(element).find(".table__column__heading")[0].href.split("/")[4];
			var Giveaway_data = $.grep(CachedData, function(e){ return e.id == GiveawayID; });
			if(Giveaway_data.length === 0)// if no data saved
				GetGiveawayData(element);
			else //if giveaway data is already saved
				ShowGiveawayData(element, Giveaway_data[0]);
		}
	});
}

function GetGiveawayData(element){
	var GiveawayID = $(element).find(".table__column__heading")[0].href.split("/")[4];
	GM_xmlhttpRequest({
		method: "GET",
		timeout: 10000,
		url: "/giveaway/" + GiveawayID + "/",
		onload: function(result)
		{
			var page = result.responseText;

			var point = $(page).find(".featured__heading__small");
			if(point.length > 0){
				point = point[point.length-1].textContent.replace("(", "").replace(")", "").replace("P", ""); //only retrieve point value

				var creator = $(page).find(".featured__column--width-fill.text-right a").text();

				var level = $(page).find(".featured__column--contributor-level").text().replace("Level ", "").replace("+", "");
				if(level === "") level = 0;

				var type;
				var group = $(page).find(".featured__column--group").length > 0;
				var wl = $(page).find(".featured__column--whitelist").length > 0;
				var invite = $(page).find(".featured__column--invite-only").length > 0;
				if(group && wl)
					type = "WL+Group";
				else if(group)
					type = "Group";
				else if(wl)
					type = "Whitelist";
				else if(invite)
					type = "Invite Only";
				else
					type = "Public";

				var Giveaway_data = {id: GiveawayID, point: point, creator: creator, level: level, type: type};
				ShowGiveawayData(element, Giveaway_data);
				CachedData.push(Giveaway_data);
				GM_setValue("cache", JSON.stringify(CachedData));
				GM_setValue("lastchecked", Date.now());
			}
			else // giveaway deleted or user blacklisted or user not group member anymore
				console.log("Unable to get data from www.steamgifts.com/giveaway/" + GiveawayID + "/");
		}
	});
}

function ShowGiveawayData(element, data){
	if(SHOW_POINT){
		var title = $(element).find(".table__column--width-fill p a")[0];
		var text = $(title).text() + " (" + data.point + "P)";
		$(title).text(text);
	}
	if(SHOW_CREATOR){
		var timeleft = $(element).find(".table__column--width-fill p span");
		$(timeleft).after(" by <a class='giveaway__username' href='/user/" + data.creator + "'>" + data.creator + "</a>");
	}
	if(SHOW_LEVEL)
		$(element).find(".table__column-level")[0].innerHTML = data.level;
	if(SHOW_TYPE)
		$(element).find(".table__column-type")[0].innerHTML = data.type;
}