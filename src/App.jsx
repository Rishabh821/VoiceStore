import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
import PreviewPage from './components/PreviewPage';
import { extractBusinessInfo } from './lib/gemini';
import { loadBusinessWebsite } from './lib/supabase';
import TemplateRenderer from './components/TemplateRenderer';

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

  const [publishedVariant, setPublishedVariant] = useState(1);

  const loadPublishedSite = async (id) => {
    setPage('loading-published');
    setError(null);
    try {
      const dbRow = await loadBusinessWebsite(id);
      setBusinessData({
        ...dbRow.business_data,
        uploadedImages: dbRow.business_data.uploadedImages || {}
      });
      setPublishedVariant(dbRow.selected_variant || 1);
      setPage('view-published');
    } catch (err) {
      console.error("Failed to load published site:", err);
      setError(err.message || "Failed to load the website.");
      setPage('error-published');
    }
  };

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const siteId = urlParams.get('site');
    if (siteId) {
      loadPublishedSite(siteId);
    }
  }, []);

  const handleCreateClick = () => {
    setError(null);
    setPage('input');
  };

  const handleGenerate = async (text, imagesData) => {
    setError(null);
    try {
      const parsedData = await extractBusinessInfo(text);
      // Map businessType from Gemini JSON to category used by TemplateRenderer
      const formattedData = {
        ...parsedData,
        category: parsedData.businessType,
        uploadedImages: imagesData
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
          onRetry={async () => {
            return await handleGenerate(businessData.originalText, businessData.uploadedImages);
          }}
        />
      )}

      {page === 'loading-published' && (
        <div className="min-h-screen bg-[#070913] text-white flex flex-col items-center justify-center space-y-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-sm text-slate-400 font-medium animate-pulse">Loading published website...</p>
        </div>
      )}

      {page === 'error-published' && (
        <div className="min-h-screen bg-[#070913] text-white flex flex-col items-center justify-center space-y-4 px-6 text-center">
          <h1 className="text-2xl font-bold text-slate-200">Website Not Found</h1>
          <p className="text-sm text-slate-400 max-w-md">{error || "This website may have been deleted or the link is incorrect."}</p>
          <button 
            onClick={() => {
              window.history.replaceState({}, document.title, window.location.pathname);
              setPage('landing');
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-xs font-bold transition-all shadow-md mt-2 cursor-pointer"
          >
            Create Your Own Website
          </button>
        </div>
      )}

      {page === 'view-published' && (
        <div className="min-h-screen bg-white text-slate-850 overflow-y-auto">
          <TemplateRenderer data={businessData} variant={publishedVariant} />
        </div>
      )}
    </div>
  );
}
