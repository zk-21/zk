window.COURSE_TITLE = '四年级下册英语 · 译林版互动学习';
window.COURSE_SUBTITLE = '按新版主题整理 · 原创练习内容 · 音频目录 audio/grade4b/en';
window.COURSE_AUDIO_BASE = 'audio/grade4b/en';

const u = (id, title, subtitle, color, words, sentences, dialogue, phrases, grammar, quiz) => ({
  id, title, subtitle, color, words, sentences, dialogue, phrases, grammar, quiz
});

window.COURSE_UNITS = [
  u('u1', 'Unit 1', 'We are friends 我们是朋友', '#2f80ed',
    [
      { en: 'friend', cn: '朋友', emoji: '🤝', ipa: '/frend/' },
      { en: 'kind', cn: '友好的；善良的', emoji: '😊', ipa: '/kaɪnd/' },
      { en: 'helpful', cn: '乐于助人的', emoji: '🙋', ipa: '/ˈhelpfl/' },
      { en: 'same', cn: '相同的', emoji: '🟰', ipa: '/seɪm/' },
      { en: 'different', cn: '不同的', emoji: '🔀', ipa: '/ˈdɪfrənt/' },
      { en: 'hobby', cn: '爱好', emoji: '🎯', ipa: '/ˈhɒbi/' },
      { en: 'draw', cn: '画画', emoji: '🎨', ipa: '/drɔː/' },
      { en: 'dance', cn: '跳舞', emoji: '💃', ipa: '/dɑːns/' },
      { en: 'together', cn: '一起', emoji: '👫', ipa: '/təˈɡeðə(r)/' },
      { en: 'classmate', cn: '同班同学', emoji: '🏫', ipa: '/ˈklɑːsmeɪt/' }
    ],
    [
      { en: 'We are good friends.', cn: '我们是好朋友。' },
      { en: 'She is kind and helpful.', cn: '她友好并且乐于助人。' },
      { en: 'We have the same hobby.', cn: '我们有相同的爱好。' },
      { en: 'I like drawing. What about you?', cn: '我喜欢画画。你呢？' },
      { en: 'Let us play together.', cn: '让我们一起玩吧。' }
    ],
    [
      { speaker: '👧 Lily', text: 'This is my friend, Amy.', cn: '这是我的朋友艾米。' },
      { speaker: '👦 Tom', text: 'Hello, Amy. What is your hobby?', cn: '你好，艾米。你的爱好是什么？' },
      { speaker: '👧 Amy', text: 'I like dancing. I like drawing too.', cn: '我喜欢跳舞。我也喜欢画画。' },
      { speaker: '👦 Tom', text: 'Great! We can draw together.', cn: '太好了！我们可以一起画画。' }
    ],
    [
      { en: 'good friends', cn: '好朋友', emoji: '🤝' },
      { en: 'the same hobby', cn: '相同的爱好', emoji: '🎯' },
      { en: 'help each other', cn: '互相帮助', emoji: '🙋' },
      { en: 'play together', cn: '一起玩', emoji: '👫' }
    ],
    [
      { en: 'We are ...', cn: '介绍我们是谁' },
      { en: 'She is kind.', cn: '描述人物特点' },
      { en: 'I like ...ing.', cn: '表达爱好' }
    ],
    [
      { emoji: '🤝', q: 'friend 是什么意思？', answer: '朋友', options: ['同桌', '朋友', '老师', '家人'] },
      { q: '"We have the same hobby." 意思是？', answer: '我们有相同的爱好。', options: ['我们在同一班。', '我们有相同的爱好。', '我们一起回家。', '我们喜欢同一门课。'] },
      { emoji: '😊', q: 'kind 是什么意思？', answer: '友好的；善良的', options: ['安静的', '友好的；善良的', '困难的', '不同的'] }
    ]),

  u('u2', 'Unit 2', 'Helping others at school 在学校帮助他人', '#17a673',
    [
      { en: 'help', cn: '帮助', emoji: '🙋', ipa: '/help/' },
      { en: 'carry', cn: '搬；提', emoji: '📦', ipa: '/ˈkæri/' },
      { en: 'clean', cn: '打扫；干净的', emoji: '🧹', ipa: '/kliːn/' },
      { en: 'share', cn: '分享', emoji: '🍎', ipa: '/ʃeə(r)/' },
      { en: 'borrow', cn: '借入', emoji: '📘', ipa: '/ˈbɒrəʊ/' },
      { en: 'lend', cn: '借出', emoji: '✏️', ipa: '/lend/' },
      { en: 'teacher', cn: '老师', emoji: '👩‍🏫', ipa: '/ˈtiːtʃə(r)/' },
      { en: 'classroom', cn: '教室', emoji: '🏫', ipa: '/ˈklɑːsruːm/' },
      { en: 'water', cn: '水；浇水', emoji: '💧', ipa: '/ˈwɔːtə(r)/' },
      { en: 'plant', cn: '植物', emoji: '🪴', ipa: '/plɑːnt/' }
    ],
    [
      { en: 'Can I help you?', cn: '我能帮助你吗？' },
      { en: 'Please help me carry the books.', cn: '请帮我搬这些书。' },
      { en: 'Let us clean the classroom.', cn: '让我们打扫教室吧。' },
      { en: 'I can water the plants.', cn: '我能给植物浇水。' },
      { en: 'Thank you for your help.', cn: '谢谢你的帮助。' }
    ],
    [
      { speaker: '👩 Teacher', text: 'These books are heavy.', cn: '这些书很重。' },
      { speaker: '👦 Ben', text: 'Can I help you?', cn: '我能帮助您吗？' },
      { speaker: '👩 Teacher', text: 'Yes, please. Help me carry them.', cn: '好的。请帮我搬它们。' },
      { speaker: '👧 Ann', text: 'I can clean the desks.', cn: '我可以擦课桌。' }
    ],
    [
      { en: 'help others', cn: '帮助他人', emoji: '🙋' },
      { en: 'carry the books', cn: '搬书', emoji: '📚' },
      { en: 'water the plants', cn: '给植物浇水', emoji: '🪴' },
      { en: 'share a pencil', cn: '分享一支铅笔', emoji: '✏️' }
    ],
    [
      { en: 'Can I help you?', cn: '主动提供帮助' },
      { en: 'Please help me ...', cn: '请求帮助' },
      { en: 'Thank you for ...', cn: '表达感谢' }
    ],
    [
      { emoji: '📦', q: 'carry 是什么意思？', answer: '搬；提', options: ['分享', '搬；提', '借入', '打扫'] },
      { q: '"Can I help you?" 意思是？', answer: '我能帮助你吗？', options: ['你能帮我吗？', '我能帮助你吗？', '你好吗？', '我可以借吗？'] },
      { emoji: '🪴', q: 'water the plants 是什么意思？', answer: '给植物浇水', options: ['种植物', '给植物浇水', '搬植物', '画植物'] }
    ]),

  u('u3', 'Unit 3', 'Making choices 做选择', '#f59f00',
    [
      { en: 'choice', cn: '选择', emoji: '🔀', ipa: '/tʃɔɪs/' },
      { en: 'choose', cn: '选择', emoji: '✅', ipa: '/tʃuːz/' },
      { en: 'want', cn: '想要', emoji: '🙋', ipa: '/wɒnt/' },
      { en: 'need', cn: '需要', emoji: '📌', ipa: '/niːd/' },
      { en: 'or', cn: '或者', emoji: '↔️', ipa: '/ɔː(r)/' },
      { en: 'because', cn: '因为', emoji: '💬', ipa: '/bɪˈkɒz/' },
      { en: 'small', cn: '小的', emoji: '🔹', ipa: '/smɔːl/' },
      { en: 'big', cn: '大的', emoji: '🔷', ipa: '/bɪɡ/' },
      { en: 'right', cn: '合适的；正确的', emoji: '👌', ipa: '/raɪt/' },
      { en: 'better', cn: '更好的', emoji: '⭐', ipa: '/ˈbetə(r)/' }
    ],
    [
      { en: 'Which one do you want?', cn: '你想要哪一个？' },
      { en: 'I want the blue one.', cn: '我想要蓝色的那个。' },
      { en: 'Do you need a big bag or a small bag?', cn: '你需要一个大包还是小包？' },
      { en: 'I choose this one because it is right for me.', cn: '我选择这个，因为它适合我。' },
      { en: 'Making good choices is important.', cn: '做出好的选择很重要。' }
    ],
    [
      { speaker: '👩 Mum', text: 'Which bag do you want?', cn: '你想要哪个包？' },
      { speaker: '👦 Leo', text: 'I want the small one.', cn: '我想要小的那个。' },
      { speaker: '👩 Mum', text: 'Why do you choose it?', cn: '你为什么选择它？' },
      { speaker: '👦 Leo', text: 'Because it is right for school.', cn: '因为它适合上学。' }
    ],
    [
      { en: 'make choices', cn: '做选择', emoji: '🔀' },
      { en: 'the blue one', cn: '蓝色的那个', emoji: '🔵' },
      { en: 'right for me', cn: '适合我', emoji: '👌' },
      { en: 'big or small', cn: '大还是小', emoji: '↔️' }
    ],
    [
      { en: 'Which one do you want?', cn: '询问选择' },
      { en: 'I want the ... one.', cn: '表达选择' },
      { en: 'because ...', cn: '说明原因' }
    ],
    [
      { emoji: '🔀', q: 'choice 是什么意思？', answer: '选择', options: ['颜色', '选择', '书包', '问题'] },
      { q: '"Which one do you want?" 意思是？', answer: '你想要哪一个？', options: ['你有哪一个？', '你想要哪一个？', '你喜欢什么颜色？', '你需要帮忙吗？'] },
      { emoji: '💬', q: 'because 是什么意思？', answer: '因为', options: ['但是', '或者', '因为', '所以'] }
    ]),

  u('u4', 'Unit 4', 'Having fun together 一起玩得开心', '#9b59b6',
    [
      { en: 'fun', cn: '乐趣', emoji: '🎉', ipa: '/fʌn/' },
      { en: 'together', cn: '一起', emoji: '👫', ipa: '/təˈɡeðə(r)/' },
      { en: 'game', cn: '游戏', emoji: '🎲', ipa: '/ɡeɪm/' },
      { en: 'party', cn: '聚会', emoji: '🎈', ipa: '/ˈpɑːti/' },
      { en: 'sing', cn: '唱歌', emoji: '🎤', ipa: '/sɪŋ/' },
      { en: 'dance', cn: '跳舞', emoji: '💃', ipa: '/dɑːns/' },
      { en: 'story', cn: '故事', emoji: '📖', ipa: '/ˈstɔːri/' },
      { en: 'laugh', cn: '笑', emoji: '😄', ipa: '/lɑːf/' },
      { en: 'join', cn: '参加；加入', emoji: '➕', ipa: '/dʒɔɪn/' },
      { en: 'ready', cn: '准备好的', emoji: '✅', ipa: '/ˈredi/' }
    ],
    [
      { en: 'Let us have fun together.', cn: '让我们一起玩得开心。' },
      { en: 'Can I join you?', cn: '我能加入你们吗？' },
      { en: 'We can sing and dance.', cn: '我们可以唱歌和跳舞。' },
      { en: 'Are you ready for the party?', cn: '你为聚会准备好了吗？' },
      { en: 'This game is interesting.', cn: '这个游戏很有趣。' }
    ],
    [
      { speaker: '👧 Tina', text: 'We have a class party today.', cn: '今天我们有班级聚会。' },
      { speaker: '👦 Sam', text: 'Great! Can I join the game?', cn: '太好了！我能加入游戏吗？' },
      { speaker: '👧 Tina', text: 'Sure. We can sing after the game.', cn: '当然。游戏后我们可以唱歌。' },
      { speaker: '👦 Sam', text: 'Let us have fun together.', cn: '让我们一起玩得开心。' }
    ],
    [
      { en: 'have fun', cn: '玩得开心', emoji: '🎉' },
      { en: 'join the game', cn: '加入游戏', emoji: '🎲' },
      { en: 'class party', cn: '班级聚会', emoji: '🎈' },
      { en: 'sing and dance', cn: '唱歌跳舞', emoji: '🎤' }
    ],
    [
      { en: 'Can I join you?', cn: '请求加入' },
      { en: 'We can ...', cn: '表达可以做什么' },
      { en: 'Are you ready?', cn: '询问是否准备好' }
    ],
    [
      { emoji: '🎲', q: 'game 是什么意思？', answer: '游戏', options: ['故事', '游戏', '课程', '天气'] },
      { q: '"Can I join you?" 意思是？', answer: '我能加入你们吗？', options: ['我能帮助你吗？', '我能加入你们吗？', '你准备好了吗？', '你会唱歌吗？'] },
      { emoji: '🎈', q: 'party 是什么意思？', answer: '聚会', options: ['聚会', '玩具', '运动', '家务'] }
    ]),

  u('u5', 'Unit 5', 'Eating out 外出就餐', '#e05252',
    [
      { en: 'restaurant', cn: '餐馆', emoji: '🍽️', ipa: '/ˈrestrɒnt/' },
      { en: 'menu', cn: '菜单', emoji: '📋', ipa: '/ˈmenjuː/' },
      { en: 'order', cn: '点餐', emoji: '🛎️', ipa: '/ˈɔːdə(r)/' },
      { en: 'dish', cn: '菜肴', emoji: '🥘', ipa: '/dɪʃ/' },
      { en: 'soup', cn: '汤', emoji: '🥣', ipa: '/suːp/' },
      { en: 'noodles', cn: '面条', emoji: '🍜', ipa: '/ˈnuːdlz/' },
      { en: 'rice', cn: '米饭', emoji: '🍚', ipa: '/raɪs/' },
      { en: 'juice', cn: '果汁', emoji: '🧃', ipa: '/dʒuːs/' },
      { en: 'water', cn: '水', emoji: '💧', ipa: '/ˈwɔːtə(r)/' },
      { en: 'bill', cn: '账单', emoji: '🧾', ipa: '/bɪl/' }
    ],
    [
      { en: 'What would you like?', cn: '你想要什么？' },
      { en: 'I would like some noodles.', cn: '我想要一些面条。' },
      { en: 'May I have the menu?', cn: '我可以看菜单吗？' },
      { en: 'The soup is nice.', cn: '汤很好喝。' },
      { en: 'Can we have the bill, please?', cn: '请给我们账单好吗？' }
    ],
    [
      { speaker: '👨 Waiter', text: 'Welcome. May I help you?', cn: '欢迎光临。我能帮您吗？' },
      { speaker: '👩 Mum', text: 'May I have the menu?', cn: '我可以看菜单吗？' },
      { speaker: '👦 Jack', text: 'I would like rice and soup.', cn: '我想要米饭和汤。' },
      { speaker: '👨 Waiter', text: 'OK. Anything else?', cn: '好的。还要别的吗？' }
    ],
    [
      { en: 'eat out', cn: '外出就餐', emoji: '🍽️' },
      { en: 'have the menu', cn: '看菜单', emoji: '📋' },
      { en: 'order food', cn: '点餐', emoji: '🛎️' },
      { en: 'the bill', cn: '账单', emoji: '🧾' }
    ],
    [
      { en: 'I would like ...', cn: '礼貌点餐' },
      { en: 'May I have ...?', cn: '礼貌请求' },
      { en: 'Anything else?', cn: '询问是否还要别的' }
    ],
    [
      { emoji: '📋', q: 'menu 是什么意思？', answer: '菜单', options: ['账单', '菜单', '餐馆', '汤'] },
      { q: '"I would like some noodles." 意思是？', answer: '我想要一些面条。', options: ['我喜欢面条。', '我想要一些面条。', '我有面条。', '我会做面条。'] },
      { emoji: '🧾', q: 'bill 是什么意思？', answer: '账单', options: ['菜单', '账单', '杯子', '盘子'] }
    ]),

  u('u6', 'Unit 6', 'Jobs 职业', '#1488cc',
    [
      { en: 'job', cn: '工作；职业', emoji: '💼', ipa: '/dʒɒb/' },
      { en: 'doctor', cn: '医生', emoji: '👩‍⚕️', ipa: '/ˈdɒktə(r)/' },
      { en: 'nurse', cn: '护士', emoji: '👨‍⚕️', ipa: '/nɜːs/' },
      { en: 'teacher', cn: '老师', emoji: '👩‍🏫', ipa: '/ˈtiːtʃə(r)/' },
      { en: 'driver', cn: '司机', emoji: '🚌', ipa: '/ˈdraɪvə(r)/' },
      { en: 'cook', cn: '厨师', emoji: '👨‍🍳', ipa: '/kʊk/' },
      { en: 'farmer', cn: '农民', emoji: '👩‍🌾', ipa: '/ˈfɑːmə(r)/' },
      { en: 'worker', cn: '工人', emoji: '👷', ipa: '/ˈwɜːkə(r)/' },
      { en: 'police officer', cn: '警察', emoji: '👮', ipa: '/pəˈliːs ˈɒfɪsə(r)/' },
      { en: 'firefighter', cn: '消防员', emoji: '🚒', ipa: '/ˈfaɪəfaɪtə(r)/' }
    ],
    [
      { en: 'What does your father do?', cn: '你爸爸是做什么的？' },
      { en: 'He is a doctor.', cn: '他是一名医生。' },
      { en: 'What does your mother do?', cn: '你妈妈是做什么的？' },
      { en: 'She is a teacher.', cn: '她是一名老师。' },
      { en: 'I want to be a firefighter.', cn: '我想成为一名消防员。' }
    ],
    [
      { speaker: '👧 Helen', text: 'What does your father do?', cn: '你爸爸是做什么的？' },
      { speaker: '👦 Mike', text: 'He is a driver.', cn: '他是一名司机。' },
      { speaker: '👧 Helen', text: 'What do you want to be?', cn: '你想成为什么？' },
      { speaker: '👦 Mike', text: 'I want to be a doctor.', cn: '我想成为一名医生。' }
    ],
    [
      { en: 'a good doctor', cn: '一名好医生', emoji: '👩‍⚕️' },
      { en: 'drive a bus', cn: '开公交车', emoji: '🚌' },
      { en: 'work on a farm', cn: '在农场工作', emoji: '👩‍🌾' },
      { en: 'help people', cn: '帮助人们', emoji: '🙋' }
    ],
    [
      { en: 'What does ... do?', cn: '询问职业' },
      { en: 'He is a ...', cn: '介绍男性职业' },
      { en: 'She is a ...', cn: '介绍女性职业' }
    ],
    [
      { emoji: '💼', q: 'job 是什么意思？', answer: '工作；职业', options: ['爱好', '工作；职业', '家庭', '课程'] },
      { q: '"He is a doctor." 意思是？', answer: '他是一名医生。', options: ['她是一名医生。', '他是一名医生。', '他想当医生。', '他看医生。'] },
      { emoji: '🚒', q: 'firefighter 是什么意思？', answer: '消防员', options: ['警察', '司机', '消防员', '厨师'] }
    ]),

  u('u7', 'Unit 7', 'Doing chores at home 在家做家务', '#2f9e44',
    [
      { en: 'chore', cn: '家务', emoji: '🧺', ipa: '/tʃɔː(r)/' },
      { en: 'wash', cn: '洗', emoji: '🧼', ipa: '/wɒʃ/' },
      { en: 'dish', cn: '盘子', emoji: '🍽️', ipa: '/dɪʃ/' },
      { en: 'sweep', cn: '扫', emoji: '🧹', ipa: '/swiːp/' },
      { en: 'floor', cn: '地板', emoji: '🏠', ipa: '/flɔː(r)/' },
      { en: 'make the bed', cn: '整理床铺', emoji: '🛏️', ipa: '/meɪk ðə bed/' },
      { en: 'cook', cn: '做饭', emoji: '🍳', ipa: '/kʊk/' },
      { en: 'tidy', cn: '整理；整洁的', emoji: '📦', ipa: '/ˈtaɪdi/' },
      { en: 'room', cn: '房间', emoji: '🚪', ipa: '/ruːm/' },
      { en: 'home', cn: '家', emoji: '🏠', ipa: '/həʊm/' }
    ],
    [
      { en: 'What chores do you do at home?', cn: '你在家做什么家务？' },
      { en: 'I sweep the floor.', cn: '我扫地。' },
      { en: 'Can you wash the dishes?', cn: '你会洗盘子吗？' },
      { en: 'I make the bed every morning.', cn: '我每天早晨整理床铺。' },
      { en: 'Let us keep the room tidy.', cn: '让我们保持房间整洁。' }
    ],
    [
      { speaker: '👩 Mum', text: 'What chores do you do today?', cn: '你今天做什么家务？' },
      { speaker: '👧 May', text: 'I make the bed and tidy my room.', cn: '我整理床铺并整理我的房间。' },
      { speaker: '👩 Mum', text: 'Can you wash the dishes?', cn: '你会洗盘子吗？' },
      { speaker: '👧 May', text: 'Yes, I can. Let me help.', cn: '是的，我会。让我来帮忙。' }
    ],
    [
      { en: 'do chores', cn: '做家务', emoji: '🧺' },
      { en: 'wash the dishes', cn: '洗盘子', emoji: '🍽️' },
      { en: 'sweep the floor', cn: '扫地', emoji: '🧹' },
      { en: 'tidy my room', cn: '整理我的房间', emoji: '📦' }
    ],
    [
      { en: 'What chores do you do?', cn: '询问做什么家务' },
      { en: 'I sweep the floor.', cn: '表达日常行为' },
      { en: 'Can you wash the dishes?', cn: '询问能力' }
    ],
    [
      { emoji: '🧺', q: 'chore 是什么意思？', answer: '家务', options: ['课程', '家务', '游戏', '食物'] },
      { q: '"wash the dishes" 意思是？', answer: '洗盘子', options: ['扫地', '洗盘子', '整理床铺', '做饭'] },
      { emoji: '🛏️', q: 'make the bed 是什么意思？', answer: '整理床铺', options: ['睡觉', '整理床铺', '买床', '打扫房间'] }
    ]),

  u('u8', 'Unit 8', 'Plans for the summer 暑假计划', '#7950f2',
    [
      { en: 'plan', cn: '计划', emoji: '🗓️', ipa: '/plæn/' },
      { en: 'summer', cn: '夏天；暑假', emoji: '🏖️', ipa: '/ˈsʌmə(r)/' },
      { en: 'holiday', cn: '假期', emoji: '🎒', ipa: '/ˈhɒlədeɪ/' },
      { en: 'travel', cn: '旅行', emoji: '🚄', ipa: '/ˈtrævl/' },
      { en: 'visit', cn: '参观；拜访', emoji: '🏛️', ipa: '/ˈvɪzɪt/' },
      { en: 'beach', cn: '海滩', emoji: '🏝️', ipa: '/biːtʃ/' },
      { en: 'museum', cn: '博物馆', emoji: '🏛️', ipa: '/mjuˈziːəm/' },
      { en: 'camp', cn: '露营', emoji: '⛺', ipa: '/kæmp/' },
      { en: 'learn', cn: '学习', emoji: '📘', ipa: '/lɜːn/' },
      { en: 'enjoy', cn: '享受；喜欢', emoji: '😄', ipa: '/ɪnˈdʒɔɪ/' }
    ],
    [
      { en: 'What are your plans for the summer?', cn: '你的暑假计划是什么？' },
      { en: 'I am going to visit my grandparents.', cn: '我打算去看望我的祖父母。' },
      { en: 'We are going to the beach.', cn: '我们打算去海滩。' },
      { en: 'I want to learn swimming.', cn: '我想学习游泳。' },
      { en: 'Have a nice holiday.', cn: '祝你假期愉快。' }
    ],
    [
      { speaker: '👦 Mike', text: 'What are your plans for the summer?', cn: '你的暑假计划是什么？' },
      { speaker: '👧 Helen', text: 'I am going to visit a museum.', cn: '我打算参观博物馆。' },
      { speaker: '👦 Mike', text: 'I am going to the beach with my family.', cn: '我打算和家人去海滩。' },
      { speaker: '👧 Helen', text: 'Have a nice holiday.', cn: '祝你假期愉快。' }
    ],
    [
      { en: 'summer holiday', cn: '暑假', emoji: '🏖️' },
      { en: 'visit grandparents', cn: '看望祖父母', emoji: '👴' },
      { en: 'go to the beach', cn: '去海滩', emoji: '🏝️' },
      { en: 'learn swimming', cn: '学习游泳', emoji: '🏊' }
    ],
    [
      { en: 'What are your plans?', cn: '询问计划' },
      { en: 'I am going to ...', cn: '表达计划' },
      { en: 'Have a nice holiday.', cn: '祝假期愉快' }
    ],
    [
      { emoji: '🗓️', q: 'plan 是什么意思？', answer: '计划', options: ['计划', '旅行', '暑假', '博物馆'] },
      { q: '"I am going to visit a museum." 意思是？', answer: '我打算参观博物馆。', options: ['我喜欢博物馆。', '我打算参观博物馆。', '我在博物馆。', '我来自博物馆。'] },
      { emoji: '🏝️', q: 'beach 是什么意思？', answer: '海滩', options: ['海滩', '营地', '城市', '学校'] }
    ])
];

window.COURSE_GRAMMAR_GUIDE = [
  {
    title: '朋友与人物描述',
    icon: '🤝',
    desc: '介绍朋友、描述性格和爱好。',
    rules: [
      { title: '介绍关系', pattern: 'We are good friends.', cn: '我们是好朋友。', example: 'We are good friends.' },
      { title: '描述性格', pattern: 'She is kind and helpful.', cn: '她友好并且乐于助人。', example: 'He is helpful too.' },
      { title: '相同与不同', pattern: 'same / different', cn: 'same 表示相同，different 表示不同。', example: 'We have the same hobby.' },
      { title: '爱好表达', pattern: 'I like ...ing.', cn: '我喜欢做……', example: 'I like drawing.' }
    ]
  },
  {
    title: '提供帮助',
    icon: '🙋',
    desc: '在学校帮助别人时常用的礼貌句。',
    rules: [
      { title: '主动帮忙', pattern: 'Can I help you?', cn: '我能帮助你吗？', example: 'Can I help you?' },
      { title: '请求帮助', pattern: 'Please help me ...', cn: '请帮我……', example: 'Please help me carry the books.' },
      { title: '表达自己能做', pattern: 'I can ...', cn: '我能……', example: 'I can water the plants.' },
      { title: '感谢帮助', pattern: 'Thank you for your help.', cn: '谢谢你的帮助。', example: 'Thank you for your help.' }
    ]
  },
  {
    title: '选择与原因',
    icon: '🔀',
    desc: '表达想要哪一个，并说明原因。',
    rules: [
      { title: '询问选择', pattern: 'Which one do you want?', cn: '你想要哪一个？', example: 'Which one do you want?' },
      { title: '表达选择', pattern: 'I want the ... one.', cn: '我想要……的那个。', example: 'I want the blue one.' },
      { title: '二选一', pattern: 'A or B', cn: 'A 还是 B。', example: 'Do you need a big bag or a small bag?' },
      { title: '说明原因', pattern: 'because ...', cn: '因为……', example: 'I choose this one because it is right for me.' }
    ]
  },
  {
    title: '邀请与一起活动',
    icon: '🎉',
    desc: '加入游戏、聚会和共同活动。',
    rules: [
      { title: '请求加入', pattern: 'Can I join you?', cn: '我能加入你们吗？', example: 'Can I join the game?' },
      { title: '表达可以做', pattern: 'We can ...', cn: '我们可以……', example: 'We can sing and dance.' },
      { title: '询问准备', pattern: 'Are you ready?', cn: '你准备好了吗？', example: 'Are you ready for the party?' },
      { title: '一起玩得开心', pattern: 'Let us have fun together.', cn: '让我们一起玩得开心。', example: 'Let us have fun together.' }
    ]
  },
  {
    title: '外出就餐',
    icon: '🍽️',
    desc: '点餐、看菜单和结账。',
    rules: [
      { title: '礼貌点餐', pattern: 'I would like ...', cn: '我想要……', example: 'I would like some noodles.' },
      { title: '看菜单', pattern: 'May I have the menu?', cn: '我可以看菜单吗？', example: 'May I have the menu?' },
      { title: '还要别的吗', pattern: 'Anything else?', cn: '还要别的吗？', example: 'OK. Anything else?' },
      { title: '结账', pattern: 'Can we have the bill, please?', cn: '请给我们账单好吗？', example: 'Can we have the bill, please?' }
    ]
  },
  {
    title: '职业',
    icon: '💼',
    desc: '询问和介绍家人的职业。',
    rules: [
      { title: '询问职业', pattern: 'What does ... do?', cn: '……是做什么的？', example: 'What does your father do?' },
      { title: '介绍男性职业', pattern: 'He is a ...', cn: '他是一名……', example: 'He is a doctor.' },
      { title: '介绍女性职业', pattern: 'She is a ...', cn: '她是一名……', example: 'She is a teacher.' },
      { title: '理想职业', pattern: 'I want to be a ...', cn: '我想成为一名……', example: 'I want to be a firefighter.' }
    ]
  },
  {
    title: '家务',
    icon: '🧺',
    desc: '询问和描述在家做什么家务。',
    rules: [
      { title: '询问家务', pattern: 'What chores do you do at home?', cn: '你在家做什么家务？', example: 'What chores do you do at home?' },
      { title: '表达日常家务', pattern: 'I sweep the floor.', cn: '我扫地。', example: 'I sweep the floor.' },
      { title: '询问能力', pattern: 'Can you wash the dishes?', cn: '你会洗盘子吗？', example: 'Can you wash the dishes?' },
      { title: '保持整洁', pattern: 'Let us keep ... tidy.', cn: '让我们保持……整洁。', example: 'Let us keep the room tidy.' }
    ]
  },
  {
    title: '暑假计划',
    icon: '🗓️',
    desc: '用 be going to 表达计划。',
    rules: [
      { title: '询问计划', pattern: 'What are your plans for the summer?', cn: '你的暑假计划是什么？', example: 'What are your plans for the summer?' },
      { title: '表达打算', pattern: 'I am going to ...', cn: '我打算……', example: 'I am going to visit a museum.' },
      { title: '我们打算', pattern: 'We are going to ...', cn: '我们打算……', example: 'We are going to the beach.' },
      { title: '祝假期愉快', pattern: 'Have a nice holiday.', cn: '祝你假期愉快。', example: 'Have a nice holiday.' }
    ]
  }
];

window.COURSE_TIPS = {
  u1: {
    phonics: '<span class="tip-rule">字母组合 <strong>ie</strong> 在 friend 中发 /e/ 音</span><span class="tip-example">friend /frend/</span><span class="tip-rule">字母组合 <strong>ob</strong> 在 hobby 中发 /ɒb/ 音</span><span class="tip-rule">字母组合 <strong>er</strong> 在 together 中发 /ə/ 轻音</span>',
    grammar: '<span class="tip-rule"><strong>We are ...</strong> 描述关系</span><span class="tip-rule"><strong>She / He is ... and ...</strong> 描述品质</span><span class="tip-rule"><strong>We have the same ...</strong> 我们有相同的……</span>',
    memory: '画出你和好朋友的样子，旁边写 <strong>We are good friends.</strong> 和彼此的爱好。用 <strong>same / different</strong> 比较你和朋友的异同。',
    culture: '英语国家小朋友交朋友时常说 <strong>Let\'s play together!</strong> 分享玩具和零食是表达友好的重要方式。'
  },
  u2: {
    phonics: '<span class="tip-rule">字母组合 <strong>el</strong> 在 help 中发 /el/ 音</span><span class="tip-example">help /help/</span><span class="tip-rule">字母组合 <strong>ul</strong> 在 useful 中发 /fl/ 音</span><span class="tip-rule">字母组合 <strong>or</strong> 在 homework 中发 /ɜː/ 音</span>',
    grammar: '<span class="tip-rule"><strong>Can you help me?</strong> 请求帮助</span><span class="tip-rule"><strong>Let me help you.</strong> 主动帮忙</span><span class="tip-rule"><strong>Thank you for helping me.</strong> 感谢帮助</span>',
    memory: '在学校找到三个可以帮忙的场景（如搬书、擦黑板），用英语说出来：<strong>Let me help you!</strong> 做一个"帮忙记录表"。',
    culture: '西方学校很重视 <strong>volunteer（志愿者）</strong> 精神。很多学校有 <strong>Helping Day</strong>，鼓励学生为社区做贡献。'
  },
  u3: {
    phonics: '<span class="tip-rule">字母组合 <strong>oi</strong> 在 choice 中发 /ɔɪ/ 双元音</span><span class="tip-example">choice /tʃɔɪs/</span><span class="tip-rule">字母组合 <strong>ou</strong> 在 would 中发 /ʊ/ 音</span><span class="tip-rule">字母组合 <strong>ea</strong> 在 read 中发 /iː/ 或 /e/ 音</span>',
    grammar: '<span class="tip-rule"><strong>I would like ...</strong> 我想要……（比 I want 更礼貌）</span><span class="tip-rule"><strong>Would you like ...?</strong> 你想要……吗？</span><span class="tip-rule"><strong>I choose ...</strong> 我选择……</span>',
    memory: '在餐厅/商店场景练习：<strong>I would like an ice cream, please.</strong> 做选择题卡片：左边画两个选项，用 <strong>I choose ...</strong> 做出选择。',
    culture: '英语中 <strong>would like</strong> 比 <strong>want</strong> 更礼貌。在餐厅点餐时一定要说 <strong>I would like ..., please.</strong> 才显得有礼貌！'
  },
  u4: {
    phonics: '<span class="tip-rule">字母组合 <strong>un</strong> 在 fun 中发 /ʌn/ 音</span><span class="tip-example">fun /fʌn/</span><span class="tip-rule">字母组合 <strong>ou</strong> 在 playground 中发 /aʊ/ 音</span><span class="tip-rule">字母组合 <strong>sw</strong> 在 swing 中发 /sw/ 音</span>',
    grammar: '<span class="tip-rule"><strong>Let\'s ...</strong> 提议一起做</span><span class="tip-rule"><strong>Shall we ...?</strong> 我们……好吗？</span><span class="tip-rule"><strong>That sounds great / fun!</strong> 听起来很棒！</span>',
    memory: '课间和小伙伴用英语提议：<strong>Let\'s play!</strong> <strong>Shall we go to the playground?</strong> 把游乐设施贴上英语标签练习。',
    culture: '西方学校课间活动很丰富，常见的有 <strong>swing（秋千）、slide（滑梯）、seesaw（跷跷板）</strong>。小朋友一起玩时要学会轮流（take turns）。'
  },
  u5: {
    phonics: '<span class="tip-rule">字母组合 <strong>ea</strong> 在 eat 中发 /iː/ 长音</span><span class="tip-example">eat /iːt/</span><span class="tip-rule">字母组合 <strong>ou</strong> 在 soup 中发 /uː/ 音</span><span class="tip-rule">字母组合 <strong>en</strong> 在 menu 中发 /juː/ 音</span>',
    grammar: '<span class="tip-rule"><strong>I\'d like ...</strong> 我想要点……</span><span class="tip-rule"><strong>Can I have ...?</strong> 我能要……吗？</span><span class="tip-rule"><strong>Here you are.</strong> 给你。</span>',
    memory: '制作一份英文<strong>菜单</strong>，画出食物并标注价格。和家人玩"餐厅游戏"：一人当服务员，一人当顾客，练习点餐对话。',
    culture: '在英语国家餐厅点餐时说 <strong>Can I have ..., please?</strong> 吃完后通常要给 <strong>tip（小费）</strong>，一般是消费额的 10%-15%。'
  },
  u6: {
    phonics: '<span class="tip-rule">字母组合 <strong>or</strong> 在 doctor 中发 /ə/ 轻音</span><span class="tip-example">doctor /ˈdɒktə/</span><span class="tip-rule">字母组合 <strong>ur</strong> 在 nurse 中发 /ɜː/ 音</span><span class="tip-rule">字母组合 <strong>oo</strong> 在 cook 中发 /ʊ/ 短音</span>',
    grammar: '<span class="tip-rule"><strong>What does he / she do?</strong> 他/她做什么工作？</span><span class="tip-rule"><strong>He / She is a ...</strong> 他/她是一名……</span><span class="tip-rule"><strong>I want to be a ...</strong> 我想成为……</span>',
    memory: '画出你梦想的职业，写上 <strong>I want to be a ...</strong>。采访家人职业，用英语记录：<strong>My father is a ...</strong>',
    culture: '英语中职业名词前通常加 <strong>a / an</strong>：a doctor, an engineer。注意以元音开头的职业用 <strong>an</strong>：an artist, an engineer。'
  },
  u7: {
    phonics: '<span class="tip-rule">字母组合 <strong>ea</strong> 在 clean 中发 /iː/ 长音</span><span class="tip-example">clean /kliːn/</span><span class="tip-rule">字母组合 <strong>oo</strong> 在 broom 中发 /uː/ 长音</span><span class="tip-rule">字母组合 <strong>wa</strong> 在 wash 中发 /wɒ/ 音</span>',
    grammar: '<span class="tip-rule"><strong>I can ...</strong> 我能做（家务）</span><span class="tip-rule"><strong>Can you ...?</strong> 你能……吗？</span><span class="tip-rule"><strong>Let\'s keep ... tidy.</strong> 让我们保持……整洁</span>',
    memory: '制作<strong>家务清单</strong>（Chore Chart），每完成一项打勾并说 <strong>I can sweep the floor!</strong> 用英语标签贴在家务工具上。',
    culture: '西方家庭通常让孩子从小做家务赚 <strong>pocket money（零花钱）</strong>。比如洗碗、除草、遛狗都可以获得零花钱。'
  },
  u8: {
    phonics: '<span class="tip-rule">字母组合 <strong>oi</strong> 在 going 中发 /əʊ/ 音</span><span class="tip-example">going /ˈɡəʊɪŋ/</span><span class="tip-rule">字母组合 <strong>su</strong> 在 summer 中发 /sʌ/ 音</span><span class="tip-rule">字母组合 <strong>is</strong> 在 visit 中发 /ɪz/ 音</span>',
    grammar: '<span class="tip-rule"><strong>I am going to ...</strong> 我打算……（计划）</span><span class="tip-rule"><strong>We are going to ...</strong> 我们打算……</span><span class="tip-rule"><strong>What are your plans?</strong> 你的计划是什么？</span>',
    memory: '画一张<strong>暑假计划海报</strong>，列出 3-5 个打算做的事，用 <strong>I am going to ...</strong> 写英语句子。和同学互相分享暑假计划。',
    culture: '西方暑假一般从 <strong>6月底到9月初</strong>，大约 2 个多月。很多家庭会去 <strong>beach（海滩）</strong> 度假或参加 <strong>summer camp（夏令营）</strong>。'
  }
};
