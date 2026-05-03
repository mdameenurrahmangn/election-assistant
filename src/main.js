import './style.css'

const app = document.querySelector('#app')

// Content Data
let currentLang = localStorage.getItem('civicLang') || 'en';

const translations = {
  en: {
    'nav.journey': 'Journey', 'nav.guide': 'Guide', 'nav.finder': 'Booth Finder', 'nav.timeline': 'Timeline', 'nav.faq': 'FAQ',
    'hero.btn.journey': 'Start My Journey', 'hero.btn.finder': 'Find Polling Booth',
    'h.journey': 'Personalized Guidance', 'h.guide': 'Preparation Dashboard', 'h.finder': 'Find Your Polling Station', 'h.timeline': 'State-Wise Election Tracker', 'h.faq': 'Frequently Asked Questions',
    'f.epic': 'Search by EPIC / Voter ID', 'f.det': 'Search by Details', 'f.btn': 'Prepare Search Query',
    'f.lbl.epic': 'EPIC Number (Voter ID)', 'f.lbl.name': 'Full Name', 'f.lbl.dob': 'Date of Birth', 'f.lbl.state': 'State',
    't.sel': 'Select State/UT to Track:', 't.unav': 'No active state election currently scheduled.',
    'chat.welcome': "Hi! I'm Civic AI Guide. Ask me about voting, voter ID, elections, or registration.",
    'chat.el': 'Check Eligibility', 'chat.reg': 'Register to Vote', 'chat.date': 'Election Dates', 'chat.id': 'Voter ID Help', 'chat.poll': 'Polling Station Info',
    'chat.bot': '<i class="fa-solid fa-robot" style="color: var(--saffron); font-size: 1.2rem;"></i> Civic AI Guide'
  },
  hi: {
    'nav.journey': 'यात्रा', 'nav.guide': 'मार्गदर्शक', 'nav.finder': 'बूथ खोजक', 'nav.timeline': 'समयरेखा', 'nav.faq': 'सामान्य प्रश्न',
    'hero.btn.journey': 'मेरी यात्रा शुरू करें', 'hero.btn.finder': 'मतदान केंद्र खोजें',
    'h.journey': 'व्यक्तिगत मार्गदर्शन', 'h.guide': 'तैयारी डैशबोर्ड', 'h.finder': 'अपना मतदान केंद्र खोजें', 'h.timeline': 'राज्य-वार चुनाव ट्रैकर', 'h.faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'f.epic': 'EPIC / वोटर आईडी से खोजें', 'f.det': 'विवरण से खोजें', 'f.btn': 'खोज तैयार करें',
    'f.lbl.epic': 'EPIC नंबर', 'f.lbl.name': 'पूरा नाम', 'f.lbl.dob': 'जन्म तिथि', 'f.lbl.state': 'राज्य',
    't.sel': 'ट्रैक करने के लिए राज्य चुनें:', 't.unav': 'वर्तमान में कोई सक्रिय चुनाव निर्धारित नहीं है।',
    'chat.welcome': 'नमस्ते! मैं सिविक एआई गाइड हूं। मुझसे मतदान, वोटर आईडी, चुनाव या पंजीकरण के बारे में पूछें।',
    'chat.el': 'पात्रता जांचें', 'chat.reg': 'पंजीकरण करें', 'chat.date': 'चुनाव की तारीखें', 'chat.id': 'वोटर आईडी सहायता', 'chat.poll': 'मतदान केंद्र की जानकारी',
    'chat.bot': '<i class="fa-solid fa-robot" style="color: var(--saffron); font-size: 1.2rem;"></i> सिविक एआई गाइड'
  },
  ta: {
    'nav.journey': 'பயணம்', 'nav.guide': 'வழிகாட்டி', 'nav.finder': 'சாவடி தேடு', 'nav.timeline': 'காலவரிசை', 'nav.faq': 'கேள்விகள்',
    'hero.btn.journey': 'பயணத்தை தொடங்கு', 'hero.btn.finder': 'வாக்குச் சாவடி தேடு',
    'h.journey': 'தனிப்பயனாக்கப்பட்ட வழிகாட்டுதல்', 'h.guide': 'தயாரிப்பு டாஷ்போர்டு', 'h.finder': 'வாக்குச் சாவடியைக் கண்டறியவும்', 'h.timeline': 'மாநில வாரியான தேர்தல் டிராக்கர்', 'h.faq': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'f.epic': 'EPIC மூலம் தேடுக', 'f.det': 'விவரங்கள் மூலம் தேடுக', 'f.btn': 'தேடலைத் தயார் செய்',
    'f.lbl.epic': 'EPIC எண்', 'f.lbl.name': 'முழு பெயர்', 'f.lbl.dob': 'பிறந்த தேதி', 'f.lbl.state': 'மாநிலம்',
    't.sel': 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்:', 't.unav': 'தற்போது எந்த தேர்தலும் திட்டமிடப்படவில்லை.',
    'chat.welcome': 'வணக்கம்! நான் சிவிக் AI வழிகாட்டி. வாக்களிப்பு, வாக்காளர் ஐடி பற்றி கேளுங்கள்.',
    'chat.el': 'தகுதியைச் சரிபார்க்கவும்', 'chat.reg': 'பதிவு செய்', 'chat.date': 'தேர்தல் தேதிகள்', 'chat.id': 'வாக்காளர் ஐடி உதவி', 'chat.poll': 'வாக்குச் சாவடி தகவல்',
    'chat.bot': '<i class="fa-solid fa-robot" style="color: var(--saffron); font-size: 1.2rem;"></i> சிவிக் AI வழிகாட்டி'
  }
};

const botReplies = {
  en: {
    default: "I am an AI assistant. What specific election information do you need?",
    eligib: "To check eligibility: Are you 18+ and an Indian citizen? If yes, you can register to vote!",
    register: "To register, fill out Form 6 on the official Voters' Service Portal with proof of age and residence.",
    epic: "Your Voter ID (EPIC) is your primary document. You can also use Aadhaar, PAN, Passport, etc.",
    booth: "Please verify your polling station using your EPIC on the official ECI or NVSP portal.",
    date: "Current 2026 Election Dates: Tamil Nadu (Apr 23), West Bengal (Apr 23 & 29). Assam, Kerala, Puducherry (Apr 9).",
    result: "Counting of votes and result declaration for all active elections is May 4, 2026."
  },
  hi: {
    default: "मैं एक एआई सहायक हूं। आपको कौन सी चुनाव जानकारी चाहिए?",
    eligib: "पात्रता जांच: क्या आप 18+ और नागरिक हैं? यदि हाँ, तो आप मतदान के लिए पंजीकरण कर सकते हैं!",
    register: "पंजीकरण करने के लिए, आधिकारिक वोटर्स सर्विस पोर्टल पर फॉर्म 6 भरें।",
    epic: "आपका वोटर आईडी (EPIC) मुख्य दस्तावेज़ है। आप आधार, पैन, आदि का उपयोग कर सकते हैं।",
    booth: "कृपया आधिकारिक ECI पोर्टल पर अपने EPIC का उपयोग करके अपने मतदान केंद्र को सत्यापित करें।",
    date: "चुनाव 2026: तमिलनाडु (23 अप्रैल), पश्चिम बंगाल (23 और 29 अप्रैल)। असम, केरल, पुडुचेरी (9 अप्रैल)।",
    result: "सभी सक्रिय चुनावों के लिए मतों की गिनती 4 मई, 2026 को होगी।"
  },
  ta: {
    default: "நான் ஒரு AI உதவியாளர். உங்களுக்கு என்ன தேர்தல் தகவல் வேண்டும்?",
    eligib: "தகுதி சரிபார்ப்பு: நீங்கள் 18+ மற்றும் குடிமகனா? ஆம் எனில், வாக்களிக்க பதிவு செய்யலாம்!",
    register: "பதிவு செய்ய, அதிகாரப்பூர்வ வாக்காளர் சேவை போர்ட்டலில் படிவம் 6-ஐ நிரப்பவும்.",
    epic: "உங்கள் வாக்காளர் ஐடி (EPIC) முக்கிய ஆவணம். ஆதார், பான் போன்றவற்றையும் பயன்படுத்தலாம்.",
    booth: "அதிகாரப்பூர்வ ECI போர்ட்டலில் உங்கள் EPIC ஐப் பயன்படுத்தி உங்கள் வாக்குச் சாவடியைச் சரிபார்க்கவும்.",
    date: "தேர்தல் 2026: தமிழ்நாடு (ஏப் 23), மேற்கு வங்கம் (ஏப் 23 & 29). அசாம், கேரளா, புதுச்சேரி (ஏப் 9).",
    result: "அனைத்து தேர்தல்களுக்கும் வாக்கு எண்ணிக்கை மே 4, 2026."
  }
};

const data = {
  checklist: [
    { id: 'chk-photo', item: 'Passport-sized color photograph', req: true },
    { id: 'chk-age', item: 'Proof of Age (Birth Certificate, Aadhaar, etc.)', req: true },
    { id: 'chk-res', item: 'Proof of Residence (Electricity Bill, Aadhaar, etc.)', req: true },
    { id: 'chk-mob', item: 'Valid Mobile Number for OTP', req: true },
    { id: 'chk-fam', item: "Family member's EPIC number (Optional)", req: false }
  ],
  locations: {
    'Delhi': { districts: ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi'] },
    'Maharashtra': { districts: ['Mumbai', 'Pune', 'Nagpur', 'Thane'] },
    'Karnataka': { districts: ['Bengaluru', 'Mysuru', 'Hubli', 'Mangaluru'] },
    'Tamil Nadu': { districts: ['Chennai', 'Coimbatore', 'Madurai', 'Trichy'] },
    'Uttar Pradesh': { districts: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'] }
  },
  faqs: [
    { q: "Can I vote if I don't have a physical Voter ID card?", a: 'Yes, if your name is on the electoral roll, you can vote using 12 approved alternative IDs such as Aadhaar, PAN Card, Passport, or Driving License.' },
    { q: 'How can I check if my name is on the voter list?', a: 'You can search your name on the official Election Commission portal (electoralsearch.eci.gov.in) using your details or EPIC number.' },
    { q: 'What is Form 6 used for?', a: 'Form 6 is the application form for new voters to register themselves on the electoral roll for the first time.' },
    { q: 'I recently shifted to a new city. Can I vote there?', a: "Yes, you need to fill Form 8 on the Voters' Service Portal to shift your residence and update your voting constituency." }
  ],
  timeline: [
    { date: 'Oct 15, 2026', event: 'Last date for Voter Registration' },
    { date: 'Nov 02, 2026', event: 'Release of Final Electoral Roll' },
    { date: 'Nov 20, 2026', event: 'Election Day (Phase 1)' },
    { date: 'Dec 05, 2026', event: 'Counting Day & Results' }
  ]
}

// Render Initial UI
function renderApp() {
  app.innerHTML = `
    <!-- Navigation -->
    <nav>
      <div class="container nav-container">
        <a href="#" class="brand">
          <i class="fa-solid fa-check-to-slot"></i>
          Election<span style="color: var(--saffron)">Assistant</span>
        </a>
        <div class="hamburger-btn" onclick="toggleNav()">
          <i class="fa-solid fa-bars"></i>
        </div>
        <div class="nav-menu" id="nav-menu">
          <div class="nav-links">
            <a href="#journey" data-i18n="nav.journey" onclick="closeNav()">Journey</a>
            <a href="#guide" data-i18n="nav.guide" onclick="closeNav()">Guide</a>
            <a href="#finder" data-i18n="nav.finder" onclick="closeNav()">Booth Finder</a>
            <a href="#timeline" data-i18n="nav.timeline" onclick="closeNav()">Timeline</a>
            <a href="#faq" data-i18n="nav.faq" onclick="closeNav()">FAQ</a>
          </div>
          <div class="accessibility-controls">
            <select class="lang-select" title="Language" id="lang-selector" onchange="changeLanguage(this.value)">
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="ta">தமிழ்</option>
            </select>
            <button class="voice-btn" title="Voice Navigation" id="voice-toggle">
              <span class="material-symbols-outlined">volume_up</span>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Your Voice. <br><span class="text-gradient">Your Vote. Your Power.</span></h1>
          <p>The official AI-powered guide for Indian citizens. Simplify your election process, from registration to casting your vote on election day.</p>
          <div class="hero-actions">
            <a href="#journey" class="btn btn-primary" data-i18n="hero.btn.journey">Start My Journey</a>
            <a href="#finder" class="btn btn-secondary" data-i18n="hero.btn.finder">Find Polling Booth</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Personalized Journey Section -->
    <section id="journey" class="journey-section">
      <div class="container">
        <div class="section-header">
          <h2 data-i18n="h.journey">Personalized Guidance</h2>
          <p>Let's figure out exactly what you need to do. Answer a few simple questions.</p>
        </div>
        
        <div class="questionnaire glass-card">
          <div id="q1" class="question-card active">
            <h3>Are you a first-time voter?</h3>
            <div class="options-grid">
              <button class="option-btn" onclick="handleJourney('q1', 'yes')">Yes, I am new</button>
              <button class="option-btn" onclick="handleJourney('q1', 'no')">No, I have voted before</button>
            </div>
          </div>
          
          <div id="q2-new" class="question-card">
            <h3>Have you registered for your Voter ID yet?</h3>
            <div class="options-grid">
              <button class="option-btn" onclick="handleJourney('q2-new', 'yes')">Yes, registered</button>
              <button class="option-btn" onclick="handleJourney('q2-new', 'no')">No, not yet</button>
            </div>
          </div>

          <div id="q2-old" class="question-card">
            <h3>Do you need to update any details (Address, Name)?</h3>
            <div class="options-grid">
              <button class="option-btn" onclick="handleJourney('q2-old', 'yes')">Yes, update details</button>
              <button class="option-btn" onclick="handleJourney('q2-old', 'no')">No, just need to vote</button>
            </div>
          </div>

          <div id="journey-result" class="journey-result">
            <h3 style="margin-bottom: 1rem; color: var(--green);">Here is your action plan:</h3>
            <div id="result-content" style="text-align: left; background: var(--bg-surface); padding: 1.5rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;"></div>
            <button class="btn btn-primary" onclick="resetJourney()">Start Over</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Guide & Checklist -->
    <section id="guide">
      <div class="container">
        <div class="section-header">
          <h2 data-i18n="h.guide">Preparation Dashboard</h2>
          <p>Follow these steps to ensure you're ready for election day.</p>
        </div>
        
        <div class="guide-grid">
          <div class="steps-container glass-card">
            <h3 style="margin-bottom: 2rem;">Voter Registration Steps</h3>
            
            <div class="guide-step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Check Eligibility</h4>
                <p>Ensure you are an Indian citizen, 18+ years old, and ordinarily resident in your constituency.</p>
              </div>
            </div>
            
            <div class="guide-step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Gather Documents</h4>
                <p>Collect your age and address proofs as per the checklist.</p>
              </div>
            </div>
            
            <div class="guide-step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Fill Form 6</h4>
                <p>Apply online via the Voters' Service Portal or Voter Helpline App.</p>
              </div>
            </div>
            
            <div class="guide-step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h4>Verify Name</h4>
                <p>Check the electoral roll online to confirm your registration.</p>
              </div>
            </div>
          </div>
          
          <div class="checklist-container glass-card">
            <h3 style="margin-bottom: 1.5rem;">Document Checklist</h3>
            <div class="progress-bar-container">
              <div class="progress-bar" id="checklist-progress"></div>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">
              <span id="progress-text">0</span>% Completed
            </p>
            
            <div class="checklist-items" id="checklist-list">
              ${data.checklist.map(item => `
                <div class="checklist-item" id="item-${item.id}" onclick="toggleCheck('${item.id}')">
                  <div class="custom-checkbox">
                    <i class="fa-solid fa-check"></i>
                  </div>
                  <div class="item-text">
                    ${item.item} ${item.req ? '<span style="color: var(--saffron);">*</span>' : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Polling Booth Finder -->
    <section id="finder" class="finder-section">
      <div class="container">
        <div class="section-header">
          <h2 data-i18n="h.finder">Find Your Polling Station</h2>
          <p>Know exactly where you need to go on election day.</p>
        </div>
        
        <div class="glass-card" style="max-width: 800px; margin: 0 auto;">
          <div style="background: rgba(255, 153, 51, 0.1); padding: 1rem; border-left: 4px solid var(--saffron); border-radius: var(--radius-sm); margin-bottom: 2rem;">
            <p style="font-size: 0.95rem; color: var(--white); margin: 0;"><i class="fa-solid fa-shield-halved" style="color: var(--saffron); margin-right: 0.5rem;"></i> <strong>Official Verification Required:</strong> This tool helps you format your search query. Exact polling station data requires official Election Commission verification.</p>
          </div>

          <div style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
            <button class="tab-btn active" id="tab-epic" onclick="switchFinderTab('epic')" data-i18n="f.epic">Search by EPIC / Voter ID</button>
            <button class="tab-btn" id="tab-details" onclick="switchFinderTab('details')" data-i18n="f.det">Search by Details</button>
          </div>

          <!-- Search by EPIC Form -->
          <div id="form-epic" class="finder-form">
            <div class="form-group" style="grid-column: 1 / -1;">
              <label data-i18n="f.lbl.epic">EPIC Number (Voter ID)</label>
              <input type="text" id="epic-input" class="form-control" placeholder="e.g. ABC1234567">
            </div>
          </div>

          <!-- Search by Details Form -->
          <div id="form-details" class="finder-form" style="display: none;">
            <div class="form-group">
              <label data-i18n="f.lbl.name">Full Name</label>
              <input type="text" id="name-input" class="form-control" placeholder="Enter Full Name">
            </div>
            <div class="form-group">
              <label data-i18n="f.lbl.dob">Date of Birth</label>
              <input type="date" id="dob-input" class="form-control">
            </div>
            <div class="form-group" style="grid-column: 1 / -1;">
              <label data-i18n="f.lbl.state">State</label>
              <select id="state-sel-details" class="form-control">
                <option value="">Select State</option>
                ${Object.keys(data.locations).map(s => `<option value="${s}">${s}</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="grid-column: 1 / -1;" id="advanced-search-container">
              <button onclick="document.getElementById('advanced-details').style.display = 'grid'" class="btn btn-secondary" style="width: 100%; border: 1px dashed var(--glass-border);">+ Advanced Search (Optional)</button>
            </div>
            <div id="advanced-details" class="advanced-details-grid" style="display: none; grid-column: 1 / -1; gap: 1.5rem;">
               <div class="form-group">
                 <label>Relative's Name</label>
                 <input type="text" id="rel-name-input" class="form-control" placeholder="Father/Husband's Name">
               </div>
               <div class="form-group">
                 <label>District</label>
                 <select id="dist-sel-details" class="form-control" disabled>
                   <option value="">Select State first</option>
                 </select>
               </div>
            </div>
          </div>
          
          <div id="error-message" style="display: none; color: #ff6b6b; background: rgba(255, 107, 107, 0.1); padding: 1rem; border-radius: var(--radius-sm); border-left: 4px solid #ff6b6b; margin-bottom: 1.5rem;">
            <p><i class="fa-solid fa-triangle-exclamation"></i> <span id="error-text">Invalid input.</span></p>
          </div>

          <button id="find-booth-btn" class="btn btn-primary" style="width: 100%; margin-bottom: 1rem;">Prepare Search Query</button>
          
          <div id="booth-result" class="booth-result" style="display: none;">
            <div style="background: var(--bg-surface-light); padding: 2.5rem 1.5rem; border-radius: var(--radius-sm); border: 1px solid var(--glass-border); text-align: center;">
              <h4 style="color: var(--saffron); font-size: 1.4rem; margin-bottom: 1rem;"><i class="fa-solid fa-lock" style="margin-right: 0.5rem;"></i>Verification Required</h4>
              <p style="color: var(--white); font-size: 1.1rem; margin-bottom: 0.5rem;">We cannot verify this voter ID locally.</p>
              <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 600px; margin-inline: auto;">To prevent misinformation, we do not generate simulated polling booth data. Please verify your exact polling station and voter details using the official Election Commission portal.</p>
              
              <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
                <a href="https://electoralsearch.eci.gov.in/" target="_blank" class="btn btn-primary" style="width: 100%; max-width: 350px; justify-content: center; font-size: 1.05rem;">
                  <i class="fa-solid fa-arrow-up-right-from-square"></i> Verify on Official ECI Portal
                </a>
                <a href="https://voters.eci.gov.in/" target="_blank" class="btn btn-secondary" style="width: 100%; max-width: 350px; justify-content: center;">
                  <i class="fa-solid fa-building-flag"></i> View State Election Websites
                </a>
              </div>
            </div>
            
            <div style="margin-top: 1.5rem; padding: 1.5rem; background: rgba(19, 136, 8, 0.05); border-left: 4px solid var(--green); border-radius: var(--radius-sm);">
              <h5 style="color: var(--green); margin-bottom: 0.8rem; font-size: 1.1rem;"><i class="fa-solid fa-list-check" style="margin-right: 0.5rem;"></i>How to check manually:</h5>
              <ol style="margin-left: 1.5rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.8;">
                <li>Click the <strong>Verify on Official ECI Portal</strong> button above.</li>
                <li>Choose "Search by EPIC" or "Search by Details" on the official site.</li>
                <li>Enter the exact details you provided here.</li>
                <li>Complete the Captcha and click Search to view your official polling station.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Smart Timeline -->
    <section id="timeline">
      <div class="container">
        <div class="section-header">
          <h2 data-i18n="h.timeline">State-Wise Election Tracker</h2>
          <p>Track verified schedules, polling dates, and results for current elections.</p>
        </div>
        
        <div class="glass-card" style="max-width: 800px; margin: 0 auto;">
          <div class="form-group" style="margin-bottom: 2rem;">
            <label style="font-weight: 600; font-family: var(--font-heading); font-size: 1.1rem; color: var(--saffron); margin-bottom: 0.5rem;" data-i18n="t.sel">Select State/UT to Track:</label>
            <select id="timeline-state-sel" class="form-control" style="font-size: 1.1rem; padding: 1rem; border: 2px solid var(--glass-border); background: var(--bg-surface);">
              <option value="">-- Choose a State/UT --</option>
              <option value="Assam">Assam</option>
              <option value="Kerala">Kerala</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>

          <div id="timeline-unavailable" style="display: none; padding: 2rem; text-align: center; background: rgba(255,255,255,0.05); border-radius: var(--radius-sm); border: 1px dashed var(--glass-border);">
            <i class="fa-solid fa-calendar-xmark" style="font-size: 2.5rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h4 style="color: var(--white); font-size: 1.2rem; margin-bottom: 0.5rem;" data-i18n="t.unav">No active state election currently scheduled.</h4>
            <p style="color: var(--text-secondary);">There are no active or recently scheduled elections matching this selection in our verified records.</p>
          </div>

          <div id="timeline-content" style="display: none;">
            <div class="timeline-header-card">
              <div>
                <h3 id="ts-state-name" style="font-size: 1.5rem; color: var(--white); margin-bottom: 0.25rem;">State Name</h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem;">Current Election Status <span id="ts-phases-badge" style="margin-left: 0.5rem; padding: 0.2rem 0.5rem; background: rgba(255,255,255,0.1); border-radius: 4px; font-size: 0.8rem; color: var(--white);">1 Phase</span></p>
              </div>
              <div class="status-badge-container">
                <span id="ts-status-badge" style="background: rgba(19, 136, 8, 0.2); color: var(--green); padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; font-size: 0.9rem; border: 1px solid var(--green);">Status</span>
              </div>
            </div>

            <div class="vertical-timeline">
              <!-- Rendered via JS -->
            </div>
            
            <div class="timeline-stats-container">
              <div id="ts-turnout-section" class="timeline-stat-box" style="display: none; background: rgba(255, 153, 51, 0.05);">
                 <h4 style="color: var(--saffron); margin-bottom: 0.5rem;"><i class="fa-solid fa-users"></i> Voter Turnout</h4>
                 <p style="font-size: 1.5rem; font-family: var(--font-heading); font-weight: 700; color: var(--white);" id="ts-turnout-value">74.2%</p>
              </div>

              <div id="ts-countdown-section" class="timeline-stat-box" style="display: none; background: rgba(19, 136, 8, 0.05);">
                 <h4 style="color: var(--green); margin-bottom: 0.5rem;"><i class="fa-solid fa-clock"></i> Time until Results</h4>
                 <p style="font-size: 1.5rem; font-family: var(--font-heading); font-weight: 700; color: var(--white);" id="ts-countdown-value">--</p>
              </div>
            </div>

            <div style="margin-top: 2rem; text-align: center; border-top: 1px solid var(--glass-border); padding-top: 2rem;">
              <a href="https://eci.gov.in/" target="_blank" class="btn btn-secondary"><i class="fa-solid fa-arrow-up-right-from-square"></i> View Official ECI Schedule</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQs -->
    <section id="faq" class="journey-section">
      <div class="container">
        <div class="section-header">
          <h2 data-i18n="h.faq">Frequently Asked Questions</h2>
          <p>Quick answers to common election queries.</p>
        </div>
        
        <div class="faq-grid">
          ${data.faqs.map((faq, index) => `
            <div class="faq-item" id="faq-${index}">
              <div class="faq-question" onclick="toggleFaq(${index})">
                <span>${faq.q}</span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>${faq.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <i class="fa-solid fa-check-to-slot" style="color: var(--saffron)"></i> ElectionAssistant
          </div>
          <p class="disclaimer">
            This is an AI-powered assistant designed for educational and informational purposes. 
            For official registrations, verifications, and legally binding information, always visit the official 
            Election Commission of India website (eci.gov.in).
          </p>
        </div>
        <div class="copyright">
          &copy; 2026 CivicTech Assistant. All rights reserved. Neutral & Factual Information.
        </div>
      </div>
    </footer>

    <!-- AI Chatbot Widget -->
    <div class="chatbot-widget">
      <div class="chatbot-window" id="chat-window">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-status"></div>
            <span style="font-weight: 600; font-family: var(--font-heading); display: flex; align-items: center; gap: 0.5rem;" id="chat-bot-title" data-i18n="chat.bot"><i class="fa-solid fa-robot" style="color: var(--saffron); font-size: 1.2rem;"></i> Civic AI Guide</span>
          </div>
          <button class="chat-close" onclick="toggleChat()">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="chat-body" id="chat-body">
          <div class="chat-msg msg-ai">
            <span id="chat-welcome" data-i18n="chat.welcome">Hi! I'm Civic AI Guide. Ask me about voting, voter ID, elections, or registration.</span>
          </div>
          <div class="chat-quick-actions" id="chat-quick-actions">
            <button class="chat-quick-btn" data-i18n="chat.el" onclick="sendQuickMessage('chat.el')">Check Eligibility</button>
            <button class="chat-quick-btn" data-i18n="chat.reg" onclick="sendQuickMessage('chat.reg')">Register to Vote</button>
            <button class="chat-quick-btn" data-i18n="chat.date" onclick="sendQuickMessage('chat.date')">Election Dates</button>
            <button class="chat-quick-btn" data-i18n="chat.id" onclick="sendQuickMessage('chat.id')">Voter ID Help</button>
            <button class="chat-quick-btn" data-i18n="chat.poll" onclick="sendQuickMessage('chat.poll')">Polling Station Info</button>
          </div>
        </div>
        <div class="chat-input">
          <input type="text" id="chat-input-field" placeholder="Ask a question..." onkeypress="handleChatEnter(event)">
          <button class="chat-send" onclick="sendChatMessage()">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
      
      <button class="chatbot-toggle" onclick="toggleChat()" id="chat-toggle-btn">
        <span class="material-symbols-outlined">smart_toy</span>
      </button>
    </div>
  `

  initLogics()
}

// Ensure the functions are attached to window for inline HTML onclicks to work
window.handleJourney = handleJourney
window.resetJourney = resetJourney
window.toggleCheck = toggleCheck
window.toggleFaq = toggleFaq
window.toggleChat = toggleChat
window.toggleNav = () => document.getElementById('nav-menu').classList.toggle('active')
window.closeNav = () => document.getElementById('nav-menu').classList.remove('active')
window.sendChatMessage = sendChatMessage
window.handleChatEnter = handleChatEnter
window.sendQuickMessage = sendQuickMessage
window.switchFinderTab = switchFinderTab
window.changeLanguage = (lang) => {
  currentLang = lang;
  localStorage.setItem('civicLang', lang);
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang] && translations[currentLang][key]) {
      if(key === 'chat.bot') {
        el.innerHTML = translations[currentLang][key];
      } else {
        el.innerText = translations[currentLang][key];
      }
    }
  });
}

// --- Personalized Journey Logic ---
function handleJourney(currentQ, answer) {
  const q1 = document.getElementById('q1')
  const q2New = document.getElementById('q2-new')
  const q2Old = document.getElementById('q2-old')
  const result = document.getElementById('journey-result')
  const resultContent = document.getElementById('result-content')

  document.getElementById(currentQ).classList.remove('active')

  if (currentQ === 'q1') {
    if (answer === 'yes') {
      q2New.classList.add('active')
    } else {
      q2Old.classList.add('active')
    }
  } else if (currentQ === 'q2-new') {
    result.classList.add('active')
    if (answer === 'yes') {
      resultContent.innerHTML = '<h4>1. Verify Name in Roll</h4><p>Check your name in the electoral roll using electoralsearch.eci.gov.in.</p><h4 style="margin-top:1rem;">2. Find Polling Booth</h4><p>Use our Booth Finder to locate your voting center.</p>'
    } else {
      resultContent.innerHTML = '<h4>1. Fill Form 6</h4><p>You need to register as a new voter. Use the Checklist section to gather documents, then visit voters.eci.gov.in to apply.</p>'
    }
    result.style.display = 'block'
  } else if (currentQ === 'q2-old') {
    result.classList.add('active')
    if (answer === 'yes') {
      resultContent.innerHTML = '<h4>1. Fill Form 8</h4><p>To shift residence or correct entries, submit Form 8 online at voters.eci.gov.in.</p>'
    } else {
      resultContent.innerHTML = '<h4>1. Verify Details</h4><p>Check the roll to ensure your details are active.</p><h4 style="margin-top:1rem;">2. Prepare ID</h4><p>Keep your Voter ID or Aadhaar ready for Election Day.</p>'
    }
    result.style.display = 'block'
  }
}

function resetJourney() {
  document.getElementById('journey-result').style.display = 'none'
  document.getElementById('q2-new').classList.remove('active')
  document.getElementById('q2-old').classList.remove('active')
  document.getElementById('q1').classList.add('active')
}

// --- Checklist Logic ---
let checklistState = {}

function initChecklist() {
  const saved = localStorage.getItem('electionChecklist')
  if (saved) {
    checklistState = JSON.parse(saved)
    for (const [id, isChecked] of Object.entries(checklistState)) {
      if (isChecked) {
        document.getElementById('item-' + id)?.classList.add('completed')
      }
    }
  }
  updateProgress()
}

function toggleCheck(id) {
  const item = document.getElementById('item-' + id)
  if (!item) return
  const isCompleted = item.classList.toggle('completed')
  checklistState[id] = isCompleted
  localStorage.setItem('electionChecklist', JSON.stringify(checklistState))
  updateProgress()
}

function updateProgress() {
  const total = data.checklist.length
  const completed = Object.values(checklistState).filter(v => v).length
  const percent = Math.round((completed / total) * 100)
  
  const progBar = document.getElementById('checklist-progress')
  const progTxt = document.getElementById('progress-text')
  if (progBar) progBar.style.width = percent + '%'
  if (progTxt) progTxt.innerText = percent
}

// --- Polling Finder Logic ---
let currentSearchMode = 'epic'

function switchFinderTab(tab) {
  currentSearchMode = tab
  document.getElementById('tab-epic').classList.remove('active')
  document.getElementById('tab-details').classList.remove('active')
  document.getElementById('form-epic').style.display = 'none'
  document.getElementById('form-details').style.display = 'none'
  document.getElementById('booth-result').style.display = 'none'
  document.getElementById('error-message').style.display = 'none'

  document.getElementById(`tab-${tab}`).classList.add('active')
  document.getElementById(`form-${tab}`).style.display = 'grid'
}

function initFinder() {
  const stateSelDetails = document.getElementById('state-sel-details')
  const distSelDetails = document.getElementById('dist-sel-details')
  const btn = document.getElementById('find-booth-btn')
  const res = document.getElementById('booth-result')
  const errorMsg = document.getElementById('error-message')
  const errorText = document.getElementById('error-text')

  if (!btn || !res) return

  // Setup dependent dropdown for Details search advanced mode
  if (stateSelDetails && distSelDetails) {
    stateSelDetails.addEventListener('change', (e) => {
      const state = e.target.value
      distSelDetails.innerHTML = '<option value="">Select District</option>'
      if (state && data.locations[state]) {
        distSelDetails.disabled = false
        data.locations[state].districts.forEach(d => {
          distSelDetails.innerHTML += `<option value="${d}">${d}</option>`
        })
      } else {
        distSelDetails.disabled = true
      }
    })
  }

  btn.addEventListener('click', () => {
    res.style.display = 'none'
    errorMsg.style.display = 'none'

    if (currentSearchMode === 'epic') {
      const epic = document.getElementById('epic-input').value.trim()
      
      if (!epic) {
        errorText.innerText = 'Please enter an EPIC Number.'
        errorMsg.style.display = 'block'
        return
      }

      // Basic length validation
      if (epic.length < 8) {
        errorText.innerText = 'Invalid EPIC Number format. Please enter a valid ID.'
        errorMsg.style.display = 'block'
        return
      }
      
      // If validation passes, show the official verification prompt
      res.style.display = 'block'

    } else {
      const name = document.getElementById('name-input').value.trim()
      const state = document.getElementById('state-sel-details').value

      if (!name || !state) {
        errorText.innerText = 'Please enter your Full Name and select a State.'
        errorMsg.style.display = 'block'
        return
      }

      // If validation passes, show the official verification prompt
      res.style.display = 'block'
    }
  })
}

// --- State-Wise Timeline Logic ---
// --- State-Wise Timeline Logic ---
const stateElections = {
  'Assam': {
    statusBadge: 'Polling Completed - Results Pending',
    statusColor: 'var(--saffron)',
    turnout: '82.0%',
    phases: 1,
    targetDate: '2026-05-04T08:00:00',
    events: [
      { title: 'Election Announcement', date: 'Mar 10, 2026', status: 'completed' },
      { title: 'Nomination Start', date: 'Mar 15, 2026', status: 'completed' },
      { title: 'Nomination Deadline', date: 'Mar 22, 2026', status: 'completed' },
      { title: 'Scrutiny of Nominations', date: 'Mar 23, 2026', status: 'completed' },
      { title: 'Withdrawal Deadline', date: 'Mar 25, 2026', status: 'completed' },
      { title: 'Voting Date (Single Phase)', date: 'Apr 09, 2026', status: 'completed' },
      { title: 'Counting & Results', date: 'May 04, 2026', status: 'pending' }
    ]
  },
  'Kerala': {
    statusBadge: 'Polling Completed - Results Pending',
    statusColor: 'var(--saffron)',
    turnout: '74.0%',
    phases: 1,
    targetDate: '2026-05-04T08:00:00',
    events: [
      { title: 'Election Announcement', date: 'Mar 10, 2026', status: 'completed' },
      { title: 'Nomination Start', date: 'Mar 15, 2026', status: 'completed' },
      { title: 'Nomination Deadline', date: 'Mar 22, 2026', status: 'completed' },
      { title: 'Scrutiny of Nominations', date: 'Mar 23, 2026', status: 'completed' },
      { title: 'Withdrawal Deadline', date: 'Mar 25, 2026', status: 'completed' },
      { title: 'Voting Date (Single Phase)', date: 'Apr 09, 2026', status: 'completed' },
      { title: 'Counting & Results', date: 'May 04, 2026', status: 'pending' }
    ]
  },
  'Puducherry': {
    statusBadge: 'Polling Completed - Results Pending',
    statusColor: 'var(--saffron)',
    turnout: '81.6%',
    phases: 1,
    targetDate: '2026-05-04T08:00:00',
    events: [
      { title: 'Election Announcement', date: 'Mar 10, 2026', status: 'completed' },
      { title: 'Nomination Start', date: 'Mar 15, 2026', status: 'completed' },
      { title: 'Nomination Deadline', date: 'Mar 22, 2026', status: 'completed' },
      { title: 'Scrutiny of Nominations', date: 'Mar 23, 2026', status: 'completed' },
      { title: 'Withdrawal Deadline', date: 'Mar 25, 2026', status: 'completed' },
      { title: 'Voting Date (Single Phase)', date: 'Apr 09, 2026', status: 'completed' },
      { title: 'Counting & Results', date: 'May 04, 2026', status: 'pending' }
    ]
  },
  'Tamil Nadu': {
    statusBadge: 'Polling Completed - Results Pending',
    statusColor: 'var(--saffron)',
    turnout: '72.8%',
    phases: 1,
    targetDate: '2026-05-04T08:00:00',
    events: [
      { title: 'Election Announcement', date: 'Mar 10, 2026', status: 'completed' },
      { title: 'Nomination Start', date: 'Mar 28, 2026', status: 'completed' },
      { title: 'Nomination Deadline', date: 'Apr 04, 2026', status: 'completed' },
      { title: 'Scrutiny of Nominations', date: 'Apr 05, 2026', status: 'completed' },
      { title: 'Withdrawal Deadline', date: 'Apr 07, 2026', status: 'completed' },
      { title: 'Voting Date (Single Phase)', date: 'Apr 23, 2026', status: 'completed' },
      { title: 'Counting & Results', date: 'May 04, 2026', status: 'pending' }
    ]
  },
  'West Bengal': {
    statusBadge: 'Polling Completed - Results Pending',
    statusColor: 'var(--saffron)',
    turnout: '81.7%',
    phases: 2,
    targetDate: '2026-05-04T08:00:00',
    events: [
      { title: 'Election Announcement', date: 'Mar 10, 2026', status: 'completed' },
      { title: 'Nomination Start', date: 'Mar 28, 2026', status: 'completed' },
      { title: 'Nomination Deadline', date: 'Apr 04, 2026', status: 'completed' },
      { title: 'Scrutiny of Nominations', date: 'Apr 05, 2026', status: 'completed' },
      { title: 'Withdrawal Deadline', date: 'Apr 07, 2026', status: 'completed' },
      { title: 'Voting Date (Phase 1)', date: 'Apr 23, 2026', status: 'completed' },
      { title: 'Voting Date (Phase 2)', date: 'Apr 29, 2026', status: 'completed' },
      { title: 'Counting & Results', date: 'May 04, 2026', status: 'pending' }
    ]
  }
}

let countdownInterval;

function initTimeline() {
  const sel = document.getElementById('timeline-state-sel')
  const unavail = document.getElementById('timeline-unavailable')
  const content = document.getElementById('timeline-content')
  
  if (!sel) return
  
  sel.addEventListener('change', (e) => {
    const state = e.target.value
    clearInterval(countdownInterval); // clear previous interval
    
    if (!state) {
      unavail.style.display = 'none'
      content.style.display = 'none'
      return
    }
    
    const data = stateElections[state]
    if (!data) {
      unavail.style.display = 'block'
      content.style.display = 'none'
      return
    }
    
    unavail.style.display = 'none'
    content.style.display = 'block'
    
    document.getElementById('ts-state-name').innerText = state + " Election Schedule"
    
    const phasesBadge = document.getElementById('ts-phases-badge')
    phasesBadge.innerText = data.phases === 1 ? 'Single Phase' : `${data.phases} Phases`

    const badge = document.getElementById('ts-status-badge')
    badge.innerText = data.statusBadge
    badge.style.color = data.statusColor
    badge.style.borderColor = data.statusColor
    badge.style.background = data.statusColor === 'var(--green)' ? 'rgba(19, 136, 8, 0.1)' : 'rgba(255, 153, 51, 0.1)'
    
    const turnoutSec = document.getElementById('ts-turnout-section')
    if (data.turnout) {
      document.getElementById('ts-turnout-value').innerText = data.turnout
      turnoutSec.style.display = 'block'
    } else {
      turnoutSec.style.display = 'none'
    }

    const countdownSec = document.getElementById('ts-countdown-section')
    if (data.targetDate) {
      countdownSec.style.display = 'block'
      startCountdown(data.targetDate)
    } else {
      countdownSec.style.display = 'none'
    }
    
    const vt = document.querySelector('.vertical-timeline')
    vt.innerHTML = data.events.map(ev => `
      <div class="vt-item ${ev.status}">
        <div class="vt-date">${ev.date}</div>
        <div class="vt-title">${ev.title}</div>
      </div>
    `).join('')
  })
}

function startCountdown(targetDateStr) {
  const targetDate = new Date(targetDateStr).getTime()
  const display = document.getElementById('ts-countdown-value')
  
  countdownInterval = setInterval(() => {
    const now = new Date().getTime()
    const distance = targetDate - now
    
    if (distance < 0) {
      if (display) display.innerText = "RESULTS LIVE!"
      clearInterval(countdownInterval)
      return
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
    if (display) display.innerText = `${days}d : ${hours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`
  }, 1000)
}

// --- FAQ Logic ---
function toggleFaq(index) {
  const item = document.getElementById('faq-' + index)
  if (item) item.classList.toggle('active')
}

// --- AI Chatbot Logic ---
function toggleChat() {
  const win = document.getElementById('chat-window')
  const btn = document.getElementById('chat-toggle-btn')
  if (!win || !btn) return
  win.classList.toggle('open')
  if(win.classList.contains('open')) {
    btn.style.display = 'none'
  } else {
    btn.style.display = 'flex'
  }
}

function handleChatEnter(e) {
  if (e.key === 'Enter') sendChatMessage()
}

function sendQuickMessage(msg) {
  const input = document.getElementById('chat-input-field')
  if (input) {
    input.value = msg
    sendChatMessage()
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input-field')
  const body = document.getElementById('chat-body')
  if (!input || !body) return
  const msg = input.value.trim()
  
  if (!msg) return
  
  // Add user message
  body.innerHTML += `<div class="chat-msg msg-user">${msg}</div>`
  input.value = ''
  body.scrollTop = body.scrollHeight
  
  // Remove quick actions after first interaction
  const qa = document.getElementById('chat-quick-actions')
  if(qa) qa.style.display = 'none'

  // Show typing indicator
  const typingId = 'typing-' + Date.now()
  body.innerHTML += `
    <div class="chat-msg msg-ai typing-indicator" id="${typingId}">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  `
  body.scrollTop = body.scrollHeight

  // Mock AI response
  setTimeout(() => {
    // Remove typing indicator
    document.getElementById(typingId)?.remove()
    
    let reply = botReplies[currentLang].default;
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes('eligib') || lowerMsg.includes('chat.el')) {
      reply = botReplies[currentLang].eligib;
    } else if (lowerMsg.includes('register') || lowerMsg.includes('chat.reg') || lowerMsg.includes('form 6')) {
      reply = botReplies[currentLang].register;
    } else if (lowerMsg.includes('epic') || lowerMsg.includes('voter id') || lowerMsg.includes('chat.id') || lowerMsg.includes('document')) {
      reply = botReplies[currentLang].epic;
    } else if (lowerMsg.includes('booth') || lowerMsg.includes('station') || lowerMsg.includes('chat.poll')) {
      reply = botReplies[currentLang].booth;
    } else if (lowerMsg.includes('date') || lowerMsg.includes('schedule') || lowerMsg.includes('chat.date')) {
      reply = botReplies[currentLang].date;
    } else if (lowerMsg.includes('result') || lowerMsg.includes('counting')) {
      reply = botReplies[currentLang].result;
    }
    
    body.innerHTML += `<div class="chat-msg msg-ai">${reply}</div>`
    body.scrollTop = body.scrollHeight
  }, 1200)
}

// --- Accessibility Mock ---
function initAccessibility() {
  const voiceBtn = document.getElementById('voice-toggle')
  if (!voiceBtn) return
  voiceBtn.addEventListener('click', () => {
    voiceBtn.classList.toggle('active')
    if(voiceBtn.classList.contains('active')) {
      // Mock voice synthesis
      const msg = new SpeechSynthesisUtterance("Voice navigation activated. Welcome to Election Assistant.")
      window.speechSynthesis.speak(msg)
    }
  })
}

function initLogics() {
  initChecklist()
  initFinder()
  initTimeline()
  initAccessibility()
}

// Start App
renderApp()
