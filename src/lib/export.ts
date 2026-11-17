import type { Sequence } from '$lib/types';
import { TYPES_ABC, typeABCInfo } from '$lib/data/types-abc';
import { MODALITES_PRESENCE, modaliteLabel } from '$lib/data/modalites-presence';
import { synthese } from '$lib/compteurs';

function lignesDepuisTexte(texte: string): string[] {
	return texte
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l.length > 0);
}

export function toMarkdown(seq: Sequence): string {
	const c = seq.cadrage;
	const s = synthese(seq.activites, c);
	const lignes: string[] = [];
	lignes.push(`# ${c.titre || 'Séquence sans titre'}`, '');
	lignes.push('## Cadrage (M2PA)', '');
	if (c.niveau) lignes.push(`- **Niveau** : ${c.niveau}`);
	if (c.discipline) lignes.push(`- **Discipline** : ${c.discipline}`);
	lignes.push(`- **Nombre de séances** : ${c.nbSeances}`);
	if (c.dureeTotaleMin) lignes.push(`- **Durée totale prévue** : ${c.dureeTotaleMin} min`);
	if (c.objectifPedagogique)
		lignes.push(`- **Objectif pédagogique** : ${c.objectifPedagogique}`);
	if (c.objectifApprentissage)
		lignes.push(`- **Objectif d'apprentissage** : ${c.objectifApprentissage}`);
	if (c.activiteSupport) lignes.push(`- **Activité support** : ${c.activiteSupport}`);
	const pr = lignesDepuisTexte(c.prerequis);
	if (pr.length) lignes.push('- **Prérequis** : ' + pr.join(' ; '));
	const cr = lignesDepuisTexte(c.criteresReussite);
	if (cr.length) lignes.push('- **Critères de réussite** : ' + cr.join(' ; '));
	if (c.obstacles.length) {
		lignes.push('', '### Obstacles potentiels anticipés', '');
		for (const o of c.obstacles) {
			lignes.push(`- *${o.domaine}* — ${o.formulation}${o.manifestation ? ` (manifestation : ${o.manifestation})` : ''}`);
		}
	}
	if (c.modalitesPresence.length)
		lignes.push(`- **Modalités de présence** : ${c.modalitesPresence.map(modaliteLabel).join(', ')}`);
	if (c.plateformes.length) lignes.push(`- **Plateforme(s)** : ${c.plateformes.join(', ')}`);
	if (c.effectif) lignes.push(`- **Effectif** : ${c.effectif}`);
	if (c.contraintes) lignes.push(`- **Contraintes / contexte** : ${c.contraintes}`);

	lignes.push('', '## Storyboard ABC Learning Design', '');
	lignes.push('| Séance | Activité | Type ABC LD | Modalité de présence | Outil numérique | Durée (min) |');
	lignes.push('|---|---|---|---|---|---|');
	const tries = [...seq.activites].sort((a, b) => a.seance - b.seance || a.ordre - b.ordre);
	for (const a of tries) {
		lignes.push(
			`| ${a.seance} | ${a.titre || '—'} | ${typeABCInfo(a.typeABC).label} | ${modaliteLabel(a.modalitePresence)} | ${a.outil ?? '—'} | ${a.dureeMin} |`
		);
	}

	lignes.push('', '## Synthèse', '');
	lignes.push(`- **Durée totale scénarisée** : ${s.totalMin} min`);
	lignes.push('- **Répartition par type d\u2019apprentissage (ABC LD)** :');
	for (const t of TYPES_ABC) {
		lignes.push(`  - ${t.label} : ${s.dureeParType[t.id]} min`);
	}
	lignes.push('- **Répartition par modalité de présence** :');
	for (const m of MODALITES_PRESENCE) {
		lignes.push(`  - ${m.label} : ${s.dureeParModalite[m.id]} min`);
	}
	if (s.outils.length) lignes.push(`- **Outils numériques utilisés** : ${s.outils.join(', ')}`);
	if (s.alertes.length) {
		lignes.push('', '## Points de vigilance', '');
		for (const a of s.alertes) lignes.push(`- ${a}`);
	}
	lignes.push('');
	return lignes.join('\n');
}

export function toCsv(seq: Sequence): string {
	const header = ['seance', 'ordre', 'titre', 'description', 'typeABC', 'modalitePresence', 'outil', 'dureeMin'];
	const rows = [...seq.activites]
		.sort((a, b) => a.seance - b.seance || a.ordre - b.ordre)
		.map((a) =>
			[
				a.seance,
				a.ordre,
				a.titre,
				a.description,
				typeABCInfo(a.typeABC).label,
				modaliteLabel(a.modalitePresence),
				a.outil ?? '',
				a.dureeMin
			]
				.map((v) => `"${String(v).replaceAll('"', '""')}"`)
				.join(',')
		);
	return [header.join(','), ...rows].join('\n') + '\n';
}

export function toHtml(seq: Sequence): string {
	const c = seq.cadrage;
	const s = synthese(seq.activites, c);
	const rows = [...seq.activites]
		.sort((a, b) => a.seance - b.seance || a.ordre - b.ordre)
		.map(
			(a) => `<tr>
	<td>${a.seance}</td><td>${escapeHtml(a.titre)}</td><td>${typeABCInfo(a.typeABC).label}</td>
	<td>${modaliteLabel(a.modalitePresence)}</td><td>${escapeHtml(a.outil ?? '—')}</td><td>${a.dureeMin}</td>
</tr>`
		)
		.join('\n');
	const typeRows = TYPES_ABC.map(
		(t) => `<tr><td>${t.label}</td><td>${s.dureeParType[t.id]} min</td></tr>`
	).join('\n');
	const modRows = MODALITES_PRESENCE.map(
		(m) => `<tr><td>${m.label}</td><td>${s.dureeParModalite[m.id]} min</td></tr>`
	).join('\n');
	return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><title>${escapeHtml(c.titre || 'Séquence')}</title>
<style>
body{font-family:system-ui,sans-serif;margin:2rem;color:#1a1a1a;max-width:1100px}
h1{font-size:1.5rem} h2{font-size:1.15rem;margin-top:1.5rem;border-bottom:1px solid #ccc;padding-bottom:.2rem}
table{border-collapse:collapse;width:100%;margin-top:.5rem}
th,td{border:1px solid #bbb;padding:.35rem .6rem;text-align:left;font-size:.9rem}
th{background:#f0f0f0}
</style></head><body>
<h1>${escapeHtml(c.titre || 'Séquence sans titre')}</h1>
<p><strong>Niveau :</strong> ${escapeHtml(c.niveau || '—')} · <strong>Discipline :</strong> ${escapeHtml(c.discipline || '—')} · <strong>Séances :</strong> ${c.nbSeances} · <strong>Durée scénarisée :</strong> ${s.totalMin} min</p>
${c.objectifApprentissage ? `<p><strong>Objectif d'apprentissage :</strong> ${escapeHtml(c.objectifApprentissage)}</p>` : ''}
<h2>Storyboard ABC Learning Design</h2>
<table><thead><tr><th>Séance</th><th>Activité</th><th>Type ABC LD</th><th>Modalité</th><th>Outil</th><th>Durée</th></tr></thead>
<tbody>${rows}</tbody></table>
<h2>Synthèse</h2>
<table><thead><tr><th>Type d'apprentissage</th><th>Durée</th></tr></thead><tbody>${typeRows}</tbody></table>
<table><thead><tr><th>Modalité de présence</th><th>Durée</th></tr></thead><tbody>${modRows}</tbody></table>
</body></html>`;
}

function escapeHtml(s: string): string {
	return s
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export function download(filename: string, content: string, mime: string): void {
	const blob = new Blob([content], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
