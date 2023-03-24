import React from 'react';
import MainLayout from '../layouts/MainLayout';
import styles from '../layouts/MainLayout/styles.module.css';

const About = () => {
  return (
    <MainLayout>
      <div className="aboutContainer">
        <h1>About PrayCalc <span>[Beta]</span></h1>
        <div className={styles.content}>
          <p>PrayCalc was developed to address the intricate nature of calculating prayer times and the need for a more accurate, dynamic, and customizable approach. The task of determining prayer times is a complex one, as it involves numerous factors, including geographical coordinates, Earth's tilt, and the ever-changing orbital relationship between the Earth and the Sun. By leveraging solar calculation algorithms from organizations like NOAA, PrayCalc improves upon the classical models, providing highly accurate estimations for sunrise, sunset (Maghrib), solar noon (Dhuhr), and sun positioning for shadow length (for Asr) that are very similar to those found in other calculators.</p>
          <p>The challenge of calculating Fajr and Isha times is particularly complex, as the angles used for determining these times can vary significantly depending on location, season, and other factors. Traditional methods, such as the ones suggested by the <a href="https://fiqhcouncil.org/the-suggested-calculation-method-for-fajr-and-isha/">FCNA</a>, rely on static angles that range from 12° to 20°, which may not accurately account for the Earth's tilt, its imperfect orbit, and the relative position of the Sun. These static angles, which are often the same for both Fajr and Isha, can lead to inaccuracies in prayer times, as they don't adequately account for the dynamic nature of Fajr and Isha angles, which change based on latitude and season. In reality, Fajr and Isha angles can differ by up to 2° from each other depending on the specific location. This has inreasingly become a modern concern as Islam grows and spreads in areas further from the equator and increases inaccuracies in both static angles and traditional approaches.</p>
          <p>PrayCalc's innovative approach to this challenge involves customizing calculations based on user coordinates and the day of the year, along with the integration of artificial intelligence (AI) to refine its formulas. By analyzing established data on angles and known prayer times from various locations and dates, our AI-driven system continually improves the accuracy of Fajr and Isha time calculations. This dynamic approach ensures that our calculations are more precise and adaptable than those provided by traditional static-angle methods, which are often overly generalized and simplified.</p>
          <p>Embracing the complexity of prayer time calculations, PrayCalc sets itself apart by leveraging AI technology to enhance its accuracy and adaptability. Our groundbreaking approach to Fajr and Isha calculations accounts for the unique factors that influence these prayer times, enabling us to provide a solution that outshines the limitations of traditional, static methods.</p>
          <p>In conclusion, PrayCalc offers a more accurate and dynamic approach to calculating prayer times by embracing the complexity of the task and utilizing AI to enhance our calculations continually. While our current implementation already provides significant improvements, we acknowledge that there are areas for potential enhancement, such as accounting for the equation of time, considering atmospheric refraction, and adjusting for elevation above sea level. PrayCalc is committed to refining its calculations and incorporating these factors in the future, leveraging the power of AI to provide the most accurate and customizable prayer times possible for our users.</p>
          <p>As PrayCalc is currently in its Beta stage, we are actively seeking feedback to improve our service. We greatly appreciate any comments or suggestions you may have, and we encourage you to send them to . Together, we can create the most accurate and reliable prayer times calculator available.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
