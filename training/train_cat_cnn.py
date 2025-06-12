
import tensorflow as tf
from tensorflow.keras import layers, models, optimizers, callbacks
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import matplotlib.pyplot as plt
import os
import json
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns

# Konfigurasi
IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 50
NUM_CLASSES = 6
LEARNING_RATE = 0.001

# Nama kelas sesuai dengan aplikasi
CLASS_NAMES = [
    'Persian',
    'Maine_Coon', 
    'Siamese',
    'British_Shorthair',
    'Ragdoll',
    'Domestic_Shorthair'
]

def create_data_generators(train_dir, val_dir, test_dir=None):
    """
    Membuat data generator dengan augmentasi untuk training dan validasi
    
    Struktur folder yang diharapkan:
    dataset/
    ├── train/
    │   ├── Persian/
    │   ├── Maine_Coon/
    │   ├── Siamese/
    │   ├── British_Shorthair/
    │   ├── Ragdoll/
    │   └── Domestic_Shorthair/
    ├── validation/
    │   ├── Persian/
    │   ├── Maine_Coon/
    │   ├── Siamese/
    │   ├── British_Shorthair/
    │   ├── Ragdoll/
    │   └── Domestic_Shorthair/
    └── test/ (optional)
        ├── Persian/
        ├── Maine_Coon/
        ├── Siamese/
        ├── British_Shorthair/
        ├── Ragdoll/
        └── Domestic_Shorthair/
    """
    
    # Data augmentation untuk training
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        brightness_range=[0.8, 1.2],
        fill_mode='nearest'
    )
    
    # Hanya rescaling untuk validasi
    val_datagen = ImageDataGenerator(rescale=1./255)
    
    # Training generator
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        classes=CLASS_NAMES,
        shuffle=True
    )
    
    # Validation generator
    val_generator = val_datagen.flow_from_directory(
        val_dir,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        classes=CLASS_NAMES,
        shuffle=False
    )
    
    # Test generator (optional)
    test_generator = None
    if test_dir and os.path.exists(test_dir):
        test_generator = val_datagen.flow_from_directory(
            test_dir,
            target_size=IMG_SIZE,
            batch_size=BATCH_SIZE,
            class_mode='categorical',
            classes=CLASS_NAMES,
            shuffle=False
        )
    
    return train_generator, val_generator, test_generator

def create_cnn_model():
    """
    Membuat arsitektur CNN untuk klasifikasi ras kucing
    """
    model = models.Sequential([
        # Blok konvolusi 1
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Blok konvolusi 2
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Blok konvolusi 3
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Blok konvolusi 4
        layers.Conv2D(256, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Blok konvolusi 5
        layers.Conv2D(512, (3, 3), activation='relu'),
        layers.BatchNormalization(),
        layers.GlobalAveragePooling2D(),
        
        # Fully connected layers
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        
        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        
        # Output layer
        layers.Dense(NUM_CLASSES, activation='softmax')
    ])
    
    return model

def create_transfer_learning_model():
    """
    Membuat model menggunakan transfer learning dengan MobileNetV2
    """
    # Load pre-trained MobileNetV2
    base_model = tf.keras.applications.MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )
    
    # Freeze base model
    base_model.trainable = False
    
    # Add custom classification head
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.3),
        layers.Dense(NUM_CLASSES, activation='softmax')
    ])
    
    return model

def plot_training_history(history, save_path='training_history.png'):
    """
    Plot training history
    """
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
    
    # Plot accuracy
    ax1.plot(history.history['accuracy'], label='Training Accuracy')
    ax1.plot(history.history['val_accuracy'], label='Validation Accuracy')
    ax1.set_title('Model Accuracy')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Accuracy')
    ax1.legend()
    
    # Plot loss
    ax2.plot(history.history['loss'], label='Training Loss')
    ax2.plot(history.history['val_loss'], label='Validation Loss')
    ax2.set_title('Model Loss')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Loss')
    ax2.legend()
    
    plt.tight_layout()
    plt.savefig(save_path)
    plt.show()

def evaluate_model(model, test_generator):
    """
    Evaluasi model dan buat confusion matrix
    """
    # Prediksi
    predictions = model.predict(test_generator)
    predicted_classes = np.argmax(predictions, axis=1)
    true_classes = test_generator.classes
    
    # Classification report
    print("Classification Report:")
    print(classification_report(true_classes, predicted_classes, target_names=CLASS_NAMES))
    
    # Confusion matrix
    cm = confusion_matrix(true_classes, predicted_classes)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=CLASS_NAMES, yticklabels=CLASS_NAMES)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.xticks(rotation=45)
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.savefig('confusion_matrix.png')
    plt.show()
    
    return predictions, predicted_classes

def main():
    """
    Main training function
    """
    print("=== CAT BREED CNN TRAINING ===")
    print(f"Classes: {CLASS_NAMES}")
    print(f"Image size: {IMG_SIZE}")
    print(f"Batch size: {BATCH_SIZE}")
    print(f"Epochs: {EPOCHS}")
    
    # Paths - sesuaikan dengan struktur folder Anda
    train_dir = 'dataset/train'
    val_dir = 'dataset/validation'
    test_dir = 'dataset/test'  # Optional
    
    # Cek apakah folder ada
    if not os.path.exists(train_dir):
        print(f"Error: Training directory '{train_dir}' tidak ditemukan!")
        print("Silakan buat struktur folder sesuai dengan komentar di fungsi create_data_generators()")
        return
    
    if not os.path.exists(val_dir):
        print(f"Error: Validation directory '{val_dir}' tidak ditemukan!")
        return
    
    # Buat data generators
    print("\n1. Loading and preprocessing data...")
    train_gen, val_gen, test_gen = create_data_generators(train_dir, val_dir, test_dir)
    
    print(f"Training samples: {train_gen.samples}")
    print(f"Validation samples: {val_gen.samples}")
    if test_gen:
        print(f"Test samples: {test_gen.samples}")
    
    # Pilih model - ubah ke create_cnn_model() jika ingin model custom
    print("\n2. Creating model...")
    model = create_transfer_learning_model()  # Atau create_cnn_model()
    
    # Compile model
    model.compile(
        optimizer=optimizers.Adam(learning_rate=LEARNING_RATE),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    print("\n3. Model Summary:")
    model.summary()
    
    # Callbacks
    callbacks_list = [
        callbacks.ModelCheckpoint(
            'best_cat_model.h5',
            monitor='val_accuracy',
            save_best_only=True,
            verbose=1
        ),
        callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.2,
            patience=5,
            min_lr=0.0001,
            verbose=1
        ),
        callbacks.EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True,
            verbose=1
        )
    ]
    
    # Training
    print("\n4. Starting training...")
    history = model.fit(
        train_gen,
        steps_per_epoch=train_gen.samples // BATCH_SIZE,
        epochs=EPOCHS,
        validation_data=val_gen,
        validation_steps=val_gen.samples // BATCH_SIZE,
        callbacks=callbacks_list,
        verbose=1
    )
    
    # Save final model
    model.save('cat_breed_model_final.h5')
    
    # Save training history
    with open('training_history.json', 'w') as f:
        json.dump(history.history, f)
    
    # Plot training history
    print("\n5. Plotting training history...")
    plot_training_history(history)
    
    # Evaluate on test set if available
    if test_gen:
        print("\n6. Evaluating on test set...")
        test_loss, test_accuracy = model.evaluate(test_gen, verbose=1)
        print(f"Test accuracy: {test_accuracy:.4f}")
        
        # Detailed evaluation
        predictions, predicted_classes = evaluate_model(model, test_gen)
    
    print("\n=== TRAINING COMPLETED ===")
    print("Model saved as: best_cat_model.h5 dan cat_breed_model_final.h5")
    print("Gunakan best_cat_model.h5 untuk hasil terbaik")

if __name__ == "__main__":
    # Set random seeds untuk reproducibility
    np.random.seed(42)
    tf.random.set_seed(42)
    
    # Enable mixed precision untuk training lebih cepat (optional)
    # tf.keras.mixed_precision.set_global_policy('mixed_float16')
    
    main()
