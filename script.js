function showModal(id) { document.getElementById(id).classList.add('show'); }
function hideModal(id) { document.getElementById(id).classList.remove('show'); }

document.addEventListener('click', function(e) {
  document.querySelectorAll('.modal-overlay').forEach(function(o) {
    if (e.target === o) o.classList.remove('show');
  });
});

function toast(msg) {
  var el = document.createElement('div');
  el.textContent = msg;
  el.style.cssText = 'position:fixed;top:28%;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.7);color:#fff;padding:10px 24px;border-radius:14px;font-size:14px;z-index:9999;pointer-events:none;animation:fadeInOut 2s ease forwards;';
  document.body.appendChild(el);
  setTimeout(function() { el.remove(); }, 2000);
}
if (!document.getElementById('toastStyle')) {
  var st = document.createElement('style');
  st.id = 'toastStyle';
  st.textContent = '@keyframes fadeInOut { 0%{opacity:0;transform:translateX(-50%) translateY(-8px)} 20%{opacity:1;transform:translateX(-50%) translateY(0)} 80%{opacity:1} 100%{opacity:0} }';
  document.head.appendChild(st);
}

var lockPattern = JSON.parse(localStorage.getItem('lockPattern')) || [1,4,7,8,9];
var currentStep = 0;
var isUnlocked = false;

function updateTime() {
  var now = new Date();
  var h = String(now.getHours()).padStart(2,'0');
  var m = String(now.getMinutes()).padStart(2,'0');
  var timeStr = h + ':' + m;
  document.getElementById('lockTime').textContent = timeStr;
  document.getElementById('topTime').textContent = timeStr;
  var days = ['日','一','二','三','四','五','六'];
  document.getElementById('lockDate').textContent = now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日 星期'+days[now.getDay()];
}
updateTime();
setInterval(updateTime, 1000);

document.querySelectorAll('.unlock-dot').forEach(function(dot) {
  dot.addEventListener('click', function() {
    if (isUnlocked) return;
    var idx = parseInt(this.dataset.idx);
    if (idx === lockPattern[currentStep]) {
      this.classList.add('active');
      currentStep++;
      if (currentStep === lockPattern.length) { isUnlocked = true; showModal('unlockModal'); }
    } else {
      document.querySelectorAll('.unlock-dot').forEach(d => d.classList.remove('active'));
      currentStep = 0;
      toast('解锁图案错误');
    }
  });
  dot.addEventListener('dblclick', function() { if (!isUnlocked) showModal('patternModal'); });
});

document.getElementById('enterMainBtn').addEventListener('click', function() {
  hideModal('unlockModal');
  document.getElementById('lockScreen').classList.add('hide');
  loadMainData();
});

document.getElementById('lockBgLayer').addEventListener('click', function() { if (!isUnlocked) showModal('lockBgModal'); });
document.getElementById('lockTextDisplay').addEventListener('click', function() {
  if (isUnlocked) return;
  document.getElementById('textInput').value = this.textContent;
  showModal('textEditModal');
});

var tempPattern = [];
document.querySelectorAll('.pattern-dot').forEach(function(d) {
  d.addEventListener('click', function() {
    var val = parseInt(this.dataset.pidx);
    if (tempPattern.includes(val)) return;
    tempPattern.push(val);
    this.classList.add('selected');
    document.getElementById('patternPreview').textContent = '当前：' + tempPattern.join('→');
  });
});
document.getElementById('patternCancel').addEventListener('click', function() {
  hideModal('patternModal');
  tempPattern = [];
  document.querySelectorAll('.pattern-dot').forEach(d => d.classList.remove('selected'));
});
document.getElementById('patternSave').addEventListener('click', function() {
  if (tempPattern.length < 3) { toast('至少选择3个点'); return; }
  lockPattern = tempPattern.slice();
  localStorage.setItem('lockPattern', JSON.stringify(lockPattern));
  currentStep = 0;
  document.querySelectorAll('.unlock-dot').forEach(d => d.classList.remove('active'));
  toast('解锁图案已更新');
  hideModal('patternModal');
  tempPattern = [];
  document.querySelectorAll('.pattern-dot').forEach(d => d.classList.remove('selected'));
});

document.getElementById('textEditSave').addEventListener('click', function() {
  var text = document.getElementById('textInput').value.trim() || '❤ 心动信号 ❤';
  var color = document.getElementById('textColorPicker').value;
  var el = document.getElementById('lockTextDisplay');
  el.textContent = text;
  el.style.color = color;
  localStorage.setItem('lockText', text);
  localStorage.setItem('lockTextColor', color);
  hideModal('textEditModal');
});
document.getElementById('textEditCancel').addEventListener('click', function() { hideModal('textEditModal'); });

function uploadAvatar(id) {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      var dataUrl = ev.target.result;
      if (id === 'avatarLeft') {
        document.getElementById('avatarLeft').style.backgroundImage = 'url('+dataUrl+')';
        document.getElementById('mainAvatarLeft').style.backgroundImage = 'url('+dataUrl+')';
        localStorage.setItem('avatarLeft', dataUrl);
      } else if (id === 'avatarRight') {
        document.getElementById('avatarRight').style.backgroundImage = 'url('+dataUrl+')';
        document.getElementById('mainAvatarRight').style.backgroundImage = 'url('+dataUrl+')';
        localStorage.setItem('avatarRight', dataUrl);
      }
      toast('头像已更新');
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

document.getElementById('coupleCardBg').addEventListener('click', function() { showModal('coupleBgModal'); });
document.getElementById('coupleBgSave').addEventListener('click', function() {
  var file = document.getElementById('coupleBgUpload').files[0];
  if (!file) { toast('请选择图片'); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = e.target.result;
    document.getElementById('coupleCardBg').style.backgroundImage = 'url('+dataUrl+')';
    document.getElementById('coupleHint').style.display = 'none';
    localStorage.setItem('coupleBg', dataUrl);
    toast('卡片背景已更新');
    hideModal('coupleBgModal');
  };
  reader.readAsDataURL(file);
});
document.getElementById('coupleBgCancel').addEventListener('click', function() { hideModal('coupleBgModal'); });

function uploadPlayerCover() { showModal('playerCoverModal'); }
document.getElementById('playerCoverSave').addEventListener('click', function() {
  var file = document.getElementById('playerCoverUpload').files[0];
  if (!file) { toast('请选择图片'); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataUrl = e.target.result;
    var cover = document.getElementById('playerCover');
    cover.style.backgroundImage = 'url('+dataUrl+')';
    cover.innerHTML = '';
    localStorage.setItem('playerCover', dataUrl);
    toast('封面已更新');
    hideModal('playerCoverModal');
  };
  reader.readAsDataURL(file);
});
document.getElementById('playerCoverCancel').addEventListener('click', function() { hideModal('playerCoverModal'); });

function editNick(which) {
  var input = document.getElementById('nicknameInput');
  if (which === 'n1') { input.placeholder = '输入你的昵称'; input.dataset.target = 'nick1'; }
  else { input.placeholder = '输入对方的昵称'; input.dataset.target = 'nick2'; }
  input.value = '';
  showModal('nicknameModal');
}
document.getElementById('nickSave').addEventListener('click', function() {
  var input = document.getElementById('nicknameInput');
  var val = input.value.trim() || (input.dataset.target === 'nick1' ? '我' : '梦角');
  var targetId = input.dataset.target;
  document.getElementById(targetId).textContent = val;
  localStorage.setItem(targetId === 'nick1' ? 'nick1' : 'nick2', val);
  hideModal('nicknameModal');
});
document.getElementById('nickCancel').addEventListener('click', function() { hideModal('nicknameModal'); });

function editSongName() {
  document.getElementById('songNameInput').value = document.getElementById('songNameDisplay').textContent;
  showModal('songNameModal');
}
document.getElementById('songNameSave').addEventListener('click', function() {
  var val = document.getElementById('songNameInput').value.trim() || '心动旋律';
  document.getElementById('songNameDisplay').textContent = val;
  localStorage.setItem('songName', val);
  hideModal('songNameModal');
});

document.getElementById('lockBgSave').addEventListener('click', function() {
  var file = document.getElementById('lockBgUpload').files[0];
  if (!file) { toast('请选择图片'); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('lockScreen').style.backgroundImage = 'url('+e.target.result+')';
    localStorage.setItem('lockBg', e.target.result);
    toast('锁屏背景已更新');
    hideModal('lockBgModal');
  };
  reader.readAsDataURL(file);
});
document.getElementById('lockBgCancel').addEventListener('click', function() { hideModal('lockBgModal'); });

document.getElementById('mainBgSave').addEventListener('click', function() {
  var file = document.getElementById('mainBgUpload').files[0];
  if (!file) { toast('请选择图片'); return; }
  var reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('mainPage').style.backgroundImage = 'url('+e.target.result+')';
    localStorage.setItem('mainBg', e.target.result);
    toast('主界面背景已更新');
    hideModal('mainBgModal');
  };
  reader.readAsDataURL(file);
});
document.getElementById('mainBgCancel').addEventListener('click', function() { hideModal('mainBgModal'); });

function loadLockData() {
  var text = localStorage.getItem('lockText');
  if (text) document.getElementById('lockTextDisplay').textContent = text;
  var color = localStorage.getItem('lockTextColor');
  if (color) document.getElementById('lockTextDisplay').style.color = color;
  var avL = localStorage.getItem('avatarLeft');
  if (avL) document.getElementById('avatarLeft').style.backgroundImage = 'url('+avL+')';
  var avR = localStorage.getItem('avatarRight');
  if (avR) document.getElementById('avatarRight').style.backgroundImage = 'url('+avR+')';
  var lockBg = localStorage.getItem('lockBg');
  if (lockBg) document.getElementById('lockScreen').style.backgroundImage = 'url('+lockBg+')';
}
function loadMainData() {
  var avL = localStorage.getItem('avatarLeft');
  if (avL) document.getElementById('mainAvatarLeft').style.backgroundImage = 'url('+avL+')';
  var avR = localStorage.getItem('avatarRight');
  if (avR) document.getElementById('mainAvatarRight').style.backgroundImage = 'url('+avR+')';
  var n1 = localStorage.getItem('nick1');
  if (n1) document.getElementById('nick1').textContent = n1;
  var n2 = localStorage.getItem('nick2');
  if (n2) document.getElementById('nick2').textContent = n2;
  var song = localStorage.getItem('songName');
  if (song) document.getElementById('songNameDisplay').textContent = song;
  var mainBg = localStorage.getItem('mainBg');
  if (mainBg) document.getElementById('mainPage').style.backgroundImage = 'url('+mainBg+')';
  var coupleBg = localStorage.getItem('coupleBg');
  if (coupleBg) {
    document.getElementById('coupleCardBg').style.backgroundImage = 'url('+coupleBg+')';
    document.getElementById('coupleHint').style.display = 'none';
  }
  var playerCover = localStorage.getItem('playerCover');
  if (playerCover) {
    var cover = document.getElementById('playerCover');
    cover.style.backgroundImage = 'url('+playerCover+')';
    cover.innerHTML = '';
  }
  applyTheme();
  loadSavedMessage();
}
loadLockData();

function showThemeModal() {
  document.getElementById('themeBgColor').value = localStorage.getItem('themeBg') || '#ffffff';
  document.getElementById('themeIconColor').value = localStorage.getItem('themeIcon') || '#3a4a6b';
  document.getElementById('themeTextColor').value = localStorage.getItem('themeText') || '#e5e7eb';
  showModal('themeModal');
}
document.getElementById('themeSaveBtn').addEventListener('click', function() {
  var bg = document.getElementById('themeBgColor').value;
  var icon = document.getElementById('themeIconColor').value;
  var text = document.getElementById('themeTextColor').value;
  localStorage.setItem('themeBg', bg);
  localStorage.setItem('themeIcon', icon);
  localStorage.setItem('themeText', text);
  applyTheme();
  hideModal('themeModal');
  toast('主题已应用');
});
function applyTheme() {
  var bg = localStorage.getItem('themeBg');
  var icon = localStorage.getItem('themeIcon');
  var text = localStorage.getItem('themeText');
  if (bg) document.querySelectorAll('.app-item .icon').forEach(el => el.style.background = bg);
  if (icon) document.querySelectorAll('.app-item .icon i').forEach(el => el.style.color = icon);
  if (text) document.querySelectorAll('.app-item .label').forEach(el => el.style.color = text);
}

function backupAll() {
  var data = {};
  for (var key in localStorage) if (localStorage.hasOwnProperty(key)) data[key] = localStorage.getItem(key);
  var blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'love_backup_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast('💾 备份已下载');
}
function triggerRestore() { document.getElementById('restoreInput').click(); }
document.getElementById('restoreInput').addEventListener('change', function(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    try {
      var data = JSON.parse(ev.target.result);
      for (var key in data) if (data.hasOwnProperty(key)) localStorage.setItem(key, data[key]);
      toast('✅ 恢复成功！刷新页面查看效果');
      loadLockData();
      loadMainData();
      hideModal('toolModal');
    } catch(e) { toast('❌ 文件格式错误'); }
  };
  reader.readAsText(file);
  this.value = '';
});

var playing = false;
document.getElementById('playBtn').addEventListener('click', function() {
  playing = !playing;
  this.className = playing ? 'fa fa-pause' : 'fa fa-play';
  document.getElementById('playerCover').classList.toggle('playing', playing);
});

var wrap = document.querySelector('.app-grid-wrap');
var dots = document.querySelectorAll('.page-dot');
wrap.addEventListener('scroll', function() {
  var idx = Math.round(this.scrollLeft / this.clientWidth);
  dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
});
dots.forEach(function(dot) {
  dot.addEventListener('click', function() {
    var idx = parseInt(this.dataset.page);
    wrap.scrollTo({ left: idx * wrap.clientWidth, behavior: 'smooth' });
  });
});

// ===== 🧩 拼字卡 =====
var defaultWords = ['我','你','永','远','爱','情','心','动','陪','伴','甜','蜜'];
var wordBank = [];
var selectedWords = [];

function initWordBank() {
  var saved = localStorage.getItem('wordBank');
  wordBank = saved ? JSON.parse(saved) : defaultWords.slice();
  loadSavedMessage();
  renderWords();
}
function saveWordBank() { localStorage.setItem('wordBank', JSON.stringify(wordBank)); }
function renderWords() {
  var displayEl = document.getElementById('wordDisplay');
  var bankEl = document.getElementById('wordBank');
  displayEl.innerHTML = '';
  bankEl.innerHTML = '';
  selectedWords.forEach(function(w) {
    var span = document.createElement('span');
    span.className = 'word-card-item selected-card';
    span.textContent = w;
    span.onclick = function() { deselectWord(w); };
    displayEl.appendChild(span);
  });
  wordBank.forEach(function(w) {
    var span = document.createElement('span');
    span.className = 'word-card-item';
    span.textContent = w;
    span.onclick = function() { selectWord(w); };
    bankEl.appendChild(span);
  });
}
function selectWord(w) {
  var idx = wordBank.indexOf(w);
  if (idx === -1) return;
  wordBank.splice(idx, 1);
  selectedWords.push(w);
  saveWordBank();
  renderWords();
}
function deselectWord(w) {
  var idx = selectedWords.indexOf(w);
  if (idx === -1) return;
  selectedWords.splice(idx, 1);
  wordBank.push(w);
  saveWordBank();
  renderWords();
}
function shuffleWords() {
  for (var i = wordBank.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = wordBank[i];
    wordBank[i] = wordBank[j];
    wordBank[j] = temp;
  }
  saveWordBank();
  renderWords();
  toast('🔄 已洗牌');
}
function addCustomWord() {
  var input = document.getElementById('wordInput');
  var val = input.value.trim();
  if (!val) { toast('请输入一个字或词'); return; }
  if (val.length > 4) { toast('字数太多啦，建议4个字以内'); return; }
  wordBank.push(val);
  saveWordBank();
  input.value = '';
  renderWords();
  toast('✅ 已添加：' + val);
}
function clearWordDisplay() {
  if (selectedWords.length === 0) { toast('已经没有卡片了'); return; }
  selectedWords.forEach(function(w) { wordBank.push(w); });
  selectedWords = [];
  saveWordBank();
  renderWords();
  toast('已清空，重新开始吧');
}
function saveWordMessage() {
  if (selectedWords.length === 0) { toast('💡 先拼一句情话再保存吧'); return; }
  var msg = selectedWords.join('');
  localStorage.setItem('loveMessage', msg);
  loadSavedMessage();
  toast('❤️ 情话已保存：' + msg);
}
function loadSavedMessage() {
  var msg = localStorage.getItem('loveMessage');
  var el = document.getElementById('savedMessageDisplay');
  if (el) el.textContent = msg ? '💌 当前情话：' + msg : '💌 还未保存情话，拼一句吧';
}
initWordBank();
console.log('✨ 网站已升级：修复Bug + 新增拼字卡功能！');