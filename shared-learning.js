/* ========================================
   共享学习页面 JS
   适用于 english-1a/1b/2a/2b/5a/5b 等页面
   ======================================== */

// ---- 语音系统 ----
let speechEnabled = true;
let speechRate = 0.7;
let currentUtterance = null;
let useLocalAudio = false;
let speechInitialized = false;

function speak(text) {
  if (!speechEnabled || !text) return;
  if (!speechInitialized) initSpeech();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const lang = /[\u4e00-\u9fa5]/.test(text) ? 'zh-CN' : 'en-US';
    utter.lang = lang;
    utter.rate = lang === 'zh-CN' ? Math.min(1, speechRate + 0.2) : speechRate;
    utter.pitch = 1;
    utter.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    if (lang === 'en-US') {
      const v = voices.find(v => v.lang.includes('en') && v.name && (v.name.includes('David') || v.name.includes('Female') || v.lang === 'en-US'));
      if (v) utter.voice = v;
    } else {
      const v = voices.find(v => v.lang.includes('zh'));
      if (v) utter.voice = v;
    }
    currentUtterance = utter;
    window.speechSynthesis.speak(utter);
  }
}

function initSpeech() {
  if (speechInitialized) return;
  try {
    const t = new SpeechSynthesisUtterance('');
    t.lang = 'en-US'; t.rate = 0.1;
    window.speechSynthesis.speak(t);
    setTimeout(() => window.speechSynthesis.cancel(), 50);
    speechInitialized = true;
    const s = document.getElementById('voiceStatus');
    if (s) s.textContent = '\u{1F399}\uFE0F 语音就绪';
  } catch (e) {
    console.warn('语音初始化失败:', e);
    const s = document.getElementById('voiceStatus');
    if (s) { s.textContent = '\u{1F507} 语音不可用'; s.style.color = '#ff6b6b'; }
  }
}

function toggleVoice() {
  speechEnabled = !speechEnabled;
  const btn = document.getElementById('voiceToggle');
  if (btn) {
    btn.classList.toggle('active', speechEnabled);
    btn.textContent = speechEnabled ? '\u{1F50A} 自动发音' : '\u{1F507} 关闭发音';
  }
}

function changeSpeed(val) {
  speechRate = parseFloat(val);
  const s = document.getElementById('speedVal');
  if (s) s.textContent = speechRate.toFixed(1);
}

// ---- 交互 ----
function toggleSection(header) {
  header.classList.toggle('open');
  header.nextElementSibling.classList.toggle('open');
}

function revealWord(card) {
  card.classList.toggle('revealed');
  const w = card.dataset.w;
  if (w) speak(w);
}

function revealSentence(card) {
  card.classList.toggle('revealed');
  const s = card.dataset.en || card.dataset.s;
  if (s) speak(s);
}

function revealDialogue(line) {
  line.classList.toggle('revealed');
  const t = line.dataset.en || line.dataset.t;
  if (t) speak(t);
}

function switchUnit(idx) {
  document.querySelectorAll('.nav-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  document.querySelectorAll('.unit-section').forEach((s, i) => s.classList.toggle('active', i === idx));
}

// ---- 测验系统 ----
let quizState = {};

function escapeAttr(str) {
  return String(str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function emitQuizEvent(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

function showQuizQuestion(unitId) {
  const unit = unitsData.find(u => u.id === unitId);
  const state = quizState[unitId];
  const q = unit.quiz[state.current];
  if (!q) {
    const pct = unit.quiz.length ? Math.round((state.score / unit.quiz.length) * 100) : 0;
    document.getElementById('qarea-' + unitId).style.display = 'none';
    document.getElementById('score-' + unitId).classList.add('show');
    document.getElementById('sd-' + unitId).textContent = '\u7B54\u5BF9 ' + state.score + ' / ' + unit.quiz.length + ' \u9898';
    emitQuizEvent('shared-learning:quiz-finished', {
      unitId,
      score: state.score,
      total: unit.quiz.length,
      pct,
    });
    return;
  }
  document.getElementById('qp-' + unitId).textContent = '\u7B2C ' + (state.current + 1) + ' / ' + unit.quiz.length + ' \u9898';
  document.getElementById('score-' + unitId).classList.remove('show');
  let html = '<div class="quiz-question">';
  if (q.emoji) html += '<div class="big-emoji">' + q.emoji + '</div>';
  html += '<div class="q-text">' + q.q + '</div></div><div class="quiz-options">';
  q.options.forEach((opt, oi) => {
    html += '<div class="quiz-option" onclick="checkAnswer(\'' + unitId + '\',' + oi + ',\'' + escapeAttr(q.answer) + '\')">' + opt + '</div>';
  });
  html += '</div>';
  document.getElementById('qarea-' + unitId).innerHTML = html;
}

function checkAnswer(unitId, selected, answer) {
  const unit = unitsData.find(u => u.id === unitId);
  const state = quizState[unitId];
  const q = unit.quiz[state.current];
  const options = document.querySelectorAll('#quiz-' + unitId + ' .quiz-option');
  options.forEach(opt => opt.style.pointerEvents = 'none');
  if (q.options[selected] === answer) {
    options[selected].classList.add('correct');
    state.score++;
  } else {
    options[selected].classList.add('wrong');
    options.forEach(opt => { if (opt.textContent === answer) opt.classList.add('correct'); });
  }
  state.current++;
  setTimeout(() => showQuizQuestion(unitId), 800);
}

function restartQuiz(unitId) {
  quizState[unitId] = { current: 0, score: 0 };
  document.getElementById('qarea-' + unitId).style.display = '';
  document.getElementById('score-' + unitId).classList.remove('show');
  emitQuizEvent('shared-learning:quiz-restarted', { unitId });
  showQuizQuestion(unitId);
}

// ---- 单元渲染 ----
function renderAllUnits(data, navBarEl, containerEl, tipProviders) {
  window.unitsData = data;
  data.forEach((unit, idx) => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn' + (idx === 0 ? ' active' : '');
    btn.textContent = unit.title;
    btn.addEventListener('click', () => switchUnit(idx));
    navBarEl.appendChild(btn);

    const section = document.createElement('div');
    section.className = 'unit-section' + (idx === 0 ? ' active' : '');
    section.id = unit.id;

    let html = '<div class="unit-title" style="background:linear-gradient(90deg,' + unit.color + ',' + unit.color + 'dd)">' + unit.title + ' ' + unit.subtitle + '</div>';

    // 核心词汇
    html += '<div class="section-card"><div class="section-header open" onclick="toggleSection(this)"><span class="icon">\u{1F4E6}</span> 核心词汇<span class="arrow">\u25BC</span></div><div class="section-body open"><div class="word-grid">';
    unit.words.forEach(w => {
      const phonetic = w.phonetic || w.ipa || '';
      const example = w.example || '';
      const pos = w.pos || '';
      const phrases = w.phrases ? w.phrases.join(', ') : '';
      const note = w.note || '';
      html += '<div class="word-card" onclick="revealWord(this)" data-w="' + w.en + '">'
        + '<span class="speak-icon">\u{1F50A}</span>'
        + '<div class="emoji">' + w.emoji + '</div>'
        + '<div class="english">' + w.en + '</div>'
        + (pos ? '<span class="pos-tag">' + pos + '</span>' : '')
        + (phonetic ? '<div class="phonetic">' + phonetic + '</div>' : '')
        + '<div class="chinese">' + w.cn + '</div>'
        + (example ? '<div class="example">\u{1F4DD} ' + example + '</div>' : '')
        + (phrases ? '<div class="phrases">\u{1F517} ' + phrases + '</div>' : '')
        + (note ? '<div class="note">\u{1F4A1} ' + note + '</div>' : '')
        + '<div class="hint">\u{1F446} 点击听发音</div></div>';
    });
    html += '</div></div></div>';

    // 重点句型
    html += '<div class="section-card"><div class="section-header" onclick="toggleSection(this)"><span class="icon">\u{1F4AC}</span> 重点句型<span class="arrow">\u25BC</span></div><div class="section-body"><div class="sentence-list">';
    unit.sentences.forEach(s => {
      const funcTag = s.function ? '<span class="func-tag">' + s.function + '</span>' : '';
      const structTag = s.structure ? '<span class="struct-tag">' + s.structure + '</span>' : '';
      const grammarTip = s.grammar ? '<div class="grammar-tip">\u{1F4DA} ' + s.grammar + '</div>' : '';
      html += '<div class="sentence-card" onclick="revealSentence(this)" data-en="' + s.en + '">'
        + '<span class="speak-icon">\u{1F50A}</span>'
        + '<div class="tags">' + funcTag + structTag + '</div>'
        + '<div class="en">' + s.en + '</div>'
        + '<div class="cn">' + s.cn + '</div>' + grammarTip + '</div>';
    });
    html += '</div></div></div>';

    // 课文对话
    html += '<div class="section-card"><div class="section-header" onclick="toggleSection(this)"><span class="icon">\u{1F3AD}</span> 课文对话<span class="arrow">\u25BC</span></div><div class="section-body"><div class="dialogue-box">';
    unit.dialogue.forEach((d, di) => {
      html += '<div class="line ' + (di % 2 === 0 ? 'speaker-a' : 'speaker-b') + '" onclick="revealDialogue(this)" data-en="' + d.text + '">'
        + '<div class="speaker-label">' + d.speaker + '</div>'
        + '<div class="en-text">' + d.text + '</div>'
        + '<div class="cn-text">' + d.cn + '</div></div>';
    });
    html += '</div></div></div>';

    // 语法要点（可选）
    if (unit.grammar && unit.grammar.length > 0) {
      html += '<div class="section-card"><div class="section-header" onclick="toggleSection(this)"><span class="icon">\u{1F4DD}</span> 语法要点<span class="arrow">\u25BC</span></div><div class="section-body">';
      unit.grammar.forEach(g => {
        html += '<div class="grammar-section"><div class="grammar-title">' + g.rule + '</div><div class="grammar-rule">' + g.cn + '</div><div class="grammar-example">' + g.example + '</div></div>';
      });
      html += '</div></div>';
    }

    // 学习加油站（可选）
    if (tipProviders) {
      html += '<div class="section-card"><div class="section-header" onclick="toggleSection(this)"><span class="icon">\u{1F3AF}</span> 学习加油站<span class="arrow">\u25BC</span></div><div class="section-body"><div class="learning-tips">';
      const tips = [
        { icon: '\u{1F524}', title: '自然拼读', content: tipProviders.phonics(unit.id) },
        { icon: '\u{1F4DD}', title: '语法口诀', content: tipProviders.grammar(unit.id) },
        { icon: '\u{1F30D}', title: '文化小贴士', content: tipProviders.culture(unit.id) },
        { icon: '\u{1F4A1}', title: '学习技巧', content: tipProviders.study(unit.id) },
      ];
      tips.forEach(t => {
        html += '<div class="tip-card"><div class="tip-icon">' + t.icon + '</div><div class="tip-title">' + t.title + '</div><div class="tip-content">' + t.content + '</div></div>';
      });
      html += '</div></div></div>';
    }

    // 小测验
    html += '<div class="section-card"><div class="section-header" onclick="toggleSection(this)"><span class="icon">\u{1F9E0}</span> 小测验<span class="arrow">\u25BC</span></div><div class="section-body"><div class="quiz-container" id="quiz-' + unit.id + '">'
      + '<div class="quiz-progress" id="qp-' + unit.id + '">\u7B2C 1 / ' + unit.quiz.length + ' \u9898</div>'
      + '<div id="qarea-' + unit.id + '"></div>'
      + '<div class="quiz-score" id="score-' + unit.id + '"><div class="score-emoji">\u{1F389}</div><div class="score-text">测验完成！</div><div class="score-detail" id="sd-' + unit.id + '"></div><button onclick="restartQuiz(\'' + unit.id + '\')">再做一次</button></div>'
      + '</div></div></div>';

    section.innerHTML = html;
    containerEl.appendChild(section);
    quizState[unit.id] = { current: 0, score: 0 };
    showQuizQuestion(unit.id);
  });
}
