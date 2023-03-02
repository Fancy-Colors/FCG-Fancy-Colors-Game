import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Modal } from 'components/modal';
import { howToTextData } from 'src/mock/how-to-data';
import cn from 'classnames';
import styles from './how-to-modal.module.pcss';

export const HowToModal: FC = () => {
  const navigate = useNavigate();
  // при переходе по роуту модалки внутри приложения записываем в стейт location буль fromOwnHost
  const location = useLocation();
  // если пришли сюда с другой страницы хоста, идем назад, иначе
  // (например, по прямой ссылке) - на главную
  const onClose = () => {
    if (location.state?.fromOwnHost) {
      navigate(-1);
    } else {
      // в макротаски для того, чтобы navigate отработал только после отрисовки DOM,
      // альтернатива - положить все в useEffect и завести стейт closeStatus
      setTimeout(() => {
        navigate('/');
      }, 0);
    }
  };

  return (
    <Modal onClose={() => onClose()}>
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
