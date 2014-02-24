exports.action = function(data, callback, config, SARAH) {
  if(data.id!="0") {
	  var exec = require('child_process').exec;
	  var process = 'sudo /home/pi/433Utils/RPi_utils/codesend ';
	  var id = data.id.replace('_',' ');
	  switch(id) {
		case 'du salon':
		  if(data.etat=='1') {
			  process+='5510485';
		  } else {
			  process+='5510484';
		  }
		  break;
		case 'du bureau':
		  if(data.etat=='1') {
			  process+='5522773';
		  } else {
			  process+='5522772';
		  }
		  break;
	  }
	  console.log('exec : ' + process);
	  var child = exec(process+";"+process+";"+process,
	  function (error, stdout, stderr) {
		if (error !== null) {
		  console.log('exec error: ' + error);
		  callback({'tts':'Il y a eu une erreur.'});
		} else {
		  if(data.declencheur != "1") {
		    callback({'tts': 'Je me suis occupé de la lumière '+id+'.'});
		  }
		}
	  });
  } else {
	  console.log('info : Detecteur non pris en compte');
  }
}