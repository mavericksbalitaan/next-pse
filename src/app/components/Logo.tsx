import Image from "next/image";

function Logo() {
  return (
    <>
      <h1 className="text-3xl mb-4">Everything about</h1>
      <Image src="PSE_logo.webp" width={300} height={300} alt="PSE_logo" />
      <h2 className="text-2xl underline my-4">The Philippine Stock Exchange, Inc.</h2>
    </>
  );
}

export default Logo;
