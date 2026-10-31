import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def create_voiceover_docx():
    doc = docx.Document()

    # Page Setup (Standard A4 / Letter, 0.9 inch margins)
    for section in doc.sections:
        section.top_margin = Inches(0.9)
        section.bottom_margin = Inches(0.9)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
        # Header and Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.text = "KrishiDrishti (কৃষি দৃষ্টি) — Official 3-Minute Video Voiceover Script"
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hp.style.font.name = "Segoe UI"
        hp.style.font.size = Pt(8.5)
        hp.style.font.color.rgb = RGBColor(148, 163, 184)

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.text = "KrishiDrishti Video Presentation Deliverables | Timing Calibrated to 1080p Screen Recording"
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        fp.style.font.name = "Segoe UI"
        fp.style.font.size = Pt(8.5)
        fp.style.font.color.rgb = RGBColor(148, 163, 184)

    # Styles
    C_PRIMARY = RGBColor(15, 23, 42)     # Slate 900
    C_GREEN = RGBColor(22, 163, 74)       # Emerald 600
    C_MUTED = RGBColor(100, 116, 139)     # Slate 500
    C_AMBER = RGBColor(217, 119, 6)       # Amber 600

    # Title
    tp = doc.add_paragraph()
    tp.paragraph_format.space_before = Pt(0)
    tp.paragraph_format.space_after = Pt(2)
    run_t = tp.add_run("KrishiDrishti (কৃষি দৃষ্টি)")
    run_t.font.name = "Segoe UI"
    run_t.font.size = Pt(24)
    run_t.font.bold = True
    run_t.font.color.rgb = C_PRIMARY

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_before = Pt(0)
    sub_p.paragraph_format.space_after = Pt(12)
    run_sub = sub_p.add_run("Official 3-Minute Video Walkthrough Voiceover Script & Presenter Guide")
    run_sub.font.name = "Segoe UI"
    run_sub.font.size = Pt(13)
    run_sub.font.bold = True
    run_sub.font.color.rgb = C_GREEN

    # Metadata Table
    meta_table = doc.add_table(rows=4, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_table.autofit = False

    meta_data = [
        ("Companion Video File", "docs/presentation/video/KrishiDrishti_Full_Platform_Walkthrough.webm (Full HD 1080p)"),
        ("Exact Video Duration", "02 Minutes 33 Seconds (00:02:33) — 153 Seconds Total"),
        ("Featured Real Image Scan", "all diseases/apple black rob.jpg -> Classified as Apple Black Rot (Botryosphaeria obtusa)"),
        ("Speech Synchronization", "Word-for-word timed script matching on-screen visual cuts of the 2m 33s recording"),
    ]

    for i, (label, val) in enumerate(meta_data):
        row = meta_table.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.2)
        c1.width = Inches(4.3)
        set_cell_background(c0, "F1F5F9")
        set_cell_background(c1, "F8FAFC")

        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_before = Pt(3)
        p0.paragraph_format.space_after = Pt(3)
        r0 = p0.add_run(label)
        r0.font.name = "Segoe UI"
        r0.font.size = Pt(9.5)
        r0.font.bold = True
        r0.font.color.rgb = C_PRIMARY

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_before = Pt(3)
        p1.paragraph_format.space_after = Pt(3)
        r1 = p1.add_run(val)
        r1.font.name = "Segoe UI"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = C_PRIMARY

    # Overview note
    p_note = doc.add_paragraph()
    p_note.paragraph_format.space_before = Pt(14)
    p_note.paragraph_format.space_after = Pt(14)
    r_n = p_note.add_run("HOW TO USE THIS SCRIPT:\nThis voiceover script is timed EXACTLY to the 2-minute 33-second video recording (KrishiDrishti_Full_Platform_Walkthrough.webm). Simply play the video and read the English or Bengali voiceover lines corresponding to each timestamp.")
    r_n.font.name = "Segoe UI"
    r_n.font.size = Pt(9.5)
    r_n.font.italic = True
    r_n.font.color.rgb = C_MUTED

    # Exact 2m 33s Scenes Breakdown
    scenes = [
        ("Scene 1", "0:00 - 0:22 (22s)", "Landing Page & Native Bilingual Localization",
         "The video begins on the KrishiDrishti homepage. Smooth scroll through hero section, platform statistics (98% accuracy, 200+ pathogens), comparative grid, and supported crops. The cursor clicks the language toggle to flip the entire UI to native Bengali, then back to English.",
         "Welcome to KrishiDrishti—an autonomous AI phytopathology and precision agronomy platform. On our landing page, farmers can explore live disease statistics, review laboratory benchmarks, and instantly toggle between English and native Bengali at a single click.",
         "স্বাগতম কৃষি দৃষ্টিতে—ক্ষুদ্র ও প্রান্তিক কৃষকদের জন্য নির্মিত একটি আধুনিক এআই ফসল সুরক্ষা প্ল্যাটফর্ম। আমাদের ল্যান্ডিং পেজে কৃষকরা লাইভ ডায়াগনস্টিক তথ্য দেখার পাশাপাশি এক ক্লিকেই সম্পূর্ণ ইন্টারফেসটি বাংলা ও ইংরেজিতে রূপান্তর করতে পারেন।"),

        ("Scene 2A", "0:22 - 0:54 (32s)", "Real Leaf Scanning (Apple Black Rot) & Clinical Protocols",
         "Screen navigates to /scan. The user selects 'Apple', then uploads the real image 'apple black rob.jpg'. A glowing laser scanning beam tracks over the leaf. In under 120ms, it identifies Apple Black Rot (Botryosphaeria obtusa) with 97%+ confidence, necrosis %, SPAD chlorophyll index, and lesion count. The user navigates Immediate, Organic, Chemical, and Prevention tabs, then opens and closes the PDF Dossier Modal.",
         "Now let's examine our AI leaf scanner. We select Apple and upload a real diseased leaf. Our ConvNeXt vision classifier analyzes the leaf with laser scanning telemetry, instantly identifying Apple Black Rot caused by Botryosphaeria obtusa. Growers receive verified lesion metrics, OMRI-certified organic remedies, chemical dosages with pre-harvest intervals, and printable clinical PDF dossiers.",
         "এবার আমরা সরাসরি আমাদের এআই স্ক্যানারটি দেখবো। আপেল নির্বাচন করে একটি আসল আক্রান্ত আপেল পাতার ছবি আপলোড করা হলো। লেজার স্ক্যানিংয়ের মাধ্যমে ১২০ মিলিসেকেন্ডেই মডেলটি অ্যাপল ব্ল্যাক রট রোগ শনাক্ত করে ক্ষতের পরিমাণ, ক্লোরোফিল সূচক, জৈব ও রাসায়নিক প্রতিকার এবং ডাউনলোডযোগ্য পিডিএফ প্রেসক্রিপশন প্রদান করে।"),

        ("Scene 2B", "0:54 - 1:08 (14s)", "Two-Stage Optical Anti-Hallucination Guardrail",
         "The user switches the crop to Wheat while keeping the Apple leaf, then clicks Analyze. The Two-Stage Guardrail detects the cross-crop mismatch and displays the safety alert, locking chemical advice.",
         "To prevent catastrophic misdiagnosis, our Two-Stage Guardrail automatically detects crop mismatches and non-leaf photos. If an apple leaf is scanned under wheat, chemical advice is strictly withheld for farmer safety.",
         "ভুল কীটনাশক প্রয়োগ ঠেকাতে আমাদের টু-স্টেজ গার্ডরেল স্বয়ংক্রিয়ভাবে শস্যের অমিল শনাক্ত করে সতর্কবার্তা প্রদর্শন করে এবং রাসায়নিক পরামর্শ আটকে কৃষকের নিরাপত্তা নিশ্চিত করে।"),

        ("Scene 3", "1:08 - 1:25 (17s)", "Crop Doctor AI Chatbot Studio",
         "The screen navigates to /chat. The user clicks an agricultural query chip. The chatbot streams an instant verified response with organic controls and chemical dilution ratios in natural Bengali.",
         "Our Crop Doctor AI Chatbot provides 24/7 bilingual agricultural advisory. Powered by multi-provider LLMs, it delivers instant verified prescriptions, dilution ratios, and organic remedies in natural conversational Bengali.",
         "আমাদের ক্রপ ডক্টর এআই চ্যাটবট কৃষকদের যেকোনো ফসলের সমস্যা ও রোগবালাইয়ের তাৎক্ষণিক সমাধান দেয় এবং ঘরোয়া জৈব ও রাসায়নিক মাত্রার সঠিক নিয়ম বুঝিয়ে দেয়।"),

        ("Scene 4", "1:25 - 1:47 (22s)", "Precision Fertilizer & N-P-K Dosage Calculator",
         "The video navigates to /calculator. The user sets field dimensions to 2.5 Acres. The engine computes exact Urea, DAP, MoP, Gypsum, and Zinc dosages, breaking them into 50kg bags with a 3-stage split schedule (Basal, Vegetative, Flowering).",
         "Over-fertilization damages soil and groundwater. Calibrated to Bangladesh Agricultural Research Council standards, our calculator translates field acreage into exact 50-kilogram bags for Urea, DAP, and MoP, complete with a 3-stage split application timeline.",
         "অতিরিক্ত সার ব্যবহার রোধে বারি নির্দেশিকা অনুযায়ী আমাদের ফার্টিলাইজার ক্যালকুলেটর জমির পরিমাপের ভিত্তিতে ইউরিয়া, ডিএপি ও পটাশের সঠিক ডোজ, ৫০ কেজি ব্যাগের হিসাব এবং ৩ ধাপের স্প্লিট শিডিউল দেয়।"),

        ("Scene 5", "1:47 - 2:01 (14s)", "Plant Pathology Encyclopedia (Disease Library)",
         "The screen navigates to /library. The user searches for 'Blight'. The catalog dynamically filters foliar diseases across crops, opening comprehensive pathogen dossiers with microscopic symptom profiles.",
         "Our Disease Library serves as an accessible field encyclopedia, cataloging 50 foliar diseases across 16 crops with microscopic symptom profiles, pathogen biology, and integrated pest management strategies.",
         "প্ল্যান্ট ডিজিজ লাইব্রেরিতে রয়েছে ১৬টি প্রধান ফসলের ৫০টিরও বেশি রোগের বিস্তারিত তথ্যভাণ্ডার, যা কৃষক ও গবেষকদের লক্ষণ ও সমাধান জানতে সহায়তা করে।"),

        ("Scene 6", "2:01 - 2:12 (11s)", "Field Scan History & Treatment Lifecycle",
         "The screen navigates to /history. The user inspects past scan records, confidence ratings, and filters scans by Active, Treated, and Monitoring states.",
         "The Field Scan History tracks disease recovery over time, transitioning cases from Active to Treated, allowing farmers to audit treatment efficacy across seasonal harvests.",
         "স্ক্যান হিস্ট্রির মাধ্যমে কৃষকরা তাদের ক্ষেতের বিগত সকল রোগের রেকর্ড দেখতে পারেন এবং চিকিৎসার কার্যকারিতা পর্যবেক্ষণ করতে পারেন।"),

        ("Scene 7", "2:12 - 2:22 (10s)", "Agronomist Expert Consultation Portal (/expert)",
         "The user logs in with the 1-click Expert demo account and opens /expert. The video shows the Case Escalation Queue, patient leaf inspection, and physician-style digital prescription editor.",
         "For complex anomalies, certified agronomists log into our Expert Portal to review escalated scans and issue digitally signed prescriptions, ensuring human oversight for high-value crops.",
         "জটিল রোগের ক্ষেত্রে সরকারি কৃষিবিদ ও গবেষকরা এক্সপার্ট পোর্টালে মাঠপর্যায়ের কেসগুলো যাচাই করে কৃষকদের সরাসরি ডিজিটাল প্রেসক্রিপশন প্রদান করেন।"),

        ("Scene 8", "2:22 - 2:30 (8s)", "Enterprise Admin Telemetry Dashboard (/admin)",
         "The user logs in as Administrator and opens /admin. The video scrolls through real-time outbreak heatmaps, regional disease incidence charts, and the Emergency Notice Publisher.",
         "Our Enterprise Admin Dashboard provides real-time epidemiological surveillance, empowering agricultural directors to map disease outbreaks and broadcast emergency pest alerts directly to farmers.",
         "অ্যাডমিন প্যানেলের মাধ্যমে জেলা ও উপজেলা পর্যায়ের রোগ প্রাদুর্ভাবের লাইভ হিটম্যাপ পর্যবেক্ষণ করা যায় এবং কৃষকদের ফোনে জরুরি সতর্কবার্তা পাঠানো যায়।"),

        ("Scene 9", "2:30 - 2:33 (3s)", "Grand Finale & Closing",
         "The video returns smoothly to the homepage header, showcasing the glowing KrishiDrishti logo.",
         "KrishiDrishti: Transforming smartphone cameras into clinical plant laboratories for a food-secure future.",
         "কৃষি দৃষ্টি: প্রযুক্তির আলোয় সমৃদ্ধ কৃষক, সমৃদ্ধ বাংলাদেশ।")
    ]

    for scene_id, timecode, title, visuals, eng_speech, bn_speech in scenes:
        doc.add_heading(f"{scene_id} [{timecode}]: {title}", level=2)
        
        # Scene Table
        st = doc.add_table(rows=3, cols=2)
        st.alignment = WD_TABLE_ALIGNMENT.CENTER
        st.autofit = False

        rows = [
            ("🎥 ON-SCREEN VISUALS", visuals, "F1F5F9"),
            ("🎙️ SPOKEN VOICEOVER (ENGLISH)", f'"{eng_speech}"', "ECFDF5"),
            ("🇧🇩 SPOKEN VOICEOVER (BENGALI)", f'"{bn_speech}"', "F8FAFC"),
        ]

        for idx, (label, text, bg) in enumerate(rows):
            r = st.rows[idx]
            c_lbl, c_val = r.cells[0], r.cells[1]
            c_lbl.width = Inches(1.8)
            c_val.width = Inches(4.7)
            set_cell_background(c_lbl, bg)
            set_cell_background(c_val, "FFFFFF")

            p_l = c_lbl.paragraphs[0]
            p_l.paragraph_format.space_before = Pt(3)
            p_l.paragraph_format.space_after = Pt(3)
            r_l = p_l.add_run(label)
            r_l.font.name = "Segoe UI"
            r_l.font.size = Pt(8.5)
            r_l.font.bold = True
            r_l.font.color.rgb = C_GREEN if "ENGLISH" in label else C_PRIMARY

            p_v = c_val.paragraphs[0]
            p_v.paragraph_format.space_before = Pt(3)
            p_v.paragraph_format.space_after = Pt(3)
            r_v = p_v.add_run(text)
            r_v.font.name = "Segoe UI"
            r_v.font.size = Pt(9.5)
            r_v.font.italic = True if "SPOKEN" in label else False
            r_v.font.color.rgb = C_PRIMARY

        doc.add_paragraph().paragraph_format.space_after = Pt(6)

    # Save Word document
    output_path = "KrishiDrishti_Video_Voiceover_Script.docx"
    try:
        doc.save(output_path)
        print(f"Voiceover Word document saved successfully to: {os.path.abspath(output_path)}")
    except PermissionError:
        fallback_path = "KrishiDrishti_Video_Voiceover_Script_2m33s.docx"
        doc.save(fallback_path)
        print(f"Original file is open in Word. Saved successfully to: {os.path.abspath(fallback_path)}")

if __name__ == "__main__":
    create_voiceover_docx()

