#pragma strict

private var currentRatio : float;
var m_NativeRatio : float;

function Start () {

	//var m_NativeRatio = 1.3333333333333;
 
	currentRatio = (Screen.width+0.0) / Screen.height;
	transform.localScale.x *= m_NativeRatio / currentRatio;

}

function Update () {

}

function OnMouseDown(){
	//Debug.Log("ljansflnalfnlavsnlainlfhlkjhn");
	Application.Quit();
}