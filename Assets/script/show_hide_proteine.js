// manage food infobox
// GUItexture activated by proteine_script
// object destroyed after first collision
#pragma strict
private var v_b : valori_barre;
private var prot : GameObject;
private var ref_x : float;
private var ref_y : float;

function Start () {
	guiTexture.enabled = false; 
	v_b = GameObject.Find("logica_barre").GetComponent(valori_barre);
	prot = GameObject.Find("barra_proteine");
	ref_x = prot.guiTexture.pixelInset.x;
	ref_y = prot.guiTexture.pixelInset.y;
}

function Update () {
	// game paused by proteine_script
	if (Time.timeScale == 0 && PlayerPrefs.GetString("collision") == "prot"){
		if (v_b.enabled == true){
			ref_x = prot.guiTexture.pixelInset.x;
			ref_y = prot.guiTexture.pixelInset.y;
			v_b.enabled = false;
		}
		// food bar move
		if (prot.guiTexture.pixelInset.y >= 10*Screen.height/100){
			prot.guiTexture.pixelInset=Rect(
				prot.guiTexture.pixelInset.x + (-25*(30*Screen.width/100-ref_x)/(5*Screen.height/100-ref_y)),
				prot.guiTexture.pixelInset.y -25,
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
