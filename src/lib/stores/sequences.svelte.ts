import { browser } from '$app/env';
import { nouvelleSequence, type Sequence } from '$lib/types';

const KEY = 'studio-abc-m2pa:sequences:v1';

function load(): Sequence[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? (parsed as Sequence[]) : [];
	} catch {
		return [];
	}
}

export const sequences = $state<Sequence[]>(load());

export function save(): void {
	if (!browser) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(sequences));
	} catch {
		// stockage indisponible : on continue en mémoire
	}
}

export function ajouterSequence(): Sequence {
	const seq = nouvelleSequence();
	sequences.push(seq);
	save();
	return seq;
}

export function dupliquerSequence(id: string): Sequence | null {
	const src = sequences.find((s) => s.id === id);
	if (!src) return null;
	const copy: Sequence = structuredClone(src);
	copy.id = crypto.randomUUID();
	copy.createdAt = Date.now();
	copy.updatedAt = Date.now();
	copy.cadrage.titre = `${copy.cadrage.titre || 'Séquence'} (copie)`;
	sequences.push(copy);
	save();
	return copy;
}

export function supprimerSequence(id: string): void {
	const i = sequences.findIndex((s) => s.id === id);
	if (i !== -1) sequences.splice(i, 1);
	save();
}

export function toucher(seq: Sequence): void {
	seq.updatedAt = Date.now();
	save();
}

export function importerSequence(json: string): Sequence | null {
	try {
		const parsed = JSON.parse(json) as Sequence;
		if (!parsed || typeof parsed !== 'object' || !parsed.cadrage || !Array.isArray(parsed.activites))
			return null;
		parsed.id = crypto.randomUUID();
		parsed.createdAt = Date.now();
		parsed.updatedAt = Date.now();
		sequences.push(parsed);
		save();
		return parsed;
	} catch {
		return null;
	}
}
