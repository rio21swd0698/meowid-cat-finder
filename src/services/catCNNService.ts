
import * as tf from '@tensorflow/tfjs';

export interface CatBreed {
  name: string;
  confidence: number;
  characteristics: string[];
  description: string;
}

export interface CNNResult {
  breed: CatBreed;
  alternatives: CatBreed[];
}

class CatCNNService {
  private model: tf.LayersModel | null = null;
  private isModelLoaded = false;

  // Daftar ras kucing yang didukung
  private readonly CAT_BREEDS = [
    {
      name: 'Persian',
      characteristics: ['Bulu panjang dan lebat', 'Wajah datar', 'Mata besar dan bulat'],
      description: 'Kucing berbulu panjang dengan wajah datar khas dan temperamen tenang'
    },
    {
      name: 'Maine Coon',
      characteristics: ['Ukuran besar', 'Bulu panjang', 'Ekor lebat'],
      description: 'Salah satu ras kucing terbesar dengan bulu panjang dan ekor lebat'
    },
    {
      name: 'Siamese',
      characteristics: ['Tubuh ramping', 'Mata biru', 'Point coloration'],
      description: 'Kucing dengan tubuh ramping, mata biru, dan pola warna point'
    },
    {
      name: 'British Shorthair',
      characteristics: ['Tubuh bulat', 'Bulu pendek tebal', 'Wajah bulat'],
      description: 'Kucing dengan tubuh bulat, bulu pendek tebal, dan wajah yang bulat'
    },
    {
      name: 'Ragdoll',
      characteristics: ['Ukuran besar', 'Bulu semi-panjang', 'Mata biru'],
      description: 'Kucing besar dengan bulu semi-panjang dan temperamen yang sangat jinak'
    },
    {
      name: 'Domestic Shorthair',
      characteristics: ['Bulu pendek', 'Variasi warna beragam', 'Tubuh sedang'],
      description: 'Kucing domestik dengan bulu pendek dan variasi warna yang beragam'
    }
  ];

  async loadModel(modelUrl?: string): Promise<boolean> {
    try {
      console.log('Loading CNN model...');
      
      if (modelUrl) {
        // Load model custom yang sudah dilatih
        this.model = await tf.loadLayersModel(modelUrl);
      } else {
        // Buat model sederhana untuk demo (dalam praktik, gunakan model yang sudah dilatih)
        this.model = this.createDemoModel();
      }
      
      this.isModelLoaded = true;
      console.log('CNN model loaded successfully');
      return true;
    } catch (error) {
      console.error('Failed to load CNN model:', error);
      return false;
    }
  }

  private createDemoModel(): tf.LayersModel {
    // Model CNN sederhana untuk demo
    // Dalam praktik, gunakan model yang sudah dilatih dengan dataset ras kucing
    const model = tf.sequential({
      layers: [
        tf.layers.conv2d({
          inputShape: [224, 224, 3],
          filters: 32,
          kernelSize: 3,
          activation: 'relu'
        }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: 'relu' }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.conv2d({ filters: 128, kernelSize: 3, activation: 'relu' }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.flatten(),
        tf.layers.dense({ units: 128, activation: 'relu' }),
        tf.layers.dropout({ rate: 0.5 }),
        tf.layers.dense({ units: this.CAT_BREEDS.length, activation: 'softmax' })
      ]
    });

    // Compile model
    model.compile({
      optimizer: 'adam',
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy']
    });

    return model;
  }

  private preprocessImage(imageElement: HTMLImageElement): tf.Tensor {
    // Preprocessing gambar untuk model CNN
    return tf.tidy(() => {
      // Convert ke tensor
      let tensor = tf.browser.fromPixels(imageElement);
      
      // Resize ke 224x224 (standar untuk banyak model CNN)
      tensor = tf.image.resizeBilinear(tensor, [224, 224]);
      
      // Normalize pixel values ke [0, 1]
      tensor = tensor.div(255.0);
      
      // Add batch dimension
      tensor = tensor.expandDims(0);
      
      return tensor;
    });
  }

  async analyzeImage(imageData: string): Promise<CNNResult> {
    if (!this.isModelLoaded) {
      await this.loadModel();
    }

    if (!this.model) {
      throw new Error('Model not loaded');
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = async () => {
        try {
          console.log('Preprocessing image for CNN...');
          const preprocessed = this.preprocessImage(img);
          
          console.log('Running CNN prediction...');
          const predictions = this.model!.predict(preprocessed) as tf.Tensor;
          const probabilities = await predictions.data();
          
          // Clean up tensors
          preprocessed.dispose();
          predictions.dispose();
          
          // Konversi hasil prediksi ke format yang mudah dibaca
          const results = Array.from(probabilities).map((prob, index) => ({
            breed: this.CAT_BREEDS[index],
            confidence: Math.round(prob * 100)
          }));
          
          // Sort berdasarkan confidence
          results.sort((a, b) => b.confidence - a.confidence);
          
          const result: CNNResult = {
            breed: {
              name: results[0].breed.name,
              confidence: results[0].confidence,
              characteristics: results[0].breed.characteristics,
              description: results[0].breed.description
            },
            alternatives: results.slice(1, 3).map(r => ({
              name: r.breed.name,
              confidence: r.confidence,
              characteristics: r.breed.characteristics,
              description: r.breed.description
            }))
          };
          
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageData;
    });
  }

  async validateCatImage(imageData: string): Promise<boolean> {
    // Simulasi validasi menggunakan model detection
    // Dalam praktik, gunakan model object detection untuk mendeteksi kucing
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Simulasi: analisis sederhana berdasarkan aspek ratio dan ukuran
        const aspectRatio = img.width / img.height;
        const isValidSize = img.width >= 100 && img.height >= 100;
        const isValidAspectRatio = aspectRatio > 0.5 && aspectRatio < 2.0;
        
        // Simulasi deteksi dengan probabilitas tinggi untuk demo
        const hasValidCharacteristics = isValidSize && isValidAspectRatio;
        const randomFactor = Math.random() > 0.1; // 90% success rate untuk demo
        
        resolve(hasValidCharacteristics && randomFactor);
      };
      
      img.onerror = () => resolve(false);
      img.src = imageData;
    });
  }
}

export const catCNNService = new CatCNNService();
