#pragma strict

// character
var target : Transform;

var offset_x; 


function Start () {

}

function Update () {
	if (transform.position.x <= -4) {
		transform.LookAt(target);
	    transform.Translate(Vector3.back *0.1);
    }
}