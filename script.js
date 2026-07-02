/* ===== 全局状态 ===== */
const state = {
  theme: 'light',
  lockPattern: [],
  tempPattern: [],
  isSettingPattern: false,
  currentPage: 0,
  isPlaying: false,
  currentSong: 0,
  songs: ['心动旋律', '星空下的约定', '温柔的风', '夏日气泡'],
  nicknames: { n1: '我', n2: '梦角' },
  anniversary: new Date('2024-01-01'),
  chatMessages: [],
  wordCards: {
    main: ['早安','晚安','想你','抱抱','亲亲','在干嘛','吃饭了吗','好梦','爱你','笨蛋','小可爱','大笨蛋','乖','听话','别闹','回来','等你','别走','留下','一起','永远','心动','喜欢','思念','牵挂','守护','陪伴','温柔','甜蜜','浪漫'],
    kaomoji: ['(｡♥‿♥｡)','(づ｡◕‿‿◕｡)づ','(´｡• ᵕ •｡`)','♡( ◡‿◡ )','(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧','(*^‿^*)','(◕‿◕✿)','(｡◕‿◕｡)','♪(´▽｀)','(｡･ω･｡)ﾉ♡'],
    emoji: ['😊','😘','🥰','😍','🤗','😚','😙','😋','🤭','😌','😴','🥺','😢','😭','😤','😠','😡','🤬','😳','🥵'],
    stickers: ['🐱','🐶','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐙','🦄','🐝']
  },
  selectedWordCards: [],
  currentWordTab: 'main',
  stickers: {
    me: ['😊','😘','🥰','😍','🤗','😚','😙','😋','🤭','😌','😴','🥺'],
    partner: ['🐱','🐶','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸'],
    pat: ['👋','✋','🖐️','👐','🙌','👏','🤝','👍','👎','✊','👊','🤛']
  },
  currentStickerTab: 'me',
  sessions: [
    { id: 1, name: '梦角', avatar: '', preview: '一会去另一边出现吧，我准备点个饭了', time: '17:03', unread: 0 },
    { id: 2, name: '群聊', avatar: '', preview: '今天天气真好', time: '16:30', unread: 3 }
  ],
  currentSession: 1,
  settings: {
    reply: true, typing: true, readReceipt: true, enterSend: true,
    timestamp: true, sound: true, immersive: false, dockTidy: true,
    topBarClear: false, messageSpeed: 6, interval: 4, activeProb: 50,
    reportProb: 50, discoverProb: 50, letterInterval: 1, volume: 50, nightMode: false
  },
  storage: { chat: 85.81, settings: 188.67, media: 14.76 },
  calendarEvents: {},
  todos: [],
  habits: [],
  anniversaries: [
    { name: '我的生日', date: '2004-08-29', type: '纪念' },
    { name: '小鱼生日', date: '2001-03-06', type: '纪念' },
    { name: '初遇日', date: '2025-11-23', type: '纪念' }
  ],
  letters: {
    sent: [],
    received: [
      { id: 1, date: '7/1 08:42', content: 'sorry宝宝我好像没有认出来，但是我昨天睡...', isNew: true },
      { id: 2, date: '6/30 13:18', content: '你就是全世界最好的。老婆，我没受...', isNew: false }
    ],
    timeSpace: []
  },
  fishRecords: [
    { location: '卧室', duration: '6h', date: '2026-07-02', remaining: '剩余工作时间 3小时44分钟' },
    { time: '16:40:22', activity: '写信' },
    { time: '18:30:25', activity: '采风' }
  ],
  fortuneHistory: [],
  moodRecords: {},
  accounts: [],
  shopItems: [
    { name: '纯棉白衬衫', desc: '100%新疆长绒棉，亲肤透气', tags: ['衣物','新品'], price: 129 },
    { name: '连帽卫衣', desc: '加绒加厚，宽松版型', tags: ['衣物','热销'], price: 169 },
    { name: '真丝睡裙', desc: '桑蚕丝面料，丝滑触感', tags: ['衣物','新品'], price: 299 },
    { name: '情侣拖鞋', desc: '居家必备，防滑底', tags: ['居家','热销'], price: 59 }
  ],
  gifts: [
    { name: '芒果', price: 22, date: '6/27 15:59' },
    { name: '项链吊坠', price: 158, date: '6/27 21:36' },
    { name: '情侣对戒', price: 199, date: '6/27 21:35' },
    { name: '薯片大礼包', price: 25, date: '6/26 21:31' },
    { name: '手链', price: 89, date: '6/26 21:30' }
  ],
  moments: [
    { id: 1, name: '梦角', avatar: '', time: '7分钟前', content: '宝宝你好漂亮啊>_< 聊天记录是三万行情书。我生气了好久不见', image: '', likes: 12, comments: 3 },
    { id: 2, name: '梦角', avatar: '', time: '27分钟前', content: '如果我说是呢他们不错我还以为你又消失不见了呢就算在不同世界，我们依然渴望一次次触及彼此别看抖音了', image: '', likes: 8, comments: 1 }
  ],
  visitorRecords: [
    { name: '梦角', avatar: '', date: '6月30日', time: '2天前' }
  ],
  mapLocations: [
    { name: '客厅', icon: 'fa-home', active: false },
    { name: '卧室', icon: 'fa-bed', active: true },
    { name: '厨房', icon: 'fa-cutlery', active: false },
    { name: '阳台', icon: 'fa-sun-o', active: false }
  ],
  wordBank: ['我','爱','你','想','念','在','等','盼','望','牵','手','拥','抱','亲','吻','心','动','情','深','缘','分','遇','见','相','思','守','护','陪','伴','永','远','一','生','世','界','星','月','日','夜','梦','幻','美','好','甜','蜜','温','柔','浪','漫','幸','福','快','乐','安','康','吉','祥','如','意','欢','喜','心','悦','珍','惜','宝','贝','亲','爱','的','小','可','人','儿','呀','呢','吧','吗','哦','哈','嘿','嘻','呜','喵','汪','啾','咩','哞','嘎','呱','吱','嗡','叮','咚','哗','啦','呼','噜','咕','叽','哩','呱','啦','噼','里','啪','啦'],
  currentWordDisplay: [],
  savedWordMessages: [],
  themeColors: { bg: '#ffffff', icon: '#3a4a6b', text: '#e5e7eb' }
};

/* ===== 工具函数 ===== */
function $(id) { return document.getElementById(id); }
function showToast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2000); }
function showModal(id) { const el = $(id); if(el) el.classList.add('active'); }
function hideModal(id) { const el = $(id); if(el) el.classList.remove('active'); }
function formatDate(d) {
  const days = ['日','一','二','三','四','五','六'];
  return `${d.getFullYear()}年${String(d.getMonth()+1).padStart(2,'0')}月${String(d.getDate()).padStart(2,'0')}日 星期${days[d.getDay()]}`;
}
function formatTime(d) { return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
function saveData() { localStorage.setItem('loveAppData', JSON.stringify(state)); }
function loadData() {
  const data = localStorage.getItem('loveAppData');
  if (data) { try { Object.assign(state, JSON.parse(data)); } catch(e) {} }
}
function escapeHtml(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; }

/* ===== 锁屏 ===== */
let patternInput = [];
function initLockScreen() {
  updateLockTime();
  setInterval(updateLockTime, 1000);
  document.querySelectorAll('.unlock-dot').forEach(dot => {
    dot.addEventListener('click', () => handleDotClick(parseInt(dot.dataset.idx)));
    dot.addEventListener('dblclick', () => {
      state.isSettingPattern = true; state.tempPattern = [];
      showModal('patternModal'); updatePatternPreview();
    });
  });
}

function updateLockTime() {
  const now = new Date();
  const t = $('lockTime'); if(t) t.textContent = formatTime(now);
  const d = $('lockDate'); if(d) d.textContent = formatDate(now);
  const top = $('topTime'); if(top) top.textContent = formatTime(now);
}

function handleDotClick(idx) {
  if (state.isSettingPattern) return;
  patternInput.push(idx);
  const dot = document.querySelector(`.unlock-dot[data-idx="${idx}"]`);
  if(dot) { dot.classList.add('active'); setTimeout(() => dot.classList.remove('active'), 300); }
  if (patternInput.length >= 3) {
    if (state.lockPattern.length === 0 || arraysEqual(patternInput, state.lockPattern)) {
      showModal('unlockModal'); patternInput = [];
    } else {
      showToast('密码错误，请重试'); patternInput = [];
      document.querySelectorAll('.unlock-dot').forEach(d => d.classList.remove('active'));
    }
  }
}

function arraysEqual(a, b) { return a.length === b.length && a.every((v, i) => v === b[i]); }

function initPatternModal() {
  document.querySelectorAll('.pattern-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.pidx);
      if (!state.tempPattern.includes(idx)) {
        state.tempPattern.push(idx);
        dot.style.background = 'var(--primary)'; dot.style.color = '#fff';
        updatePatternPreview();
      }
    });
  });
  const saveBtn = $('patternSave');
  if(saveBtn) saveBtn.addEventListener('click', () => {
    if (state.tempPattern.length < 3) { showToast('至少选择3个点'); return; }
    state.lockPattern = [...state.tempPattern]; state.isSettingPattern = false;
    saveData(); hideModal('patternModal'); showToast('密码设置成功');
    document.querySelectorAll('.pattern-dot').forEach(d => { d.style.background = ''; d.style.color = ''; });
  });
  const cancelBtn = $('patternCancel');
  if(cancelBtn) cancelBtn.addEventListener('click', () => {
    state.isSettingPattern = false; state.tempPattern = []; hideModal('patternModal');
    document.querySelectorAll('.pattern-dot').forEach(d => { d.style.background = ''; d.style.color = ''; });
  });
}

function updatePatternPreview() {
  const p = $('patternPreview'); if(p) p.textContent = state.tempPattern.length > 0 ? '当前：' + state.tempPattern.join('→') : '点击圆点设置顺序';
}

/* ===== 主界面 ===== */
function initMainPage() {
  const enterBtn = $('enterMainBtn');
  if(enterBtn) enterBtn.addEventListener('click', () => {
    hideModal('unlockModal');
    const ls = $('lockScreen'); if(ls) ls.classList.add('hidden');
    const mp = $('mainPage'); if(mp) mp.classList.add('active');
    updateAnniversary(); setInterval(updateAnniversary, 1000);
  });

  let startX = 0;
  const gridWrap = $('appGridContainer');
  if(gridWrap) {
    gridWrap.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    gridWrap.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && state.currentPage < 2) state.currentPage++;
        else if (diff < 0 && state.currentPage > 0) state.currentPage--;
        updatePageIndicator();
      }
    });
  }

  const playBtn = $('playBtn');
  if(playBtn) playBtn.addEventListener('click', togglePlay);

  const themeSave = $('themeSaveBtn');
  if(themeSave) themeSave.addEventListener('click', saveTheme);

  const ns = $('nickSave');
  if(ns) ns.addEventListener('click', () => {
    state.nicknames[state.currentNick] = $('nicknameInput').value;
    const n1 = $('nick1'); if(n1 && state.currentNick === 'n1') n1.textContent = state.nicknames.n1;
    const n2 = $('nick2'); if(n2 && state.currentNick === 'n2') n2.textContent = state.nicknames.n2;
    saveData(); hideModal('nicknameModal');
  });
  const nc = $('nickCancel');
  if(nc) nc.addEventListener('click', () => hideModal('nicknameModal'));

  const tes = $('textEditSave');
  if(tes) tes.addEventListener('click', () => {
    const text = $('textInput'); const color = $('textColorPicker');
    const ltd = $('lockTextDisplay');
    if(ltd) { ltd.textContent = text?.value || '❤ 心动信号 ❤'; if(color) ltd.style.color = color.value; }
    saveData(); hideModal('textEditModal');
  });
  const tec = $('textEditCancel');
  if(tec) tec.addEventListener('click', () => hideModal('textEditModal'));

  const sns = $('songNameSave');
  if(sns) sns.addEventListener('click', () => {
    const input = $('songNameInput');
    if(input && input.value) { state.songs[state.currentSong] = input.value; const snd = $('songNameDisplay'); if(snd) snd.textContent = input.value; saveData(); }
    hideModal('songNameModal');
  });
}

function updatePageIndicator() {
  const gc = $('appGridContainer'); if(gc) gc.style.transform = `translateX(-${state.currentPage * 100}%)`;
  document.querySelectorAll('.page-dot').forEach((d, i) => d.classList.toggle('active', i === state.currentPage));
}

function updateAnniversary() {
  const now = new Date();
  const diff = now - new Date(state.anniversary);
  const dc = $('dayCount'); if(dc) dc.textContent = Math.floor(diff / 86400000);
  const hc = $('hourCount'); if(hc) hc.textContent = Math.floor((diff % 86400000) / 3600000);
  const mc = $('minCount'); if(mc) mc.textContent = Math.floor((diff % 3600000) / 60000);
  const sc = $('secCount'); if(sc) sc.textContent = Math.floor((diff % 60000) / 1000);
}

function togglePlay() {
  state.isPlaying = !state.isPlaying;
  const pb = $('playBtn'); if(pb) pb.className = state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
  if (state.isPlaying) {
    let progress = 30;
    state.playInterval = setInterval(() => {
      progress += 0.5;
      if (progress > 100) { progress = 0; nextSong(); }
      const pf = $('playerFill'); if(pf) pf.style.width = progress + '%';
    }, 1000);
  } else { clearInterval(state.playInterval); }
}

function prevSong() {
  state.currentSong = (state.currentSong - 1 + state.songs.length) % state.songs.length;
  const snd = $('songNameDisplay'); if(snd) snd.textContent = state.songs[state.currentSong];
  const pf = $('playerFill'); if(pf) pf.style.width = '0%';
}

function nextSong() {
  state.currentSong = (state.currentSong + 1) % state.songs.length;
  const snd = $('songNameDisplay'); if(snd) snd.textContent = state.songs[state.currentSong];
  const pf = $('playerFill'); if(pf) pf.style.width = '0%';
}

function editNick(which) {
  state.currentNick = which;
  const input = $('nicknameInput'); if(input) input.value = state.nicknames[which];
  showModal('nicknameModal');
}

function showThemeModal() { showModal('themeModal'); }

function saveTheme() {
  const tbg = $('themeBgColor'); const tic = $('themeIconColor'); const ttc = $('themeTextColor');
  if(tbg) state.themeColors.bg = tbg.value;
  if(tic) state.themeColors.icon = tic.value;
  if(ttc) state.themeColors.text = ttc.value;
  document.querySelectorAll('.app-item .icon').forEach(el => {
    el.style.background = state.themeColors.bg;
    el.style.color = state.themeColors.icon;
  });
  document.querySelectorAll('.app-item .label').forEach(el => { el.style.color = state.themeColors.text; });
  saveData(); hideModal('themeModal'); showToast('主题保存成功');
}

/* ===== 头像上传 ===== */
function uploadAvatar(target) {
  const input = $('avatarUpload'); if(!input) return;
  input.onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const url = ev.target.result;
      if (target === 'avatarLeft') {
        const al = $('avatarLeft'); if(al) al.style.backgroundImage = `url(${url})`;
        const mal = $('mainAvatarLeft'); if(mal) mal.style.backgroundImage = `url(${url})`;
      } else {
        const ar = $('avatarRight'); if(ar) ar.style.backgroundImage = `url(${url})`;
        const mar = $('mainAvatarRight'); if(mar) mar.style.backgroundImage = `url(${url})`;
      }
      saveData();
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

/* ===== 背景上传 ===== */
function initBgUploads() {
  const setups = [
    { input: 'lockBgUpload', target: 'lockBgLayer', modal: 'lockBgModal' },
    { input: 'mainBgUpload', target: 'mainPage', modal: 'mainBgModal', isMain: true },
    { input: 'coupleBgUpload', target: 'coupleCardBg', modal: 'coupleBgModal' },
    { input: 'playerCoverUpload', target: 'playerCover', modal: 'playerCoverModal', isCover: true }
  ];
  setups.forEach(({ input, target, modal, isMain, isCover }) => {
    const el = $(input); if(!el) return;
    el.addEventListener('change', e => {
      const file = e.target.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const url = ev.target.result;
        const t = $(target); if(!t) return;
        if (isMain) t.style.background = `url(${url}) center/cover no-repeat`;
        else if (isCover) t.style.backgroundImage = `url(${url})`;
        else t.style.backgroundImage = `url(${url})`;
        if (modal === 'coupleBgModal') { const ch = $('coupleHint'); if(ch) ch.style.display = 'none'; }
        saveData();
      };
      reader.readAsDataURL(file);
    });
  });
}

/* ===== 备份恢复 ===== */
function backupAll() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `love_backup_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('备份已下载');
}

function triggerRestore() { const ri = $('restoreInput'); if(ri) ri.click(); }

/* ===== 聊天系统 ===== */
let chatOverlay = null;

function openApp(app) {
  switch(app) {
    case 'chat': openChat(); break;
    case 'settings': openSettings(); break;
    case 'calendar': openCalendar(); break;
    case 'letter': openLetter(); break;
    case 'diary': openDiary(); break;
    case 'checkin': openCheckin(); break;
    case 'fortune': openFortune(); break;
    case 'lottery': openLottery(); break;
    case 'decision': openDecision(); break;
    case 'food': openFood(); break;
    case 'map': openMap(); break;
    case 'moments': openMoments(); break;
    case 'giftbox': openGiftbox(); break;
    case 'gift': openShop(); break;
    case 'memo': openMemo(); break;
    case 'album': showToast('相册功能开发中'); break;
    case 'companion': showToast('陪伴功能开发中'); break;
    case 'music': showToast('音乐功能开发中'); break;
    case 'games': showToast('小游戏功能开发中'); break;
    case 'create': showToast('创作功能开发中'); break;
    case 'cochat': showToast('共语功能开发中'); break;
    case 'weather': showToast('天气功能开发中'); break;
    case 'camera': showToast('相机功能开发中'); break;
    case 'phone': showToast('电话功能开发中'); break;
    case 'alarm': showToast('闹钟功能开发中'); break;
    case 'lab': showToast('实验室功能开发中'); break;
    case 'puzzle': showToast('拼图功能开发中'); break;
    case 'dice': showToast('掷色子：' + (Math.floor(Math.random()*6)+1)); break;
    default: showToast('功能开发中');
  }
}

function openChat() {
  if (!chatOverlay) {
    chatOverlay = document.createElement('div');
    chatOverlay.className = 'chat-overlay';
    chatOverlay.id = 'chatOverlay';
    chatOverlay.innerHTML = `
      <div class="chat-header">
        <div class="chat-header-left">
          <button class="back-btn" onclick="closeChat()"><i class="fa fa-chevron-left"></i></button>
          <div class="chat-header-info">
            <div class="name">${state.nicknames.n2}</div>
            <div class="status" id="chatStatus">在线</div>
          </div>
        </div>
        <div class="chat-header-right">
          <button onclick="showChatSettingsFull()"><i class="fa fa-cog"></i></button>
          <button onclick="showSessionManager()"><i class="fa fa-list"></i></button>
        </div>
      </div>
      <div class="chat-bg" id="chatBg"></div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-input-area">
        <div class="sticker-panel" id="stickerPanel">
          <div class="sticker-tabs" id="stickerTabs"></div>
          <div class="sticker-grid" id="stickerGrid"></div>
        </div>
        <div class="wordcard-panel" id="wordcardPanel">
          <div class="wordcard-tabs" id="wordcardTabs"></div>
          <div class="wordcard-display" id="wordcardDisplay"></div>
          <div class="wordcard-list" id="wordcardList"></div>
          <div class="wordcard-actions">
            <button class="btn-send" onclick="sendWordCards()">发送</button>
            <button class="btn-clear" onclick="clearSelectedWords()">清空</button>
            <button class="btn-import" onclick="importWordCards()">导入</button>
            <button class="btn-export" onclick="exportWordCards()">导出</button>
          </div>
        </div>
        <div class="chat-input-wrap">
          <button onclick="toggleStickerPanel()"><i class="fa fa-smile-o"></i></button>
          <input type="text" id="chatInput" placeholder="输入消息..." onkeydown="if(event.key==='Enter'){sendMessage()}">
          <button onclick="toggleWordcardPanel()"><i class="fa fa-font"></i></button>
          <button onclick="sendMessage()"><i class="fa fa-send"></i></button>
        </div>
        <div class="chat-input-actions">
          <i class="fa fa-microphone" onclick="sendVoiceMessage()"></i>
          <i class="fa fa-picture-o" onclick="sendImageMessage()"></i>
          <i class="fa fa-moon-o" onclick="toggleNightMode()"></i>
          <i class="fa fa-heart" onclick="sendPat()"></i>
        </div>
      </div>
    `;
    document.body.appendChild(chatOverlay);
    initStickerPanel();
    initWordcardPanel();
  }
  chatOverlay.classList.add('active');
  renderChatMessages();
}

function closeChat() { if(chatOverlay) chatOverlay.classList.remove('active'); }

function renderChatMessages() {
  const container = $('chatMessages'); if(!container) return;
  container.innerHTML = '';
  state.chatMessages.forEach(msg => {
    const row = document.createElement('div');
    row.className = `message-row ${msg.from === 'me' ? 'me' : ''}`;
    const time = msg.time || formatTime(new Date());
    let content = '';
    if (msg.type === 'text') {
      content = `<div class="message-bubble">${escapeHtml(msg.content)}<div class="message-time">${time}</div></div>`;
    } else if (msg.type === 'voice') {
      content = `<div class="message-bubble"><div class="message-voice"><div class="play-icon"><i class="fa fa-play"></i></div><div class="voice-wave"><span></span><span></span><span></span><span></span><span></span></div><span class="duration">${msg.duration || "0''"}</span></div><div class="message-time">${time}</div></div>`;
    } else if (msg.type === 'image') {
      content = `<div class="message-bubble"><div class="img-msg"><img src="${msg.content}" alt="图片"></div><div class="message-time">${time}</div></div>`;
    } else if (msg.type === 'sticker') {
      content = `<div class="message-bubble" style="font-size:40px;padding:8px 12px;">${msg.content}<div class="message-time">${time}</div></div>`;
    } else if (msg.type === 'wordcard') {
      const cardsHtml = msg.cards.map(c => `<span style="display:inline-block;padding:4px 10px;background:linear-gradient(135deg,var(--primary-light),var(--primary));color:#fff;border-radius:10px;margin:2px;font-size:14px;">${escapeHtml(c)}</span>`).join('');
      content = `<div class="message-bubble">${cardsHtml}<div class="message-time">${time}</div></div>`;
    }
    row.innerHTML = `<div class="message-avatar"></div>${content}`;
    container.appendChild(row);
  });
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = $('chatInput'); if(!input) return;
  const text = input.value.trim(); if (!text) return;
  state.chatMessages.push({ from: 'me', type: 'text', content: text, time: formatTime(new Date()) });
  input.value = ''; renderChatMessages(); saveData();
  setTimeout(() => {
    showTyping();
    setTimeout(() => {
      hideTyping();
      const replies = ['收到啦~','我也在想你','好哒','嗯嗯','抱抱','亲亲','真的吗','好棒呀','今天也要开心哦','想你了'];
      state.chatMessages.push({ from: 'partner', type: 'text', content: replies[Math.floor(Math.random()*replies.length)], time: formatTime(new Date()) });
      renderChatMessages(); saveData();
    }, 2000);
  }, 1000);
}

function showTyping() {
  const container = $('chatMessages'); if(!container) return;
  const typing = document.createElement('div');
  typing.className = 'message-row'; typing.id = 'typingIndicator';
  typing.innerHTML = `<div class="message-avatar"></div><div class="typing-indicator"><span></span><span></span><span></span></div>`;
  container.appendChild(typing); container.scrollTop = container.scrollHeight;
}

function hideTyping() { const t = $('typingIndicator'); if(t) t.remove(); }

function sendVoiceMessage() {
  state.chatMessages.push({ from: 'me', type: 'voice', duration: "5''", time: formatTime(new Date()) });
  renderChatMessages(); saveData();
}

function sendImageMessage() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*';
  input.onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      state.chatMessages.push({ from: 'me', type: 'image', content: ev.target.result, time: formatTime(new Date()) });
      renderChatMessages(); saveData();
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function sendPat() {
  state.chatMessages.push({ from: 'me', type: 'text', content: '拍了拍' + state.nicknames.n2, time: formatTime(new Date()) });
  renderChatMessages(); saveData();
}

/* ===== 表情包面板 ===== */
function initStickerPanel() {
  const tabs = $('stickerTabs'); if(!tabs) return;
  const tabNames = { me: '我', partner: '对方', pat: '拍一拍' };
  Object.keys(tabNames).forEach(key => {
    const tab = document.createElement('div');
    tab.className = 'sticker-tab' + (key === state.currentStickerTab ? ' active' : '');
    tab.textContent = tabNames[key];
    tab.onclick = () => { state.currentStickerTab = key; renderStickers(); };
    tabs.appendChild(tab);
  });
  renderStickers();
}

function renderStickers() {
  const grid = $('stickerGrid'); if(!grid) return;
  grid.innerHTML = '';
  const items = state.stickers[state.currentStickerTab] || [];
  items.forEach(s => {
    const item = document.createElement('div');
    item.className = 'sticker-item'; item.textContent = s;
    item.onclick = () => {
      state.chatMessages.push({ from: 'me', type: 'sticker', content: s, time: formatTime(new Date()) });
      renderChatMessages(); saveData();
      const sp = $('stickerPanel'); if(sp) sp.classList.remove('active');
    };
    grid.appendChild(item);
  });
}

function toggleStickerPanel() {
  const sp = $('stickerPanel'); const wp = $('wordcardPanel');
  if(sp) sp.classList.toggle('active'); if(wp) wp.classList.remove('active');
}

/* ===== 字卡面板 ===== */
function initWordcardPanel() {
  const tabs = $('wordcardTabs'); if(!tabs) return;
  const tabNames = { main: '主字卡', kaomoji: '颜文字', emoji: 'Emoji', stickers: '表情库' };
  Object.keys(tabNames).forEach(key => {
    const tab = document.createElement('div');
    tab.className = 'wordcard-tab' + (key === state.currentWordTab ? ' active' : '');
    tab.textContent = tabNames[key];
    tab.onclick = () => { state.currentWordTab = key; renderWordCards(); };
    tabs.appendChild(tab);
  });
  renderWordCards();
}

function renderWordCards() {
  const list = $('wordcardList'); if(!list) return;
  list.innerHTML = '';
  const items = state.wordCards[state.currentWordTab] || [];
  items.forEach(word => {
    const item = document.createElement('span');
    item.className = 'wordcard-item' + (state.selectedWordCards.includes(word) ? ' selected' : '');
    item.textContent = word;
    item.onclick = () => toggleWordSelection(word);
    list.appendChild(item);
  });
  updateWordDisplay();
}

function toggleWordSelection(word) {
  const idx = state.selectedWordCards.indexOf(word);
  if (idx > -1) state.selectedWordCards.splice(idx, 1);
  else state.selectedWordCards.push(word);
  renderWordCards();
}

function updateWordDisplay() {
  const display = $('wordcardDisplay'); if(!display) return;
  display.innerHTML = '';
  state.selectedWordCards.forEach(word => {
    const span = document.createElement('span');
    span.className = 'wordcard-item selected'; span.textContent = word;
    span.onclick = () => toggleWordSelection(word);
    display.appendChild(span);
  });
}

function clearSelectedWords() { state.selectedWordCards = []; renderWordCards(); }

function sendWordCards() {
  if (state.selectedWordCards.length === 0) { showToast('请先选择字卡'); return; }
  state.chatMessages.push({
    from: 'me', type: 'wordcard',
    cards: [...state.selectedWordCards],
    content: state.selectedWordCards.join(''),
    time: formatTime(new Date())
  });
  state.selectedWordCards = [];
  renderWordCards(); renderChatMessages();
  const wp = $('wordcardPanel'); if(wp) wp.classList.remove('active');
  saveData();
}

function toggleWordcardPanel() {
  const wp = $('wordcardPanel'); const sp = $('stickerPanel');
  if(wp) wp.classList.toggle('active'); if(sp) sp.classList.remove('active');
}

/* 字卡导出导入 */
function exportWordCards() {
  const data = JSON.stringify(state.wordCards, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `wordcards_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('字卡库已导出');
}

function importWordCards() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.main) { state.wordCards = data; renderWordCards(); saveData(); showToast('字卡库导入成功'); }
        else showToast('格式不正确');
      } catch { showToast('文件格式错误'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

/* ===== 设置面板 ===== */
let settingsPanel = null;

function openSettings() {
  if (!settingsPanel) {
    settingsPanel = document.createElement('div');
    settingsPanel.className = 'settings-panel';
    settingsPanel.innerHTML = `
      <div class="settings-box">
        <div class="settings-header">
          <h3>⚙️ 设置</h3>
          <button class="close-btn" onclick="closeSettings()"><i class="fa fa-times"></i></button>
        </div>
        <div class="grid-cards">
          <div class="grid-card" onclick="showAppearanceSettings()"><div class="icon"><i class="fa fa-paint-brush"></i></div><div class="label">外观设置</div><div class="desc">主题配色等</div></div>
          <div class="grid-card" onclick="showChatSettingsFull()"><div class="icon"><i class="fa fa-comments"></i></div><div class="label">聊天设置</div><div class="desc">消息交互等</div></div>
          <div class="grid-card" onclick="showAdvancedSettings()"><div class="icon"><i class="fa fa-magic"></i></div><div class="label">高级功能</div><div class="desc">自定义回复等</div></div>
          <div class="grid-card" onclick="showDataManagement()"><div class="icon"><i class="fa fa-database"></i></div><div class="label">数据管理</div><div class="desc">备份与恢复</div></div>
        </div>
        <div style="margin-top:20px;">
          <div class="settings-section-title"><i class="fa fa-bell"></i> 通知与关于</div>
          <div class="settings-item">
            <div><div class="settings-item-label">后台消息推送</div><div class="settings-item-desc">收到新消息时弹出提醒</div></div>
            <div class="toggle active" onclick="toggleThis(this)"></div>
          </div>
          <div class="settings-item">
            <div><div class="settings-item-label">重放新手引导</div><div class="settings-item-desc">重新播放功能介绍教程</div></div>
            <i class="fa fa-chevron-right" style="color:var(--text-dim);"></i>
          </div>
          <div class="settings-item">
            <div><div class="settings-item-label">声明与致谢</div><div class="settings-item-desc">开源声明、致谢名单</div></div>
            <i class="fa fa-chevron-right" style="color:var(--text-dim);"></i>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(settingsPanel);
  }
  settingsPanel.classList.add('active');
}

function closeSettings() { if(settingsPanel) settingsPanel.classList.remove('active'); }
function toggleThis(el) { el.classList.toggle('active'); }

/* ===== 外观设置 ===== */
function showAppearanceSettings() {
  closeSettings();
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active'; modal.id = 'appearanceModal';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="document.getElementById('appearanceModal').remove();openSettings();">×</button>
      <h4>🎨 外观设置</h4>
      <div class="settings-tabs">
        <div class="settings-tab active" onclick="switchAppTab(this,'theme')">主题配色</div>
        <div class="settings-tab" onclick="switchAppTab(this,'bg')">背景 & 字体</div>
        <div class="settings-tab" onclick="switchAppTab(this,'bubble')">气泡 & CSS</div>
        <div class="settings-tab" onclick="switchAppTab(this,'avatar')">聊天头像</div>
      </div>
      <div class="tab-content active" data-tab="theme">
        <div class="settings-section">
          <div class="settings-section-title">快捷换肤</div>
          <div class="color-circles">
            <div class="color-circle active" style="background:#c4a5d8" onclick="setThemeColor('#c4a5d8')"></div>
            <div class="color-circle" style="background:#5b9bd5" onclick="setThemeColor('#5b9bd5')"></div>
            <div class="color-circle" style="background:#e06b8a" onclick="setThemeColor('#e06b8a')"></div>
            <div class="color-circle" style="background:#70ad47" onclick="setThemeColor('#70ad47')"></div>
            <div class="color-circle" style="background:#f4b942" onclick="setThemeColor('#f4b942')"></div>
            <div class="color-circle" style="background:#333" onclick="setThemeColor('#333')"></div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">主题方案</div>
          <div class="list-item">
            <div class="content"><div class="title">方案 1</div><div class="desc">昼 · 紫色 · 标准 · 13px</div></div>
            <div class="actions"><i class="fa fa-check" style="color:var(--primary)"></i><i class="fa fa-pencil"></i><i class="fa fa-times"></i></div>
          </div>
        </div>
      </div>
      <div class="tab-content" data-tab="bg">
        <div class="settings-section">
          <div class="settings-section-title">字体设置</div>
          <div class="settings-item">
            <div class="settings-item-label">大小</div>
            <div class="slider-wrap"><input type="range" min="10" max="20" value="13" oninput="this.nextElementSibling.textContent=this.value+'px'"><span class="slider-value">13px</span></div>
          </div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">聊天背景</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <div style="width:60px;height:60px;border-radius:12px;background:var(--glass);border:2px dashed var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;"><i class="fa fa-plus"></i></div>
            <div style="width:60px;height:60px;border-radius:12px;background:linear-gradient(135deg,#f5f0f8,#e8d5f5);cursor:pointer;"></div>
            <div style="width:60px;height:60px;border-radius:12px;background:linear-gradient(135deg,#1a0f2e,#2d1b4e);cursor:pointer;"></div>
          </div>
        </div>
      </div>
      <div class="tab-content" data-tab="bubble">
        <div class="settings-section">
          <div class="settings-section-title">气泡样式</div>
          <textarea style="width:100%;height:120px;padding:10px;border:1.5px solid var(--border);border-radius:12px;background:var(--glass);color:var(--text);font-size:13px;resize:none;margin-top:8px;" placeholder="/* 输入自定义CSS */
.message-bubble {
  border-radius: 20px;
}"></textarea>
        </div>
      </div>
      <div class="tab-content" data-tab="avatar">
        <div class="settings-section">
          <div class="settings-section-title">头像设置</div>
          <div style="display:flex;gap:16px;justify-content:center;margin:16px 0;">
            <div style="text-align:center;" onclick="uploadAvatar('avatarLeft')">
              <div id="settingAvatarLeft" style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-dark));margin:0 auto 8px;background-size:cover;"></div>
              <span style="font-size:12px;color:var(--text-dim);">我的头像</span>
            </div>
            <div style="text-align:center;" onclick="uploadAvatar('avatarRight')">
              <div id="settingAvatarRight" style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-dark));margin:0 auto 8px;background-size:cover;"></div>
              <span style="font-size:12px;color:var(--text-dim);">对方头像</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function switchAppTab(el, tab) {
  el.parentElement.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const box = el.closest('.modal-box'); if(!box) return;
  box.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  const tc = box.querySelector(`.tab-content[data-tab="${tab}"]`); if(tc) tc.classList.add('active');
}

function setThemeColor(color) {
  document.documentElement.style.setProperty('--primary', color);
  showToast('主题色已更新');
}

/* ===== 聊天设置 ===== */
function showChatSettingsFull() {
  closeSettings();
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active'; modal.id = 'chatSettingsModal';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="document.getElementById('chatSettingsModal').remove();openSettings();">×</button>
      <h4>💬 聊天设置</h4>
      <div class="settings-tabs">
        <div class="settings-tab active" onclick="switchAppTab(this,'func')">功能</div>
        <div class="settings-tab" onclick="switchAppTab(this,'rhythm')">节奏</div>
        <div class="settings-tab" onclick="switchAppTab(this,'sound')">音效</div>
        <div class="settings-tab" onclick="switchAppTab(this,'display')">显示</div>
        <div class="settings-tab" onclick="switchAppTab(this,'nick')">昵称</div>
      </div>
      <div class="tab-content active" data-tab="func">
        <div class="settings-section">
          <div class="settings-section-title">消息交互</div>
          <div class="settings-item"><div class="settings-item-label">设置回复</div><div class="toggle active" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">已读回执</div><div class="toggle active" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">正在输入</div><div class="toggle active" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">已读不回</div><div class="toggle" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">回车键发送</div><div class="toggle active" onclick="toggleThis(this)"></div></div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">时间戳</div>
          <div class="settings-item">
            <div><div class="settings-item-label">样式</div></div>
            <div style="display:flex;gap:8px;">
              <span style="padding:4px 10px;border-radius:8px;background:var(--primary-light);color:var(--primary-dark);font-size:12px;">图形</span>
              <span style="padding:4px 10px;border-radius:8px;background:var(--glass);color:var(--text-dim);font-size:12px;">文字</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content" data-tab="rhythm">
        <div class="settings-section">
          <div class="settings-section-title">消息速度</div>
          <div class="settings-item"><div class="settings-item-label">等待</div><div class="slider-wrap"><input type="range" min="1" max="10" value="6"><span class="slider-value">6s</span></div></div>
          <div class="settings-item"><div class="settings-item-label">间隔</div><div class="slider-wrap"><input type="range" min="1" max="10" value="4"><span class="slider-value">4.0分钟</span></div></div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">主动发送</div>
          <div class="settings-item"><div class="settings-item-label">主动发消息给我</div><div class="toggle active" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">间隔</div><div class="slider-wrap"><input type="range" min="1" max="60" value="25"><span class="slider-value">25分钟</span></div></div>
          <div class="settings-item"><div class="settings-item-label">主动发语音</div><div class="toggle" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">音概率</div><div class="slider-wrap"><input type="range" min="0" max="100" value="50"><span class="slider-value">50%</span></div></div>
        </div>
      </div>
      <div class="tab-content" data-tab="sound">
        <div class="settings-section">
          <div class="settings-section-title">消息音效</div>
          <div class="settings-item"><div class="settings-item-label">开启音效</div><div class="toggle active" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div><div class="settings-item-label">我发出的消息音效</div></div><div style="display:flex;gap:8px;align-items:center;"><select style="padding:6px 10px;border-radius:8px;border:1px solid var(--border);background:var(--glass);color:var(--text);font-size:13px;"><option>内置：默认</option></select><i class="fa fa-play-circle" style="color:var(--primary);font-size:20px;cursor:pointer;"></i></div></div>
          <div class="settings-item"><div><div class="settings-item-label">对方发来的消息音效</div></div><div style="display:flex;gap:8px;align-items:center;"><select style="padding:6px 10px;border-radius:8px;border:1px solid var(--border);background:var(--glass);color:var(--text);font-size:13px;"><option>内置：默认</option></select><i class="fa fa-play-circle" style="color:var(--primary);font-size:20px;cursor:pointer;"></i></div></div>
        </div>
        <div class="settings-section">
          <div class="settings-section-title">音量</div>
          <div class="settings-item"><div class="settings-item-label">总音量</div><div class="slider-wrap"><input type="range" min="0" max="100" value="50"><span class="slider-value">50%</span></div></div>
        </div>
      </div>
      <div class="tab-content" data-tab="display">
        <div class="settings-section">
          <div class="settings-section-title">界面模式</div>
          <div class="settings-item"><div class="settings-item-label">沉浸式模式</div><div class="toggle" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">底部栏收纳</div><div class="toggle active" onclick="toggleThis(this)"></div></div>
          <div class="settings-item"><div class="settings-item-label">顶部栏常驻清晰</div><div class="toggle" onclick="toggleThis(this)"></div></div>
        </div>
      </div>
      <div class="tab-content" data-tab="nick">
        <div class="settings-section">
          <div class="settings-section-title">聊天昵称</div>
          <div class="settings-item"><div class="settings-item-label">入昵称</div><i class="fa fa-chevron-right" style="color:var(--text-dim);"></i></div>
          <div class="settings-item"><div class="settings-item-label">修改梦角名称</div><i class="fa fa-chevron-right" style="color:var(--text-dim);"></i></div>
          <div class="settings-item"><div class="settings-item-label">修改我方名称</div><i class="fa fa-chevron-right" style="color:var(--text-dim);"></i></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

/* ===== 高级功能 ===== */
function showAdvancedSettings() {
  closeSettings();
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active'; modal.id = 'advancedModal';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="document.getElementById('advancedModal').remove();openSettings();">×</button>
      <h4>✨ 高级功能</h4>
      <div class="settings-tabs">
        <div class="settings-tab active" onclick="switchAppTab(this,'reply')">回复库</div>
        <div class="settings-tab" onclick="switchAppTab(this,'fish')">摸鱼管理</div>
        <div class="settings-tab" onclick="switchAppTab(this,'atmosphere')">氛围感</div>
      </div>
      <div class="tab-content active" data-tab="reply">
        <div class="settings-section">
          <div class="settings-section-title">回复库管理</div>
          <div class="wordcard-tabs" style="margin-bottom:12px;">
            <div class="wordcard-tab active">主字卡</div>
            <div class="wordcard-tab">颜文字</div>
            <div class="wordcard-tab">Emoji</div>
            <div class="wordcard-tab">表情库</div>
          </div>
          <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
            <span style="padding:4px 10px;border-radius:12px;background:var(--primary-light);color:var(--primary-dark);font-size:12px;">全部 1712</span>
            <span style="padding:4px 10px;border-radius:12px;background:var(--glass);color:var(--text-dim);font-size:12px;">未分组 11</span>
            <span style="padding:4px 10px;border-radius:12px;background:var(--glass);color:var(--text-dim);font-size:12px;">日常 433</span>
          </div>
        </div>
      </div>
      <div class="tab-content" data-tab="fish">
        <div class="settings-section">
          <div class="settings-section-title">摸鱼活动</div>
          <div class="list-item"><div class="content"><div class="title">和小鱼们玩</div></div><div class="actions"><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></div></div>
          <div class="list-item"><div class="content"><div class="title">抓娃娃</div></div><div class="actions"><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></div></div>
          <div class="list-item"><div class="content"><div class="title">做饭</div></div><div class="actions"><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></div></div>
          <div class="list-item"><div class="content"><div class="title">逛海滩</div></div><div class="actions"><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></div></div>
          <div class="list-item"><div class="content"><div class="title">写信</div></div><div class="actions"><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></div></div>
        </div>
      </div>
      <div class="tab-content" data-tab="atmosphere">
        <div class="settings-section">
          <div class="settings-section-title">氛围感配置</div>
          <div class="wordcard-tabs" style="margin-bottom:12px;">
            <div class="wordcard-tab active">拍一拍</div>
            <div class="wordcard-tab">对方状态</div>
            <div class="wordcard-tab">顶部格言</div>
            <div class="wordcard-tab">开场动画</div>
          </div>
          <div class="list-item"><div class="content"><div class="title">按了按梦角的鱼周</div></div><div class="actions"><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></div></div>
          <div class="list-item"><div class="content"><div class="title">亲了亲梦角的脸颊</div></div><div class="actions"><i class="fa fa-pencil"></i><i class="fa fa-trash"></i></div></div>
        </div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button class="btn-primary" style="flex:1;"><i class="fa fa-plus"></i> 新增</button>
        <button class="btn-secondary" onclick="document.getElementById('advancedModal').remove();openSettings();">关闭</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

/* ===== 数据管理 ===== */
function showDataManagement() {
  closeSettings();
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active'; modal.id = 'dataModal';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="document.getElementById('dataModal').remove();openSettings();">×</button>
      <h4>💾 数据管理</h4>
      <div class="settings-section">
        <div class="settings-section-title"><i class="fa fa-hdd-o"></i> 存储用量</div>
        <div class="storage-bar"><div class="fill chat" style="width:30%"></div><div class="fill settings" style="width:60%;margin-left:-4px"></div><div class="fill media" style="width:10%;margin-left:-4px"></div></div>
        <div class="storage-info">
          <span><span style="color:#5b9bd5">●</span> 聊天记录 85.81 MB</span>
          <span><span style="color:var(--primary)">●</span> 设置数据 188.67 MB</span>
          <span><span style="color:#70ad47">●</span> 图片媒体 14.76 MB</span>
        </div>
        <div style="text-align:right;font-size:12px;color:var(--text-dim);margin-top:4px;">289.25 MB / ~5 MB (100.0%)</div>
      </div>
      <div class="settings-section">
        <div class="settings-section-title"><i class="fa fa-cloud-download"></i> 备份与恢复</div>
        <div class="grid-cards">
          <div class="grid-card" onclick="backupAll()"><div class="icon"><i class="fa fa-download"></i></div><div class="label">全量备份</div><div class="desc">所有设置与数据</div></div>
          <div class="grid-card" onclick="triggerRestore()"><div class="icon"><i class="fa fa-upload"></i></div><div class="label">恢复数据</div><div class="desc">从备份文件恢复</div></div>
        </div>
      </div>
      <div class="danger-zone">
        <div class="title"><i class="fa fa-exclamation-triangle"></i> 危险操作</div>
        <div style="display:flex;gap:10px;">
          <button class="danger-btn" onclick="clearSession()">清除会话</button>
          <button class="danger-btn" onclick="resetAll()">重置数据</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function clearSession() {
  if (confirm('确定要删除本会话消息吗？')) {
    state.chatMessages = []; saveData(); showToast('会话已清除');
  }
}

function resetAll() {
  if (confirm('确定要清空所有数据吗？此操作不可撤销！')) {
    localStorage.removeItem('loveAppData'); showToast('数据已重置，请刷新页面');
  }
}

/* ===== 日历 ===== */
let calendarModal = null;
let currentCalendarDate = new Date();

function openCalendar() {
  if (!calendarModal) {
    calendarModal = document.createElement('div');
    calendarModal.className = 'modal-overlay active';
    calendarModal.id = 'calendarModal';
    calendarModal.innerHTML = `
      <div class="modal-box">
        <button class="modal-close" onclick="document.getElementById('calendarModal').remove();calendarModal=null;">×</button>
        <h4>📅 日历</h4>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <button class="btn-secondary" style="flex:0;padding:6px 12px;" onclick="changeCalendarMonth(-1)"><i class="fa fa-chevron-left"></i></button>
          <span id="calendarTitle" style="font-size:16px;font-weight:600;"></span>
          <button class="btn-secondary" style="flex:0;padding:6px 12px;" onclick="changeCalendarMonth(1)"><i class="fa fa-chevron-right"></i></button>
        </div>
        <div class="calendar-grid" id="calendarGrid"></div>
        <div class="calendar-legend">
          <span><span class="dot" style="background:#5b9bd5"></span> 待办</span>
          <span><span class="dot" style="background:#70ad47"></span> 打卡</span>
          <span><span class="dot" style="background:#e06b8a"></span> 纪念日</span>
          <span><span class="dot" style="background:#c55a5a"></span> 经期</span>
        </div>
      </div>
    `;
    document.body.appendChild(calendarModal);
  }
  renderCalendar();
}

function renderCalendar() {
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const ct = $('calendarTitle'); if(ct) ct.textContent = `${year}年${month + 1}月`;
  const grid = $('calendarGrid'); if(!grid) return;
  grid.innerHTML = '';
  const weekdays = ['日','一','二','三','四','五','六'];
  weekdays.forEach(d => { const el = document.createElement('div'); el.className = 'weekday'; el.textContent = d; grid.appendChild(el); });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'day'; el.textContent = d;
    if (year === today.getFullYear() && month === today.getMonth() && d === today.getDate()) el.classList.add('today');
    if ([23,24,25,26,27].includes(d)) el.classList.add('has-event', 'checkin');
    grid.appendChild(el);
  }
}

function changeCalendarMonth(delta) {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + delta);
  renderCalendar();
}

/* ===== 信封投递 ===== */
function openLetter() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>✉️ 信封投递</h4>
      <div class="settings-tabs" style="margin-bottom:16px;">
        <div class="settings-tab active" onclick="switchLetterTab(this,'sent')">寄出的信</div>
        <div class="settings-tab" onclick="switchLetterTab(this,'received')">收到的信</div>
        <div class="settings-tab" onclick="switchLetterTab(this,'timeSpace')">时空来信</div>
      </div>
      <div id="letterContent">
        <div class="list-item"><div class="content"><div class="title">回复：让我好好感受你</div><div class="desc">6/30 13:26 · 已收到回信</div></div><i class="fa fa-envelope-o" style="color:var(--primary)"></i></div>
        <div class="list-item"><div class="content"><div class="title">sorry宝宝我好像没有认出来</div><div class="desc">7/1 08:42 · 新</div></div><i class="fa fa-envelope" style="color:var(--primary)"></i></div>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:12px;"><i class="fa fa-pencil"></i> 提笔写信</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function switchLetterTab(el, tab) {
  el.parentElement.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const content = document.getElementById('letterContent'); if(!content) return;
  if (tab === 'sent') {
    content.innerHTML = '<div class="empty-state"><i class="fa fa-paper-plane"></i><p>还没有寄出的信</p></div>';
  } else if (tab === 'received') {
    content.innerHTML = `
      <div class="list-item"><div class="content"><div class="title">sorry宝宝我好像没有认出来</div><div class="desc">7/1 08:42 · 新</div></div><i class="fa fa-envelope" style="color:var(--primary)"></i></div>
      <div class="list-item"><div class="content"><div class="title">你就是全世界最好的</div><div class="desc">6/30 13:18</div></div><i class="fa fa-envelope-o" style="color:var(--text-dim)"></i></div>
    `;
  } else {
    content.innerHTML = '<div class="empty-state"><i class="fa fa-globe"></i><p>还没有收到时空来信</p><p style="font-size:12px;margin-top:8px;">开启"主动给我写信"后，梦角会随机主动写信</p></div>';
  }
}

/* ===== 手账 ===== */
function openDiary() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>📖 心晴手账</h4>
      <div class="settings-tabs" style="margin-bottom:16px;">
        <div class="settings-tab active" onclick="switchDiaryTab(this,'calendar')">日历</div>
        <div class="settings-tab" onclick="switchDiaryTab(this,'stats')">统计</div>
        <div class="settings-tab" onclick="switchDiaryTab(this,'trash')">回收站</div>
      </div>
      <div id="diaryContent">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
          <button class="btn-secondary" style="flex:0;padding:6px 12px;" onclick="changeDiaryMonth(-1)"><i class="fa fa-chevron-left"></i></button>
          <span id="diaryCalendarTitle" style="font-size:16px;font-weight:600;">2026年6月</span>
          <button class="btn-secondary" style="flex:0;padding:6px 12px;" onclick="changeDiaryMonth(1)"><i class="fa fa-chevron-right"></i></button>
        </div>
        <div class="calendar-grid" id="diaryCalendarGrid"></div>
      </div>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button class="btn-secondary" style="flex:1;">导出</button>
        <button class="btn-secondary" style="flex:1;">导入</button>
        <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">关闭</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  renderDiaryCalendar();
}

let diaryDate = new Date();
function renderDiaryCalendar() {
  const year = diaryDate.getFullYear(), month = diaryDate.getMonth();
  const dt = $('diaryCalendarTitle'); if(dt) dt.textContent = `${year}年${month + 1}月`;
  const grid = $('diaryCalendarGrid'); if(!grid) return;
  grid.innerHTML = '';
  const weekdays = ['日','一','二','三','四','五','六'];
  weekdays.forEach(d => { const el = document.createElement('div'); el.className = 'weekday'; el.textContent = d; grid.appendChild(el); });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));
  const emojis = ['😊','🥰','😴','😢','🤗'];
  for (let d = 1; d <= daysInMonth; d++) {
    const el = document.createElement('div');
    el.className = 'day';
    el.innerHTML = `<div>${d}</div>${[26,27,28,29,30].includes(d) ? `<div class="mood-emoji">${emojis[(d-26)%5]}</div>` : ''}`;
    grid.appendChild(el);
  }
}
function changeDiaryMonth(delta) { diaryDate.setMonth(diaryDate.getMonth() + delta); renderDiaryCalendar(); }
function switchDiaryTab(el, tab) {
  el.parentElement.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const content = $('diaryContent'); if(!content) return;
  if (tab === 'stats') {
    content.innerHTML = '<div class="empty-state"><i class="fa fa-bar-chart"></i><p>统计数据</p><p style="font-size:12px;margin-top:8px;">本月记录 5 天</p></div>';
  } else if (tab === 'trash') {
    content.innerHTML = '<div class="empty-state"><i class="fa fa-trash-o"></i><p>回收站为空</p></div>';
  } else { content.innerHTML = '<div id="diaryCalendarContent"></div>'; renderDiaryCalendar(); }
}

/* ===== 查岗 ===== */
function openCheckin() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>👁️ 摸鱼小记</h4>
      <div class="settings-tabs" style="margin-bottom:16px;">
        <div class="settings-tab active">当前</div>
        <div class="settings-tab">记录</div>
      </div>
      <div class="list-item">
        <div class="icon"><i class="fa fa-map-marker"></i></div>
        <div class="content"><div class="title">卧室</div><div class="desc">当前位置</div></div>
        <span style="font-size:14px;color:var(--text-dim);">6h</span>
      </div>
      <div style="margin-top:12px;padding:12px;background:var(--glass);border-radius:var(--radius-sm);">
        <div style="font-size:13px;color:var(--text-dim);">2026-07-02</div>
        <div style="font-size:14px;margin-top:4px;">⏳ 剩余工作时间 3小时44分钟</div>
      </div>
      <div style="margin-top:12px;">
        <div class="list-item"><div class="content"><div class="title">写信</div><div class="desc">16:40:22</div></div></div>
        <div class="list-item"><div class="content"><div class="title">采风</div><div class="desc">18:30:25</div></div></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

/* ===== 运势占卜 ===== */
function openFortune() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>🔮 运势占卜</h4>
      <div class="settings-tabs" style="margin-bottom:16px;">
        <div class="settings-tab active" onclick="switchFortuneTab(this,'daily')">每日运势</div>
        <div class="settings-tab" onclick="switchFortuneTab(this,'lenormand')">雷诺曼占卜</div>
        <div class="settings-tab" onclick="switchFortuneTab(this,'tarot')">塔罗占卜</div>
        <div class="settings-tab" onclick="switchFortuneTab(this,'history')">往昔</div>
      </div>
      <div id="fortuneContent">
        <div class="fortune-card">
          <div class="title">今日运势</div>
          <div style="font-size:48px;margin:16px 0;">✨</div>
          <div class="result">今天是个适合表达心意的好日子，不妨给对方一个惊喜吧！</div>
        </div>
        <button class="btn-primary" style="width:100%;" onclick="doFortune()">开始占卜</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function switchFortuneTab(el, tab) {
  el.parentElement.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const content = document.getElementById('fortuneContent'); if(!content) return;
  if (tab === 'lenormand') {
    content.innerHTML = `
      <div class="fortune-card">
        <div class="title">雷诺曼三张</div>
        <div class="cards"><div class="card-item">骑士</div><div class="card-item">四叶草</div><div class="card-item">信件</div></div>
        <div class="result">「祁煜知道我们的暗号是什么吗？」<br>好运即将降临，保持期待。</div>
      </div>
    `;
  } else if (tab === 'tarot') {
    content.innerHTML = `
      <div class="fortune-card">
        <div class="title">三张塔罗</div>
        <div class="cards"><div class="card-item">权杖二</div><div class="card-item">星币五</div><div class="card-item">星币七</div></div>
        <div class="result">「不想背书，现在可不可以休息明天再来背」<br>权杖二 逆位：规划 — 恐惧未知、缺乏计划<br>星币五 正位：艰难 — 时期、物质损失<br>星币七 正位：耕耘 — 长期投资、耐心等待</div>
      </div>
    `;
  } else if (tab === 'history') {
    content.innerHTML = '<div class="empty-state"><i class="fa fa-history"></i><p>占卜历史</p></div>';
  } else {
    content.innerHTML = `
      <div class="fortune-card">
        <div class="title">今日运势</div>
        <div style="font-size:48px;margin:16px 0;">✨</div>
        <div class="result">今天是个适合表达心意的好日子，不妨给对方一个惊喜吧！</div>
      </div>
      <button class="btn-primary" style="width:100%;" onclick="doFortune()">开始占卜</button>
    `;
  }
}

function doFortune() {
  const fortunes = ['大吉：今天会有意想不到的好事发生！','中吉：保持平常心，一切都会顺利。','小吉：小小的幸运正在路上。','吉：适合表白的日子，勇敢说出心声吧！'];
  showToast(fortunes[Math.floor(Math.random()*fortunes.length)]);
}

/* ===== 抽签 ===== */
function openLottery() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>🎫 抽签</h4>
      <div style="text-align:center;padding:20px;">
        <div style="font-size:64px;margin-bottom:16px;">🎋</div>
        <p style="font-size:14px;color:var(--text-dim);margin-bottom:20px;">心诚则灵，点击抽取今日签文</p>
        <button class="btn-primary" style="width:100%;" onclick="doLottery()">抽签</button>
        <div id="lotteryResult" style="margin-top:20px;font-size:16px;color:var(--primary);min-height:24px;"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function doLottery() {
  const results = ['大吉：心想事成','中吉：诸事顺遂','小吉：平安喜乐','吉：桃花朵朵','末吉：静待花开'];
  const result = results[Math.floor(Math.random()*results.length)];
  const lr = document.getElementById('lotteryResult'); if(lr) lr.textContent = result;
}

/* ===== 决策 ===== */
function openDecision() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>⚖️ 抉择助手</h4>
      <div class="grid-cards" style="margin:16px 0;">
        <div class="grid-card" onclick="doCoinFlip()"><div class="icon"><i class="fa fa-circle"></i></div><div class="label">抛硬币</div><div class="desc">是/否 二元选择</div></div>
        <div class="grid-card" onclick="doRandomPick()"><div class="icon"><i class="fa fa-random"></i></div><div class="label">随机抽签</div><div class="desc">自定义选项随机抽取</div></div>
      </div>
      <div id="decisionResult" style="text-align:center;font-size:18px;color:var(--primary);min-height:30px;margin-top:12px;"></div>
    </div>
  `;
  document.body.appendChild(modal);
}

function doCoinFlip() {
  const result = Math.random() > 0.5 ? '正面（是）' : '反面（否）';
  const dr = document.getElementById('decisionResult'); if(dr) dr.textContent = '🪙 ' + result;
}

function doRandomPick() {
  const options = ['选项A','选项B','选项C'];
  const result = options[Math.floor(Math.random()*options.length)];
  const dr = document.getElementById('decisionResult'); if(dr) dr.textContent = '✨ 选中：' + result;
}

/* ===== 吃什么 ===== */
function openFood() {
  const foods = ['火锅','烧烤','寿司','披萨','拉面','麻辣烫','奶茶','蛋糕','水果沙拉','牛排'];
  const food = foods[Math.floor(Math.random()*foods.length)];
  showToast('今天吃：' + food + '！');
}

/* ===== 地图 ===== */
function openMap() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>🗺️ Zmilk地图</h4>
      <div class="map-container">
        <div class="map-grid">
          <div class="map-room" onclick="setMapLocation(0)"><i class="fa fa-home"></i><span>客厅</span></div>
          <div class="map-room active" onclick="setMapLocation(1)"><i class="fa fa-bed"></i><span>卧室</span></div>
          <div class="map-room" onclick="setMapLocation(2)"><i class="fa fa-cutlery"></i><span>厨房</span></div>
          <div class="map-room" onclick="setMapLocation(3)"><i class="fa fa-sun-o"></i><span>阳台</span></div>
        </div>
      </div>
      <div style="display:flex;justify-content:space-around;margin-top:12px;">
        <div style="text-align:center;"><div style="font-size:20px;font-weight:600;">0</div><div style="font-size:12px;color:var(--text-dim);">停靠地点</div></div>
        <div style="text-align:center;"><div style="font-size:20px;font-weight:600;color:var(--primary);">650</div><div style="font-size:12px;color:var(--text-dim);">总距离</div></div>
        <div style="text-align:center;"><div style="font-size:20px;font-weight:600;">0</div><div style="font-size:12px;color:var(--text-dim);">子地图</div></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function setMapLocation(idx) {
  state.mapLocations.forEach((l, i) => l.active = i === idx);
  document.querySelectorAll('.map-room').forEach((r, i) => r.classList.toggle('active', i === idx));
  showToast('TA的位置已更新：' + state.mapLocations[idx].name);
}

/* ===== 朋友圈 ===== */
function openMoments() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.style.alignItems = 'flex-start';
  modal.style.paddingTop = '20px';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:90vh;overflow-y:auto;width:100%;max-width:420px;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <div style="position:relative;height:150px;background:linear-gradient(135deg,var(--primary-light),var(--primary));border-radius:var(--radius-sm);margin-bottom:40px;">
        <div style="position:absolute;bottom:-30px;right:16px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-dark));border:3px solid var(--card);background-size:cover;"></div>
      </div>
      <div style="text-align:right;padding-right:16px;margin-bottom:16px;">
        <div style="font-size:16px;font-weight:600;">${state.nicknames.n2}</div>
        <div style="font-size:12px;color:var(--text-dim);">希望我们长长久久</div>
      </div>
      <div id="momentsList"></div>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <button class="btn-secondary" style="flex:1;" onclick="showVisitorRecords()"><i class="fa fa-eye"></i> 访客记录</button>
        <button class="btn-secondary" style="flex:1;" onclick="showMomentSettings()"><i class="fa fa-cog"></i> 个性化设置</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  renderMoments();
}

function renderMoments() {
  const list = document.getElementById('momentsList'); if(!list) return;
  list.innerHTML = '';
  state.moments.forEach(m => {
    const item = document.createElement('div');
    item.className = 'moment-item';
    item.innerHTML = `
      <div class="moment-header">
        <div class="avatar"></div>
        <div class="info"><div class="name">${m.name}</div><div class="time">${m.time}</div></div>
      </div>
      <div class="moment-content">${m.content}</div>
      <div class="moment-actions">
        <span onclick="likeMoment(${m.id})"><i class="fa fa-heart-o"></i> ${m.likes}</span>
        <span onclick="commentMoment(${m.id})"><i class="fa fa-comment-o"></i> ${m.comments}</span>
        <span><i class="fa fa-star-o"></i></span>
      </div>
    `;
    list.appendChild(item);
  });
}

function likeMoment(id) { showToast('已点赞'); }
function commentMoment(id) { showToast('评论功能开发中'); }

function showVisitorRecords() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>👁️ 访客记录</h4>
      <div style="text-align:right;margin-bottom:12px;"><span style="color:#e06b8a;font-size:13px;cursor:pointer;" onclick="clearVisitors()">清空</span></div>
      <div id="visitorList"></div>
    </div>
  `;
  document.body.appendChild(modal);
  renderVisitors();
}

function renderVisitors() {
  const list = document.getElementById('visitorList'); if(!list) return;
  list.innerHTML = '';
  state.visitorRecords.forEach(v => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `<div class="avatar" style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--primary),var(--primary-dark));"></div><div class="content"><div class="title">${v.name}</div><div class="desc">${v.time}</div></div>`;
    list.appendChild(item);
  });
}

function clearVisitors() {
  if (confirm('确定要清空所有访客记录吗？')) {
    state.visitorRecords = []; renderVisitors(); saveData(); showToast('访客记录已清空');
  }
}

function showMomentSettings() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>⚙️ 个性化设置</h4>
      <div class="settings-section">
        <div class="settings-section-title">个人信息</div>
        <div class="settings-item"><div class="settings-item-label">昵称</div><input type="text" value="${state.nicknames.n2}" style="padding:6px 10px;border:1px solid var(--border);border-radius:8px;background:var(--glass);color:var(--text);font-size:13px;width:120px;text-align:right;"></div>
        <div class="settings-item"><div class="settings-item-label">签名</div><input type="text" value="希望我们长长久久" style="padding:6px 10px;border:1px solid var(--border);border-radius:8px;background:var(--glass);color:var(--text);font-size:13px;width:120px;text-align:right;"></div>
      </div>
      <div class="settings-section">
        <div class="settings-section-title">互动设置</div>
        <div class="settings-item"><div class="settings-item-label">对方主动评论间隔</div><div style="display:flex;gap:4px;align-items:center;"><input type="number" value="0" style="width:40px;padding:4px;border:1px solid var(--border);border-radius:6px;text-align:center;"><span style="font-size:12px;">秒</span><span>~</span><input type="number" value="15" style="width:40px;padding:4px;border:1px solid var(--border);border-radius:6px;text-align:center;"><span style="font-size:12px;">分钟</span></div></div>
        <div class="settings-item"><div class="settings-item-label">图片几率</div><div class="slider-wrap"><input type="range" min="0" max="100" value="50"><span class="slider-value">50%</span></div></div>
        <div class="settings-item"><div class="settings-item-label">音频几率</div><div class="slider-wrap"><input type="range" min="0" max="100" value="50"><span class="slider-value">50%</span></div></div>
        <div class="settings-item"><div class="settings-item-label">视频几率</div><div class="slider-wrap"><input type="range" min="0" max="100" value="50"><span class="slider-value">50%</span></div></div>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:12px;" onclick="saveMomentSettings()">保存</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function saveMomentSettings() { showToast('设置已保存'); }

/* ===== 礼物柜 ===== */
function openGiftbox() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>🎁 我的礼物柜</h4>
      <div id="giftList"></div>
    </div>
  `;
  document.body.appendChild(modal);
  renderGifts();
}

function renderGifts() {
  const list = document.getElementById('giftList'); if(!list) return;
  list.innerHTML = '';
  state.gifts.forEach(g => {
    const item = document.createElement('div');
    item.className = 'list-item';
    item.innerHTML = `<div class="icon">🎁</div><div class="content"><div class="title">${g.name}</div><div class="desc">¥${g.price} · ${g.date}</div></div><input type="checkbox" style="width:18px;height:18px;accent-color:var(--primary);">`;
    list.appendChild(item);
  });
}

/* ===== 商城 ===== */
function openShop() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>🛍️ 商城</h4>
      <div style="display:flex;gap:8px;margin-bottom:16px;">
        <div style="flex:1;padding:8px 12px;background:var(--primary-light);border-radius:var(--radius-xs);text-align:center;font-size:13px;color:var(--primary-dark);font-weight:500;">推荐</div>
        <div style="flex:1;padding:8px 12px;background:var(--glass);border-radius:var(--radius-xs);text-align:center;font-size:13px;color:var(--text-dim);">外卖</div>
      </div>
      <div class="shop-grid" id="shopGrid"></div>
    </div>
  `;
  document.body.appendChild(modal);
  renderShop();
}

function renderShop() {
  const grid = document.getElementById('shopGrid'); if(!grid) return;
  grid.innerHTML = '';
  state.shopItems.forEach(item => {
    const el = document.createElement('div');
    el.className = 'shop-item';
    el.innerHTML = `
      <div class="img">👕</div>
      <div class="info">
        <div class="name">${item.name}</div>
        <div class="desc">${item.desc}</div>
        <div class="tags">${item.tags.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="price-row"><span class="price">¥${item.price}</span><button class="add-btn" onclick="addToCart('${item.name}')">+</button></div>
      </div>
    `;
    grid.appendChild(el);
  });
}

function addToCart(name) { showToast(name + ' 已加入购物车'); }

/* ===== 备忘录 ===== */
function openMemo() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>📝 朝夕心记</h4>
      <div class="settings-tabs" style="margin-bottom:16px;">
        <div class="settings-tab active" onclick="switchMemoTab(this,'todo')">待办</div>
        <div class="settings-tab" onclick="switchMemoTab(this,'habit')">习惯</div>
        <div class="settings-tab" onclick="switchMemoTab(this,'anniversary')">纪念日</div>
      </div>
      <div id="memoContent">
        <div class="empty-state"><i class="fa fa-check-square-o"></i><p>还没有待办事项</p><p style="font-size:12px;margin-top:8px;">点击底部按钮添加你的第一个待办</p></div>
      </div>
      <button class="btn-primary" style="width:100%;margin-top:12px;"><i class="fa fa-plus"></i> 创建新待办</button>
    </div>
  `;
  document.body.appendChild(modal);
}

function switchMemoTab(el, tab) {
  el.parentElement.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const content = document.getElementById('memoContent'); if(!content) return;
  if (tab === 'habit') {
    content.innerHTML = '<div class="empty-state"><i class="fa fa-fire"></i><p>还没有习惯</p><p style="font-size:12px;margin-top:8px;">添加你想养成的习惯，每天打卡追踪</p></div>';
  } else if (tab === 'anniversary') {
    content.innerHTML = '';
    state.anniversaries.forEach(a => {
      const days = Math.floor((new Date() - new Date(a.date)) / 86400000);
      const item = document.createElement('div');
      item.className = 'list-item';
      item.innerHTML = `<div class="content"><div class="title">${a.name}</div><div class="desc">${a.date}</div></div><div style="font-size:18px;font-weight:600;color:var(--primary);">${Math.abs(days)}<span style="font-size:12px;color:var(--text-dim);">天</span></div>`;
      content.appendChild(item);
    });
  } else {
    content.innerHTML = '<div class="empty-state"><i class="fa fa-check-square-o"></i><p>还没有待办事项</p><p style="font-size:12px;margin-top:8px;">点击底部按钮添加你的第一个待办</p></div>';
  }
}

/* ===== 会话管理 ===== */
function showSessionManager() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-box" style="max-height:80vh;overflow-y:auto;">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
      <h4>💬 会话管理</h4>
      <div style="display:flex;gap:10px;margin-bottom:16px;">
        <button class="btn-primary" style="flex:1;"><i class="fa fa-plus"></i> 新建会话</button>
        <button class="btn-secondary" style="flex:1;"><i class="fa fa-users"></i> 群聊设置</button>
      </div>
      <div class="session-list" id="sessionList"></div>
    </div>
  `;
  document.body.appendChild(modal);
  renderSessions();
}

function renderSessions() {
  const list = document.getElementById('sessionList'); if(!list) return;
  list.innerHTML = '';
  state.sessions.forEach(s => {
    const item = document.createElement('div');
    item.className = 'session-item';
    item.innerHTML = `
      <div class="avatar"></div>
      <div class="info"><div class="name">${s.name}</div><div class="preview">${s.preview}</div></div>
      <div style="text-align:right;"><div style="font-size:11px;color:var(--text-dim);">${s.time}</div>${s.unread > 0 ? `<div style="display:inline-block;padding:2px 6px;background:var(--primary);color:#fff;border-radius:10px;font-size:10px;margin-top:4px;">${s.unread}</div>` : ''}</div>
    `;
    list.appendChild(item);
  });
}

/* ===== 昼夜模式 ===== */
function toggleNightMode() {
  state.settings.nightMode = !state.settings.nightMode;
  document.body.setAttribute('data-theme', state.settings.nightMode ? 'dark' : 'light');
  showToast(state.settings.nightMode ? '已切换到夜模式' : '已切换到昼模式');
  saveData();
}

/* ===== 拼字卡（主页不展示，保留功能） ===== */
function addCustomWord() {
  const input = $('wordInput');
  if (input && input.value.trim()) {
    state.wordBank.push(input.value.trim());
    input.value = '';
    renderWordBank();
  }
}

function renderWordBank() {
  const bank = $('wordBank'); if(!bank) return;
  bank.innerHTML = '';
  state.wordBank.forEach(word => {
    const card = document.createElement('span');
    card.className = 'word-card';
    card.textContent = word;
    card.onclick = () => {
      state.currentWordDisplay.push(word);
      renderWordDisplay();
    };
    bank.appendChild(card);
  });
}

function renderWordDisplay() {
  const display = $('wordDisplay'); if(!display) return;
  display.innerHTML = '';
  state.currentWordDisplay.forEach((word, idx) => {
    const card = document.createElement('span');
    card.className = 'word-card in-display';
    card.textContent = word;
    card.onclick = () => { state.currentWordDisplay.splice(idx, 1); renderWordDisplay(); };
    display.appendChild(card);
  });
}

function shuffleWords() {
  state.wordBank.sort(() => Math.random() - 0.5);
  renderWordBank();
}

function clearWordDisplay() {
  state.currentWordDisplay = [];
  renderWordDisplay();
}

function saveWordMessage() {
  if (state.currentWordDisplay.length === 0) { showToast('请先拼出字卡'); return; }
  const msg = state.currentWordDisplay.join('');
  state.savedWordMessages.push(msg);
  const display = $('savedMessageDisplay'); if(display) display.textContent = '已保存：' + msg;
  showToast('情话已保存');
}

/* ===== 初始化 ===== */
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initLockScreen();
  initMainPage();
  initPatternModal();
  initBgUploads();

  const ri = $('restoreInput');
  if(ri) ri.addEventListener('change', e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try { const data = JSON.parse(ev.target.result); Object.assign(state, data); saveData(); showToast('恢复成功，请刷新页面'); }
      catch { showToast('文件格式错误'); }
    };
    reader.readAsText(file);
  });

  // 页面指示器点击
  document.querySelectorAll('.page-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => { state.currentPage = i; updatePageIndicator(); });
  });
});
