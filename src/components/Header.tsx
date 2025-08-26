import Link from "next/link";
import BanorteLogo from "./BanorteLogo";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-b-[#382929] px-10 py-3">
      <div className="flex items-center gap-4 text-textPrimary">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#C41E3A' }}
          >
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          <h2
            className="text-xl font-bold tracking-wider"
            style={{ color: '#C41E3A' }}
          >
            BANORTE
          </h2>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-9">
          {['Inicio','Documentos','Ayuda'].map((item) => (
            <Link key={item} href="#" className="text-sm font-medium leading-normal text-textPrimary">
              {item}
            </Link>
          ))}
        </nav>
        <button
          className="flex size-10 items-center justify-center rounded-full bg-surface1 text-textPrimary transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-textPrimary/30"
          aria-label="Ayuda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
          </svg>
        </button>
        <div
          className="size-10 rounded-full bg-cover bg-center"
          style={{ backgroundImage: 'url("https://i.pravatar.cc/80")' }}
          aria-label="Perfil"
        />
      </div>
    </header>
  );
}
