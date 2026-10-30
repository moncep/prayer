export type PrayerType = 'HTML' | 'FIFTYTHREE' | 'SERIES' | 'VANAKKAM' | 'PDF' | 'SUKRUTHAM';

export interface SeriesDay {
  day: number;
  title: string;
  content: string;
}

export interface Prayer {
  id: string;
  fileName: string;
  title: string;
  type: PrayerType;
  sectionId: string;
  sectionName: string;
  subSectionId: string;
  subSectionTitle: string;
  content: string;
  seriesDays?: SeriesDay[];
  language: 'en' | 'ml';
}

export interface SubSection {
  id: string;
  title: string;
  image: string;
  prayerType: string;
  prayerCount: number;
  prayerIds: string[];
}

export interface Section {
  id: string;
  name: string;
  type: string;
  subsections: SubSection[];
}

export interface PrayerDataset {
  language: 'en' | 'ml';
  appData: {
    coverImage?: string;
    coverImageDark?: string;
    coverText?: string;
  };
  stats: {
    totalSections: number;
    totalSubSections: number;
    totalPrayers: number;
  };
  sections: Section[];
  prayers: Prayer[];
}

export type ReaderTheme = 'light' | 'sepia' | 'dark';

export interface ReaderSettings {
  fontSize: number; // in pixels (e.g., 16, 18, 20, 24)
  theme: ReaderTheme;
  keepAwake: boolean;
  fontFamily: 'serif' | 'sans';
}

export interface RosaryMystery {
  id: 'joyful' | 'luminous' | 'sorrowful' | 'glorious';
  name: string;
  days: string;
  dayIndices: number[]; // 0=Sun, 1=Mon, etc.
  imagePrefix: string;
  mysteries: {
    number: number;
    title: string;
    scripture: string;
    fruit: string;
    image: string;
  }[];
}
