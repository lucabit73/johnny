#pragma strict
var x_width:float;
private var x_width_pix:float;
var y_width:float;
private var y_width_pix:float;
var x_pos:float;
private var x_pos_pix:float;
var y_pos:float;
private var y_pos_pix:float;

private var attivita_fisica_js : attivita_fisica;
private var v_b : valori_barre;

function Start () {
	attivita_fisica_js = GameObject.Find("3rd Person Controller").GetComponent(attivita_fisica);
	v_b = GameObject.Find("logica_barre").GetComponent(valori_barre);
	x_width_pix = x_width*Screen.width/100;
	y_width_pix = y_width*Screen.height/100;
	x_pos_pix = x_pos*Screen.width/100;
	y_pos_pix = y_pos*Screen.height/100;
}

function Update () {
	attivita_fisica_js = GameObject.Find("3rd Person Controller").GetComponent(attivita_fisica);
	x_width_pix = x_width*Screen.width/100;
	y_width_pix = y_width*Screen.height/100;
	x_pos_pix = x_pos*Screen.width/100;
	y_pos_pix = y_pos*Screen.height/100;
	guiTexture.pixelInset=Rect(x_pos_pix,y_pos_pix,x_width_pix,y_width_pix);
	
}


function OnMouseDown(){
	Debug.Log(v_b.GetJohnnyStatus());
	if (v_b.GetJohnnyStatus()[2] == 1){
		attivita_fisica_js.start_activity();
	}
}