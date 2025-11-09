import { TravelDetails, GeneratedItinerary, ItineraryDay, DayActivity } from '../types/travel';
import { format, addDays, differenceInDays, parseISO } from 'date-fns';

const destinationData: { [key: string]: any } = {
  'paris': {
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées', 'Montmartre', 'Seine River Cruise'],
    restaurants: ['Le Comptoir du Relais', 'L\'As du Fallafel', 'Pierre Hermé', 'Du Pain et des Idées'],
    activities: ['Walking tour', 'Museum visit', 'River cruise', 'Shopping', 'Café culture', 'Art galleries'],
    avgCosts: { budget: 80, 'mid-range': 150, luxury: 300 }
  },
  'tokyo': {
    attractions: ['Senso-ji Temple', 'Tokyo Skytree', 'Shibuya Crossing', 'Tsukiji Fish Market', 'Meiji Shrine', 'Ginza'],
    restaurants: ['Sukiyabashi Jiro', 'Ichiran Ramen', 'Gonpachi', 'Nabezo'],
    activities: ['Temple visit', 'Sushi experience', 'Shopping', 'Cultural tour', 'Karaoke', 'Traditional gardens'],
    avgCosts: { budget: 70, 'mid-range': 120, luxury: 250 }
  },
  'new york': {
    attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Brooklyn Bridge', 'Empire State Building', 'Metropolitan Museum'],
    restaurants: ['Katz\'s Delicatessen', 'Joe\'s Pizza', 'The Halal Guys', 'Shake Shack'],
    activities: ['Broadway show', 'Museum visit', 'Walking tour', 'Shopping', 'Food tour', 'Rooftop bars'],
    avgCosts: { budget: 100, 'mid-range': 200, luxury: 400 }
  },
  'london': {
    attractions: ['Big Ben', 'Tower Bridge', 'British Museum', 'Buckingham Palace', 'London Eye', 'Camden Market'],
    restaurants: ['Dishoom', 'The Ivy', 'Borough Market', 'Sketch'],
    activities: ['Pub crawl', 'Theatre show', 'Museum visit', 'Royal tour', 'Market exploration', 'River cruise'],
    avgCosts: { budget: 90, 'mid-range': 180, luxury: 350 }
  },
  'singapore': {
    attractions: ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa Island', 'Chinatown', 'Little India', 'Orchard Road'],
    restaurants: ['Hawker Centers', 'Newton Food Centre', 'Lau Pa Sat', 'Marina Bay Sands SkyPark'],
    activities: ['City tour', 'Food tour', 'Shopping', 'Cultural exploration', 'Night safari', 'River cruise'],
    avgCosts: { budget: 75, 'mid-range': 140, luxury: 280 }
  },
  'dubai': {
    attractions: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Dubai Marina', 'Gold Souk', 'Desert Safari'],
    restaurants: ['At.mosphere', 'Pierchic', 'Al Hadheerah', 'Burj Al Arab'],
    activities: ['Desert safari', 'Shopping', 'Luxury dining', 'Beach activities', 'Cultural tours', 'Adventure sports'],
    avgCosts: { budget: 120, 'mid-range': 250, luxury: 500 }
  },
  'default': {
    attractions: ['City Center', 'Local Museum', 'Historic District', 'Main Square', 'Cultural Sites', 'Scenic Viewpoints'],
    restaurants: ['Local Cuisine Restaurant', 'Traditional Eatery', 'Popular Café', 'Street Food Market'],
    activities: ['City tour', 'Cultural experience', 'Local shopping', 'Historical sites', 'Nature walks', 'Local experiences'],
    avgCosts: { budget: 60, 'mid-range': 100, luxury: 200 }
  }
};

const interestActivities: { [key: string]: string[] } = {
  'culture': ['Museum visits', 'Historical tours', 'Local art galleries', 'Traditional performances'],
  'food': ['Food tours', 'Cooking classes', 'Local markets', 'Restaurant experiences'],
  'adventure': ['Hiking', 'Water sports', 'Extreme activities', 'Adventure tours'],
  'relaxation': ['Spa treatments', 'Beach time', 'Peaceful walks', 'Yoga sessions'],
  'nightlife': ['Local bars', 'Night markets', 'Live music venues', 'Dance clubs'],
  'shopping': ['Local markets', 'Shopping districts', 'Souvenir hunting', 'Local crafts'],
  'nature': ['Parks and gardens', 'Nature walks', 'Wildlife viewing', 'Outdoor activities'],
  'photography': ['Scenic viewpoints', 'Photo walks', 'Sunset/sunrise spots', 'Architectural photography']
};

export function generateItinerary(details: TravelDetails): GeneratedItinerary {
  const startDate = parseISO(details.startDate);
  const endDate = parseISO(details.endDate);
  const duration = differenceInDays(endDate, startDate) + 1;
  
  const destinationKey = details.destination.toLowerCase();
  const destData = destinationData[destinationKey] || destinationData['default'];
  
  const dailyBudget = destData.avgCosts[details.budget] || destData.avgCosts['mid-range'];

  let days: ItineraryDay[] = [];
  for (let i = 0; i < duration; i++) {
    const currentDate = addDays(startDate, i);
    const dayNumber = i + 1;

    // --- Dynamic generation ---
    const generatedActivities: DayActivity[] = [];
    const morningAttraction = destData.attractions[i % destData.attractions.length];
    generatedActivities.push({
      time: '9:00 AM',
      activity: `Morning: Visit ${morningAttraction}`,
      description: `Start your day exploring ${morningAttraction}`,
      cost: `$${Math.round(dailyBudget * 0.3)}`,
      location: morningAttraction
    });
    const afternoonAttraction = destData.attractions[(i + 1) % destData.attractions.length];
    generatedActivities.push({
      time: '12:30 PM',
      activity: `Afternoon: Discover ${afternoonAttraction}`,
      description: `Continue your adventure at ${afternoonAttraction}`,
      cost: `$${Math.round(dailyBudget * 0.25)}`,
      location: afternoonAttraction
    });
    generatedActivities.push({
      time: '2:30 PM',
      activity: `Lunch & Leisure`,
      description: `Enjoy local cuisine and take a break before your next adventure`,
      cost: `$${Math.round(dailyBudget * 0.2)}`,
      location: 'Local Restaurant or Hotel'
    });
    const interestActivity = getInterestBasedActivity(details.interests, i, destData);
    generatedActivities.push({
      time: '6:00 PM',
      activity: interestActivity,
      description: 'Activity tailored to your interests and preferences',
      cost: `$${Math.round(dailyBudget * 0.25)}`,
      location: 'Various locations'
    });

    // --- Merge with user input if present ---
    const userDay: Partial<ItineraryDay> = (Array.isArray(details.days) && details.days[i]) ? details.days[i] : {};
    const userActivities: any[] = Array.isArray(userDay.activities) ? userDay.activities.map((act: any) => ({
      time: act.time || '',
      activity: act.name || act.activity || '',
      description: act.description || act.name || act.activity || '',
      cost: act.price ? `$${act.price}` : '',
      location: act.location || ''
    })) : [];
    const mergedActivities = [...generatedActivities, ...userActivities];

    // Flights and transfers
    const generatedFlights: any[] = [];
    const generatedTransfers: any[] = [];
    const userFlights: any[] = Array.isArray(userDay.flights) ? userDay.flights : [];
    const userTransfers: any[] = Array.isArray(userDay.transfers) ? userDay.transfers : [];

    // Sort activities by time (if possible)
    const sortByTime = (a: any, b: any) => {
      // Try to parse time as Date, fallback to string compare
      if (a.time && b.time) {
        // Handle times like '9:00 AM', '14:00', etc.
        const parse = (t: string) => {
          // Try to parse as 24h first
          const d = Date.parse('1970-01-01T' + t);
          if (!isNaN(d)) return d;
          // Try to parse as 12h with AM/PM
          const match = t.match(/(\d{1,2}):(\d{2}) ?([APap][Mm])?/);
          if (match) {
            let hour = parseInt(match[1]);
            const min = parseInt(match[2]);
            if (match[3]) {
              if (match[3].toLowerCase() === 'pm' && hour < 12) hour += 12;
              if (match[3].toLowerCase() === 'am' && hour === 12) hour = 0;
            }
            return hour * 60 + min;
          }
          return 0;
        };
        return parse(a.time) - parse(b.time);
      }
      return 0;
    };

    const sortedActivities = [...mergedActivities].sort(sortByTime);
    const sortedFlights = [...userFlights].sort(sortByTime);
    const sortedTransfers = [...userTransfers].sort(sortByTime);

    days.push({
      day: dayNumber,
      date: userDay.date || format(currentDate, 'EEEE, MMMM dd, yyyy'),
      title: userDay.title || `Day ${dayNumber} - ${morningAttraction} & ${afternoonAttraction}`,
      activities: sortedActivities,
      totalCost: userDay.totalCost || `$${dailyBudget}`,
      flights: [...generatedFlights, ...sortedFlights],
      transfers: [...generatedTransfers, ...sortedTransfers],
    });
  }
  
  const totalBudget = dailyBudget * duration * details.groupSize;
  
  const recommendations = generateRecommendations(details, destData);

  // Example dynamic visa details (could be improved with more logic)
  const visaDetails = {
    type: 'Tourist',
    validity: '30 Days',
    processingDate: details.startDate || '2025-06-14',
  };

  return {
    destination: details.destination,
    duration: `${duration} days`,
    totalBudget: `$${totalBudget}`,
    days,
    recommendations,
    visaDetails
  };
}

function getInterestBasedActivity(interests: string[], dayIndex: number, destData: any): string {
  if (interests.length === 0) {
    return destData.activities[dayIndex % destData.activities.length];
  }
  
  const interest = interests[dayIndex % interests.length];
  const activities = interestActivities[interest] || destData.activities;
  return `${activities[dayIndex % activities.length]} Including Super Tree Grove (3-4 Hours)`;
}

function generateRecommendations(details: TravelDetails, destData: any): string[] {
  const recommendations = [
    `Your journey starts from ${details.fromLocation} to ${details.destination}.`,
    `Best time to visit ${details.destination} is during shoulder seasons for fewer crowds and better weather`,
    `Learn a few basic phrases in the local language to enhance your travel experience`,
    `Keep digital and physical copies of important documents in separate locations`,
    `Research local customs and cultural etiquette before your departure`,
    `Download offline maps and translation apps for easier navigation`
  ];
  
  if (details.budget === 'budget') {
    recommendations.push('Consider staying in hostels or budget hotels, and use public transportation to save money');
    recommendations.push('Look for free walking tours and visit free museums on designated days');
  }
  
  if (details.interests.includes('food')) {
    recommendations.push('Make restaurant reservations well in advance for popular dining spots');
    recommendations.push('Try local street food and visit traditional markets for authentic flavors');
  }
  
  if (details.groupSize > 4) {
    recommendations.push('Book group accommodations and look for group discounts on activities');
    recommendations.push('Consider hiring a private guide for larger groups to enhance the experience');
  }
  
  if (details.interests.includes('photography')) {
    recommendations.push('Research the best photography spots and golden hour timing for each location');
  }
  
  return recommendations.slice(0, 6); // Limit to 6 recommendations
}