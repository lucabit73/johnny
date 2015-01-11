#pragma strict

var dimensione: float;
var target : GameObject;
var origine_x : float;
var start_x;
var y:float;
var speed:float;
var barra_target: GameObject;
var omino: GameObject;
var destroy:GameObject;

function Start () {
//dimensione=100;
//origine_x=200.0;
//jump_script=omino.GetComponent("ThirdPersonController");
}

function Update () {
	scaleOnTime();
	target.guiTexture.pixelInset=Rect(start_x,y,dimensione,30);
}

/*function OnMouseDown (){
	if (dimensione<210){
		dimensione = dimensione+40;
	}else{
		barra_target.guiTexture.pixelInset.width=barra_target.guiTexture.pixelInset.width-10;
		
	}
}*/


function OnCollisionEnter (collision : Collision){
	
	Debug.Log("preso");
	if (dimensione<210){
		dimensione = dimensione+40;
	}else{
		barra_target.guiTexture.pixelInset.width=barra_target.guiTexture.pixelInset.width-10;
		
	}
	Destroy(destroy);
}


function scaleOnTime(){
	if (dimensione > 0){
		dimensione = dimensione-0.3*speed;
	}
	start_x = origine_x - dimensione/2;
	return dimensione;
}