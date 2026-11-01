export default function HighlightText({ text, search }: { text: string; search: string }) {
    if (!search.trim()) {
      return <>{text}</>;
    }

    const regex = new RegExp(
      `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    const parts = text.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <span
              key={index}
              className="rounded bg-yellow-200 px-0.5 font-semibold text-black"
            >
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )}
      </>
    );
  }