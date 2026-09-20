interface LogoProps {
  size?: number
  withWordmark?: boolean
}

/** Événora mark — an abstract minimal "event spark" inside a soft rounded frame. */
export default function Logo({ size = 30, withWordmark = true }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Événora"
        role="img"
      >
        <rect x="2" y="2" width="28" height="28" rx="10" fill="#211A1A" />
        <path
          d="M16 8.5L18.1 13.8L23.5 16L18.1 18.2L16 23.5L13.9 18.2L8.5 16L13.9 13.8L16 8.5Z"
          fill="#F4D9CD"
        />
        <circle cx="23" cy="9" r="1.6" fill="#D66A7A" />
      </svg>
      {withWordmark && (
        <span className="font-sans text-[19px] font-semibold tracking-[-0.02em] text-evenora-ink">
          Événora
        </span>
      )}
    </span>
  )
}
