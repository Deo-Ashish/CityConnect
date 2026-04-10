const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-zinc-700 mt-10">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} LocalFinder</p>

        <p className="text-sm mt-1">Discover trusted local services near you</p>
      </div>
    </footer>
  );
};

export default Footer;
