
import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle, Brain, Zap } from 'lucide-react';
import { catCNNService, type CNNResult } from '../services/catCNNService';

const UploadArea = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [result, setResult] = useState<CNNResult | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Reset states
      setValidationError(null);
      setResult(null);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        
        // Validasi apakah gambar mengandung kucing menggunakan CNN
        setIsValidating(true);
        try {
          const isValidCat = await catCNNService.validateCatImage(imageData);
          setIsValidating(false);
          
          if (isValidCat) {
            await performCNNAnalysis(imageData);
          } else {
            setValidationError("Gambar yang diupload bukan foto kucing yang jelas. Silakan upload foto kucing dengan pencahayaan yang baik dan kucing terlihat jelas.");
          }
        } catch (error) {
          setIsValidating(false);
          setValidationError("Terjadi kesalahan saat validasi gambar. Silakan coba lagi.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const performCNNAnalysis = async (imageData: string) => {
    setIsLoadingModel(true);
    setIsAnalyzing(true);
    
    try {
      console.log('Starting CNN analysis...');
      const cnnResult = await catCNNService.analyzeImage(imageData);
      setResult(cnnResult);
      console.log('CNN analysis completed:', cnnResult);
    } catch (error) {
      console.error('CNN analysis failed:', error);
      setValidationError("Gagal menganalisis gambar dengan AI. Silakan coba lagi.");
    } finally {
      setIsLoadingModel(false);
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setResult(null);
    setIsAnalyzing(false);
    setIsLoadingModel(false);
    setValidationError(null);
    setIsValidating(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mr-3">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              AI CNN Analysis
            </h2>
            <p className="text-sm text-purple-600 font-medium">Powered by Deep Learning</p>
          </div>
        </div>
        <p className="text-gray-600 mb-2">
          Identifikasi ras kucing menggunakan Convolutional Neural Network (CNN) untuk akurasi tinggi
        </p>
        <div className="flex justify-center items-center space-x-4 text-sm text-orange-600 bg-orange-50 rounded-lg p-3">
          <AlertCircle className="h-4 w-4" />
          <span className="font-medium">
            Pastikan foto kucing jelas, pencahayaan baik, dan kucing menghadap kamera
          </span>
        </div>
      </div>

      {!uploadedImage ? (
        <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="mb-4">
            <Camera className="mx-auto h-12 w-12 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Upload Foto Kucing untuk Analisis CNN
          </h3>
          <p className="text-gray-500 mb-4">
            Drag & drop atau klik untuk memilih foto kucing
          </p>
          <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Upload className="mr-2 h-5 w-5" />
            Pilih Foto Kucing
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <p className="text-sm text-gray-400 mt-2">
            PNG, JPG hingga 10MB - Optimal: 224x224px atau lebih besar
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                Analisis CNN
              </h3>
              <button
                onClick={resetUpload}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Upload Baru
              </button>
            </div>
            
            <div className="mb-6">
              <img
                src={uploadedImage}
                alt="Uploaded cat"
                className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
              />
            </div>

            {isValidating ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Validasi gambar kucing dengan AI...</p>
                <p className="text-sm text-gray-500 mt-2">Memastikan gambar mengandung kucing</p>
              </div>
            ) : validationError ? (
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
                  <h4 className="text-lg font-semibold text-red-800">
                    Validasi Gagal
                  </h4>
                </div>
                <p className="text-red-700 mb-4">{validationError}</p>
                <button
                  onClick={resetUpload}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Upload Foto Lain
                </button>
              </div>
            ) : isLoadingModel ? (
              <div className="text-center py-8">
                <div className="animate-pulse flex justify-center mb-4">
                  <Brain className="h-12 w-12 text-purple-600" />
                </div>
                <p className="text-gray-600 font-medium">Loading CNN Model...</p>
                <p className="text-sm text-gray-500 mt-2">Mempersiapkan neural network</p>
              </div>
            ) : isAnalyzing ? (
              <div className="text-center py-8">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                  <Zap className="absolute top-3 left-1/2 transform -translate-x-1/2 h-6 w-6 text-purple-600" />
                </div>
                <p className="text-gray-600 font-medium">Menganalisis dengan CNN...</p>
                <p className="text-sm text-gray-500 mt-2">Deep learning sedang memproses gambar</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">
                      Hasil Analisis CNN
                    </h4>
                    <div className="ml-auto flex items-center text-sm text-purple-600">
                      <Brain className="h-4 w-4 mr-1" />
                      Neural Network
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ras Kucing</p>
                      <p className="text-2xl font-bold text-purple-700">{result.breed.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Confidence Score</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold text-blue-600">{result.breed.confidence}%</p>
                        <div className="ml-3 flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                            style={{ width: `${result.breed.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Deskripsi:</p>
                    <p className="text-gray-700 text-sm bg-white/50 rounded p-3">{result.breed.description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Karakteristik Utama:</p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      {result.breed.characteristics.map((char: string, index: number) => (
                        <li key={index} className="text-sm">{char}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Alternative Results */}
                {result.alternatives.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-3">Kemungkinan Lain:</h5>
                    <div className="space-y-2">
                      {result.alternatives.map((alt, index) => (
                        <div key={index} className="flex justify-between items-center bg-white rounded p-3">
                          <span className="font-medium text-gray-700">{alt.name}</span>
                          <span className="text-sm text-gray-500">{alt.confidence}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
