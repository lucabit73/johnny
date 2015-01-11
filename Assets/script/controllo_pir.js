#pragma strict

private var food = new float[4];

private var perf : float;
private var food_ref = new float[4];
private var food_tex = new GameObject[4];

// reference value tollerance, for score count
var toll_perc : float[];

private var perf_tex : GameObject;
private var score_tex : GameObject;

private var ref_y : float;
private var max :float;
private var punti : float;
private var step :float = 0;
private var v_b : valori_barre;

function Start () {
	food_tex[0] = GameObject.Find("carb_text");
	food_tex[1] = GameObject.Find("verd_text");
	food_tex[2] = GameObject.Find("prot_text");
	food_tex[3] = GameObject.Find("gras_text");
	
	perf_tex = GameObject.Find("perf_text");
	score_tex = GameObject.Find("punteggio");
			
	v_b = GameObject.Find("logica_barre").GetComponent(valori_barre);

	food[0] = PlayerPrefs.GetFloat("carb_value");
	food[1] = PlayerPrefs.GetFloat("verd_value");
	food[2] = PlayerPrefs.GetFloat("prot_value");
	food[3] = PlayerPrefs.GetFloat("gras_value");
	perf = PlayerPrefs.GetFloat("perf_value");
	
	score_tex.guiText.text ="";
	
	// Per il calcolo dei valori di riferimento:
	// Forse non è una buona idea prendere i valori iniziali..
	// Altra alternativa è fare una media dei limiti..
	/*
	carb_ref = (v_b.carb_limite_min_perc + v_b.carb_limite_max_perc)/2;
	prot_ref = (v_b.prot_limite_min_perc + v_b.prot_limite_max_perc)/2;
	gras_ref = (v_b.gras_limite_min_perc + v_b.gras_limite_max_perc)/2;
	verd_ref = v_b.verd_width_perc_ref+15;
	*/
	for(var i : int = 0; i < 4; i++){
		food_tex[i].guiText.text ="";
		food_ref[i] = v_b.food_width_perc_ref[i];
    }
	ref_y = v_b.bar_y_offset_perc;
}

function Update () {

	if (step==0){
		// draw pyramid with end-level value
		for(var i : int = 0; i < 4; i++){
			v_b.SetFoodWidth(food[i], i);				
	    }
		v_b.SetPerf(perf);
		v_b.ScaleOnTime(1);
		step=1;
	}
	
	if (step==1){
		// move pyramid
		
		// x move
		v_b.bar_x_offset_perc = v_b.bar_x_offset_perc +0.5;
		// y move
		v_b.bar_y_offset_perc = v_b.bar_y_offset_perc +(-0.5*ref_y/50);
		// width increase
		if (v_b.bar_max_perc<=30){
			v_b.bar_max_perc = v_b.bar_max_perc +1;
		}
		// height increase
		if (v_b.bar_height_perc<=10){
			v_b.bar_height_perc = v_b.bar_height_perc +0.1;
		}
		
		v_b.ScaleOnTime(0.001);
		if ((v_b.bar_x_offset_perc + (v_b.bar_max_perc/2)) >= 50){
			step = 2;
		}
	} 
	
	if (step==2){
		// performance-bar move
		v_b.perf_x_offset_perc ++ ;
		v_b.ScaleOnTime(0.001);
		if (v_b.perf_x_offset_perc +(v_b.perf_max_perc/2) >= 50){
			step = 3;
		}
	}
	
	if (step==3){
	
		// score count, update score, add text
		// PROBLEMA: dice che c'è una var locale i, ho dovuto mettere ii
		for(var ii : int = 0; ii < 4; ii++){
			if (food[ii] > food_ref[ii]-toll_perc[ii] && food[ii] < food_ref[ii]+toll_perc[ii]){
				// se non si aggiunge niente la barra rimane fuori linea...
				v_b.SetFoodDown(1, ii);
				food_tex[ii].guiText.text ="Great!! 100 points";
				AddScore(100);
			}
			if (food[ii] > food_ref[ii]+toll_perc[ii]){
				v_b.SetFoodDown(food[ii] - food_ref[ii], ii);
				max = 100-(food_ref[ii] + toll_perc[ii]);
				punti = Mathf.Abs(Mathf.FloorToInt(-(90/max)*(food[ii] - food_ref[ii]) +90));
				food_tex[ii].guiText.text = punti+" points";
				AddScore (punti);
			}
			if (food[ii] < food_ref[ii] - toll_perc[ii]){
				v_b.SetFoodUp(food_ref[ii] - food[ii], ii);
				max = food_ref[ii] - toll_perc[ii];
				punti = Mathf.Abs(Mathf.FloorToInt(-(90/max)*(food_ref[ii] - food[ii]) +90));
				food_tex[ii].guiText.text = punti+" points";
				AddScore (punti);
			}
	    }
		
		step=4;
	}
	if (step==4){
		
	}
	
}

function AddScore (val:float){
	PlayerPrefs.SetFloat("score", val+PlayerPrefs.GetFloat("score"));
	score_tex.guiText.text = PlayerPrefs.GetFloat("score").ToString();
}