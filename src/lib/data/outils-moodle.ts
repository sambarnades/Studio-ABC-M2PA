import type { TypeABC } from '$lib/types';

export type CategorieOutil = 'ressource' | 'activite' | 'h5p' | 'externe';

export interface OutilMoodle {
	categorie: CategorieOutil;
	nom: string;
}

export const CATEGORIE_LABEL: Record<CategorieOutil, string> = {
	ressource: 'Ressource Moodle',
	activite: 'Activité Moodle',
	h5p: 'H5P',
	externe: 'Activité externe à intégrer au cours'
};

export const OUTILS_MOODLE: Record<TypeABC, OutilMoodle[]> = {
	acquisition: [
		{ categorie: 'ressource', nom: 'Zone texte et média' },
		{ categorie: 'ressource', nom: 'URL' },
		{ categorie: 'ressource', nom: 'Page' },
		{ categorie: 'ressource', nom: 'Livre' },
		{ categorie: 'ressource', nom: 'Galerie d\u2019images' },
		{ categorie: 'ressource', nom: 'Fichier' },
		{ categorie: 'ressource', nom: 'Dossier' },
		{ categorie: 'activite', nom: 'Glossaire' },
		{ categorie: 'activite', nom: 'Base de données' },
		{ categorie: 'activite', nom: 'GeoGebra' },
		{ categorie: 'activite', nom: 'Leçon' },
		{ categorie: 'h5p', nom: 'Course Presentation' },
		{ categorie: 'h5p', nom: 'Dialog Cards' },
		{ categorie: 'h5p', nom: 'Image Slider' },
		{ categorie: 'h5p', nom: 'Image Hotspots' },
		{ categorie: 'h5p', nom: 'Timeline' },
		{ categorie: 'h5p', nom: 'Virtual Tour' },
		{ categorie: 'h5p', nom: 'Agamotto' },
		{ categorie: 'externe', nom: 'Vidéo : Peertube, PodEduc, YouTube' },
		{ categorie: 'externe', nom: 'Classe virtuelle BBB (VIA pour la formation)' },
		{ categorie: 'externe', nom: 'Annotation PDF' }
	],
	collaboration: [
		{ categorie: 'ressource', nom: 'Galerie d\u2019images' },
		{ categorie: 'activite', nom: 'Glossaire' },
		{ categorie: 'activite', nom: 'Devoir (en groupe)' },
		{ categorie: 'activite', nom: 'Partage' },
		{ categorie: 'activite', nom: 'Tableau' },
		{ categorie: 'activite', nom: 'Wiki' },
		{ categorie: 'activite', nom: 'Base de données' },
		{ categorie: 'activite', nom: 'Atelier' },
		{ categorie: 'externe', nom: 'Pad (ENT)' },
		{ categorie: 'externe', nom: 'Bureautique collaborative' },
		{ categorie: 'externe', nom: 'Carte mentale collaborative (Digimindmap)' },
		{ categorie: 'externe', nom: 'Tableau blanc collaboratif (Digiboard)' }
	],
	discussion: [
		{ categorie: 'activite', nom: 'Forum' },
		{ categorie: 'activite', nom: 'Chat' },
		{ categorie: 'activite', nom: 'Sticky Notes' },
		{ categorie: 'activite', nom: 'Nuage de mots' },
		{ categorie: 'h5p', nom: 'Twitter user feed' },
		{ categorie: 'externe', nom: 'Messagerie (Moodle ou externe)' },
		{ categorie: 'externe', nom: 'Classe virtuelle BBB (synchrone et asynchrone)' },
		{ categorie: 'externe', nom: 'Digistorm' },
		{ categorie: 'externe', nom: 'Pad' },
		{ categorie: 'externe', nom: 'Chat / documents partagés' }
	],
	enquete: [
		{ categorie: 'ressource', nom: 'Fichier' },
		{ categorie: 'ressource', nom: 'Dossier' },
		{ categorie: 'ressource', nom: 'URL' },
		{ categorie: 'activite', nom: 'Feedback' },
		{ categorie: 'activite', nom: 'Leçon' },
		{ categorie: 'activite', nom: 'Sondage' },
		{ categorie: 'activite', nom: 'Questionnaire' },
		{ categorie: 'h5p', nom: 'Cornell Notes' },
		{ categorie: 'externe', nom: 'Vidéo : Peertube, PodEduc, YouTube' },
		{ categorie: 'externe', nom: 'Annotation PDF' }
	],
	production: [
		{ categorie: 'activite', nom: 'Devoir' },
		{ categorie: 'activite', nom: 'Base de données' },
		{ categorie: 'activite', nom: 'GeoGebra' },
		{ categorie: 'h5p', nom: 'Audio Recorder' },
		{ categorie: 'h5p', nom: 'Documentation Tool' },
		{ categorie: 'h5p', nom: 'Essay' },
		{ categorie: 'h5p', nom: 'Structure Strip' },
		{ categorie: 'externe', nom: 'Classe virtuelle BBB (présentation et expression orale)' },
		{ categorie: 'externe', nom: 'Carte mentale (Digimindmap)' },
		{ categorie: 'externe', nom: 'Éditeur de code (Capytale)' }
	],
	pratique: [
		{ categorie: 'activite', nom: 'Jeu' },
		{ categorie: 'activite', nom: 'Paquetage SCORM' },
		{ categorie: 'activite', nom: 'Test (formatif)' },
		{ categorie: 'activite', nom: 'Leçon' },
		{ categorie: 'activite', nom: 'GeoGebra' },
		{ categorie: 'h5p', nom: 'Question Set' },
		{ categorie: 'h5p', nom: 'Course Presentation' },
		{ categorie: 'h5p', nom: 'Interactive Video' },
		{ categorie: 'h5p', nom: 'Flashcards' },
		{ categorie: 'h5p', nom: 'Interactive Book' },
		{ categorie: 'h5p', nom: 'Arithmetic Quiz' },
		{ categorie: 'h5p', nom: 'Crossword' },
		{ categorie: 'h5p', nom: 'Dictation' },
		{ categorie: 'h5p', nom: 'Find the hotspot' },
		{ categorie: 'h5p', nom: 'Sort the paragraphs' },
		{ categorie: 'externe', nom: 'Digistorm (questionnaire)' },
		{ categorie: 'externe', nom: 'Exercice en ligne' },
		{ categorie: 'externe', nom: 'Simulateur' }
	]
};
