import { Footer }          from './components/Footer'
import { Header }          from './components/Header'
import { SetupGuide }      from './components/SetupGuide'

export default function App() {
  return (
    <>
      <Header />
      <main className="page-main mx-auto px-4 pb-14 sm:px-6">
        <div className="page-content mx-auto">
          <SetupGuide />
        </div>
      </main>
      <Footer />
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
document.body.addEventListener('click', function (e) {
  var btn = e.target.closest && e.target.closest('.code-copy-btn');
  if (!btn) return;
  e.preventDefault();
  var text = btn.getAttribute('data-copy-text');
  if (!text) {
    var source = btn.closest('[data-copy-source]');
    var valueEl = source && source.querySelector('[data-copy-value]');
    if (valueEl) {
      text = valueEl.textContent || '';
    } else {
      var wrap = btn.closest('.code-wrap');
      var codeEl = wrap && wrap.querySelector('.code-body code');
      if (!codeEl) return;
      text = codeEl.textContent || '';
    }
  }
  function done() {
    btn.setAttribute('data-copied', 'true');
    setTimeout(function () { btn.removeAttribute('data-copied'); }, 2000);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else { fallback(); }
  function fallback() {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (x) {}
    document.body.removeChild(ta);
  }
});
})();`,
        }}
      />
    </>
  )
}
