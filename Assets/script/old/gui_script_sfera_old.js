#pragma strict

var target : GameObject;
var cubo_class;
var otherGameObject : GameObject;
function Start () {
	cubo_class = GetComponent("gui_script_cubo");
	otherGameObject = GameObject.Find("cubo");
}

function Update () {

}

function OnMouseDown (){
	//target.transform.localScale.x =target.transform.localScale.x-0.01;
	Debug.Log("cliccato sfera");
	//Debug.Log( cubo_class.dimensione );
	otherGameObject.transform.localScale.y=10;
}