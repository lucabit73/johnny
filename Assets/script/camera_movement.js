#pragma strict
var offset_x : double;
var offset_y : double;
var offset_posY : double;

function Start () {
	
}

// This complete script can be attached to a camera to make it 
	// continuously point at another object.
	
	// The target variable shows up as a property in the inspector. 
	// Drag another object onto it to make the camera look at it.
	var target : Transform; 
	
// Rotate the camera every frame so it keeps looking at the target 
function Update() {
	//Debug.Log(target.position.z);
	transform.position.z =  target.position.z;
	transform.position.x =  target.position.x -offset_x;
	transform.position.y =  target.position.y -offset_y;
	transform.LookAt(target);
	transform.position.y =  target.position.y +offset_posY;
	camera.fieldOfView = 46;
}