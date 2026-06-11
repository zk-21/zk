/* ========================================
   共享学习页面 JS
   适用于 english-1a/1b/2a/2b/5a/5b 等页面
   ======================================== */

const appState = {
  activeUnit: 0,
  unitsData: [],
  quiz: {},
  voiceEnabled: true,
  speechRate: 0.7,
  englishVoice: null,
  chineseVoice: null,
};

const renderContext = {
  navBarEl: null,
  containerEl: null,
  tipProviders: null,
};

function normalizeKey(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function cleanText(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function uniqueItems(items, limit = Infinity) {
  const seen = new Set();
  const result = [];
  (items || []).forEach(item => {
    const key = normalizeKey(typeof item === 'string' ? item : item?.q || item?.en || item?.text || item?.title || '');
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push(item);
  });
  return result.slice(0, limit);
}

function getPageStorageName() {
  const raw = location.pathname.split('/').pop() || document.title || 'page';
  try {
    return decodeURIComponent(raw).replace(/\.[^.]+$/, '').toLowerCase();
  } catch {
    return raw.replace(/\.[^.]+$/, '').toLowerCase();
  }
}

function getUnitStorageKey(unitId) {
  return `shared-learning:${getPageStorageName()}:${unitId}`;
}

function buildMistakeId(item) {
  return normalizeKey(`${item?.question || ''}|${item?.correct || ''}`);
}

function normalizeStoredMistakes(items) {
  return Array.isArray(items)
    ? items
      .map(item => ({
        id: buildMistakeId(item),
        question: cleanText(item?.question || ''),
        selected: cleanText(item?.selected || ''),
        correct: cleanText(item?.correct || ''),
        time: Number(item?.time || 0),
      }))
      .filter(item => item.id && item.question && item.correct)
      .slice(-6)
    : [];
}

function readUnitProgress(unitId) {
  try {
    const parsed = JSON.parse(localStorage.getItem(getUnitStorageKey(unitId)) || '{}');
    return {
      rounds: Number(parsed.rounds || 0),
      bestScore: Number(parsed.bestScore || 0),
      lastScore: Number(parsed.lastScore || 0),
      total: Number(parsed.total || 0),
      lastPct: Number(parsed.lastPct || 0),
      mistakes: normalizeStoredMistakes(parsed.mistakes),
    };
  } catch {
    return { rounds: 0, bestScore: 0, lastScore: 0, total: 0, lastPct: 0, mistakes: [] };
  }
}

function writeUnitProgress(unitId, data) {
  try {
    localStorage.setItem(getUnitStorageKey(unitId), JSON.stringify({
      rounds: Number(data?.rounds || 0),
      bestScore: Number(data?.bestScore || 0),
      lastScore: Number(data?.lastScore || 0),
      total: Number(data?.total || 0),
      lastPct: Number(data?.lastPct || 0),
      mistakes: normalizeStoredMistakes(data?.mistakes),
    }));
  } catch {
    // 浏览器禁用本地存储时静默降级
  }
}

function recordMistake(unitId, detail) {
  const progress = readUnitProgress(unitId);
  const entry = {
    id: buildMistakeId(detail),
    question: cleanText(detail?.question || ''),
    selected: cleanText(detail?.selected || ''),
    correct: cleanText(detail?.correct || ''),
    time: Date.now(),
  };
  progress.mistakes = normalizeStoredMistakes([
    ...progress.mistakes.filter(item => item.id !== entry.id),
    entry,
  ]);
  writeUnitProgress(unitId, progress);
}

function clearMistake(unitId, question, correct) {
  const progress = readUnitProgress(unitId);
  const currentId = buildMistakeId({ question, correct });
  progress.mistakes = normalizeStoredMistakes(progress.mistakes.filter(item => item.id !== currentId));
  writeUnitProgress(unitId, progress);
}

function saveQuizProgress(unitId, total, score) {
  const progress = readUnitProgress(unitId);
  progress.rounds += 1;
  progress.bestScore = Math.max(progress.bestScore, score);
  progress.lastScore = score;
  progress.total = total;
  progress.lastPct = total ? Math.round((score / total) * 100) : 0;
  writeUnitProgress(unitId, progress);
}

function getVoiceStatusEl() {
  return document.getElementById('voiceStatus');
}

function updateVoiceStatus(text, color) {
  const status = getVoiceStatusEl();
  if (!status) return;
  status.textContent = text;
  status.style.color = color || '#ffe082';
}

function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

function clearSpeaking(target) {
  const targets = target ? [target] : Array.from(document.querySelectorAll('.speaking'));
  targets.forEach(card => {
    card.classList.remove('speaking');
    const sound = card.querySelector('.sound');
    if (sound) sound.textContent = '🔊';
  });
}

function getSpeechLang(text) {
  return /[\u4e00-\u9fff]/.test(text || '') ? 'zh-CN' : 'en-US';
}

function loadVoices() {
  if (!('speechSynthesis' in window)) {
    updateVoiceStatus('当前浏览器不支持语音', '#ffecb3');
    return;
  }
  const voices = window.speechSynthesis.getVoices();
  appState.englishVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('en')) || null;
  appState.chineseVoice = voices.find(voice => voice.lang.toLowerCase().startsWith('zh')) || null;
  updateVoiceStatus(appState.englishVoice ? '语音已就绪' : '系统语音');
}

function speak(text, options = {}, callback) {
  if (!appState.voiceEnabled || !text) {
    if (callback) callback();
    return;
  }
  if (!('speechSynthesis' in window)) {
    if (callback) callback();
    return;
  }

  stopSpeaking();
  const utter = new SpeechSynthesisUtterance(text);
  const lang = getSpeechLang(text);
  utter.lang = lang;
  utter.rate = typeof options.rate === 'number'
    ? options.rate
    : (lang === 'zh-CN' ? Math.min(1, appState.speechRate + 0.15) : appState.speechRate);
  utter.pitch = 1;
  utter.volume = 1;
  utter.voice = lang === 'zh-CN' ? appState.chineseVoice : appState.englishVoice;
  utter.onend = () => callback && callback();
  utter.onerror = () => callback && callback();
  window.speechSynthesis.speak(utter);
}

function toggleVoice() {
  appState.voiceEnabled = !appState.voiceEnabled;
  const btn = document.getElementById('voiceToggle');
  if (btn) {
    btn.classList.toggle('active', appState.voiceEnabled);
    btn.textContent = appState.voiceEnabled ? '🔊 自动发音' : '🔇 发音已关';
  }
  if (!appState.voiceEnabled) {
    stopSpeaking();
    clearSpeaking();
    updateVoiceStatus('语音已关闭', '#ffe082');
  } else {
    loadVoices();
  }
}

function changeSpeed(val) {
  appState.speechRate = Number(val);
  const speedVal = document.getElementById('speedVal');
  if (speedVal) speedVal.textContent = appState.speechRate.toFixed(1);
}

function syncVoiceControls() {
  const btn = document.getElementById('voiceToggle');
  const speedSlider = document.getElementById('speedSlider');
  if (btn) {
    btn.classList.toggle('active', appState.voiceEnabled);
    btn.textContent = appState.voiceEnabled ? '🔊 自动发音' : '🔇 发音已关';
  }
  if (speedSlider) {
    speedSlider.value = String(appState.speechRate);
  }
  changeSpeed(appState.speechRate);
}

function getUnitThemeLabel(unit) {
  return cleanText(unit?.subtitle || unit?.title || '本单元主题');
}

function buildPhraseItems(unit) {
  const items = [];
  const seen = new Set();
  (unit?.words || []).forEach(word => {
    (word?.phrases || []).forEach(phrase => {
      const key = normalizeKey(phrase);
      if (!key || seen.has(key)) return;
      seen.add(key);
      items.push({
        en: cleanText(phrase),
        cn: word?.cn ? `结合“${word.cn}”一起记忆` : '常用搭配',
        emoji: word?.emoji || '📌',
        note: word?.en ? `来自单词 ${word.en}` : '',
      });
    });
  });
  return items.slice(0, 8);
}

function buildLearningGoals(unit) {
  const words = uniqueItems(unit?.words || [], 3).map(item => item.en).filter(Boolean);
  const sentence = cleanText(unit?.sentences?.[0]?.en || '');
  const theme = getUnitThemeLabel(unit);
  return uniqueItems([
    words.length ? `会认读并听懂 ${words.join(' / ')} 等核心词。` : '',
    sentence ? `会跟读并完整说句子：${sentence}` : '',
    `能围绕“${theme}”完成 2 到 3 句表达。`,
  ], 3);
}

function buildScenarioQA(unit) {
  const fromDialogue = [];
  (unit?.dialogue || []).forEach((line, index, lines) => {
    const next = lines[index + 1];
    if (!line?.text || !next?.text || !/[?？]/.test(line.text)) return;
    fromDialogue.push({
      q: cleanText(line.text),
      a: cleanText(next.text),
      tip: '先听问题，再用完整答句回应。',
    });
  });
  if (fromDialogue.length) return uniqueItems(fromDialogue, 4);

  const questionSentence = (unit?.sentences || []).find(item => /[?？]/.test(item?.en || ''));
  const answerSentence = (unit?.sentences || []).find(item => item?.en && !/[?？]/.test(item.en));
  if (questionSentence && answerSentence) {
    return [{
      q: cleanText(questionSentence.en),
      a: cleanText(answerSentence.en),
      tip: '先听问句，再模仿答句。',
    }];
  }

  const modelSentence = cleanText(answerSentence?.en || unit?.dialogue?.[0]?.text || '');
  return modelSentence
    ? [{
      q: `试着说一说和“${getUnitThemeLabel(unit)}”有关的一句英语。`,
      a: modelSentence,
      tip: '先听示范，再换成自己的内容说一遍。',
    }]
    : [];
}

function buildMiniReading(unit) {
  const dialogueLines = uniqueItems((unit?.dialogue || []).map(item => ({
    en: cleanText(item?.text || ''),
    cn: cleanText(item?.cn || ''),
  })), 4).filter(item => item.en);
  const sentenceLines = uniqueItems((unit?.sentences || []).map(item => ({
    en: cleanText(item?.en || ''),
    cn: cleanText(item?.cn || ''),
  })), 4).filter(item => item.en);
  const lines = dialogueLines.length >= 3 ? dialogueLines : sentenceLines;
  const keywords = uniqueItems([
    ...(unit?.words || []).slice(0, 3).map(item => item.en),
    ...buildPhraseItems(unit).slice(0, 2).map(item => item.en),
    unit?.sentences?.[0]?.en || '',
  ].filter(Boolean), 5);
  return {
    title: `${getUnitThemeLabel(unit)} 微阅读`,
    lines,
    questions: [
      '你在这段内容里听到了哪些关键词？',
      '谁在说话？他们在说什么？',
      '你能模仿说出其中一句吗？',
    ],
    support: keywords,
  };
}

function buildOutputTasks(unit) {
  const words = uniqueItems((unit?.words || []).map(item => item.en), 3);
  const firstSentence = cleanText(unit?.sentences?.[0]?.en || '');
  const firstPrompt = buildScenarioQA(unit)[0]?.q || '';
  return uniqueItems([
    firstSentence ? `跟读 2 个核心词，再完整说一句：${firstSentence}` : '跟读 2 个核心词，再说 1 个完整句子。',
    `和同伴完成 1 轮“${getUnitThemeLabel(unit)}”主题对话。`,
    words.length
      ? `试着用 ${words.join(' / ')} 中的词，自己再编 1 句英语。`
      : `根据提示“${firstPrompt || getUnitThemeLabel(unit)}”说 2 到 3 句自己的话。`,
  ], 3);
}

function emitQuizEvent(name, detail) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

function renderPanel(icon, title, bodyHtml, open = false, extraClass = '') {
  return `
    <section class="panel ${extraClass}">
      <button class="panel-head ${open ? 'open' : ''}" type="button" aria-expanded="${open ? 'true' : 'false'}">
        <span>${icon}</span>
        <span>${title}</span>
        <span class="arrow">▼</span>
      </button>
      <div class="panel-body ${open ? 'open' : ''}"${open ? '' : ' hidden'}>
        ${bodyHtml}
      </div>
    </section>`;
}

function setPanelOpen(head, shouldOpen) {
  const body = head.nextElementSibling;
  head.classList.toggle('open', shouldOpen);
  head.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  if (body) {
    body.classList.toggle('open', shouldOpen);
    body.hidden = !shouldOpen;
  }
}

function renderWordCard(item, extraClass = '') {
  const speakText = cleanText(item?.en || '');
  const phonetic = htmlEscape(item?.phonetic || item?.ipa || '');
  const revealBits = [
    item?.cn ? `<div class="cn reveal-row">${htmlEscape(item.cn)}</div>` : '',
    item?.example ? `<div class="subline reveal-row example">📝 ${htmlEscape(item.example)}</div>` : '',
    item?.note ? `<div class="subline reveal-row note">💡 ${htmlEscape(item.note)}</div>` : '',
  ].join('');
  return `
    <article class="word-card ${extraClass}" role="button" tabindex="0" data-speak="${htmlEscape(speakText)}" aria-label="听一听 ${htmlEscape(speakText)}">
      <span class="sound" aria-hidden="true">🔊</span>
      <div class="emoji">${htmlEscape(item?.emoji || '📘')}</div>
      <div class="english">${htmlEscape(speakText)}</div>
      ${item?.pos ? `<span class="pos-tag">${htmlEscape(item.pos)}</span>` : ''}
      ${phonetic ? `<div class="phonetic">${phonetic}</div>` : ''}
      ${revealBits}
    </article>`;
}

function renderPhraseCard(item) {
  const speakText = cleanText(item?.en || '');
  return `
    <article class="word-card phrase-card" role="button" tabindex="0" data-speak="${htmlEscape(speakText)}" aria-label="听一听 ${htmlEscape(speakText)}">
      <span class="sound" aria-hidden="true">🔊</span>
      <div class="emoji">${htmlEscape(item?.emoji || '📌')}</div>
      <div class="english">${htmlEscape(speakText)}</div>
      ${item?.cn ? `<div class="cn reveal-row">${htmlEscape(item.cn)}</div>` : ''}
      ${item?.note ? `<div class="subline reveal-row note">💡 ${htmlEscape(item.note)}</div>` : ''}
    </article>`;
}

function renderSentenceCard(item) {
  const speakText = cleanText(item?.en || item || '');
  return `
    <article class="sentence-card" role="button" tabindex="0" data-speak="${htmlEscape(speakText)}" aria-label="听一听 ${htmlEscape(speakText)}">
      <span class="sound" aria-hidden="true">🔊</span>
      <div class="tags">
        ${item?.function ? `<span class="func-tag">${htmlEscape(item.function)}</span>` : ''}
        ${item?.structure ? `<span class="struct-tag">${htmlEscape(item.structure)}</span>` : ''}
      </div>
      <div class="en">${htmlEscape(speakText)}</div>
      ${item?.cn ? `<div class="cn reveal-row">${htmlEscape(item.cn)}</div>` : ''}
      ${item?.grammar ? `<div class="subline reveal-row grammar-tip">📚 ${htmlEscape(item.grammar)}</div>` : ''}
    </article>`;
}

function renderDialogueLine(item) {
  const speakText = cleanText(item?.text || '');
  return `
    <article class="dialogue-line" role="button" tabindex="0" data-speak="${htmlEscape(speakText)}" aria-label="听一听 ${htmlEscape(speakText)}">
      <span class="sound" aria-hidden="true">🔊</span>
      <div class="speaker">${htmlEscape(item?.speaker || 'Speaker')}</div>
      <div class="en">${htmlEscape(speakText)}</div>
      ${item?.cn ? `<div class="cn reveal-row">${htmlEscape(item.cn)}</div>` : ''}
    </article>`;
}

function renderTipCards(items) {
  return `
    <div class="tips-grid">
      ${items.map(item => `
        <div class="tip-card">
          <div class="tip-card-header">
            <span class="tip-card-icon">${htmlEscape(item.icon || '📌')}</span>
            <span class="tip-card-title">${htmlEscape(item.title)}</span>
          </div>
          <div class="tip-card-body">${item.html || htmlEscape(item.body || '')}</div>
        </div>`).join('')}
    </div>`;
}

function renderGoalCards(unit) {
  const goals = buildLearningGoals(unit);
  return `
    <p class="hint-line">先知道本单元要学会什么，再开始听、说、读、练。</p>
    ${renderTipCards(goals.map((goal, index) => ({
      icon: ['🎯', '🗣️', '⭐'][index] || '📌',
      title: `目标 ${index + 1}`,
      body: goal,
    })))}`;
}

function renderScenarioPanel(unit) {
  const items = buildScenarioQA(unit);
  if (!items.length) return '<p class="hint-line">先积累词句，再完成这一部分跟说练习。</p>';
  return `
    <p class="hint-line">先听提示，再模仿示范答句；熟练后换成自己的信息说一遍。</p>
    <div class="dialogue-box">
      ${items.map(item => `
        <article class="dialogue-line" role="button" tabindex="0" data-speak="${htmlEscape(item.q)}" aria-label="听一听 ${htmlEscape(item.q)}">
          <span class="sound" aria-hidden="true">🔊</span>
          <div class="speaker">❓ Prompt</div>
          <div class="en">${htmlEscape(item.q)}</div>
          <div class="cn reveal-row">${htmlEscape(item.tip || '先听提示，再试着自己回答。')}</div>
        </article>
        <article class="dialogue-line" role="button" tabindex="0" data-speak="${htmlEscape(item.a)}" aria-label="听一听 ${htmlEscape(item.a)}">
          <span class="sound" aria-hidden="true">🔊</span>
          <div class="speaker">✅ Model</div>
          <div class="en">${htmlEscape(item.a)}</div>
          <div class="cn reveal-row">${htmlEscape(item.tip || '听完示范，再模仿说。')}</div>
        </article>`).join('')}
    </div>`;
}

function renderMiniReadingPanel(unit) {
  const reading = buildMiniReading(unit);
  return `
    <p class="hint-line">先逐句听读，再看中文复述，最后回答下面的问题。</p>
    <div class="reading-card">
      <div class="reading-title">${htmlEscape(reading.title)}</div>
      <div class="reading-desc">围绕本单元主题设计的微阅读，适合先读、再说、再复述。</div>
    </div>
    <div class="sentence-list">
      ${reading.lines.map(renderSentenceCard).join('')}
    </div>
    ${renderTipCards([
      {
        icon: '❓',
        title: '读后想一想',
        html: reading.questions.map(item => `<span class="tip-rule">${htmlEscape(item)}</span>`).join(''),
      },
      {
        icon: '🧩',
        title: '复述支架',
        html: reading.support.length
          ? reading.support.map(item => `<span class="tip-rule"><strong>${htmlEscape(item)}</strong></span>`).join('')
          : '<span class="tip-rule">先复述 1 句，再慢慢扩展到 2 到 3 句。</span>',
      },
    ])}`;
}

function renderLearningTips(unit) {
  const provider = renderContext.tipProviders;
  if (!provider) return '';
  const items = [
    { icon: '🔤', title: '自然拼读', html: provider.phonics ? provider.phonics(unit.id) : '' },
    { icon: '📝', title: '语法口诀', html: provider.grammar ? provider.grammar(unit.id) : '' },
    { icon: '🌍', title: '文化小贴士', html: provider.culture ? provider.culture(unit.id) : '' },
    { icon: '💡', title: '学习技巧', html: provider.study ? provider.study(unit.id) : '' },
  ].filter(item => item.html);
  if (!items.length) return '<p class="hint-line">本单元暂无额外提示，可以先完成听读和测验。</p>';
  return `
    <p class="hint-line">把“怎么读、怎么记、怎么用”放在一起，方便课后复习。</p>
    ${renderTipCards(items)}`;
}

function renderOutputPanel(unit) {
  const tasks = buildOutputTasks(unit);
  return `
    <p class="hint-line">学完词句后要开口说，把知识真正用出来。</p>
    ${renderTipCards(tasks.map((task, index) => ({
      icon: ['🎤', '🪄', '🚀'][index] || '📌',
      title: `输出任务 ${index + 1}`,
      body: task,
    })))}`;
}

function renderGrammarPanel(unit) {
  const items = Array.isArray(unit?.grammar) ? unit.grammar : [];
  if (!items.length) return '';
  return `
    <p class="hint-line">点击语法卡片听关键词或例句，再用自己的话解释意思。</p>
    <div class="grammar-list">
      ${items.map(item => {
        const title = item?.rule || item?.en || item || '';
        const speakText = cleanText(item?.example || item?.rule || item?.en || item || '');
        return `
          <article class="grammar-card" role="button" tabindex="0" data-speak="${htmlEscape(speakText)}" aria-label="听一听 ${htmlEscape(speakText)}">
            <span class="sound" aria-hidden="true">🔊</span>
            <div class="grammar-title">${htmlEscape(title)}</div>
            ${item?.cn ? `<div class="grammar-rule">${htmlEscape(item.cn)}</div>` : ''}
            ${item?.example ? `<div class="grammar-example">${htmlEscape(item.example)}</div>` : ''}
          </article>`;
      }).join('')}
    </div>`;
}

function renderRecordPanel(unit) {
  return `
    <div id="record-body-${unit.id}">
      ${buildRecordPanelBody(unit.id)}
    </div>`;
}

function buildRecordPanelBody(unitId) {
  const unit = appState.unitsData.find(item => item.id === unitId);
  const progress = readUnitProgress(unitId);
  const total = progress.total || unit?.quiz?.length || 0;
  const bestPct = total ? Math.round((progress.bestScore / total) * 100) : 0;
  return `
    <p class="hint-line">本页会把练习次数、最近成绩和错题保存在当前浏览器里，方便复习。</p>
    ${renderTipCards([
      {
        icon: '🔁',
        title: '练习次数',
        html: `<div class="stat-big">${progress.rounds}</div><div class="stat-sub">已经完成 ${progress.rounds} 次小测验</div>`,
      },
      {
        icon: '🏅',
        title: '最佳成绩',
        html: `<div class="stat-big">${progress.bestScore}/${total || '?'}</div><div class="stat-sub">${bestPct}%</div>`,
      },
      {
        icon: '📝',
        title: '最近一次',
        html: `<div class="stat-big">${progress.lastScore}/${total || '?'}</div><div class="stat-sub">${progress.lastPct || 0}%</div>`,
      },
    ])}
    <div class="review-block">
      <div class="review-title">错题回看</div>
      ${progress.mistakes.length
        ? `<div class="mistake-list">
            ${progress.mistakes.slice().reverse().map(item => `
              <article class="mistake-card" role="button" tabindex="0" data-speak="${htmlEscape(item.correct)}" data-reveal="false" aria-label="听一听正确答案 ${htmlEscape(item.correct)}">
                <span class="sound" aria-hidden="true">🔊</span>
                <div class="mistake-question">${htmlEscape(item.question)}</div>
                <div class="mistake-answer">你的答案：${htmlEscape(item.selected || '未作答')}</div>
                <div class="mistake-answer correct">正确答案：${htmlEscape(item.correct)}</div>
              </article>`).join('')}
          </div>`
        : '<div class="empty-note">暂时没有错题，继续保持。</div>'}
    </div>`;
}

function getResultMeta(pct) {
  if (pct >= 90) return { emoji: '🎉', title: '太棒了！', tip: '可以把句子换成自己的信息，再说一遍。' };
  if (pct >= 70) return { emoji: '👍', title: '很不错！', tip: '把错题再读一读，下一次会更稳。' };
  return { emoji: '💪', title: '继续练习！', tip: '先回看错题，再完成一轮跟读和复述。' };
}

function renderQuiz(unit) {
  appState.quiz[unit.id] = { current: 0, score: 0 };
  return `
    <div class="quiz" id="quiz-${unit.id}">
      <div class="quiz-progress" id="progress-${unit.id}"></div>
      <div id="question-${unit.id}"></div>
      <div class="quiz-done" id="done-${unit.id}" hidden>
        <div class="done-emoji" id="done-emoji-${unit.id}">🎉</div>
        <h3 id="done-title-${unit.id}">测验完成！</h3>
        <p class="quiz-result" id="result-${unit.id}"></p>
        <p class="quiz-tip" id="done-tip-${unit.id}"></p>
        <button class="restart-btn" type="button" data-restart="${unit.id}">再做一次</button>
      </div>
    </div>`;
}

function updateRecordPanel(unitId) {
  const host = document.getElementById(`record-body-${unitId}`);
  if (host) host.innerHTML = buildRecordPanelBody(unitId);
}

function showQuizQuestion(unitId) {
  const unit = appState.unitsData.find(item => item.id === unitId);
  const state = appState.quiz[unitId];
  if (!unit || !state) return;

  const questionBox = document.getElementById(`question-${unitId}`);
  const progress = document.getElementById(`progress-${unitId}`);
  const done = document.getElementById(`done-${unitId}`);

  if (state.current >= unit.quiz.length) {
    const pct = unit.quiz.length ? Math.round((state.score / unit.quiz.length) * 100) : 0;
    const resultMeta = getResultMeta(pct);
    if (questionBox) questionBox.hidden = true;
    if (progress) progress.hidden = true;
    if (done) {
      done.hidden = false;
      document.getElementById(`done-emoji-${unitId}`).textContent = resultMeta.emoji;
      document.getElementById(`done-title-${unitId}`).textContent = resultMeta.title;
      document.getElementById(`result-${unitId}`).textContent = `答对 ${state.score} / ${unit.quiz.length} 题 (${pct}%)`;
      document.getElementById(`done-tip-${unitId}`).textContent = resultMeta.tip;
    }
    saveQuizProgress(unitId, unit.quiz.length, state.score);
    updateRecordPanel(unitId);
    emitQuizEvent('shared-learning:quiz-finished', {
      unitId,
      score: state.score,
      total: unit.quiz.length,
      pct,
    });
    return;
  }

  const q = unit.quiz[state.current];
  if (progress) {
    progress.hidden = false;
    progress.textContent = `第 ${state.current + 1} / ${unit.quiz.length} 题 | 已答对 ${state.score} 题`;
  }
  if (done) done.hidden = true;
  if (questionBox) {
    questionBox.hidden = false;
    questionBox.innerHTML = `
      <div class="quiz-question">
        ${q.emoji ? `<div class="big-emoji">${htmlEscape(q.emoji)}</div>` : ''}
        <div class="q-text">${htmlEscape(q.q)}</div>
      </div>
      <div class="quiz-options">
        ${q.options.map(opt => `
          <div class="quiz-option" role="button" tabindex="0" data-unit="${unitId}" data-answer="${htmlEscape(q.answer)}">
            ${htmlEscape(opt)}
          </div>`).join('')}
      </div>
      <button class="quiz-next" type="button" data-next="${unitId}">下一题</button>`;
  }
}

function checkAnswer(option) {
  const unitId = option.dataset.unit;
  const unit = appState.unitsData.find(item => item.id === unitId);
  const state = appState.quiz[unitId];
  if (!unit || !state) return;

  const question = unit.quiz[state.current];
  const correct = cleanText(option.dataset.answer || '');
  const selected = cleanText(option.textContent || '');
  const options = document.querySelectorAll(`#question-${unitId} .quiz-option`);
  options.forEach(item => item.classList.add('disabled'));
  options.forEach(item => {
    if (cleanText(item.textContent) === correct) item.classList.add('correct');
  });

  if (selected === correct) {
    option.classList.add('correct');
    state.score += 1;
    clearMistake(unitId, question.q, correct);
  } else {
    option.classList.add('wrong');
    recordMistake(unitId, {
      question: question.q,
      selected,
      correct,
    });
  }

  updateRecordPanel(unitId);
  speak(correct);
  const nextButton = document.querySelector(`#question-${unitId} .quiz-next`);
  if (nextButton) nextButton.style.display = 'inline-flex';
}

function restartQuiz(unitId) {
  appState.quiz[unitId] = { current: 0, score: 0 };
  const done = document.getElementById(`done-${unitId}`);
  if (done) done.hidden = true;
  showQuizQuestion(unitId);
  emitQuizEvent('shared-learning:quiz-restarted', { unitId });
}

function handleSpeakCard(card) {
  const speakText = cleanText(card.dataset.speak || '');
  if (!speakText) return;

  if (card.dataset.reveal !== 'false') {
    card.classList.toggle('revealed');
  }
  clearSpeaking();
  card.classList.add('speaking');
  const sound = card.querySelector('.sound');
  if (sound) sound.textContent = '🔉';
  speak(speakText, {}, () => clearSpeaking(card));
}

function switchUnit(index) {
  appState.activeUnit = index;
  const navButtons = renderContext.navBarEl ? renderContext.navBarEl.querySelectorAll('.nav-btn') : [];
  const sections = renderContext.containerEl ? renderContext.containerEl.querySelectorAll('.unit-section') : [];
  navButtons.forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === index);
  });
  sections.forEach((section, sectionIndex) => {
    section.classList.toggle('active', sectionIndex === index);
  });
  const activeBtn = navButtons[index];
  if (activeBtn && typeof activeBtn.scrollIntoView === 'function') {
    activeBtn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }
}

function renderUnit(unit, index) {
  const phraseItems = buildPhraseItems(unit);
  return `
    <section class="unit-section ${index === 0 ? 'active' : ''}" id="${htmlEscape(unit.id)}" style="--unit-color:${htmlEscape(unit.color || '#ff6b6b')}">
      <div class="unit-title">
        <h2>${htmlEscape(unit.title)} ${htmlEscape(unit.subtitle || '')}</h2>
        <p>学习目标 → 词汇 → 句型 → 情景问答 → 微阅读与复述 → 主题对话 → 输出任务 → 学习记录 → 小测验</p>
      </div>
      ${renderPanel('🎯', '学习目标', renderGoalCards(unit), true)}
      ${renderPanel('📦', '核心词汇', `
        <p class="hint-line">点击卡片听发音，再翻开中文、例句和提示。</p>
        <div class="card-grid">
          ${(unit.words || []).map(item => renderWordCard(item)).join('')}
        </div>`, true)}
      ${phraseItems.length ? renderPanel('📌', '常用搭配', `
        <p class="hint-line">把常用搭配和熟词放在一起记，开口时更顺手。</p>
        <div class="card-grid">
          ${phraseItems.map(renderPhraseCard).join('')}
        </div>`) : ''}
      ${renderPanel('💬', '重点句型', `
        <p class="hint-line">先听一遍，再看中文，最后尝试自己说。</p>
        <div class="sentence-list">
          ${(unit.sentences || []).map(renderSentenceCard).join('')}
        </div>`)}
      ${renderPanel('🗣️', '情景问答', renderScenarioPanel(unit))}
      ${renderPanel('📖', '微阅读与复述', renderMiniReadingPanel(unit))}
      ${renderPanel('🎭', '主题对话', `
        <p class="hint-line">围绕本单元主题进行跟读和角色扮演。</p>
        <div class="dialogue-box">
          ${(unit.dialogue || []).map(renderDialogueLine).join('')}
        </div>`)}
      ${unit.grammar?.length ? renderPanel('📑', '语法要点', renderGrammarPanel(unit)) : ''}
      ${renderContext.tipProviders ? renderPanel('💡', '学习加油站', renderLearningTips(unit)) : ''}
      ${renderPanel('🚀', '输出任务', renderOutputPanel(unit))}
      ${renderPanel('📊', '学习记录', renderRecordPanel(unit))}
      ${renderPanel('🧠', '小测验', renderQuiz(unit))}
    </section>`;
}

function renderAllUnits(data, navBarEl, containerEl, tipProviders) {
  renderContext.navBarEl = navBarEl;
  renderContext.containerEl = containerEl;
  renderContext.tipProviders = tipProviders || null;
  appState.unitsData = data || [];
  appState.quiz = {};
  window.unitsData = appState.unitsData;

  if (navBarEl) {
    navBarEl.innerHTML = appState.unitsData.map((unit, index) => `
      <button class="nav-btn ${index === 0 ? 'active' : ''}" type="button" data-index="${index}" style="--unit-color:${htmlEscape(unit.color || '#ff6b6b')}">
        ${htmlEscape(unit.title)}
      </button>`).join('');
  }

  if (containerEl) {
    containerEl.innerHTML = appState.unitsData.map(renderUnit).join('');
  }

  appState.unitsData.forEach(unit => {
    showQuizQuestion(unit.id);
    updateRecordPanel(unit.id);
  });

  syncVoiceControls();
  loadVoices();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
  switchUnit(0);
}

document.addEventListener('click', event => {
  const nav = event.target.closest('.nav-btn[data-index]');
  if (nav) {
    switchUnit(Number(nav.dataset.index));
    return;
  }

  const panelHead = event.target.closest('.panel-head');
  if (panelHead) {
    setPanelOpen(panelHead, !panelHead.classList.contains('open'));
    return;
  }

  const quizOption = event.target.closest('.quiz-option');
  if (quizOption && !quizOption.classList.contains('disabled')) {
    checkAnswer(quizOption);
    return;
  }

  const next = event.target.closest('[data-next]');
  if (next) {
    const unitId = next.dataset.next;
    appState.quiz[unitId].current += 1;
    showQuizQuestion(unitId);
    return;
  }

  const restart = event.target.closest('[data-restart]');
  if (restart) {
    restartQuiz(restart.dataset.restart);
    return;
  }

  const speakCard = event.target.closest('[data-speak]');
  if (speakCard) {
    handleSpeakCard(speakCard);
  }
});

document.addEventListener('keydown', event => {
  if ((event.key !== 'Enter' && event.key !== ' ') || event.defaultPrevented) return;
  const target = event.target.closest('[role="button"]');
  if (!target) return;
  event.preventDefault();
  target.click();
});
