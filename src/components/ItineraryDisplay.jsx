import React from 'react';
import { Download, Clock, MapPin, DollarSign, Star, Calendar, Lightbulb, Plane, Building, Users, ArrowLeft } from 'lucide-react';
import { getDestinationImage, getActivityImage } from '../utils/destinationImages';
import { format, parseISO, differenceInDays } from 'date-fns';
import FlightSummary from './FlightSummary';
import HotelBookings from './HotelBookings';
import Button from '../ui/Button';
import Card from '../ui/Card';

const ItineraryDisplay = ({ itinerary, formData, onDownloadPDF, onStartOver }) => {
  const startDate = parseISO(formData.startDate);
  const endDate = parseISO(formData.endDate);
  const nights = differenceInDays(endDate, startDate);
  const days = nights + 1;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 mb-8 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-light mb-2">Hi, {formData.travelerName || 'Traveler'}!</h1>
          <h2 className="text-4xl font-bold mb-4">{itinerary.destination} Itinerary</h2>
          <p className="text-xl font-medium mb-6">{days} Days {nights} Nights</p>
          
          <div className="flex items-center space-x-6 text-lg mb-8">
            <Plane className="w-6 h-6" />
            <Building className="w-6 h-6" />
            <Users className="w-6 h-6" />
            <MapPin className="w-6 h-6" />
            <Calendar className="w-6 h-6" />
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={onDownloadPDF}
              className="flex items-center gap-2 bg-white text-purple-700 font-bold px-4 py-2 rounded-lg shadow border border-purple-200 hover:bg-purple-100 transition-colors"
              aria-label="Download PDF"
            >
              <Download className="w-5 h-5" /> Download PDF
            </Button>
            <Button
              onClick={onStartOver}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-200 transition-colors mt-4"
              aria-label="Start Over"
            >
              <ArrowLeft className="w-5 h-5" /> Start Over
            </Button>
          </div>
        </div>
      </Card>

      {/* Trip Details Card */}
      <Card className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Departure From</p>
            <p className="font-semibold text-gray-800">{formData.fromLocation}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Departure</p>
            <p className="font-semibold text-gray-800">{format(startDate, 'dd/MM/yyyy')}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Arrival</p>
            <p className="font-semibold text-gray-800">{format(endDate, 'dd/MM/yyyy')}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Destination</p>
            <p className="font-semibold text-gray-800">{itinerary.destination}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">No. Of Travellers</p>
            <p className="font-semibold text-gray-800">{formData.groupSize}</p>
          </div>
        </div>
      </Card>

      {/* Itinerary Days */}
      <div className="space-y-6">
        {itinerary.days.map((day, index) => (
          <Card key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
            {/* Day Number Sidebar */}
            <div className="flex flex-col items-center justify-center min-w-[80px] bg-purple-900 rounded-l-3xl relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-6">
                <span className="text-white font-bold text-lg" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  Day {day.day}
                </span>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-20">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white flex items-center justify-center">
                  <img 
                    src={getDestinationImage(itinerary.destination)} 
                    alt={itinerary.destination}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6 pt-10 md:pt-6">
              <div className="space-y-6">
                {/* Activities */}
                {day.activities && day.activities.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-purple-700 mb-2">Activities</h4>
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start space-x-4 mb-4">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                          {actIndex < day.activities.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-800 text-lg">{activity.time || 'Activity'}</h3>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                              <span>{activity.name}</span>
                            </div>
                            {activity.description && (
                              <div className="flex items-center text-gray-600 text-sm">
                                <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                                <span>{activity.description}</span>
                              </div>
                            )}
                            {activity.price && (
                              <div className="flex items-center text-gray-600 text-sm">
                                <span className="w-2 h-2 bg-gray-300 rounded-full mr-3"></span>
                                <span>Price: {activity.price}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Transfers */}
                {day.transfers && day.transfers.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-blue-700 mb-2">Transfers</h4>
                    {day.transfers.map((transfer, tIdx) => (
                      <div key={tIdx} className="flex items-center space-x-6 mb-2 bg-blue-50 p-3 rounded-lg">
                        <span className="font-semibold text-blue-900">{transfer.type}</span>
                        <span className="text-gray-700">Time: {transfer.time}</span>
                        <span className="text-gray-700">Price: {transfer.price}</span>
                        <span className="text-gray-700">People Allowed: {transfer.peopleAllowed}</span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Flights */}
                {day.flights && day.flights.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold text-green-700 mb-2">Flights</h4>
                    {day.flights.map((flight, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-6 mb-2 bg-green-50 p-3 rounded-lg">
                        <span className="font-semibold text-green-900">{flight.airline}</span>
                        <span className="text-gray-700">Flight No: {flight.flightNumber}</span>
                        <span className="text-gray-700">Departure: {flight.departure}</span>
                        <span className="text-gray-700">Arrival: {flight.arrival}</span>
                        <span className="text-gray-700">Price: {flight.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Flight Summary */}
      <FlightSummary formData={formData} />

      {/* Hotel Bookings */}
      <HotelBookings formData={formData} itinerary={itinerary} />

      {/* Important Notes, Scope of Service, Inclusion Summary - Styled to match provided image */}
      <Card className="bg-white rounded-3xl shadow-2xl p-8 mt-8 mb-8">
        {/* Important Notes */}
        <h2 className="text-2xl font-bold text-[black] mb-4">Important <span className="text-purple-600">Notes</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3 w-1/3">Point</th>
                  <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="bg-[#F7F5FB] text-gray-700">
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Airlines Standard Policy</td><td className="px-4 py-3">In case of visa rejection, visa fees or any other non-cancellable component cannot be reimbursed at any cost.</td></tr>
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Flight/Hotel Cancellation</td><td className="px-4 py-3">In case of visa rejection, visa fees or any other non-cancellable component cannot be reimbursed at any cost.</td></tr>
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Trip Insurance</td><td className="px-4 py-3">In case of visa rejection, visa fees or any other non-cancellable component cannot be reimbursed at any cost.</td></tr>
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Hotel Check-In & Check Out</td><td className="px-4 py-3">In case of visa rejection, visa fees or any other non-cancellable component cannot be reimbursed at any cost.</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Visa Rejection</td><td className="px-4 py-3">In case of visa rejection, visa fees or any other non-cancellable component cannot be reimbursed at any cost.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Scope of Service */}
        <h2 className="text-2xl font-bold text-black mb-4">Scope Of <span className="text-purple-600">Service</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3 w-1/3">Service</th>
                  <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody className="bg-[#F7F5FB] text-gray-700">
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Flight Tickets And Hotel Vouchers</td><td className="px-4 py-3">Delivered 3 days post full payment</td></tr>
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Web Check-In</td><td className="px-4 py-3">Boarding pass delivery via Email/WhatsApp</td></tr>
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Support</td><td className="px-4 py-3">Chat support – Response time: 4 hours</td></tr>
                <tr className="border-b"><td className="px-4 py-3 font-semibold">Cancellation Support</td><td className="px-4 py-3">Provided</td></tr>
                <tr><td className="px-4 py-3 font-semibold">Trip Support</td><td className="px-4 py-3">Response time: 5 minutes</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Inclusion Summary */}
        <h2 className="text-2xl font-bold text-black mb-4">Inclusion <span className="text-purple-600">Summary</span></h2>
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Category</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Count</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Details</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Status / Comments</th>
              </tr>
            </thead>
            <tbody className="bg-[#F7F5FB] text-gray-700">
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Flight</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">All flights mentioned</td>
                <td className="px-4 py-3">Awaiting Confirmation</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Tourist Tax</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)</td>
                <td className="px-4 py-3">Awaiting Confirmation</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Hotel</td>
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Airport to hotel · Hotel to attractions · Day trips if any</td>
                <td className="px-4 py-3">Included</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-xs text-gray-500 mt-4">
          <p><strong>Transfer Policy (Refundable Upon Claim):</strong> If any transfer is delayed beyond 15 minutes, customers may book an app-based or radio taxi and claim a refund for that specific leg.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs text-gray-600">
          <div>
            <span className="font-bold">Vigovia Tech Pvt. Ltd</span><br/>
            Registered Office: Hd-109 Cinnabar Hills, Links Business Park, Karnataka, India.
          </div>
          <div className="mt-4 md:mt-0">
            <span className="font-bold">Phone:</span> +91-99X9999999<br/>
            <span className="font-bold">Email ID:</span> Contact@Vigovia.Com
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-center">
            <span className="text-[#6C3FC5] font-bold text-lg">vigovia</span>
            <span className="text-xs text-gray-500">PLAN.PACK.GO</span>
          </div>
        </div>
      </Card>

      {/* Activity Table */}
      <Card className="bg-white rounded-3xl shadow-2xl p-8 mt-8 mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">Activity <span className="text-[#6C3FC5]">Table</span></h2>
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">City</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Activity</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Type</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Time Required</th>
              </tr>
            </thead>
            <tbody className="bg-[#F7F5FB] text-gray-700">
              {/* Example static rows, you can make this dynamic if you want */}
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Rio De Janeiro</td>
                <td className="px-4 py-3">Sydney Harbour Cruise & Taronga Zoo</td>
                <td className="px-4 py-3">Nature/Sightseeing</td>
                <td className="px-4 py-3">2-3 Hours</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Rio De Janeiro</td>
                <td className="px-4 py-3">Sydney Harbour Cruise & Taronga Zoo</td>
                <td className="px-4 py-3">Airlines Standard</td>
                <td className="px-4 py-3">2-3 Hours</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Rio De Janeiro</td>
                <td className="px-4 py-3">Sydney Harbour Cruise & Taronga Zoo</td>
                <td className="px-4 py-3">Airlines Standard</td>
                <td className="px-4 py-3">2-3 Hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Terms and Conditions */}
      <Card className="bg-white rounded-3xl shadow-2xl p-8 mt-8 mb-8">
        <h2 className="text-lg font-bold text-black mb-2">Terms and <span className="text-[#6C3FC5]">Conditions</span></h2>
        <a href="#" className="text-blue-600 underline text-sm font-medium">View all terms and conditions</a>
      </Card>

      {/* Payment Plan */}
      <Card className="bg-white rounded-3xl shadow-2xl p-8 mt-8 mb-8">
        <h2 className="text-2xl font-bold text-black mb-4">Payment <span className="text-purple-600">Plan</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
          <div className="rounded-2xl overflow-hidden shadow-md">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3 font-semibold">Total Amount</td>
                  <td className="px-4 py-3 font-bold text-lg">₹ 9,00,000 <span className="text-xs font-normal">For 3 Pax (Inclusive Of GST)</span></td>
                </tr>
                <tr>
                  <td className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3 font-semibold">TCS</td>
                  <td className="px-4 py-3">Not Collected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="overflow-x-auto rounded-2xl shadow-md">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Installment</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Amount</th>
                <th className="bg-[#E9D8FD] text-[#6C3FC5] px-4 py-3">Due Date</th>
              </tr>
            </thead>
            <tbody className="bg-[#F7F5FB] text-gray-700">
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Installment 1</td>
                <td className="px-4 py-3">₹3,50,000</td>
                <td className="px-4 py-3">Initial Payment</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-semibold">Installment 2</td>
                <td className="px-4 py-3">₹4,00,000</td>
                <td className="px-4 py-3">Post Visa Approval</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold">Installment 3</td>
                <td className="px-4 py-3">Remaining</td>
                <td className="px-4 py-3">20 Days Before Departure</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Visa Details and Book Now CTA */}
      <Card className="bg-white rounded-3xl shadow-2xl p-8 mt-8 mb-8">
        <h2 className="text-xl font-bold text-black mb-4">Visa <span className="text-purple-600">Details</span></h2>
        <div className="border border-purple-400 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
            <span className="font-bold text-sm text-black">Visa Type :</span>
            <span className="text-base text-gray-700">{itinerary.visaDetails?.type || 'Tourist'}</span>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start mb-4 md:mb-0">
            <span className="font-bold text-sm text-black">Validity:</span>
            <span className="text-base text-gray-700">{itinerary.visaDetails?.validity || '30 Days'}</span>
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start">
            <span className="font-bold text-sm text-black">Processing Date :</span>
            <span className="text-base text-gray-700">{itinerary.visaDetails?.processingDate ? new Date(itinerary.visaDetails.processingDate).toLocaleDateString() : '14/06/2025'}</span>
          </div>
        </div>
        <hr className="my-6" />
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-purple-800 tracking-widest mb-4">PLAN.PACK.GO!</h3>
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg transition-all">Book Now</button>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="bg-white rounded-2xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 w-7 h-7 text-yellow-500" />
          Travel Tips & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {itinerary.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <Star className="mr-3 w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Budget Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mt-6 border border-green-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Total Estimated Budget</h3>
            <p className="text-gray-600">For {formData.groupSize} traveler{formData.groupSize > 1 ? 's' : ''}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-green-600">{itinerary.totalBudget}</p>
            <p className="text-sm text-gray-500">{formData.budget} range</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ItineraryDisplay;