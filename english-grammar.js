const nav = document.getElementById('grammarNav');
const app = document.getElementById('grammarApp');
const guide = window.COURSE_GRAMMAR_GUIDE || [];
let practiceMode = false;
let currentPracticeIndex = 0;
let practiceScore = 0;
let practiceTotal = 0;

function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
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
  const rules = (group.rules || []).map((rule, ruleIndex) => {
    const helper = getKidHelper(rule);
    const tip = rule.tip || helper.tip;
    const parts = rule.parts || helper.parts;
    const practice = rule.practice || helper.practice;
    const cardId = `card-${index}-${ruleIndex}`;

    return `
      <article class="grammar-guide-card" id="${cardId}">
        <div class="grammar-guide-title">
          <span class="rule-number">${index + 1}.${ruleIndex + 1}</span>
          ${htmlEscape(rule.title)}
        </div>
        ${tip ? `<div class="memory-tip">
          <span class="tip-icon">🎵</span>
          <span>${htmlEscape(tip)}</span>
        </div>` : ''}
        <div class="grammar-guide-pattern">
          <span class="pattern-label">结构：</span>
          ${htmlEscape(rule.pattern || '')}
        </div>
        <div class="grammar-guide-cn">
          <span class="cn-label">说明：</span>
          ${htmlEscape(rule.cn || '')}
        </div>
        <div class="grammar-guide-example">
          <span class="example-label">例句：</span>
          ${htmlEscape(rule.example || '')}
        </div>
        ${parts ? `<div class="sentence-parts">
          <span class="parts-label">句子成分分析：</span>
          ${parts.map(part => `
            <span class="part-chip" title="${htmlEscape(part.role)}">
              <b>${htmlEscape(part.text)}</b>
              <small>${htmlEscape(part.role)}</small>
            </span>
          `).join('')}
        </div>` : ''}
        ${practice ? `<div class="mini-practice" id="practice-${cardId}">
          <div class="practice-q">
            <span class="practice-icon">❓</span>
            ${htmlEscape(practice.q)}
          </div>
          <button class="practice-reveal-btn" onclick="revealAnswer('${cardId}')">显示答案</button>
          <div class="practice-a hidden" id="answer-${cardId}">
            <span class="answer-icon">✅</span>
            答案：${htmlEscape(practice.a)}
          </div>
        </div>` : ''}
        ${rule.note ? `<div class="grammar-guide-note">
          <span class="note-icon">💡</span>
          ${htmlEscape(rule.note)}
        </div>` : ''}
      </article>
    `;
  }).join('');

  return `
    <section class="panel grammar-section" id="grammar-${index}">
      <button class="panel-head ${index === 0 ? 'open' : ''}" type="button">
        <span>${group.icon || '📝'}</span>
        <span>${htmlEscape(group.title)}</span>
        <span class="rule-count">${group.rules?.length || 0}条规则</span>
        <span class="arrow">▼</span>
      </button>
      <div class="panel-body ${index === 0 ? 'open' : ''}">
        <p class="hint-line">${htmlEscape(group.desc || '')}</p>
        <div class="grammar-guide-list">${rules}</div>
      </div>
    </section>
  `;
}

function revealAnswer(cardId) {
  const answerEl = document.getElementById(`answer-${cardId}`);
  const btn = document.querySelector(`#practice-${cardId} .practice-reveal-btn`);
  if (answerEl) {
    answerEl.classList.remove('hidden');
  }
  if (btn) {
    btn.style.display = 'none';
  }
}

function startRandomPractice() {
  const allPractice = [];
  guide.forEach((group, gIndex) => {
    (group.rules || []).forEach((rule, rIndex) => {
      if (rule.practice) {
        allPractice.push({
          question: rule.practice.q,
          answer: rule.practice.a,
          title: rule.title,
          groupTitle: group.title,
          id: `${gIndex}-${rIndex}`
        });
      }
    });
  });

  if (allPractice.length === 0) {
    alert('暂无练习题目');
    return;
  }

  const shuffled = shuffleArray(allPractice);
  practiceMode = true;
  currentPracticeIndex = 0;
  practiceScore = 0;
  practiceTotal = shuffled.length;

  showPracticeQuestion(shuffled);
}

function showPracticeQuestion(practiceList) {
  if (currentPracticeIndex >= practiceList.length) {
    showPracticeResult();
    return;
  }

  const current = practiceList[currentPracticeIndex];
  const userAnswer = prompt(`第 ${currentPracticeIndex + 1}/${practiceTotal} 题\n\n${current.question}\n\n(所属: ${current.groupTitle} - ${current.title})`);
  
  if (userAnswer === null) {
    practiceMode = false;
    return;
  }

  const isCorrect = userAnswer.trim().toLowerCase() === current.answer.trim().toLowerCase();
  
  if (isCorrect) {
    practiceScore++;
    alert(`✅ 回答正确！\n答案：${current.answer}`);
  } else {
    alert(`❌ 回答错误！\n正确答案：${current.answer}`);
  }

  currentPracticeIndex++;
  showPracticeQuestion(practiceList);
}

function showPracticeResult() {
  const percentage = Math.round((practiceScore / practiceTotal) * 100);
  let emoji = '💪';
  let message = '继续加油！';
  
  if (percentage >= 90) {
    emoji = '🏆';
    message = '太棒了！你是语法小专家！';
  } else if (percentage >= 70) {
    emoji = '👍';
    message = '做得不错！继续努力！';
  } else if (percentage >= 50) {
    emoji = '😊';
    message = '还可以，多练习会更好！';
  }

  alert(`${emoji} 练习完成！\n\n得分：${practiceScore}/${practiceTotal} (${percentage}%)\n${message}`);
  practiceMode = false;
}

function generateStudyPlan() {
  const plan = [
    { day: '第1天', content: '学习词类：名词、代词、动词、形容词、副词', tips: '重点记住名词变复数规则' },
    { day: '第2天', content: '学习冠词、介词、连词、感叹词', tips: '记住 a/an 的用法区别' },
    { day: '第3天', content: '学习一般现在时', tips: '重点练习第三人称单数变化' },
    { day: '第4天', content: '学习现在进行时', tips: '记住 be + doing 的结构' },
    { day: '第5天', content: '学习一般过去时和一般将来时', tips: '对比三种时态的区别' },
    { day: '第6天', content: '学习句子成分：主语、谓语、宾语、表语', tips: '分析简单句子的结构' },
    { day: '第7天', content: '复习所有内容，做综合练习', tips: '使用随机练习功能' }
  ];

  let planText = '📅 一周学习计划\n\n';
  plan.forEach(item => {
    planText += `${item.day}：${item.content}\n`;
    planText += `   💡 ${item.tips}\n\n`;
  });

  alert(planText);
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
