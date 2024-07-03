/* Librarys */
import { useEffect, useState } from "react";
import { FaRegCopyright } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";
import { TiSocialInstagram } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import { SlSocialInstagram } from "react-icons/sl";

/* Images */
import tmdbLogo from "../../assets/images/tmdb-logo.svg";

/* Helpers */
import texts from "../../helpers/Text-En.json";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {}, []);
  const yearNow = new Date().getFullYear();

  return (
    <div className="w-full py-8 px-4 md:px-28 h-72 text-white mt-8 bg-primaryDarkGrey relative flex">
      <div className="min-w-[340px] max-w-[700px] flex flex-row mx-auto self-center md:gap-16">
        <ul className="list-none font-semibold ml-auto mr-0 w-36">
          <li>
            <Link className="text-headingSm text-primaryOrange default-hover">
              About
            </Link>
          </li>
          <li>
            <Link className="text-headingSm text-primaryOrange default-hover">
              Career
            </Link>
          </li>
          <li>
            <Link className="text-headingSm text-primaryOrange default-hover">
              Contact us
            </Link>
          </li>
          <li className="flex flex-row">
            <Link
              to={"https://www.themoviedb.org/"}
              target="_blank"
              className="text-headingSm text-primaryOrange default-hover self-center"
            >
              TMDB
            </Link>
            <svg width="38" height="38" className="self-center ml-2">
              <image xlinkHref={tmdbLogo} width="30" height="38" />
            </svg>
          </li>
          <li className="flex flex-col">
            <div className="flex flex-row gap-2">
              <SlSocialFacebook className="text-headingSm self-center text-facebook default-hover" />
              <TiSocialTwitter className="text-headingMd self-center text-twitter default-hover" />
              <SlSocialInstagram className="text-headingSm self-center text-instagram default-hover" />
            </div>
          </li>
        </ul>
        <ul className="list-none mr-auto ml-0 w-36">
          <li className="mb-2 md:mb-4 sm:text-nowrap">
            <p className="text-headingSm text-primaryOrange font-semibold">
              Address
            </p>
            <p className="text-textSm font-thin">Lorem Ipsum Ltd.</p>
            <p className="text-textSm font-thin">1234 Dolor Sit Amet St.</p>
            <p className="text-textSm font-thin">Apt. 567.</p>
            <p className="text-textSm font-thin">
              Consectetur, Adipiscing 78901
            </p>
          </li>
          <li className="">
            <p className="text-textSm font-thin">Tel: (123) 456-7890</p>
          </li>
          <li className="">
            <p className="text-textSm font-thin">info@loremipsum.com</p>
          </li>
        </ul>
      </div>
      <p className="absolute flex flex-row align-middle bottom-0 right-1/2 translate-x-1/2 text-center text-nowrap font-thin text-textXs text-primaryOrange my-2">
        <FaRegCopyright className="self-center mr-2" /> 2024
        {`${yearNow === 2024 ? "" : ` - ${yearNow}`}`} by{" "}
        {texts.Global_PageName}
      </p>
    </div>
  );
};

export default Footer;
