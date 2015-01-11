#pragma strict


private var scene_name : String;
//private esc_pressed : boolean;


function Start () {
	//esc_pressed = false;

}

function Update () {
	if (Input.GetKeyDown(KeyCode.Escape))
		{ 
			//esc_pressed = true;
			get_level_name();			
		  	Application.LoadLevel("main_menu");
		}

}


function get_level_name()
{
	scene_name = Application.loadedLevelName;

}