
# Cat Breed CNN Training

Script untuk melatih model CNN untuk klasifikasi 6 ras kucing: Persian, Maine Coon, Siamese, British Shorthair, Ragdoll, dan Domestic Shorthair.

## Setup

1. **Install dependencies:**
```bash
pip install -r requirements.txt
pip install tensorflowjs  # untuk konversi ke TensorFlow.js
```

2. **Persiapkan dataset:**

Buat struktur folder seperti ini:
```
raw_dataset/
├── Persian/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── ...
├── Maine_Coon/
├── Siamese/
├── British_Shorthair/
├── Ragdoll/
└── Domestic_Shorthair/
```

3. **Organisir dataset:**
```bash
python data_preparation.py
```

4. **Training model:**
```bash
python train_cat_cnn.py
```

5. **Convert ke TensorFlow.js:**
```bash
python convert_to_tfjs.py
```

## Tips Dataset

- **Minimum 100 gambar per kelas** untuk hasil yang baik
- **500+ gambar per kelas** untuk hasil optimal
- Resolusi gambar: minimal 224x224px
- Format: JPG, PNG
- Variasi pencahayaan, pose, dan latar belakang

## Model Options

### 1. Custom CNN (`create_cnn_model()`)
- Model dari scratch
- Cocok untuk dataset besar
- Training lebih lama

### 2. Transfer Learning (`create_transfer_learning_model()`)
- Menggunakan MobileNetV2 pre-trained
- **DIREKOMENDASIKAN** untuk dataset kecil-menengah
- Training lebih cepat
- Akurasi lebih baik dengan data terbatas

## Hasil Training

File yang dihasilkan:
- `best_cat_model.h5` - Model terbaik (gunakan ini)
- `cat_breed_model_final.h5` - Model akhir
- `training_history.json` - History training
- `training_history.png` - Plot akurasi dan loss
- `confusion_matrix.png` - Confusion matrix
- `tfjs_cat_model/` - Model dalam format TensorFlow.js

## Integrasi ke Web App

1. Copy folder `tfjs_cat_model/` ke `public/models/` di React project
2. Update `catCNNService.ts`:

```typescript
// Ganti di loadModel()
const modelUrl = '/models/tfjs_cat_model/model.json';
this.model = await tf.loadLayersModel(modelUrl);
```

## Parameters yang bisa disesuaikan

Di `train_cat_cnn.py`:
- `IMG_SIZE` - ukuran input gambar
- `BATCH_SIZE` - batch size training
- `EPOCHS` - jumlah epoch
- `LEARNING_RATE` - learning rate

## Monitoring Training

Training akan berhenti otomatis jika:
- Akurasi validasi tidak meningkat selama 10 epoch (early stopping)
- Learning rate akan dikurangi jika loss tidak turun

## Troubleshooting

**Out of Memory:**
- Kurangi `BATCH_SIZE` menjadi 16 atau 8
- Gunakan `tf.keras.mixed_precision.set_global_policy('mixed_float16')`

**Akurasi rendah:**
- Tambah lebih banyak data
- Cek kualitas labeling
- Gunakan transfer learning
- Tambah epoch training

**Overfitting:**
- Tambah dropout
- Gunakan data augmentation lebih agresif
- Kurangi kompleksitas model
