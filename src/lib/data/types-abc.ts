import type { TypeABC } from '$lib/types';

export interface TypeABCInfo {
	id: TypeABC;
	label: string;
	description: string;
	badgeClass: string;
}

export const TYPES_ABC: TypeABCInfo[] = [
	{
		id: 'acquisition',
		label: 'Acquisition',
		description:
			'Lire, regarder, écouter : cours magistral, conférence, livre, podcast, page web, vidéo, démonstration.',
		badgeClass:
			'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800'
	},
	{
		id: 'collaboration',
		label: 'Collaboration',
		description:
			"Co-construire la connaissance : discussion, pratique et production en équipe, rôles répartis.",
		badgeClass:
			'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800'
	},
	{
		id: 'discussion',
		label: 'Discussion',
		description:
			"Formuler ses idées, argumenter, écouter, répondre et remettre en question ses concepts.",
		badgeClass:
			'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950 dark:text-sky-200 dark:border-sky-800'
	},
	{
		id: 'enquete',
		label: 'Enquête',
		description:
			'Explorer, comparer, critiquer des textes, documents et ressources pour développer des concepts.',
		badgeClass:
			'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800'
	},
	{
		id: 'production',
		label: 'Production',
		description:
			"Consolider l'apprentissage par la mise en pratique : compte-rendu, rapport, maquette, vidéo, objet.",
		badgeClass:
			'bg-lime-100 text-lime-900 border-lime-300 dark:bg-lime-950 dark:text-lime-200 dark:border-lime-800'
	},
	{
		id: 'pratique',
		label: 'Pratique / Entraînement',
		description:
			"S'entraîner et utiliser la rétroaction (auto-réflexion, pairs, enseignant, activité) pour progresser.",
		badgeClass:
			'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950 dark:text-violet-200 dark:border-violet-800'
	}
];

export function typeABCInfo(id: TypeABC): TypeABCInfo {
	return TYPES_ABC.find((t) => t.id === id) ?? TYPES_ABC[0];
}
