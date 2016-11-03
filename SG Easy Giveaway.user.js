// ==UserScript==
// @name         SG Easy Giveaway
// @namespace    https://steamcommunity.com/id/Ruphine/
// @version      0.1
// @description  Easy Giveaway
// @author       Ruphine
// @include      *://www.steamgifts.com/*
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      justarchi.net
// @connect      steampowered.com
// @connect      ruphine.esy.es
// ==/UserScript==

/*jshint multistr: true */

var searchbox = "<input type='text' class='EG_textbox js__autocomplete-name' data-autocomplete-do='autocomplete_game' style='width: 70px; margin-right: 5px;' maxlength='5'>";
$(searchbox)
	.insertBefore(".nav__left-container")
	.on("input", function(event){
		$(".EG_box").css("display", $(this).val().length > 0 ? "block" : "none");
	});


myCSS = "\
	.EG_box{\
		width: 500px;\
		height: 300px;\
		position: absolute;\
		top: 40px;\
		display: none\
	}\
";
$("head").append('<style type="text/css">' + myCSS + '</style>');

var searchresult = document.createElement("div");
$(searchresult).addClass("EG_box");
$("nav").append(searchresult);


/*
TODO :
- listen input, load data from giveaway/new, and append to searchresult
- when clicking the game in searchresult, create the giveaway right away, and output the url
	option 1 : redirect to created giveaway
	option 2 : show popup dialong of the url
- close searchresult when input is blank
- add support to userstyle
*/

/*
<div class="js__autocomplete-data" style="opacity: 1;">
	<div class="table">
		<div class="table__rows">
			
				<div data-autocomplete-id="3122" data-autocomplete-name="Bad Rats: the Rats' Revenge" class="is-clickable table__row-outer-wrap table__row-outer-wrap--fade-siblings">
					<div class="table__row-inner-wrap" style="opacity: 1;">
						<div>
							<div class="global__image-outer-wrap global__image-outer-wrap--game-small">
								<div class="global__image-inner-wrap" style="background-image:url(https://steamcdn-a.akamaihd.net/steam/apps/34900/capsule_184x69.jpg);"></div>
							</div>
						</div>
						<div class="table__column--width-fill">
							<p class="table__column__heading">Bad Rats: the Rats' Revenge</p>
							<p><a class="table__column__secondary-link" href="http://store.steampowered.com/app/34900/" rel="nofollow" target="_blank">http://store.steampowered.com/app/34900/</a></p>
						</div>
					</div>
				</div>
				
				<div data-autocomplete-id="11340" data-autocomplete-name="Gravity Badgers" class="is-clickable table__row-outer-wrap table__row-outer-wrap--fade-siblings">
					<div class="table__row-inner-wrap" style="opacity: 0.3;">
						<div>
							<div class="global__image-outer-wrap global__image-outer-wrap--game-small">
								<div class="global__image-inner-wrap" style="background-image:url(https://steamcdn-a.akamaihd.net/steam/apps/267060/capsule_184x69.jpg);"></div>
							</div>
						</div>
						<div class="table__column--width-fill">
							<p class="table__column__heading">Gravity Badgers</p>
							<p><a class="table__column__secondary-link" href="http://store.steampowered.com/app/267060/" rel="nofollow" target="_blank">http://store.steampowered.com/app/267060/</a></p>
						</div>
					</div>
				</div>
				
				<div data-autocomplete-id="1575" data-autocomplete-name="Strong Bad's Cool Game for Attractive People: Season 1" class="is-clickable table__row-outer-wrap table__row-outer-wrap--fade-siblings">
					<div class="table__row-inner-wrap" style="opacity: 0.3;">
						<div>
							<div class="global__image-outer-wrap global__image-outer-wrap--game-small">
								<div class="global__image-inner-wrap" style="background-image:url(https://steamcdn-a.akamaihd.net/steam/apps/8340/capsule_184x69.jpg);"></div>
							</div>
						</div>
						<div class="table__column--width-fill">
							<p class="table__column__heading">Strong Bad's Cool Game for Attractive People: Season 1</p>
							<p><a class="table__column__secondary-link" href="http://store.steampowered.com/app/8340/" rel="nofollow" target="_blank">http://store.steampowered.com/app/8340/</a></p>
						</div>
					</div>
				</div>
				
				<div data-autocomplete-id="12738" data-autocomplete-name="Kill The Bad Guy" class="is-clickable table__row-outer-wrap table__row-outer-wrap--fade-siblings">
					<div class="table__row-inner-wrap" style="opacity: 0.3;">
						<div>
							<div class="global__image-outer-wrap global__image-outer-wrap--game-small">
								<div class="global__image-inner-wrap" style="background-image:url(https://steamcdn-a.akamaihd.net/steam/apps/293940/capsule_184x69.jpg);"></div>
							</div>
						</div>
						<div class="table__column--width-fill">
							<p class="table__column__heading">Kill The Bad Guy</p>
							<p><a class="table__column__secondary-link" href="http://store.steampowered.com/app/293940/" rel="nofollow" target="_blank">http://store.steampowered.com/app/293940/</a></p>
						</div>
					</div>
				</div>
				
				<div data-autocomplete-id="3762755" data-autocomplete-name="BADLAND: Game of the Year Edition" class="is-clickable table__row-outer-wrap table__row-outer-wrap--fade-siblings">
					<div class="table__row-inner-wrap" style="opacity: 0.3;">
						<div>
							<div class="global__image-outer-wrap global__image-outer-wrap--game-small">
								<div class="global__image-inner-wrap" style="background-image:url(https://steamcdn-a.akamaihd.net/steam/apps/269670/capsule_184x69.jpg);"></div>
							</div>
						</div>
						<div class="table__column--width-fill">
							<p class="table__column__heading">BADLAND: Game of the Year Edition</p>
							<p><a class="table__column__secondary-link" href="http://store.steampowered.com/app/269670/" rel="nofollow" target="_blank">http://store.steampowered.com/app/269670/</a></p>
						</div>
					</div>
				</div>
				
		</div>
	</div>
	<div class="pagination pagination--ajax">
		<div class="pagination__results">Displaying <strong>1</strong> to <strong>5</strong> of <strong>52</strong> results</div>
		<div class="pagination__navigation">
			<a data-page-number="1" class="is-selected"><span>1</span></a>
			<a data-page-number="2"><span>2</span></a>
			<a data-page-number="3"><span>3</span></a>
			<a data-page-number="4"><span>4</span></a>
			<a data-page-number="5"><span>5</span></a>
			 ... 
			<a data-page-number="2"><span>Next</span> <i class="fa fa-angle-right"></i></a>
			<a data-page-number="11"><span>Last</span> <i class="fa fa-angle-double-right"></i></a>
		</div>
	</div>
</div>
*/