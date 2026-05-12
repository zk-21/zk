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
    lightGrammar: '句型小规律',
    extraQuiz: '拓展小测',
    review: '阶段复习',
    source: '资料说明',
    gradeFocus: '本年级学习重点',
    memory: '记忆小练',
    challenge: '进阶任务',
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

  function inferGrade() {
    const text = `${document.title || ''} ${location.pathname || ''} ${window.COURSE_TITLE || ''}`;
    if (/一年级|english-1/i.test(text)) return 1;
    if (/二年级|english-2/i.test(text)) return 2;
    if (/三年级|grade3|english-learning/i.test(text)) return 3;
    if (/四年级|grade4/i.test(text)) return 4;
    if (/五年级|english-5/i.test(text)) return 5;
    return 3;
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
    const grade = inferGrade();
    return [
      `会听、会读 ${Math.min(words.length, 8)} 个左右核心词。`,
      sentences[0] ? `会说核心句型：${sentences[0].en}` : '会说本单元核心句型。',
      grade <= 2 ? '能听懂、跟读并看图说出关键词。' : inferTask(unit),
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

  function buildLightGrammar(unit) {
    const sentences = getSentences(unit).map(item => item.en);
    const joined = sentences.join(' ').toLowerCase();
    const rules = [];
    if (/this is/.test(joined)) rules.push({ pattern: 'This is ...', tip: '介绍近处的人或物，意思是“这是……”。', example: sentences.find(s => /this is/i.test(s)) || 'This is my friend.' });
    if (/these are/.test(joined)) rules.push({ pattern: 'These are ...', tip: '介绍多个近处的人或物，意思是“这些是……”。', example: sentences.find(s => /these are/i.test(s)) || 'These are apples.' });
    if (/what('| i)?s|what is/.test(joined)) rules.push({ pattern: 'What is ...?', tip: '询问“是什么”，回答时用 It is ... 或 This is ...。', example: sentences.find(s => /what('| i)?s|what is/i.test(s)) || 'What is this?' });
    if (/\bare\b|\bis\b/.test(joined) && /\?/.test(joined)) rules.push({ pattern: 'Are/Is ...?', tip: '一般疑问句，回答常用 Yes 或 No。', example: sentences.find(s => /\?/.test(s)) || 'Are you Su Hai?' });
    if (/\bi like\b/.test(joined)) rules.push({ pattern: 'I like ...', tip: '表达喜欢，后面可以接食物、颜色、运动或动物。', example: sentences.find(s => /i like/i.test(s)) || 'I like apples.' });
    if (/\bcan\b/.test(joined)) rules.push({ pattern: 'Can you ...?', tip: '询问会不会做某事，回答 Yes, I can. / No, I cannot.', example: sentences.find(s => /can/i.test(s)) || 'Can you swim?' });
    if (/let('|’)?s/.test(joined)) rules.push({ pattern: "Let's ...", tip: '邀请别人一起做某事，后面接动词原形。', example: sentences.find(s => /let('|’)?s/i.test(s)) || "Let's play." });
    if (/\bdon'?t\b/.test(joined)) rules.push({ pattern: "Don't ...", tip: '表示“不要……”，常用于规则和提醒。', example: sentences.find(s => /don'?t/i.test(s)) || "Don't run." });
    if (/\bwhere\b/.test(joined)) rules.push({ pattern: 'Where is/are ...?', tip: '询问位置，回答可以用 in、on、under、behind。', example: sentences.find(s => /where/i.test(s)) || 'Where is my bag?' });
    if (/what colour|color/.test(joined)) rules.push({ pattern: 'What colour is ...?', tip: '询问颜色，回答 It is red/blue/...。', example: sentences.find(s => /what colour|color/i.test(s)) || 'What colour is it?' });
    if (rules.length) return rules.slice(0, 3);
    return [{ pattern: '主语 + 动词/表述', tip: '先找到“谁”，再说“做什么/是什么”，句子就清楚了。', example: sentences[0] || 'I can say it.' }];
  }

  function buildExtraQuiz(unit) {
    const words = getWords(unit);
    const sentences = getSentences(unit);
    const items = [];
    if (words[0]) items.push({ q: `听一听，选出单词：${words.slice(0, 4).map(word => word.en).join(' / ')}`, speak: words[0].en, a: words[0].en });
    if (words[1]) items.push({ q: `${words[1].cn || words[1].en} 的英文是什么？`, speak: words[1].en, a: words[1].en });
    if (sentences[0]) items.push({ q: `这句话可以怎么替换关键词？${sentences[0].en}`, speak: sentences[0].en, a: '换姓名、物品、课程、颜色或动作，再完整说一遍。' });
    if (sentences[1]) items.push({ q: `听句子，判断它是问句还是答句。`, speak: sentences[1].en, a: /\?/.test(sentences[1].en) ? '问句' : '答句/陈述句' });
    return items;
  }

  function buildReview(unit, index) {
    if (index % 2 === 0) return [];
    const units = getUnits();
    const pair = [units[index - 1], unit].filter(Boolean);
    const words = pair.flatMap(item => getWords(item).slice(0, 4));
    const sentences = pair.flatMap(item => getSentences(item).slice(0, 2));
    return [
      `复习范围：${pair.map(item => `${item.title} ${item.subtitle || ''}`.trim()).join(' + ')}`,
      `混合词汇：${words.map(word => word.en).join(' / ')}`,
      sentences[0] ? `混合句型：${sentences.map(item => item.en).join(' | ')}` : '混合句型：用两个单元的重点句各说一句。',
      '输出任务：任选两个单元主题，连续说 4 句话。',
    ];
  }

  function buildGradeFocus(unit) {
    const grade = inferGrade();
    const words = getWords(unit);
    const sentence = getSentences(unit)[0]?.en || 'I can say it.';
    if (grade === 1) {
      return [
        '先听后说，不要求一次记住拼写。',
        `用手指点读 3 个词：${words.slice(0, 3).map(word => word.en).join(' / ') || '本单元核心词'}`,
        '能用一个词或一句短句回答就算完成。',
      ];
    }
    if (grade === 2) {
      return [
        '从“单词”过渡到“短句”，每次说完整一句。',
        `用句型说 2 个新句子：${sentence}`,
        '能听懂问句，并用 Yes/No 或一个短语回答。',
      ];
    }
    if (grade === 3) {
      return [
        '重点练“听懂问题”和“完整回答”。',
        '每个核心句型至少替换 2 次关键词。',
        '开始关注大小写、句号和问号。',
      ];
    }
    if (grade === 4) {
      return [
        '重点练“按主题连续表达”，不要只背孤立单词。',
        '每个单元整理 3 个高频搭配或短语。',
        '能听问句选答句，并能自己改编一段小对话。',
      ];
    }
    return [
      '重点从“会说句子”升级到“会组织一小段话”。',
      '每个单元积累 2 个连接词或时间/地点表达。',
      '能读懂短段落，并用 4-5 句话完成表达任务。',
    ];
  }

  function buildMemoryDrill(unit) {
    const words = getWords(unit).slice(0, 5);
    const sentence = getSentences(unit)[0]?.en || '';
    return [
      words.length ? `遮住中文，看英文说意思：${words.map(word => word.en).join(' / ')}` : '遮住中文，看英文说意思。',
      words.length ? `遮住英文，看中文说英文：${words.map(word => word.cn || word.en).join(' / ')}` : '遮住英文，看中文说英文。',
      sentence ? `把句子分成 2-3 段读：${sentence}` : '把长句分成 2-3 段读，再连起来说。',
    ];
  }

  function buildChallenge(unit) {
    const grade = inferGrade();
    const words = getWords(unit).slice(0, 4);
    const sentence = getSentences(unit)[0]?.en || 'I can say it.';
    if (grade <= 2) {
      return [
        '听老师或家长读一个词，指出对应卡片。',
        `任选一个词，用动作或表情演出来：${words.map(word => word.en).join(' / ') || '本单元词汇'}`,
      ];
    }
    if (grade <= 4) {
      return [
        `用这个句型改编 3 句话：${sentence}`,
        '和家长/同学完成 A-B-A-B 四轮对话。',
        '听一遍对话后，说出你听到的 3 个关键词。',
      ];
    }
    return [
      `用至少 4 个词写 4 句话：${words.map(word => word.en).join(' / ') || '本单元核心词'}`,
      '读完对话后，用中文说出大意，再用英文复述 2 句。',
      '把本单元主题和自己的生活联系起来，说一段 30 秒口语。',
    ];
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
    const lightGrammar = buildLightGrammar(unit);
    const extraQuiz = buildExtraQuiz(unit);
    const review = buildReview(unit, index);
    const gradeFocus = buildGradeFocus(unit);
    const memory = buildMemoryDrill(unit);
    const challenge = buildChallenge(unit);

    return `
      <section class="assist-box" data-assist-unit="${htmlEscape(key)}">
        <div class="assist-head">
          <div>
            <h3>${labels.title}</h3>
            <p>${labels.note}</p>
          </div>
          <span class="assist-badge">Original</span>
        </div>
        <div class="assist-source">${labels.source}：教材原文区域保持不变；本区为原创辅助练习，用于巩固词汇、句型、听说和复习。</div>
        <div class="assist-grid">
          <div class="assist-card assist-grade-focus">
            <h4>${labels.gradeFocus}</h4>
            <ol>${gradeFocus.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
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
            <h4>${labels.lightGrammar}</h4>
            <div class="assist-grammar">
              ${lightGrammar.map(item => `
                <div class="assist-grammar-rule">
                  <b>${htmlEscape(item.pattern)}</b>
                  <span>${htmlEscape(item.tip)}</span>
                  <button class="assist-speak" type="button" data-assist-speak="${htmlEscape(item.example)}">例句点读</button>
                  <small>${htmlEscape(item.example)}</small>
                </div>`).join('')}
            </div>
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
            <h4>${labels.memory}</h4>
            <ol>${memory.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card assist-challenge">
            <h4>${labels.challenge}</h4>
            <ol>${challenge.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
          </div>
          <div class="assist-card">
            <h4>${labels.path}</h4>
            <div class="assist-path">${buildStudyPath().map(item => `<span>${htmlEscape(item)}</span>`).join('')}</div>
          </div>
          <div class="assist-card">
            <h4>${labels.extraQuiz}</h4>
            <div class="assist-extra-quiz">
              ${extraQuiz.map(item => `
                <details>
                  <summary>${htmlEscape(item.q)} ${item.speak ? speakButton(item.speak) : ''}</summary>
                  <div>答案：${htmlEscape(item.a)}</div>
                </details>`).join('')}
            </div>
          </div>
          ${review.length ? `
            <div class="assist-card assist-review">
              <h4>${labels.review}</h4>
              <ol>${review.map(item => `<li>${htmlEscape(item)}</li>`).join('')}</ol>
            </div>` : ''}
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
