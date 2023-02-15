import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/UI/Button/ui/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
   className?: string;
}

export function PageError({ className }: PageErrorProps) {
   function reloadPage() {
      //! у объекта локэйшн есть функция релоад с помощью которой можно перезагрузит страницу
      location.reload();
   }
   const { t } = useTranslation();
   return (
      <div className={classNames(cls.PageError, {}, [className])}>
         {t('Произошла непредвиденная ошибка')}
         <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
      </div>
   );
}
