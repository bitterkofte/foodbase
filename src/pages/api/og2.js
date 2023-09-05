// import { getAllFoodItems } from '@component/utils/firebaseFunctions';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';

export default async function GET(request) {
  const { searchParams } = new URL(request.url);

  // const username = searchParams.get('username');
  const imgUrl = searchParams.get('img');
  const token = searchParams.get('token');
  const fullURL = imgUrl + "&token=" + token;
  const pID = searchParams.get('id');
  const cover = searchParams.get('cover');
  // if (!username) {
  //   return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
  //     width: 1200,
  //     height: 630,
  //   });
  // }

  // getAllFoodItems().then((data) => {
  //     console.log("OG2: ",data)
  //   });


  return new ImageResponse(
    (
      // <div
      //   style={{
      //     display: 'flex',
      //     fontSize: 60,
      //     color: 'black',
      //     background: '#f6f6f6',
      //     width: '100%',
      //     height: '100%',
      //     paddingTop: 50,
      //     flexDirection: 'column',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //   }}
      // >
      //   {/* <img
      //     width="256"
      //     height="256"
      //     src={`https://github.com/${username}.png`}
      //     style={{
      //       borderRadius: 128,
      //     }}
      //   /> */}
      //   <img
      //     width="256"
      //     height="256"
      //     src={imgUrl}
      //     style={{
      //       borderRadius: 128,
      //     }}
      //   />
      //   {/* <p>github.com/{username}</p> */}
      // </div>
      <div style={{
            display: 'flex',
            fontSize: 18,
            color: 'black',
            background: '#f6f6f6',
            width: '100%',
            height: '100%',
            paddingTop: 50,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'}}
        >
          {/* <p>resim 2</p> */}
        {/* <img
          width="400"
          // height="256"
          src={"https://firebasestorage.googleapis.com/v0/b/foodbase-56502.appspot.com/o/images%2F1693485829549-pngwing.com%20(4).png?alt=media&token=ad435e28-d3ef-4c46-8ce3-ddd51aa72996"}
          style={{
            borderRadius: 10,
            objectFit: 'cover',
          }}
        /> */}
        <p>imgUrl: {imgUrl}</p>
        {/* <p>token: {token}</p> */}
        {/* <p>id: {pID}</p> */}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

//https://firebasestorage.googleapis.com/v0/b/foodbase-56502.appspot.com/o/images%2F1684594858456-f4.png?alt=media&token=bed35859-c405-4053-859b-e225f0577d2b

//http://localhost:3000/api/og2?img=https://firebasestorage.googleapis.com/v0/b/foodbase-56502.appspot.com/o/images%2F1684594858456-f4.png?alt=media&token=bed35859-c405-4053-859b-e225f0577d2b

//https://firebasestorage.googleapis.com/v0/b/foodbase-56502.appspot.com/o/images%2F1693485829549-pngwing.com%20(4).png?alt=media&token=ad435e28-d3ef-4c46-8ce3-ddd51aa72996