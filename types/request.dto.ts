import { CarCardTypes, CarFilterTypes, FilterSortType } from "./car.dto";

export interface LoginType {
  email: string;
  password: string;
}
export interface SignUpType {
  username: string;
  email: string;
  password: string;
  re_password: string;
}

// car/filter
export interface CarFilterParamTypes {
  sort?: FilterSortType;
  capacity?: string;
  min?: number;
  max?: number;
  type?: string;
  page?: number;
}
export interface FilterRes {
  total: number;
  current: number;
  page: number;
}
export interface FilterResData extends FilterRes {
  data: CarCardTypes[];
  filter: CarFilterTypes;
}
export type FetchStatus = "loading" | "not-found" | "error" | "ok";
