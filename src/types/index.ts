export interface Question {
  id: string;
  question: string;
  email: string;
  donationAmount: number;
  timestamp: Date;
  rank: number;
  emailCopyCount: number;
}

export interface QuestionFormData {
  question: string;
  email: string;
  donationAmount: number;
}
