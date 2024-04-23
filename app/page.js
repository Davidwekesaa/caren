"use client";
import React from "react";
import Link from "next/link";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import WcIcon from "@mui/icons-material/Wc";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Footer from "./ux/Footer";
export default function Home() {
  return (
    <>
      {/* about us */}
      <section id="hero" className="flex items-center hero-sections">
        <div className="w-full">
          <div className="flex items-end justify-end mr-20 heroo">
            <div className="xl:col-span-6 hr w-[600px] flex flex-col items-center justify-items-center ">
              <h2 className="nurse-header-1 text-center">
                Welcome to Nurse Caren&apos;s Platform.
              </h2>
              <h2 className="text-white text-center">
                A certified virtual medical assistant,health educator and
                nutrition enthusiast.
              </h2>
              <Link
                href="#about"
                className="bg-[#DA4848] pt-2 pb-2 pr-5 pl-5 rounded text-white mt-2"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* about us */}
      {/* experience */}
      <section
        id="about"
        className="w-full flex items-center justify-center paddings pt-20 pb-20"
      >
        <div className="w-full flex items-start justify-between aboutss">
          <div className="w-full flex items-center justify-between">
            <div className="about-heading flex items-center justify-between flex-col w-[70%] aboutsswitdth">
              <h3>About Me</h3>
              <span>
                With over 5 years of experience in clinical and administrative
                nursing, Nurse Caren has worked in both government and private
                hospitals.
                <br />
                <br />
                On this platform, she aims to simplify and clarify complex
                health topics, relating them to our everyday experiences in the
                healthcare journey.
                <br /> <br /> As a passionate advocate for nutrition, Nurse
                Caren provides health products that boost immunity and promote a
                healthy lifestyle. Feel free to explore our catalog of wellness
                products for more information
              </span>
              <Link href="#" class="about-btn">
                <span>About us</span>
              </Link>
            </div>
          </div>

          <div className="about-heading flex items-center justify-between flex-col w-[70%] aboutsswitdth">
            <h3>Her areas of interest include:</h3>
            <div className="w-full aboutsswitdth">
              <div className="flex items-center justify-between pb-20 flex-wrap aboutsswitdth">
                <div
                  class="flex flex-col items-center"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <MedicationLiquidIcon className="hero-icons" />
                  <h4>Health education and training</h4>
                </div>
                <div
                  class="flex flex-col items-center"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <BabyChangingStationIcon className="hero-icons" />
                  <h4>Mother and child health</h4>
                </div>
              </div>
              <div className="flex items-center justify-between flex-wrap aboutsswitdth">
                <div
                  class="flex flex-col items-center "
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <WcIcon className="hero-icons" />
                  <h4>Sexual and reproductive health</h4>
                </div>
                <div
                  class="flex flex-col items-center"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <LocalDiningIcon className="hero-icons" />
                  <h4>Nutrition and Research</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* experience */}
      <Footer />
    </>
  );
}
