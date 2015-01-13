#pragma strict

// bar position
var bar_x_offset_perc:float;
private var bar_x_offset : float;
var bar_y_offset_perc:float;
private var bar_y_offset : float;
var bar_max_perc : float;
private var bar_max_width : float;

private var bar_x_real_offset : float;

var bar_height_perc:float;
private var bar_height : float;
private var bar_space : float =2;

var perf_x_offset_perc:float;
private var perf_x_offset:float;
var perf_y_offset_perc:float;
private var perf_y_offset:float;
var perf_max_perc:float;
private var perf_max_width : float;
var perf_height_perc : float;
private var perf_height : float;

// performance max value
// updated during physical activity
private var perf_max_value : float;
// start performance value, in %
var perf_start_value : float;

// type of food:
// 0 -> carboidrati
// 1 -> verdure
// 2 -> proteine
// 3 -> grassi
var food_width_perc_ref : float [];
var food_limit_min_perc : float [];
var food_limit_max_perc : float [];
public var food_speed : float [];

var phys_act_decr : float[];
var max_jump_height : float;

private var food = new GameObject[4];

private var food_width = new float[4];
private var food_width_perc = new float[4];
private var food_limit_min = new float[4];
private var food_limit_max = new float[4];

private var performance : GameObject;
private var perf_width : float;
private var perf_width_perc :float;

private var third_person_controller : GameObject;
private var third_person_controller_script : ThirdPersonController;

private var start_x = new float[4];
private var ricarica = new float[4];

// Valori in proporzione dei contributi, totale = 1, sono fissi
private var perf_food = new float[4];

// Valori che cambiano a seconda del perf_max_value
private var peso_food = new float[4];

// Valori in pixel che cambiano a seconda delle barre alimenti
private var contributo_food = new float[4];

var stat = new Array ();

//---------------------------------------------------------------

function Start () {
	PlayerPrefs.SetString("collision", ""); 
	PlayerPrefs.SetFloat("physical_act_carb_decr", phys_act_decr[0]); 	
	PlayerPrefs.SetFloat("physical_act_verd_decr", phys_act_decr[1]);
	PlayerPrefs.SetFloat("physical_act_prot_decr", phys_act_decr[2]);
	PlayerPrefs.SetFloat("physical_act_gras_decr", phys_act_decr[3]);
	
	food[0] = GameObject.Find("barra_carboidrati");
	food[1] = GameObject.Find("barra_verdure");
	food[2] = GameObject.Find("barra_proteine");
	food[3] = GameObject.Find("barra_grassi");

	perf_food[0] = 0.3;
	perf_food[2] = 0.3;
	perf_food[3] = 0.3;
	
	performance = GameObject.Find("barra_prestazioni");
	
	positionBar ();
	
	for(var i : int = 0; i < 4; i++)
    {
        food_limit_min[i] = food_limit_min_perc[i]*bar_max_width/100;
        food_limit_max[i] = food_limit_max_perc[i]*bar_max_width/100;
        food_width_perc[i] = food_width_perc_ref[i];
        food_width[i] = food_width_perc[i]*bar_max_width/100;
        start_x[i] = bar_x_real_offset - food_width[i]/2;
    }
	
	// allocate only during game play, not in fine_livello
	if (GameObject.Find("3rd Person Controller")){	
		third_person_controller = GameObject.Find("3rd Person Controller");
		third_person_controller_script = third_person_controller.GetComponent(ThirdPersonController);
	}
	
	SetPerfMax (perf_start_value);
	
	ScaleOnTime(1);
}

function Update () {
	// remove positionBar() from here if you don't want to set bar position during game play
	positionBar ();
	
	for(var i : int = 0; i < 4; i++){
        if (ricarica[i] > 0 || ricarica[i] < 0){
        	aumentaBarra(ricarica[i], i);
			ricarica[i] = 0;
		}
    }
	
	modificaPrestazioni();
	
	WriteBar();
}

function ScaleOnTime(speed : float){
	// update food-bar-value and dimension, width speed value
	// invoked by controlli.js in game play and controllo_pir.js during score count

	// all computation in pixel

	for(var i : int = 0; i < 4; i++){
    	// carboidrati e verdure
    	if (i == 0 || i == 1){
    		if (food_width_perc[i] > 0){
				 food_width_perc[i] = food_width_perc[i]-speed*food_speed[i];
			}else{food_width_perc[i]=0;}
    	}
    	
		// proteine
		if (i == 2){
    		if (food_width_perc[i] > 0){
				if (food_width_perc[3] > 0){
					food_width_perc[i] = food_width_perc[i]-speed*food_speed[i];
				}
 				if (food_width_perc[3] == 0 && food_width_perc[0] == 0){
				 	food_width_perc[i] = food_width_perc[i] - speed * food_speed[i]*10;
				}
			}else{food_width_perc[i]=0;}
    	}
    	
    	// grassi
    	if (i == 3){
    		if (food_width_perc[i] > 0){
				if (food_width_perc[0] > 0){
				 	food_width_perc[i] = food_width_perc[i] - speed * food_speed[i];
				 } else {
				 	food_width_perc[i] = food_width_perc[i] - speed * food_speed[i]*10;
				 }
			}else{food_width_perc[i] = 0;}
    	}
    	
    	food_width[i] = food_width_perc[i] * bar_max_width/100;
 		start_x[i] = bar_x_real_offset - food_width[i] / 2;
    }
}


function modificaPrestazioni (){
	// all computation in pixel
	
	for(var i : int = 0; i < 4; i++){
		// standard situation
		if (food_width[i] > food_limit_min[i] && food_width[i] < food_limit_max[i]){
			contributo_food[i] = peso_food[i];
		}
		
		// below the limit, direct proportionality
		if (food_width[i] < food_limit_min[i]){
			contributo_food[i] = food_width[i] * (peso_food[i] / food_limit_min[i]);
		}
		
		// over the limit, inverse proportionality
		if (food_width[i] > food_limit_max[i]){
			contributo_food[i] = (food_limit_max[i]*peso_food[i])/(food_width[i]*(1+((((food_limit_max[i]*peso_food[i])/perf_max_width)-1)/(perf_max_width-food_limit_max[i])*(food_width[i]-food_limit_max[i]))));
		}
    }
	
	// no verdure contribution
	perf_width = contributo_food[0]+contributo_food[2]+contributo_food[3];
	perf_width_perc = 100*perf_width/perf_max_width;
	
	if (GameObject.Find("3rd Person Controller")){
		third_person_controller_script.jumpHeight = max_jump_height*perf_width_perc/100;
	}
}

function positionBar (){
	bar_max_width = bar_max_perc*Screen.width/100;
	bar_height = bar_height_perc*Screen.height/100;
	perf_height = perf_height_perc*Screen.height/100;
	perf_max_width = perf_max_perc*Screen.width/100;
	
	bar_x_offset = bar_x_offset_perc*Screen.width/100;
	bar_y_offset = bar_y_offset_perc*Screen.height/100;
	bar_x_real_offset = bar_max_width/2+bar_x_offset;
	
	perf_x_offset = perf_x_offset_perc*Screen.width/100;
	perf_y_offset = perf_y_offset_perc*Screen.height/100;
}

// ----------------------------------------------------------

function aumentaBarra(val :float, food :int){
	// val -> percentage of richarge
	// food -> type of food
	var speed : float = 0.5;
	if (val<0){
		speed = -speed;
	}
	for ( var i :float =0; i<= Mathf.Abs(val); i += Mathf.Abs(speed)){
		food_width_perc[food] = food_width_perc[food] + speed;
		food_width[food] = food_width_perc[food] * bar_max_width/100;
		start_x[food] = bar_x_real_offset - food_width[food]/2;
		WriteBar();
		yield;
	}
}

function GetFoodWidth (food :int){
	return (food_width_perc[food]);
}

function SetFoodWidth (val:float, food :int){
	food_width_perc[food] = val;
}

function SetFoodUp (val : float, food :int) {
	if ((food_width_perc[food]+val) > 100){
		ricarica[food] = 100-food_width_perc[food];
	}
	else {ricarica[food] = val;}
}

function SetFoodDown (val : float, food :int) {
	if ((food_width_perc[food]-val) < 0){
		ricarica[food] = - food_width_perc[food];
	}
	else {ricarica[food] = -val;}
}

function SetPerfMax (val : float) {
	perf_max_value = val;
	peso_food[0] = perf_max_value/100*perf_food[0]*perf_max_width;
	peso_food[2] = perf_max_value/100*perf_food[2]*perf_max_width;
	peso_food[3] = perf_max_value/100*perf_food[3]*perf_max_width;
}

function GetPerfMax () {
	return (perf_max_value);
}

function GetPerf(){
	return (perf_width_perc);
}

function SetPerf (val:float){
	perf_width_perc = val;
}

function GetJohnnyStatus(){	
	// [0]-> death?
	// [1]-> max performance?
	// [2]-> can do physical activity?
	
	//if (GetProtWidth()<=0 || (GetGrasWidth()<=0 && GetCarbWidth()<=0)){
	if (GetPerf() <= 0){
		stat[0] =1;
	}else {stat[0] =0;}
	
	if (GetPerf() == GetPerfMax()){
		stat[1]=1;
	}else {stat[1] =0;}
	
	if ( GetFoodWidth(0)>phys_act_decr[0]*1.1 && 
			GetFoodWidth(1)>phys_act_decr[1]*1.1 && 
			GetFoodWidth(2)>phys_act_decr[2]*1.1 && 
			GetFoodWidth(3)>phys_act_decr[3]*1.1 
			){
		stat[2]=1;
	}else {stat[2] =0;}
	return (stat);
}

function WriteBar () {
	// write food & performance bar
	// add 10 pixel in food bar, when energy=0 bar don't disappear
	
	for(var i : int = 0; i < 4; i++){
		food[i].guiTexture.pixelInset=Rect(start_x[i],bar_y_offset+(bar_height+bar_space)*i,food_width[i]+10,bar_height);
    }
    
 	if (GameObject.Find("barra_prestazioni")){
 		performance.guiTexture.pixelInset=Rect(perf_x_offset,perf_y_offset,perf_width+10,perf_height);
 	}
}
