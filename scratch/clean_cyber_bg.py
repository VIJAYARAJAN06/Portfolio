from PIL import Image
import numpy as np

def clean_remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Precise light grey / white background detection logic for 3D Cyber render
    # Background pixels are bright off-white / light grey (R > 215, G > 215, B > 215)
    bg_mask = (r > 215) & (g > 215) & (b > 215)
    
    # Make background pixels transparent
    data[bg_mask, 3] = 0
    
    # Feather edge pixels for smooth antialiasing blending
    edge_mask = (r > 195) & (g > 195) & (b > 195) & (~bg_mask)
    avg_rgb = (r[edge_mask].astype(float) + g[edge_mask].astype(float) + b[edge_mask].astype(float)) / 3.0
    alpha_fade = np.clip((215 - avg_rgb) / (215 - 195) * 255, 0, 255).astype(np.uint8)
    data[edge_mask, 3] = alpha_fade

    result = Image.fromarray(data)
    result.save(output_path, "PNG")
    print("Clean transparent Cyberpunk avatar saved to", output_path)

if __name__ == "__main__":
    input_file = r"C:\Users\vijay\.gemini\antigravity-ide\brain\924d9a78-53f8-4c84-8b1d-c2ac9c1a974d\profile_3d_cyberpunk_1787077197079.jpg"
    output_file = r"C:\Users\vijay\Downloads\personal\Portfolio\public\profile.png"
    clean_remove_background(input_file, output_file)
