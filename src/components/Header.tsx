import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-b-[#382929] px-10 py-3">
      <div className="flex items-center gap-4 text-textPrimary">
        <div className="size-4" aria-hidden>
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">DocuMind</h2>
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
