#pragma strict
var rect : RectOffset; 
var border:float;
//var rect = RectOffset (0, 10, 0, 10);

function Start () {
	//rect =  RectOffset (10, 10, 10, 10);
}

function Update () {
	//guiTexture.border = RectOffset (0, 1, 0, 0);
	//Debug.Log(guiTexture.border.right);
	Bordo();
}

function Bordo(){
	
	if (guiTexture.pixelInset.width >100){
		guiTexture.border = RectOffset (0, 0, 0, 0);
	}else{
		border = guiTexture.pixelInset.width/2;
		guiTexture.border = RectOffset (border, border, 0, 0);
	}
}