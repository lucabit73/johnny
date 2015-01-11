#pragma strict

private var v_b : valori_barre;
function Start () {
	v_b = GameObject.Find("logica_barre").GetComponent(valori_barre);
}

function Update () {

}

function OnCollisionEnter (){
	PlayerPrefs.SetFloat("carb_value", v_b.GetFoodWidth(0) );
	PlayerPrefs.SetFloat("verd_value", v_b.GetFoodWidth(1) );
	PlayerPrefs.SetFloat("prot_value", v_b.GetFoodWidth(2) );
	PlayerPrefs.SetFloat("gras_value", v_b.GetFoodWidth(3) );
	PlayerPrefs.SetFloat("perf_value", v_b.GetPerf());
	PlayerPrefs.SetFloat("score", 0);
	
	PlayerPrefs.SetString("livello", "secondo_livello");
	Application.LoadLevel("fine_livello");
}