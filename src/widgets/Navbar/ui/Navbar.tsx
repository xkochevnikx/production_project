import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export function Navbar({ className }: NavbarProps) {
   const { t } = useTranslation();
   return (
      <div className={classNames(cls.Navbar, {}, [className])}>
         <div className={cls.links}>
            <AppLink to="/" className={cls.link}>
               {t('главная')}
            </AppLink>
            <AppLink to="/about">{t('о сайте')}</AppLink>
         </div>
      </div>
   );
}

export default Navbar;
