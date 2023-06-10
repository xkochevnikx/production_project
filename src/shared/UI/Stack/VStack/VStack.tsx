import { Flex, FlexProps } from '../Flex/Flex';
//! omit возвращает другой тип без некоторых значений. в нашем случае расположения захардкожено тут в самой обёртке, и пропсами сверху не сможет конкретно это значнеие принимать. но отдавать ниже во флекс будет то что нам нужно а так же все остальные пропсы будет прокидвать вниз которые пологаются флекс компоненту
type VStackProps = Omit<FlexProps, 'direction'>;
// todo - это вертикальная обёртка для компонента флекс
export const VStack = (props: VStackProps) => <Flex direction="column" {...props} />;
