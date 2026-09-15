export default function Footer() {
  return (
    <footer className="border-t border-border py-10 text-center text-sm text-muted">
      <p>&copy; {new Date().getFullYear()} The Ledger — a blog platform.</p>
    </footer>
  );
}
