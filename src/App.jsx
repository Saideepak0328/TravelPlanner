import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TravelForm from './components/TravelForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateItinerary } from './utils/itineraryGenerator';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [currentStep, setCurrentStep] = useState('form'); // 'form', 'loading', 'itinerary'
  const [itinerary, setItinerary] = useState(null);
  const [travelFormData, setTravelFormData] = useState(null);

  const handleFormSubmit = async (formData) => {
    setTravelFormData(formData);
    setCurrentStep('loading');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedItinerary = generateItinerary(formData);
    setItinerary(generatedItinerary);
    setCurrentStep('itinerary');
  };

  const handleDownloadPDF = async () => {
    if (itinerary && travelFormData) {
      await generatePDF(itinerary, travelFormData.fromLocation);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('form');
    setItinerary(null);
    setTravelFormData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentStep === 'form' && (
          <TravelForm onSubmit={handleFormSubmit} />
        )}
        
        {currentStep === 'loading' && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
            <LoadingSpinner />
          </div>
        )}
        
        {currentStep === 'itinerary' && itinerary && (
          <ItineraryDisplay 
            itinerary={itinerary} 
            formData={travelFormData}
            onDownloadPDF={handleDownloadPDF}
            onStartOver={handleStartOver}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;