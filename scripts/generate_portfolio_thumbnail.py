import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

def create_radial_gradient(width, height, center, radius, inner_color, outer_color):
    """Create a 2D radial gradient image."""
    base = Image.new("RGBA", (width, height), outer_color)
    # Fast radial gradient via smaller canvas then bicubic upscale
    gw, gh = width // 4, height // 4
    grad_small = Image.new("RGBA", (gw, gh), outer_color)
    cx, cy = center[0] / 4, center[1] / 4
    r = radius / 4
    
    # Draw radial rings
    draw = ImageDraw.Draw(grad_small)
    steps = 40
    for i in range(steps, 0, -1):
        cur_r = r * (i / steps)
        factor = i / steps
        # lerp color
        c = (
            int(inner_color[0] + (outer_color[0] - inner_color[0]) * factor),
            int(inner_color[1] + (outer_color[1] - inner_color[1]) * factor),
            int(inner_color[2] + (outer_color[2] - inner_color[2]) * factor),
            int(inner_color[3] + (outer_color[3] - inner_color[3]) * factor),
        )
        draw.ellipse([cx - cur_r, cy - cur_r, cx + cur_r, cy + cur_r], fill=c)
        
    grad = grad_small.resize((width, height), Image.Resampling.BICUBIC)
    grad = grad.filter(ImageFilter.GaussianBlur(radius=30))
    return grad

def add_drop_shadow(canvas, box, radius=35, offset=(0, 25), shadow_color=(0, 0, 0, 160)):
    """Draw a soft drop shadow behind a bounding box."""
    x1, y1, x2, y2 = box
    w = x2 - x1 + radius * 4
    h = y2 - y1 + radius * 4
    s_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(s_img)
    bx1 = radius * 2
    by1 = radius * 2
    bx2 = bx1 + (x2 - x1)
    by2 = by1 + (y2 - y1)
    s_draw.rounded_rectangle([bx1, by1, bx2, by2], radius=radius // 2, fill=shadow_color)
    s_blur = s_img.filter(ImageFilter.GaussianBlur(radius=radius))
    
    paste_x = x1 - radius * 2 + offset[0]
    paste_y = y1 - radius * 2 + offset[1]
    canvas.alpha_composite(s_blur, (paste_x, paste_y))

def render_macbook_pro(screen_img, target_width=1280):
    """Renders a sleek modern MacBook Pro frame around the screen image."""
    # MacBook Pro 16:10 aspect
    aspect = screen_img.width / screen_img.height
    screen_w = target_width
    screen_h = int(screen_w / aspect)
    
    bezel_h = 24
    bezel_v = 24
    top_bezel = 32
    bottom_bezel = 32
    
    lid_w = screen_w + bezel_h * 2
    lid_h = screen_h + top_bezel + bottom_bezel
    
    # Lid housing
    lid = Image.new("RGBA", (lid_w, lid_h + 30), (0, 0, 0, 0))
    draw = ImageDraw.Draw(lid)
    
    # Outer dark titanium bezel
    draw.rounded_rectangle([0, 0, lid_w, lid_h], radius=22, fill=(26, 31, 40, 255), outline=(55, 65, 81, 255), width=2)
    
    # Inner display glass border
    draw.rounded_rectangle([bezel_h - 2, top_bezel - 2, bezel_h + screen_w + 2, top_bezel + screen_h + 2], radius=10, fill=(10, 14, 20, 255))
    
    # Camera notch in top bezel
    notch_w = 120
    notch_h = 16
    notch_x = (lid_w - notch_w) // 2
    draw.rounded_rectangle([notch_x, top_bezel - 16, notch_x + notch_w, top_bezel], radius=6, fill=(15, 23, 42, 255))
    draw.ellipse([lid_w // 2 - 3, top_bezel - 12, lid_w // 2 + 3, top_bezel - 6], fill=(5, 150, 105, 255)) # Green indicator LED
    
    # Paste screen image with rounded mask
    resized_screen = screen_img.resize((screen_w, screen_h), Image.Resampling.LANCZOS).convert("RGBA")
    mask = Image.new("L", (screen_w, screen_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=8, fill=255)
    lid.paste(resized_screen, (bezel_h, top_bezel), mask)
    
    # Screen glass subtle specular gloss reflection
    gloss = Image.new("RGBA", (screen_w, screen_h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gloss)
    points = [(0, 0), (screen_w // 3, 0), (0, screen_h // 2)]
    g_draw.polygon(points, fill=(255, 255, 255, 12))
    lid.paste(gloss, (bezel_h, top_bezel), gloss)
    
    # Bottom Base / Keyboard Chassis
    base_w = lid_w + 80
    base_h = 24
    base_x = (base_w - lid_w) // 2
    
    full_laptop = Image.new("RGBA", (base_w, lid_h + base_h + 10), (0, 0, 0, 0))
    full_laptop.paste(lid, (base_x, 0), lid)
    
    f_draw = ImageDraw.Draw(full_laptop)
    # Base top lip
    f_draw.rounded_rectangle([0, lid_h - 2, base_w, lid_h + base_h], radius=8, fill=(40, 46, 58, 255), outline=(75, 85, 99, 255), width=1)
    # Notch thumb indent
    notch_indent_w = 110
    ni_x = (base_w - notch_indent_w) // 2
    f_draw.rounded_rectangle([ni_x, lid_h - 1, ni_x + notch_indent_w, lid_h + 7], radius=4, fill=(18, 24, 38, 255))
    
    # Highlight reflection along base edge
    f_draw.line([(6, lid_h - 1), (base_w - 6, lid_h - 1)], fill=(156, 163, 175, 180), width=1)
    
    return full_laptop

def render_ipad_pro(screen_img, target_height=780):
    """Renders a sleek iPad Pro frame around the tablet screen image."""
    aspect = screen_img.width / screen_img.height
    screen_h = target_height
    screen_w = int(screen_h * aspect)
    
    bezel = 22
    body_w = screen_w + bezel * 2
    body_h = screen_h + bezel * 2
    
    ipad = Image.new("RGBA", (body_w, body_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(ipad)
    
    # Outer aerospace aluminum body
    draw.rounded_rectangle([0, 0, body_w, body_h], radius=32, fill=(24, 28, 36, 255), outline=(75, 85, 99, 255), width=2)
    # Inner glass border
    draw.rounded_rectangle([bezel - 2, bezel - 2, bezel + screen_w + 2, bezel + screen_h + 2], radius=18, fill=(10, 14, 20, 255))
    
    # Front selfie camera & sensors
    draw.ellipse([body_w // 2 - 4, bezel // 2 - 4, body_w // 2 + 4, bezel // 2 + 4], fill=(15, 23, 42, 255), outline=(55, 65, 81, 255), width=1)
    
    # Paste tablet screen
    resized_screen = screen_img.resize((screen_w, screen_h), Image.Resampling.LANCZOS).convert("RGBA")
    mask = Image.new("L", (screen_w, screen_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=16, fill=255)
    ipad.paste(resized_screen, (bezel, bezel), mask)
    
    # Tablet gloss
    gloss = Image.new("RGBA", (screen_w, screen_h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gloss)
    g_draw.polygon([(0, 0), (screen_w // 2, 0), (0, screen_h // 2)], fill=(255, 255, 255, 10))
    ipad.paste(gloss, (bezel, bezel), gloss)
    
    return ipad

def render_iphone_15_pro(screen_img, target_height=650):
    """Renders a sleek iPhone 15 Pro titanium frame with Dynamic Island."""
    aspect = screen_img.width / screen_img.height
    screen_h = target_height
    screen_w = int(screen_h * aspect)
    
    bezel = 16
    body_w = screen_w + bezel * 2
    body_h = screen_h + bezel * 2
    
    iphone = Image.new("RGBA", (body_w, body_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(iphone)
    
    # Titanium curved frame
    draw.rounded_rectangle([0, 0, body_w, body_h], radius=42, fill=(30, 35, 45, 255), outline=(100, 116, 139, 255), width=2)
    # Inner display rim
    draw.rounded_rectangle([bezel - 2, bezel - 2, bezel + screen_w + 2, bezel + screen_h + 2], radius=28, fill=(8, 12, 18, 255))
    
    # Paste mobile screen
    resized_screen = screen_img.resize((screen_w, screen_h), Image.Resampling.LANCZOS).convert("RGBA")
    mask = Image.new("L", (screen_w, screen_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=26, fill=255)
    iphone.paste(resized_screen, (bezel, bezel), mask)
    
    # Dynamic Island pill
    di_w = 90
    di_h = 24
    di_x = (body_w - di_w) // 2
    di_y = bezel + 8
    draw.rounded_rectangle([di_x, di_y, di_x + di_w, di_y + di_h], radius=12, fill=(0, 0, 0, 255))
    # Camera dot & sensor inside dynamic island
    draw.ellipse([di_x + di_w - 20, di_y + 6, di_x + di_w - 8, di_y + 18], fill=(20, 24, 33, 255))
    draw.ellipse([di_x + 12, di_y + 8, di_x + 20, di_y + 16], fill=(16, 185, 129, 255)) # Green indicator dot
    
    # Mobile gloss
    gloss = Image.new("RGBA", (screen_w, screen_h), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(gloss)
    g_draw.polygon([(0, 0), (screen_w // 2, 0), (0, screen_h // 3)], fill=(255, 255, 255, 12))
    iphone.paste(gloss, (bezel, bezel), gloss)
    
    return iphone

def build_portfolio_thumbnail():
    print("Building high-resolution multi-device portfolio thumbnail...")
    
    # Target Canvas: 3840 x 2160 (4K UHD 16:9)
    W, H = 3840, 2160
    canvas = Image.new("RGBA", (W, H), (10, 15, 24, 255)) # Deep slate obsidian
    
    # 1. Radial ambient glows
    print("Generating ambient emerald lighting...")
    # Center-bottom vibrant green mesh glow
    glow1 = create_radial_gradient(W, H, (W // 2, H // 2 + 100), 1200, (16, 185, 129, 90), (10, 15, 24, 0))
    canvas.alpha_composite(glow1)
    
    # Top-right cyan glow
    glow2 = create_radial_gradient(W, H, (W - 400, 300), 800, (6, 182, 212, 50), (10, 15, 24, 0))
    canvas.alpha_composite(glow2)
    
    # Top-left teal glow
    glow3 = create_radial_gradient(W, H, (400, 350), 900, (5, 150, 105, 50), (10, 15, 24, 0))
    canvas.alpha_composite(glow3)
    
    # Technical subtle grid pattern
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    g_draw = ImageDraw.Draw(grid)
    grid_step = 80
    for x in range(0, W, grid_step):
        g_draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 6), width=1)
    for y in range(0, H, grid_step):
        g_draw.line([(0, y), (W, y)], fill=(255, 255, 255, 6), width=1)
    canvas.alpha_composite(grid)
    
    # Load captured screen mockups
    mockup_dir = "docs/presentation/images/mockups"
    laptop_img = Image.open(os.path.join(mockup_dir, "screen_laptop.png"))
    tablet_img = Image.open(os.path.join(mockup_dir, "screen_tablet.png"))
    mobile_img = Image.open(os.path.join(mockup_dir, "screen_mobile.png"))
    
    # 2. Render Hardware Devices
    print("Rendering hardware device models...")
    # Laptop: width ~ 2050px
    macbook = render_macbook_pro(laptop_img, target_width=1900)
    # Tablet: height ~ 1250px
    ipad = render_ipad_pro(tablet_img, target_height=1250)
    # Phone: height ~ 1050px
    iphone = render_iphone_15_pro(mobile_img, target_height=1050)
    
    # 3. Position Devices
    # Center Laptop
    mb_x = (W - macbook.width) // 2
    mb_y = (H - macbook.height) // 2 + 150
    
    # Left Tablet: tilted or flanking laptop
    ipad_x = mb_x - 380
    ipad_y = mb_y + 120
    
    # Right Phone: foreground overlay overlapping laptop right corner
    phone_x = mb_x + macbook.width - 240
    phone_y = mb_y + 260
    
    # 4. Composite Drop Shadows and Devices in Depth Order:
    # Layer 1: Tablet Shadow + Tablet
    print("Compositing iPad...")
    add_drop_shadow(canvas, (ipad_x, ipad_y, ipad_x + ipad.width, ipad_y + ipad.height), radius=55, offset=(-10, 35), shadow_color=(0, 0, 0, 180))
    canvas.alpha_composite(ipad, (ipad_x, ipad_y))
    
    # Layer 2: Laptop Shadow + Laptop
    print("Compositing MacBook Pro...")
    add_drop_shadow(canvas, (mb_x, mb_y, mb_x + macbook.width, mb_y + macbook.height), radius=65, offset=(0, 45), shadow_color=(0, 0, 0, 220))
    canvas.alpha_composite(macbook, (mb_x, mb_y))
    
    # Layer 3: iPhone Shadow + iPhone (Foreground)
    print("Compositing iPhone 15 Pro...")
    add_drop_shadow(canvas, (phone_x, phone_y, phone_x + iphone.width, phone_y + iphone.height), radius=50, offset=(15, 35), shadow_color=(0, 0, 0, 240))
    canvas.alpha_composite(iphone, (phone_x, phone_y))
    
    # 5. Top Branding & Header Banner
    print("Adding portfolio header branding & metric pills...")
    draw = ImageDraw.Draw(canvas)
    
    # Load fonts
    try:
        font_title = ImageFont.truetype("arialbd.ttf", 76)
        font_subtitle = ImageFont.truetype("arial.ttf", 36)
        font_badge = ImageFont.truetype("arialbd.ttf", 28)
        font_pill = ImageFont.truetype("arialbd.ttf", 26)
    except:
        font_title = ImageFont.load_default()
        font_subtitle = ImageFont.load_default()
        font_badge = ImageFont.load_default()
        font_pill = ImageFont.load_default()
        
    # Top Tagline / Category Pill
    pill_text = "✦ AI-POWERED PHYTOPATHOLOGY & SMART PRECISION AGRONOMY ✦"
    pw = draw.textlength(pill_text, font=font_pill)
    pill_box = [(W - pw) // 2 - 30, 90, (W + pw) // 2 + 30, 150]
    draw.rounded_rectangle(pill_box, radius=30, fill=(16, 185, 129, 35), outline=(16, 185, 129, 140), width=2)
    draw.text(((W - pw) // 2, 105), pill_text, fill=(52, 211, 153, 255), font=font_pill)
    
    # Main Headline
    main_title = "KrishiDrishti — কৃষি দৃষ্টি"
    tw = draw.textlength(main_title, font=font_title)
    draw.text(((W - tw) // 2, 175), main_title, fill=(255, 255, 255, 255), font=font_title)
    
    # Subtitle
    sub_title = "Cross-Platform Smart Disease Diagnostics • 16 Crops • 50 Pathogens • Real-Time Dual Treatment"
    sw = draw.textlength(sub_title, font=font_subtitle)
    draw.text(((W - sw) // 2, 275), sub_title, fill=(156, 163, 175, 255), font=font_subtitle)
    
    # Tech Stack & Metric Pills along the bottom-left / bottom-center
    metrics = [
        ("98.2% AI Accuracy", (16, 185, 129)),
        ("< 3.0s Inference", (14, 165, 233)),
        ("Next.js 14 + Tailwind", (168, 85, 247)),
        ("FastAPI + PyTorch ConvNeXt", (249, 115, 22)),
        ("Node/Express + PostgreSQL", (59, 130, 246)),
        ("Full Mobile / Tablet Responsive", (236, 72, 153)),
    ]
    
    m_y = H - 120
    total_m_w = sum(draw.textlength(m[0], font=font_badge) + 60 for m in metrics) + (len(metrics) - 1) * 20
    cur_x = (W - total_m_w) // 2
    
    for text, color in metrics:
        mw = draw.textlength(text, font=font_badge)
        draw.rounded_rectangle([cur_x, m_y, cur_x + mw + 50, m_y + 58], radius=29, fill=(15, 23, 42, 220), outline=color + (140,), width=2)
        # Dot
        draw.ellipse([cur_x + 18, m_y + 24, cur_x + 28, m_y + 34], fill=color + (255,))
        draw.text((cur_x + 36, m_y + 14), text, fill=(241, 245, 249, 255), font=font_badge)
        cur_x += mw + 70
        
    # Save 4K UHD Master
    output_png_4k = "docs/presentation/images/portfolio_devices_thumbnail_4k.png"
    output_jpg_4k = "docs/presentation/images/portfolio_devices_thumbnail_4k.jpg"
    print(f"Saving 4K UHD thumbnail to {output_png_4k}...")
    canvas.save(output_png_4k, "PNG", quality=95)
    canvas.convert("RGB").save(output_jpg_4k, "JPEG", quality=95)
    
    # Save standard 1920x1080 Full HD version (perfect for LinkedIn, GitHub, Behance, and portfolio headers)
    output_png_fhd = "docs/presentation/images/portfolio_devices_thumbnail.png"
    output_jpg_fhd = "docs/presentation/images/portfolio_devices_thumbnail.jpg"
    print(f"Downsampling to 1080p FHD: {output_png_fhd}...")
    fhd = canvas.resize((1920, 1080), Image.Resampling.LANCZOS)
    fhd.save(output_png_fhd, "PNG", quality=95)
    fhd.convert("RGB").save(output_jpg_fhd, "JPEG", quality=95)
    
    print("Thumbnails generated successfully!")
    print(f"  - 4K PNG: {output_png_4k}")
    print(f"  - 4K JPG: {output_jpg_4k}")
    print(f"  - FHD PNG: {output_png_fhd}")
    print(f"  - FHD JPG: {output_jpg_fhd}")

if __name__ == "__main__":
    build_portfolio_thumbnail()

