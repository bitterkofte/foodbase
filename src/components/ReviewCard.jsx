import Image from "next/image";
import {MdOutlineStar, MdOutlineStarOutline} from 'react-icons/md';

const ReviewCard = ({userInfo, reviewInfo}) => {
  return (
    <div className="flex items-start gap-4 p-5 bg-neutral-300 rounded-xl shadow-md">
      <Image className="object-contain rounded-full" src={userInfo.photoURL} width={36} height={36} />
      <div className=''>
        <div className='flex justify-between'>
          <p className="text-xs text-gray-700">{reviewInfo.username}</p>
          {Array(reviewInfo.stars).fill(0).map(m => <MdOutlineStar/>)}
          {Array(5-(reviewInfo.stars)).fill(0).map(m => <MdOutlineStarOutline/>)}
        </div>
        <h3 className="font-semibold text-lg">{reviewInfo.title}</h3>
        <p>{reviewInfo.description}</p>
      </div>
    </div>
  );
}

export default ReviewCard;