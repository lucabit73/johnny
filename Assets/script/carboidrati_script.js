﻿// increase food bar value and destroy object
// for the first time you take a food, pause game and show infobox texture,
// then the infobox control is switched to show_hide_****.js
#pragma strict

private var barra_target : GameObject;
private var logica_barre : valori_barre;
private var audio_coll : audio_collision;

function Start () {
	barra_target = GameObject.Find("logica_barre");
	logica_barre = barra_target.GetComponent(valori_barre);
	audio_coll = GameObject.Find("audio collision").GetComponent(audio_collision);
}

function Update () {

}

function OnCollisionEnter (collision : Collision){
	PlayerPrefs.SetString("collision", "carb");
	logica_barre.SetFoodUp(15, 0);
	audio_coll.play=true;
	if(GameObject.Find("carboidrati_instruction")){
		gameObject.Find("carboidrati_instruction").guiTexture.enabled = true;
		Time.timeScale = 0;
	}
	
	Destroy (gameObject);	
}