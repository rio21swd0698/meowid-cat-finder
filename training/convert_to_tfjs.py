
import tensorflow as tf
import tensorflowjs as tfjs
import json
import os

def convert_model_to_tfjs(model_path, output_dir):
    """
    Convert Keras model (.h5) to TensorFlow.js format
    """
    print(f"Loading model from: {model_path}")
    
    # Load the trained model
    model = tf.keras.models.load_model(model_path)
    
    print("Model loaded successfully!")
    print("Model summary:")
    model.summary()
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Convert to TensorFlow.js
    print(f"Converting model to TensorFlow.js format...")
    print(f"Output directory: {output_dir}")
    
    tfjs.converters.save_keras_model(model, output_dir)
    
    # Create metadata file
    class_names = [
        'Persian',
        'Maine Coon', 
        'Siamese',
        'British Shorthair',
        'Ragdoll',
        'Domestic Shorthair'
    ]
    
    metadata = {
        "model_type": "cat_breed_classifier",
        "input_shape": [224, 224, 3],
        "num_classes": 6,
        "class_names": class_names,
        "preprocessing": {
            "rescale": "1/255",
            "target_size": [224, 224]
        }
    }
    
    with open(os.path.join(output_dir, 'metadata.json'), 'w') as f:
        json.dump(metadata, f, indent=2)
    
    print(f"Model successfully converted to TensorFlow.js!")
    print(f"Files created in {output_dir}:")
    for file in os.listdir(output_dir):
        print(f"  - {file}")
    
    print("\nUntuk menggunakan di web app:")
    print(f"1. Copy folder '{output_dir}' ke 'public/models/' di project React")
    print("2. Update path model di catCNNService.ts")

if __name__ == "__main__":
    # Path ke model yang sudah dilatih
    model_path = "best_cat_model.h5"  # atau "cat_breed_model_final.h5"
    output_dir = "tfjs_cat_model"
    
    if not os.path.exists(model_path):
        print(f"Error: Model file '{model_path}' tidak ditemukan!")
        print("Pastikan Anda sudah menjalankan training terlebih dahulu.")
    else:
        convert_model_to_tfjs(model_path, output_dir)
