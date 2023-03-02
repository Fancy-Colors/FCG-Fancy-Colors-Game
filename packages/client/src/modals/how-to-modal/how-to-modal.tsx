import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'components/modal';
import { howToTextData } from 'src/mock/how-to-data';
import cn from 'classnames';
import styles from './how-to-modal.module.pcss';

const modalRoot = document.querySelector('#modals') as Element;

export const HowToModal: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      {createPortal(
        <Modal onClose={() => navigate(-1)}>
          <div className={cn(styles.content, 'u-fancy-scrollbar', 'w-6')}>
            {howToTextData.map(({ title, text }, idx) => {
              return (
                <div key={idx}>
                  <h3 className="h-3">{title}</h3>
                  <pre className={cn('text-main', styles.pre)}>{text}</pre>
                </div>
              );
            })}
          </div>
        </Modal>,
        modalRoot
      )}
    </>
  );
};
