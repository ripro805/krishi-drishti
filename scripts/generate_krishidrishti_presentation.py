import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.oxml import parse_xml

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Enterprise Dark Palette
    C_BG_DARK = RGBColor(15, 23, 42)       # Slate 900
    C_CARD_DARK = RGBColor(30, 41, 59)     # Slate 800
    C_CARD_DARKER = RGBColor(22, 30, 50)   # Slate 850
    C_CARD_BORDER = RGBColor(51, 65, 85)   # Slate 700
    C_GREEN = RGBColor(22, 163, 74)        # Emerald 600
    C_GREEN_LIGHT = RGBColor(74, 222, 128) # Emerald 400
    C_AMBER = RGBColor(245, 158, 11)       # Amber 500
    C_CYAN = RGBColor(6, 182, 212)         # Cyan 500
    C_TEXT_LIGHT = RGBColor(241, 245, 249) # Slate 100
    C_TEXT_MUTED = RGBColor(148, 163, 184) # Slate 400
    C_TEXT_WHITE = RGBColor(255, 255, 255)

    FONT_FAMILY = "Segoe UI"

    def apply_dark_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = C_BG_DARK
        bg.line.fill.background()
        return bg

    def add_slide_transition(slide, transition_xml_str):
        xml = f'<p:transition xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" spd="med">{transition_xml_str}</p:transition>'
        slide._element.append(parse_xml(xml))

    def add_header(slide, category: str, title: str, subtitle: str = ""):
        # Category Pill
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.38), Inches(2.6), Inches(0.32))
        pill.fill.solid()
        pill.fill.fore_color.rgb = C_CARD_DARK
        pill.line.color.rgb = C_GREEN
        pill.line.width = Pt(1)
        tf_pill = pill.text_frame
        p_pill = tf_pill.paragraphs[0]
        p_pill.text = category.upper()
        p_pill.font.name = FONT_FAMILY
        p_pill.font.size = Pt(9.5)
        p_pill.font.bold = True
        p_pill.font.color.rgb = C_GREEN_LIGHT
        p_pill.alignment = PP_ALIGN.CENTER

        # Title
        tb = slide.shapes.add_textbox(Inches(0.8), Inches(0.74), Inches(11.733), Inches(0.75))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = title
        p.font.name = FONT_FAMILY
        p.font.size = Pt(21)
        p.font.bold = True
        p.font.color.rgb = C_TEXT_WHITE

        # Subtitle
        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.name = FONT_FAMILY
            p2.font.size = Pt(11)
            p2.font.color.rgb = C_TEXT_MUTED
            p2.space_before = Pt(2)

    def add_mockup_frame(slide, left, top, width, height, image_path, title_bar="KrishiDrishti Live Platform", badge_text=None, badge_color=None):
        """Creates an agency-grade device mockup with generous padding so images never overflow."""
        card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD_DARKER
        card.line.color.rgb = C_CARD_BORDER
        card.line.width = Pt(1.5)

        # Title Bar
        bar_h = 0.35
        bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(bar_h))
        bar.fill.solid()
        bar.fill.fore_color.rgb = C_CARD_DARK
        bar.line.fill.background()

        # macOS-style navigation dots
        dot_colors = [RGBColor(239, 68, 68), RGBColor(234, 179, 8), RGBColor(34, 197, 94)]
        for i, c in enumerate(dot_colors):
            dot = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(left + 0.15 + i * 0.16), Inches(top + 0.11), Inches(0.1), Inches(0.1))
            dot.fill.solid()
            dot.fill.fore_color.rgb = c
            dot.line.fill.background()

        # Window Title
        tb = slide.shapes.add_textbox(Inches(left + 0.75), Inches(top + 0.04), Inches(width - 2.8 if badge_text else width - 0.9), Inches(bar_h))
        p = tb.text_frame.paragraphs[0]
        p.text = title_bar
        p.font.name = FONT_FAMILY
        p.font.size = Pt(9.5)
        p.font.bold = True
        p.font.color.rgb = C_TEXT_MUTED

        # Badge in top right of the title bar
        if badge_text:
            badge_w = 2.1
            badge_h = 0.24
            badge = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left + width - badge_w - 0.1), Inches(top + 0.05), Inches(badge_w), Inches(badge_h))
            badge.fill.solid()
            badge.fill.fore_color.rgb = badge_color or C_GREEN
            badge.line.fill.background()
            p_b = badge.text_frame.paragraphs[0]
            p_b.text = badge_text
            p_b.font.name = FONT_FAMILY
            p_b.font.size = Pt(8.5)
            p_b.font.bold = True
            p_b.font.color.rgb = C_TEXT_WHITE
            p_b.alignment = PP_ALIGN.CENTER

        # Image safely padded inside the frame
        pad_x = 0.12
        pad_y = 0.12
        img_top = top + bar_h + pad_y
        img_h = height - bar_h - (pad_y * 2)
        img_left = left + pad_x
        img_w = width - (pad_x * 2)

        actual_img_path = image_path
        if not os.path.exists(actual_img_path):
            alt_path = image_path.replace('.jpg', '.png') if image_path.endswith('.jpg') else image_path.replace('.png', '.jpg')
            if os.path.exists(alt_path):
                actual_img_path = alt_path

        if os.path.exists(actual_img_path):
            slide.shapes.add_picture(actual_img_path, Inches(img_left), Inches(img_top), Inches(img_w), Inches(img_h))

    def add_card(slide, left, top, width, height, title="", items=None, border_color=None, title_color=None, bg_color=None):
        card = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color or C_CARD_DARK
        card.line.color.rgb = border_color or C_CARD_BORDER
        card.line.width = Pt(1)

        pad = 0.18
        tb = slide.shapes.add_textbox(Inches(left + pad), Inches(top + pad), Inches(width - (pad * 2)), Inches(height - (pad * 2)))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0

        if title:
            p_title = tf.paragraphs[0]
            p_title.text = title
            p_title.font.name = FONT_FAMILY
            p_title.font.size = Pt(12.5)
            p_title.font.bold = True
            p_title.font.color.rgb = title_color or C_GREEN_LIGHT
            p_title.space_after = Pt(4)

        if items:
            for item in items:
                p = tf.add_paragraph()
                p.text = f"•  {item}"
                p.font.name = FONT_FAMILY
                p.font.size = Pt(9.5)
                p.font.color.rgb = C_TEXT_LIGHT
                p.space_after = Pt(2.5)

        return card

    # =========================================================================
    # SLIDE 1: Title Slide with Live UI Mockup
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s1)
    add_slide_transition(s1, "<p:fade/>")

    stripe = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0), Inches(0), Inches(0.18), Inches(7.5))
    stripe.fill.solid()
    stripe.fill.fore_color.rgb = C_GREEN
    stripe.line.fill.background()

    tag = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.8), Inches(3.4), Inches(0.35))
    tag.fill.solid()
    tag.fill.fore_color.rgb = C_CARD_DARK
    tag.line.color.rgb = C_GREEN
    p_tag = tag.text_frame.paragraphs[0]
    p_tag.text = "SMART AGRI-TECH & AI PLATFORM"
    p_tag.font.name = FONT_FAMILY
    p_tag.font.size = Pt(9.5)
    p_tag.font.bold = True
    p_tag.font.color.rgb = C_GREEN_LIGHT
    p_tag.alignment = PP_ALIGN.CENTER

    tb_t = s1.shapes.add_textbox(Inches(0.8), Inches(1.3), Inches(5.8), Inches(2.3))
    tf_t = tb_t.text_frame
    tf_t.word_wrap = True
    p_main = tf_t.paragraphs[0]
    p_main.text = "KrishiDrishti (কৃষি দৃষ্টি)"
    p_main.font.name = FONT_FAMILY
    p_main.font.size = Pt(34)
    p_main.font.bold = True
    p_main.font.color.rgb = C_TEXT_WHITE

    p_sub = tf_t.add_paragraph()
    p_sub.text = "AI Foliar Pathology Screening & Bilingual Advisory Platform"
    p_sub.font.name = FONT_FAMILY
    p_sub.font.size = Pt(14)
    p_sub.font.bold = True
    p_sub.font.color.rgb = C_GREEN_LIGHT
    p_sub.space_before = Pt(4)

    p_desc = tf_t.add_paragraph()
    p_desc.text = "Integrating ConvNeXt-Tiny Deep Learning Vision, Multi-Provider LLMs, and Two-Stage Clinical Gating for Sustainable Agriculture."
    p_desc.font.name = FONT_FAMILY
    p_desc.font.size = Pt(10.5)
    p_desc.font.color.rgb = C_TEXT_MUTED
    p_desc.space_before = Pt(6)

    badges_data = [
        ("Sub-150ms Neural Inference Latency", C_GREEN, C_GREEN_LIGHT),
        ("50 Disease Classes across 16 Crops", C_CYAN, C_CYAN),
        ("Bilingual Native Bangla Voice & Chat", C_AMBER, C_AMBER)
    ]
    for idx, (b_text, b_border, b_color) in enumerate(badges_data):
        b_shape = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(3.8 + idx * 0.72), Inches(5.6), Inches(0.58))
        b_shape.fill.solid()
        b_shape.fill.fore_color.rgb = C_CARD_DARK
        b_shape.line.color.rgb = b_border
        p_b = b_shape.text_frame.paragraphs[0]
        p_b.text = f"✔  {b_text}"
        p_b.font.name = FONT_FAMILY
        p_b.font.size = Pt(11)
        p_b.font.bold = True
        p_b.font.color.rgb = b_color

    add_mockup_frame(s1, 6.7, 0.8, 5.8, 5.7, "docs/presentation/images/01_landing.png", 
                     title_bar="KrishiDrishti Web Application (http://localhost:3000)",
                     badge_text="LIVE WEB PLATFORM", badge_color=C_GREEN)

    tb_foot = s1.shapes.add_textbox(Inches(0.8), Inches(6.8), Inches(11.7), Inches(0.35))
    p_f = tb_foot.text_frame.paragraphs[0]
    p_f.text = "KrishiDrishti Engineering Architecture & Executive Presentation | 2026"
    p_f.font.name = FONT_FAMILY
    p_f.font.size = Pt(10)
    p_f.font.color.rgb = C_TEXT_MUTED

    # =========================================================================
    # SLIDE 2: Problem Statement with Real Leaf Pathology Photos
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s2)
    add_slide_transition(s2, '<p:wipe dir="r"/>')
    add_header(s2, "The Critical Challenge", "Severe Agronomic Vulnerabilities in Crop Pathology",
               "Smallholder farmers face massive harvest destruction due to diagnostic lag and acute advisory shortages.")

    col1 = add_card(s2, 0.8, 1.75, 3.65, 2.45, "1. Severe Yield Loss (20-40%)", [
        "Foliar pathogens and fungal blights silently destroy up to 40% of seasonal harvests.",
        "Delayed early detection allows localized blight to spread rapidly across fields.",
        "Heavy economic devastation for vulnerable smallholder farming households."
    ], border_color=C_AMBER, title_color=C_AMBER)

    frame1 = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(4.35), Inches(3.65), Inches(2.65))
    frame1.fill.solid()
    frame1.fill.fore_color.rgb = C_CARD_DARKER
    frame1.line.color.rgb = C_AMBER
    if os.path.exists("all diseases/Tomato Early Blight.jpg"):
        s2.shapes.add_picture("all diseases/Tomato Early Blight.jpg", Inches(0.92), Inches(4.45), Inches(3.41), Inches(2.1))
    tb_l1 = s2.shapes.add_textbox(Inches(0.8), Inches(6.6), Inches(3.65), Inches(0.32))
    tb_l1.text_frame.paragraphs[0].text = "Foliar Blight Specimen (Tomato Early Blight)"
    tb_l1.text_frame.paragraphs[0].font.name = FONT_FAMILY
    tb_l1.text_frame.paragraphs[0].font.size = Pt(9.5)
    tb_l1.text_frame.paragraphs[0].font.bold = True
    tb_l1.text_frame.paragraphs[0].font.color.rgb = C_AMBER
    tb_l1.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

    col2 = add_card(s2, 4.84, 1.75, 3.65, 2.45, "2. Agronomist Scarcity (1:15,000)", [
        "Extension officer ratio exceeds 1:15,000 farming households in Bangladesh.",
        "Physical lab testing requires 3-7 days, far too slow for fast fungal progression.",
        "Remote rural farming clusters are geographically cut off from extension centers."
    ], border_color=C_CYAN, title_color=C_CYAN)

    frame2 = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(4.84), Inches(4.35), Inches(3.65), Inches(2.65))
    frame2.fill.solid()
    frame2.fill.fore_color.rgb = C_CARD_DARKER
    frame2.line.color.rgb = C_CYAN
    if os.path.exists("all diseases/corn common rust.jpg"):
        s2.shapes.add_picture("all diseases/corn common rust.jpg", Inches(4.96), Inches(4.45), Inches(3.41), Inches(2.1))
    tb_l2 = s2.shapes.add_textbox(Inches(4.84), Inches(6.6), Inches(3.65), Inches(0.32))
    tb_l2.text_frame.paragraphs[0].text = "Spore Outbreak Specimen (Corn Common Rust)"
    tb_l2.text_frame.paragraphs[0].font.name = FONT_FAMILY
    tb_l2.text_frame.paragraphs[0].font.size = Pt(9.5)
    tb_l2.text_frame.paragraphs[0].font.bold = True
    tb_l2.text_frame.paragraphs[0].font.color.rgb = C_CYAN
    tb_l2.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

    col3 = add_card(s2, 8.88, 1.75, 3.65, 2.45, "3. Chemical Misuse & Language Gap", [
        "Panic-driven, uncalibrated pesticide spraying destroys soil microbiome & ecology.",
        "85%+ of scientific plant pathology research is in academic English, inaccessible to farmers.",
        "Zero actionable split-dosage guidance leads to excessive chemical runoffs."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    frame3 = s2.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(8.88), Inches(4.35), Inches(3.65), Inches(2.65))
    frame3.fill.solid()
    frame3.fill.fore_color.rgb = C_CARD_DARKER
    frame3.line.color.rgb = C_GREEN
    if os.path.exists("all diseases/potato let bright.jpg"):
        s2.shapes.add_picture("all diseases/potato let bright.jpg", Inches(9.0), Inches(4.45), Inches(3.41), Inches(2.1))
    tb_l3 = s2.shapes.add_textbox(Inches(8.88), Inches(6.6), Inches(3.65), Inches(0.32))
    tb_l3.text_frame.paragraphs[0].text = "Lethal Rot Specimen (Potato Late Blight)"
    tb_l3.text_frame.paragraphs[0].font.name = FONT_FAMILY
    tb_l3.text_frame.paragraphs[0].font.size = Pt(9.5)
    tb_l3.text_frame.paragraphs[0].font.bold = True
    tb_l3.text_frame.paragraphs[0].font.color.rgb = C_GREEN_LIGHT
    tb_l3.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 3: Proposed Solution with Live Scanner Result Mockup
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s3)
    add_slide_transition(s3, '<p:push dir="l"/>')
    add_header(s3, "Comprehensive Solution", "KrishiDrishti: An Intelligent Farming Companion",
               "A clinical, end-to-end digital agricultural ecosystem delivering instant diagnostics directly to the field.")

    add_card(s3, 0.8, 1.75, 5.5, 2.45, "Instant Vision Pathology Diagnosis", [
        "High-resolution leaf scan with 50-class foliar pathology detection.",
        "Calculates 97% confidence matching, severity grade, and fungal/bacterial taxonomy.",
        "Provides verified BARI & AIS recommended treatments with Bangla audio playback.",
        "1-Click PDF export downloads structured clinical pathology dossiers."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    add_card(s3, 0.8, 4.4, 5.5, 2.45, "Conversational AI Crop Doctor & Tools", [
        "Conversational agricultural Bangla advisory with Web Speech TTS audio.",
        "Precision balanced N-P-K fertilizer calculator adapted to Bigha / Acre land sizes.",
        "Human-in-the-loop escalation routing low-confidence scans to verified agronomists.",
        "Offline-tolerant database caching delivering instant 20ms repeated lookups."
    ], border_color=C_CYAN, title_color=C_CYAN)

    add_mockup_frame(s3, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/03_scanner_result.png",
                     title_bar="AI Leaf Disease Diagnostic Result (/scan)",
                     badge_text="REAL DIAGNOSIS MOCKUP", badge_color=C_GREEN)

    # =========================================================================
    # SLIDE 4: Engineering Architecture Diagram (Image-Rich)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s4)
    add_slide_transition(s4, '<p:zoom/>')
    add_header(s4, "Engineering Architecture", "Modern Multi-Tier Decoupled Platform Architecture",
               "Engineered for sub-150ms edge performance, high availability, and zero-setup offline resilience.")

    if os.path.exists("docs/presentation/images/04_architecture.png"):
        s4.shapes.add_picture("docs/presentation/images/04_architecture.png", Inches(0.8), Inches(1.75), Inches(11.733), Inches(4.7))

    tb_a = s4.shapes.add_textbox(Inches(0.8), Inches(6.6), Inches(11.733), Inches(0.35))
    p_a = tb_a.text_frame.paragraphs[0]
    p_a.text = "Decoupled pipeline: Next.js 14 Client -> Express/Next API Layer -> Python FastAPI ConvNeXt-Tiny Microservice -> Neon Cloud DB"
    p_a.font.name = FONT_FAMILY
    p_a.font.size = Pt(10.5)
    p_a.font.bold = True
    p_a.font.color.rgb = C_GREEN_LIGHT
    p_a.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 5: Deep Learning Vision Core with 2x2 Pathogen Specimen Grid
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s5)
    add_slide_transition(s5, '<p:split orient="horz"/>')
    add_header(s5, "Deep Learning Core", "50-Class Pathology Model Powered by ConvNeXt-Tiny",
               "Cutting-edge pure convolutional vision architecture fine-tuned for high accuracy on foliar pathology.")

    add_card(s5, 0.8, 1.75, 5.5, 5.1, "ConvNeXt-Tiny Model Highlights", [
        "Modern Vision Backbone: Adopts Vision Transformer design innovations (7x7 depthwise convolutions, inverted bottlenecks) with pure ConvNet efficiency.",
        "Sub-150ms CPU Execution: ~28M parameters, delivering instant classification on commodity CPU hardware without requiring costly GPUs.",
        "Broad Multi-Crop Scope: 50 classes across 16 major crops (Rice, Wheat, Potato, Tomato, Pepper, Corn, Apple, Grape, Strawberry, Soybean, etc.).",
        "Pathological Diversity: Accurately classifies Bacterial spots, Fungal blights, Powdery mildews, Leaf rusts, Viral mosaics, and Healthy controls.",
        "Publicly Published: Deployed and shared on Hugging Face Hub as ripro805/krishidrishti-plant-disease."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    s5_specimens = [
        ("all diseases/Rice Brown Spot.jpg", "Rice Brown Spot (ধান)", 6.6, 1.75),
        ("all diseases/apple scrab.jpg", "Apple Scab (আপেল)", 9.68, 1.75),
        ("all diseases/grape eska.jpg", "Grape Esca (আঙ্গুর)", 6.6, 4.38),
        ("all diseases/(Wheat Leaf Rust).jpg", "Wheat Leaf Rust (গম)", 9.68, 4.38),
    ]
    for img_p, label, l, t in s5_specimens:
        card_p = s5.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(l), Inches(t), Inches(2.85), Inches(2.42))
        card_p.fill.solid()
        card_p.fill.fore_color.rgb = C_CARD_DARKER
        card_p.line.color.rgb = C_CARD_BORDER
        if os.path.exists(img_p):
            s5.shapes.add_picture(img_p, Inches(l + 0.1), Inches(t + 0.1), Inches(2.65), Inches(1.85))
        tb_lbl = s5.shapes.add_textbox(Inches(l), Inches(t + 2.02), Inches(2.85), Inches(0.35))
        p_lbl = tb_lbl.text_frame.paragraphs[0]
        p_lbl.text = label
        p_lbl.font.name = FONT_FAMILY
        p_lbl.font.size = Pt(9.5)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = C_TEXT_LIGHT
        p_lbl.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 6: Two-Stage Clinical Guard with Real Low-Confidence Rejection UI
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s6)
    add_slide_transition(s6, '<p:push dir="l"/>')
    add_header(s6, "Clinical Safety Mechanism", "Two-Stage Gating: Eliminating Catastrophic Misdiagnosis",
               "Why naive classification is hazardous in agriculture, and how KrishiDrishti guarantees clinical safety.")

    add_card(s6, 0.8, 1.75, 5.5, 2.45, "The Flaw in Naive Softmax Classifiers", [
        "Conventional classification models force an output with highest softmax, even on random objects or mismatched leaves.",
        "Applying Potato Late Blight fungicides to a Tomato Mosaic Virus infection destroys crops and burns capital.",
        "Clinical agriculture requires intelligent specimen rejection whenever evidence is ambiguous."
    ], border_color=C_AMBER, title_color=C_AMBER)

    add_card(s6, 0.8, 4.4, 5.5, 2.45, "Two-Stage Hierarchical Gating", [
        "Stage 1 (Genus Probability Mass): Aggregates all 50 class probabilities by crop family to verify botanical genus.",
        "Stage 2 (Hint Verification): Flags mismatch if farmer selects 'Tomato' but specimen exhibits 'Potato' pathology.",
        "Ambiguity Rejection: Holds result as 'Inconclusive' and blocks chemical treatment if margin < 15%."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    add_mockup_frame(s6, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/02_scanner_guard.png",
                     title_bar="Clinical Safety Gating Engine (/scan)",
                     badge_text="TREATMENT BLOCKED FOR SAFETY", badge_color=C_AMBER)

    # =========================================================================
    # SLIDE 7: Bilingual AI Chatbot with Live Bangla Chat Mockup
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s7)
    add_slide_transition(s7, '<p:fade/>')
    add_header(s7, "Conversational Intelligence", "Bilingual Crop Doctor: Multi-Provider LLM & Voice",
               "Democratizing agronomic intelligence through fluent Bangla conversational assistance and audio speech.")

    add_card(s7, 0.8, 1.75, 5.5, 2.45, "Multi-Provider Failover Architecture", [
        "Tier 1 (Google Gemini 3.5 Flash): High-intelligence engine for complex pathology queries.",
        "Tier 2 (Groq Qwen 2.5): Ultra-low latency fallback generating responses in <500ms.",
        "Tier 3 (OpenAI GPT-4o-mini): Robust secondary backup ensuring 99.9% chatbot uptime.",
        "Autonomous Provider Hopping: Switches transparently on rate limits or network lag."
    ], border_color=C_CYAN, title_color=C_CYAN)

    add_card(s7, 0.8, 4.4, 5.5, 2.45, "20ms Knowledge Caching & Bangla Audio", [
        "Database Knowledge Caching: Serves frequent agricultural queries in 20ms directly from database.",
        "Eliminates API Token Cost: Repeated pest and soil questions bypass external LLM calls entirely.",
        "Native Web Speech TTS: Speaks diagnostic instructions aloud in a natural Bengali accent.",
        "Removes Illiteracy Barrier: Enables illiterate smallholders to listen to prescriptions."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    add_mockup_frame(s7, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/04_chatbot.png",
                     title_bar="AI Agricultural Chatbot (/chat)",
                     badge_text="DATABASE CACHED (20ms)", badge_color=C_CYAN)

    # =========================================================================
    # SLIDE 8: Fertilizer Dosage Calculator with Live Calculator Mockup
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s8)
    add_slide_transition(s8, '<p:push dir="l"/>')
    add_header(s8, "Precision Nutrition", "Balanced Fertilizer & Nutrient Dosage Calculator",
               "Scientific N-P-K nutrient calculation adapted to localized agricultural land measurement units.")

    add_card(s8, 0.8, 1.75, 5.5, 2.45, "Localized Land & Crop Customization", [
        "Bangladeshi Land Units: Supports native Bigha, Decimal, Katha, Acre, and Hectare conversions.",
        "Crop-Specific Formulations: Tailored nutrient requirements for Tomato, Potato, Rice, Wheat, etc.",
        "Balanced Primary Nutrients: Calculates exact Kilograms for Urea (N), TSP (P), MoP (K), and Gypsum."
    ], border_color=C_AMBER, title_color=C_AMBER)

    add_card(s8, 0.8, 4.4, 5.5, 2.45, "Split-Application Growth Schedules", [
        "Stage-Wise Guidance: Outlines basal dressing, vegetative split, and panicle initiation timing.",
        "Prevents Fertilizer Burn: Eliminates excessive single-dose chemical application.",
        "Ecological Preservation: Protects groundwater from nitrate pollution and prevents soil acidification."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    add_mockup_frame(s8, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/05_calculator.png",
                     title_bar="Fertilizer Dosage Calculator (/calculator)",
                     badge_text="PRECISION N-P-K DOSES", badge_color=C_AMBER)

    # =========================================================================
    # SLIDE 9: Agronomist Tele-Consultation with Live Expert Portal Mockup
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s9)
    add_slide_transition(s9, '<p:wipe dir="r"/>')
    add_header(s9, "Human-in-the-Loop", "Agronomist Tele-Consultation & Review Portal",
               "Connecting grassroots smallholders with certified agricultural scientists for high-stakes decision making.")

    add_card(s9, 0.8, 1.75, 5.5, 2.45, "Escalation Queue & Clinical Triaging", [
        "Automated Triaging: Low-confidence scans or cross-crop ambiguities automatically surface for review.",
        "Farmer Direct Escalation: Farmers attach location, crop age, and notes with one click.",
        "Urgency Prioritization: Escalations sorted by potential economic loss and pathogen virulence."
    ], border_color=C_AMBER, title_color=C_AMBER)

    add_card(s9, 0.8, 4.4, 5.5, 2.45, "Expert Prescription & Active Learning Loop", [
        "Clinical Prescription Form: Verified agronomist writes formal diagnosis, active ingredients, and spray dosage.",
        "Official Verification Badge: Establishes credibility and farmer trust.",
        "Continuous Model Retraining: Agronomist validations produce gold-standard datasets to retrain vision models."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    add_mockup_frame(s9, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/09_expert.png",
                     title_bar="Agricultural Expert Portal (/expert)",
                     badge_text="CERTIFIED PRESCRIPTION DESK", badge_color=C_GREEN)

    # =========================================================================
    # SLIDE 10: Role-Based Access Control with Live Admin Dashboard Mockup
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s10)
    add_slide_transition(s10, '<p:split orient="vert"/>')
    add_header(s10, "Security & Governance", "Enterprise Authentication & Multi-Role Governance",
               "Strict identity isolation, protected authorization barriers, and centralized administrative telemetry.")

    add_card(s10, 0.8, 1.75, 5.5, 2.45, "Three Distinct Persona Profiles", [
        "Farmer: Private field scan records, personalized history, and local voice assistance.",
        "Agronomist Expert: Route-protected access to `/expert` tele-consultation and prescription issuing.",
        "System Administrator: Full platform telemetry, real-time metrics, and disease database CMS management."
    ], border_color=C_CYAN, title_color=C_CYAN)

    add_card(s10, 0.8, 4.4, 5.5, 2.45, "Enterprise Security Architecture", [
        "Cryptographic Tokens: Signed JSON Web Tokens (JWT) with secure HTTP-only cookies.",
        "Salt-Hashed Credentials: Bcrypt password hashing safeguarding against credential stuffing.",
        "Route Middleware Protection: Intercepts unauthenticated or unauthorized route navigation."
    ], border_color=C_AMBER, title_color=C_AMBER)

    add_mockup_frame(s10, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/07_admin.jpg",
                     title_bar="Admin Telemetry & CMS Dashboard (/admin)",
                     badge_text="TELEMETRY & CMS DESK", badge_color=C_CYAN)

    # =========================================================================
    # SLIDE 11: Dual Operations Control: Admin Dashboard & Expert Portal Mockup
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s11)
    add_slide_transition(s11, '<p:wipe dir="r"/>')
    add_header(s11, "Enterprise Operations", "Dual Operations Control: Admin Command Desk & Expert Portal",
               "Centralized epidemiological outbreak surveillance alongside human-in-the-loop clinical tele-consultations.")

    # Left: Admin Command Center
    add_mockup_frame(s11, 0.8, 1.7, 5.7, 3.4, "docs/presentation/images/07_admin.jpg",
                     title_bar="Admin Operations & Surveillance Desk (/admin)",
                     badge_text="ADMIN DASHBOARD", badge_color=C_CYAN)

    add_card(s11, 0.8, 5.25, 5.7, 1.8, "👑 Admin Surveillance & Governance", [
        "Epidemiological Heatmaps: Real-time regional outbreak telemetry and scan distribution.",
        "Emergency Broadcast Alerts: Publish instant geofenced pest advisories to all farmers.",
        "CMS & Accuracy Audit: Manage pathogen treatment library & review farmer diagnostic ratings."
    ], border_color=C_CYAN, title_color=C_CYAN)

    # Right: Expert Consultation Portal
    add_mockup_frame(s11, 6.833, 1.7, 5.7, 3.4, "docs/presentation/images/09_expert.jpg",
                     title_bar="Agronomist Tele-Consultation Desk (/expert)",
                     badge_text="EXPERT PANEL", badge_color=C_GREEN)

    add_card(s11, 6.833, 5.25, 5.7, 1.8, "🩺 Clinical Consultation & Active Learning", [
        "Clinical Case Triaging: Inspect ambiguous or high-severity scans escalated by smallholders.",
        "Certified Digital Prescriptions: Issue formal active-ingredient dosages and PHI intervals.",
        "Human-in-the-Loop: Expert verifications continuously retrain vision models with gold-standard data."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    # =========================================================================
    # SLIDE 12: Enterprise Testing & QA with Live Field History Mockup
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s12)
    add_slide_transition(s12, '<p:push dir="l"/>')
    add_header(s12, "Verification & Quality Assurance", "Battle-Tested E2E Browser Automation Suite",
               "100% verified test pass rate proving functional stability, clinical safety, and responsive design.")

    add_card(s12, 0.8, 1.75, 5.5, 2.45, "Exhaustive Test Suite Metrics", [
        "54 Total Automated Tests: 54 Passed | 0 Failed | 0 Skipped across desktop & mobile Chromium.",
        "84 Seconds Execution: Serial execution protects transactional database stores from race conditions.",
        "Playwright v1.64 Engine: Standardized headless browser testing with automated HTML and JSON reporting."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    add_card(s12, 0.8, 4.4, 5.5, 2.45, "11 Tested Functional Modules", [
        "Smoke (9), Auth (7), RBAC Barriers (4), AI Scanner & Gating (6), Chatbot (4).",
        "Fertilizer Calculator (4), Disease Library (5), Scan History (4), Expert Portal (3), Admin (2), Responsive I18N (6).",
        "Dedicated Git Branch: Tracked and committed on test/playwright-e2e-automation."
    ], border_color=C_AMBER, title_color=C_AMBER)

    add_mockup_frame(s12, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/08_history.jpg",
                     title_bar="Field Health History & Tracking (/history)",
                     badge_text="54/54 TESTS PASSED (100%)", badge_color=C_GREEN)

    # =========================================================================
    # SLIDE 13: Real-World Agronomic Impact with Live Library Mockup
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s13)
    add_slide_transition(s13, '<p:zoom/>')
    add_header(s13, "Real-World Impact", "Measurable Socio-Economic & Ecological Benefits",
               "Empowering grassroots agricultural communities through technology-driven stewardship.")

    add_card(s13, 0.8, 1.75, 5.5, 2.45, "Diagnostic Speed & Yield Preservation", [
        "From Days to Seconds: Cuts diagnostic turnaround from 3-7 days to under 200 milliseconds.",
        "Salvages 15-25% Yield Losses: Rapid localized containment prevents broad acreage destruction.",
        "Immediate Household ROI: Protects vulnerable seasonal income for smallholder families."
    ], border_color=C_GREEN, title_color=C_GREEN_LIGHT)

    add_card(s13, 0.8, 4.4, 5.5, 2.45, "Ecological Protection & Language Inclusion", [
        "Halts Blanket Spraying: Eliminates indiscriminate preventative chemical cocktails.",
        "Groundwater & Soil Health: Preserves beneficial soil microbiomes through scientific split-dosing.",
        "True Vernacular Access: High-quality Bengali interface and spoken audio instructions."
    ], border_color=C_CYAN, title_color=C_CYAN)

    add_mockup_frame(s13, 6.6, 1.75, 5.9, 5.1, "docs/presentation/images/06_library.jpg",
                     title_bar="Plant Disease Encyclopedia (/library)",
                     badge_text="50+ PATHOLOGIES CATALOGED", badge_color=C_CYAN)

    # =========================================================================
    # SLIDE 14: Future Roadmap (Image-Rich Infographic)
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s14)
    add_slide_transition(s14, '<p:push dir="l"/>')
    add_header(s14, "Future Horizons", "KrishiDrishti 2.0: Strategic Technology Roadmap",
               "Evolving from reactive disease diagnosis into an all-encompassing predictive precision agriculture platform.")

    if os.path.exists("docs/presentation/images/13_roadmap.jpg") or os.path.exists("docs/presentation/images/13_roadmap.png"):
        img_p = "docs/presentation/images/13_roadmap.jpg" if os.path.exists("docs/presentation/images/13_roadmap.jpg") else "docs/presentation/images/13_roadmap.png"
        s14.shapes.add_picture(img_p, Inches(0.8), Inches(1.75), Inches(11.733), Inches(4.7))

    tb_r = s14.shapes.add_textbox(Inches(0.8), Inches(6.6), Inches(11.733), Inches(0.35))
    p_r = tb_r.text_frame.paragraphs[0]
    p_r.text = "Strategic progression: Edge Quantization -> IoT Soil Telemetry & Satellite Fusion -> National DAE Agricultural Network"
    p_r.font.name = FONT_FAMILY
    p_r.font.size = Pt(10.5)
    p_r.font.bold = True
    p_r.font.color.rgb = C_GREEN_LIGHT
    p_r.alignment = PP_ALIGN.CENTER

    # =========================================================================
    # SLIDE 15: Conclusion & Q&A
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    apply_dark_bg(s15)
    add_slide_transition(s15, '<p:fade/>')

    box_concl = s15.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.75), Inches(11.733), Inches(5.95))
    box_concl.fill.solid()
    box_concl.fill.fore_color.rgb = C_CARD_DARK
    box_concl.line.color.rgb = C_GREEN
    box_concl.line.width = Pt(1.5)

    tb_c = s15.shapes.add_textbox(Inches(1.2), Inches(1.05), Inches(6.5), Inches(5.3))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True
    tf_c.margin_left = tf_c.margin_top = tf_c.margin_right = tf_c.margin_bottom = 0

    p_c1 = tf_c.paragraphs[0]
    p_c1.text = "KrishiDrishti (কৃষি দৃষ্টি)"
    p_c1.font.name = FONT_FAMILY
    p_c1.font.size = Pt(30)
    p_c1.font.bold = True
    p_c1.font.color.rgb = C_TEXT_WHITE

    p_c2 = tf_c.add_paragraph()
    p_c2.text = "Smart Farming for a Sustainable, Food-Secure Bangladesh"
    p_c2.font.name = FONT_FAMILY
    p_c2.font.size = Pt(14)
    p_c2.font.bold = True
    p_c2.font.color.rgb = C_GREEN_LIGHT
    p_c2.space_before = Pt(3)

    p_c3 = tf_c.add_paragraph()
    p_c3.text = "\nSummary of Key Technical Achievements:"
    p_c3.font.name = FONT_FAMILY
    p_c3.font.size = Pt(12)
    p_c3.font.bold = True
    p_c3.font.color.rgb = C_TEXT_LIGHT
    p_c3.space_before = Pt(6)

    bullets = [
        "Deployed 50-class ConvNeXt-Tiny vision model (sub-150ms inference on CPU).",
        "Engineered two-stage clinical gating to eliminate catastrophic botanical misdiagnosis.",
        "Integrated resilient multi-provider bilingual chatbot (Gemini + Groq + OpenAI) with native Bangla audio.",
        "Constructed full production stack: Next.js 14 App Router, Express, Prisma, and PostgreSQL.",
        "100% verified quality assurance via 54-test Playwright E2E browser automation suite."
    ]
    for b in bullets:
        p_b = tf_c.add_paragraph()
        p_b.text = f"✔  {b}"
        p_b.font.name = FONT_FAMILY
        p_b.font.size = Pt(10)
        p_b.font.color.rgb = C_TEXT_MUTED
        p_b.space_before = Pt(3)

    p_qa = tf_c.add_paragraph()
    p_qa.text = "\nThank You!  |  Open for Questions & Discussion"
    p_qa.font.name = FONT_FAMILY
    p_qa.font.size = Pt(15)
    p_qa.font.bold = True
    p_qa.font.color.rgb = C_AMBER
    p_qa.space_before = Pt(10)

    # Right side on Slide 15: Miniature mockup showcase
    add_mockup_frame(s15, 8.0, 1.1, 4.2, 5.25, "docs/presentation/images/03_scanner_result.jpg",
                     title_bar="KrishiDrishti Diagnostic Core",
                     badge_text="READY FOR DEPLOYMENT", badge_color=C_GREEN)

    output_path = "KrishiDrishti_Project_Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to {os.path.abspath(output_path)}")

if __name__ == "__main__":
    build_presentation()
