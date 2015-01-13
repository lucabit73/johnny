#pragma strict
private var v_b : valori_barre;
private var third_p_c_script : ThirdPersonController;
var speed:float;
var stat = new Array ();
private var controller : CharacterController;
private var third_p : GameObject;
private var death:boolean;


function Start () {
	controller = GameObject.Find("3rd Person Controller").GetComponent(CharacterController);
	third_p_c_script = GameObject.Find("3rd Person Controller").GetComponent(ThirdPersonController);
	v_b = GameObject.Find("logica_barre").GetComponent(valori_barre);
	third_p = GameObject.Find("3rd Person Controller");
	death=false;
}

function Update () {
	// death?
	stat[0]=v_b.GetJohnnyStatus()[0];
	
	// max performance?
	stat[1]=v_b.GetJohnnyStatus()[1];
	
	// can do physical activity?
	stat[2]=v_b.GetJohnnyStatus()[2];
	// third_p_c_script.consumo puo essere:
	// 0 se fermo
	// 1 se cammina
	// 2 se corre
	if (third_p_c_script.consumo > 0 && (stat[0] == 0)){
		v_b.ScaleOnTime(speed*third_p_c_script.consumo);
	}

	if (stat[0] == 1){
		controller.enabled=false;
		if (!death){
			third_p.animation.Play("death");
		}
		WaitDeath();
	}
}

function WaitDeath(){
	if (third_p.animation["death"].time>=2.3){
		death=true;
		third_p.animation.enabled=false;
		yield WaitForSeconds (2);
		Application.LoadLevel("main_menu");
	}
}