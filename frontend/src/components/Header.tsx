export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#2b6cb0"/>
          <path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <div>
          <strong>VidaPlus</strong>
          <div className="subtitle">SGHSS</div>
        </div>
      </div>
    </header>
  )
}


