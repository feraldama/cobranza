"use client";

export default function ActionButton({
  label,
  onClick,
  icon: Icon,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-800 whitespace-nowrap ${
        className ? className : "text-white"
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </button>
  );
}
