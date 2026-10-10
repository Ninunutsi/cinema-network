import { param } from "../../hooks/useUrlState";

export const sessionFilterSchema = {
  venues: param.strings("venues[]"),
  formats: param.strings("formats[]"),
  languages: param.strings("languages[]"),
  timeBands: param.strings("timeBands[]"),
};

export const sessionQuerySchema = {
  ...sessionFilterSchema,
  date: param.string("date"),
  sort: param.string("sort"),
  page: param.number("page"),
};

export const sessionPagingSchema = {
  page: param.number("page"),
};
