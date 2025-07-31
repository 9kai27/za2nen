const button = document.getElementById('triggerBtn');
const input = document.getElementById('inputText');
const display = document.getElementById('displayText');
const sound = document.getElementById('sound');

button.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  // 1. 表示テキストの更新と初期化
  display.textContent = text;
  display.style.opacity = '1';

  button.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
  
    display.textContent = text;
    display.style.transition = 'none';     // 一旦トランジションを無効化
    display.style.opacity = '1';
  
    // 再描画を強制 → トランジション再適用
    void display.offsetWidth;              // ← これがカギ！
    display.style.transition = 'opacity 6s ease'; // 再設定
  
    document.body.classList.add('active');
    sound.currentTime = 0;
    sound.play();
  
    requestAnimationFrame(() => {
      display.style.opacity = '0';
    });
  
    setTimeout(() => {
      display.textContent = '';
      input.value = '';
      document.body.classList.remove('active');
    }, 6000);
  });

  // 2. 背景色を水色系青に変更
  document.body.classList.add('active');

  // 3. 音再生（初期化してから）
  sound.currentTime = 0;
  sound.play();

  // 4. テキストを徐々に透明に
  requestAnimationFrame(() => {
    display.style.opacity = '0';
  });

  // 5. タイマーで状態リセット（6秒後）
  setTimeout(() => {
    display.textContent = '';
    input.value = ''; // 入力フィールドを消す
    document.body.classList.remove('active'); // 背景を白に戻す
  }, 6000);
});
