export interface BesoinN1 {
	id: string;
	label: string;
	categorie: 'Méta-besoin' | 'S\'engager et persévérer' | 'Apprendre efficacement';
	pistes: string;
}

export const BESOINS_N1: BesoinN1[] = [
	{
		id: 'securisation',
		label: 'Sécurisation',
		categorie: 'Méta-besoin',
		pistes:
				'Organisation spatiale et temporelle stable, routines avec invariants, enseignant·e prévisible dans ses attentes et ses réactions. Prime sur tous les autres besoins.'
	},
	{
		id: 'sens',
		label: 'Donner du sens',
		categorie: "S'engager et persévérer",
		pistes: 'Inscrire la séquence dans un projet pédagogique, contextualiser, expliciter à quoi servent les apprentissages.'
	},
	{
		id: 'competence',
		label: 'Se sentir compétent',
		categorie: "S'engager et persévérer",
		pistes:
				'Objectif explicite et compréhensible, prise en compte des centres d\u2019intérêt, évaluation des prérequis, objectifs intermédiaires.'
	},
	{
		id: 'autonomie-sociale',
		label: 'Autonomie sociale',
		categorie: "S'engager et persévérer",
		pistes:
				'Compétences psychosociales enseignées, règles explicites, attendus des travaux de groupe explicites, demander de l\u2019aide.'
	},
	{
		id: 'acteur',
		label: 'Être acteur',
		categorie: 'Apprendre efficacement',
		pistes: "Laisser des choix, des rôles, des marges de manœuvre dans l'activité."
	},
	{
		id: 'soutien-mnesique',
		label: 'Soutien mnésique',
		categorie: 'Apprendre efficacement',
		pistes: 'Affichages, fiches-outils, traces écrites, reprise des informations utiles à chaque étape.'
	},
	{
		id: 'autonomie-cognitive',
		label: 'Autonomie cognitive',
		categorie: 'Apprendre efficacement',
		pistes: 'Stratégies explicites, planification, auto-vérification, transfert vers de nouvelles situations.'
	},
	{
		id: 'automatiser',
		label: 'Automatiser',
		categorie: 'Apprendre efficacement',
		pistes: 'Entraînement répété avec rétroaction pour ancrer les procédures et libérer la mémoire de travail.'
	}
];
