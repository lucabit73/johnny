// manage food infobox
// GUItexture activated by grassi_script
// object destroyed after first collision
#pragma strict
private var v_b : valori_barre;
private var gras : GameObject;
private var ref_x : float;
private var ref_y : float;

function Start () {
	guiTexture.enabled = false; 
	v_b = GameObject.Find("logica_barre").GetComponent(valori_barre);
	gras = GameObject.Find("barra_grassi");
	ref_x = gras.guiTexture.pixelInset.x;
	ref_y = gras.guiTexture.pixelInset.y;
}

function Update () {
	// game paused by grassi_script
	if (Time.timeScale == 0 && PlayerPrefs.GetString("collision") == "gras"){
		if (v_b.enabled == true){
			ref_x = gras.guiTexture.pixelInset.x;
			ref_y = gras.guiTexture.pixelInset.y;
			v_b.enabled = false;
		}
		// food bar move
		if (gras.guiTexture.pixelInset.y >= 10*Screen.height/100){
			gras.guiTexture.pixelInset=Rect(
				gras.guiTexture.pixelInset.x + (-25*(30*Screen.width/100-ref_x)/(5*Screen.height/100-ref_y)),
				gras.guiTexture.pixelInset.y -25,
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

