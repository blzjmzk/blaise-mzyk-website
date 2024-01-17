import React from "react";
import photo_of_blaise_mzyk from "../public/images/photo_of_blazej_mzyk.jpg";
import Image from "next/image";

const HomePage = () => {
  return (
    <>
      {/* <div className="hero">
        <div className="heroFirst">
          <div className="heroImage">
            <Image
              src={photo_of_blaise_mzyk}
              alt="Photo of Blaise Mzyk"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="heroBanner">
            <h2>Hey,</h2>
            <h2>I'm Blaise</h2>
          </div>
        </div>
        <div className="heroTagline">
          <p>
            I am a philosopher (finishing my PhD) and a self-taught programmer
            based in Kraków, Poland. Here you can find more information about
            me, as well as my book notes. I also encourage you to check out my
            blog.
          </p>
          <button className="btn btn-primary">See My Blog</button>
        </div>
      </div> */}
    </>
  );
};

export default HomePage;
