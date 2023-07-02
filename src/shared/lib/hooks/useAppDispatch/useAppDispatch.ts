import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StoreProviders';

//! хук возвращаем обычный useDispatch но типизированный что автокомплита возвращаемых типов
export const useAppDispatch = () => useDispatch<AppDispatch>();
