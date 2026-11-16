import {
  BirthdayWish,
  GalleryItem,
  MilestoneChapter,
  TributeConfig,
} from '../types/tribute';

export const HERO_IMAGE_PATH = '/src/assets/images/1.jpeg';

export const DEFAULT_TRIBUTE_CONFIG: TributeConfig = {
  brandTitle: 'Mansi & Momo',
  recipientName: 'Momo',
  senderName: 'Mansi',
  milestoneLabel: 'Your Birthday',
  yearsTogether: '5 Years',
  celebrationDate: 'December 17',
  locationLabel: 'Just the Two of Us',
  heroDedication:
    'To the man who turns every ordinary day into my favorite memory. Tonight is all about celebrating you, your heart, and five unforgettable years together.',
  letterLeadParagraph:
    'Happy birthday, Momo. Before tonight begins and you light your candle, I wanted to put into words just how deeply grateful I am to walk beside you through these five wonderful years. Watching the quiet steadiness, warmth, and kindness you bring into my life every single day is the greatest gift I have ever known.',
  letterSecondParagraph:
    'Through early morning coffees, late evening walks, and every milestone we have crossed together, you have been my calmest place and my proudest adventure. As you step into this new year, my only wish is to keep loving you well, cheering for every dream you carry, and making sure you feel just as cherished as you make me feel.',
  pullQuote:
    'In every room, in every season, my favorite place in the world is simply right beside you.',
  senderSignature: 'Forever yours, Mansi',
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'fig-01',
    title: 'Under the Festival Lights',
    imageSrc: '/src/assets/images/1.jpeg',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'fig-02',
    title: 'Monsoon in the Hills',
    imageSrc: '/src/assets/images/2.jpeg',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'fig-03',
    title: 'Little Hearts',
    imageSrc: '/src/assets/images/3.jpeg',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'fig-04',
    title: 'All Smiles Under the Palms',
    imageSrc: '/src/assets/images/4.jpeg',
    aspectClass: 'aspect-[3/4]',
  },
];

export const MILESTONE_CHAPTERS: MilestoneChapter[] = [
  {
    id: 'ch-01',
    index: '01',
    year: 'Year One',
    title: 'The Evening We Met',
    location: 'Where It Started',
    summary: 'One conversation that lasted hours longer than either of us expected.',
    reflection:
      'I still remember how easy it felt to talk to you from the very first minute—and how quickly I started looking forward to every excuse to see you again.',
  },
  {
    id: 'ch-02',
    index: '02',
    year: 'Year Two',
    title: 'Our First Trip Together',
    location: 'By the Coast',
    summary: 'Early mornings, shared playlists, and discovering how well we travel side by side.',
    reflection:
      'Getting a little lost, laughing over slow dinners, and watching the sunset together showed me that home wasn’t a place—it was wherever you were.',
  },
  {
    id: 'ch-03',
    index: '03',
    year: 'Year Four',
    title: 'Building Our Everyday',
    location: 'Our Own Rhythm',
    summary: 'Sunday coffees, quiet support on hard days, and celebrating every small win.',
    reflection:
      'Loving you in the big moments is effortless, but loving you in the quiet, everyday routines has been my favorite chapter yet.',
  },
  {
    id: 'ch-04',
    index: '04',
    year: 'Year Five',
    title: 'December 17 & Everything Ahead',
    location: 'Tonight',
    summary: 'Five years together and another birthday celebrating the man I love most.',
    reflection:
      'Here is to your health, your peace, your biggest goals, and a lifetime more of December 17ths I get to celebrate right next to you.',
  },
];

export const INITIAL_WISHES: BirthdayWish[] = [
  {
    id: 'wish-1',
    title: 'Slow Sunday Mornings',
    categoryLabel: 'Wish I',
    message:
      'May this year give you more unhurried mornings with warm coffee, zero alarms, and nowhere we need to be.',
    cherishCount: 1,
    cherished: true,
  },
  {
    id: 'wish-2',
    title: 'Every Goal You Chase',
    categoryLabel: 'Wish II',
    message:
      'I will always be the loudest voice in your corner, proud of your drive and cheering for everything you are building.',
    cherishCount: 1,
    cherished: true,
  },
  {
    id: 'wish-3',
    title: 'Another Year of Us',
    categoryLabel: 'Wish III',
    message:
      'More late-night talks, spontaneous drives, and quiet dinners for two where the rest of the world fades out.',
    cherishCount: 1,
    cherished: true,
  },
];
