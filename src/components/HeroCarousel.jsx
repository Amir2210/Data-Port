import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomsHouseChart } from './statistics/CustomsHouseChart';
import { Top5ImportCountries } from './statistics/Top5ImportCountries';
import { Top5ExpensiveImport } from './statistics/Top5ExpensiveImport';
import { Top5ImportItems } from './statistics/Top5ImportItems';
export function HeroCarousel({ data, year, totalYearlyImport, top5ExpensiveImports, top5ImportsPerCountry, top5ImportsItems }) {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container rounded-lg"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 1
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 1
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      <div>
        <CustomsHouseChart data={data} totalYearlyImport={totalYearlyImport} year={year} />
      </div>

      <div>
        <Top5ImportItems top5ImportsItems={top5ImportsItems} year={year} />
      </div>

      <div>
        <Top5ExpensiveImport top5ExpensiveImports={top5ExpensiveImports} year={year} />
      </div>

      <div>
        <Top5ImportCountries top5ImportsPerCountry={top5ImportsPerCountry} year={year} />
      </div>

      <div>
        <Top5ImportItems top5ImportsItems={top5ImportsItems} year={year} />
      </div>
    </Carousel>
  )
}