import cn from 'classnames';
import { FC } from 'react';
import styles from './pagination.module.pcss';

type Props = {
  currentPage: number;
  pages: number;
  onChange: (page: number) => void;
};

const MAX_PAGES_TO_SHOW = 5;
const PAGES_OFFSET = Math.floor(MAX_PAGES_TO_SHOW / 2);

function getPagesToRender(currentPage: number, pages: number) {
  const middlePage = Math.min(
    Math.max(PAGES_OFFSET + 1, currentPage),
    pages - PAGES_OFFSET
  );
  const fromPage = Math.max(middlePage - PAGES_OFFSET, 1);

  return Array.from(
    { length: Math.min(pages, MAX_PAGES_TO_SHOW) },
    (_, n) => n + fromPage
  );
}

export const Pagination: FC<Props> = ({ currentPage = 1, pages, onChange }) => {
  const pagesToRender = getPagesToRender(currentPage, pages);
  const showNavControls = pages > MAX_PAGES_TO_SHOW;
  const hasPrevPage = currentPage - PAGES_OFFSET > 1;
  const hasNextPage = currentPage + PAGES_OFFSET < pages;

  const prevPage = () => {
    onChange(currentPage - 1);
  };

  const nextPage = () => {
    onChange(currentPage + 1);
  };

  const lastPage = () => {
    onChange(pages);
  };

  const firstPage = () => {
    onChange(1);
  };

  return (
    <div className={styles.pagination}>
      {showNavControls && hasPrevPage && (
        <button className={styles.control} type="button" onClick={firstPage}>
          &lsaquo;
        </button>
      )}
      {showNavControls && hasPrevPage && (
        <button className={styles.control} type="button" onClick={prevPage}>
          Назад
        </button>
      )}
      {pagesToRender.map((page) => (
        <button
          key={page}
          className={cn(styles.page, {
            [styles.current]: page === currentPage,
          })}
          disabled={page === currentPage}
          type="button"
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      {showNavControls && hasNextPage && (
        <button className={styles.control} type="button" onClick={nextPage}>
          Далее
        </button>
      )}
      {showNavControls && hasNextPage && (
        <button className={styles.control} type="button" onClick={lastPage}>
          &rsaquo;
        </button>
      )}
      <p className={styles.results}>
        Страница {currentPage} из {pages}
      </p>
    </div>
  );
};
