const NAV_ITEMS = [
  { id: 'what-it-is', label: 'What is TON MCP' },
  { id: 'getting-started', label: 'Getting started' },
  { id: 'skills', label: 'Skills' },
  { id: 'mcp', label: 'MCP' },
]

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-outer">
        <div className="site-header-inner">
          <a href="#what-it-is" className="site-brand">
            <TONLogo />
            <h1 className="site-brand-title">
              MCP
            </h1>
          </a>
          <nav className="site-nav" aria-label="Guide sections">
            {NAV_ITEMS.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="site-nav-link">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

function TONLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 28 28"
      fill="none"
      role="img"
      aria-label="TON"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 14.001C28 21.733 21.732 28.001 14 28.001C6.26801 28.001 0 21.733 0 14.001C0 6.26899 6.26801 0.000976562 14 0.000976562C21.732 0.000976562 28 6.26899 28 14.001ZM9.21931 8.00098H18.7801H18.7813C20.538 8.00098 21.6522 9.89966 20.7691 11.4302L14.8672 21.6576C14.4822 22.3254 13.5172 22.3254 13.1322 21.6576L7.23158 11.4302C6.34721 9.89726 7.4614 8.00098 9.21931 8.00098ZM13.1262 18.5882V9.74806H9.21811C8.78976 9.74806 8.53708 10.2029 8.74163 10.5578L11.8423 16.1035L13.1262 18.5882ZM16.1559 16.1047L19.2554 10.5566C19.4599 10.2017 19.2073 9.74685 18.7789 9.74685H14.8709V18.5906L16.1559 16.1047Z"
        fill="var(--accent-default)"
      />
      <path
        d="M18.7802 8.00098H9.21936C7.46145 8.00098 6.34727 9.89726 7.23164 11.4302L13.1322 21.6576C13.5173 22.3254 14.4823 22.3254 14.8673 21.6576L20.7691 11.4302C21.6523 9.89966 20.5381 8.00098 18.7814 8.00098H18.7802ZM13.1274 18.5906L11.8424 16.1035L8.74168 10.5578C8.53714 10.2029 8.78981 9.74806 9.21816 9.74806H13.1262V18.5918L13.1274 18.5906ZM19.2555 10.5566L16.156 16.1047L14.8709 18.5906V9.74685H18.779C19.2073 9.74685 19.46 10.2017 19.2555 10.5566Z"
        fill="var(--background-page)"
      />
    </svg>
  )
}
