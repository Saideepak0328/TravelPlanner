export interface TravelDetails {
  fromLocation: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  groupSize: number;
  interests: string[];
  accommodationType: string;
  transportMode: string;
  specialRequests: string;
  days?: ItineraryDay[];
}

export interface DayActivity {
  time: string;
  activity: string;
  description: string;
  cost: string;
  location: string;
}

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  activities: DayActivity[];
  totalCost: string;
  flights?: any[];
  transfers?: any[];
}

export interface GeneratedItinerary {
  destination: string;
  duration: string;
  totalBudget: string;
  days: ItineraryDay[];
  recommendations: string[];
}