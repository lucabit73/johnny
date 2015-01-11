#pragma strict

// trascinare personaggio
var target : Transform;

var offset_x; 


function Start () {

}

function Update () {
	//move();
	if (transform.position.x <= -4) {
		transform.LookAt(target);
	    transform.Translate(Vector3.back *0.1);
    }
}