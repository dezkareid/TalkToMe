$(document).on("ready",initialize);

function initialize () {
	chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 

	if(chrome){
		if ('speechSynthesis' in window && 'SpeechRecognition' in window) {
			$("#habla").on("click",habla("Hola amigo, esta voz da miedo"));
			$("#escucha").on("click",escucha);
		}else{
			alert("Tu navegador no puede hablar ni entender lo que dices u.u");
		}
	}else{
		alert("Usa chrome y escucharas una sorpresa");
	}
	
}

function habla (mensaje) {
	
	
	var msg = new SpeechSynthesisUtterance(mensaje);
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 2; //0 to 2
	msg.lang = 'es-MX';
	msg.onend = function(e) {
  		
	};

	window.speechSynthesis.speak(msg);
	
}


function escucha () {
	var recognition = new webkitSpeechRecognition();
	recognition.continuous = false;
	recognition.interimResults = false;
	recognition.lang = "es";
	recognition.onresult = function (event) {

    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
           // insertAtCaret(textAreaID, event.results[i][0].transcript);
           console.log("Tu dijiste: "+event.results[i][0].transcript);
           habla("Tu dijiste: "+event.results[i][0].transcript);
        }
    }
};

recognition.onend = function() { console.log("Termine"); };
recognition.start();

}