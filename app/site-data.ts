export type Product = {
  name: string;
  subtitle: string;
  price: number;
  image: string;
  category?: string;
  kind?: string;
};

export type TqProgram = {
  number: string;
  slug: string;
  title: string;
  tagline: string;
  short: string;
  description: string;
  objectives: string[];
  modules: string[];
  materials: string[];
  duration: string;
  methods: string[];
  benefits: string[];
  openTraining: string;
  inHouse: string;
  icon: string;
};

export const joeProducts: Product[] = [
  { name: "Sachet 10gr", subtitle: "Praktis dan pas untuk menemani aktivitas Anda.", price: 4000, image: "/produk-kopi-bubuk-100gr.jpeg" },
  { name: "Pouch 100gr", subtitle: "Ukuran pas untuk teman ngopi harian.", price: 33000, image: "/produk-kopi-bubuk-100gr.jpeg" },
  { name: "Pouch 200gr", subtitle: "Lebih banyak, lebih hemat, rasa tetap nikmat.", price: 63000, image: "/produk-kopi-bubuk-200gr.jpeg" },
  { name: "Pouch 500gr", subtitle: "Untuk Anda yang serius dengan kopi berkualitas.", price: 145000, image: "/produk-kopi-bubuk-500gr.jpeg" },
  { name: "Joe Coffee 1kg", subtitle: "Kemasan besar untuk rumah, kantor, dan usaha.", price: 285000, image: "/produk-kopi-bubuk-1kg.jpeg" },
];

export const culinaryProducts: Product[] = [
  { name: "Mie Ayam Kriuk", subtitle: "Mie kenyal dengan ayam berbumbu khas dan topping kriuk.", price: 20000, image: "/mie-ayam-kriuk.jpg", category: "Makanan Utama" },
  { name: "Mie Godhog Kuah Merah", subtitle: "Mie godhog dengan kuah merah pedas gurih khas Joe Coffee.", price: 20000, image: "/mie-godhog-merah.jpg", category: "Makanan Utama" },
  { name: "Nasgomer", subtitle: "Nasi goreng merah spesial dengan rasa khas yang unik.", price: 23000, image: "/nasgomer.jpg", category: "Makanan Utama" },
  { name: "Es Kopi", subtitle: "Dua shot espresso dan es untuk rasa kopi yang tegas.", price: 15000, image: "/produk-es-kopi.webp", category: "Minuman" },
  { name: "Kopi Susu Gula Aren", subtitle: "Kopi pilihan dengan susu dan gula aren asli.", price: 18000, image: "/produk-es-kopi-susu.webp", category: "Minuman" },
  { name: "Kopi Susu Jahe Serai", subtitle: "Hangat, segar, aromatik, dan menenangkan.", price: 20000, image: "/produk-es-kopi-jahe-serai.webp", category: "Minuman" },
];

export const bookProducts = [
  { name: "PINESTHI", subtitle: "Novel Bahasa Jawa", price: 59000, image: "/pinesthi-hd.png", kind: "Buku Fisik", category: "Buku" },
  { name: "MERAPI", subtitle: "Antologi Geguritan Basa Jawa", price: 49000, image: "/merapi-hd.png", kind: "Buku Fisik", category: "Buku" },
  { name: "Mengapa Tuhan Seakan Diam", subtitle: "Bacaan reflektif rohani Kristen", price: 39000, image: "/mengapa-tuhan-seakan-diam.jpg", kind: "E-Book (PDF)", category: "E-Book" },
  { name: "Warung Ramai, Untungnya ke Mana?", subtitle: "Seri praktis pengembangan UMKM", price: 39000, image: "/warung-ramai-untung-kemana.jpg", kind: "E-Book (PDF)", category: "E-Book" },
];

export const tqPrograms: TqProgram[] = [
  {
    number: "01",
    slug: "ai-powered-productivity-at-work",
    title: "AI-Powered Productivity at Work",
    tagline: "Bekerja Lebih Cerdas, Cepat & Produktif dengan AI",
    short: "Bekerja lebih cerdas dengan AI untuk meningkatkan produktivitas.",
    description: "Artificial Intelligence telah mengubah cara orang bekerja. Program ini membantu peserta memahami dan menggunakan AI secara praktis untuk menyelesaikan pekerjaan sehari-hari dengan lebih cepat, efektif, dan berkualitas—tanpa kehilangan sentuhan manusia.",
    objectives: ["Memahami fungsi AI dalam dunia kerja.", "Mengidentifikasi pekerjaan yang dapat dibantu AI.", "Membuat prompt yang efektif.", "Menggunakan AI untuk pekerjaan administratif dan analitis.", "Meningkatkan produktivitas pribadi.", "Memahami risiko, etika, dan keamanan penggunaan AI."],
    modules: ["AI & The Future of Work", "AI Mindset & Digital Productivity", "Prompt Engineering", "AI for Daily Work", "AI for Managers", "Responsible AI"],
    materials: ["Mengenal Artificial Intelligence dan Generative AI", "AI sebagai work assistant", "AI vs human capability", "Identifikasi pekerjaan yang dapat diotomatisasi", "Prinsip membuat prompt", "Struktur prompt efektif", "Prompt untuk menulis", "Prompt untuk menganalisis", "Prompt untuk brainstorming", "AI untuk email dan laporan", "AI untuk meeting dan notulen", "AI untuk presentasi", "AI untuk analisis data", "AI untuk HR", "AI untuk marketing", "AI untuk sales", "AI untuk customer service", "AI untuk manager", "Data privacy", "Hallucination", "Bias dan ethical AI", "Human verification"],
    duration: "2 Hari / 12 Jam",
    methods: ["Presentation", "Demonstration", "Hands-on practice", "Case study", "Individual assignment", "Group discussion"],
    benefits: ["E-module", "Workbook", "Prompt library", "Template AI productivity", "Sertifikat", "Assignment", "Personal AI Productivity Plan"],
    openTraining: "Rp1.500.000/orang",
    inHouse: "Mulai Rp12.500.000/program",
    icon: "AI",
  },
  {
    number: "02",
    slug: "the-new-manager",
    title: "The New Manager",
    tagline: "From Supervisor to People Leader",
    short: "Dari supervisor menjadi people leader yang efektif.",
    description: "Banyak orang dipromosikan menjadi supervisor atau manager karena memiliki kemampuan teknis yang baik, tetapi belum tentu memiliki kemampuan memimpin manusia. Program ini membantu supervisor dan manager baru bertransformasi dari ‘orang yang mengerjakan pekerjaan’ menjadi ‘orang yang mampu menggerakkan orang lain menghasilkan kinerja.’",
    objectives: ["Memahami peran manager modern.", "Memimpin dengan jelas.", "Mendelegasikan pekerjaan.", "Memberikan feedback.", "Melakukan coaching.", "Mengelola konflik.", "Mengembangkan anggota tim.", "Membangun accountability."],
    modules: ["From Employee to Leader", "Managing People", "Communication for Managers", "Coaching & Developing People", "Performance Management", "Managing Conflict", "Manager as Culture Builder"],
    materials: ["Individual contributor vs manager", "Manager vs leader", "Leadership mindset", "Authority dan influence", "Role & responsibility manager", "Delegation", "Direction", "Monitoring", "Empowerment", "Trust", "Accountability", "Active listening", "Giving instruction", "Giving feedback", "Difficult conversation", "Coaching mindset", "GROW Model", "Performance conversation", "Performance problem", "Conflict management", "Difficult employee", "Team culture", "Role modelling", "Integrity", "Discipline", "Teamwork"],
    duration: "2 Hari / 12 Jam",
    methods: ["Interactive lecture", "Role play", "Case study", "Simulation", "Group discussion", "Coaching practice", "Action plan"],
    benefits: ["E-module", "Manager Workbook", "Coaching template", "Feedback template", "Performance conversation template", "Sertifikat", "30-Day Manager Action Plan"],
    openTraining: "Rp1.750.000/orang",
    inHouse: "Mulai Rp15.000.000/program",
    icon: "NM",
  },
  {
    number: "03",
    slug: "leadership-for-business-performance",
    title: "Leadership for Business Performance",
    tagline: "Memimpin Manusia, Menggerakkan Kinerja, Menciptakan Hasil",
    short: "Memimpin dengan visi, menggerakkan tim, dan menciptakan hasil.",
    description: "Leadership bukan hanya kemampuan memimpin orang. Leadership harus mampu menghasilkan perubahan dan kinerja bisnis. Program ini menghubungkan leadership → people → process → customer → business result.",
    objectives: ["Membangun leadership mindset.", "Menetapkan arah dan prioritas.", "Mengembangkan strategic thinking.", "Mengambil keputusan.", "Memimpin perubahan.", "Menghubungkan kepemimpinan dengan business performance."],
    modules: ["Leadership Mindset", "Leading with Clarity", "Situational Leadership", "Strategic Thinking", "Decision Making", "Leading Change", "Leadership & Business Results"],
    materials: ["Leadership vs management", "Leadership credibility", "Character", "Vision", "Mission", "Strategic priorities", "Goal setting", "Situational leadership", "Directing", "Coaching", "Supporting", "Delegating", "SWOT", "Competitive advantage", "Business priorities", "Decision framework", "Risk analysis", "Change management", "Resistance to change", "Employee engagement", "Leadership KPI", "Productivity", "Quality", "Cost", "Revenue", "Customer satisfaction"],
    duration: "2 Hari / 12 Jam",
    methods: ["Business case", "Simulation", "Leadership exercise", "Group discussion", "Role play", "Individual reflection", "Action planning"],
    benefits: ["Leadership Workbook", "Assessment", "Business Leadership Canvas", "Action Plan", "Sertifikat"],
    openTraining: "Rp1.750.000/orang",
    inHouse: "Mulai Rp15.000.000/program",
    icon: "LB",
  },
  {
    number: "04",
    slug: "strategic-hr-talent-management",
    title: "Strategic HR & Talent Management",
    tagline: "From HR Administration to Strategic Business Partner",
    short: "HR sebagai mitra strategis untuk pertumbuhan bisnis.",
    description: "HR modern tidak cukup hanya mengelola administrasi karyawan. HR harus mampu memahami bisnis, mengembangkan talent, mengukur produktivitas, dan membantu perusahaan mencapai tujuan.",
    objectives: ["Memahami HR strategis.", "Membuat workforce planning.", "Mengembangkan competency management.", "Membangun sistem performance management.", "Mengembangkan talent.", "Membuat succession plan.", "Menggunakan HR metrics."],
    modules: ["The New Role of HR", "Workforce Planning", "Competency Management", "Recruitment & Selection", "Performance Management", "Talent Management", "Employee Engagement & Retention", "HR Analytics"],
    materials: ["Administrative HR", "Operational HR", "Strategic HR", "HR Business Partner", "Business strategy", "Organization structure", "Manpower planning", "Productivity", "Job analysis", "Job description", "Job specification", "Competency model", "Competency dictionary", "Recruitment", "Behavioral interview", "KPI", "OKR", "Performance appraisal", "Talent identification", "Nine-box", "High potential", "Succession planning", "Career path", "IDP", "Employee engagement", "Retention", "Turnover", "Absenteeism", "Training ROI", "HR dashboard"],
    duration: "3 Hari / 18 Jam",
    methods: ["Lecture", "Workshop", "HR case study", "Group exercise", "Template practice", "Business simulation"],
    benefits: ["HR Workbook", "Competency template", "KPI template", "Talent management template", "HR dashboard template", "Sertifikat"],
    openTraining: "Rp2.250.000/orang",
    inHouse: "Mulai Rp20.000.000/program",
    icon: "HR",
  },
  {
    number: "05",
    slug: "high-performance-team",
    title: "High Performance Team",
    tagline: "From Group of People to Team That Delivers Results",
    short: "Membangun tim solid yang kolaboratif dan berorientasi hasil.",
    description: "Perusahaan tidak menjadi kuat hanya karena memiliki orang-orang hebat. Perusahaan membutuhkan tim yang mampu bekerja sama, saling percaya, berkomunikasi, dan bertanggung jawab terhadap hasil.",
    objectives: ["Membangun trust.", "Meningkatkan teamwork.", "Meningkatkan komunikasi.", "Mengelola konflik.", "Membangun accountability.", "Membentuk high performance culture."],
    modules: ["Understanding Team", "Building Trust", "Team Communication", "Team Roles", "Managing Team Conflict", "Accountability", "High Performance Culture"],
    materials: ["Group vs team", "Team effectiveness", "Team maturity", "Trust", "Integrity", "Psychological safety", "Active listening", "Feedback", "Coordination", "Collaboration", "Role clarity", "Strength mapping", "Conflict", "Conflict resolution", "Negotiation", "Ownership", "Responsibility", "Commitment", "Recognition", "Continuous improvement", "Learning culture", "Result orientation"],
    duration: "2 Hari / 12 Jam",
    methods: ["Team building", "Simulation", "Role play", "Case study", "Outdoor/indoor activity", "Group challenge", "Reflection"],
    benefits: ["Team Assessment", "Team Charter", "Team Action Plan", "Workbook", "Sertifikat"],
    openTraining: "Rp1.500.000/orang",
    inHouse: "Mulai Rp15.000.000/program",
    icon: "HT",
  },
  {
    number: "06",
    slug: "performance-management-kpi-mastery",
    title: "Performance Management & KPI Mastery",
    tagline: "Mengubah Target Menjadi Kinerja yang Terukur",
    short: "Mengukur, mengelola, dan meningkatkan kinerja secara terukur.",
    description: "Target yang tidak jelas akan menghasilkan kinerja yang tidak jelas. Program ini membantu perusahaan dan manager membangun sistem KPI yang terhubung dari tujuan perusahaan sampai individu.",
    objectives: ["Memahami performance management.", "Menurunkan strategic objectives menjadi KPI.", "Membuat KPI yang baik.", "Melakukan performance review.", "Memberikan feedback.", "Menangani poor performance."],
    modules: ["Performance Management", "Translating Strategy into KPI", "Designing Good KPI", "KPI by Function", "Performance Review", "Managing Poor Performance", "Performance Culture"],
    materials: ["Performance cycle", "Strategic alignment", "Company objectives", "Department objectives", "Individual objectives", "KPI cascade", "SMART KPI", "Leading indicator", "Lagging indicator", "KPI Sales", "KPI HR", "KPI Finance", "KPI Operations", "KPI Customer Service", "Performance review", "Feedback", "Rating", "Calibration", "Performance improvement plan", "Accountability", "Recognition", "Reward", "Consequence"],
    duration: "2 Hari / 12 Jam",
    methods: ["Workshop", "KPI clinic", "Case study", "Practice", "Group discussion", "Simulation"],
    benefits: ["KPI Workbook", "KPI template", "KPI Cascade Template", "Performance Review Template", "Performance Dashboard Template", "Sertifikat"],
    openTraining: "Rp1.750.000/orang",
    inHouse: "Mulai Rp17.500.000/program",
    icon: "KPI",
  },
  {
    number: "07",
    slug: "problem-solving-decision-making",
    title: "Problem Solving & Decision Making",
    tagline: "Think Clearly. Decide Better. Solve Faster.",
    short: "Berpikir jernih, memutuskan dengan tepat, dan menyelesaikan masalah dengan cepat.",
    description: "Masalah bisnis tidak selalu membutuhkan orang yang bekerja lebih keras. Sering kali yang dibutuhkan adalah kemampuan berpikir lebih jernih untuk menemukan akar masalah dan mengambil keputusan yang tepat.",
    objectives: ["Membedakan masalah dan gejala.", "Berpikir kritis.", "Menemukan root cause.", "Menghasilkan alternatif solusi.", "Mengambil keputusan berbasis data.", "Membuat action plan."],
    modules: ["Problem Identification", "Critical Thinking", "Root Cause Analysis", "Generating Solutions", "Decision Making", "Execution", "Continuous Improvement"],
    materials: ["Problem vs symptom", "Facts vs assumption", "Critical thinking", "Cognitive bias", "5 Why", "Fishbone Diagram", "Pareto Analysis", "Problem Tree", "Brainstorming", "SCAMPER", "Alternative solutions", "Decision criteria", "Risk analysis", "Cost-benefit analysis", "Decision matrix", "Action plan", "PDCA", "Monitoring", "Evaluation", "Lessons learned"],
    duration: "2 Hari / 12 Jam",
    methods: ["Case study", "Business simulation", "Problem-solving workshop", "Group exercise", "Real business problem"],
    benefits: ["Problem Solving Toolkit", "RCA templates", "Decision Matrix", "PDCA template", "Business Problem Action Plan", "Sertifikat"],
    openTraining: "Rp1.500.000/orang",
    inHouse: "Mulai Rp15.000.000/program",
    icon: "PS",
  },
  {
    number: "08",
    slug: "customer-experience-service-excellence",
    title: "Customer Experience & Service Excellence",
    tagline: "Creating Customers Who Want to Come Back",
    short: "Menciptakan pengalaman terbaik bagi pelanggan dan membangun loyalitas.",
    description: "Pelayanan bukan hanya tentang tersenyum kepada pelanggan. Service excellence adalah kemampuan memahami kebutuhan pelanggan, memberikan pengalaman yang konsisten, menangani masalah, dan membangun loyalitas.",
    objectives: ["Memahami customer experience.", "Memetakan customer journey.", "Meningkatkan komunikasi.", "Menangani complaint.", "Melakukan service recovery.", "Membangun service culture."],
    modules: ["Customer-Centric Mindset", "Customer Journey", "Communication Excellence", "Handling Customer Complaints", "Service Recovery", "Building Service Culture", "Measuring Service"],
    materials: ["Customer expectation", "Customer value", "Internal customer", "External customer", "Customer experience", "Customer journey mapping", "Touchpoints", "Pain points", "Moments of truth", "Active listening", "Empathy", "Positive language", "Complaint psychology", "Complaint handling", "Apology", "Solution", "Recovery", "Follow-up", "Customer satisfaction", "NPS", "Customer feedback", "Service KPI"],
    duration: "2 Hari / 12 Jam",
    methods: ["Role play", "Customer simulation", "Case study", "Video analysis", "Group discussion", "Service practice"],
    benefits: ["Service Excellence Workbook", "Customer Journey Template", "Complaint Handling Script", "Service Recovery Framework", "Sertifikat"],
    openTraining: "Rp1.500.000/orang",
    inHouse: "Mulai Rp15.000.000/program",
    icon: "CX",
  },
  {
    number: "09",
    slug: "sales-excellence-consultative-selling",
    title: "Sales Excellence & Consultative Selling",
    tagline: "Stop Selling Products. Start Solving Customer Problems.",
    short: "Menjual solusi, bukan sekadar produk. Meningkatkan nilai dan kepercayaan pelanggan.",
    description: "Sales modern bukan hanya tentang menawarkan produk dan mengejar target. Sales harus mampu memahami kebutuhan pelanggan, menemukan masalah, memberikan solusi, membangun kepercayaan, dan menciptakan hubungan jangka panjang.",
    objectives: ["Membangun sales mindset.", "Memahami customer needs.", "Melakukan consultative selling.", "Menggali kebutuhan.", "Menangani objection.", "Melakukan negotiation.", "Meningkatkan closing.", "Mengelola sales pipeline."],
    modules: ["Modern Sales Mindset", "Understanding Customer", "Consultative Selling", "Sales Presentation", "Handling Objections", "Negotiation", "Closing & Follow-Up", "Sales Pipeline"],
    materials: ["Sales mindset", "Customer value", "Customer profile", "Buying behavior", "Customer needs", "Pain points", "Discovery questions", "Active listening", "Needs analysis", "Value proposition", "Feature vs benefit", "Sales storytelling", "Objection handling", "Price objection", "Competitor objection", "Negotiation", "Win-win negotiation", "Closing techniques", "Buying signals", "Follow-up", "Prospecting", "Sales pipeline", "Conversion", "Sales forecasting", "Sales KPI"],
    duration: "2 Hari / 12 Jam",
    methods: ["Sales simulation", "Role play", "Case study", "Negotiation exercise", "Presentation practice", "Sales challenge"],
    benefits: ["Sales Workbook", "Discovery Question Template", "Objection Handling Guide", "Sales Pipeline Template", "Sales Action Plan", "Sertifikat"],
    openTraining: "Rp1.750.000/orang",
    inHouse: "Mulai Rp17.500.000/program",
    icon: "SE",
  },
  {
    number: "10",
    slug: "career-agility-future-skills",
    title: "Career Agility & Future Skills",
    tagline: "Prepare Yourself for the Future of Work",
    short: "Siap menghadapi masa depan dengan keterampilan yang relevan.",
    description: "Dunia kerja berubah cepat. Teknologi, AI, otomatisasi, dan perubahan kebutuhan perusahaan membuat seseorang tidak cukup hanya mengandalkan kemampuan yang dimilikinya hari ini. Program ini membantu peserta membangun learning agility, adaptability, human skills, dan career strategy untuk menghadapi perubahan.",
    objectives: ["Memahami perubahan dunia kerja.", "Mengidentifikasi future skills.", "Memetakan skill gap.", "Membangun learning agility.", "Mengembangkan human skills.", "Membuat strategi karier.", "Membuat personal development plan."],
    modules: ["The Future of Work", "Personal Career Strategy", "Skills Mapping", "Learning Agility", "Human Skills in AI Era", "Personal Branding", "Personal Development Plan"],
    materials: ["Future of work", "AI", "Automation", "Digital transformation", "Changing jobs", "Future skills", "Career vision", "Career goals", "Strength assessment", "Weakness identification", "Skill mapping", "Skill gap", "Transferable skills", "Learning mindset", "Adaptability", "Resilience", "Curiosity", "Critical thinking", "Creativity", "Communication", "Empathy", "Problem solving", "Leadership", "Personal branding", "Professional identity", "Networking", "Portfolio", "Personal Development Plan", "90-Day Development Plan"],
    duration: "2 Hari / 12 Jam",
    methods: ["Self-assessment", "Workshop", "Group discussion", "Case study", "Career simulation", "Personal branding exercise", "Individual action plan"],
    benefits: ["Future Skills Assessment", "Career Development Workbook", "Skills Gap Map", "Personal Development Plan", "90-Day Career Action Plan", "Sertifikat"],
    openTraining: "Rp1.500.000/orang",
    inHouse: "Mulai Rp15.000.000/program",
    icon: "FS",
  },
];

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}
