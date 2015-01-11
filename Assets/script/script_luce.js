#pragma strict

var script_verdure : valori_barre;

function Start () {

}

function Update () {
	if (script_verdure.GetFoodWidth(1) < 30){
		light.intensity = script_verdure.GetFoodWidth(1)/1 *0.8/30;
	}
}