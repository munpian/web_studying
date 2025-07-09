const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const overlay = document.getElementById('overlay');
const items = document.querySelectorAll('.menu-item, .logout');

// メニュー表示/非表示の切り替え
function toggleMenu(open) {
  if (open) {
    menu.classList.add('open');
    overlay.classList.add('show');
  } else {
    menu.classList.remove('open');
    overlay.classList.remove('show');
  }
}

// ハンバーガークリックでメニュー開閉
hamburger.addEventListener('click', () => {
  const isOpen = menu.classList.contains('open');
  toggleMenu(!isOpen);
});

// オーバーレイクリックで閉じる
overlay.addEventListener('click', () => toggleMenu(false));

// 各メニュー項目クリック時の処理
items.forEach(item => {
  item.addEventListener('click', () => {
    const action = item.dataset.action;
    console.log(`「${action}」アクションが発動しました`);

    // 必要に応じて switch 文などで処理を振り分け可能
    switch (action) {
      case 'logout':
        alert("ログアウトします！");
        break;
      case 'action1':
        alert("例Ⅰをクリックしました");
        break;
      case 'action2':
        alert("例Ⅱをクリックしました");
        break;
      // 他も同様に…
    }

    // メニューを閉じる
    toggleMenu(false);
  });
});
