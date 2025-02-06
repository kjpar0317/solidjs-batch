import { ColDef, ColGroupDef, GridReadyEvent, CellClickedEvent, PaginationChangedEvent, GridSizeChangedEvent, FirstDataRenderedEvent } from "ag-grid-community";

export type TData = any;
export type TContext = any;
export type RowPinnedType = "top" | "bottom" | null | undefined;
export type TContextInAction = any;

// 버전마다 바뀜... any다 any
export type TColDef = ColDef | ColGroupDef | any;
export type TGridReadyEvent = GridReadyEvent | any;
export type TCellClickedEvent = CellClickedEvent | any;
export type TPaginationChangedEvent = PaginationChangedEvent | any;
export type TGridSizeChangedEvent = GridSizeChangedEvent | any;
export type TFirstDataRenderedEvent = FirstDataRenderedEvent | any;

export interface FilterModelItem {
  type: string;
  filterType: string;
  filter?: string | number;
  dateFrom?: string;
  dateTo?: string;
}

export interface SortModelItem {
  // Column Id to apply the sort to.
  colId: string;
  // Sort direction
  sort: "asc" | "desc";
}

export interface GridPageInfo {
  page: number;
  itemInPage: number;
  filters?: FilterModelItem[] | null;
  orderBy?: SortModelItem[] | null;
  successCallback: ((rowsThisBlock: any[], lastRow?: number | undefined) => void);
}

export interface GridFilterOption {
  filterOptions: string[];
  // suppressAndOrCondition: true, // deprecated
  maxNumConditions?: number;
  buttons?: string[];
}
