window.COURSE_TITLE = '三年级上册英语 · 译林版互动学习';
window.COURSE_SUBTITLE = '按2024版目录整理 · 原创练习内容 · 音频目录 audio/grade3a/en';
window.COURSE_AUDIO_BASE = 'audio/grade3a/en';

const u = (id, title, subtitle, color, words, sentences, dialogue, phrases, grammar, quiz) => ({
  id, title, subtitle, color, words, sentences, dialogue, phrases, grammar, quiz
});

window.COURSE_UNITS = [
  u('u1', 'Unit 1', 'Hello! 你好', '#2f80ed',
    [
      { en: 'hello', cn: '你好', emoji: '👋', ipa: '/həˈləʊ/' },
      { en: 'hi', cn: '嗨', emoji: '🙂', ipa: '/haɪ/' },
      { en: 'good morning', cn: '早上好', emoji: '🌅', ipa: '/ɡʊd ˈmɔːnɪŋ/' },
      { en: 'good afternoon', cn: '下午好', emoji: '🌤️', ipa: '/ɡʊd ˌɑːftəˈnuːn/' },
      { en: 'goodbye', cn: '再见', emoji: '👋', ipa: '/ˌɡʊdˈbaɪ/' },
      { en: 'class', cn: '同学们；班级', emoji: '🏫', ipa: '/klɑːs/' },
      { en: 'Miss', cn: '小姐；老师称呼', emoji: '👩‍🏫', ipa: '/mɪs/' },
      { en: 'Mr', cn: '先生；老师称呼', emoji: '👨‍🏫', ipa: '/ˈmɪstə(r)/' },
      { en: 'school', cn: '学校', emoji: '🏫', ipa: '/skuːl/' },
      { en: 'friend', cn: '朋友', emoji: '🤝', ipa: '/frend/' }
    ],
    [
      { en: 'Hello, I am Mike.', cn: '你好，我是迈克。' },
      { en: 'Hi, I am Su Hai.', cn: '嗨，我是苏海。' },
      { en: 'Good morning, class.', cn: '早上好，同学们。' },
      { en: 'Good afternoon, Miss Li.', cn: '下午好，李老师。' },
      { en: 'Goodbye, my friend.', cn: '再见，我的朋友。' }
    ],
    [
      { speaker: '👩 Miss Li', text: 'Good morning, class.', cn: '早上好，同学们。' },
      { speaker: '👧 Class', text: 'Good morning, Miss Li.', cn: '早上好，李老师。' },
      { speaker: '👦 Mike', text: 'Hello, I am Mike.', cn: '你好，我是迈克。' },
      { speaker: '👧 Su Hai', text: 'Hi, I am Su Hai.', cn: '嗨，我是苏海。' }
    ],
    [
      { en: 'first day at school', cn: '上学第一天', emoji: '🎒' },
      { en: 'my friend', cn: '我的朋友', emoji: '🤝' },
      { en: 'good morning', cn: '早上好', emoji: '🌅' },
      { en: 'goodbye class', cn: '同学们再见', emoji: '👋' }
    ],
    [
      { en: 'I am ...', cn: '介绍自己' },
      { en: 'Good morning.', cn: '早晨问候' },
      { en: 'Goodbye.', cn: '告别' }
    ],
    [
      { emoji: '👋', q: 'hello 是什么意思？', answer: '你好', options: ['再见', '你好', '谢谢', '学校'] },
      { q: '"I am Mike." 意思是？', answer: '我是迈克。', options: ['我是迈克。', '你好迈克。', '再见迈克。', '这是迈克。'] },
      { emoji: '🌅', q: 'good morning 是什么意思？', answer: '早上好', options: ['下午好', '晚上好', '早上好', '再见'] }
    ]),

  u('u2', 'Unit 2', 'What is your name? 你叫什么名字？', '#17a673',
    [
      { en: 'name', cn: '名字', emoji: '🏷️', ipa: '/neɪm/' },
      { en: 'what', cn: '什么', emoji: '❓', ipa: '/wɒt/' },
      { en: 'your', cn: '你的', emoji: '👉', ipa: '/jɔː(r)/' },
      { en: 'my', cn: '我的', emoji: '🙋', ipa: '/maɪ/' },
      { en: 'yes', cn: '是；对', emoji: '✅', ipa: '/jes/' },
      { en: 'no', cn: '不；不是', emoji: '❌', ipa: '/nəʊ/' },
      { en: 'please', cn: '请', emoji: '🙏', ipa: '/pliːz/' },
      { en: 'thank you', cn: '谢谢你', emoji: '🌟', ipa: '/ˈθæŋk juː/' },
      { en: 'new', cn: '新的', emoji: '✨', ipa: '/njuː/' },
      { en: 'classmate', cn: '同班同学', emoji: '🏫', ipa: '/ˈklɑːsmeɪt/' }
    ],
    [
      { en: 'What is your name?', cn: '你叫什么名字？' },
      { en: 'My name is Yang Ling.', cn: '我的名字是杨玲。' },
      { en: 'Are you Wang Bing?', cn: '你是王兵吗？' },
      { en: 'Yes, I am.', cn: '是的，我是。' },
      { en: 'No, I am not.', cn: '不，我不是。' }
    ],
    [
      { speaker: '👦 Liu Tao', text: 'What is your name?', cn: '你叫什么名字？' },
      { speaker: '👧 Yang Ling', text: 'My name is Yang Ling.', cn: '我的名字是杨玲。' },
      { speaker: '👦 Liu Tao', text: 'Are you a new classmate?', cn: '你是新同学吗？' },
      { speaker: '👧 Yang Ling', text: 'Yes, I am.', cn: '是的，我是。' }
    ],
    [
      { en: 'my name', cn: '我的名字', emoji: '🏷️' },
      { en: 'your name', cn: '你的名字', emoji: '👉' },
      { en: 'new classmate', cn: '新同学', emoji: '✨' },
      { en: 'thank you', cn: '谢谢你', emoji: '🌟' }
    ],
    [
      { en: 'What is your name?', cn: '询问姓名' },
      { en: 'My name is ...', cn: '回答姓名' },
      { en: 'Are you ...?', cn: '确认身份' }
    ],
    [
      { emoji: '🏷️', q: 'name 是什么意思？', answer: '名字', options: ['学校', '朋友', '名字', '老师'] },
      { q: '"What is your name?" 意思是？', answer: '你叫什么名字？', options: ['你好吗？', '你叫什么名字？', '你在哪里？', '你是老师吗？'] },
      { q: '"Yes, I am." 意思是？', answer: '是的，我是。', options: ['不，我不是。', '是的，我是。', '谢谢你。', '你好。'] }
    ]),

  u('u3', 'Unit 3', 'Are you Su Hai? 你是苏海吗？', '#f59f00',
    [
      { en: 'are', cn: '是', emoji: '🔤', ipa: '/ɑː(r)/' },
      { en: 'you', cn: '你；你们', emoji: '👉', ipa: '/juː/' },
      { en: 'I', cn: '我', emoji: '🙋', ipa: '/aɪ/' },
      { en: 'am', cn: '是', emoji: '🔤', ipa: '/æm/' },
      { en: 'not', cn: '不；不是', emoji: '🚫', ipa: '/nɒt/' },
      { en: 'twin', cn: '双胞胎之一', emoji: '👯', ipa: '/twɪn/' },
      { en: 'sister', cn: '姐妹', emoji: '👧', ipa: '/ˈsɪstə(r)/' },
      { en: 'brother', cn: '兄弟', emoji: '👦', ipa: '/ˈbrʌðə(r)/' },
      { en: 'look', cn: '看', emoji: '👀', ipa: '/lʊk/' },
      { en: 'right', cn: '正确的', emoji: '✅', ipa: '/raɪt/' }
    ],
    [
      { en: 'Are you Su Hai?', cn: '你是苏海吗？' },
      { en: 'No, I am not.', cn: '不，我不是。' },
      { en: 'I am Su Yang.', cn: '我是苏洋。' },
      { en: 'You are twins.', cn: '你们是双胞胎。' },
      { en: 'You are right.', cn: '你说对了。' }
    ],
    [
      { speaker: '👦 Mike', text: 'Are you Su Hai?', cn: '你是苏海吗？' },
      { speaker: '👧 Su Yang', text: 'No, I am not. I am Su Yang.', cn: '不，我不是。我是苏洋。' },
      { speaker: '👦 Mike', text: 'You are twins!', cn: '你们是双胞胎！' },
      { speaker: '👧 Su Yang', text: 'Yes. You are right.', cn: '是的。你说对了。' }
    ],
    [
      { en: 'you are right', cn: '你说对了', emoji: '✅' },
      { en: 'twin sisters', cn: '双胞胎姐妹', emoji: '👯' },
      { en: 'look at me', cn: '看我', emoji: '👀' },
      { en: 'I am not', cn: '我不是', emoji: '🚫' }
    ],
    [
      { en: 'Are you ...?', cn: '确认对方是谁' },
      { en: 'No, I am not.', cn: '否定回答' },
      { en: 'You are ...', cn: '描述对方' }
    ],
    [
      { emoji: '👯', q: 'twin 是什么意思？', answer: '双胞胎之一', options: ['朋友', '老师', '双胞胎之一', '同学'] },
      { q: '"Are you Su Hai?" 意思是？', answer: '你是苏海吗？', options: ['你叫苏海吗？', '你是苏海吗？', '她是苏海吗？', '苏海在哪里？'] },
      { q: '"No, I am not." 意思是？', answer: '不，我不是。', options: ['是的，我是。', '不，我不是。', '我很好。', '你说对了。'] }
    ]),

  u('u4', 'Unit 4', 'This is my friend 这是我的朋友', '#9b59b6',
    [
      { en: 'this', cn: '这；这个', emoji: '👇', ipa: '/ðɪs/' },
      { en: 'is', cn: '是', emoji: '🔤', ipa: '/ɪz/' },
      { en: 'friend', cn: '朋友', emoji: '🤝', ipa: '/frend/' },
      { en: 'he', cn: '他', emoji: '👦', ipa: '/hiː/' },
      { en: 'she', cn: '她', emoji: '👧', ipa: '/ʃiː/' },
      { en: 'boy', cn: '男孩', emoji: '👦', ipa: '/bɔɪ/' },
      { en: 'girl', cn: '女孩', emoji: '👧', ipa: '/ɡɜːl/' },
      { en: 'nice', cn: '好的；漂亮的', emoji: '🌟', ipa: '/naɪs/' },
      { en: 'meet', cn: '遇见；见到', emoji: '🤝', ipa: '/miːt/' },
      { en: 'too', cn: '也', emoji: '➕', ipa: '/tuː/' }
    ],
    [
      { en: 'This is my friend.', cn: '这是我的朋友。' },
      { en: 'He is Liu Tao.', cn: '他是刘涛。' },
      { en: 'She is Yang Ling.', cn: '她是杨玲。' },
      { en: 'Nice to meet you.', cn: '很高兴见到你。' },
      { en: 'Nice to meet you too.', cn: '我也很高兴见到你。' }
    ],
    [
      { speaker: '👦 Mike', text: 'This is my friend, Liu Tao.', cn: '这是我的朋友刘涛。' },
      { speaker: '👧 Helen', text: 'Nice to meet you.', cn: '很高兴见到你。' },
      { speaker: '👦 Liu Tao', text: 'Nice to meet you too.', cn: '我也很高兴见到你。' },
      { speaker: '👧 Helen', text: 'She is my friend, Yang Ling.', cn: '她是我的朋友杨玲。' }
    ],
    [
      { en: 'my friend', cn: '我的朋友', emoji: '🤝' },
      { en: 'nice to meet you', cn: '很高兴见到你', emoji: '🌟' },
      { en: 'this is', cn: '这是', emoji: '👇' },
      { en: 'he is', cn: '他是', emoji: '👦' }
    ],
    [
      { en: 'This is ...', cn: '介绍别人' },
      { en: 'He is ...', cn: '介绍男孩或男性' },
      { en: 'She is ...', cn: '介绍女孩或女性' }
    ],
    [
      { emoji: '👇', q: 'this 是什么意思？', answer: '这；这个', options: ['那', '这；这个', '他', '她'] },
      { q: '"This is my friend." 意思是？', answer: '这是我的朋友。', options: ['这是我的朋友。', '我是你的朋友。', '他是我的老师。', '她是我的同学。'] },
      { emoji: '👧', q: 'she 是什么意思？', answer: '她', options: ['他', '她', '你', '我'] }
    ]),

  u('u5', 'Unit 5', 'She is my mother 她是我的妈妈', '#e05252',
    [
      { en: 'mother', cn: '妈妈', emoji: '👩', ipa: '/ˈmʌðə(r)/' },
      { en: 'father', cn: '爸爸', emoji: '👨', ipa: '/ˈfɑːðə(r)/' },
      { en: 'mum', cn: '妈妈', emoji: '👩', ipa: '/mʌm/' },
      { en: 'dad', cn: '爸爸', emoji: '👨', ipa: '/dæd/' },
      { en: 'family', cn: '家庭；家人', emoji: '👨‍👩‍👧', ipa: '/ˈfæməli/' },
      { en: 'grandma', cn: '奶奶；外婆', emoji: '👵', ipa: '/ˈɡrænmɑː/' },
      { en: 'grandpa', cn: '爷爷；外公', emoji: '👴', ipa: '/ˈɡrænpɑː/' },
      { en: 'baby', cn: '婴儿', emoji: '👶', ipa: '/ˈbeɪbi/' },
      { en: 'who', cn: '谁', emoji: '❓', ipa: '/huː/' },
      { en: 'love', cn: '爱', emoji: '❤️', ipa: '/lʌv/' }
    ],
    [
      { en: 'She is my mother.', cn: '她是我的妈妈。' },
      { en: 'He is my father.', cn: '他是我的爸爸。' },
      { en: 'This is my family.', cn: '这是我的家人。' },
      { en: 'Who is she?', cn: '她是谁？' },
      { en: 'I love my family.', cn: '我爱我的家人。' }
    ],
    [
      { speaker: '👧 Yang Ling', text: 'This is my family.', cn: '这是我的家人。' },
      { speaker: '👦 Mike', text: 'Who is she?', cn: '她是谁？' },
      { speaker: '👧 Yang Ling', text: 'She is my mother.', cn: '她是我的妈妈。' },
      { speaker: '👦 Mike', text: 'Your family is nice.', cn: '你的家人真好。' }
    ],
    [
      { en: 'my mother', cn: '我的妈妈', emoji: '👩' },
      { en: 'my father', cn: '我的爸爸', emoji: '👨' },
      { en: 'my family', cn: '我的家人', emoji: '👨‍👩‍👧' },
      { en: 'love my family', cn: '爱我的家人', emoji: '❤️' }
    ],
    [
      { en: 'Who is she?', cn: '询问她是谁' },
      { en: 'She is my mother.', cn: '介绍女性家人' },
      { en: 'He is my father.', cn: '介绍男性家人' }
    ],
    [
      { emoji: '👩', q: 'mother 是什么意思？', answer: '妈妈', options: ['爸爸', '妈妈', '爷爷', '朋友'] },
      { q: '"Who is she?" 意思是？', answer: '她是谁？', options: ['他是谁？', '她是谁？', '你是谁？', '她好吗？'] },
      { emoji: '👨‍👩‍👧', q: 'family 是什么意思？', answer: '家庭；家人', options: ['学校', '家庭；家人', '朋友', '班级'] }
    ]),

  u('u6', 'Unit 6', 'Is he your grandpa? 他是你的爷爷吗？', '#1488cc',
    [
      { en: 'grandpa', cn: '爷爷；外公', emoji: '👴', ipa: '/ˈɡrænpɑː/' },
      { en: 'grandma', cn: '奶奶；外婆', emoji: '👵', ipa: '/ˈɡrænmɑː/' },
      { en: 'uncle', cn: '叔叔；舅舅', emoji: '👨', ipa: '/ˈʌŋkl/' },
      { en: 'aunt', cn: '阿姨；姑姑', emoji: '👩', ipa: '/ɑːnt/' },
      { en: 'cousin', cn: '堂表兄弟姐妹', emoji: '🧒', ipa: '/ˈkʌzn/' },
      { en: 'he', cn: '他', emoji: '👦', ipa: '/hiː/' },
      { en: 'she', cn: '她', emoji: '👧', ipa: '/ʃiː/' },
      { en: 'your', cn: '你的', emoji: '👉', ipa: '/jɔː(r)/' },
      { en: 'photo', cn: '照片', emoji: '📷', ipa: '/ˈfəʊtəʊ/' },
      { en: 'old', cn: '年老的；旧的', emoji: '📜', ipa: '/əʊld/' }
    ],
    [
      { en: 'Is he your grandpa?', cn: '他是你的爷爷吗？' },
      { en: 'Yes, he is.', cn: '是的，他是。' },
      { en: 'Is she your grandma?', cn: '她是你的奶奶吗？' },
      { en: 'No, she is not.', cn: '不，她不是。' },
      { en: 'This is my family photo.', cn: '这是我的全家福。' }
    ],
    [
      { speaker: '👧 Helen', text: 'Look at my family photo.', cn: '看我的全家福。' },
      { speaker: '👦 Tim', text: 'Is he your grandpa?', cn: '他是你的爷爷吗？' },
      { speaker: '👧 Helen', text: 'Yes, he is.', cn: '是的，他是。' },
      { speaker: '👦 Tim', text: 'Is she your aunt?', cn: '她是你的阿姨吗？' }
    ],
    [
      { en: 'family photo', cn: '全家福', emoji: '📷' },
      { en: 'your grandpa', cn: '你的爷爷', emoji: '👴' },
      { en: 'my aunt', cn: '我的阿姨', emoji: '👩' },
      { en: 'yes he is', cn: '是的，他是', emoji: '✅' }
    ],
    [
      { en: 'Is he ...?', cn: '确认男性身份' },
      { en: 'Is she ...?', cn: '确认女性身份' },
      { en: 'Yes, he is.', cn: '肯定回答' }
    ],
    [
      { emoji: '👴', q: 'grandpa 是什么意思？', answer: '爷爷；外公', options: ['妈妈', '爷爷；外公', '阿姨', '朋友'] },
      { q: '"Is he your grandpa?" 意思是？', answer: '他是你的爷爷吗？', options: ['她是你的奶奶吗？', '他是你的爷爷吗？', '他是你的爸爸吗？', '你是爷爷吗？'] },
      { emoji: '📷', q: 'photo 是什么意思？', answer: '照片', options: ['照片', '名字', '家庭', '朋友'] }
    ]),

  u('u7', 'Unit 7', 'Happy Birthday! 生日快乐', '#2f9e44',
    [
      { en: 'birthday', cn: '生日', emoji: '🎂', ipa: '/ˈbɜːθdeɪ/' },
      { en: 'happy', cn: '快乐的', emoji: '😄', ipa: '/ˈhæpi/' },
      { en: 'cake', cn: '蛋糕', emoji: '🍰', ipa: '/keɪk/' },
      { en: 'gift', cn: '礼物', emoji: '🎁', ipa: '/ɡɪft/' },
      { en: 'card', cn: '卡片', emoji: '💌', ipa: '/kɑːd/' },
      { en: 'wish', cn: '祝愿', emoji: '⭐', ipa: '/wɪʃ/' },
      { en: 'for', cn: '给；为了', emoji: '➡️', ipa: '/fɔː(r)/' },
      { en: 'dad', cn: '爸爸', emoji: '👨', ipa: '/dæd/' },
      { en: 'thanks', cn: '谢谢', emoji: '🙏', ipa: '/θæŋks/' },
      { en: 'today', cn: '今天', emoji: '📅', ipa: '/təˈdeɪ/' }
    ],
    [
      { en: 'Happy Birthday!', cn: '生日快乐！' },
      { en: 'This cake is for you.', cn: '这个蛋糕是给你的。' },
      { en: 'This is a gift for Dad.', cn: '这是给爸爸的礼物。' },
      { en: 'Thank you, Mum.', cn: '谢谢你，妈妈。' },
      { en: 'Make a birthday card.', cn: '制作一张生日卡片。' }
    ],
    [
      { speaker: '👧 Tina', text: 'Happy Birthday, Dad!', cn: '爸爸，生日快乐！' },
      { speaker: '👨 Dad', text: 'Thank you, Tina.', cn: '谢谢你，蒂娜。' },
      { speaker: '👧 Tina', text: 'This card is for you.', cn: '这张卡片是给你的。' },
      { speaker: '👨 Dad', text: 'It is nice. Thanks.', cn: '它很好看。谢谢。' }
    ],
    [
      { en: 'birthday cake', cn: '生日蛋糕', emoji: '🎂' },
      { en: 'birthday card', cn: '生日卡片', emoji: '💌' },
      { en: 'for you', cn: '给你', emoji: '➡️' },
      { en: 'thank you', cn: '谢谢你', emoji: '🙏' }
    ],
    [
      { en: 'Happy Birthday!', cn: '生日祝福' },
      { en: 'This ... is for you.', cn: '表达赠送' },
      { en: 'Thank you.', cn: '表达感谢' }
    ],
    [
      { emoji: '🎂', q: 'birthday 是什么意思？', answer: '生日', options: ['蛋糕', '生日', '礼物', '卡片'] },
      { q: '"This cake is for you." 意思是？', answer: '这个蛋糕是给你的。', options: ['这个蛋糕是我的。', '这个蛋糕是给你的。', '这个卡片给你。', '这是生日蛋糕。'] },
      { emoji: '🎁', q: 'gift 是什么意思？', answer: '礼物', options: ['卡片', '礼物', '蛋糕', '照片'] }
    ]),

  u('u8', 'Unit 8', 'I can do this for you 我能为你做这件事', '#7950f2',
    [
      { en: 'can', cn: '能；会', emoji: '💪', ipa: '/kæn/' },
      { en: 'do', cn: '做', emoji: '🛠️', ipa: '/duː/' },
      { en: 'this', cn: '这；这个', emoji: '👇', ipa: '/ðɪs/' },
      { en: 'for', cn: '为；给', emoji: '➡️', ipa: '/fɔː(r)/' },
      { en: 'help', cn: '帮助', emoji: '🙋', ipa: '/help/' },
      { en: 'draw', cn: '画画', emoji: '🎨', ipa: '/drɔː/' },
      { en: 'sing', cn: '唱歌', emoji: '🎤', ipa: '/sɪŋ/' },
      { en: 'read', cn: '读', emoji: '📖', ipa: '/riːd/' },
      { en: 'make', cn: '制作', emoji: '✂️', ipa: '/meɪk/' },
      { en: 'poster', cn: '海报', emoji: '🖼️', ipa: '/ˈpəʊstə(r)/' }
    ],
    [
      { en: 'I can do this for you.', cn: '我能为你做这件事。' },
      { en: 'Can you help me?', cn: '你能帮助我吗？' },
      { en: 'Yes, I can.', cn: '是的，我能。' },
      { en: 'I can draw a poster.', cn: '我能画一张海报。' },
      { en: 'We can make a family poster.', cn: '我们能制作一张家庭海报。' }
    ],
    [
      { speaker: '👧 Anna', text: 'Can you help me?', cn: '你能帮助我吗？' },
      { speaker: '👦 Ben', text: 'Yes, I can.', cn: '是的，我能。' },
      { speaker: '👧 Anna', text: 'I want to make a poster.', cn: '我想制作一张海报。' },
      { speaker: '👦 Ben', text: 'I can do this for you.', cn: '我能为你做这件事。' }
    ],
    [
      { en: 'help me', cn: '帮助我', emoji: '🙋' },
      { en: 'draw a poster', cn: '画一张海报', emoji: '🎨' },
      { en: 'do this', cn: '做这件事', emoji: '🛠️' },
      { en: 'for you', cn: '为你；给你', emoji: '➡️' }
    ],
    [
      { en: 'Can you ...?', cn: '询问能力或请求帮助' },
      { en: 'Yes, I can.', cn: '肯定回答' },
      { en: 'I can ...', cn: '表达会做某事' }
    ],
    [
      { emoji: '💪', q: 'can 是什么意思？', answer: '能；会', options: ['做', '能；会', '帮助', '制作'] },
      { q: '"Can you help me?" 意思是？', answer: '你能帮助我吗？', options: ['我能帮助你吗？', '你能帮助我吗？', '你会唱歌吗？', '我能画画。'] },
      { emoji: '🖼️', q: 'poster 是什么意思？', answer: '海报', options: ['照片', '海报', '礼物', '卡片'] }
    ])
];

window.COURSE_GRAMMAR_GUIDE = [
  {
    title: '问候与告别',
    icon: '👋',
    desc: '不同时间和场景使用不同问候语。',
    rules: [
      { title: '见面问好', pattern: 'Hello. / Hi.', cn: '用于见面打招呼。', example: 'Hello, I am Mike.', note: 'Hello 比 Hi 更正式一点。' },
      { title: '早晨问候', pattern: 'Good morning, ...', cn: '早晨见面时使用。', example: 'Good morning, class.' },
      { title: '下午问候', pattern: 'Good afternoon, ...', cn: '下午见面时使用。', example: 'Good afternoon, Miss Li.' },
      { title: '告别', pattern: 'Goodbye. / Bye.', cn: '离开时使用。', example: 'Goodbye, my friend.' }
    ]
  },
  {
    title: '介绍自己与询问姓名',
    icon: '🏷️',
    desc: '三年级上册最基础的人称表达。',
    rules: [
      { title: '介绍自己', pattern: 'I am ...', cn: '我叫…… / 我是……', example: 'I am Su Hai.' },
      { title: '介绍姓名', pattern: 'My name is ...', cn: '我的名字是……', example: 'My name is Yang Ling.' },
      { title: '询问姓名', pattern: 'What is your name?', cn: '你叫什么名字？', example: 'What is your name?' },
      { title: '物主代词 my / your', pattern: 'my ... / your ...', cn: 'my 表示“我的”，your 表示“你的”。', example: 'My name is Mike. What is your name?' }
    ]
  },
  {
    title: '确认身份',
    icon: '✅',
    desc: '用 Are you...? 询问“你是……吗”。',
    rules: [
      { title: '一般疑问句', pattern: 'Are you ...?', cn: '用于确认对方身份。', example: 'Are you Su Hai?' },
      { title: '肯定回答', pattern: 'Yes, I am.', cn: '是的，我是。', example: 'Are you Wang Bing? Yes, I am.' },
      { title: '否定回答', pattern: 'No, I am not.', cn: '不，我不是。', example: 'Are you Su Hai? No, I am not.' },
      { title: 'You are ...', pattern: 'You are ...', cn: '描述“你是……”。', example: 'You are right.' }
    ]
  },
  {
    title: '介绍他人',
    icon: '🤝',
    desc: '用 This is... 介绍朋友和家人。',
    rules: [
      { title: '介绍别人', pattern: 'This is ...', cn: '这是……', example: 'This is my friend.' },
      { title: '介绍男孩或男性', pattern: 'He is ...', cn: '他是……', example: 'He is Liu Tao.' },
      { title: '介绍女孩或女性', pattern: 'She is ...', cn: '她是……', example: 'She is Yang Ling.' },
      { title: '见面礼貌用语', pattern: 'Nice to meet you.', cn: '很高兴见到你。', example: 'Nice to meet you too.' }
    ]
  },
  {
    title: '家庭成员',
    icon: '👨‍👩‍👧',
    desc: '介绍家人时注意 he 和 she。',
    rules: [
      { title: '询问她是谁', pattern: 'Who is she?', cn: '她是谁？', example: 'Who is she? She is my mother.' },
      { title: '询问他是谁', pattern: 'Who is he?', cn: '他是谁？', example: 'Who is he? He is my father.' },
      { title: '确认男性家人', pattern: 'Is he your ...?', cn: '他是你的……吗？', example: 'Is he your grandpa?' },
      { title: '确认女性家人', pattern: 'Is she your ...?', cn: '她是你的……吗？', example: 'Is she your grandma?' }
    ]
  },
  {
    title: '赠送与感谢',
    icon: '🎁',
    desc: '生日、礼物、卡片相关表达。',
    rules: [
      { title: '生日祝福', pattern: 'Happy Birthday!', cn: '生日快乐！', example: 'Happy Birthday, Dad!' },
      { title: '送给某人', pattern: 'This ... is for you.', cn: '这个……是给你的。', example: 'This card is for you.' },
      { title: '表达感谢', pattern: 'Thank you. / Thanks.', cn: '谢谢你。', example: 'Thank you, Mum.' }
    ]
  },
  {
    title: 'can 能力句型',
    icon: '💪',
    desc: '表达自己会做某事，也可以请求帮助。',
    rules: [
      { title: '表达能力', pattern: 'I can ...', cn: '我会…… / 我能……', example: 'I can draw a poster.' },
      { title: '请求帮助', pattern: 'Can you help me?', cn: '你能帮助我吗？', example: 'Can you help me?' },
      { title: '肯定回答', pattern: 'Yes, I can.', cn: '是的，我能。', example: 'Can you sing? Yes, I can.' },
      { title: '为你做', pattern: 'I can do this for you.', cn: '我能为你做这件事。', example: 'I can do this for you.' }
    ]
  }
];
