import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomsHouseChart } from './statistics/CustomsHouseChart';
import { Top5ImportCountries } from './statistics/Top5ImportCountries';
import { Top5ExpensiveImport } from './statistics/Top5ExpensiveImport';
export function HeroCarousel({ data, columns, year, totalYearlyImport, top5ExpensiveImports, top5ImportsPerCountry }) {
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
        <Top5ExpensiveImport top5ExpensiveImports={top5ExpensiveImports} year={year} columns={columns} />
      </div>
      <div>
        <h2 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h2>
        <Top5ImportCountries top5ImportsPerCountry={top5ImportsPerCountry} year={year} />
      </div>
    </Carousel>
  )
}