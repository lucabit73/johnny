#pragma strict

var dimensione: float;
var target : GameObject;
var origine_x : float;
var start_x;
var y:float;
var speed:float;


function Start () {
//dimensione=100;
//origine_x=200.0;
}

function Update () {
	scaleOnTime();
	target.guiTexture.pixelInset=Rect(start_x,y,dimensione,30);
}

function OnMouseDown (){
	dimensione = dimensione+50;
	//Debug.Log(target);
}


function scaleOnTime(){
	if (dimensione > 0){
		dimensione = dimensione-0.3*speed;
	}
	start_x = origine_x - dimensione/2;
	return dimensione;
}