import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export function Navbar({ className }: NavbarProps) {
   const { t } = useTranslation();
   return (
      <div className={classNames(cls.Navbar, {}, [className])}>
         <div className={cls.links} />
      </div>
   );
}

export default Navbar;
