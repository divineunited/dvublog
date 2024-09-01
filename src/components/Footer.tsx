const Footer = () => {
  return (
    <footer>
      <p>© 2024 DivineUnited. All rights reserved.</p>
      <style jsx>{`
        footer {
          padding: 24px;
          background: linear-gradient(to right, #2c3e50, #3498db);
          color: white;
          text-align: center;
          font-size: 14px;
        }
        p {
          max-width: 1200px;
          margin: 0 auto;
          opacity: 0.8;
          transition: opacity 0.2s ease-in-out;
        }
        p:hover {
          opacity: 1;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
