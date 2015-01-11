#pragma strict
var play: boolean;
function Start () {
	play=false;
}

function Update () {
	if (play){
		Play_sound();
		play=false;
	}
}
function Play_sound(){
	audio.volume=1;
	audio.Play();
}