#pragma strict
private var position_x : float;
private var position_y : float;
private var camera_mov : camera_movement;

// character
var target : Transform;
var end : boolean;

function Start () {
	camera_mov = GetComponent("camera_movement");
	
	position_x = transform.position.x;
	position_y = transform.position.y;
	end=false;
	transform.position.x =  target.position.x -(camera_mov.offset_x);
	transform.position.y =  target.position.y -(camera_mov.offset_y);
	transform.LookAt(target);
	transform.position.y =  target.position.y +(camera_mov.offset_posY);
}



function Update () {

	if (transform.position.y >= position_y-1.6){
		// first step, go down
		transform.Translate(Vector3.down *0.1);
	}else{
		// second step, approach
		if (transform.position.x <= (position_x+4)) {
		    transform.Translate(Vector3.forward *0.1);
		    camera.fieldOfView = 46;
	    }
	    else{
	    	
	    	end=true;
	    }
    }
}