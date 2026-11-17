import type { Activite, Cadrage, ModalitePresence, TypeABC } from '$lib/types';
import { MODALITES_PRESENCE } from '$lib/data/modalites-presence';
import { TYPES_ABC } from '$lib/data/types-abc';

export interface Synthese {
	totalMin: number;
	dureeParType: Record<TypeABC, number>;
	dureeParModalite: Record<ModalitePresence, number>;
	nbModalitesUtilisees: number;
	outils: string[];
	typesUtilises: TypeABC[];
	alertes: string[];
}

export function synthese(activites: Activite[], cadrage: Cadrage): Synthese {
	const dureeParType = Object.fromEntries(TYPES_ABC.map((t) => [t.id, 0])) as Record<TypeABC, number>;
	const dureeParModalite = Object.fromEntries(
		MODALITES_PRESENCE.map((m) => [m.id, 0])
	) as Record<ModalitePresence, number>;
	const outils = new Set<string>();
	const typesUtilises = new Set<TypeABC>();
	let totalMin = 0;

	for (const a of activites) {
		totalMin += a.dureeMin;
		dureeParType[a.typeABC] += a.dureeMin;
		dureeParModalite[a.modalitePresence] += a.dureeMin;
		typesUtilises.add(a.typeABC);
		if (a.outil) outils.add(a.outil);
	}

	const alertes: string[] = [];
	if (activites.length === 0) {
		alertes.push('Aucune activité scénarisée pour l\u2019instant.');
	}
	if (activites.length > 0 && dureeParType.collaboration === 0) {
		alertes.push('Aucune activité de collaboration : pensez à une co-construction en groupe.');
	}
	const nbModalitesUtilisees = Object.values(dureeParModalite).filter((d) => d > 0).length;
	if (activites.length > 0 && nbModalitesUtilisees < 2) {
		alertes.push('Une seule modalité de présence utilisée : la pluralité des modalités favorise l\u2019accès (CUE-A).');
	}
	if (activites.length > 0 && outils.size === 0) {
		alertes.push('Aucun outil numérique renseigné.');
	}
	if (cadrage.dureeTotaleMin && totalMin > cadrage.dureeTotaleMin) {
		alertes.push(
			`Durée scénarisée (${totalMin} min) supérieure à la durée prévue au cadrage (${cadrage.dureeTotaleMin} min).`
		);
	}
	const typesManquants = TYPES_ABC.filter((t) => !typesUtilises.has(t.id)).map((t) => t.label);
	if (activites.length > 0 && typesManquants.length > 0) {
		alertes.push(`Types d'apprentissage non utilisés : ${typesManquants.join(', ')}.`);
	}

	return {
		totalMin,
		dureeParType,
		dureeParModalite,
		nbModalitesUtilisees,
		outils: [...outils],
		typesUtilises: [...typesUtilises],
		alertes
	};
}
