import Link from "next/link";

function Menu() {
  return (
    <>
      <Link href="/calc">Calculator</Link>
      <Link href="/pse">List of Stocks</Link>
      <Link href="/trial">Trial</Link>
    </>
  );
}

export default Menu;
