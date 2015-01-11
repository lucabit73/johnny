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

// 0 -> carboidrati
// 1 -> verdure
// 2 -> proteine
// 3 -> grassi
var food_width_perc_ref : float [];
var food_limit_min_perc : float [];
var food_limit_max_perc : float [];
public var food_speed : float [];

//private var carboidrati : GameObject;
//private var verdure : GameObject;
//private var proteine : GameObject;
//private var grassi : GameObject;
private var food_width = new float[4];
private var food_width_perc = new float[4];
private var food_limit_min = new float[4];
private var food_limit_max = new float[4];


private var carboidrati : GameObject;
var carb_width_perc_ref : float;
var carb_limite_min_perc : float = 40;
var carb_limite_max_perc : float = 80;
private var carb_width_perc : float;
private var carb_width : float;
public var carb_speed : float;

private var verdure : GameObject;
var verd_width_perc_ref : float;
private var verd_width_perc : float;
private var verd_width : float;
public var verd_speed : float;

private var proteine : GameObject;
var prot_width_perc_ref : float;
var prot_limite_min_perc : float = 20;
var prot_limite_max_perc : float = 45;
private var prot_width_perc : float;
private var prot_width : float;
public var prot_speed : float;

private var grassi : GameObject;
var gras_width_perc_ref : float;
var gras_limite_min_perc : float = 10;
var gras_limite_max_perc : float = 25;
private var gras_width_perc : float;
private var gras_width : float;
public var gras_speed : float;


private var performance : GameObject;
private var perf_width : float;
private var perf_width_perc :float;

//var speed : float;
var max_jump_height : float;

private var third_person_controller : GameObject;
private var third_person_controller_script : ThirdPersonController;

private var start_x_carb : float;
private var start_x_verd : float;
private var start_x_prot : float;
private var start_x_gras : float;
private var startt_x = new float[4];

private var ricarica_carb : float = 0;
private var ricarica_verd : float = 0;
private var ricarica_prot : float = 0;
private var ricarica_gras : float = 0;

private var carb_limite_min : float;
private var carb_limite_max : float;

private var prot_limite_min : float;
private var prot_limite_max : float;

private var gras_limite_min : float;
private var gras_limite_max : float;


//per adesso il limite è nello script luce attaccato alla luce
private var verd_limite_min_perc : float = 33;
private var verd_limite_min : float;

// Valori in proporzione dei contributi, totale = 1, sono fissi
private var perf_carb : float = 0.3;
private var perf_prot : float = 0.3;
private var perf_gras : float = 0.3;

// Valori che cambiano a seconda del perf_max_value
private var peso_carb : float;
private var peso_prot : float;
private var peso_gras : float;


// Valori in pixel che cambiano a seconda delle barre alimenti
private var contributo_carb : float;
private var contributo_prot : float;
private var contributo_gras : float;

var stat = new Array ();

//var thirdPerson : ThirdPersonController;


function Start () {
	PlayerPrefs.SetString("collision", ""); 
	
	carboidrati = GameObject.Find("barra_carboidrati");
	verdure = GameObject.Find("barra_verdure");
	proteine = GameObject.Find("barra_proteine");
	grassi = GameObject.Find("barra_grassi");
	performance = GameObject.Find("barra_prestazioni");
	
	bar_max_width = bar_max_perc*Screen.width/100;
	bar_height = bar_height_perc*Screen.height/100;
	perf_height = perf_height_perc*Screen.height/100;
	perf_max_width = perf_max_perc*Screen.width/100;
	
	bar_x_offset = bar_x_offset_perc*Screen.width/100;
	bar_y_offset = bar_y_offset_perc*Screen.height/100;
	bar_x_real_offset = bar_max_width/2+bar_x_offset;
	
	perf_x_offset = perf_x_offset_perc*Screen.width/100;
	perf_y_offset = perf_y_offset_perc*Screen.height/100;
	
	carb_limite_min = carb_limite_min_perc*bar_max_width/100;
	carb_limite_max = carb_limite_max_perc*bar_max_width/100;
	prot_limite_min = prot_limite_min_perc*bar_max_width/100;
	prot_limite_max = prot_limite_max_perc*bar_max_width/100;
	gras_limite_min = gras_limite_min_perc*bar_max_width/100;
	gras_limite_max = gras_limite_max_perc*bar_max_width/100;	
	verd_limite_min = verd_limite_min_perc*bar_max_width/100;
	
	carb_width_perc = carb_width_perc_ref;
	verd_width_perc = verd_width_perc_ref;
	prot_width_perc = prot_width_perc_ref;
	gras_width_perc = gras_width_perc_ref;
	
	carb_width = carb_width_perc*bar_max_width/100;
	prot_width = prot_width_perc*bar_max_width/100;
	verd_width = verd_width_perc*bar_max_width/100;
	gras_width = gras_width_perc*bar_max_width/100;
	
	// prende l'oggetto solo se sono in gioco
	// nello schermo di fine livello non assegna la variabile
	if (GameObject.Find("3rd Person Controller")){	
		third_person_controller = GameObject.Find("3rd Person Controller");
		third_person_controller_script = third_person_controller.GetComponent(ThirdPersonController);
	}
	
	start_x_carb = bar_x_real_offset - carb_width/2;
	start_x_verd = bar_x_real_offset - verd_width/2;
	start_x_prot = bar_x_real_offset - prot_width/2;
	start_x_gras = bar_x_real_offset - gras_width/2;
	
	// setta il valore iniziale di performance
	SetPerfMax (perf_start_value);
	
	ScaleOnTime(1);
	
	
}

function Update () {
	//queste qua si possono togliere una volta fissati i valori di riferimento
	//serve dichiararle qui per cambiarle da inspector
	bar_max_width = bar_max_perc*Screen.width/100;
	bar_height = bar_height_perc*Screen.height/100;
	perf_height = perf_height_perc*Screen.height/100;
	perf_max_width = perf_max_perc*Screen.width/100;
	
	//queste van lasciate
	bar_x_offset = bar_x_offset_perc*Screen.width/100;
	bar_y_offset = bar_y_offset_perc*Screen.height/100;
	bar_x_real_offset = bar_max_width/2+bar_x_offset;
	
	//forse anche queste si posson toglire da update
	perf_x_offset = perf_x_offset_perc*Screen.width/100;
	perf_y_offset = perf_y_offset_perc*Screen.height/100;
	
	if (ricarica_verd > 0 || ricarica_verd < 0){
		aumentaBarraVerd(ricarica_verd);
		ricarica_verd = 0;
	}
	if (ricarica_carb > 0 || ricarica_carb < 0){
		aumentaBarraCarb(ricarica_carb);
		ricarica_carb = 0;
	}
	if (ricarica_prot > 0 || ricarica_prot < 0){
		aumentaBarraProt(ricarica_prot);
		ricarica_prot = 0;
	}
	if (ricarica_gras > 0 || ricarica_gras < 0){
		aumentaBarraGras(ricarica_gras);
		ricarica_gras = 0;
	}

	modificaPrestazioni();
	
	WriteBar();
	
}

function ScaleOnTime(speed : float){
	// update food-bar-value and dimension, width speed value
	// invoked by controlli.js in game play and controllo_pir.js during score count

	// all computation in pixel

	if (carb_width_perc > 0){
		 carb_width_perc = carb_width_perc-speed*carb_speed;
	}else{carb_width_perc=0;}
	carb_width = carb_width_perc*bar_max_width/100;
 	start_x_carb = bar_x_real_offset - carb_width/2;
	
	if (verd_width_perc > 0){
		 verd_width_perc = verd_width_perc-speed*verd_speed;
	}else{verd_width_perc=0;}
	verd_width = verd_width_perc*bar_max_width/100;
	start_x_verd = bar_x_real_offset - verd_width/2;
	
	if (prot_width_perc > 0){
		if (gras_width_perc>0){
		 	prot_width_perc = prot_width_perc-speed*prot_speed;
		 }
		 if (gras_width_perc==0 && carb_width_perc==0){
		 	prot_width_perc = prot_width_perc-speed*prot_speed*10;
		 }
	}else{prot_width_perc=0;}
	prot_width = prot_width_perc*bar_max_width/100;
	start_x_prot = bar_x_real_offset - prot_width/2;
	
	if (gras_width_perc > 0){
		if (carb_width_perc>0){
		 	gras_width_perc = gras_width_perc-speed*gras_speed;
		 } else {
		 	gras_width_perc = gras_width_perc-speed*gras_speed*10;
		 }
	}else{gras_width_perc=0;}
	gras_width = gras_width_perc*bar_max_width/100;
	start_x_gras = bar_x_real_offset - gras_width/2;
}

function modificaPrestazioni (){

	// all computation in pixel

	//situazione standard
	if (carb_width>carb_limite_min && carb_width<carb_limite_max){
		contributo_carb = peso_carb;
	}
	if (prot_width>prot_limite_min && prot_width<prot_limite_max){
		contributo_prot = peso_prot;
	}
	if (gras_width>gras_limite_min && gras_width<gras_limite_max){
		contributo_gras = peso_gras;
	}
	
	//situazione sotto limite, proporzionalità diretta
	if (carb_width<carb_limite_min){
		contributo_carb = carb_width*(peso_carb/carb_limite_min);
	}
	if (prot_width<prot_limite_min){
		contributo_prot = prot_width*(peso_prot/prot_limite_min);
	}
	if (gras_width<gras_limite_min){
		contributo_gras = gras_width*(peso_gras/gras_limite_min);
	}
	
	//situazione sopra limite, proporzionalità inversa
	if (carb_width>carb_limite_max){
		contributo_carb = (carb_limite_max*peso_carb)/(carb_width*(1+((((carb_limite_max*peso_carb)/perf_max_width)-1)/(perf_max_width-carb_limite_max)*(carb_width-carb_limite_max))));
	}
	if (prot_width>prot_limite_max){
		contributo_prot = (prot_limite_max*peso_prot)/(prot_width*(1+((((prot_limite_max*peso_prot)/perf_max_width)-1)/(perf_max_width-prot_limite_max)*(prot_width-prot_limite_max))));
	}
	if (gras_width>gras_limite_max){
		contributo_gras = (gras_limite_max*peso_gras)/(gras_width*(1+((((gras_limite_max*peso_gras)/perf_max_width)-1)/(perf_max_width-gras_limite_max)*(gras_width-gras_limite_max))));
	}
	
	perf_width = contributo_carb+contributo_prot+contributo_gras;
	perf_width_perc = 100*perf_width/perf_max_width;
	
	if (GameObject.Find("3rd Person Controller")){
		// Cambia altezza salto in base a lunghezza barra
		third_person_controller_script.jumpHeight = max_jump_height*perf_width_perc/100;
	}
}

// ----------------------------------------------------------
function aumentaBarraVerd(val :float){
	Debug.Log(val);
	var speed : float = 0.5;
	if (val<0){
		speed = -speed;
	}
	// val è l'ammontare, in % della ricarica
	// 0.5 rappresenta la velocità, cambiare tutti e due i valori!!!!
	for ( var i :float =0; i<=(Mathf.Abs(val)); i += 0.5){
		verd_width_perc = verd_width_perc + speed;
		verd_width = verd_width_perc*bar_max_width/100;
		start_x_verd = bar_x_real_offset - verd_width/2;
		WriteBar();
		yield;
	}
}

function aumentaBarraCarb(val :float){
	//Debug.Log(val);
	var speed : float = 0.5;
	if (val<0){
		speed = -speed;
	}
	// val è l'ammontare, in % della ricarica
	// 0.5 rappresenta la velocità, cambiare tutti e due i valori!!!!
	for ( var i :float =0; i<=(Mathf.Abs(val)); i += 0.5){
		carb_width_perc = carb_width_perc + speed;
		carb_width = carb_width_perc*bar_max_width/100;
		start_x_carb = bar_x_real_offset - carb_width/2;
		WriteBar();
		yield;
	}
}

function aumentaBarraProt(val :float){
	Debug.Log(val);
	var speed : float = 0.5;
	if (val<0){
		speed = -speed;
	}
	// val è l'ammontare, in % della ricarica
	// 0.5 rappresenta la velocità, cambiare tutti e due i valori!!!!
	for ( var i :float =0; i<=(Mathf.Abs(val)); i += 0.5){
		prot_width_perc = prot_width_perc + speed;
		prot_width = prot_width_perc*bar_max_width/100;
		start_x_prot = bar_x_real_offset - prot_width/2;
		WriteBar();
		yield;
	}
}

function aumentaBarraGras(val :float){
	var speed : float = 0.5;
	if (val<0){
		speed = -speed;
	}
	// val è l'ammontare, in % della ricarica
	// 0.5 rappresenta la velocità, cambiare tutti e due i valori!!!!
	for ( var i :float =0; i<=(Mathf.Abs(val)); i += 0.5){
		gras_width_perc = gras_width_perc + speed;
		gras_width = gras_width_perc*bar_max_width/100;
		start_x_gras = bar_x_real_offset - gras_width/2;
		WriteBar();
		yield;
	}
}


// ----------------------------------------------------------

// GetVerdWidth () ritorna la % di alimento
// SetVerdUp (val) aumenta la % di alimento di val
// SetVerdDown (val) diminuisce la % di alimento di val

function GetVerdWidth (){
	return (verd_width_perc);
}
function SetVerdWidth (val:float){
	verd_width_perc = val;
}

function SetVerdUp (val : float) {
	//se con la ricarica supera il 100%
	if ((verd_width_perc+val)>100){
		//Debug.Log("SUPERATO DI "+(verd_width_perc+val-100));
		ricarica_verd = 100-verd_width_perc;
		// plus rappresenta la quantità che va sopra 100
		//plus = verd_width_perc+val-100;
	}
	else {ricarica_verd = val;}
}
function SetVerdDown (val : float) {
	//se con la ricarica va sotto zero
	if ((verd_width_perc-val)<0){
		ricarica_verd = -verd_width_perc;
	}
	else {ricarica_verd = -val;}
}
//------------------------------------
function GetCarbWidth (){
	return (carb_width_perc);
}

function SetCarbWidth (val:float){
	carb_width_perc = val;
}

function SetCarbUp (val : float) {
	if ((carb_width_perc+val)>100){
		ricarica_carb = 100-carb_width_perc;
		SetGrasUp ((carb_width_perc+val-100)/4);
	}
	else {ricarica_carb = val;}
}
function SetCarbDown (val : float) {
	if ((carb_width_perc-val)<0){
		ricarica_carb = -carb_width_perc;
	}
	else {ricarica_carb = -val;}	
}

//------------------------------------
function GetProtWidth (){
	return (prot_width_perc);
}

function SetProtWidth (val:float){
	prot_width_perc = val;
}

function SetProtUp (val : float) {
	if ((prot_width_perc+val)>100){
		ricarica_prot = 100-prot_width_perc;
	}
	else {ricarica_prot = val;}
}
function SetProtDown (val : float) {
	if ((prot_width_perc-val)<0){
		ricarica_prot = -prot_width_perc;
	}
	else {ricarica_prot = -val;}	
}
/*
function SetProtWidth (val : float) {
	prot_width_perc = val;
}
*/

//------------------------------------
function GetGrasWidth (){
	return (gras_width_perc);
}

function SetGrasWidth (val:float){
	gras_width_perc = val;
}

function SetGrasUp (val : float) {
	if ((gras_width_perc+val)>100){
		ricarica_gras = 100-gras_width_perc;
	}
	else {ricarica_gras = val;}
}
function SetGrasDown (val : float) {
	if ((gras_width_perc-val)<0){
		ricarica_gras = -gras_width_perc;
	}
	else {ricarica_gras = -val;}	
}
//------------------------------------
//------------------------------------

// setta il massimo valore di performance a val
function SetPerfMax (val : float) {
	perf_max_value = val;
	peso_carb = perf_max_value/100*perf_carb*perf_max_width;
	peso_prot = perf_max_value/100*perf_prot*perf_max_width;
	peso_gras = perf_max_value/100*perf_gras*perf_max_width;
}

// restituisce il valore della performance massima
function GetPerfMax () {
	return (perf_max_value);
}

//restituisce il valore istantaneo della performance
function GetPerf(){
	return (perf_width_perc);
}

function SetPerf (val:float){
	perf_width_perc = val;
}


// restituisce lo stato di johnny
function GetJohnnyStatus(){
	
	// [0]-> death?
	// [1]-> max performance?
	// [2]-> can do physical activity?
	if (GetProtWidth()<=0 || (GetGrasWidth()<=0 && GetCarbWidth()<=0)){
		stat[0] =1;
	}else {stat[0] =0;}
	
	if (GetPerf() == GetPerfMax()){
		stat[1]=1;
	}else {stat[1] =0;}
	
	if (GetProtWidth()>10*2 && GetCarbWidth()>15*2 && GetGrasWidth()>5*2 && GetVerdWidth()>10*2){
		stat[2]=1;
	}else {stat[2] =0;}
	return (stat);
}

function WriteBar () {
	//disegna le barre
	//il valore di 10(in pixel!!) serve per lasciare un minimo di barra quando è finita l'energia
	carboidrati.guiTexture.pixelInset=Rect(start_x_carb,bar_y_offset,carb_width+10,bar_height);
	verdure.guiTexture.pixelInset=Rect(start_x_verd,bar_y_offset+bar_height+bar_space,verd_width+10,bar_height);
	proteine.guiTexture.pixelInset=Rect(start_x_prot,bar_y_offset+(bar_height+bar_space)*2,prot_width+10,bar_height);
 	grassi.guiTexture.pixelInset=Rect(start_x_gras,bar_y_offset+(bar_height+bar_space)*3,gras_width+10,bar_height);
 	
 	if (GameObject.Find("barra_prestazioni")){
 		performance.guiTexture.pixelInset=Rect(perf_x_offset,perf_y_offset,perf_width+10,perf_height);
 	}
}
