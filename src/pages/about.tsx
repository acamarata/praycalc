import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styles from '../layouts/MainLayout/styles.module.css';

const About = () => {
  return (
    <MainLayout>
      <div className="aboutContainer">
        <h1>About PrayCalc</h1>
        <div className={styles.content}>
          <p>
            PrayCalc was created to give a long needed update to calculation of prayer times.  Firstly, it must be noted, that creating a comprehensive and accurate formula that accounts for all the factors that improves upon existing methods is a complex task, see an introduction to this <a href="https://en.wikipedia.org/wiki/Salah_times#Time_calculation">here</a>. That said every calculator available currently uses a static angle that works for certain regions but not others. Our major improvement focus was not relying on regional static angles that are overly general and cause prayer times to be off by several minutes or more. Additionally we implemented modern, more robust, and more accurate algorithms for solar calculations, such as the ones used in the NOAA Solar Calculator as a base starting point for the formulas.
          </p>
          <p>
            You can see all the different static angles and the overly generalized static angles that attempt to solve this in article such as <a href="https://fiqhcouncil.org/the-suggested-calculation-method-for-fajr-and-isha/">this</a>.  The Fajr and Isha angles differ from 12° away from the equator to 20° near it.  Additionally the Isha angle could be up to 2° less than Fajr near the equator but equal to it further away. The updated formula I provided would make the Isha angle about 2° less than the Fajr angle near the equator (e.g., Singapore, Egypt) and make the Isha and Fajr angles almost the same or equal in places further from the equator (e.g., New York, Toronto). The formula adjusts the Isha angle based on the latitude factor, which ensures that the angles are closer to each other in higher latitudes and farther apart near the equator. Keep in mind that this is a simplified formula, and other factors such as elevation and atmospheric refraction might affect the actual angles required for a more accurate calculation. However, this formula should provide a reasonably more accurate estimation of the Fajr and Isha angles for most locations than any existing static methods which are used by all prayer times and adhan apps available publicly at this time.
          </p>
          <p>
            While there are many areas of improvement, three obvious ones are:
          </p>
          <ol>
            <li>
              Accounting for the equation of time, which corrects for the irregularities in the Earth's rotation and orbit around the Sun.
            </li>
            <li>
              Considering the effect of atmospheric refraction on the observed position of the Sun. This could be important, especially during twilight periods.
            </li>
            <li>
              Adjusting for the observer's elevation above sea level, which can affect the observed times of sunrise and sunset.  There are many APIs to easily get elevation but it is not currently incorporated into our formulae and may be the first area we improve on in the future.
            </li>
          </ol>          
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
