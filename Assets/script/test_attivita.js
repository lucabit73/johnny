#pragma strict

private var activity = false;
private var controller : CharacterController;
var cam_move : camera_movement;
private var traslazione_kid : Transform;
private var temp_x : float;
private var temp_y : float;
private var temp_z : float;

function Start () {
	controller = GetComponent(CharacterController);	

}


function OnGUI()
{	Debug.Log("PRIMA");
	if(GUI.Button (Rect(10,250,150,50), "I am a Buttoin"))
	{
	Debug.Log("DOPO");
	activity = !activity;
	
	temp_y = transform.position.y;
	temp_z = transform.position.z;
	temp_x = transform.position.x;
	/*transform.position = Vector3(0,0,0);
	transform.Rotate(0, 90, 0);
	controller.enabled = false;*/
	
	}
	
	
}

function Update () {
	//temp_x = transform.position.x;
	if(activity){
			Debug.Log(temp_x);
			
			animation.Play("Walk");
			test();
			/*while(temp_x > -10){							
			//transform.position.x = transform.position.x - 0.0001;
				transform.position = Vector3(temp_x,temp_y, temp_z);
				temp_x = temp_x -0.0001;
			//	yield;
			}*/			
	}
	//Debug.Log(temp_x);
}

function test(){
	while(temp_x > -10){							
			//transform.position.x = transform.position.x - 0.0001;
				transform.eulerAngles = Vector3(0, 270, 0);
				temp_x = temp_x -0.01;
				transform.position = Vector3(temp_x,temp_y, temp_z);				
				yield;
			}
			//animation.Play("");
}


