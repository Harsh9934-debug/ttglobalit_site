(function () {
  const avatarUrl = 'assets/taaras-avatar.png';

  const questions = [
    {
      q: "What is TT GLOBAL IT?",
      a: "TT GLOBAL IT (Transcript Technology Global Infotech Private Limited) is a technology company catering to financial & educational institutions. We develop cutting-edge software including the Esahakara core banking solution, E-Vyavahaar GST billing, and more. Founded in 2019, we serve 150+ enterprise clients with 50,000+ daily users."
    },
    {


      q: "What is Esahakara?",
      a: 'Esahakara is a comprehensive web-based core banking solution for cooperative societies & financial institutions. Features include account management (savings, FD, RD), transaction processing, loan management with EMI calculations, reporting & analytics, bank-grade security, and multi-branch support. <a href="Esahakara.html" class="text-orange-500 underline font-medium">Learn more →</a>'
    },
    {
      q: "Does Esahakara have mobile apps?",
      a: 'Yes! Esahakara offers two mobile apps:<br><br><b>Customer App</b> — Manage accounts, view transactions, get push notifications. Features biometric login & 24/7 access.<br><br><b>Pigmy Agent App</b> — For agents to manage pigmy collections offline. Includes collection management, customer profiles, and real-time reports.<br><br><a href="https://esahakara.com/" target="_blank" rel="noopener" class="text-orange-500 underline font-medium">View details →</a>'
    },
    {
      q: "What internship opportunities are available?",
      a: 'We offer internships in: Android Development (3 openings), IoT (2), Machine Learning (3), Full Stack Development (4), Python Data Analysis (2), Data Science & AI (3).<br><br>Every intern gets a Certificate of Completion.<br><br>Apply by emailing ttglobalinfotech7@gmail.com with your name, college, and domain.<br><br><a href="Internship.html" class="text-orange-500 underline font-medium">View all positions →</a>'
    },
    {
      q: "Where are your offices?",
      a: '<b>Corporate Office:</b> #166 & 167, 5th Cross, Hebbal, Bengaluru 560024<br><br><b>Head Office:</b> 35 Mayasandra, Turuvekere, Tumkur 572221<br><br><b>Branch Office:</b> 291/A KIADB, Hebbal Industrial Area, Mysuru 570016'
    },
    {
      q: "How can I contact you?",
      a: '<b>Phone:</b> +91 807-3804-799 | +91 8660402580<br><br><b>Email:</b> info@ttglobalit.in<br><br><b>Hours:</b> Mon-Sat, 9:00 AM – 6:00 PM<br><br><a href="contact-us.html" class="text-orange-500 underline font-medium">Go to Contact page →</a>'
    },
    {
      q: "What services do you offer?",
      a: 'We offer: AI & ML, Cloud Services (AWS, GCP, Azure), Cybersecurity, Data & Analytics, Enterprise Solutions (ERP, CRM), IoT & Digital Engineering, Blockchain, Web & Mobile Apps, Digital Marketing, and E-commerce solutions.<br><br><a href="overview.html" class="text-orange-500 underline font-medium">View all services →</a>'
    },
    {
      q: "Which industries do you serve?",
      a: 'We serve: Banking & Financial Services, Communications/Media, Education, Energy/Utilities, Healthcare, and Public Services.<br><br><a href="industries.html" class="text-orange-500 underline font-medium">Learn more →</a>'
    },
    {
      q: "What is your refund policy?",
      a: 'Refund requests must be submitted within 7 days of purchase for a full refund. Email info@ttglobalit.in with your order details. Decisions are communicated within 7-10 business days. Approved refunds are processed within 10-15 business days.<br><br><a href="refund-policy.html" class="text-orange-500 underline font-medium">Full policy →</a>'
    }
  ];

  var styles = document.createElement('style');
  styles.textContent = `
    #tt-chatbot * { box-sizing: border-box; }
    #tt-chatbot { font-family: 'Inter', system-ui, -apple-system, sans-serif; position: relative; z-index: 99999; }
    
    /* Avatar Wave Animation */
    @keyframes ttAvatarWave {
      0% { transform: rotate(0deg) scale(1); }
      15% { transform: rotate(14deg) scale(1.08); }
      30% { transform: rotate(-12deg) scale(1.08); }
      45% { transform: rotate(14deg) scale(1.08); }
      60% { transform: rotate(-8deg) scale(1.04); }
      75% { transform: rotate(4deg) scale(1.02); }
      100% { transform: rotate(0deg) scale(1); }
    }
    .tt-wave-anim {
      animation: ttAvatarWave 0.9s cubic-bezier(0.36, 0.07, 0.19, 0.97) !important;
      transform-origin: 65% 85% !important;
    }

    @keyframes ttHandWave {
      0%, 100% { transform: rotate(0deg); }
      20%, 60% { transform: rotate(18deg); }
      40%, 80% { transform: rotate(-12deg); }
    }
    .tt-header-wave {
      display: inline-block;
      animation: ttHandWave 1.4s ease-in-out infinite;
      transform-origin: 75% 75%;
      font-size: 15px;
      margin-left: 4px;
    }

    /* Launcher Button Container */
    #tt-chat-launcher-wrapper {
      position: fixed; bottom: 24px; right: 24px; z-index: 99999;
      display: flex; align-items: center; gap: 10px;
    }

    /* Invitation Pill - Borderless & Clean, No Stars */
    .tt-chat-pill {
      background: white; color: #1e293b; font-size: 13px; font-weight: 600;
      padding: 9px 16px; border-radius: 999px;
      box-shadow: 0 10px 25px -3px rgba(0,0,0,0.12), 0 4px 6px -2px rgba(0,0,0,0.05);
      border: none; display: flex; align-items: center; gap: 6px;
      cursor: pointer; transition: all 0.25s ease;
      animation: ttPillBounce 4s ease-in-out infinite;
      white-space: nowrap; user-select: none;
    }
    .tt-chat-pill:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px -3px rgba(249,115,22,0.25);
      color: #ea580c;
    }
    #tt-chat-launcher-wrapper.chat-open .tt-chat-pill { display: none; }

    @keyframes ttPillBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    /* Circular Floating Avatar Button - BORDERLESS */
    #tt-chat-btn {
      width: 62px; height: 62px; border-radius: 50%;
      background: transparent; border: none;
      cursor: pointer;
      box-shadow: 0 10px 28px rgba(0,0,0,0.18), 0 3px 8px rgba(0,0,0,0.08);
      display: flex; align-items: center; justify-content: center;
      position: relative; padding: 0; outline: none;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #tt-chat-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 14px 36px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.1);
    }
    #tt-chat-btn .tt-btn-avatar-wrap {
      width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      border: none;
    }
    #tt-chat-btn .tt-btn-avatar {
      width: 100%; height: 100%; object-fit: cover; display: block;
      border-radius: 50%; border: none;
    }
    #tt-chat-btn .tt-online-badge {
      position: absolute; bottom: 2px; right: 2px; width: 14px; height: 14px;
      border-radius: 50%; background: #22c55e;
      border: 2px solid white;
      box-shadow: 0 0 8px rgba(34,197,94,0.6);
    }
    #tt-chat-btn .close-icon {
      display: none; width: 26px; height: 26px; color: white;
    }
    #tt-chat-btn.open {
      background: linear-gradient(135deg, #ea580c, #c2410c);
      border: none;
    }
    #tt-chat-btn.open .tt-btn-avatar-wrap,
    #tt-chat-btn.open .tt-online-badge { display: none; }
    #tt-chat-btn.open .close-icon { display: block; }

    /* Chat Panel - Clean Borderless Shadow */
    #tt-chat-panel {
      position: fixed; bottom: 98px; right: 24px; z-index: 99998;
      width: 390px; max-width: calc(100vw - 32px); height: 580px; max-height: calc(100vh - 120px);
      background: #ffffff; border-radius: 24px;
      box-shadow: 0 25px 60px -15px rgba(15,23,42,0.3);
      border: none; display: none; flex-direction: column; overflow: hidden;
      animation: ttChatSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #tt-chat-panel.open { display: flex; }

    @keyframes ttChatSlideIn {
      from { opacity: 0; transform: translateY(24px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* Header - Borderless */
    #tt-chat-header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      padding: 16px 18px; color: white;
      border: none;
      display: flex; align-items: center; justify-content: space-between;
      position: relative;
    }
    .tt-header-left {
      display: flex; align-items: center; gap: 12px; cursor: pointer;
    }
    .tt-header-avatar-wrap {
      position: relative; width: 44px; height: 44px; border-radius: 50%;
      border: none; padding: 0; background: transparent;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25); flex-shrink: 0;
    }
    .tt-header-avatar {
      width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block;
      border: none;
    }
    .tt-header-status-dot {
      position: absolute; bottom: 0; right: 0; width: 11px; height: 11px;
      border-radius: 50%; background: #22c55e; border: 1.5px solid #0f172a;
      box-shadow: 0 0 6px #22c55e; animation: ttPulse 2s infinite;
    }
    .tt-header-text h3 {
      margin: 0; font-size: 16px; font-weight: 700; color: #ffffff;
      display: flex; align-items: center; gap: 6px; letter-spacing: -0.01em;
    }
    .tt-header-text p {
      margin: 0; font-size: 15px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 5px;
    }
    .tt-live-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #22c55e; display: inline-block;
    }
    #tt-header-close-btn {
      background: rgba(255,255,255,0.08); border: none; border-radius: 50%;
      width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;
      color: #94a3b8; cursor: pointer; transition: all 0.2s; outline: none;
    }
    #tt-header-close-btn:hover {
      background: rgba(255,255,255,0.18); color: white; transform: rotate(90deg);
    }

    @keyframes ttPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }

    /* Messages Area */
    #tt-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px 14px 10px;
      background: #f8fafc; display: flex; flex-direction: column; gap: 12px;
    }
    #tt-chat-messages::-webkit-scrollbar { width: 4px; }
    #tt-chat-messages::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }

    /* Message Row */
    .tt-msg-row {
      display: flex; gap: 8px; max-width: 90%; animation: ttMsgIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .tt-msg-row.bot { align-self: flex-start; align-items: flex-end; }
    .tt-msg-row.user { align-self: flex-end; justify-content: flex-end; }

    /* Bot avatar - BORDERLESS */
    .tt-msg-avatar {
      width: 28px; height: 28px; border-radius: 50%; border: none;
      object-fit: cover; flex-shrink: 0; background: transparent; margin-bottom: 2px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }

    .tt-msg {
      padding: 10px 14px; border-radius: 18px; font-size: 13.5px;
      line-height: 1.55; word-wrap: break-word;
    }
    .tt-msg.bot {
      background: #ffffff; color: #1e293b;
      border: 1px solid #f1f5f9; border-bottom-left-radius: 4px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .tt-msg.user {
      background: linear-gradient(135deg, #ea580c, #c2410c);
      color: white; border-bottom-right-radius: 4px;
      box-shadow: 0 4px 14px rgba(234,88,12,0.28);
    }
    .tt-msg.bot a {
      color: #ea580c; text-decoration: underline; font-weight: 600;
    }
    .tt-msg.bot b { color: #0f172a; }

    @keyframes ttMsgIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Typing Indicator */
    .tt-typing {
      display: inline-flex; align-items: center; gap: 5px; padding: 10px 14px;
    }
    .tt-typing span {
      width: 6px; height: 6px; border-radius: 50%; background: #ea580c;
      animation: ttTyping 1.4s infinite;
    }
    .tt-typing span:nth-child(2) { animation-delay: 0.2s; }
    .tt-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ttTyping { 0%,60%,100% { opacity: 0.3; transform: scale(0.9); } 30% { opacity: 1; transform: scale(1.2); } }

    /* Quick Question Suggestions Section */
    #tt-chat-suggestions-container {
      background: #f1f5f9; border-top: 1px solid #e2e8f0; padding: 10px 14px 6px;
    }
    .tt-suggestions-label {
      font-size: 11px; font-weight: 700; color: #64748b;
      text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;
      display: flex; align-items: center; gap: 4px;
    }
    #tt-chat-questions {
      display: flex; flex-wrap: wrap; gap: 6px; max-height: 105px; overflow-y: auto; padding-bottom: 4px;
    }
    #tt-chat-questions::-webkit-scrollbar { width: 3px; }
    #tt-chat-questions::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    .tt-chip {
      padding: 6px 12px; border-radius: 100px; font-size: 12px; font-weight: 500;
      background: #ffffff; color: #334155; border: 1px solid #cbd5e1; cursor: pointer;
      transition: all 0.2s; white-space: nowrap; box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .tt-chip:hover {
      background: #fff7ed; border-color: #ea580c; color: #ea580c;
      transform: translateY(-1px); box-shadow: 0 3px 8px rgba(234,88,12,0.15);
    }
    .tt-chip:active { transform: scale(0.96); }

    /* Interactive Input Bar */
    #tt-chat-input-wrapper {
      padding: 10px 14px 12px; background: #ffffff; border-top: 1px solid #e2e8f0;
      display: flex; align-items: center; gap: 8px;
    }
    #tt-chat-input {
      flex: 1; border: 1.5px solid #e2e8f0; border-radius: 999px;
      padding: 9px 16px; font-size: 13.5px; color: #1e293b; outline: none;
      transition: all 0.2s; background: #f8fafc;
    }
    #tt-chat-input:focus {
      border-color: #ea580c; background: #ffffff;
      box-shadow: 0 0 0 3px rgba(234,88,12,0.12);
    }

    /* Send Button with Crisp Arrow in Proper Send Direction */
    #tt-chat-send-btn {
      width: 42px; height: 42px; border-radius: 50%;
      background: #ea580c;
      border: none; cursor: pointer; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      box-shadow: 0 4px 14px rgba(234,88,12,0.38);
      padding: 0; outline: none; color: white;
    }
    #tt-chat-send-btn:hover {
      transform: scale(1.08); box-shadow: 0 6px 18px rgba(234,88,12,0.48);
      background: #f97316;
    }
    #tt-chat-send-btn:active { transform: scale(0.95); }
    #tt-chat-send-btn .tt-send-icon {
      width: 20px; height: 20px; display: block;
      pointer-events: none; user-select: none;
      transform: translateX(1px);
    }

    /* Responsive */
    @media (max-width: 480px) {
      #tt-chat-panel { right: 12px; bottom: 84px; width: calc(100vw - 24px); height: 75vh; border-radius: 20px; }
      #tt-chat-launcher-wrapper { right: 16px; bottom: 16px; }
      #tt-chat-btn { width: 56px; height: 56px; }
      .tt-chat-pill { display: none; }
    }
  `;
  document.head.appendChild(styles);

  var chatHTML = `
    <div id="tt-chat-launcher-wrapper">
      <div class="tt-chat-pill" id="tt-chat-pill">Ask Taara</div>
      <button id="tt-chat-btn" aria-label="Ask Taara" title="Ask Taara">
        <div class="tt-btn-avatar-wrap">
          <img src="${avatarUrl}" alt="Ask Taara" class="tt-btn-avatar" id="tt-launcher-avatar" onerror="this.src='taaras-avatar.png'">
        </div>
        <span class="tt-online-badge"></span>
        <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <div id="tt-chat-panel">
      <div id="tt-chat-header">
        <div class="tt-header-left" id="tt-header-avatar-btn" title="Click to wave!">
          <div class="tt-header-avatar-wrap">
            <img src="${avatarUrl}" alt="Taara" class="tt-header-avatar" id="tt-header-avatar" onerror="this.src='taaras-avatar.png'">
            <span class="tt-header-status-dot"></span>
          </div>
          <div class="tt-header-text">
            <p>Ask Taara</p>
          </div>
        </div>
        <button id="tt-header-close-btn" aria-label="Close chat" title="Close">
          <svg style="width:18px;height:18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div id="tt-chat-messages"></div>
      <div id="tt-chat-suggestions-container">
        <div class="tt-suggestions-label">Suggested Topics</div>
        <div id="tt-chat-questions"></div>
      </div>
      <div id="tt-chat-input-wrapper">
        <input type="text" id="tt-chat-input" placeholder="Ask Taara anything..." autocomplete="off">
        <button id="tt-chat-send-btn" aria-label="Send message" title="Send">
          <svg class="tt-send-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="12" x2="11" y2="12"></line>
            <polygon points="22 12 5 21 11 12 5 3 22 12"></polygon>
          </svg>
        </button>
      </div>
    </div>
  `;

  var container = document.createElement('div');
  container.id = 'tt-chatbot';
  container.innerHTML = chatHTML;
  document.body.appendChild(container);

  var launcherWrapper = document.getElementById('tt-chat-launcher-wrapper');
  var pill = document.getElementById('tt-chat-pill');
  var btn = document.getElementById('tt-chat-btn');
  var launcherAvatar = document.getElementById('tt-launcher-avatar');
  var headerAvatar = document.getElementById('tt-header-avatar');
  var headerAvatarBtn = document.getElementById('tt-header-avatar-btn');
  var headerCloseBtn = document.getElementById('tt-header-close-btn');
  var panel = document.getElementById('tt-chat-panel');
  var messagesEl = document.getElementById('tt-chat-messages');
  var questionsEl = document.getElementById('tt-chat-questions');
  var inputEl = document.getElementById('tt-chat-input');
  var sendBtn = document.getElementById('tt-chat-send-btn');

  var isOpen = false;

  function triggerWave() {
    [launcherAvatar, headerAvatar].forEach(function (el) {
      if (el) {
        el.classList.remove('tt-wave-anim');
        void el.offsetWidth; // Force reflow
        el.classList.add('tt-wave-anim');
        setTimeout(function () {
          el.classList.remove('tt-wave-anim');
        }, 950);
      }
    });

    // Also wave any navbar avatars currently on screen
    var navAvatars = document.querySelectorAll('button[onclick*="toggleChat"] img, button[onclick*="toggleTTChat"] img');
    navAvatars.forEach(function (navImg) {
      navImg.classList.remove('tt-wave-anim');
      void navImg.offsetWidth;
      navImg.classList.add('tt-wave-anim');
      setTimeout(function () {
        navImg.classList.remove('tt-wave-anim');
      }, 950);
    });
  }

  function addMessage(text, type) {
    var row = document.createElement('div');
    row.className = 'tt-msg-row ' + type;

    if (type === 'bot') {
      var av = document.createElement('img');
      av.src = avatarUrl;
      av.alt = 'Taara';
      av.className = 'tt-msg-avatar';
      av.onerror = function () { this.src = 'taaras-avatar.png'; };
      row.appendChild(av);
    }

    var div = document.createElement('div');
    div.className = 'tt-msg ' + type;
    div.innerHTML = text;
    row.appendChild(div);

    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    var row = document.createElement('div');
    row.className = 'tt-msg-row bot';
    row.id = 'tt-typing-indicator';

    var av = document.createElement('img');
    av.src = avatarUrl;
    av.alt = 'Taara';
    av.className = 'tt-msg-avatar';
    av.onerror = function () { this.src = 'taaras-avatar.png'; };
    row.appendChild(av);

    var div = document.createElement('div');
    div.className = 'tt-msg bot tt-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    row.appendChild(div);

    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return row;
  }

  function removeTyping() {
    var el = document.getElementById('tt-typing-indicator');
    if (el) el.remove();
  }

  function matchQuery(userText) {
    var text = userText.toLowerCase().trim();

    // Exact matches first
    for (var i = 0; i < questions.length; i++) {
      if (text === questions[i].q.toLowerCase()) {
        return questions[i].a;
      }
    }

    // Friendly greetings
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|namaste)\b/i.test(text)) {
      return "Hello! 👋 I'm <b>Taara</b>. How can I assist you today? Feel free to ask about our core banking software (Esahakara), billing systems, internship openings, or IT solutions!";
    }

    // Who are you
    if (/who are you|your name|what is taara|what is taaras/i.test(text)) {
      return "I'm <b>Taara</b>, your AI virtual assistant for <b>TT Global IT</b>! I'm here to answer your questions about our software solutions, services, offices, and internship opportunities.";
    }

    // Keyword matching
    if (/esahakara|banking|cooperative|pigmy|cbs/i.test(text)) {
      if (/app|mobile|android|customer app|agent/i.test(text)) {
        return questions[2].a;
      }
      return questions[1].a;
    }

    if (/intern|opening|career|job|hiring|training|vacancy|apply/i.test(text)) {
      return questions[3].a;
    }

    if (/office|address|location|where|branch|head office|bengaluru|tumkur|mysuru/i.test(text)) {
      return questions[4].a;
    }

    if (/contact|phone|number|call|email|reach|hours|support/i.test(text)) {
      return questions[5].a;
    }

    if (/service|solution|technology|what we do|cloud|iot|cyber/i.test(text)) {
      return questions[6].a;
    }

    if (/industry|industries|sector|client/i.test(text)) {
      return questions[7].a;
    }

    if (/refund|cancellation|policy|return|money back/i.test(text)) {
      return questions[8].a;
    }

    if (/tt global|about|company|founder|started|who/i.test(text)) {
      return questions[0].a;
    }

    // Smart partial match
    for (var j = 0; j < questions.length; j++) {
      var qWords = questions[j].q.toLowerCase().split(/\s+/);
      var matchCount = 0;
      for (var k = 0; k < qWords.length; k++) {
        if (qWords[k].length > 3 && text.indexOf(qWords[k]) !== -1) {
          matchCount++;
        }
      }
      if (matchCount >= 2) {
        return questions[j].a;
      }
    }

    return "Thank you for asking! I'm best equipped to help with TT Global IT solutions (such as Esahakara, E-Vyavahaar), internships, or company details. For specialized inquiries, please reach out directly at <a href='mailto:info@ttglobalit.in'>info@ttglobalit.in</a> or call <b>+91 807-3804-799</b>.";
  }

  function handleQuestion(questionText) {
    if (!questionText || !questionText.trim()) return;
    addMessage(questionText, 'user');
    showTyping();
    setTimeout(function () {
      removeTyping();
      var answer = matchQuery(questionText);
      addMessage(answer, 'bot');
    }, 700 + Math.random() * 500);
  }

  function populateQuestions() {
    questionsEl.innerHTML = '';
    questions.forEach(function (item) {
      var chip = document.createElement('button');
      chip.className = 'tt-chip';
      chip.textContent = item.q;
      chip.addEventListener('click', function () { handleQuestion(item.q); });
      questionsEl.appendChild(chip);
    });
  }

  function addWelcomeMessage() {
    var greetings = [
      "Hi there! 👋 I'm <b>Taara</b>, your AI assistant at TT Global IT. How can I help you today? Pick a question below or ask me anything!",
      "Welcome! 👋 I'm <b>Taara</b>. Need help with our Esahakara banking software, internship programs, or IT services? Choose a topic below!",
      "Hello! 👋 I'm <b>Taara</b>, ready to answer your questions about TT Global IT. How may I assist you?"
    ];
    addMessage(greetings[Math.floor(Math.random() * greetings.length)], 'bot');
  }

  function toggleChat() {
    isOpen = !isOpen;
    btn.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    launcherWrapper.classList.toggle('chat-open', isOpen);

    // Wave avatar on click
    triggerWave();

    if (isOpen) {
      if (messagesEl.children.length === 0) {
        addWelcomeMessage();
        populateQuestions();
      }
      setTimeout(function () {
        if (inputEl) inputEl.focus();
      }, 300);
    }
  }

  // Event listeners
  btn.addEventListener('click', toggleChat);
  if (pill) pill.addEventListener('click', toggleChat);
  if (headerAvatarBtn) headerAvatarBtn.addEventListener('click', triggerWave);
  if (headerCloseBtn) headerCloseBtn.addEventListener('click', toggleChat);

  function submitInput() {
    var text = inputEl.value.trim();
    if (text) {
      inputEl.value = '';
      handleQuestion(text);
    }
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', submitInput);
  }

  if (inputEl) {
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitInput();
      }
    });
  }

  window.toggleChat = toggleChat;
  window.toggleTTChat = toggleChat;
  window.waveTaara = triggerWave;
})();
