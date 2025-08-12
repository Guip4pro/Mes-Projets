

		const dosCartes = document.querySelectorAll(".dos-carte");
		
			// Mon tableau avant que je ne le mélange
		const img_non_Alea = [
			"../IMAGES/Pokemon_001.png",
			"../IMAGES/Pokemon_002.png",
			"../IMAGES/Pokemon_003.png",
			"../IMAGES/Pokemon_004.png",
			"../IMAGES/Pokemon_005.png",
			"../IMAGES/Pokemon_006.png",
			"../IMAGES/Pokemon_007.png",
			"../IMAGES/Pokemon_008.png",
			"../IMAGES/Pokemon_001.png",
			"../IMAGES/Pokemon_002.png",
			"../IMAGES/Pokemon_003.png",
			"../IMAGES/Pokemon_004.png",
			"../IMAGES/Pokemon_005.png",
			"../IMAGES/Pokemon_006.png",
			"../IMAGES/Pokemon_007.png",
			"../IMAGES/Pokemon_008.png"
		];
		console.log(img_non_Alea[-1]);

		function melanger(tab) {
			for (let i = tab.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[tab[i], tab[j]] = [tab[j], tab[i]];
			}
			return tab;
		}

		melanger(img_non_Alea);


			// Elles représentent mes 1er et 2ème cliques
		var click1 = 0;
		var click2 = 0;
		
		var score = 0;
		var verrouillage = false;	// Elle va indiquer si j'empêche les cliques ou non



		affichImg5s();

			// Fonction pour afficher 5s les cartes au début du jeu
		function affichImg5s() {
			for (let i = 0; i < 16; i++) {
				dosCartes[i].src = img_non_Alea[i];
				dosCartes[i].classList.add('no-pointer');	// Je désactive le curseur main
			}

			setTimeout(function() {
				for (let i = 0; i < 16; i++) {
					dosCartes[i].src = "../IMAGES/Pokemon_Dos.png";
					dosCartes[i].classList.remove('no-pointer');	// Je réactive le curseur main
				}
				initialiserJeu(); }, 5000);
		}

		// L'égalité faible (==) fais une conversion avant (5 == '5'), alors que l'égalité stricte (===) ne fais aps de conversion avant(5 != '5')
		// elle renverra toujours false si les types des deux valeurs comparées sont différents)3 août 2023

		function initialiserJeu() {
			for (let i = 0; i < 16; i++) {
				let carte = dosCartes[i];
				
				carte.addEventListener("click", () => {
					let continuer = true;

						// Je vérifie si le jeu est verrouillé
					if (verrouillage) {
						continuer = false;
					}

						// Je vérifie si on a cliqué sur la même carte deux fois
					if (carte === click1) {
						continuer = false;
					}

					if (continuer) {
						carte.src = img_non_Alea[i];	// Je retourne la carte
						carte.classList.add('no-pointer');

						if (!click1) {	// Si click1 === 0, alors on éxécute le "if", sinon on se réfère au else
							click1 = carte;
						} else {
							click2 = carte;
							verrouillage = true;
							verif();
						}
					}
				});
			}
		}
		
		

			// Va compter chaque paire trouvée
		var nb16Cartes = 0;


		function verif() {
			if (click1.src === click2.src) {
				setTimeout(() => {
					click1.classList.add("cachée");
					click2.classList.add("cachée");
					click1 = 0;
					click2 = 0;
					nb16Cartes += 2;
					score += 1;
					document.getElementById("score").innerText = score;
					verrouillage = false;
					verifFin();

					
				}, 1000); 
			} else {
				setTimeout(() => {
					click1.src = "../IMAGES/Pokemon_Dos.png";
					click2.src = "../IMAGES/Pokemon_Dos.png";
					click1.classList.remove('no-pointer');  // Réactiver le curseur pointeur
					click2.classList.remove('no-pointer');  // Réactiver le curseur pointeur
					click1 = 0;
					click2 = 0;
					verrouillage = false;
					score -= 1;
					document.getElementById("score").innerText = score;
					//verifFin();
				}, 1000);
			}
		}



		function verifFin() {
			if (nb16Cartes === 16) {
				if (score > 0) {
					alert("BRAVO ! Tu as gagné. Ton score est de :  " + score);
				} else if (score < 0) {
					alert("Dommage, tu as perdu, essayes encore ! Ton score est de " + score);
				} else {
					alert("Argh, égalité. Ton score est de 0");
				}
			}
		}

		

		




