import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from 'src/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
