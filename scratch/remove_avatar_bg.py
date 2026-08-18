from PIL import Image
import numpy as np

def remove_bg(input_p, output_p):
    img = Image.open(input_p).convert("RGBA")
    data = np.array(img)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    white_mask = (r > 220) & (g > 220) & (b > 220)
    data[white_mask, 3] = 0
    result = Image.fromarray(data)
    result.save(output_p, "PNG")

remove_bg(r"C:\Users\vijay\.gemini\antigravity-ide\brain\924d9a78-53f8-4c84-8b1d-c2ac9c1a974d\profile_3d_avatar_1787077171478.jpg", r"C:\Users\vijay\Downloads\personal\Portfolio\public\avatar_pixar.png")
remove_bg(r"C:\Users\vijay\.gemini\antigravity-ide\brain\924d9a78-53f8-4c84-8b1d-c2ac9c1a974d\profile_3d_cyberpunk_1787077197079.jpg", r"C:\Users\vijay\Downloads\personal\Portfolio\public\avatar_cyber.png")
print("Transparent avatars created.")
