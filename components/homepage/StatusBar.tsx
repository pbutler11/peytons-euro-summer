export function StatusBar() {
    return (
      <div className="status-bar">
        <div className="status-badge">● ONLINE</div>
        <div className="status-text">
          <span className="status-label">currently in:</span> bologna, italy 🇮🇹
          &nbsp;|&nbsp;
          <span className="status-label">away msg:</span>{' '}
          <span className="status-msg">"eating pasta brb"</span>
        </div>
      </div>
    );
  }