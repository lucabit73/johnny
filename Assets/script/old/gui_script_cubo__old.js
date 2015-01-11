#pragma strict

var dimensione: float;
//var scala_x:float;
var target : GameObject;
var origine_x :float;
var start_x;

function Start () {
//dimensione=0;
//origine_x=0;
}

function Update () {
scaleOnTime();
target.guiTexture.pixelInset=Rect(start_x,0,dimensione,58);
//target.transform.localScale.x = scala_x;
//Debug.Log(target.transform.localScale.x);
}

function OnMouseDown (){
 //target.transform.localScale.x = target.transform.localScale.x+5;
 
 dimensione = dimensione+50;
 Debug.Log("hhhhhhh");
 Debug.Log(target.transform.localScale.x);
}


function scaleOnTime(){
	if (dimensione > 0){
		dimensione = dimensione-1.2;
	}
	start_x = origine_x - dimensione/2;
	return dimensione;
}