const Footer = () => {
  return (
    <footer className="bg-neutral-700 shadow-lg shadow-gray-400 mt-8 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="mb-4">
          © {new Date().getFullYear()} Sonex, a product of 8iVisions. All Rights Reserved.
        </p>
        {/* <ul className="flex justify-center space-x-6">
          <li>
            <a
              href="/privacy-policy"
              className="text-yellow-400 hover:text-yellow-500 transition duration-300"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/terms"
              className="text-yellow-400 hover:text-yellow-500 transition duration-300"
            >
              Terms of Service
            </a>
          </li>
          <li>
            <a
              href="/support"
              className="text-yellow-400 hover:text-yellow-500 transition duration-300"
            >
              Support
            </a>
          </li>
        </ul> */}
        <p>Created by <a href="https://github.com/izzymadethat" className="text-primary underline visited:text-primary/90" target="_blank" rel="noreferrer">Isaiah Vickers</a></p>
      </div>
    </footer>
  );
};

export default Footer;
