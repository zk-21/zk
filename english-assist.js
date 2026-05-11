(function () {
  const labels = {
    title: '原创辅助学习',
    note: '教材原文保留。本区为原创辅助学习内容，用来帮助孩子预习、跟读、复习和输出。',
    objectives: '学习目标',
    wordLevels: '词汇分层',
    substitution: '句型替换练习',
    roleplay: '角色扮演',
    listening: '听力练习',
    phonics: '自然拼读',
    classroom: '课堂用语',
    output: '口语输出任务',
    path: '单元复习路径',
    mistakes: '错题复习',
    must: '必会词',
    read: '认读词',
    extra: '拓展词',
    speak: '点读',
    clear: '清空错题',
    noMistakes: '还没有错题。小测答错后会自动收集到这里。',
  };

  const htmlEscape = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const clean = value => String(value || '').replace(/\s+/g, ' ').trim();

  function getUnits() {
    if (Array.isArray(window.COURSE_UNITS)) return window.COURSE_UNITS;
    if (Array.isArray(window.unitsData)) return window.unitsData;
    return [];
  }

  function unitKey(unit, index) {
    return unit.id || `unit-${index + 1}`;
  }

  function getWords(unit) {
    return (unit.words || []).filter(item => item && item.en);
  }

  function getSentences(unit) {
    return (unit.sentences || []).filter(item => item && item.en);
  }

  function getDialogues(unit) {
    return (unit.dialogue || unit.story || []).filter(item => item && item.text);
  }

  function speak(text) {
    if (!text) return;
    if (typeof window.speak === 'function') {
      window.speak(text);
      return;
    }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = /[\u4e00-\u9fff]/.test(text) ? 'zh-CN' : 'en-US';
    utter.rate = utter.lang === 'zh-CN' ? 0.9 : 0.76;
    window.speechSynthesis.speak(utter);
  }

  function inferTask(unit) {
    const text = `${unit.title || ''} ${unit.subtitle || ''}`.toLowerCase();
    if (/family|mother|father|grandpa|friend|name|hello/.test(text)) return '能介绍自己、朋友或家人。';
    if (/subject|school|lesson|day|time|week/.test(text)) return '能谈论学校生活、课程或时间。';
    if (/can|sport|basketball|football|table tennis/.test(text)) return '能询问和表达会不会做某事。';
    if (/weather|season|wear|clothes/.test(text)) return '能描述天气、季节或穿着。';
    if (/animal|farm|zoo/.test(text)) return '能介绍动物名称和简单特征。';
    if (/colour|toy|fruit|food/.test(text)) return '能描述颜色、物品、水果或食物。';
    return '能围绕本单元主题进行简单交流。';
  }

  function buildObjectives(unit) {
    const words = getWords(unit);
    const sentences = getSentences(unit);
    return [
      `会听、会读 ${Math.min(words.length, 8)} 个左右核心词。`,
      sentences[0] ? `会说核心句型：${sentences[0].en}` : '会说本单元核心句型。',
      inferTask(unit),
    ];
  }

  function splitWords(unit) {
    const words = getWords(unit);
    return {
      must: words.slice(0, 6),
      read: words.slice(6, 10),
      extra: words.slice(10, 14),
    };
  }

  function buildSubstitutions(unit) {
    const sentence = getSentences(unit)[0];
    const words = getWords(unit).filter(word => /^[A-Za-z][A-Za-z -]*$/.test(word.en)).slice(0, 3);
    if (!sentence || !words.length) return [];

    const base = sentence.en.includes('...')
      ? sentence.en
      : sentence.en.replace(/\b([A-Za-z]+)\b(?=[.?!]?)/, '...');

    return words.map(word => ({
      en: base.includes('...') ? base.replace('...', word.en) : `${sentence.en} ${word.en}`,
      cn: `替换词：${word.cn || word.en}`,
    }));
  }

  function buildListening(unit) {
    const words = getWords(unit);
    const sentences = getSentences(unit);
    const items = [];
    if (words[0]) items.push({ title: '听音选词', text: words[0].en, tip: `听到的是哪个词？${words.slice(0, 4).map(word => word.en).join(' / ')}` });
    if (sentences[0]) items.push({ title: '听句跟读', text: sentences[0].en, tip: '听句子，跟读一遍，再说出中文意思。' });
    if (sentences[1]) items.push({ title: '听问选答', text: sentences[1].en, tip: '听句子，判断它是问句还是答句。' });
    return items;
  }

  function buildRoleplay(unit) {
    const lines = getDialogues(unit);
    if (lines.length) {
      return lines.slice(0, 4).map((line, index) => ({
        role: line.speaker || (index % 2 ? 'B' : 'A'),
        en: line.text,
        cn: line.cn || '',
      }));
    }
    return getSentences(unit).slice(0, 2).map((line, index) => ({
      role: index % 2 ? 'B' : 'A',
      en: line.en,
      cn: line.cn || '',
    }));
  }

  function buildPhonics(unit) {
    const word = getWords(unit).find(item => /^[A-Za-z]/.test(item.en));
    if (!word) return ['先听单词，再模仿开头音和结尾音。'];
    const letters = word.en.toLowerCase().replace(/[^a-z]/g, '');
    if (!letters) return ['先听单词，再模仿开头音和结尾音。'];
    const head = letters.slice(0, Math.min(2, letters.length));
    const tail = letters.length > 2 ? letters.slice(-2) : letters.slice(-1);
    return [
      `听 ${word.en}，找一找开头 ${head} 的发音。`,
      `再听一遍，注意结尾 ${tail} 是否轻读。`,
      '跟读时先慢后快，声音要清楚。',
    ];
  }

  function buildOutputTask(unit) {
    const task = inferTask(unit);
    const sentence = getSentences(unit)[0]?.en || 'I can say something about this unit.';
    return [
      `${task} 试着连续说 2-3 句话。`,
      `必须用到一句：${sentence}`,
      '可以替换自己的姓名、物品、课程、颜色或动作。',
    ];
  }

  function buildStudyPath() {
    return ['听音导入', '单词认读', '句型替换', '对话跟读', '小测验', '错题再练'];
  }

  function speakButton(text) {
    return `<button class="assist-speak" type="button" data-assist-speak="${htmlEscape(text)}">${labels.speak}</button>`;
  }

  function renderWordLevel(title, words) {
    const content = words.length ? words.map(word => `
      <button class="assist-chip" type="button" data-assist-speak="${htmlEscape(word.en)}">
        ${htmlEscape(word.en)}<small>${htmlEscape(word.cn || '')}</small>
      </button>`).join('') : '<span class="assist-muted">本单元先复习课内核心词。</span>';

    return `
      <div class="assist-level">
        <div class="assist-level-title">${title}</div>
        <div class="assist-chip-list">${content}</div>
      </div>`;
  }

  function renderAssist(unit, index) {
    const key = unitKey(unit, index);
    const words = splitWords(unit);
    const substitutions = buildSubstitutions(unit);
    const roleplay = buildRoleplay(unit);
    const listening = buildListening(unit);

    return `
      <section class="assist-box" data-assist-unit="${htmlEscape(key)}">
        <div class="assist-head">
          <div>
            <h3>${labels.title}</h3>
            <p>${labels.note}</p>
          </div>
          <span class="assist-badge">Original</span>
        </div>
        <div class="assist-grid">
          <div class="assist-card">
            <h4>${labels.objectives}</h4>
            <ol>${buildObjectives(unit).map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.wordLevels}</h4>
            ${renderWordLevel(labels.must, words.must)}
            ${renderWordLevel(labels.read, words.read)}
            ${renderWordLevel(labels.extra, words.extra)}
          </div>
          <div class="assist-card">
            <h4>${labels.substitution}</h4>
            <div class="assist-lines">
              ${substitutions.map(item => `
                <div class="assist-line">
                  <span>${htmlEscape(item.en)}</span>
                  ${speakButton(item.en)}
                  <small>${htmlEscape(item.cn)}</small>
                </div>`).join('') || '<p class="assist-muted">用课文核心句型替换姓名、物品或动作再说一遍。</p>'}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.roleplay}</h4>
            <div class="assist-roleplay">
              ${roleplay.map(item => `
                <div class="assist-role-line">
                  <b>${htmlEscape(item.role)}</b>
                  <span>${htmlEscape(item.en)}</span>
                  ${speakButton(item.en)}
                  ${item.cn ? `<small>${htmlEscape(item.cn)}</small>` : ''}
                </div>`).join('')}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.listening}</h4>
            <div class="assist-listening">
              ${listening.map(item => `
                <button type="button" data-assist-speak="${htmlEscape(item.text)}">
                  <b>${htmlEscape(item.title)}</b>
                  <span>${htmlEscape(item.tip)}</span>
                </button>`).join('')}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.phonics}</h4>
            <ul class="assist-list">${buildPhonics(unit).map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ul>
          </div>
          <div class="assist-card">
            <h4>${labels.classroom}</h4>
            <div class="assist-lines">
              ${['Listen and repeat.', 'Try again.', 'Good job.'].map(item => `
                <div class="assist-line">
                  <span>${item}</span>
                  ${speakButton(item)}
                </div>`).join('')}
            </div>
          </div>
          <div class="assist-card">
            <h4>${labels.output}</h4>
            <ol>${buildOutputTask(unit).map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.path}</h4>
            <div class="assist-path">${buildStudyPath().map(item => `<span>${htmlEscape(item)}</span>`).join('')}</div>
          </div>
          <div class="assist-card assist-mistakes">
            <h4>${labels.mistakes}</h4>
            <div class="assist-mistake-list" data-assist-mistakes="${htmlEscape(key)}">${labels.noMistakes}</div>
            <button class="assist-clear" type="button" data-assist-clear="${htmlEscape(key)}">${labels.clear}</button>
          </div>
        </div>
      </section>`;
  }

  function findUnitElement(unit, index) {
    const key = unitKey(unit, index);
    if (window.CSS && CSS.escape) {
      const byData = document.querySelector(`.unit[data-unit="${CSS.escape(key)}"]`);
      if (byData) return byData;
    }
    return document.getElementById(key)
      || document.querySelectorAll('.unit-section')[index]
      || document.querySelectorAll('.unit')[index];
  }

  function storageKey(unitKeyValue) {
    const page = location.pathname.split('/').pop() || 'english';
    return `english-assist-mistakes:${page}:${unitKeyValue}`;
  }

  function readMistakes(unitKeyValue) {
    try {
      return JSON.parse(localStorage.getItem(storageKey(unitKeyValue)) || '[]');
    } catch {
      return [];
    }
  }

  function writeMistakes(unitKeyValue, items) {
    localStorage.setItem(storageKey(unitKeyValue), JSON.stringify(items.slice(-20)));
  }

  function refreshMistakes(onlyKey) {
    document.querySelectorAll('[data-assist-mistakes]').forEach(box => {
      const key = box.dataset.assistMistakes;
      if (onlyKey && key !== onlyKey) return;
      const items = readMistakes(key);
      if (!items.length) {
        box.textContent = labels.noMistakes;
        return;
      }
      box.innerHTML = items.slice(-5).reverse().map(item => `
        <div class="assist-mistake">
          <div>${htmlEscape(item.question)}</div>
          <small>你的答案：${htmlEscape(item.selected)}；正确答案：${htmlEscape(item.correct)}</small>
        </div>`).join('');
    });
  }

  function recordMistake(unitKeyValue, question, selected, correct) {
    if (!unitKeyValue || !question || !correct || selected === correct) return;
    const items = readMistakes(unitKeyValue);
    items.push({ question, selected, correct, time: Date.now() });
    writeMistakes(unitKeyValue, items);
    refreshMistakes(unitKeyValue);
  }

  function optionUnitKey(option) {
    if (option.dataset.unit) return option.dataset.unit;
    const section = option.closest('.unit, .unit-section');
    return section ? (section.dataset.unit || section.id || '') : '';
  }

  function optionQuestion(option) {
    const area = option.closest('[id^="question-"], [id^="qarea-"], .quiz-container, .quiz');
    return clean(area?.querySelector('h3, .quiz-question, .question-text')?.textContent || '');
  }

  function optionCorrect(option) {
    if (option.dataset.answer) return clean(option.dataset.answer);
    const area = option.closest('.quiz-options, [id^="qarea-"], .quiz-container');
    return clean(area?.querySelector('.quiz-option.correct')?.textContent || '');
  }

  function attachEvents() {
    document.addEventListener('click', event => {
      const speakTarget = event.target.closest('[data-assist-speak]');
      if (speakTarget) {
        speak(speakTarget.dataset.assistSpeak || speakTarget.textContent);
        return;
      }

      const clearTarget = event.target.closest('[data-assist-clear]');
      if (clearTarget) {
        const key = clearTarget.dataset.assistClear;
        writeMistakes(key, []);
        refreshMistakes(key);
        return;
      }

      const option = event.target.closest('.quiz-option');
      if (option) {
        setTimeout(() => {
          const selected = clean(option.textContent);
          const correct = optionCorrect(option);
          recordMistake(optionUnitKey(option), optionQuestion(option), selected, correct);
        }, 0);
      }
    });
  }

  function insertAssistBlocks() {
    const units = getUnits();
    if (!units.length || document.querySelector('.assist-box')) return;
    units.forEach((unit, index) => {
      const target = findUnitElement(unit, index);
      if (!target) return;
      const title = target.querySelector('.unit-title');
      if (title) {
        title.insertAdjacentHTML('afterend', renderAssist(unit, index));
      } else {
        target.insertAdjacentHTML('afterbegin', renderAssist(unit, index));
      }
    });
    refreshMistakes();
  }

  function init() {
    insertAssistBlocks();
    attachEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 0);
  }
})();
