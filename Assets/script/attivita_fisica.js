#pragma strict

private var activity = false;
private var controller : CharacterController;
var valori_barre : valori_barre;
var camera_movement : camera_movement;
var camera_to_boy : camera_to_boy;
var camera_out_boy : camera_out_boy;
var att_position_x : float;

var fatta =0;

// food percentage decrease
private var food_decr = new float[4];

// performance increase
private var perf_increase = 30;

private var step = 0;

private var temp_x : float;
private var temp_y : float;
private var temp_z : float;
private var start_x: float;
private var start_y: float;
private var start_z: float;

function Start () {
	controller = GetComponent(CharacterController);
	start_x = transform.position.x;
	
	food_decr[0] = PlayerPrefs.GetFloat("physical_act_carb_decr");
	food_decr[1] = PlayerPrefs.GetFloat("physical_act_verd_decr");
	food_decr[2] = PlayerPrefs.GetFloat("physical_act_prot_decr");
	food_decr[3] = PlayerPrefs.GetFloat("physical_act_gras_decr");
}

function Update () {
	if (activity){
		if (step == 0){
			step =1;
			}
		doActivity();		
	}
	else{		
		controller.enabled=true;
		step = 0;
	}
}

// call by 'tasto attivita' object
function start_activity () {				
		activity = !activity;		
		temp_y = transform.position.y;
		temp_z = transform.position.z;
		temp_x = transform.position.x;		
}

function doActivity(){			
	controller.enabled=false;

	// move johnny
	if (step == 1){
		animation.Play("walk_01");
		move();
	}
	
	// camera move
	if (step == 2){
		camera_movement.enabled=false;
		camera_to_boy.enabled=true;
		if (camera_to_boy.end==true){
			step=3;
		}
	}
	
	// physical activity
	if (step == 3){
		camera_to_boy.end=false;
		camera_to_boy.enabled=false;
		Activity();
		if (!fatta){
			valori_barre.SetPerfMax(valori_barre.GetPerfMax()+perf_increase);
			for(var i : int = 0; i < 4; i++){
				valori_barre.SetFoodDown(food_decr[i], i);		
		    }
			fatta=1;
		}
	}
	
	// come back
	if (step == 4){
		animation.Play("walk_01");
		move_back();
		fatta=0;	
	}
	
	// end setting
	if (step == 5){
		camera_movement.enabled=true;
		step=0;
		activity=false;		
	}
}

function move (){
	while(temp_x > att_position_x){							
		transform.eulerAngles = Vector3(0, 270, 0);
		temp_x = temp_x -0.005;
		//transform.position = Vector3(temp_x, temp_y, temp_z);				
		transform.position.x = temp_x;
		yield;
	}
	step = 2;
}

function Activity (){	
	animation.Play("up_01");	
	if (animation["up_01"].time>=2){
		step=4;
		/*transform.position = Vector3(start_x, start_y, start_z);	
		Debug.Log(start_x);
		Debug.Log(start_y);
		Debug.Log(start_z);*/
	}
}
	
function move_back(){
	temp_z = transform.position.z;
	while(temp_x < start_x){							
		transform.eulerAngles = Vector3(0, 90, 0);
		temp_x = temp_x + 0.005;
		transform.position = Vector3(temp_x, temp_y, temp_z);				
		yield;
	}
	step = 5;
}
