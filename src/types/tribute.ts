export interface TributeConfig {
  brandTitle: string;
  recipientName: string;
  senderName: string;
  milestoneLabel: string;
  yearsTogether: string;
  celebrationDate: string;
  locationLabel: string;
  heroDedication: string;
  letterLeadParagraph: string;
  letterSecondParagraph: string;
  pullQuote: string;
  senderSignature: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageSrc: string;
  aspectClass: string;
  featured?: boolean;
}

export interface MilestoneChapter {
  id: string;
  index: string;
  year: string;
  title: string;
  location: string;
  summary: string;
  reflection: string;
}

export interface BirthdayWish {
  id: string;
  title: string;
  categoryLabel: string;
  message: string;
  cherishCount: number;
  cherished?: boolean;
}
