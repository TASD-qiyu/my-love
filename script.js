// ========== 全局状态 ==========
const state = {
  pattern: [1,4,7,8,9],
  tempPattern: [],
  unlockSequence: [],
  isPlaying: false,
  currentPage: 0,
  avatarLeft: '',
  avatarRight: '',
  lockBg: '',
  mainBg: '',
  coupleBg: '',
  playerCover: '',
  lockText: '❤ 心动信号 ❤',
  lockTextColor: '#ffffff',
  nick1: '我',
  nick2: '梦角',
  songName: '心动旋律',
  theme: { bg: '#ffffff', icon: '#3a4a6b', text: '#e5e7eb' },
  wordBank: ['我','爱','你','想','念','在','一','起','永','远','心','动','梦','见','等','待','守','护','陪','伴','温','暖','甜','蜜','幸','福','美','好','珍','惜','相','遇','缘','分','奇','迹'],
  wordDisplay: [],
  savedMessages: [],
  memoList: [],
  diaryList: [],
  photoList: [],
  chatMessages: [],
  anniversaryDate: null,
  songs: ['心动旋律','星空下的约定','温柔的风','想见你','小幸运','告白气球','慢慢喜欢你'],
  currentSongIndex: 0,
  wishList: [],
  lastCheckin: null,
  checkinStreak: 0,
};

// ========== 工具函数 ==========
function $(id) { return document.getElementById(id); }
function toast(msg) {
  const t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

// ========== 数据存储 ==========
const STORAGE_KEY = 'love_app_data';

function loadAllData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const data = JSON.parse(raw);
      Object.assign(state, data);
    }
  } catch (e) { console.error('load error', e); }
}

function saveAllData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { console.error('save error', e); }
}

function applyLoadedData() {
  if (state.avatarLeft) updateAvatar('avatarLeft', state.avatarLeft);
  if (state.avatarRight) updateAvatar('avatarRight', state.avatarRight);
  if (state.lockBg) $('lockBgLayer').style.backgroundImage = 'url(' + state.lockBg + ')';
  if (state.mainBg) $('mainPage').style.backgroundImage = 'url(' + state.mainBg + ')';
  if (state.coupleBg) {
    $('coupleCardBg').style.backgroundImage = 'url(' + state.coupleBg + ')';
    $('coupleHint').style.display = 'none';
  }
  if (state.playerCover) {
    $('playerCover').style.backgroundImage = 'url(' + state.playerCover + ')';
    $('playerCover').innerHTML = '';
  }
  if (state.lockText) $('lockTextDisplay').textContent = state.lockText;
  if (state.lockTextColor) $('lockTextDisplay').style.color = state.lockTextColor;
  if (state.nick1) $('nick1').textContent = state.nick1;
  if (state.nick2) $('nick2').textContent = state.nick2;
  if (state.songName) $('songNameDisplay').textContent = state.songName;
  if (state.theme) applyTheme(state.theme);
  if (state.pattern) $('patternPreview').textContent = '当前：' + state.pattern.join('→');
}

// ========== 锁屏 ==========
function initLockScreen() {
  updateTime();
  setInterval(updateTime, 1000);
  initDots();
}
function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const elLockTime = $('lockTime');
  const elTopTime = $('topTime');
  if (elLockTime) elLockTime.textContent = h + ':' + m;
  if (elTopTime) elTopTime.textContent = h + ':' + m;
  const days = ['日','一','二','三','四','五','六'];
  const elLockDate = $('lockDate');
  if (elLockDate) elLockDate.textContent = now.getFullYear() + '年' + (now.getMonth()+1) + '月' + now.getDate() + '日 星期' + days[now.getDay()];
}
function initDots() {
  const dots = document.querySelectorAll('.unlock-dot');
  dots.forEach(function(dot) {
    dot.addEventListener('click', function() { handleDotClick(dot); });
    dot.addEventListener('dblclick', function() { showModal('patternModal'); });
  });
}
function handleDotClick(dot) {
  const idx = parseInt(dot.dataset.idx);
  state.unlockSequence.push(idx);
  dot.classList.add('active');
  setTimeout(function() { dot.classList.remove('active'); }, 300);
  if (state.unlockSequence.length >= state.pattern.length) {
    if (JSON.stringify(state.unlockSequence) === JSON.stringify(state.pattern)) {
      showModal('unlockModal');
    } else {
      document.querySelectorAll('.unlock-dot').forEach(function(d) { d.classList.add('error'); });
      setTimeout(function() {
        document.querySelectorAll('.unlock-dot').forEach(function(d) { d.classList.remove('error'); });
        state.unlockSequence = [];
      }, 400);
    }
  }
}
function enterMain() {
  hideModal('unlockModal');
  $('lockScreen').classList.add('hidden');
  $('mainPage').classList.add('active');
  state.unlockSequence = [];
  initAppGrid();
  startAnniversaryTimer();
  if (state.isPlaying) startMusicBar();
}

// ========== 图案设置 ==========
function savePattern() {
  if (state.tempPattern.length >= 3) {
    state.pattern = state.tempPattern.slice();
    saveAllData();
    toast('密码已保存');
    hideModal('patternModal');
    state.tempPattern = [];
    document.querySelectorAll('.pattern-dot').forEach(function(d) { d.classList.remove('selected'); });
    $('patternPreview').textContent = '当前：' + state.pattern.join('→');
  } else {
    toast('至少选择3个点');
  }
}
function cancelPattern() {
  state.tempPattern = [];
  document.querySelectorAll('.pattern-dot').forEach(function(d) { d.classList.remove('selected'); });
  hideModal('patternModal');
}
function initPatternDots() {
  document.querySelectorAll('.pattern-dot').forEach(function(dot) {
    dot.addEventListener('click', function() {
      const idx = parseInt(this.dataset.pidx);
      if (state.tempPattern.indexOf(idx) === -1) {
        state.tempPattern.push(idx);
        this.classList.add('selected');
        $('patternPreview').textContent = '当前：' + state.tempPattern.join('→');
      }
    });
  });
}

// ========== 文字编辑 ==========
function saveLockText() {
  const text = $('textInput').value.trim();
  const color = $('textColorPicker').value;
  if (text) {
    state.lockText = text;
    state.lockTextColor = color;
    $('lockTextDisplay').textContent = text;
    $('lockTextDisplay').style.color = color;
    saveAllData();
    toast('已保存');
  }
  hideModal('textEditModal');
}

// ========== 背景上传 ==========
function handleFileUpload(input, callback) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) { callback(e.target.result); };
  reader.readAsDataURL(file);
}
function initBgUploads() {
  $('lockBgUpload').addEventListener('change', function() {
    handleFileUpload(this, function(url) { state.lockBg = url; $('lockBgLayer').style.backgroundImage = 'url(' + url + ')'; });
  });
  $('mainBgUpload').addEventListener('change', function() {
    handleFileUpload(this, function(url) { state.mainBg = url; $('mainPage').style.backgroundImage = 'url(' + url + ')'; });
  });
  $('coupleBgUpload').addEventListener('change', function() {
    handleFileUpload(this, function(url) { state.coupleBg = url; $('coupleCardBg').style.backgroundImage = 'url(' + url + ')'; $('coupleHint').style.display = 'none'; });
  });
  $('playerCoverUpload').addEventListener('change', function() {
    handleFileUpload(this, function(url) { state.playerCover = url; $('playerCover').style.backgroundImage = 'url(' + url + ')'; $('playerCover').innerHTML = ''; });
  });
}

// ========== 头像上传 ==========
function uploadAvatar(side) {
  const input = $('avatarUpload');
  input.onchange = function() {
    handleFileUpload(this, function(url) {
      state[side] = url;
      updateAvatar(side, url);
      saveAllData();
    });
  };
  input.click();
}
function updateAvatar(side, url) {
  const el = $(side);
  const mainEl = side === 'avatarLeft' ? $('mainAvatarLeft') : $('mainAvatarRight');
  if (el) { el.style.backgroundImage = 'url(' + url + ')'; el.classList.add('has-img'); }
  if (mainEl) { mainEl.style.backgroundImage = 'url(' + url + ')'; mainEl.classList.add('has-img'); }
}

// ========== 昵称编辑 ==========
function editNick(which) {
  state.editingNick = which;
  $('nicknameInput').value = which === 'n1' ? state.nick1 : state.nick2;
  showModal('nicknameModal');
}
function saveNickname() {
  const val = $('nicknameInput').value.trim();
  if (val) {
    if (state.editingNick === 'n1') { state.nick1 = val; $('nick1').textContent = val; }
    else { state.nick2 = val; $('nick2').textContent = val; }
    saveAllData();
    toast('昵称已保存');
  }
  hideModal('nicknameModal');
}

// ========== 歌曲名编辑 ==========
function editSongName() { showModal('songNameModal'); }
function saveSongName() {
  const val = $('songNameInput').value.trim();
  if (val) { state.songName = val; $('songNameDisplay').textContent = val; saveAllData(); toast('歌曲名已保存'); }
  hideModal('songNameModal');
}

// ========== 播放器 ==========
function togglePlay() {
  state.isPlaying = !state.isPlaying;
  $('playBtn').className = state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
  if (state.isPlaying) startMusicBar(); else stopMusicBar();
}
function startMusicBar() {
  let w = 0; let dir = 1;
  state.musicInterval = setInterval(function() {
    w += dir * 2;
    if (w >= 100) dir = -1;
    if (w <= 0) dir = 1;
    $('playerFill').style.width = w + '%';
  }, 100);
}
function stopMusicBar() {
  if (state.musicInterval) clearInterval(state.musicInterval);
  $('playerFill').style.width = '0%';
}
function prevSong() {
  state.currentSongIndex = (state.currentSongIndex - 1 + state.songs.length) % state.songs.length;
  $('songNameDisplay').textContent = state.songs[state.currentSongIndex];
  saveAllData();
}
function nextSong() {
  state.currentSongIndex = (state.currentSongIndex + 1) % state.songs.length;
  $('songNameDisplay').textContent = state.songs[state.currentSongIndex];
  saveAllData();
}

// ========== 纪念日 ==========
function startAnniversaryTimer() {
  if (!state.anniversaryDate) {
    state.anniversaryDate = new Date().toISOString();
    saveAllData();
  }
  updateAnniversary();
  setInterval(updateAnniversary, 1000);
}
function updateAnniversary() {
  const start = new Date(state.anniversaryDate || new Date());
  const now = new Date();
  const diff = now - start;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  $('dayCount').textContent = days;
  $('hourCount').textContent = hours;
  $('minCount').textContent = mins;
  $('secCount').textContent = secs;
}

// ========== 主题 ==========
function showThemeModal() { showModal('themeModal'); }
function saveTheme() {
  state.theme = {
    bg: $('themeBgColor').value,
    icon: $('themeIconColor').value,
    text: $('themeTextColor').value,
  };
  applyTheme(state.theme);
  saveAllData();
  toast('主题已保存');
  hideModal('themeModal');
}
function applyTheme(t) {
  document.documentElement.style.setProperty('--icon-bg', t.bg);
  document.documentElement.style.setProperty('--icon-color', t.icon);
  document.documentElement.style.setProperty('--icon-text', t.text);
}

// ========== 应用网格滑动 ==========
function initAppGrid() {
  let startX = 0;
  const container = $('appGridContainer');
  container.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; });
  container.addEventListener('touchend', function(e) {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && state.currentPage < 2) state.currentPage++;
      else if (diff < 0 && state.currentPage > 0) state.currentPage--;
      updatePage();
    }
  });
}
function updatePage() {
  $('appGridContainer').style.transform = 'translateX(-' + (state.currentPage * 33.333) + '%)';
  document.querySelectorAll('.page-dot').forEach(function(d, i) { d.classList.toggle('active', i === state.currentPage); });
}

// ========== 拼字卡 ==========
function renderWordBank() {
  const bank = $('wordBank');
  if (!bank) return;
  bank.innerHTML = '';
  state.wordBank.forEach(function(word, i) {
    const chip = document.createElement('div');
    chip.className = 'word-chip';
    chip.textContent = word;
    chip.onclick = function() { addWordToDisplay(word, i); };
    bank.appendChild(chip);
  });
}
function addWordToDisplay(word, bankIdx) {
  state.wordDisplay.push(word);
  renderWordDisplay();
  const chips = $('wordBank').children;
  if (chips[bankIdx]) chips[bankIdx].classList.add('removed');
}
function renderWordDisplay() {
  const display = $('wordDisplay');
  if (!display) return;
  display.innerHTML = '';
  state.wordDisplay.forEach(function(word, i) {
    const chip = document.createElement('div');
    chip.className = 'word-chip in-display';
    chip.textContent = word;
    chip.onclick = function() { state.wordDisplay.splice(i, 1); renderWordDisplay(); renderWordBank(); };
    display.appendChild(chip);
  });
}
function addCustomWord() {
  const val = $('wordInput').value.trim();
  if (val) {
    state.wordBank.push(val);
    $('wordInput').value = '';
    renderWordBank();
    saveAllData();
  }
}
function shuffleWords() {
  for (let i = state.wordBank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = state.wordBank[i];
    state.wordBank[i] = state.wordBank[j];
    state.wordBank[j] = temp;
  }
  renderWordBank();
}
function clearWordDisplay() {
  state.wordDisplay = [];
  renderWordDisplay();
  renderWordBank();
}
function saveWordMessage() {
  if (state.wordDisplay.length === 0) { toast('请先拼出文字'); return; }
  const msg = state.wordDisplay.join('');
  state.savedMessages.push({ text: msg, time: new Date().toLocaleString() });
  saveAllData();
  $('savedMessageDisplay').textContent = '已保存：' + msg;
  toast('情话已保存');
}

// ========== 弹窗管理 ==========
function showModal(id) {
  const el = $(id);
  if (el) { el.classList.add('show'); }
  if (id === 'wordCardModal') { renderWordBank(); renderWordDisplay(); }
}
function hideModal(id) {
  const el = $(id);
  if (el) { el.classList.remove('show'); }
}

// ========== 备份与恢复 ==========
function backupAll() {
  const data = {};
  for (let key in state) { data[key] = state[key]; }
  data._exportTime = new Date().toISOString();
  data._version = '2.0';
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'love_backup_' + Date.now() + '.json';
  a.click();
  URL.revokeObjectURL(url);
  toast('备份已导出');
}
function triggerRestore() {
  $('restoreInput').click();
}
function initRestore() {
  $('restoreInput').addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = JSON.parse(e.target.result);
        for (let key in data) { if (state.hasOwnProperty(key)) state[key] = data[key]; }
        saveAllData();
        applyLoadedData();
        toast('数据已恢复');
      } catch {
        toast('文件格式错误');
      }
    };
    reader.readAsText(file);
  });
}

// ========== 通用App打开 ==========
function openApp(name) {
  const apps = {
    chat: { title: '💬 聊天', sub: '与梦角的私密对话', render: renderChat },
    album: { title: '📷 相册', sub: '珍藏美好瞬间', render: renderAlbum },
    companion: { title: '💕 陪伴', sub: '记录相伴时光', render: renderCompanion },
    music: { title: '🎵 音乐', sub: '心动旋律', render: renderMusicApp },
    games: { title: '🎮 小游戏', sub: '轻松一下', render: renderGames },
    letter: { title: '💌 信封', sub: '写给梦角的信', render: renderLetter },
    diary: { title: '📖 手账', sub: '记录每一天', render: renderDiary },
    checkin: { title: '👁️ 查岗', sub: '今日打卡', render: renderCheckin },
    create: { title: '✏️ 创作', sub: '灵感空间', render: renderCreate },
    gift: { title: '🛍️ 购物', sub: '心愿清单', render: renderGift },
    memo: { title: '📝 备忘录', sub: '待办事项', render: renderMemo },
    calendar: { title: '📅 日历', sub: '重要日子', render: renderCalendar },
    map: { title: '🗺️ 地图', sub: '足迹', render: renderMap },
    cochat: { title: '💭 共语', sub: '心灵对话', render: renderCochat },
    lottery: { title: '🎋 抽签', sub: '试试手气', render: renderLottery },
    fortune: { title: '🔮 占卜', sub: '今日运势', render: renderFortune },
    food: { title: '🍽️ 吃什么', sub: '解决选择困难', render: renderFood },
    decision: { title: '🎯 决策', sub: '让命运决定', render: renderDecision },
    weather: { title: '🌤️ 天气', sub: '查看天气', render: renderWeather },
    giftbox: { title: '🎁 礼物', sub: '惊喜推荐', render: renderGiftbox },
    camera: { title: '📸 相机', sub: '拍照留念', render: renderCamera },
    phone: { title: '📞 电话', sub: '装饰功能', render: renderPhone },
    moments: { title: '👥 朋友圈', sub: '分享动态', render: renderMoments },
    alarm: { title: '⏰ 闹钟', sub: '提醒事项', render: renderAlarm },
    lab: { title: '🔬 实验室', sub: '实验功能', render: renderLab },
    puzzle: { title: '🧩 拼图', sub: '趣味拼图', render: renderPuzzle },
    settings: { title: '⚙️ 设置', sub: '系统设置', render: renderSettings },
    dice: { title: '🎲 掷色子', sub: '试试运气', render: renderDice },
  };
  const app = apps[name];
  if (!app) { toast('功能开发中'); return; }
  $('appModalTitle').textContent = app.title;
  $('appModalSub').textContent = app.sub;
  $('appModalContent').innerHTML = '';
  app.render($('appModalContent'));
  showModal('appModal');
}

// ========== 各App渲染 ==========
function renderChat(container) {
  container.innerHTML = '<div class="chat-container"><div class="chat-messages" id="chatMsgArea"></div><div class="chat-input-wrap"><input type="text" id="chatInputBox" placeholder="输入消息..."><button onclick="sendChat()">➤</button></div></div>';
  setTimeout(function() {
    state.chatMessages.forEach(function(m) { appendChatBubble(m.text, m.isMe); });
  }, 0);
}
function sendChat() {
  const input = $('chatInputBox');
  const text = input.value.trim();
  if (!text) return;
  appendChatBubble(text, true);
  state.chatMessages.push({ text: text, isMe: true, time: Date.now() });
  saveAllData();
  input.value = '';
  const replies = ['我在听~', '真的吗？', '好呀', '我也想你', '抱抱', '❤', '继续说', '我在呢'];
  setTimeout(function() {
    const reply = replies[Math.floor(Math.random() * replies.length)];
    appendChatBubble(reply, false);
    state.chatMessages.push({ text: reply, isMe: false, time: Date.now() });
    saveAllData();
  }, 800 + Math.random() * 1500);
}
function appendChatBubble(text, isMe) {
  const area = $('chatMsgArea');
  if (!area) return;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble ' + (isMe ? 'right' : 'left');
  bubble.textContent = text;
  area.appendChild(bubble);
  area.scrollTop = area.scrollHeight;
}

function renderAlbum(container) {
  let html = '<div class="photo-grid" id="photoGrid"></div><input type="file" id="photoUpload" accept="image/*" multiple style="display:none;"><button class="btn-primary" style="width:100%;margin-top:8px;" onclick="uploadPhoto()">📷 添加照片</button>';
  container.innerHTML = html;
  setTimeout(function() {
    const grid = $('photoGrid');
    state.photoList.forEach(function(url, i) {
      const item = document.createElement('div');
      item.className = 'photo-item';
      item.style.backgroundImage = 'url(' + url + ')';
      item.innerHTML = '<div class="photo-del" onclick="deletePhoto(' + i + ')">×</div>';
      grid.appendChild(item);
    });
    const upload = document.createElement('div');
    upload.className = 'photo-upload';
    upload.innerHTML = '+';
    upload.onclick = uploadPhoto;
    grid.appendChild(upload);
  }, 0);
}
function uploadPhoto() {
  const input = $('photoUpload');
  input.onchange = function() {
    Array.from(this.files).forEach(function(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        state.photoList.push(e.target.result);
        saveAllData();
        openApp('album');
      };
      reader.readAsDataURL(file);
    });
  };
  input.click();
}
function deletePhoto(idx) {
  state.photoList.splice(idx, 1);
  saveAllData();
  openApp('album');
}

function renderCompanion(container) {
  const days = state.anniversaryDate ? Math.floor((Date.now() - new Date(state.anniversaryDate)) / 86400000) : 0;
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">💕</div><div style="font-size:18px;color:var(--accent);margin-bottom:8px;">已相伴</div><div style="font-size:36px;font-weight:700;">' + days + ' 天</div><div style="margin-top:20px;font-size:14px;color:var(--text-dim);">每一天都是特别的礼物</div></div>';
}

function renderMusicApp(container) {
  let html = '<div style="text-align:center;padding:20px 0;">';
  state.songs.forEach(function(song, i) {
    const bg = i === state.currentSongIndex ? 'var(--accent)' : 'var(--glass)';
    const icon = i === state.currentSongIndex ? '▶ ' : '　';
    html += '<div style="padding:12px;border-radius:12px;margin-bottom:8px;background:' + bg + ';cursor:pointer;" onclick="playSong(' + i + ')">' + icon + song + '</div>';
  });
  html += '</div>';
  container.innerHTML = html;
}
function playSong(idx) {
  state.currentSongIndex = idx;
  $('songNameDisplay').textContent = state.songs[idx];
  saveAllData();
  openApp('music');
}

function renderGames(container) {
  container.innerHTML = '<div class="grid-3"><div class="tool-item" onclick="openApp('dice')"><i class="fa fa-diamond"></i><span>掷色子</span></div><div class="tool-item" onclick="openApp('puzzle')"><i class="fa fa-puzzle-piece"></i><span>拼图</span></div><div class="tool-item" onclick="openApp('lottery')"><i class="fa fa-ticket"></i><span>抽签</span></div></div>';
}

function renderLetter(container) {
  const letters = [
    '亲爱的，今天也很想你。

每一天醒来，第一个想到的就是你。希望你今天过得开心，记得按时吃饭。',
    '嗨~

不知道你现在在做什么，但我相信我们心意相通。期待下次见面！',
    '致最爱的你：

感谢你出现在我的生命里，让每一天都变得闪闪发光。',
  ];
  const letter = letters[Math.floor(Math.random() * letters.length)];
  container.innerHTML = '<div class="letter-container"><div class="letter-envelope" onclick="this.style.transform='translateY(-20px)';setTimeout(function(){$('letterText').style.opacity=1},300)"></div><div class="letter-text" id="letterText" style="opacity:0;transition:opacity 0.5s;">' + letter.replace(/
/g, '<br>') + '</div></div>';
}

function renderDiary(container) {
  container.innerHTML = '<div class="diary-list" id="diaryList"></div><textarea class="diary-input" id="diaryText" placeholder="写下今天的心情..."></textarea><button class="btn-primary" style="width:100%;" onclick="saveDiary()">保存日记</button>';
  setTimeout(function() {
    const list = $('diaryList');
    state.diaryList.forEach(function(d) {
      const entry = document.createElement('div');
      entry.className = 'diary-entry';
      entry.innerHTML = '<div class="date">' + d.date + '</div><div class="content">' + d.text + '</div>';
      list.appendChild(entry);
    });
  }, 0);
}
function saveDiary() {
  const text = $('diaryText').value.trim();
  if (!text) { toast('请输入内容'); return; }
  state.diaryList.unshift({ text: text, date: new Date().toLocaleString() });
  saveAllData();
  toast('日记已保存');
  openApp('diary');
}

function renderCheckin(container) {
  const today = new Date().toDateString();
  const checked = state.lastCheckin === today;
  const btnText = checked ? '已完成' : '打卡';
  const disabled = checked ? 'disabled' : '';
  const streak = state.checkinStreak || 0;
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">' + (checked ? '✅' : '📍') + '</div><div style="font-size:18px;margin-bottom:8px;">' + (checked ? '今日已打卡' : '今日未打卡') + '</div><button class="btn-primary" style="width:200px;" ' + disabled + ' onclick="doCheckin()">' + btnText + '</button><div style="margin-top:20px;font-size:14px;color:var(--text-dim);">连续打卡：<span style="color:var(--accent);font-weight:700;">' + streak + '</span> 天</div></div>';
}
function doCheckin() {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (state.lastCheckin === yesterday) state.checkinStreak = (state.checkinStreak || 0) + 1;
  else state.checkinStreak = 1;
  state.lastCheckin = today;
  saveAllData();
  toast('打卡成功！');
  openApp('checkin');
}

function renderCreate(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:48px;margin-bottom:16px;">✨</div><div style="font-size:16px;color:var(--text-dim);">创作功能即将上线<br>敬请期待</div></div>';
}

function renderGift(container) {
  container.innerHTML = '<div style="text-align:center;padding:20px 0;"><div style="font-size:14px;color:var(--text-dim);margin-bottom:16px;">心愿清单</div><div id="wishList"></div><div style="display:flex;gap:8px;margin-top:16px;"><input type="text" id="wishInput" placeholder="添加心愿..." style="flex:1;padding:10px 14px;border-radius:12px;border:2px solid var(--glass-border);background:var(--glass);color:var(--text);outline:none;"><button class="btn-secondary" onclick="addWish()">添加</button></div></div>';
  setTimeout(function() {
    const list = $('wishList');
    (state.wishList || []).forEach(function(w, i) {
      const item = document.createElement('div');
      item.style.cssText = 'padding:10px 14px;background:var(--glass);border-radius:12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;';
      item.innerHTML = '<span>' + w + '</span><span style="color:var(--accent);cursor:pointer;" onclick="deleteWish(' + i + ')">删除</span>';
      list.appendChild(item);
    });
  }, 0);
}
function addWish() {
  const val = $('wishInput').value.trim();
  if (!val) return;
  if (!state.wishList) state.wishList = [];
  state.wishList.push(val);
  saveAllData();
  openApp('gift');
}
function deleteWish(i) {
  state.wishList.splice(i, 1);
  saveAllData();
  openApp('gift');
}

function renderMemo(container) {
  container.innerHTML = '<div class="memo-list" id="memoListArea"></div><div class="memo-input-wrap"><input type="text" id="memoInput" placeholder="添加待办..."><button class="btn-secondary" onclick="addMemo()">添加</button></div>';
  setTimeout(function() {
    const list = $('memoListArea');
    state.memoList.forEach(function(m, i) {
      const item = document.createElement('div');
      item.className = 'memo-item';
      const checked = m.done ? 'checked' : '';
      const doneClass = m.done ? 'done' : '';
      item.innerHTML = '<input type="checkbox" ' + checked + ' onchange="toggleMemo(' + i + ')"><span class="' + doneClass + '">' + m.text + '</span><span class="memo-del" onclick="deleteMemo(' + i + ')">×</span>';
      list.appendChild(item);
    });
  }, 0);
}
function addMemo() {
  const val = $('memoInput').value.trim();
  if (!val) return;
  state.memoList.push({ text: val, done: false });
  saveAllData();
  openApp('memo');
}
function toggleMemo(i) {
  state.memoList[i].done = !state.memoList[i].done;
  saveAllData();
  openApp('memo');
}
function deleteMemo(i) {
  state.memoList.splice(i, 1);
  saveAllData();
  openApp('memo');
}

function renderCalendar(container) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  let html = '<div class="calendar-nav"><button>‹</button><span>' + year + '年' + (month + 1) + '月</span><button>›</button></div>';
  html += '<div class="calendar-grid">';
  '日一二三四五六'.split('').forEach(function(d) { html += '<div class="day-header">' + d + '</div>'; });
  for (let i = firstDay - 1; i >= 0; i--) {
    html += '<div class="day-cell other-month">' + (daysInPrevMonth - i) + '</div>';
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === now.getDate();
    html += '<div class="day-cell ' + (isToday ? 'today' : '') + '">' + d + '</div>';
  }
  html += '</div>';
  container.innerHTML = html;
}

function renderMap(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">🗺️</div><div style="font-size:16px;color:var(--text-dim);">地图功能需要定位权限<br>当前为演示模式</div><div style="margin-top:20px;padding:20px;background:var(--glass);border-radius:16px;"><div style="font-size:14px;margin-bottom:8px;">📍 当前位置：未知</div><div style="font-size:12px;color:var(--text-dim);">点击记录足迹</div></div></div>';
}

function renderCochat(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">💭</div><div style="font-size:16px;color:var(--text-dim);line-height:2;">闭上眼睛，深呼吸<br>在心里默念你想说的话<br><br><em style="color:var(--accent);">我相信，ta 一定能感受到</em></div></div>';
}

function renderLottery(container) {
  container.innerHTML = '<div class="lottery-container"><div class="lottery-stick" onclick="drawLottery()"></div><div class="lottery-result" id="lotteryResult"></div><div class="lottery-desc" id="lotteryDesc"></div></div>';
}
function drawLottery() {
  const results = [
    { level: '大吉', desc: '万事顺遂，心想事成' },
    { level: '中吉', desc: '好运连连，贵人相助' },
    { level: '小吉', desc: '平稳顺利，小有收获' },
    { level: '吉', desc: '平平淡淡，安安稳稳' },
    { level: '末吉', desc: '虽有波折，终能化解' },
    { level: '凶', desc: '谨慎行事，静待时机' },
  ];
  const stick = document.querySelector('.lottery-stick');
  stick.style.transform = 'translateY(-30px)';
  setTimeout(function() {
    stick.style.transform = 'translateY(0)';
    const r = results[Math.floor(Math.random() * results.length)];
    $('lotteryResult').textContent = r.level;
    $('lotteryResult').style.color = r.level === '凶' ? '#ff4444' : 'var(--accent)';
    $('lotteryDesc').textContent = r.desc;
  }, 500);
}

function renderFortune(container) {
  container.innerHTML = '<div style="text-align:center;padding:20px 0;"><div class="fortune-wheel" id="fortuneWheel" onclick="spinFortune()"><div class="fortune-center">运</div></div><div style="font-size:18px;color:var(--accent);font-weight:600;min-height:30px;" id="fortuneResult"></div><div style="font-size:13px;color:var(--text-dim);" id="fortuneDesc"></div></div>';
}
function spinFortune() {
  const wheel = $('fortuneWheel');
  const deg = 1800 + Math.floor(Math.random() * 360);
  wheel.style.transform = 'rotate(' + deg + 'deg)';
  const results = ['大吉','中吉','小吉','平','小凶','凶'];
  const descs = ['鸿运当头！','好事将近~','顺顺利利','平平淡淡才是真','小心为上','注意身体'];
  const idx = Math.floor((deg % 360) / 60);
  setTimeout(function() {
    $('fortuneResult').textContent = results[idx];
    $('fortuneDesc').textContent = descs[idx];
  }, 3000);
}

function renderFood(container) {
  const foods = ['火锅','烧烤','日料','韩餐','披萨','汉堡','沙拉','面条','饺子','粥','甜品','奶茶','炸鸡','寿司','麻辣烫','烤鱼','牛排','意面','三明治','煎饼'];
  let html = '<div style="text-align:center;margin-bottom:16px;"><div style="font-size:14px;color:var(--text-dim);">不知道吃什么？点一点！</div></div>';
  html += '<div class="food-roulette">';
  foods.forEach(function(f) { html += '<div class="food-item" onclick="selectFood(this)">' + f + '</div>'; });
  html += '</div><div style="text-align:center;margin-top:16px;font-size:18px;color:var(--accent);font-weight:600;min-height:30px;" id="foodResult"></div>';
  container.innerHTML = html;
}
function selectFood(el) {
  document.querySelectorAll('.food-item').forEach(function(f) { f.classList.remove('selected'); });
  el.classList.add('selected');
  $('foodResult').textContent = '今天吃 ' + el.textContent + ' 吧！';
}

function renderDecision(container) {
  container.innerHTML = '<div style="text-align:center;padding:20px 0;"><div class="decision-wheel" id="decisionWheel" onclick="spinDecision()">?</div><div style="margin-top:16px;"><input type="text" id="decisionInput" placeholder="输入选项，用逗号分隔" style="width:100%;padding:10px 14px;border-radius:12px;border:2px solid var(--glass-border);background:var(--glass);color:var(--text);outline:none;"></div><div style="text-align:center;margin-top:16px;font-size:18px;color:var(--accent);font-weight:600;min-height:30px;" id="decisionResult"></div></div>';
}
function spinDecision() {
  const input = $('decisionInput').value.trim();
  const options = input ? input.split(/[,，]/).map(function(s) { return s.trim(); }).filter(function(s) { return s; }) : ['是','否','再想想'];
  const wheel = $('decisionWheel');
  wheel.classList.add('spinning');
  setTimeout(function() {
    wheel.classList.remove('spinning');
    $('decisionResult').textContent = '结果：' + options[Math.floor(Math.random() * options.length)];
  }, 1500);
}

function renderWeather(container) {
  container.innerHTML = '<div class="weather-display"><div class="weather-icon" id="weatherIcon">☀️</div><div class="weather-temp" id="weatherTemp">26°C</div><div class="weather-desc" id="weatherDesc">晴朗 · 适宜出行</div><div class="weather-city-input"><input type="text" id="weatherCity" placeholder="输入城市"><button class="btn-secondary" onclick="queryWeather()">查询</button></div></div>';
}
function queryWeather() {
  const city = $('weatherCity').value.trim();
  if (!city) { toast('请输入城市'); return; }
  const weathers = [
    { icon: '☀️', temp: '28°C', desc: '晴朗 · 心情也要晴朗' },
    { icon: '⛅', temp: '24°C', desc: '多云 · 适合散步' },
    { icon: '🌧️', temp: '20°C', desc: '小雨 · 记得带伞' },
    { icon: '⛈️', temp: '18°C', desc: '雷阵雨 · 注意安全' },
    { icon: '❄️', temp: '5°C', desc: '下雪 · 注意保暖' },
  ];
  const w = weathers[Math.floor(Math.random() * weathers.length)];
  $('weatherIcon').textContent = w.icon;
  $('weatherTemp').textContent = w.temp;
  $('weatherDesc').textContent = city + ' · ' + w.desc;
}

function renderGiftbox(container) {
  const gifts = [
    { icon: '🌹', name: '玫瑰' }, { icon: '🍫', name: '巧克力' },
    { icon: '🧸', name: '玩偶' }, { icon: '💍', name: '戒指' },
    { icon: '📿', name: '手链' }, { icon: '🎀', name: '发饰' },
    { icon: '📚', name: '书籍' }, { icon: '🎨', name: '画作' },
    { icon: '🎵', name: '音乐盒' },
  ];
  let html = '<div style="text-align:center;margin-bottom:16px;font-size:14px;color:var(--text-dim);">点击拆开礼物</div>';
  html += '<div class="gift-grid">';
  gifts.forEach(function(g, i) {
    html += '<div class="gift-item" onclick="openGift(this)"><div>' + g.icon + '</div><span>' + g.name + '</span></div>';
  });
  html += '</div><div style="text-align:center;margin-top:16px;font-size:16px;color:var(--accent);min-height:24px;" id="giftResult"></div>';
  container.innerHTML = html;
}
function openGift(el) {
  const messages = ['这是一份满满的心意 ❤', '希望你喜欢这份惊喜 ✨', '最好的礼物就是遇见你 💕', '愿这份礼物带给你快乐 🌟'];
  el.style.transform = 'scale(1.2)';
  el.style.background = 'var(--accent)';
  setTimeout(function() {
    el.style.transform = 'scale(1)';
    $('giftResult').textContent = messages[Math.floor(Math.random() * messages.length)];
  }, 300);
}

function renderCamera(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">📸</div><div style="font-size:16px;color:var(--text-dim);">相机功能为装饰<br>请使用系统相机拍照</div><button class="btn-primary" style="margin-top:20px;width:200px;" onclick="toast('已保存到相册')">模拟拍照</button></div>';
}

function renderPhone(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">📞</div><div style="font-size:16px;color:var(--text-dim);">电话功能为装饰<br>不具备实际通话能力</div></div>';
}

function renderMoments(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">👥</div><div style="font-size:16px;color:var(--text-dim);">朋友圈功能开发中<br>敬请期待</div></div>';
}

function renderAlarm(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">⏰</div><div style="font-size:16px;color:var(--text-dim);">闹钟功能开发中<br>请使用手机自带闹钟</div></div>';
}

function renderLab(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">🔬</div><div style="font-size:16px;color:var(--text-dim);">实验室功能开发中<br>这里将放置实验性功能</div></div>';
}

function renderPuzzle(container) {
  container.innerHTML = '<div style="text-align:center;padding:40px 0;"><div style="font-size:60px;margin-bottom:16px;">🧩</div><div style="font-size:16px;color:var(--text-dim);">拼图游戏开发中<br>敬请期待</div></div>';
}

function renderSettings(container) {
  container.innerHTML = '<div class="settings-list"><div class="settings-item" onclick="showModal('patternModal')"><span>🔐 修改解锁密码</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="showModal('textEditModal')"><span>✏️ 锁屏文字</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="showModal('lockBgModal')"><span>🖼️ 锁屏背景</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="showModal('mainBgModal')"><span>🖼️ 主界面背景</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="showModal('coupleBgModal')"><span>🖼️ 卡片背景</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="showThemeModal()"><span>🎨 主题颜色</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="backupAll()"><span>💾 导出备份</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="triggerRestore()"><span>📂 恢复备份</span><i class="fa fa-chevron-right"></i></div><div class="settings-item" onclick="clearAllData()"><span>🗑️ 清除所有数据</span><i class="fa fa-chevron-right"></i></div></div>';
}

function renderDice(container) {
  container.innerHTML = '<div style="text-align:center;padding:20px 0;"><div class="dice-container"><div class="dice" id="dice1">?</div><div class="dice" id="dice2">?</div></div><button class="btn-primary" style="width:200px;" onclick="rollDice()">掷色子</button><div style="text-align:center;margin-top:16px;font-size:18px;color:var(--accent);font-weight:600;min-height:30px;" id="diceResult"></div></div>';
}
function rollDice() {
  const d1 = $('dice1'), d2 = $('dice2');
  d1.classList.add('rolling'); d2.classList.add('rolling');
  setTimeout(function() {
    d1.classList.remove('rolling'); d2.classList.remove('rolling');
    const v1 = Math.floor(Math.random() * 6) + 1;
    const v2 = Math.floor(Math.random() * 6) + 1;
    d1.textContent = v1; d2.textContent = v2;
    $('diceResult').textContent = '点数：' + (v1 + v2) + ' 点';
  }, 600);
}

function clearAllData() {
  if (!confirm('确定要清除所有数据吗？此操作不可恢复！')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ========== 初始化：所有事件绑定在这里完成 ==========
function initAll() {
  // 加载数据
  loadAllData();
  applyLoadedData();

  // 锁屏
  initLockScreen();

  // 按钮事件绑定
  $('enterMainBtn').onclick = enterMain;
  $('patternSave').onclick = savePattern;
  $('patternCancel').onclick = cancelPattern;
  $('textEditSave').onclick = saveLockText;
  $('textEditCancel').onclick = function() { hideModal('textEditModal'); };
  $('lockBgSave').onclick = function() { saveAllData(); toast('锁屏背景已保存'); hideModal('lockBgModal'); };
  $('mainBgSave').onclick = function() { saveAllData(); toast('主界面背景已保存'); hideModal('mainBgModal'); };
  $('coupleBgSave').onclick = function() { saveAllData(); toast('卡片背景已保存'); hideModal('coupleBgModal'); };
  $('playerCoverSave').onclick = function() { saveAllData(); toast('封面已保存'); hideModal('playerCoverModal'); };
  $('lockBgCancel').onclick = function() { hideModal('lockBgModal'); };
  $('mainBgCancel').onclick = function() { hideModal('mainBgModal'); };
  $('coupleBgCancel').onclick = function() { hideModal('coupleBgModal'); };
  $('playerCoverCancel').onclick = function() { hideModal('playerCoverModal'); };
  $('nickSave').onclick = saveNickname;
  $('nickCancel').onclick = function() { hideModal('nicknameModal'); };
  $('songNameSave').onclick = saveSongName;
  $('themeSaveBtn').onclick = saveTheme;

  // 图案点初始化
  initPatternDots();

  // 背景上传初始化
  initBgUploads();

  // 恢复备份初始化
  initRestore();
}

window.onload = initAll;
