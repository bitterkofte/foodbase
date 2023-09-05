import Link from "next/link";
import Image from "next/image";
import FB from "../img/FoodBase2.png";
import { FaInstagram, FaTwitter, FaFacebookF} from 'react-icons/fa'

const titles = [
  {
    title: "Follow Us",
    subtitles: [
      {
        text: <FaInstagram />,
        link: "",
      },
      {
        text: <FaTwitter />,
        link: "",
      },
      {
        text: <FaFacebookF />,
        link: "",
      },
    ]
  },
  {
    title: "Newsroom",
    subtitles: [
      {
        text: "News from FoodBase",
        link: "",
      },
    ]
  },
  {
    title: "Need Help",
    subtitles: [
      {
        text: "FAQs",
        link: "",
      },
      {
        text: "Contact Us",
        link: "",
      },
    ]
  },
  {
    title: "Join the future",
    subtitles: [
      {
        text: "Join the team",
        link: "",
      },
      {
        text: "Join us as a rider",
        link: "",
      },
    ]
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="w-full bg-orange-200 py-5 pt-7 flex flex-col justify-center items-center gap-10 transition-all select-none">
      <div className='flex items-start gap-20 flex-wrap justify-center'>
        <Image
          src={FB}
          width={200}
          height={200}
          alt="logo"
          className="w-28 object-cover drop-shadow-md self-center"
          id="rsm"
        />
        {titles.map(t => (
          <div key={t.title} className=''>
            <h2 className="font-bold text-org3">{t.title}</h2>
            <div className={`flex ${t.title === "Follow Us" ? "flex-row justify-between mt-1" : "flex-col"}`}>
              {t.subtitles.map((s,i) => (
                <Link key={i} className="hover:text-org3 duration-200" href={s.link}>{s.text}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='w-full pt-2 px-5 text-xs md:text-sm flex justify-center gap-2 border-t-2 border-neutral-500'>
        {/* <div className='absolute top-0 left-0 w-full border-t-2 border-black'></div> */}
        <Link className="hover:text-neutral-600 duration-200" href={"/"}>©{currentYear} FoodBase</Link>
        <p>•</p>
        <Link className="hover:text-neutral-600 duration-200" href={"/"}>Privacy Notice</Link>
        <p>•</p>
        <Link className="hover:text-neutral-600 duration-200" href={"/"}>Terms of Use</Link>
        <p>•</p>
        <Link className="hover:text-neutral-600 duration-200" href={"/"}>Ad Choices</Link>
      </div>
    </div>
  );
}

export default Footer;