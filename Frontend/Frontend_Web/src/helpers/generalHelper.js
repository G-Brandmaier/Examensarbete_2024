/* Helpers */
import { differenceInDays } from "date-fns";
import texts from "./Text-En.json";

/* Click outside area */
export function handleClickOutside(ref, setOpen) {
  function handleClick(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClick);

  return () => {
    document.removeEventListener("mousedown", handleClick);
  };
}

/* Scroll to top of page */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

/* Get a random greeting */
export function greetingGenerator() {
  const greetings = [
    texts.Global_HelloThere,
    texts.Global_Aloha,
    texts.Global_ItsAMe,
    texts.Global_OhHi,
    texts.Global_Hello,
    texts.Global_Hi,
    texts.Global_WelcomeToTheGrid,
    texts.Global_Hey,
    texts.Global_Howdy,
    texts.Global_YourAWizard,
    texts.Global_ItsShowtime,
    texts.Global_WelcomeToTheRealWorld,
    texts.Global_WelcomeAboard,
    texts.Global_WelcomeToTheMadness,
    texts.Global_WelcomeToTheRebellion,
    texts.Global_WelcomeToTheDarkSide,
  ];

  const randomNumber = Math.floor(Math.random() * greetings.length);
  return greetings[randomNumber];
}

/* Calculate users medal/coin level */

export function getMemberDays(memberSinceDate) {
  const date = new Date();
  const compareDate = new Date(memberSinceDate);
  let days = differenceInDays(date, compareDate);
  return days;
}

export function getMemberMedal(memberSinceDate) {
  let days = getMemberDays(memberSinceDate);
  if (days < 10) {
    return "src/assets/images/medals/bronzeMedal.png";
  } else if (days >= 10 && days < 25) {
    return "src/assets/images/medals/silverMedal.png";
  } else if (days >= 25 && days < 50) {
    return "src/assets/images/medals/goldMedal.png";
  } else if (days >= 50 && days < 100) {
    return "src/assets/images/medals/diamondMedal.png";
  } else if (days >= 100 && days < 365) {
    return "src/assets/images/medals/rubyMedal.png";
  } else if (days >= 365) {
    return "src/assets/images/medals/rainbowMedal.png";
  }
  return "";
}

export function getReviewMedal(reviewCount) {
  if (reviewCount < 1) {
    return "src/assets/images/coins/noCoin.png";
  } else if (reviewCount >= 1 && reviewCount < 5) {
    return "src/assets/images/coins/reviewCoinBronze.png";
  } else if (reviewCount >= 5 && reviewCount < 10) {
    return "src/assets/images/coins/reviewCoinSilver.png";
  } else if (reviewCount >= 10 && reviewCount < 25) {
    return "src/assets/images/coins/reviewCoinGold.png";
  } else if (reviewCount >= 25 && reviewCount < 50) {
    return "src/assets/images/coins/reviewCoinDiamond.png";
  } else if (reviewCount >= 50 && reviewCount < 100) {
    return "src/assets/images/coins/reviewCoinRuby.png";
  } else if (reviewCount >= 100) {
    return "src/assets/images/coins/reviewCoinUnicorn.png";
  }
  return "";
}
