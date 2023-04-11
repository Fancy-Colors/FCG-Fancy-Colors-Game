import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'components/modal';
import { howToTextData } from 'src/mock/how-to-data';
import cn from 'classnames';
import styles from './how-to-modal.module.pcss';

export const HowToModal: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Modal onClose={() => navigate(pathname)}>
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
    </Modal>
  );
};
