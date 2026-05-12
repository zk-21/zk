# 英语音频生成脚本
$audioDir = ".\audio\en"
$manifestPath = ".\audio\en\_manifest.json"

# 读取 manifest 获取已有的文件列表
$existingFiles = @()
if (Test-Path $manifestPath) {
    $manifest = Get-Content $manifestPath | ConvertFrom-Json
    $existingFiles = $manifest | ForEach-Object { $_.file }
}
Write-Host "已有音频文件: $($existingFiles.Count) 个"

# 创建哈希函数（与 JavaScript 代码一致）
function Get-TextHash($text) {
    $hash = 0
    foreach ($char in $text.ToCharArray()) {
        $hash = ($hash * 131 + [int]$char) % 2147483647
    }
    return $hash.ToString()
}

# 创建 slug 函数（与 JavaScript 代码一致）
function Get-TextSlug($text) {
    $slug = $text.ToLower()
    $slug = $slug -replace "['\u2019']", ""
    $slug = $slug -replace "[^a-z0-9]+", "-"
    $slug = $slug -replace "^-|-$", ""
    if ($slug.Length -gt 48) {
        $slug = $slug.Substring(0, 48)
    }
    return if ($slug) { $slug } else { "clip" }
}

# 获取音频文件路径
function Get-AudioFileName($text) {
    $slug = Get-TextSlug $text
    $hash = Get-TextHash $text
    return "${slug}-${hash}.wav"
}

# 生成音频文件
function Generate-Audio($text, $voice) {
    $fileName = Get-AudioFileName $text
    $filePath = Join-Path $audioDir $fileName

    # 如果文件已存在，跳过
    if ($existingFiles -contains $fileName) {
        return $false
    }

    if (Test-Path $filePath) {
        return $false
    }

    try {
        $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
        $synth.SetOutputToWaveFile($filePath)
        $synth.SelectVoice($voice)
        $synth.Rate = -1  # 稍慢的语速
        $synth.Speak($text)
        $synth.Dispose()
        return $true
    }
    catch {
        Write-Host "生成失败: $text - $_"
        return $false
    }
}

Write-Host "开始生成缺失的音频文件..."
Write-Host "目标目录: $audioDir"

# 这里应该从 HTML 文件中提取所有文本
# 由于解析 HTML 比较复杂，我们先列出需要处理的基本结构
$allTexts = @(
    # Unit 1
    "school", "pen", "pencil", "ruler", "rubber", "schoolbag", "pencil case", "that", "put", "guess", "again", "long", "thing",
    "What's this?", "It's my pencil case.", "What's that?", "It's my rubber.", "Bobby! Put your school things in your schoolbag!",
    "Yes, Dad!", "What about you?", "Good idea!", "I like apples. They are good.", "Let's share!",
    "Look! Let's follow the rules.", "OK.", "Don't run, Mike.", "Don't shout, Mike.",
    "Would you like a sweet?", "No, thank you. We can't eat here.", "Look at the rules here.",
    "Oh, I'm sorry.", "That's all right.",
    # 更多文本...
    "Clean our classroom", "Sweep the floor", "Put away", "Look outside", "Clean the window",
    "Close the door", "Big and new", "Go out to play",
    # Unit 3
    "Our classroom is dirty. Let's sweep the floor.", "All right.",
    "Me too! Let's clean the blackboard.", "Good. Keep the classroom clean.",
    "Sit down, please. Don't talk in the library.", "I'm sorry, Mrs Li.",
    "That's all right. Follow the rules.", "Look! Would you like a sweet?",
    "Follow the rules", "Make rules", "Keep quiet", "Make class rules",
    # Unit 4
    "Class is over. Let's play!", "One, two, three, go!", "The planes go very far.",
    "My plane is on the table.", "My plane is in the flowers!",
    "Where's my plane? I can't find it.", "It's in the tree!",
    "Oh no!", "Let's have fun after class! Are you ready?",
    "Yes! Where is my plane?", "It's behind the tree.",
    "Look! The garden is very beautiful. A butterfly!",
    # Unit 5
    "Do you have a mango, Bobby?", "No, I don't.",
    "One, two, three, look! I have a mango!", "Cool!",
    "One, two, three, look! I have two mangoes.", "Great!",
    "Ha ha!", "Let's share the mangoes!", "Thank you! I like mangoes. They're sweet.",
    "I have two apples.", "I have a mango. Do you have a banana, Yang Ling?",
    "No, I don't. I have some grapes.", "Wang Bing, do you have a banana?",
    "Yes, I do.", "Here you are.", "Thanks.",
    "Let's make a fruit salad together.", "What fruit do you have?",
    "I have an orange.", "Fruit is good for us!",
    "How nice!", "Like apples", "Red and sweet", "Lots of fruit",
    "On my plate", "Have two mangoes", "Share the mangoes",
    "A magic trick", "A mango tree", "How many mangoes",
    "Be good for", "Make a fruit salad together",
    # Unit 6
    "Hello, Sam. Hello, Bobby. Welcome to my home!",
    "Hello, Ruby!", "What are these?", "They're carrots.",
    "Are those carrots too?", "Yes, they are.", "Help me, please!",
    "Hello, Grandpa!", "Welcome to my farm.",
    "What are these, Grandpa?", "They're pigs.",
    "Is this a home for pigs?", "Yes, it is.",
    "What are those under the tree? Are they sheep?",
    "No, they aren't. They're cows.",
    "These rabbits are very cute.", "Yes, they are.",
    "What do they like?", "They like carrots.",
    "Are those chickens?", "No, they aren't. They're ducks.",
    "One, two, three, four... Don't move, ducks!",
    "Grandpa, your farm is fun.",
    "On the farm", "Welcome to", "These carrots", "Those sheep",
    "A home for pigs", "Under the tree", "Help me",
    # Unit 7
    "It's lunchtime.", "Do you like cakes?",
    "Do you like bananas?", "Do you like fish?",
    "Yes, I do!", "Me too!", "High five!",
    "Five?", "Look at the tigers!", "I like tigers. They're cool.",
    "I like tigers too.", "Do you like bears, Mum?",
    "Yes, I do. They're big.",
    "Do you like lions, Haohao?", "No, I don't! I like pandas!",
    "Haohao, look at the monkeys. They're cute.",
    "I like monkeys! Hi, Monkey! Would you like a banana?",
    "Don't feed animals in the zoo!", "Oh, I'm sorry!",
    "That's all right. Let's go to see the pandas.",
    "Love to eat fresh bamboo", "All day", "Cute and cool",
    "In the pool", "Sleep and play", "Feed animals",
    "Like and dislike", "High five", "At the zoo",
    # Unit 8
    "Can I buy a balloon, Mum?", "Sure.",
    "Hello! I want a balloon.", "OK. What colour?",
    "Pink, please.", "Here you are.",
    "What about you, Bobby?",
    "I want a green balloon, a red balloon, an orange balloon...",
    "Bobby! That balloon is for you.",
    "Look, this is a chameleon. It's my little friend. What colour is it?",
    "It's green.", "What colour is it now? Can you see it?",
    "Yes, it's here.", "It's brown.",
    "It's yellow and red now.", "It's cool!",
    "Yes, my little friend is very cool.",
    "What colour is it now?", "It's green again!",
    "How come?", "Wow!",
    "Buy a balloon", "Want a balloon", "What colour",
    "Pick an apple for me", "My little friend",
    "Yellow and red", "Around us", "Change colour"
)

$voice = "Microsoft Zira Desktop"  # 英文语音
$count = 0
$skipped = 0

foreach ($text in $allTexts) {
    $result = Generate-Audio $text $voice
    if ($result) {
        $count++
        Write-Host "生成: $text" -ForegroundColor Green
    } else {
        $skipped++
    }
}

Write-Host ""
Write-Host "========================================="
Write-Host "完成！"
Write-Host "新增音频文件: $count"
Write-Host "跳过(已存在): $skipped"
Write-Host "========================================="
