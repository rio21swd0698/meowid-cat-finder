
import os
import shutil
import random
from pathlib import Path

def organize_dataset(source_dir, output_dir, train_ratio=0.7, val_ratio=0.2, test_ratio=0.1):
    """
    Mengorganisasi dataset menjadi struktur train/validation/test
    
    Args:
        source_dir: Folder sumber yang berisi subfolder untuk setiap kelas
        output_dir: Folder output untuk dataset yang terorganisir
        train_ratio: Rasio data untuk training (default: 0.7)
        val_ratio: Rasio data untuk validation (default: 0.2)
        test_ratio: Rasio data untuk testing (default: 0.1)
    """
    
    # Pastikan rasio total = 1.0
    assert abs(train_ratio + val_ratio + test_ratio - 1.0) < 0.001, "Total rasio harus = 1.0"
    
    # Buat struktur folder output
    splits = ['train', 'validation', 'test']
    class_names = [
        'Persian',
        'Maine_Coon', 
        'Siamese',
        'British_Shorthair',
        'Ragdoll',
        'Domestic_Shorthair'
    ]
    
    for split in splits:
        for class_name in class_names:
            Path(os.path.join(output_dir, split, class_name)).mkdir(parents=True, exist_ok=True)
    
    print(f"Mengorganisasi dataset dari: {source_dir}")
    print(f"Output ke: {output_dir}")
    print(f"Rasio - Train: {train_ratio}, Val: {val_ratio}, Test: {test_ratio}")
    
    total_images = 0
    
    # Proses setiap kelas
    for class_name in class_names:
        class_source_dir = os.path.join(source_dir, class_name)
        
        if not os.path.exists(class_source_dir):
            print(f"Warning: Folder {class_source_dir} tidak ditemukan, skip...")
            continue
        
        # Ambil semua file gambar
        image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff']
        images = []
        
        for ext in image_extensions:
            images.extend(Path(class_source_dir).glob(f"*{ext}"))
            images.extend(Path(class_source_dir).glob(f"*{ext.upper()}"))
        
        if len(images) == 0:
            print(f"Warning: Tidak ada gambar ditemukan di {class_source_dir}")
            continue
        
        # Shuffle images
        random.shuffle(images)
        
        # Hitung pembagian
        n_train = int(len(images) * train_ratio)
        n_val = int(len(images) * val_ratio)
        n_test = len(images) - n_train - n_val
        
        # Split images
        train_images = images[:n_train]
        val_images = images[n_train:n_train + n_val]
        test_images = images[n_train + n_val:]
        
        # Copy files
        def copy_images(image_list, split_name):
            for img_path in image_list:
                dest_path = os.path.join(output_dir, split_name, class_name, img_path.name)
                shutil.copy2(img_path, dest_path)
        
        copy_images(train_images, 'train')
        copy_images(val_images, 'validation')
        copy_images(test_images, 'test')
        
        total_images += len(images)
        
        print(f"{class_name}: {len(images)} gambar -> Train: {len(train_images)}, Val: {len(val_images)}, Test: {len(test_images)}")
    
    print(f"\nTotal: {total_images} gambar telah diorganisir")
    print(f"Dataset siap untuk training!")

def create_sample_structure():
    """
    Membuat contoh struktur folder untuk dataset
    """
    print("\nContoh struktur folder yang diharapkan:")
    print("""
    raw_dataset/  (folder sumber Anda)
    ├── Persian/
    │   ├── persian_cat_1.jpg
    │   ├── persian_cat_2.jpg
    │   └── ...
    ├── Maine_Coon/
    │   ├── maine_coon_1.jpg
    │   ├── maine_coon_2.jpg
    │   └── ...
    ├── Siamese/
    ├── British_Shorthair/
    ├── Ragdoll/
    └── Domestic_Shorthair/
    
    Setelah diproses akan menjadi:
    
    dataset/  (output)
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
    └── test/
        ├── Persian/
        ├── Maine_Coon/
        ├── Siamese/
        ├── British_Shorthair/
        ├── Ragdoll/
        └── Domestic_Shorthair/
    """)

if __name__ == "__main__":
    # Set random seed
    random.seed(42)
    
    # Konfigurasi path - sesuaikan dengan lokasi dataset Anda
    source_directory = "raw_dataset"  # Folder sumber dengan struktur: class_name/images
    output_directory = "dataset"      # Folder output yang terorganisir
    
    if not os.path.exists(source_directory):
        print(f"Error: Source directory '{source_directory}' tidak ditemukan!")
        create_sample_structure()
        print(f"\nBuat folder '{source_directory}' dan atur gambar sesuai struktur di atas,")
        print("kemudian jalankan script ini lagi.")
    else:
        organize_dataset(
            source_dir=source_directory,
            output_dir=output_directory,
            train_ratio=0.7,  # 70% untuk training
            val_ratio=0.2,    # 20% untuk validation  
            test_ratio=0.1    # 10% untuk testing
        )
        
        print(f"\nDataset telah diorganisir di folder: {output_directory}")
        print("Sekarang Anda bisa menjalankan: python train_cat_cnn.py")
