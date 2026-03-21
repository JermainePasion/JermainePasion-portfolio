import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#2D2C2C] font-sans dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 text-center sm:text-left place-items-center">

          <div className="flex flex-col items-center sm:items-start">
            <p className="font-semibold text-[#eeeeee] dark:text-white">
              Professional Email
            </p>

            <div className="mt-4">
              <p className="text-[#eeeeee] hover:underline hover:text-blue-500 cursor-pointer transition">
                jermainepasion@gmail.com
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <p className="font-semibold text-[#eeeeee] dark:text-white">
              Portfolio
            </p>

            <div className="mt-4">
              <a
                href="https://jermainepasion.jobs180.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#eeeeee] hover:underline hover:text-blue-500 transition"
              >
                Jobs180
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center gap-5 cursor-pointer">
            <a href="https://www.facebook.com/jermaineriley.pasion/" target="_blank">
              <img src="https://www.svgrepo.com/show/303114/facebook-3-logo.svg" width="28" alt="fb" />
            </a>

            <a href="https://www.instagram.com/mainejerms/" target="_blank">
                <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="28" alt="inst" />
            </a>
            <a href="https://github.com/JermainePasion" target="_blank">
              <img src="https://www.svgrepo.com/show/94698/github.svg" width="28" alt="gt" />
            </a>
            <a href="https://www.linkedin.com/in/jermaine-pasion-67415a343/" target="_blank">
              <img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="28" alt="in" />
            </a>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <p className="text-center text-[#eeeeee] text-sm md:text-base">
            Jermaine Riley M. Pasion
          </p>
        </div>
      </div>
    </footer>
  );
}