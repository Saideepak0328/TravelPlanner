import React from 'react';
import { Plane, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';

const FlightSummary = ({ formData }) => {
  const startDate = parseISO(formData.startDate);
  const endDate = parseISO(formData.endDate);
  
  const getAirlineName = (destination) => {
    const airlines = {
      'singapore': 'Singapore Airlines',
      'paris': 'Air France',
      'tokyo': 'Japan Airlines',
      'london': 'British Airways',
      'dubai': 'Emirates',
      'new york': 'Delta Airlines',
      'default': 'Air India'
    };
    return airlines[destination.toLowerCase()] || airlines['default'];
  };

  const getAirportCode = (city) => {
    const codes = {
      'singapore': 'SIN',
      'paris': 'CDG',
      'tokyo': 'NRT',
      'london': 'LHR',
      'dubai': 'DXB',
      'new york': 'JFK',
      'delhi': 'DEL',
      'mumbai': 'BOM',
      'default': 'DEL'
    };
    return codes[city.toLowerCase()] || codes['default'];
  };

  const airline = getAirlineName(formData.destination);
  const destinationCode = getAirportCode(formData.destination);
  const departureCode = getAirportCode(formData.fromLocation);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Flight <span className="text-purple-600">Summary</span>
      </h2>
      
      <div className="space-y-4">
        {/* Outbound Flight */}
        <div className="flex items-center bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-semibold min-w-[120px] text-center">
            {format(startDate, 'EEE dd MMM\'yy')}
          </div>
          <div className="flex-1 ml-6">
            <div className="flex items-center text-gray-800">
              <Plane className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-semibold">{airline}</span>
              <span className="ml-2 text-gray-600">
                From {formData.fromLocation} ({departureCode}) To {formData.destination} ({destinationCode})
              </span>
            </div>
          </div>
        </div>

        {/* Return Flight */}
        <div className="flex items-center bg-purple-50 rounded-xl p-4 border border-purple-100">
          <div className="bg-purple-200 text-purple-800 px-4 py-2 rounded-lg font-semibold min-w-[120px] text-center">
            {format(endDate, 'EEE dd MMM\'yy')}
          </div>
          <div className="flex-1 ml-6">
            <div className="flex items-center text-gray-800">
              <Plane className="w-5 h-5 mr-2 text-purple-600" />
              <span className="font-semibold">{airline}</span>
              <span className="ml-2 text-gray-600">
                From {formData.destination} ({destinationCode}) To {formData.fromLocation} ({departureCode})
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <p><strong>Note:</strong> All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.</p>
      </div>
    </div>
  );
};

export default FlightSummary;