#pragma strict

function Start () {

}

function Update () {

}

function OnMouseDown() {

	Application.LoadLevel(PlayerPrefs.GetString("livello"));
}