/**
 * Flair Extractor for /r/SchoolIdolFestival
 * Licensed under the MIT License
 * Run in dev tools to get CSS Selectors
 */
var flairs = document.getElementsByClassName('flairoptionpane')[0].getElementsByClassName('flair');
var categorized = [];
var girls = [
	'rin','hanayo','maki',
	'umi','honoka','kotori',
	'eli','nozomi','nico',
	'misc'
];
for (var i = 0; i < flairs.length; i++) {
	var flair = flairs[i];
	var className = flair.classList[1].substr(6);
	
	if (className === 'sheet2') {
		var className = flair.classList[2].substr(6);
	}
	
	var uid = flair.parentNode.id;
	//console.log(className + ' #' + uid);
	
	//sort by girl
	var category = 'misc';
	girls.forEach(function(name) {
		if (className.indexOf(name) > -1) {
			category = name;
		}
	});
	
	// exceptions
	if (className === 'eri') category = 'eli';
	if (className === 'kotorimom') category = 'misc';
	
	if (typeof categorized[category] === 'undefined') {
		categorized[category] = [];
	}
	categorized[category].push({uid: uid, className: className});
}

// Generate CSS Selectors
var output = '';
girls.forEach(function(girl) {
	output += '\r\n';
	output += '/* ' + girl + ' */\r\n';
	categorized[girl].forEach(function(_flair, index) {
		if (index != categorized[girl].length - 1) {
			output += 'ul>li[id="' + _flair.uid + '"], /*' + _flair.className + '*/\r\n';
		} else {
			output += 'ul>li[id="' + _flair.uid + '"]{ /*' + _flair.className + '*/\r\n';
			output += '\t\r\n}\r\n';
		}
	});
});
console.log(output);
