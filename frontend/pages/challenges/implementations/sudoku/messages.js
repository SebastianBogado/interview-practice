export function ErrorMessage({ error }) {
  return (<p className="error">{error}</p>);
}
  
export function WinMessage() {
  return (<p className="win">You won!</p>);
}
  
export function Message({ children }) {
  return (
    <div className="message">
      {children}
    </div>
  );
}