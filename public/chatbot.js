(function () {
  const questions = [
    {
      q: "What is TT GLOBAL IT?",
      a: "TT GLOBAL IT (Transcript Technology Global Infotech Private Limited) is a technology company catering to financial & educational institutions. We develop cutting-edge software including the Esahakara core banking solution, E-Vyavahaar GST billing, and more. Founded in 2019, we serve 150+ enterprise clients with 50,000+ daily users."
    },
    {
      q: "What is Esahakara?",
      a: 'Esahakara is a comprehensive web-based core banking solution for cooperative societies & financial institutions. Features include account management (savings, FD, RD), transaction processing, loan management with EMI calculations, reporting & analytics, bank-grade security, and multi-branch support. <a href="Esahakara.html" class="text-orange-400 underline font-medium">Learn more →</a>'
    },
    {
      q: "Does Esahakara have mobile apps?",
      a: 'Yes! Esahakara offers two mobile apps:<br><br><b>Customer App</b> — Manage accounts, view transactions, get push notifications. Features biometric login & 24/7 access.<br><br><b>Pigmy Agent App</b> — For agents to manage pigmy collections offline. Includes collection management, customer profiles, and real-time reports.<br><br><a href="esahakara-application.html" class="text-orange-400 underline font-medium">View details →</a>'
    },
    {
      q: "What internship opportunities are available?",
      a: 'We offer internships in: Android Development (3 openings), IoT (2), Machine Learning (3), Full Stack Development (4), Python Data Analysis (2), Data Science & AI (3).<br><br>Every intern gets a Certificate of Completion.<br><br>Apply by emailing ttglobalinfotech7@gmail.com with your name, college, and domain.<br><br><a href="Internship.html" class="text-orange-400 underline font-medium">View all positions →</a>'
    },
    {
      q: "Where are your offices?",
      a: '<b>Corporate Office:</b> #166 & 167, 5th Cross, Hebbal, Bengaluru 560024<br><br><b>Head Office:</b> 35 Mayasandra, Turuvekere, Tumkur 572221<br><br><b>Branch Office:</b> 291/A KIADB, Hebbal Industrial Area, Mysuru 570016'
    },
    {
      q: "How can I contact you?",
      a: '<b>Phone:</b> +91 807-3804-799 | +91 8660402580<br><br><b>Email:</b> info@ttglobalit.in<br><br><b>Hours:</b> Mon-Sat, 9:00 AM – 6:00 PM<br><br><a href="contact-us.html" class="text-orange-400 underline font-medium">Go to Contact page →</a>'
    },
    {
      q: "What services do you offer?",
      a: 'We offer: AI & ML, Cloud Services (AWS, GCP, Azure), Cybersecurity, Data & Analytics, Enterprise Solutions (ERP, CRM), IoT & Digital Engineering, Blockchain, Web & Mobile Apps, Digital Marketing, and E-commerce solutions.<br><br><a href="overview.html" class="text-orange-400 underline font-medium">View all services →</a>'
    },
    {
      q: "Which industries do you serve?",
      a: 'We serve: Banking & Financial Services, Communications/Media, Education, Energy/Utilities, Healthcare, and Public Services.<br><br><a href="industries.html" class="text-orange-400 underline font-medium">Learn more →</a>'
    },
    {
      q: "What is your refund policy?",
      a: 'Refund requests must be submitted within 7 days of purchase for a full refund. Email info@ttglobalit.in with your order details. Decisions are communicated within 7-10 business days. Approved refunds are processed within 10-15 business days.<br><br><a href="refund-policy.html" class="text-orange-400 underline font-medium">Full policy →</a>'
    }
  ];

  var styles = document.createElement('style');
  styles.textContent = `
    #tt-chatbot * { box-sizing: border-box; }
    #tt-chatbot { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
    #tt-chat-btn {
      position: fixed; bottom: 24px; right: 24px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #ea580c, #c2410c);
      border: none; cursor: pointer; box-shadow: 0 8px 32px rgba(234,88,12,0.35);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s ease; color: white;
    }
    #tt-chat-btn:hover { transform: scale(1.08); box-shadow: 0 12px 40px rgba(234,88,12,0.5); }
    #tt-chat-btn svg { width: 28px; height: 28px; }
    #tt-chat-btn .close-icon { display: none; }
    #tt-chat-btn.open .chat-icon { display: none; }
    #tt-chat-btn.open .close-icon { display: block; }
    #tt-chat-panel {
      position: fixed; bottom: 100px; right: 24px; z-index: 9998;
      width: 380px; max-width: calc(100vw - 48px); height: 560px; max-height: calc(100vh - 140px);
      background: white; border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      display: none; flex-direction: column; overflow: hidden;
      border: 1px solid rgba(234,88,12,0.15);
      animation: ttChatSlideIn 0.3s ease-out;
    }
    #tt-chat-panel.open { display: flex; }
    @keyframes ttChatSlideIn {
      from { opacity: 0; transform: translateY(20px) scale(0.95); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    #tt-chat-header {
      background: linear-gradient(135deg, #0A0A0A, #1a1a1a);
      padding: 20px 20px 16px; color: white; border-bottom: 1px solid rgba(234,88,12,0.2);
    }
    #tt-chat-header h3 { margin: 0; font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    #tt-chat-header p { margin: 4px 0 0; font-size: 12px; color: #9ca3af; }
    #tt-chat-header .status-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
      display: inline-block; animation: ttPulse 2s infinite;
    }
    @keyframes ttPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    #tt-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px 16px 8px;
      background: #f9fafb; display: flex; flex-direction: column; gap: 10px;
    }
    #tt-chat-messages::-webkit-scrollbar { width: 4px; }
    #tt-chat-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
    .tt-msg { max-width: 85%; padding: 10px 14px; border-radius: 16px; font-size: 14px; line-height: 1.5; animation: ttMsgIn 0.3s ease-out; word-wrap: break-word; }
    @keyframes ttMsgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .tt-msg.bot { align-self: flex-start; background: white; color: #374151; border: 1px solid #e5e7eb; border-bottom-left-radius: 4px; }
    .tt-msg.user { align-self: flex-end; background: #ea580c; color: white; border-bottom-right-radius: 4px; }
    .tt-msg.bot a { color: #ea580c; text-decoration: underline; font-weight: 500; }
    .tt-typing { display: flex; align-items: center; gap: 4px; padding: 12px 16px; }
    .tt-typing span { width: 6px; height: 6px; border-radius: 50%; background: #9ca3af; animation: ttTyping 1.4s infinite; }
    .tt-typing span:nth-child(2) { animation-delay: 0.2s; }
    .tt-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes ttTyping { 0%,60%,100% { opacity: 0.3; } 30% { opacity: 1; } }
    #tt-chat-questions {
      padding: 8px 16px 12px; background: #f9fafb; border-top: 1px solid #e5e7eb;
      display: flex; flex-wrap: wrap; gap: 6px; max-height: 140px; overflow-y: auto;
    }
    #tt-chat-questions::-webkit-scrollbar { width: 3px; }
    #tt-chat-questions::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
    .tt-chip {
      padding: 6px 12px; border-radius: 100px; font-size: 12px; font-weight: 500;
      background: white; color: #374151; border: 1px solid #d1d5db; cursor: pointer;
      transition: all 0.2s; white-space: nowrap;
    }
    .tt-chip:hover { background: #fff7ed; border-color: #ea580c; color: #ea580c; }
    .tt-chip:active { transform: scale(0.95); }
    @media (max-width: 480px) {
      #tt-chat-panel { right: 12px; bottom: 90px; width: calc(100vw - 24px); height: 60vh; border-radius: 20px; }
      #tt-chat-btn { right: 16px; bottom: 16px; width: 54px; height: 54px; }
    }
  `;
  document.head.appendChild(styles);

  var chatHTML = `
    <button id="tt-chat-btn">
      <svg class="chat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </button>
    <div id="tt-chat-panel">
      <div id="tt-chat-header">
        <h3><span class="status-dot"></span> TT Global IT Assistant</h3>
        <p>Hi! I'm here to help. Ask me anything about our products & services.</p>
      </div>
      <div id="tt-chat-messages"></div>
      <div id="tt-chat-questions"></div>
    </div>
  `;

  var container = document.createElement('div');
  container.id = 'tt-chatbot';
  container.innerHTML = chatHTML;
  document.body.appendChild(container);

  var btn = document.getElementById('tt-chat-btn');
  var panel = document.getElementById('tt-chat-panel');
  var messagesEl = document.getElementById('tt-chat-messages');
  var questionsEl = document.getElementById('tt-chat-questions');

  var isOpen = false;

  function addMessage(text, type) {
    var div = document.createElement('div');
    div.className = 'tt-msg ' + type;
    div.innerHTML = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    var div = document.createElement('div');
    div.className = 'tt-msg bot tt-typing';
    div.id = 'tt-typing-indicator';
    div.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  function removeTyping() {
    var el = document.getElementById('tt-typing-indicator');
    if (el) el.remove();
  }

  function findAnswer(questionText) {
    var q = questions.find(function (item) { return item.q === questionText; });
    return q ? q.a : "I'm sorry, I don't have an answer for that. Please contact us directly at <a href='mailto:info@ttglobalit.in'>info@ttglobalit.in</a> or call <b>+91 807-3804-799</b>.";
  }

  function handleQuestion(questionText) {
    addMessage(questionText, 'user');
    var typing = showTyping();
    setTimeout(function () {
      removeTyping();
      var answer = findAnswer(questionText);
      addMessage(answer, 'bot');
    }, 800 + Math.random() * 600);
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
      "Hi there! 👋 I'm your TT Global IT assistant. Click any question below to get started, or type your own!",
      "Welcome! 👋 Need help with Esahakara, our services, or internships? Pick a question below!",
      "Hello! 👋 How can I help you today? Choose a topic from the suggestions below."
    ];
    addMessage(greetings[Math.floor(Math.random() * greetings.length)], 'bot');
  }

  btn.addEventListener('click', function () {
    isOpen = !isOpen;
    btn.classList.toggle('open', isOpen);
    panel.classList.toggle('open', isOpen);
    if (isOpen && messagesEl.children.length === 0) {
      addWelcomeMessage();
      populateQuestions();
    }
  });

})();
