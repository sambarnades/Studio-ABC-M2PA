import type { ModalitePresence } from '$lib/types';

export interface ModaliteInfo {
	id: ModalitePresence;
	label: string;
	description: string;
}

export const MODALITES_PRESENCE: ModaliteInfo[] = [
	{
		id: 'presentiel',
		label: 'Présentiel',
		description: 'En salle, en même temps, au même endroit.'
	},
	{
		id: 'synchrone-distanciel',
		label: 'Synchrone distanciel',
		description: 'Classe virtuelle en direct (BBB, VIA…).'
	},
	{
		id: 'asynchrone-distanciel',
		label: 'Asynchrone distanciel',
		description: 'Travail autonome déposé sur le LMS / ENT (Moodle, ELEA…).'
	},
	{
		id: 'asynchrone-presentiel',
		label: 'Asynchrone présentiel',
		description: 'Travail en atelier en salle, à son rythme (hors temps de parole collectif).'
	}
];

export function modaliteLabel(id: ModalitePresence): string {
	return MODALITES_PRESENCE.find((m) => m.id === id)?.label ?? id;
}
