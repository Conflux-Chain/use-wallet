type ValueOf<T> = T[keyof T];

type OverWrite<T, U> = Omit<T, keyof U> & U
