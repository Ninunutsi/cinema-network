import { Avatar } from "../atoms/Avatar";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

import { useState } from "react";
import { DropdownTrigger } from "./ProfileDropdown";

// export const DropdownTrigger = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <button
//       type="button"
//       onClick={() => setIsOpen((open) => !open)}
//       className="flex items-center size-4"
//     >
//       <ChevronDown
//         className={`size-full transition-transform text-white ${
//           isOpen ? "rotate-180" : "rotate-0"
//         }`}
//       />
//     </button>
//   );
// };

export const Profile = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-3">
        <Avatar />
        <p className="font-sans text-sm font-semibold leading-none text-white">
          Name
        </p>
      </div>
      <DropdownTrigger />
    </div>
  );
};
