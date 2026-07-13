export default function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6.6 3h-2A1.6 1.6 0 0 0 3 4.7C3 13.1 10.9 21 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.3-1.6l-2.7-.5a1.6 1.6 0 0 0-1.6.7l-.8 1.2a13 13 0 0 1-5.8-5.8l1.2-.8a1.6 1.6 0 0 0 .7-1.6l-.5-2.7A1.6 1.6 0 0 0 6.6 3Z" />
    </svg>
  )
}
