import { Footer }          from './components/Footer'
import { Header }          from './components/Header'
import { SetupGuide }      from './components/SetupGuide'
import { TableOfContents } from './components/TableOfContents'

export default function App() {
  return (
    <>
      {/* CSS-only theme switcher — three radios, auto is default */}
      <input type="radio" name="theme" id="theme-auto"  className="theme-radio" defaultChecked />
      <input type="radio" name="theme" id="theme-light" className="theme-radio" />
      <input type="radio" name="theme" id="theme-dark"  className="theme-radio" />

      <div className="page-accent" />
      <main className="mx-auto max-w-6xl px-6 pb-14 pt-16">
        <Header />
        <div className="mt-8 flex flex-col-reverse gap-8 lg:mt-10 lg:grid lg:grid-cols-[minmax(0,1fr)_12.5rem] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,1fr)_15rem]">
          <div className="min-w-0">
            <SetupGuide />
            <Footer />
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TableOfContents />
          </aside>
        </div>
      </main>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){
document.body.addEventListener('click', function (e) {
  var btn = e.target.closest && e.target.closest('.code-copy-btn');
  if (!btn) return;
  e.preventDefault();
  var wrap = btn.closest('.code-wrap');
  var codeEl = wrap && wrap.querySelector('.code-body code');
  if (!codeEl) return;
  var text = codeEl.textContent || '';
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
