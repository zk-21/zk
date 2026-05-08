const appState = {
  activeUnit: 0,
  quiz: {},
  voiceEnabled: true,
  repeatMode: false,
  speechRate: 0.72,
  englishVoice: null,
  chineseVoice: null,
  playbackToken: 0,
  audioPlayer: new Audio(),
  missingAudio: new Set(),
};

const navBar = document.getElementById('navBar');
const app = document.getElementById('app');
const voiceToggle = document.getElementById('voiceToggle');
const repeatToggle = document.getElementById('repeatToggle');
const speedSlider = document.getElementById('speedSlider');
const speedVal = document.getElementById('speedVal');
const voiceStatus = document.getElementById('voiceStatus');

function normalizeKey(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getSpeechLang(text) {
  return /[\u4e00-\u9fff]/.test(text || '') ? 'zh-CN' : 'en-US';
}

function getSpeechRate(text, preferredRate) {
  if (typeof preferredRate === 'number') return preferredRate;
  return getSpeechLang(text) === 'zh-CN'
    ? Math.min(1, appState.speechRate + 0.16)
    : appState.speechRate;
}

function getAudioHash(text) {
  let hash = 0;
  const source = String(text || '');
  for (let i = 0; i < source.length; i++) {
    hash = (hash * 131 + source.charCodeAt(i)) % 2147483647;
  }
  return hash.toString(36);
}

function getAudioSlug(text) {
  const slug = String(text || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return slug || 'clip';
}

function getLocalAudioPath(text) {
  const base = window.COURSE_AUDIO_BASE || 'audio/grade4/en';
  return `${base}/${getAudioSlug(text)}-${getAudioHash(text)}.wav`;
}

function isEnglishAudioText(text) {
  return getSpeechLang(text) === 'en-US' && /[a-zA-Z]/.test(text || '');
}

function loadVoices() {
  if (!window.speechSynthesis) return;
  const voices = window.speechSynthesis.getVoices();
  appState.englishVoice = voices.find(v => v.lang.toLowerCase().startsWith('en')) || null;
  appState.chineseVoice = voices.find(v => v.lang.toLowerCase().startsWith('zh')) || null;
  if (voiceStatus) {
    voiceStatus.textContent = appState.englishVoice ? '语音已就绪' : '系统语音';
  }
}

function stopPlayback() {
  appState.playbackToken++;
  appState.audioPlayer.pause();
  appState.audioPlayer.currentTime = 0;
  appState.audioPlayer.onended = null;
  appState.audioPlayer.onerror = null;
  appState.audioPlayer.src = '';
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

function clearSpeaking(target) {
  if (target) {
    target.classList.remove('speaking');
    return;
  }
  document.querySelectorAll('.speaking').forEach(el => el.classList.remove('speaking'));
}

function tryPlayLocalAudio(text, options, callback, fallback) {
  if (!isEnglishAudioText(text)) return false;

  const src = getLocalAudioPath(text);
  if (appState.missingAudio.has(src)) return false;

  let handled = false;
  const finish = action => {
    if (handled) return;
    handled = true;
    appState.audioPlayer.onended = null;
    appState.audioPlayer.onerror = null;
    action();
  };

  appState.audioPlayer.pause();
  appState.audioPlayer.currentTime = 0;
  appState.audioPlayer.src = src;
  appState.audioPlayer.playbackRate = Math.max(0.5, Math.min(1.18, getSpeechRate(text, options.rate)));
  appState.audioPlayer.onended = () => finish(() => callback && callback());
  appState.audioPlayer.onerror = () => finish(() => {
    appState.missingAudio.add(src);
    fallback();
  });

  const playPromise = appState.audioPlayer.play();
  if (playPromise && typeof playPromise.catch === 'function') {
    playPromise.catch(() => finish(() => {
      appState.missingAudio.add(src);
      fallback();
    }));
  }

  return true;
}

function playWithSpeech(text, options, callback) {
  if (!window.speechSynthesis) {
    if (callback) callback();
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);
  const lang = getSpeechLang(text);
  utter.lang = lang;
  utter.rate = getSpeechRate(text, options.rate);
  utter.pitch = typeof options.pitch === 'number' ? options.pitch : 1;
  utter.volume = 1;
  utter.voice = lang === 'zh-CN' ? appState.chineseVoice : appState.englishVoice;
  utter.onerror = () => callback && callback();
  utter.onend = () => callback && callback();
  window.speechSynthesis.speak(utter);
}

function speak(text, options = {}, callback) {
  if (!appState.voiceEnabled || !text) {
    if (callback) callback();
    return;
  }

  const fallback = () => playWithSpeech(text, options, callback);
  if (!tryPlayLocalAudio(text, options, callback, fallback)) {
    fallback();
  }
}

function speakSequence(items, callback) {
  const queue = (items || []).filter(item => item && item.text);
  if (!queue.length) {
    if (callback) callback();
    return;
  }

  stopPlayback();
  const token = appState.playbackToken;
  const playNext = index => {
    if (token !== appState.playbackToken) return;
    if (index >= queue.length) {
      if (callback) callback();
      return;
    }

    const item = queue[index];
    speak(item.text, { rate: item.rate }, () => {
      if (token !== appState.playbackToken) return;
      const delay = item.pauseAfterMs || 0;
      if (delay) {
        setTimeout(() => playNext(index + 1), delay);
      } else {
        playNext(index + 1);
      }
    });
  };
  playNext(0);
}

function setPanelOpen(head, shouldOpen) {
  const body = head.nextElementSibling;
  if (!body) return;

  head.classList.toggle('open', shouldOpen);
  if (shouldOpen) {
    body.classList.add('open');
    body.style.height = '0px';
    requestAnimationFrame(() => {
      body.style.height = `${body.scrollHeight}px`;
    });
    body.addEventListener('transitionend', function done(event) {
      if (event.propertyName !== 'height') return;
      body.removeEventListener('transitionend', done);
      if (body.classList.contains('open')) body.style.height = 'auto';
    });
    return;
  }

  body.style.height = `${body.scrollHeight}px`;
  requestAnimationFrame(() => {
    body.classList.remove('open');
    body.style.height = '0px';
  });
}

function renderPanel(icon, title, bodyHtml, open = false) {
  return `
    <section class="panel">
      <button class="panel-head ${open ? 'open' : ''}" type="button">
        <span>${icon}</span><span>${title}</span><span class="arrow">▼</span>
      </button>
      <div class="panel-body ${open ? 'open' : ''}">
        ${bodyHtml}
      </div>
    </section>`;
}

function renderWordCard(item) {
  return `
    <div class="word-card" role="button" tabindex="0" data-speak="${htmlEscape(item.en)}">
      <span class="sound">🔊</span>
      <div class="emoji">${item.emoji || '📘'}</div>
      <div class="en">${htmlEscape(item.en)}</div>
      <div class="ipa">${htmlEscape(item.ipa || '')}</div>
      <div class="cn">${htmlEscape(item.cn)}</div>
    </div>`;
}

function renderSentenceCard(item) {
  return `
    <div class="sentence-card" role="button" tabindex="0" data-speak="${htmlEscape(item.en)}">
      <span class="sound">🔊</span>
      <div class="en">${htmlEscape(item.en)}</div>
      <div class="cn">${htmlEscape(item.cn)}</div>
    </div>`;
}

function renderDialogueLine(item) {
  return `
    <div class="dialogue-line" role="button" tabindex="0" data-speak="${htmlEscape(item.text)}">
      <span class="sound">🔊</span>
      <div class="speaker">${htmlEscape(item.speaker)}</div>
      <div class="en">${htmlEscape(item.text)}</div>
      <div class="cn">${htmlEscape(item.cn)}</div>
    </div>`;
}

function renderUnit(unit, index) {
  const words = `
    <p class="hint-line">点击卡片听发音并显示中文。</p>
    <div class="card-grid">${unit.words.map(renderWordCard).join('')}</div>`;

  const sentences = `
    <p class="hint-line">重点句型用于预习和复习。</p>
    <div class="sentence-list">${unit.sentences.map(renderSentenceCard).join('')}</div>`;

  const dialogue = `
    <p class="hint-line">原创练习对话，围绕本单元主题设计。</p>
    <div class="dialogue-box">${unit.dialogue.map(renderDialogueLine).join('')}</div>`;

  const phrases = `
    <p class="hint-line">常用短语和搭配。</p>
    <div class="card-grid">${(unit.phrases || []).map(renderWordCard).join('')}</div>`;

  const grammar = `
    <p class="hint-line">点击听句型发音。</p>
    <div class="grammar-list">${(unit.grammar || []).map(item => `
      <div class="grammar-card" role="button" tabindex="0" data-speak="${htmlEscape(item.en || item)}">
        <span class="sound">🔊</span>
        <div class="en">${htmlEscape(item.en || item)}</div>
        <div class="cn">${htmlEscape(item.cn || '')}</div>
      </div>`).join('')}</div>`;

  return `
    <section class="unit ${index === 0 ? 'active' : ''}" style="--unit-color:${unit.color}" data-unit="${unit.id}">
      <div class="unit-title">
        <h2>${htmlEscape(unit.title)} ${htmlEscape(unit.subtitle)}</h2>
        <p>核心词汇 + 重点句型 + 主题对话 + 小测验</p>
      </div>
      ${renderPanel('📦', '核心词汇', words, true)}
      ${renderPanel('💬', '重点句型', sentences)}
      ${renderPanel('🎭', '主题对话', dialogue)}
      ${unit.phrases?.length ? renderPanel('📌', '重点短语', phrases) : ''}
      ${renderPanel('🧠', '小测验', renderQuiz(unit), false)}
    </section>`;
}

function renderGrammarGuide() {
  const guide = window.COURSE_GRAMMAR_GUIDE || [];
  if (!guide.length) return '';

  const body = guide.map((group, groupIndex) => {
    const rules = (group.rules || []).map(rule => {
      const speakText = rule.speak || rule.pattern || rule.title || rule.example || '';
      return `
        <div class="grammar-guide-card" role="button" tabindex="0" data-speak="${htmlEscape(speakText)}">
          <span class="sound">🔊</span>
          <div class="grammar-guide-title">${htmlEscape(rule.title)}</div>
          <div class="grammar-guide-pattern">${htmlEscape(rule.pattern || '')}</div>
          <div class="grammar-guide-cn">${htmlEscape(rule.cn || '')}</div>
          <div class="grammar-guide-example">${htmlEscape(rule.example || '')}</div>
          ${rule.note ? `<div class="grammar-guide-note">${htmlEscape(rule.note)}</div>` : ''}
        </div>`;
    }).join('');

    return renderPanel(group.icon || '📝', group.title || `语法 ${groupIndex + 1}`, `
      <p class="hint-line">${htmlEscape(group.desc || '点击卡片听例句发音。')}</p>
      <div class="grammar-guide-list">${rules}</div>
    `, groupIndex === 0);
  }).join('');

  return `
    <section class="unit grammar-guide-page" style="--unit-color:#6f42c1" data-unit="grammar-guide">
      <div class="unit-title">
        <h2>语法总览</h2>
        <p>按功能归纳重点句型、用法和例句</p>
      </div>
      ${body}
    </section>`;
}

function renderQuiz(unit) {
  appState.quiz[unit.id] = { current: 0, score: 0 };
  return `
    <div class="quiz" id="quiz-${unit.id}">
      <div class="quiz-progress" id="progress-${unit.id}"></div>
      <div id="question-${unit.id}"></div>
      <div class="quiz-done" id="done-${unit.id}">
        <div class="done-emoji">🎉</div>
        <h3>测验完成</h3>
        <p class="quiz-result" id="result-${unit.id}"></p>
        <button class="restart-btn" type="button" data-restart="${unit.id}">再做一次</button>
      </div>
    </div>`;
}

function showQuizQuestion(unitId) {
  const unit = window.COURSE_UNITS.find(item => item.id === unitId);
  const state = appState.quiz[unitId];
  const questionBox = document.getElementById(`question-${unitId}`);
  const progress = document.getElementById(`progress-${unitId}`);
  const done = document.getElementById(`done-${unitId}`);

  if (state.current >= unit.quiz.length) {
    questionBox.style.display = 'none';
    progress.style.display = 'none';
    done.style.display = 'block';
    const pct = Math.round((state.score / unit.quiz.length) * 100);
    document.getElementById(`result-${unitId}`).textContent = `答对 ${state.score} / ${unit.quiz.length} 题 (${pct}%)`;
    return;
  }

  const q = unit.quiz[state.current];
  progress.style.display = 'block';
  progress.textContent = `第 ${state.current + 1} / ${unit.quiz.length} 题 | 答对: ${state.score}`;
  questionBox.style.display = 'block';
  questionBox.innerHTML = `
    <div class="quiz-question">
      ${q.emoji ? `<div class="big">${q.emoji}</div>` : ''}
      <h3>${htmlEscape(q.q)}</h3>
    </div>
    <div class="quiz-options">
      ${q.options.map(opt => `<div class="quiz-option" role="button" tabindex="0" data-unit="${unitId}" data-answer="${htmlEscape(q.answer)}">${htmlEscape(opt)}</div>`).join('')}
    </div>
    <button class="quiz-next" type="button" data-next="${unitId}">下一题</button>`;
}

function switchUnit(index) {
  appState.activeUnit = index;
  document.querySelectorAll('.nav-btn').forEach((btn, i) => btn.classList.toggle('active', i === index));
  document.querySelectorAll('.unit').forEach((unit, i) => unit.classList.toggle('active', i === index));
  stopPlayback();
  clearSpeaking();
  const activeBtn = document.querySelectorAll('.nav-btn')[index];
  navBar.scrollTo({ left: Math.max(0, activeBtn.offsetLeft - 12), behavior: 'smooth' });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleSpeakCard(card) {
  const text = card.dataset.speak;
  card.classList.toggle('revealed');
  clearSpeaking();
  card.classList.add('speaking');
  const playback = [{ text, rate: Math.max(0.45, appState.speechRate - 0.08), pauseAfterMs: appState.repeatMode ? 450 : 0 }];
  if (appState.repeatMode) {
    playback.push({ text, rate: Math.max(0.4, appState.speechRate - 0.18) });
  }
  speakSequence(playback, () => clearSpeaking(card));
}

function checkAnswer(option) {
  const unitId = option.dataset.unit;
  const correct = option.dataset.answer;
  const selected = option.textContent;
  document.querySelectorAll(`#question-${unitId} .quiz-option`).forEach(opt => {
    opt.classList.add('disabled');
    if (opt.textContent === correct) opt.classList.add('correct');
    if (opt === option && selected !== correct) opt.classList.add('wrong');
  });
  if (selected === correct) {
    appState.quiz[unitId].score++;
    speak(correct);
  }
  document.querySelector(`#question-${unitId} .quiz-next`).style.display = 'block';
}

function restartQuiz(unitId) {
  appState.quiz[unitId] = { current: 0, score: 0 };
  document.getElementById(`done-${unitId}`).style.display = 'none';
  showQuizQuestion(unitId);
}

function initCourse() {
  document.title = window.COURSE_TITLE || document.title;
  document.getElementById('courseTitle').textContent = window.COURSE_TITLE;
  document.getElementById('courseSubTitle').textContent = window.COURSE_SUBTITLE || '译林版英语互动学习';

  const hasGrammarGuide = false;
  navBar.innerHTML = window.COURSE_UNITS.map((unit, index) => `
    <button class="nav-btn ${index === 0 ? 'active' : ''}" type="button" style="--unit-color:${unit.color}" data-index="${index}">
      ${htmlEscape(unit.title)}
    </button>`).join('') + (hasGrammarGuide ? `
    <button class="nav-btn" type="button" style="--unit-color:#6f42c1" data-index="${window.COURSE_UNITS.length}">
      语法总览
    </button>` : '');

  app.innerHTML = window.COURSE_UNITS.map(renderUnit).join('');
  window.COURSE_UNITS.forEach(unit => showQuizQuestion(unit.id));

  if (window.speechSynthesis) {
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  } else if (voiceStatus) {
    voiceStatus.textContent = '当前浏览器不支持语音';
  }
}

document.addEventListener('click', event => {
  const nav = event.target.closest('.nav-btn');
  if (nav) {
    switchUnit(Number(nav.dataset.index));
    return;
  }

  const panelHead = event.target.closest('.panel-head');
  if (panelHead) {
    setPanelOpen(panelHead, !panelHead.classList.contains('open'));
    return;
  }

  const speakCard = event.target.closest('[data-speak]');
  if (speakCard) {
    handleSpeakCard(speakCard);
    return;
  }

  const option = event.target.closest('.quiz-option');
  if (option && !option.classList.contains('disabled')) {
    checkAnswer(option);
    return;
  }

  const next = event.target.closest('[data-next]');
  if (next) {
    const unitId = next.dataset.next;
    appState.quiz[unitId].current++;
    showQuizQuestion(unitId);
    return;
  }

  const restart = event.target.closest('[data-restart]');
  if (restart) {
    restartQuiz(restart.dataset.restart);
  }
});

document.addEventListener('keydown', event => {
  if ((event.key !== 'Enter' && event.key !== ' ') || event.defaultPrevented) return;
  const target = event.target.closest('[role="button"]');
  if (!target) return;
  event.preventDefault();
  target.click();
});

voiceToggle.addEventListener('click', () => {
  appState.voiceEnabled = !appState.voiceEnabled;
  voiceToggle.classList.toggle('active', appState.voiceEnabled);
  voiceToggle.textContent = appState.voiceEnabled ? '🔊 自动发音' : '🔇 发音已关';
  if (!appState.voiceEnabled) {
    stopPlayback();
    clearSpeaking();
  }
});

repeatToggle.addEventListener('click', () => {
  appState.repeatMode = !appState.repeatMode;
  repeatToggle.classList.toggle('active', appState.repeatMode);
  repeatToggle.textContent = appState.repeatMode ? '🔄 跟读模式开' : '🔄 跟读模式';
});

speedSlider.addEventListener('input', () => {
  appState.speechRate = Number(speedSlider.value);
  speedVal.textContent = appState.speechRate.toFixed(1);
});

initCourse();
