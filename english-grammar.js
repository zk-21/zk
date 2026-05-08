const nav = document.getElementById('grammarNav');
const app = document.getElementById('grammarApp');
const guide = window.COURSE_GRAMMAR_GUIDE || [];

function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getKidHelper(rule) {
  const title = rule.title || '';
  const helpers = [
    [/名词 noun/, {
      tip: '人和东西都有名，book、Mike 都是名。',
      parts: [{ text: 'This', role: '主语' }, { text: 'is', role: 'be动词' }, { text: 'my book', role: '名词短语' }],
      practice: { q: 'book、run、happy 里面哪个是名词？', a: 'book' }
    }],
    [/代词 pronoun/, {
      tip: '名字太长我来替，I、you、he、she、it。',
      parts: [{ text: 'She', role: '代词' }, { text: 'is', role: 'be动词' }, { text: 'my friend', role: '表语' }],
      practice: { q: 'She is my mother. 里面哪个词代替“妈妈”？', a: 'She' }
    }],
    [/动词 verb/, {
      tip: '动作状态都靠它，run、like、is 都是它。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '动词' }, { text: 'apples', role: '宾语' }],
      practice: { q: 'I like apples. 里面哪个是动词？', a: 'like' }
    }],
    [/形容词 adjective/, {
      tip: '形容词，像画笔，给人和物添样子。',
      parts: [{ text: 'a', role: '冠词' }, { text: 'cute', role: '形容词' }, { text: 'rabbit', role: '名词' }],
      practice: { q: 'a cute rabbit 里面哪个词说明兔子可爱？', a: 'cute' }
    }],
    [/副词 adverb/, {
      tip: '副词常常修动作，告诉怎么、何时、在哪里。',
      parts: [{ text: 'Run', role: '动词' }, { text: 'fast', role: '副词' }],
      practice: { q: 'Run fast. 里面哪个词说明“跑得怎样”？', a: 'fast' }
    }],
    [/一般现在时$/, {
      tip: '经常发生用现在，he、she、it 后动词变。',
      parts: [{ text: 'She', role: '主语' }, { text: 'likes', role: '三单动词' }, { text: 'Music', role: '宾语' }],
      practice: { q: 'He ___ carrots. 填 like 还是 likes？', a: 'likes' }
    }],
    [/现在进行时/, {
      tip: '正在做，用进行，be 加动词 ing。',
      parts: [{ text: 'I', role: '主语' }, { text: 'am', role: 'be动词' }, { text: 'drawing', role: '动词-ing' }],
      practice: { q: 'I am read 还是 I am reading？', a: 'I am reading' }
    }],
    [/主动语态/, {
      tip: '谁来做，谁在前，主动语态最常见。',
      parts: [{ text: 'I', role: '动作发出者' }, { text: 'clean', role: '动作' }, { text: 'the classroom', role: '动作对象' }],
      practice: { q: 'I clean the classroom. 谁在打扫？', a: 'I' }
    }],
    [/被动语态$/, {
      tip: '谁被做，谁在前，be done 放后面。',
      parts: [{ text: 'The room', role: '动作承受者' }, { text: 'is cleaned', role: '被动结构' }],
      practice: { q: 'The room is cleaned. 房间是做动作还是承受动作？', a: '承受动作' }
    }],
    [/祈使语气/, {
      tip: '动词开头提要求，Please 礼貌，Don’t 禁止。',
      parts: [{ text: 'Please', role: '礼貌词' }, { text: 'sit down', role: '要求' }],
      practice: { q: 'Don’t run. 是让你跑还是不要跑？', a: '不要跑' }
    }],
    [/主语 subject/, {
      tip: '句子说谁谁主语，通常站在最前面。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'English', role: '宾语' }],
      practice: { q: 'I like English. 主语是谁？', a: 'I' }
    }],
    [/谓语 predicate/, {
      tip: '主语做啥看谓语，动作状态它说明。',
      parts: [{ text: 'She', role: '主语' }, { text: 'is kind', role: '谓语部分' }],
      practice: { q: 'I play football. 谓语动作是哪个词？', a: 'play' }
    }],
    [/宾语 object/, {
      tip: '动作落到谁身上，谁就是宾语。',
      parts: [{ text: 'I', role: '主语' }, { text: 'have', role: '谓语' }, { text: 'a robot', role: '宾语' }],
      practice: { q: 'I have a robot. 我有什么？', a: 'a robot' }
    }],
    [/表语 predicative/, {
      tip: 'be 后说明主语样，身份状态叫表语。',
      parts: [{ text: 'It', role: '主语' }, { text: 'is', role: 'be动词' }, { text: 'rainy', role: '表语' }],
      practice: { q: 'It is rainy. rainy 说明谁？', a: 'It' }
    }],
    [/简单句/, {
      tip: '一个主干一个意，简单句子最清楚。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'English', role: '宾语' }],
      practice: { q: 'I like English. 有几个主要意思？', a: '一个' }
    }],
    [/主谓宾结构/, {
      tip: '谁做啥做什么，主谓宾三步走。',
      parts: [{ text: 'I', role: '主语' }, { text: 'like', role: '谓语' }, { text: 'apples', role: '宾语' }],
      practice: { q: 'We have Music. 宾语是什么？', a: 'Music' }
    }],
    [/It 引导结构/, {
      tip: '天气时间常用 It，小小 It 站前面。',
      parts: [{ text: 'It', role: '形式主语' }, { text: 'is', role: 'be动词' }, { text: 'sunny', role: '表语' }],
      practice: { q: 'It is sunny. 这句话在说什么？', a: '天气' }
    }],
    [/并列句/, {
      tip: '两个句子手拉手，and、but、or 来牵头。',
      parts: [{ text: 'I like English', role: '句子1' }, { text: 'and', role: '连词' }, { text: 'he likes Maths', role: '句子2' }],
      practice: { q: 'I like apples and you like bananas. 连接词是什么？', a: 'and' }
    }],
    [/复合句/, {
      tip: '主句带着小从句，because 常来说原因。',
      parts: [{ text: 'I choose this one', role: '主句' }, { text: 'because', role: '连接词' }, { text: 'it is right for me', role: '原因从句' }],
      practice: { q: 'because 后面通常说明什么？', a: '原因' }
    }]
  ];

  const match = helpers.find(([pattern]) => pattern.test(title));
  return match ? match[1] : {};
}

function renderPanel(group, index) {
  const rules = (group.rules || []).map(rule => {
    const helper = getKidHelper(rule);
    const tip = rule.tip || helper.tip;
    const parts = rule.parts || helper.parts;
    const practice = rule.practice || helper.practice;

    return `
      <article class="grammar-guide-card">
        <div class="grammar-guide-title">${htmlEscape(rule.title)}</div>
        ${tip ? `<div class="memory-tip">口诀：${htmlEscape(tip)}</div>` : ''}
        <div class="grammar-guide-pattern">${htmlEscape(rule.pattern || '')}</div>
        <div class="grammar-guide-cn">${htmlEscape(rule.cn || '')}</div>
        <div class="grammar-guide-example">${htmlEscape(rule.example || '')}</div>
        ${parts ? `<div class="sentence-parts">${parts.map(part => `
        <span class="part-chip">
          <b>${htmlEscape(part.text)}</b>
          <small>${htmlEscape(part.role)}</small>
        </span>
      `).join('')}</div>` : ''}
        ${practice ? `<div class="mini-practice">
        <div class="practice-q">小练习：${htmlEscape(practice.q)}</div>
        <div class="practice-a">答案：${htmlEscape(practice.a)}</div>
      </div>` : ''}
        ${rule.note ? `<div class="grammar-guide-note">${htmlEscape(rule.note)}</div>` : ''}
      </article>
    `;
  }).join('');

  return `
    <section class="panel grammar-section" id="grammar-${index}">
      <button class="panel-head ${index === 0 ? 'open' : ''}" type="button">
        <span>${group.icon || '📝'}</span>
        <span>${htmlEscape(group.title)}</span>
        <span class="arrow">▼</span>
      </button>
      <div class="panel-body ${index === 0 ? 'open' : ''}">
        <p class="hint-line">${htmlEscape(group.desc || '')}</p>
        <div class="grammar-guide-list">${rules}</div>
      </div>
    </section>
  `;
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

nav.innerHTML = guide.map((group, index) => `
  <a class="nav-btn ${index === 0 ? 'active' : ''}" href="#grammar-${index}" style="--unit-color:#6f42c1">${htmlEscape(group.title)}</a>
`).join('');

app.innerHTML = `
  <section class="unit active" style="--unit-color:#6f42c1">
    <div class="unit-title">
      <h2>英语语法目录</h2>
      <p>${guide.length} 大类 · ${guide.reduce((sum, group) => sum + (group.rules || []).length, 0)} 条规则</p>
    </div>
    ${guide.map(renderPanel).join('')}
  </section>
`;

document.addEventListener('click', event => {
  const head = event.target.closest('.panel-head');
  if (head) {
    setPanelOpen(head, !head.classList.contains('open'));
    return;
  }

  const navLink = event.target.closest('#grammarNav a');
  if (!navLink) return;
  document.querySelectorAll('#grammarNav a').forEach(link => link.classList.toggle('active', link === navLink));
});
