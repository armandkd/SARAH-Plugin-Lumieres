var lumieres = {
	'du salon': [0, ['5510484', '5510485']],
	'du bureau': [0, ['5522772', '5522773']]
}
var exec = require('child_process').exec;
var process = 'sudo /home/pi/433Utils/RPi_utils/codesend ';

exports.init = function(SARAH){
	console.log('Resetting devices');
	for(id in lumieres) {
		var start = new Date().getTime();
		while((new Date().getTime()- start) < 100) {}
		var cmd = process+lumieres[id][1][0];
		console.log('Sending "'+cmd+'"');
		var child = exec(cmd+';'+cmd+';'+cmd);
	}
}
exports.action = function(data, callback, config, SARAH) {
	var id = data.id.replace('_',' ');
	if(data.action=='get') {
		callback({'tts': lumieres[id][0]});
	} else if (data.action=='set') {
		if (data.id!="0") {
			if ( data.etat=='1' || data.etat=='0') {
				var cmd = process+lumieres[id][1][data.etat];
				console.log('Sending "'+cmd+'"');
				var child = exec(cmd+';'+cmd+';'+cmd,
					function (error, stdout, stderr) {
						if (error !== null) {
							console.log('exec error: ' + error);
							callback({'tts':'Il y a eu une erreur.'});
						} else {
							lumieres[id][0] = data.etat;
							if(data.declencheur != "1") {
								if(lumieres[id][0]==1) {
									callback({'tts': 'J\'ai allumé la lumière '+id+'.'});
								} else {
									callback({'tts': 'J\'ai éteint la lumière '+id+'.'});
								}
							}
						}
					});
			} else {
				console.log('info : Etat non valide ("'+data.etat+'")');
				callback({'tts': 'Etat non valide.'});
			}
		} else {
			console.log('info : Detecteur non pris en compte');
		}
	}
}