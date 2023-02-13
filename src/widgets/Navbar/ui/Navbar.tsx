import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/UI/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
   className?: string;
}

export function Navbar({ className }: NavbarProps) {
   return (
      <div className={classNames(cls.Navbar, {}, [className])}>
         <div className={cls.links}>
            <AppLink to="/" className={cls.link}>
               главная
            </AppLink>
            <AppLink to="/about">о сайте</AppLink>
         </div>
      </div>
   );
}

export default Navbar;
