import React, { useState } from 'react';
import { Calendar, MapPin, DollarSign, Users, Heart, Home, Car, MessageSquare, ArrowRight, Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';

const initialFormData = {
  fromLocation: '',
  destination: '',
  startDate: '',
  endDate: '',
  budget: 'mid-range',
  groupSize: 2,
  interests: [],
  accommodationType: 'hotel',
  transportMode: 'flight',
  specialRequests: '',
  travelerName: ''
};

const TravelForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);
  const [numDays, setNumDays] = useState(1);
  const [days, setDays] = useState([
    { activities: [] }
  ]);

  const interestOptions = [
    'culture', 'food', 'adventure', 'relaxation', 'nightlife', 'shopping', 'nature', 'photography'
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = (e) => {
    e && e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      setDays(Array.from({ length: numDays }, () => ({ activities: [] })));
      setStep(3);
    }
  };

  const handlePrev = () => setStep(step - 1);

  const handleNumDaysChange = (e) => {
    const val = Math.max(1, parseInt(e.target.value) || 1);
    setNumDays(val);
  };

  // Activity handlers
  const handleActivityChange = (dayIdx, actIdx, field, value) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? {
            ...day,
            activities: day.activities.map((act, aIdx) =>
              aIdx === actIdx ? { ...act, [field]: value } : act
            )
          }
        : day
    ));
  };

  const addActivity = (dayIdx) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? { ...day, activities: [...day.activities, { name: '', description: '', time: '', price: '' }] }
        : day
    ));
  };

  const removeActivity = (dayIdx, actIdx) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? { ...day, activities: day.activities.filter((_, aIdx) => aIdx !== actIdx) }
        : day
    ));
  };

  // Add transfer and flight handlers
  const handleTransferChange = (dayIdx, transIdx, field, value) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? {
            ...day,
            transfers: day.transfers.map((trans, tIdx) =>
              tIdx === transIdx ? { ...trans, [field]: value } : trans
            )
          }
        : day
    ));
  };
  const addTransfer = (dayIdx) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? { ...day, transfers: [...(day.transfers || []), { type: '', time: '', price: '', peopleAllowed: '' }] }
        : day
    ));
  };
  const removeTransfer = (dayIdx, transIdx) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? { ...day, transfers: (day.transfers || []).filter((_, tIdx) => tIdx !== transIdx) }
        : day
    ));
  };
  const handleFlightChange = (dayIdx, flightIdx, field, value) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? {
            ...day,
            flights: day.flights.map((flight, fIdx) =>
              fIdx === flightIdx ? { ...flight, [field]: value } : flight
            )
          }
        : day
    ));
  };
  const addFlight = (dayIdx) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? { ...day, flights: [...(day.flights || []), { airline: '', flightNumber: '', departure: '', arrival: '', price: '' }] }
        : day
    ));
  };
  const removeFlight = (dayIdx, flightIdx) => {
    setDays(prev => prev.map((day, dIdx) =>
      dIdx === dayIdx
        ? { ...day, flights: (day.flights || []).filter((_, fIdx) => fIdx !== flightIdx) }
        : day
    ));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, days });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Plan Your Perfect Journey</h2>
        <p className="text-xl text-gray-600">Tell us your travel dreams and we'll craft the perfect itinerary</p>
      </div>
      {step === 1 && (
        <Card onSubmit={handleNext} className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          {/* Traveler Name and From Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Your Name
              </label>
              <Input
                type="text"
                value={formData.travelerName}
                onChange={(e) => setFormData(prev => ({ ...prev, travelerName: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <MapPin className="inline w-4 h-4 mr-2" />
                From Location
              </label>
              <Input
                type="text"
                value={formData.fromLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, fromLocation: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="e.g., Delhi, Mumbai, New York"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <MapPin className="inline w-4 h-4 mr-2" />
                Dream Destination
              </label>
              <Input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                placeholder="e.g., Paris, Tokyo, Singapore"
                required
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Calendar className="inline w-4 h-4 mr-2" />
                Departure Date
              </label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Calendar className="inline w-4 h-4 mr-2" />
                Return Date
              </label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                required
              />
            </div>
          </div>

          {/* Budget and Group Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              >
                <option value="budget">Budget Friendly (Under $100/day)</option>
                <option value="mid-range">Comfortable ($100-200/day)</option>
                <option value="luxury">Luxury Experience ($200+/day)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Users className="inline w-4 h-4 mr-2" />
                Number of Travelers
              </label>
              <Input
                type="number"
                min="1"
                max="20"
                value={formData.groupSize}
                onChange={(e) => setFormData(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              />
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              <Heart className="inline w-4 h-4 mr-2" />
              What interests you most?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {interestOptions.map(interest => (
                <Button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-6 py-3 rounded-xl border-2 transition-all capitalize font-medium ${
                    formData.interests.includes(interest)
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>

          {/* Accommodation and Transport */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Home className="inline w-4 h-4 mr-2" />
                Preferred Stay
              </label>
              <select
                value={formData.accommodationType}
                onChange={(e) => setFormData(prev => ({ ...prev, accommodationType: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              >
                <option value="hotel">Hotel</option>
                <option value="hostel">Hostel</option>
                <option value="airbnb">Airbnb</option>
                <option value="resort">Resort</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Car className="inline w-4 h-4 mr-2" />
                Travel Mode
              </label>
              <select
                value={formData.transportMode}
                onChange={(e) => setFormData(prev => ({ ...prev, transportMode: e.target.value }))}
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              >
                <option value="flight">Flight</option>
                <option value="train">Train</option>
                <option value="bus">Bus</option>
                <option value="car">Car</option>
                <option value="mixed">Mixed Transport</option>
              </select>
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              <MessageSquare className="inline w-4 h-4 mr-2" />
              Special Requests
            </label>
            <Input
              type="textarea"
              value={formData.specialRequests}
              onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg h-32 resize-none"
              placeholder="Any dietary requirements, accessibility needs, or special activities you'd like to include..."
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-5 px-8 rounded-xl font-bold text-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-xl flex items-center justify-center space-x-3"
          >
            <span>Next</span>
            <ArrowRight className="w-6 h-6" />
          </Button>
        </Card>
      )}
      {step === 2 && (
        <Card onSubmit={handleNext} className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-3">How many days is your trip?</label>
            <Input
              type="number"
              min="1"
              max="30"
              value={numDays}
              onChange={handleNumDaysChange}
              className="w-32 px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
              required
            />
          </div>
          <div className="flex justify-between">
            <Button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-bold text-lg">Back</Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl font-bold text-lg">Next</Button>
          </div>
        </Card>
      )}
      {step === 3 && (
        <Card onSubmit={handleFinalSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
          {days.map((day, dayIdx) => (
            <div key={dayIdx} className="mb-8 border-b pb-8">
              <h3 className="text-2xl font-bold text-purple-700 mb-4">Day {dayIdx + 1} Activities</h3>
              {day.activities.map((activity, actIdx) => (
                <div key={actIdx} className="flex flex-col md:flex-row md:items-end gap-4 mb-4 bg-purple-50 p-4 rounded-xl">
                  <Input
                    type="text"
                    placeholder="Activity Name"
                    value={activity.name}
                    onChange={e => handleActivityChange(dayIdx, actIdx, 'name', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Description"
                    value={activity.description}
                    onChange={e => handleActivityChange(dayIdx, actIdx, 'description', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  />
                  <Input
                    type="text"
                    placeholder="Time (e.g. Morning, 9:00 AM)"
                    value={activity.time}
                    onChange={e => handleActivityChange(dayIdx, actIdx, 'time', e.target.value)}
                    className="w-40 px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={activity.price}
                    onChange={e => handleActivityChange(dayIdx, actIdx, 'price', e.target.value)}
                    className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg"
                  />
                  <Button type="button" onClick={() => removeActivity(dayIdx, actIdx)} className="text-red-500 hover:bg-red-100 rounded-full p-2"><Trash2 className="w-5 h-5" /></Button>
                </div>
              ))}
              <Button type="button" onClick={() => addActivity(dayIdx)} className="flex items-center text-purple-700 hover:text-purple-900 font-semibold mt-2"><Plus className="w-5 h-5 mr-1" /> Add Activity</Button>
              <h3 className="text-xl font-bold text-blue-700 mt-6 mb-2">Transfers</h3>
              {(day.transfers || []).map((transfer, transIdx) => (
                <div key={transIdx} className="flex flex-col md:flex-row md:items-end gap-4 mb-4 bg-blue-50 p-4 rounded-xl">
                  <Input type="text" placeholder="Type" value={transfer.type} onChange={e => handleTransferChange(dayIdx, transIdx, 'type', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Input type="text" placeholder="Time" value={transfer.time} onChange={e => handleTransferChange(dayIdx, transIdx, 'time', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Input type="number" placeholder="Price" value={transfer.price} onChange={e => handleTransferChange(dayIdx, transIdx, 'price', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Input type="number" placeholder="People Allowed" value={transfer.peopleAllowed} onChange={e => handleTransferChange(dayIdx, transIdx, 'peopleAllowed', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Button type="button" onClick={() => removeTransfer(dayIdx, transIdx)} className="text-red-500 hover:bg-red-100 rounded-full p-2"><Trash2 className="w-5 h-5" /></Button>
                </div>
              ))}
              <Button type="button" onClick={() => addTransfer(dayIdx)} className="flex items-center text-blue-700 hover:text-blue-900 font-semibold mt-2"><Plus className="w-5 h-5 mr-1" /> Add Transfer</Button>
              <h3 className="text-xl font-bold text-green-700 mt-6 mb-2">Flights</h3>
              {(day.flights || []).map((flight, flightIdx) => (
                <div key={flightIdx} className="flex flex-col md:flex-row md:items-end gap-4 mb-4 bg-green-50 p-4 rounded-xl">
                  <Input type="text" placeholder="Airline" value={flight.airline} onChange={e => handleFlightChange(dayIdx, flightIdx, 'airline', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Input type="text" placeholder="Flight Number" value={flight.flightNumber} onChange={e => handleFlightChange(dayIdx, flightIdx, 'flightNumber', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Input type="text" placeholder="Departure" value={flight.departure} onChange={e => handleFlightChange(dayIdx, flightIdx, 'departure', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Input type="text" placeholder="Arrival" value={flight.arrival} onChange={e => handleFlightChange(dayIdx, flightIdx, 'arrival', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Input type="number" placeholder="Price" value={flight.price} onChange={e => handleFlightChange(dayIdx, flightIdx, 'price', e.target.value)} className="w-32 px-4 py-3 border border-gray-300 rounded-lg text-lg" />
                  <Button type="button" onClick={() => removeFlight(dayIdx, flightIdx)} className="text-red-500 hover:bg-red-100 rounded-full p-2"><Trash2 className="w-5 h-5" /></Button>
                </div>
              ))}
              <Button type="button" onClick={() => addFlight(dayIdx)} className="flex items-center text-green-700 hover:text-green-900 font-semibold mt-2"><Plus className="w-5 h-5 mr-1" /> Add Flight</Button>
            </div>
          ))}
          <div className="flex justify-between">
            <Button type="button" onClick={handlePrev} className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-bold text-lg">Back</Button>
            <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-8 rounded-xl font-bold text-lg">Generate Itinerary</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TravelForm;