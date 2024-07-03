/* Librarys */
import {
  FaUserAstronaut,
  FaGhost,
  FaMask,
  FaRobot,
  FaSkull,
  FaUser,
  FaUserNinja,
  FaUserSecret,
  FaUserTie,
  FaEarlybirds,
} from "react-icons/fa";
import {
  GiJasonMask,
  GiDoctorFace,
  GiDevilMask,
  GiWizardFace,
  GiSpiderMask,
} from "react-icons/gi";
import { LuCat, LuDog } from "react-icons/lu";
import { FaQq, FaRainbow, FaRocket } from "react-icons/fa6";

const Icon = ({ name, style, color }) => {
  const iconList = [
    {
      name: "User",
      icon: <FaUser style={{ color: color }} className={style} />,
    },
    {
      name: "Ghost",
      icon: <FaGhost style={{ color: color }} className={style} />,
    },
    {
      name: "Mask",
      icon: <FaMask style={{ color: color }} className={style} />,
    },
    {
      name: "UserAstronaut",
      icon: <FaUserAstronaut style={{ color: color }} className={style} />,
    },
    {
      name: "Robot",
      icon: <FaRobot style={{ color: color }} className={style} />,
    },
    {
      name: "Skull",
      icon: <FaSkull style={{ color: color }} className={style} />,
    },
    {
      name: "UserNinja",
      icon: <FaUserNinja style={{ color: color }} className={style} />,
    },
    {
      name: "UserSecret",
      icon: <FaUserSecret style={{ color: color }} className={style} />,
    },
    {
      name: "UserTie",
      icon: <FaUserTie style={{ color: color }} className={style} />,
    },
    {
      name: "Penguin",
      icon: <FaQq style={{ color: color }} className={style} />,
    },
    {
      name: "Rainbow",
      icon: <FaRainbow style={{ color: color }} className={style} />,
    },
    {
      name: "Rocket",
      icon: <FaRocket style={{ color: color }} className={style} />,
    },
    {
      name: "EarlyBird",
      icon: <FaEarlybirds style={{ color: color }} className={style} />,
    },
    {
      name: "JasonMask",
      icon: <GiJasonMask style={{ color: color }} className={style} />,
    },
    {
      name: "Doctor",
      icon: <GiDoctorFace style={{ color: color }} className={style} />,
    },
    {
      name: "DevilMask",
      icon: <GiDevilMask style={{ color: color }} className={style} />,
    },
    {
      name: "Wizard",
      icon: <GiWizardFace style={{ color: color }} className={style} />,
    },
    {
      name: "SpiderMask",
      icon: <GiSpiderMask style={{ color: color }} className={style} />,
    },
    {
      name: "Cat",
      icon: <LuCat style={{ color: color }} className={style} />,
    },
    {
      name: "Dog",
      icon: <LuDog style={{ color: color }} className={style} />,
    },
  ];

  const iconObject = iconList.find((icon) => icon.name === name);
  return iconObject ? iconObject.icon : null;
};

export default Icon;
