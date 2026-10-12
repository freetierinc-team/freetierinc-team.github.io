/* 共通ナビゲーション。ツール追加は SITE_TOOLS_DEF に1件足すだけ。 */
(function () {
  'use strict';
  if (window.__ftnLoaded) return;
  window.__ftnLoaded = true;

  var ORIGIN = 'https://freetierinc-team.github.io';
  var SITE_TOOLS_DEF = [
    { name: '16:9白余白ツール', path: '/image-padding-tool/', desc: '縦長画像の左右に白余白を付けて16:9（初期640×360）にする' },
    { name: '斜め撮り正面化ツール', path: '/perspective-tool/', desc: '斜めに撮った液晶写真の4隅を合わせて正面から見た画像にする' },
    { name: '三重枠ツール', path: '/triple_frame/', desc: '画像をドラッグして白・赤・白の三重枠を描き込む' }
  ];

  var tools = SITE_TOOLS_DEF.map(function (t) {
    return { name: t.name, path: t.path, desc: t.desc, url: ORIGIN + t.path };
  });

  function isCurrent(tool, pathname) {
    var seg = String(pathname || '').split('/')[1] || '';
    return seg !== '' && '/' + seg + '/' === tool.path;
  }

  window.SITE_TOOLS = tools;
  window.SITE_NAV = { origin: ORIGIN, tools: tools, isCurrent: isCurrent };

  function build(pathname) {
    var css = ':root{--ftn-h:44px}' +
      '.ftn-bar{position:sticky;top:0;left:0;z-index:2147483000;box-sizing:border-box;width:100%;height:var(--ftn-h);display:flex;align-items:center;gap:8px;padding:0 12px;background:#1f1f1f;color:#eee;border-bottom:1px solid #3a3a3a;font:14px/1 system-ui,-apple-system,"Segoe UI","Hiragino Sans","Yu Gothic UI","Meiryo",sans-serif;text-align:left}' +
      '.ftn-bar *{box-sizing:border-box}' +
      '.ftn-home{flex:0 0 auto;color:#fff;font-weight:700;text-decoration:none;padding:6px 8px;border-radius:6px;white-space:nowrap}' +
      '.ftn-list{flex:1 1 auto;min-width:0;display:flex;align-items:center;gap:4px;justify-content:flex-end;overflow-x:auto;overflow-y:hidden;white-space:nowrap;scrollbar-width:none}' +
      '.ftn-list::-webkit-scrollbar{display:none}' +
      '.ftn-link{flex:0 0 auto;color:#bbb;text-decoration:none;padding:6px 10px;border-radius:6px;white-space:nowrap}' +
      '.ftn-home:hover,.ftn-link:hover{background:#333;color:#fff}' +
      '.ftn-link[aria-current="page"]{background:#3a3a3a;color:#fff;font-weight:700}' +
      '.ftn-bar a:focus-visible{outline:2px solid #6aa9ff;outline-offset:1px}';
    var style = document.createElement('style');
    style.id = 'ftn-style';
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('nav');
    bar.className = 'ftn-bar';
    bar.setAttribute('aria-label', '画像ツール共通ナビゲーション');
    var home = document.createElement('a');
    home.className = 'ftn-home';
    home.href = ORIGIN + '/';
    home.textContent = '画像ツール';
    bar.appendChild(home);
    var list = document.createElement('div');
    list.className = 'ftn-list';
    tools.forEach(function (t) {
      var a = document.createElement('a');
      a.className = 'ftn-link';
      a.href = t.url;
      a.textContent = t.name;
      if (isCurrent(t, pathname)) a.setAttribute('aria-current', 'page');
      list.appendChild(a);
    });
    bar.appendChild(list);
    // body の余白・幅制限の影響を受けないよう、body の直前（html直下）に置く
    var body = document.body;
    body.parentNode.insertBefore(bar, body);
  }

  window.SITE_NAV.render = build;
  function init() { build(location.pathname); }
  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
