import { AppDispatch } from '@/app/providers/StoreProviders';
import { useDispatch } from 'react-redux';

//! хук возвращаем обычный useDispatch но типизированный что автокомплита возвращаемых типов
export const useAppDispatch = () => useDispatch<AppDispatch>();
