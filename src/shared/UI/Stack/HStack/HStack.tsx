import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;
// todo - это горизонтальна обёртка для компонента флекс
export const HStack = (props: HStackProps) => <Flex direction="row" {...props} />;
