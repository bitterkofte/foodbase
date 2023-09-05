import Head from "next/head";

const NextHead = () => {
  return (
    <Head>
        <title>FoodBase</title>
        <meta
          name="description"
          content="A food delivery site that you can order groceries and hot dishes."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/FoodBase2.ico" />

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="FoodBase - Groceries and Food Delivery"
        />
        <meta property="og:url" content="https://foodbase-tr.vercel.app/" />
        <meta
          property="og:image"
          content="https://foodbase-tr.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFoodBase-bg-orange.0831433a.jpg&w=750&q=75"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://foodbase-tr.vercel.app/"
        />
        <meta property="twitter:title" content="FoodBase" />
        <meta
          property="twitter:description"
          content="A food delivery site that you can order groceries and hot dishes."
        />
        <meta
          property="twitter:image"
          content="https://foodbase-tr.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFoodBase-bg-orange.0831433a.jpg&w=750&q=75"
        />
    </Head>
  );
}

export default NextHead;