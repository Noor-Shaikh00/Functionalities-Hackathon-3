import Link from "next/link";
import { FaEnvelope, FaPhoneAlt, FaUser } from "react-icons/fa";

const TopBar = () => {

  return (
    <div className="bg-violet-700 text-white py-2 text-sm">
      <div className="w-full max-w-[1200px] mx-auto flex items-center justify-between px-4 whitespace-nowrap">
        {/* Left Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Email - Hidden on small screens */}
          <a
            href="mailto:developernoorshaikh00@gmail.com"
            className="hidden sm:flex items-center gap-2 hover:text-gray-200"
          >
            <FaEnvelope />
            <span className="hidden md:inline">developernoorshaikh00@gmail.com</span>
          </a>
          {/* Phone - Hidden on small screens */}
          <a
            href="tel:1234567890"
            className="hidden sm:flex items-center gap-2 hover:text-gray-200"
          >
            <FaPhoneAlt />
            <span className="hidden md:inline">(12345)6789</span>
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative cursor-pointer flex items-center gap-1">
            <span>English</span>
            <span className="text-xs">▼</span>
          </div>

          {/* Currency Selector */}
          <div className="relative cursor-pointer flex items-center gap-1">
            <span>USD</span>
            <span className="text-xs">▼</span>
          </div>

          {/* Login */}
          <div className="flex items-center gap-2 hover:text-gray-200">
            <Link href="/account">
              <FaUser />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
