import { FC, useRef } from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { Icon } from 'components/icon';
import { TSwiper, TSlide } from './lead.types';
import styles from './lead.module.pcss';
import 'swiper/swiper-bundle.min.css';

type Props = {
  slides: TSlide[];
};

const ICON_COLOR = '#fff';

const Slide: FC<TSlide> = ({ imageUrl, text, isH1, title }) => {
  return (
    <div
      className={styles.slide}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {title && (
        <div className={cn(styles.info, 'w-3')}>
          {isH1 ? (
            <h1 className="h1">{title}</h1>
          ) : (
            <h2 className="h2">{title}</h2>
          )}
          {text && <p className="text-main">{text}</p>}
        </div>
      )}
    </div>
  );
};

export const Lead: FC<Props> = ({ slides }) => {
  const swiperRef = useRef<TSwiper>();

  return (
    <section className={styles.lead}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper as TSwiper;
        }}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <Slide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={cn(styles.arrow, styles.left)}
        onClick={() => {
          swiperRef?.current?.slidePrev();
        }}
      >
        <Icon type="arrow" size="xs" color={ICON_COLOR} />
      </button>

      <button
        className={cn(styles.arrow, styles.right)}
        onClick={() => {
          swiperRef?.current?.slideNext();
        }}
      >
        <Icon type="arrow" size="xs" color={ICON_COLOR} />
      </button>
    </section>
  );
};
