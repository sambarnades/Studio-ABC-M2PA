<script lang="ts">
	import type { Sequence } from '$lib/types';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
	import { Progress } from '$lib/components/ui/progress';
	import { Label } from '$lib/components/ui/label';
	import { synthese } from '$lib/compteurs';
	import { TYPES_ABC } from '$lib/data/types-abc';
	import { MODALITES_PRESENCE, modaliteLabel } from '$lib/data/modalites-presence';
	import { IconAlertTriangle } from '@tabler/icons-svelte';

	let { seq }: { seq: Sequence } = $props();

	let s = $derived(synthese(seq.activites, seq.cadrage));
</script>

<Card class="mb-4">
	<CardHeader>
		<CardTitle>Synthèse de la scénarisation</CardTitle>
	</CardHeader>
	<CardContent class="grid gap-4">
		<div class="flex flex-wrap items-center gap-2 text-sm">
			<Badge variant="secondary">Durée totale : {s.totalMin} min</Badge>
			{#if seq.cadrage.dureeTotaleMin}
				<Badge variant="outline">Prévu au cadrage : {seq.cadrage.dureeTotaleMin} min</Badge>
			{/if}
			<Badge variant="outline">
				{s.nbModalitesUtilisees}/4 modalités de présence
			</Badge>
			<Badge variant="outline">{s.typesUtilises.length}/6 types ABC LD</Badge>
		</div>

		<div class="grid gap-2">
			<Label class="text-xs font-semibold text-muted-foreground uppercase">
				Répartition par type d'apprentissage (ABC LD)
			</Label>
			{#each TYPES_ABC as t}
				{@const min = s.dureeParType[t.id]}
				{@const pct = s.totalMin > 0 ? Math.round((min / s.totalMin) * 100) : 0}
				<div class="flex items-center gap-2">
					<span class="w-44 shrink-0 text-sm">{t.label}</span>
					<Progress value={pct} class="h-2 flex-1" />
					<span class="w-16 shrink-0 text-right text-sm text-muted-foreground">{min} min</span>
				</div>
			{/each}
		</div>

		<div class="grid gap-2">
			<span class="text-xs font-semibold text-muted-foreground uppercase">Modalités de présence utilisées</span>
			<div class="flex flex-wrap gap-1">
				{#each MODALITES_PRESENCE as m}
					<Badge variant={s.dureeParModalite[m.id] > 0 ? 'default' : 'outline'}>
						{modaliteLabel(m.id)} · {s.dureeParModalite[m.id]} min
					</Badge>
				{/each}
			</div>
		</div>

		{#if s.outils.length}
			<div class="grid gap-2">
				<span class="text-xs font-semibold text-muted-foreground uppercase">Outils numériques utilisés</span>
				<div class="flex flex-wrap gap-1">
					{#each s.outils as o}
						<Badge variant="outline">{o}</Badge>
					{/each}
				</div>
			</div>
		{/if}

		{#if s.alertes.length}
			<Alert>
				<IconAlertTriangle class="size-4" />
				<AlertTitle>Points de vigilance</AlertTitle>
				<AlertDescription>
					<ul class="list-disc pl-4">
						{#each s.alertes as a}
							<li>{a}</li>
						{/each}
					</ul>
				</AlertDescription>
			</Alert>
		{/if}
	</CardContent>
</Card>
