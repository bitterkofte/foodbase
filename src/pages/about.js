import Image from "next/image";
import Delivery from "../../public/delivery.jpg"
import Restaurant from "../../public/restaurant.jpg"
import Man from "../../public/man.jpg"
import Groceries from "../../public/groceries.jpg"

const about = () => {
  return (
    <div className="w-5/6 lg:w-4/6 mt-32 mx-auto mb-20">
      <section className="flow-root">
        <h1 className="font-bold text-4xl mb-4">About Us</h1>
        {/* <div className='flex mt-5 gap-5 flex-col xl:flex-row'> */}
        <div className='sm:flex sm:gap-5 sm:flex-col xl:block'>
          {/* <Image src={Delivery} className="w-5/6 rounded-md object-contain self-center" width={500} alt="delivery"/> */}
          <Image src={Delivery} className="w-4/6 xl:w-4/6 rounded-md object-contain mx-auto mb-3 xl:float-left xl:mr-4" width={500} alt="delivery"/>
          <div className="text-base text-justify">
            <p className="mb-5">
              Welcome to FoodBase, where we believe that great food should be accessible to everyone, anytime, and anywhere. Our journey began with a simple idea: to create a platform that connects people with their favorite meals and foods from the best local restaurants and markets, all delivered to their doorstep with convenience, speed, and a touch of culinary delight.
            </p>
            <p>
            Placing the customer at the forefront of every decision and action, ensuring their satisfaction, safety, and convenience are paramount. Commitment to delivering high-quality food, service, and overall experience, consistently striving for excellence in all aspects of the business. 
            </p>
          </div>
        </div>
      </section>

      <section className='clear-both mt-12'>
      <h2 className="font-bold text-2xl mb-2 ">Our Mission</h2>
      <div className='flex mt-5 gap-5 flex-col xl:flex-row items'>
        <div className=''>
          <p className="mb-3 text-justify">At FoodBase, our mission is to revolutionize the way people experience food by making it easier, more convenient, and more enjoyable. We are committed to:</p>
          <ul className="flex flex-col gap-y-2 text-justify">
            <li>
              <strong>Delivering Delight</strong>: We aim to bring joy and satisfaction to our customers' taste buds with every order. Whether it's a comforting classic or a daring culinary adventure, we're here to deliver a delicious experience every time.
            </li>
            <li>
            <strong>Supporting Local</strong>: We are passionate about supporting local restaurants and businesses, helping them thrive in an increasingly competitive world. We believe that by showcasing their culinary talents, we can help build stronger, vibrant communities.
            </li>
            <li>
            <strong>Empowering Choice</strong>: We offer a diverse range of cuisines, dietary options, and price points, empowering our customers to choose the perfect meal for every occasion. From quick bites to gourmet feasts, the possibilities are endless.
            </li>
            <li>
            <strong>Enhancing Convenience</strong>: We understand the value of your time. With our user-friendly platform and efficient delivery services, we strive to make ordering food as seamless as possible, so you can focus on what matters most to you.
            </li>
          </ul>
        </div>
        <Image loading="lazy" src={Man} className="w-4/6 xl:w-2/6 rounded-md object-contain self-center" width={500} alt="man"/>
      </div>
      </section>

      <h2 className="font-bold text-2xl mt-12 mb-2">Our Vision</h2>
      <div className='sm:flex sm:gap-5 sm:flex-col xl:block'>
        <Image src={Groceries} className="w-4/6 xl:w-3/6 rounded-md object-contain mx-auto mb-3 xl:float-left xl:mr-4" width={300} alt="Groceries"/>
        {/* <div className=''> */}
          <p className="mb-3 text-justify">Our vision at FoodBase is to become the go-to destination for food lovers, a platform where culinary exploration meets unparalleled convenience. We envision:</p>
          {/* <p className="flex flex-col gap-y-2 text-justify"> */}
            <p className="mb-3 text-justify">
              <strong>Global Accessibility</strong>: We aspire to connect people with diverse culinary experiences from around the world, breaking down geographic barriers and fostering a sense of global community through food.
            </p>
            <p className="mb-3 text-justify">
            <strong>Sustainability</strong>: We are committed to environmental responsibility. We aim to work with restaurants that share our values and promote sustainable practices, minimizing our carbon footprint while delighting your palate.
            </p>
            <p className="mb-3 text-justify">
            <strong>Innovation</strong>: We continually strive to innovate and enhance our services, utilizing cutting-edge technology to make food delivery smarter, faster, and more personalized than ever before.
            </p>
            <p className="mb-3 text-justify">
            <strong>Customer-Centricity</strong>: Our customers are at the heart of everything we do. We aim to create memorable, positive experiences at every touchpoint, from browsing the menu to savoring the last bite.
            </p>
          {/* </p> */}
        {/* </div> */}
      </div>

      <p className="mt-10 mb-5 text-justify">
        Join us on our culinary journey as we aim to redefine the way you think about food delivery. Whether you're a food enthusiast seeking new flavors or a busy professional in need of a quick meal, FoodBase is here to serve you, one delicious bite at a time.
      </p>
      <p className="text-justify">
        Thank you for choosing us to be your trusted food delivery companion. Together, we're savoring the world, one meal at a time.
      </p>
    </div>
  );
}

export default about;