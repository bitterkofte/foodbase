import Image from "next/image";
import {MdOutlineStar, MdOutlineStarOutline} from 'react-icons/md';
import { motion } from "framer-motion";

const ReviewCard = ({reviewInfo}) => {
  const date = new Date(reviewInfo.date);
  const options = {year: 'numeric', month: 'short', day: 'numeric' };
  const rDate = date.toLocaleDateString('en-GB', options);
  // const rDate = `${reviewInfo.date.getDate()} ${reviewInfo.date.getMonth()} ${reviewInfo.date.getFullYear()}`;

  return (
    <motion.div key={reviewInfo.date} 
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      // exit={{ y: -3000 }}
      transition={{ duration: 0.5 }}
      className="flex items-start gap-4 p-5 bg-neutral-300 rounded-xl shadow-md">
      <Image className="object-contain rounded-full drop-shadow-md" src={reviewInfo.userphoto} alt="pp" width={36} height={36} />
      <div className='w-full'>
        <div className='flex justify-between gap-2 items-center'>
          <p className="text-base text-gray-700">{reviewInfo.username}</p>
          {/* <p className="text-gray-600">-</p> */}
          <div className='flex text-amber-500 drop-shadow-md'>
            {Array(5).fill(0).map((m, i) => (reviewInfo.stars >= i+1 ? <MdOutlineStar key={i}/> : <MdOutlineStarOutline key={i}/>))}
          </div>
        </div>
        <p className="text-xs text-gray-500 italic">{rDate}</p>
        <h3 className="tracking-wider font-semibold text-lg">{reviewInfo.title}</h3>
        <p className="text-justify">{reviewInfo.description}</p>
      </div>
    </motion.div>
  );
}

export default ReviewCard;