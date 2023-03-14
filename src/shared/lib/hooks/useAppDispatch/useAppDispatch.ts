import { AppDispatch } from 'app/providers/StoreProviders';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
