// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
type DataKey = string;
type DataType<T> = T[] | Record<DataKey, T>;
export interface IDataState<
  T extends object = any,
  D extends DataType<T> = T[]
> {
  readonly data: D;
  readonly meta: IDataMeta;
}

export interface IMapState<
  T extends object = any,
  D extends DataType<T> = Record<DataKey, T>
> extends IDataState<T, D> {}

interface IDataMeta {
  readonly lastUpdated?: number;
  readonly errors?: string;
  readonly loading?: boolean;
  readonly data?: Record<DataKey, IDataMeta>;
}
