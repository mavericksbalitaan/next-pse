import { FaHome } from "react-icons/fa";
import Link from "next/link";

function HomeIcon() {
  return (
    <div className="fixed bottom-8 right-8 hover:scale-[1.1] hover:bg-[#efc24e] border-2 rounded-full p-1">
      <Link href="/">
        <FaHome style={{ fontSize: "2rem"}} />
      </Link>
    </div>
  );
}

export default HomeIcon;
