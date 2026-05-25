export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg-dark)',
      color: 'var(--color-text-white)',
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: 'var(--font-body)',
      fontSize: '14px',
      opacity: '0.8'
    }}>
      © {new Date().getFullYear()} SAGEC Ltd — Architectural and Engineering Solutions
    </footer>
  )
}
