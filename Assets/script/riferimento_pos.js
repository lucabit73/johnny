#pragma strict
var x_width:float;
private var x_width_pix:float;
var y_width:float;
private var y_width_pix:float;
var x_pos:float;
private var x_pos_pix:float;
var y_pos:float;
private var y_pos_pix:float;


function Start () {
	x_width_pix = x_width*Screen.width/100;
	y_width_pix = y_width*Screen.height/100;
	x_pos_pix = x_pos*Screen.width/100;
	y_pos_pix = y_pos*Screen.height/100;
}

function Update () {
	x_width_pix = x_width*Screen.width/100;
	y_width_pix = y_width*Screen.height/100;
	x_pos_pix = x_pos*Screen.width/100;
	y_pos_pix = y_pos*Screen.height/100;
	guiTexture.pixelInset=Rect(x_pos_pix,y_pos_pix,x_width_pix,y_width_pix);
	
}