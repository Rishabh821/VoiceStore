import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
import PreviewPage from './components/PreviewPage';
import { extractBusinessInfo } from './lib/gemini';

export default function App() {
  const [page, setPage] = useState('landing'); // 'landing', 'input', 'preview'
  const [error, setError] = useState(null);
  const [businessData, setBusinessData] = useState({
    businessName: "",
    description: "",
    services: [],
    phone: "",
    hours: "",
    address: "",
    category: "general"
  });

  const handleCreateClick = () => {
    setError(null);
    setPage('input');
  };

  const handleGenerate = async (text) => {
    setError(null);
    try {
      const parsedData = await extractBusinessInfo(text);
      // Map businessType from Gemini JSON to category used by TemplateRenderer
      const formattedData = {
        ...parsedData,
        category: parsedData.businessType
      };
      setBusinessData(formattedData);
      setPage('preview');
      return true;
    } catch (err) {
      console.error("Extraction error:", err);
      setError(err.message || "Failed to parse business details. Please check your API key.");
      return false;
    }
  };

  const handleBackToLanding = () => {
    setError(null);
    setPage('landing');
  };

  const handleBackToInput = () => {
    setError(null);
    setPage('input');
  };

  const handleUpdateData = (updatedData) => {
    setBusinessData(updatedData);
  };

  const handleClearError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white">
      {page === 'landing' && (
        <LandingPage onCreateClick={handleCreateClick} />
      )}
      
      {page === 'input' && (
        <InputPage 
          onBack={handleBackToLanding} 
          onGenerate={handleGenerate} 
          error={error}
          onClearError={handleClearError}
        />
      )}
      
      {page === 'preview' && (
        <PreviewPage 
          data={businessData} 
          onBack={handleBackToInput} 
          onUpdateData={handleUpdateData}
        />
      )}
    </div>
  );
}
