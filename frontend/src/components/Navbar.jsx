import React, { useState } from "react";
// import { IoMenu } from "react-icons/io";

const Navbar = () => {
  const [navModal, setNavModal] = useState(false);

  const MobileNav = () => {
    return (
      <nav className="flex flex-col gap-7 pt-10 ">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Admissions", path: "/admissions" },
          { name: "Programs", path: "/programs" },
          { name: "Media", path: "/media" },
          { name: "Contact", path: "/contact" },
        ].map((link) => (
          <a
            key={link.path}
            href={link.path} // Use standard <a> tag with href for navigation
            className="text-base leading-6 hover:text-primary-color"
          >
            {link.name}
          </a>
        ))}
      </nav>
    );
  };

  return (
    <section className="fixed top-0 left-0 flex items-center justify-between h-[104px] shadow-[0px_1px_4px_0px_#00000040] px-10 w-full z-50 bg-[#FEFEFE]">
      <div>
        <a href="/">
          {" "}
          {/* Use <a> tag for the main logo */}
          {/* Insert your logo or brand name here */}
        </a>
      </div>
      <nav className="xxs:hidden xs:hidden sm:hidden md:hidden lg:flex xl:flex flex gap-7 ">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Admissions", path: "/admissions" },
          { name: "Programs", path: "/programs" },
          { name: "Media", path: "/media" },
          { name: "Contact", path: "/contact" },
        ].map((link) => (
          <a
            key={link.path}
            href={link.path} // Standard <a> tag
            className="text-base leading-6 hover:text-primary-color"
          >
            {link.name}
          </a>
        ))}
      </nav>
      <div className="flex gap-4">
        <button className="md:hidden sm:hidden xs:hidden xxs:hidden w-[145px] h-[48px] border px-2 rounded text-base font-semibold leading-[18px] text-medium bg-primary-color shadow-[0px_1px_4px_0px_#00000040] text-white">
          <a href="/">Register Now</a> {/* Use <a> for Register Now */}
        </button>
        <button
          onClick={() => setNavModal(true)}
          className="w-auto h-[48px] border px-2 rounded text-base font-semibold leading-[18px] text-medium bg-primary-color shadow-[0px_1px_4px_0px_#00000040] text-white 2xl:hidden xl:hidden lg:hidden"
        >
          {/* <IoMenu size={30} /> */}
        </button>
      </div>
      {navModal && (
        <ScreenNav
          child={<MobileNav />}
          handleToggle={() => setNavModal(false)}
          value={navModal}
        />
      )}
    </section>
  );
};

export default Navbar;
