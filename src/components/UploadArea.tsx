
import React, { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertCircle } from 'lucide-react';

const UploadArea = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateCatImage = async (imageData: string): Promise<boolean> => {
    // Simulasi validasi AI untuk mendeteksi kucing
    // Dalam implementasi nyata, ini akan menggunakan model AI seperti TensorFlow.js
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulasi: 85% kemungkinan gambar valid sebagai kucing
        const isValid = Math.random() > 0.15;
        resolve(isValid);
      }, 1500);
    });
  };

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
        
        // Validasi apakah gambar mengandung kucing
        setIsValidating(true);
        const isValidCat = await validateCatImage(imageData);
        setIsValidating(false);
        
        if (isValidCat) {
          simulateAnalysis();
        } else {
          setValidationError("Gambar yang diupload bukan foto kucing. Silakan upload foto kucing yang jelas.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        breed: 'Persian',
        confidence: 87,
        characteristics: ['Bulu panjang dan lebat', 'Wajah datar', 'Mata besar dan bulat']
      });
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setResult(null);
    setIsAnalyzing(false);
    setValidationError(null);
    setIsValidating(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Identifikasi Ras Kucing Anda
        </h2>
        <p className="text-gray-600">
          Unggah foto kucing Anda dan kami akan mengidentifikasi rasnya menggunakan AI
        </p>
        <p className="text-sm text-orange-600 mt-2 font-medium">
          ⚠️ Pastikan foto yang diupload adalah foto kucing yang jelas
        </p>
      </div>

      {!uploadedImage ? (
        <div className="border-2 border-dashed border-purple-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-200 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="mb-4">
            <Camera className="mx-auto h-12 w-12 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Pilih foto kucing Anda
          </h3>
          <p className="text-gray-500 mb-4">
            Drag & drop atau klik untuk memilih file
          </p>
          <label className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Upload className="mr-2 h-5 w-5" />
            Pilih Gambar
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <p className="text-sm text-gray-400 mt-2">
            PNG, JPG hingga 10MB - Hanya foto kucing
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Foto yang diunggah
              </h3>
              <button
                onClick={resetUpload}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Unggah lagi
              </button>
            </div>
            
            <div className="mb-6">
              <img
                src={uploadedImage}
                alt="Uploaded cat"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            {isValidating ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memvalidasi gambar kucing...</p>
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
                  Coba Upload Lagi
                </button>
              </div>
            ) : isAnalyzing ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Sedang menganalisis gambar...</p>
              </div>
            ) : result ? (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-800">
                    Hasil Identifikasi
                  </h4>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ras Kucing</p>
                    <p className="text-xl font-bold text-purple-700">{result.breed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tingkat Kepercayaan</p>
                    <p className="text-xl font-bold text-blue-600">{result.confidence}%</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Karakteristik:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {result.characteristics.map((char: string, index: number) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArea;
