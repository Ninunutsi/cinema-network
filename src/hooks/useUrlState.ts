import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export type ParamCodec<T> = {
  key: string;
  parse: (raw: string[]) => T;
  serialize: (value: T) => string[];
};

const isNumber = (n: number) => Number.isFinite(n);

export const param = {
  string: (key: string): ParamCodec<string | undefined> => ({
    key,
    parse: (raw) => raw[0] || undefined,
    serialize: (value) => (value ? [value] : []),
  }),

  number: (key: string): ParamCodec<number | undefined> => ({
    key,
    parse: (raw) => {
      if (raw[0] === undefined || raw[0] === "") return undefined;
      const n = Number(raw[0]);
      return isNumber(n) ? n : undefined;
    },
    serialize: (value) => (value === undefined ? [] : [String(value)]),
  }),

  boolean: (key: string): ParamCodec<boolean> => ({
    key,
    parse: (raw) => raw[0] === "true",
    serialize: (value) => (value ? ["true"] : []),
  }),

  strings: (key: string): ParamCodec<string[]> => ({
    key,
    parse: (raw) => [...new Set(raw.filter(Boolean))],
    serialize: (value) => value.map(String),
  }),

  numbers: (key: string): ParamCodec<number[]> => ({
    key,
    parse: (raw) => [
      ...new Set(
        raw
          .filter((v) => v !== "")
          .map(Number)
          .filter(isNumber),
      ),
    ],
    serialize: (value) => value.map(String),
  }),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UrlSchema = Record<string, ParamCodec<any>>;

export type UrlValues<S extends UrlSchema> = {
  [K in keyof S]: S[K] extends ParamCodec<infer T> ? T : never;
};

type ArrayKeys<S extends UrlSchema> = {
  [K in keyof S]: UrlValues<S>[K] extends readonly unknown[] ? K : never;
}[keyof S];

type ItemOf<T> = T extends readonly (infer I)[] ? I : never;

export type UseUrlStateOptions = {
  replace?: boolean;
  resetKeys?: string[];
};

const DEFAULT_RESET_KEYS = ["page"];

export function useUrlState<S extends UrlSchema>(
  schema: S,
  { replace = true, resetKeys = DEFAULT_RESET_KEYS }: UseUrlStateOptions = {},
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const resetKeysId = resetKeys.join(",");

  const values = useMemo(() => {
    const entries = Object.entries(schema).map(([name, codec]) => [
      name,
      codec.parse(searchParams.getAll(codec.key)),
    ]);
    return Object.fromEntries(entries) as UrlValues<S>;
  }, [schema, searchParams]);

  const commit = useCallback(
    (mutate: (next: URLSearchParams, prev: URLSearchParams) => void) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          mutate(next, prev);
          if (resetKeysId)
            resetKeysId.split(",").forEach((k) => next.delete(k));
          return next;
        },
        { replace },
      );
    },
    [setSearchParams, replace, resetKeysId],
  );

  const set = useCallback(
    <K extends keyof S>(
      name: K,
      value: UrlValues<S>[K] | ((prev: UrlValues<S>[K]) => UrlValues<S>[K]),
    ) => {
      commit((next, prev) => {
        const codec = schema[name];
        const resolved =
          typeof value === "function"
            ? (value as (p: UrlValues<S>[K]) => UrlValues<S>[K])(
                codec.parse(prev.getAll(codec.key)),
              )
            : value;
        next.delete(codec.key);
        codec
          .serialize(resolved)
          .forEach((v: string) => next.append(codec.key, v));
      });
    },
    [commit, schema],
  );

  const setMany = useCallback(
    (patch: Partial<UrlValues<S>>) => {
      commit((next) => {
        for (const name of Object.keys(patch) as (keyof S)[]) {
          const codec = schema[name];
          next.delete(codec.key);
          codec
            .serialize(patch[name])
            .forEach((v: string) => next.append(codec.key, v));
        }
      });
    },
    [commit, schema],
  );

  const toggle = useCallback(
    <K extends ArrayKeys<S>>(name: K, item: ItemOf<UrlValues<S>[K]>) => {
      commit((next, prev) => {
        const codec = schema[name];
        const current = codec.parse(prev.getAll(codec.key)) as unknown[];
        const updated = current.includes(item)
          ? current.filter((v) => v !== item)
          : [...current, item];
        next.delete(codec.key);
        codec
          .serialize(updated)
          .forEach((v: string) => next.append(codec.key, v));
      });
    },
    [commit, schema],
  );

  const remove = useCallback(
    (name: keyof S) => commit((next) => next.delete(schema[name].key)),
    [commit, schema],
  );

  const clear = useCallback(
    () =>
      commit((next) => {
        Object.values(schema).forEach((codec) => next.delete(codec.key));
      }),
    [commit, schema],
  );

  const activeCount = useMemo(
    () =>
      Object.entries(schema).reduce(
        (sum, [name, codec]) => sum + codec.serialize(values[name]).length,
        0,
      ),
    [schema, values],
  );

  return { values, set, setMany, toggle, remove, clear, activeCount };
}
