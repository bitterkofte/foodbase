import Image from "next/image";
import {MdOutlineStar, MdOutlineStarOutline} from 'react-icons/md';

const ReviewCard = ({userInfo, reviewInfo}) => {
  return (
    <div key={reviewInfo.date} className="flex items-start gap-4 p-5 bg-neutral-300 rounded-xl shadow-md">
      <Image className="object-contain rounded-full drop-shadow-md" src={userInfo.photoURL} alt="pp" width={36} height={36} />
      <div className='w-full'>
        <div className='flex justify-between gap-2 items-center'>
          <p className="text-xs text-gray-700">{reviewInfo.username}</p>
          {/* <p className="text-gray-600">-</p> */}
          <div className='flex text-amber-500 drop-shadow-md'>
            {Array(5).fill(0).map((m, i) => (reviewInfo.stars >= i+1 ? <MdOutlineStar/> : <MdOutlineStarOutline/>))}
          </div>
        </div>
        <h3 className="tracking-wider font-semibold text-lg">{reviewInfo.title}</h3>
        <p>{reviewInfo.description}</p>
      </div>
    </div>
  );
}

export default ReviewCard;