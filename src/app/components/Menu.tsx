import Link from "next/link";

function Menu() {
  return (
    <>
      <Link
        href="/calc"
        className="hover:text-[#efc24e] hover:underline
"
      >
        Calculator
      </Link>
      <Link
        href="/pse"
        className="hover:text-[#efc24e] hover:underline
      "
      >
        List of Stocks
      </Link>
    </>
  );
}

export default Menu;
