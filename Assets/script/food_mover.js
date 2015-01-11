// move food, around its axis and word axis
#pragma strict
var i : float = 0;
function Start () {

}

function Update () {
	//rotate around y axis, velocity 1
	//transform.Rotate(0, 1, 0);
	
	//vector3 function
	transform.Rotate(Vector3.up * 1);
	
	//rotate around world axis, velocity 3
	transform.Rotate(Vector3.up*3, Space.World);
}