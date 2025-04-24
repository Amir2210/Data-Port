import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CustomsHouseChart } from './CustomsHouseChart';
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
export function HeroCarousel({ data, columns, year, totalYearlyImport, top5ExpensiveImports }) {
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
        <h2 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h2>
        <CustomsHouseChart data={data} totalYearlyImport={totalYearlyImport} year={year} />
      </div>

      <div>
        <h2 className='text-4xl text-center text-blue-600 font-bold py-2 underline'>נתונים נוספים וחריגים</h2>
        <h2 className='text-xl text-stone-800 font-bold text-center mt-4' dir='rtl'>5 היבואים הכי יקרים</h2>
        <Box sx={{ height: 560, width: '100%', p: 2 }}>
          <DataGrid
            rows={top5ExpensiveImports.map((row, index) => ({ id: index, ...row }))}
            columns={columns}
            pageSize={10}
          />
        </Box>
      </div>
    </Carousel>
  )
}