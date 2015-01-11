// manage food infobox
// GUItexture activated by carboidrati_script
// object destroyed after first collision
#pragma strict
private var v_b : valori_barre;
private var carb : GameObject;
private var ref_x : float;
private var ref_y : float;
var x_txt : float;
var y_txt : float;

function Start () {
	guiTexture.enabled = false;
	//guiText.enabled = false;
	v_b = GameObject.Find("logica_barre").GetComponent(valori_barre);
	carb = GameObject.Find("barra_carboidrati");
	ref_x = carb.guiTexture.pixelInset.x;
	ref_y = carb.guiTexture.pixelInset.y;
}

function Update () {
	// game paused by carboidrati_script
	if (Time.timeScale == 0 && PlayerPrefs.GetString("collision") == "carb"){
		if (v_b.enabled == true){
			ref_x = carb.guiTexture.pixelInset.x;
			ref_y = carb.guiTexture.pixelInset.y;
			v_b.enabled = false;
		}
		// food bar move
		if (carb.guiTexture.pixelInset.y >= 10*Screen.height/100){
			carb.guiTexture.pixelInset=Rect(
				carb.guiTexture.pixelInset.x + (-25*(30*Screen.width/100-ref_x)/(5*Screen.height/100-ref_y)),
				carb.guiTexture.pixelInset.y -25,
				30*Screen.width/100,
				10*Screen.height/100
			);
		} else {
			// any-key pressed or mouse button held down, hide info
			//if (Input.GetKeyDown(KeyCode.Minus) || Input.GetKeyDown(KeyCode.KeypadMinus)){
			if (Input.anyKey){
				Time.timeScale = 1;
				v_b.enabled = true;
				guiTexture.enabled = false;
				PlayerPrefs.SetString("collision", ""); 

				Destroy(gameObject);
			}
		}
	}
}
