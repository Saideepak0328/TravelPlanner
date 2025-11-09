// Destination image mappings using Pexels URLs
export const destinationImages: { [key: string]: string } = {
  'paris': 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
  'tokyo': 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
  'new york': 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=800',
  'london': 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
  'singapore': 'https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&w=800',
  'dubai': 'https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=800',
  'rome': 'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800',
  'barcelona': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
  'amsterdam': 'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800',
  'sydney': 'https://images.pexels.com/photos/995765/pexels-photo-995765.jpeg?auto=compress&cs=tinysrgb&w=800',
  'default': 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=800'
};

export function getDestinationImage(destination: string): string {
  const key = destination.toLowerCase();
  return destinationImages[key] || destinationImages['default'];
}

export const activityImages: { [key: string]: string } = {
  'museum': 'https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=400',
  'restaurant': 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
  'shopping': 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=400',
  'temple': 'https://images.pexels.com/photos/161401/pexels-photo-161401.jpeg?auto=compress&cs=tinysrgb&w=400',
  'park': 'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=400',
  'tour': 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
  'default': 'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400'
};

export function getActivityImage(activity: string): string {
  const activityLower = activity.toLowerCase();
  
  if (activityLower.includes('museum')) return activityImages['museum'];
  if (activityLower.includes('restaurant') || activityLower.includes('lunch') || activityLower.includes('dinner')) return activityImages['restaurant'];
  if (activityLower.includes('shopping')) return activityImages['shopping'];
  if (activityLower.includes('temple') || activityLower.includes('shrine')) return activityImages['temple'];
  if (activityLower.includes('park') || activityLower.includes('garden')) return activityImages['park'];
  if (activityLower.includes('tour')) return activityImages['tour'];
  
  return activityImages['default'];
}