export type TypeABC =
	| 'acquisition'
	| 'collaboration'
	| 'discussion'
	| 'enquete'
	| 'production'
	| 'pratique';

export type ModalitePresence =
	| 'presentiel'
	| 'synchrone-distanciel'
	| 'asynchrone-distanciel'
	| 'asynchrone-presentiel';

export type Plateforme = 'moodle' | 'google-classroom' | 'apple-classe';

export type Domaine = 'affectif' | 'cognitif' | 'psychomoteur' | 'social';

export interface ObstaclePotentiel {
	id: string;
	domaine: Domaine;
	formulation: string;
	manifestation: string;
}

export interface Cadrage {
	titre: string;
	niveau: string;
	discipline: string;
	nbSeances: number;
	dureeTotaleMin: number | null;
	objectifPedagogique: string;
	objectifApprentissage: string;
	activiteSupport: string;
	prerequis: string;
	criteresReussite: string;
	obstacles: ObstaclePotentiel[];
	modalitesPresence: ModalitePresence[];
	plateformes: Plateforme[];
	effectif: number | null;
	contraintes: string;
}

export interface Activite {
	id: string;
	seance: number;
	ordre: number;
	titre: string;
	description: string;
	typeABC: TypeABC;
	modalitePresence: ModalitePresence;
	outil: string | null;
	dureeMin: number;
}

export interface Sequence {
	id: string;
	createdAt: number;
	updatedAt: number;
	cadrage: Cadrage;
	activites: Activite[];
}

export function nouvelleSequence(): Sequence {
	const now = Date.now();
	return {
		id: crypto.randomUUID(),
		createdAt: now,
		updatedAt: now,
		cadrage: {
			titre: '',
			niveau: '',
			discipline: '',
			nbSeances: 1,
			dureeTotaleMin: null,
			objectifPedagogique: '',
			objectifApprentissage: '',
			activiteSupport: '',
			prerequis: '',
			criteresReussite: '',
			obstacles: [],
			modalitesPresence: ['presentiel'],
			plateformes: ['moodle'],
			effectif: null,
			contraintes: ''
		},
		activites: []
	};
}
