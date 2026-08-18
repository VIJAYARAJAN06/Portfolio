from PIL import Image
import numpy as np

def remove_white_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)

    # RGB values
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

    # Mask white background pixels (near white)
    # Threshold for white background: R > 230, G > 230, B > 230
    white_mask = (r > 230) & (g > 230) & (b > 230)

    # Set alpha to 0 for white background
    data[white_mask, 3] = 0

    # Soft alpha edge smoothing for smooth boundary
    near_white_mask = (r > 210) & (g > 210) & (b > 210) & (~white_mask)
    # Calculate transparency fade
    avg_rgb = (r[near_white_mask].astype(float) + g[near_white_mask].astype(float) + b[near_white_mask].astype(float)) / 3.0
    alpha_fade = np.clip((255 - avg_rgb) / (255 - 210) * 255, 0, 255).astype(np.uint8)
    data[near_white_mask, 3] = alpha_fade

    result_img = Image.fromarray(data)
    result_img.save(output_path, "PNG")
    print(f"Successfully processed and saved transparent PNG to {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\vijay\Downloads\personal\Portfolio\public\profile.jpg"
    output_file = r"C:\Users\vijay\Downloads\personal\Portfolio\public\profile.png"
    remove_white_background(input_file, output_file)
