import { Footer }          from './components/Footer'
import { Header }          from './components/Header'
import { SetupGuide }      from './components/SetupGuide'

export default function App() {
  return (
    <>
      <div className="page-accent" />
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-14 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-[58rem]">
          <SetupGuide />
          <Footer />
        </div>
      </main>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
document.body.addEventListener('click', function (e) {
  var btn = e.target.closest && e.target.closest('.code-copy-btn');
  if (!btn) return;
  e.preventDefault();
  var text = btn.getAttribute('data-copy-text');
  if (!text) {
    var wrap = btn.closest('.code-wrap');
    var codeEl = wrap && wrap.querySelector('.code-body code');
    if (!codeEl) return;
    text = codeEl.textContent || '';
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
