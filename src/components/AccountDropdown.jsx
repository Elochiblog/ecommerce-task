import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { AssetImage } from "./AssetImage.jsx";
import { ICONS } from "../constants/icons.js";

const items = [
  {
    label: "Manage My Account",
    to: "/account",
    icon: ICONS.accountManage,
    fallback: "👤",
  },
  {
    label: "My Order",
    to: "/account",
    icon: ICONS.accountOrder,
    fallback: "📦",
  },
  {
    label: "My Cancellations",
    to: "/account",
    icon: ICONS.accountCancellations,
    fallback: "✕",
  },
  {
    label: "My Reviews",
    to: "/account",
    icon: ICONS.accountReviews,
    fallback: "⭐",
  },
];

export function AccountDropdown({ onClose }) {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    onClose();
    navigate("/");
  };

  return (
    <div className="absolute right-0 top-12 w-64 bg-brand-dark text-white rounded-md shadow-lg py-2 z-50">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/10"
        >
          <AssetImage
            src={item.icon}
            alt=""
            fallbackEmoji={item.fallback}
            fallbackTextClassName="text-sm"
            className="w-4 h-4 shrink-0"
            imgClassName="w-4 h-4"
          />
          {item.label}
        </Link>
      ))}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 text-left px-4 py-2.5 text-sm hover:bg-white/10 border-t border-white/10 mt-1"
      >
        <AssetImage
          src={ICONS.accountLogout}
          alt=""
          fallbackEmoji="🚪"
          fallbackTextClassName="text-sm"
          className="w-4 h-4 shrink-0"
          imgClassName="w-4 h-4"
        />
        Logout
      </button>
    </div>
  );
}
