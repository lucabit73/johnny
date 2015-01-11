#pragma strict
var x : float;
var y: float;
function Start () {

}

function Update () {
	guiText.pixelOffset = Vector2 (x*Screen.width/100, y*Screen.height/100);
}