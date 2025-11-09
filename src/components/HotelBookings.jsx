import React from 'react';
import { Building, Calendar, Moon, MapPin } from 'lucide-react';
import { format, parseISO, differenceInDays } from 'date-fns';

const HotelBookings = ({ formData, itinerary }) => {
  const startDate = parseISO(formData.startDate);
  const endDate = parseISO(formData.endDate);
  const nights = differenceInDays(endDate, startDate);
  
  const getHotelName = (destination, accommodationType) => {
    const hotels = {
      'singapore': {
        'hotel': 'Marina Bay Sands',
        'luxury': 'The Ritz-Carlton Singapore',
        'resort': 'Sentosa Resort & Spa',
        'default': 'Super Townhouse Oak Vashi'
      },
      'paris': {
        'hotel': 'Hotel des Invalides',
        'luxury': 'Le Meurice',
        'resort': 'Hotel Plaza Athénée',
        'default': 'Hotel Malte Opera'
      },
      'tokyo': {
        'hotel': 'Park Hyatt Tokyo',
        'luxury': 'The Peninsula Tokyo',
        'resort': 'Grand Hyatt Tokyo',
        'default': 'Shibuya Excel Hotel'
      },
      'default': {
        'hotel': 'City Center Hotel',
        'luxury': 'Luxury Grand Hotel',
        'resort': 'Resort & Spa',
        'default': 'Super Townhouse Oak Vashi'
      }
    };
    
    const destHotels = hotels[destination.toLowerCase()] || hotels['default'];
    return destHotels[accommodationType] || destHotels['default'];
  };

  const hotelName = getHotelName(formData.destination, formData.accommodationType);

  // Generate hotel bookings for each segment of the trip
  const generateHotelBookings = () => {
    const bookings = [];
    const checkInDate = startDate;
    const checkOutDate = endDate;
    
    // Create booking entries (simplified to show pattern)
    for (let i = 0; i < Math.min(nights, 5); i++) {
      bookings.push({
        city: `${formData.fromLocation} to ${formData.destination}`,
        checkIn: format(checkInDate, 'dd/MM/yyyy'),
        checkOut: format(checkOutDate, 'dd/MM/yyyy'),
        nights: nights,
        hotelName: hotelName
      });
    }
    
    return bookings;
  };

  const bookings = generateHotelBookings();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Hotel <span className="text-purple-600">Bookings</span>
      </h2>
      
      {/* Table Header */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div className="bg-purple-800 text-white p-3 rounded-lg text-center font-semibold">
          <MapPin className="w-4 h-4 inline mr-1" />
          City
        </div>
        <div className="bg-purple-800 text-white p-3 rounded-lg text-center font-semibold">
          <Calendar className="w-4 h-4 inline mr-1" />
          Check In
        </div>
        <div className="bg-purple-800 text-white p-3 rounded-lg text-center font-semibold">
          <Calendar className="w-4 h-4 inline mr-1" />
          Check Out
        </div>
        <div className="bg-purple-800 text-white p-3 rounded-lg text-center font-semibold">
          <Moon className="w-4 h-4 inline mr-1" />
          Nights
        </div>
        <div className="bg-purple-800 text-white p-3 rounded-lg text-center font-semibold">
          <Building className="w-4 h-4 inline mr-1" />
          Hotel Name
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {bookings.map((booking, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-center font-medium text-gray-800">{booking.city}</div>
            <div className="text-center text-gray-700">{booking.checkIn}</div>
            <div className="text-center text-gray-700">{booking.checkOut}</div>
            <div className="text-center font-semibold text-purple-600">{booking.nights}</div>
            <div className="text-center text-gray-800 font-medium">{booking.hotelName}</div>
          </div>
        ))}
      </div>

      {/* Hotel Notes */}
      <div className="mt-6 space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <p><strong>1.</strong> All Hotels Are Tentative And Can Be Replaced With Similar.</p>
        <p><strong>2.</strong> Breakfast Included For All Hotel Stays.</p>
        <p><strong>3.</strong> All Hotels Will Be 4* And Above Category.</p>
        <p><strong>4.</strong> A maximum occupancy of {formData.groupSize} people/room is allowed in most hotels.</p>
      </div>
    </div>
  );
};

export default HotelBookings;