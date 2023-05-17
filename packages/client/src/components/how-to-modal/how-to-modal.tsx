import { Modal } from 'components/modal';
import { howToTextData } from 'src/mock/how-to-data';
import cn from 'classnames';
import styles from './how-to-modal.module.pcss';

export const HowToModal = ({
  onClose,
  show,
}: {
  onClose: () => void;
  show: boolean;
}) => {
  if (!show) return null;

  return (
    <Modal onClose={onClose}>
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
