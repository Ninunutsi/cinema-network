import { param } from "../../hooks/useUrlState";

export const sessionFilterSchema = {
  venues: param.strings("venues[]"),
  formats: param.strings("formats[]"),
  languages: param.strings("languages[]"),
  timeBands: param.strings("timeBands[]"),
};

export const sessionDateSchema = { date: param.string("date") };
export const sessionSortSchema = {
  sort: param.string("sort"),
};

export const sessionPagingSchema = {
  page: param.number("page"),
};
