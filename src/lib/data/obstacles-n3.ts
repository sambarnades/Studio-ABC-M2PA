import type { Domaine } from '$lib/types';

export interface DomaineInfo {
	id: Domaine;
	label: string;
	description: string;
}

export const DOMAINES: DomaineInfo[] = [
	{
		id: 'affectif',
		label: 'Affectif',
		description: "Sentiment d'insécurité, peur de l'erreur, faible sentiment de compétence, anxiété face à la nouveauté."
	},
	{
		id: 'cognitif',
		label: 'Cognitif',
		description:
			"Mémoire de travail, attention, planification, abstraction, traitement de l'implicite, catégorisation, autorégulation."
	},
	{
		id: 'psychomoteur',
		label: 'Psychomoteur',
		description: 'Coordination motrice, motricité fine, fatigabilité, organisation spatiale, tonus, geste graphique.'
	},
	{
		id: 'social',
		label: 'Social',
		description: "Relation aux autres, repli, difficulté à demander de l'aide, à coopérer, à négocier, à gérer le désaccord."
	}
];

export interface ObstacleRepere {
	label: string;
	domaines: Domaine[];
	besoin: string;
	fonctionAide: string;
	vigilance: string;
}

export const OBSTACLES_REPERES: ObstacleRepere[] = [
	{
		label: "Difficulté d'abstraction ou de conceptualisation",
		domaines: ['cognitif'],
		besoin: 'un appui concret et un allègement de la charge cognitive pour accéder à la conceptualisation',
		fonctionAide: 'manipuler, visualiser, comparer, représenter, verbaliser',
		vigilance:
			"ne pas réduire la tâche à un tri, un coloriage ou un appariement sans conceptualisation"
	},
	{
		label: "Difficulté d'attention soutenue, d'inhibition ou d'autorégulation",
		domaines: ['cognitif', 'affectif'],
		besoin: 'un cadre structuré pour soutenir l\u2019engagement et limiter la dispersion',
		fonctionAide: 'séquencer, rendre visibles les étapes, soutenir le contrôle',
		vigilance: "soutenir l'engagement sans réduire les attendus ni fournir la réponse"
	},
	{
		label: "Difficulté à gérer la frustration, l'erreur, l'attente ou le désaccord",
		domaines: ['affectif', 'social'],
		besoin: 'un cadre relationnel structuré pour rester engagé·e dans la coopération',
		fonctionAide: 'rôles, règles, droit à l\u2019erreur, phrases de désaccord, retour ciblé',
		vigilance: "maintenir l'élève dans le collectif, sans retrait durable de l'apprentissage"
	},
	{
		label: "Difficulté de décodage ou d'accès à l'écrit",
		domaines: ['cognitif'],
		besoin: "un étayage de l'accès à l'écrit pour comprendre le support et la consigne",
		fonctionAide: 'lire, écouter, agrandir, segmenter, rendre lisible',
		vigilance: "donner accès au support sans réaliser l'analyse à la place de l'élève"
	},
	{
		label: "Difficulté à traiter l'implicite, l'incertitude ou les attendus",
		domaines: ['cognitif', 'affectif'],
		besoin: 'de la sécurisation et de l\u2019explicitation pour comprendre ce qui est attendu',
		fonctionAide: 'expliciter, montrer un exemple, stabiliser les critères',
		vigilance: 'rendre la tâche lisible sans donner le contenu de la réponse'
	},
	{
		label: 'Difficulté de planification et de traitement des informations',
		domaines: ['cognitif'],
		besoin: 'un soutien procédural pour organiser les actions, les informations et la vérification',
		fonctionAide: 'planifier, ordonner, cocher, contrôler, revenir à l\u2019étape',
		vigilance: "l'enseignant·e renvoie à l'outil ; il/elle ne fait pas à la place de l'élève"
	},
	{
		label: 'Difficulté de mémoire de travail',
		domaines: ['cognitif'],
		besoin: 'un soutien mnésique pour conserver les informations utiles et vérifier progressivement',
		fonctionAide: 'afficher, mémoriser, récupérer, garder trace',
		vigilance: "alléger progressivement l'aide pour favoriser l'autonomie"
	},
	{
		label: 'Difficulté à verbaliser ou justifier',
		domaines: ['cognitif', 'social'],
		besoin: 'un soutien langagier et procédural pour formaliser la démarche',
		fonctionAide: "banque de mots, amorces, oral enregistré, dictée à l'adulte ou à l'outil",
		vigilance: 'la justification doit rester liée au raisonnement réel de l\u2019élève'
	},
	{
		label: 'Difficulté motrice, praxique ou fatigabilité',
		domaines: ['psychomoteur'],
		besoin: "un support matériel ou numérique adapté pour accéder à la manipulation, l'annotation ou la production",
		fonctionAide: "réduire le coût moteur, permettre l'accès au support, fractionner",
		vigilance: "l'adaptation porte sur l'accès ; l'objectif reste au plus près du commun"
	},
	{
		label: 'Difficulté de production longue, écrite ou orale',
		domaines: ['psychomoteur', 'cognitif'],
		besoin: 'une modalité de production adaptée pour montrer sa compréhension sans surcharge',
		fonctionAide: 'produire autrement : oral, enregistrement, schéma, dictée vocale, tableau',
		vigilance: "ne pas confondre allègement de production et simplification de l'objectif"
	}
];
