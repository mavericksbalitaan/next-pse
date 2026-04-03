import Image from "next/image";
import Menu from './Menu';

function Logo() {
  return (
    <div className="flex flex-col align-center justify-center text-center min-h-screen">
      <h1 className="text-3xl mb-4">Everything about</h1>
      <Image src="/PSE_logo.webp" width={300} height={300} alt="PSE_logo" />
      <h2 className="text-2xl underline my-4">The Philippine Stock Exchange, Inc.</h2>
			<Menu />
    </div>
  );
}

export default Logo;
