// export const compose =

type tuple = ['a', number, string[]];

const fn00 = (name: string, age: number, single: boolean) => true;

type fn00Params = Parameters<typeof fn00>;

type Params<F extends (...args: any[]) => any> = F extends ((...args: infer A) => any) ? A : never;

type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never;

type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any)
    ? TT
    : [];

type Tail2<T extends any[]> = T extends [any, ...any[]] ? Exclude<T, T[0]> : [];

// Exclude<>

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true;

type Union2<T extends any[]> = (
    arg: Head<T>,
) => HasTail<T> extends true ? (Head<T> | Union2<Tail2<T>>) : Head<T>;

type kek = HasTail<[1, 2, string]>;

type ObjectInfer<O> = O extends { a: infer A }
    ? A // true
    : never; // false

type PromiseClassInfer<I> = I extends Promise<infer G>
    ? G // true
    : never; // false

type FunctionInfer<F> = F extends (...args: infer A) => infer R
    ? [A, R] // true
    : never; // false

type ArrayInfer<T> = T extends (infer U)[]
    ? U // true
    : never; // ever

type TupleInfer<T> = T extends [infer A, ...(infer B)[]]
    ? [A, B] // true
    : never; // false

const obj = { a: 'halko' };

type aObjInf = ObjectInfer<typeof obj>;

///
type Cast<X, Y> = X extends Y ? X : Y;

type Length<T extends any[]> = T['length'];

type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends ((
    ...args: infer U
) => any)
    ? U
    : T;

type Drop<N extends number, T extends any[], I extends any[] = []> = {
    0: Drop<N, Tail<T>, Prepend<any, I>>;
    1: T;
}[Length<I> extends N ? 1 : 0];
///

type Curry0<P extends any[], R> = (
    arg: Head<P>,
) => HasTail<P> extends true ? Curry0<Tail<P>, R> : R;

// type Curry5<P extends any[], R> = <T extends any[]>(
//     ...args: Cast<T, Partial<P>>
// ) => Drop<Length<T>, P> extends [any, ...any[]] ? Curry5<Cast<Drop<Length<T>, P>, any[]>, R> : R;
// possible infinite err

// conditional accessors
type Last<T extends any[]> = {
    0: Last<Tail<T>>;
    1: Head<T>;
}[HasTail<T> extends true ? 0 : 1];

type Kek = Last<[string, number]>;

///

type Pos<I extends any[]> = Length<I>;

type Next<I extends any[]> = Prepend<any, I>;

type Prev<I extends any[]> = Tail<I>;

type Iterator2<Index extends number = 0, From extends any[] = [], I extends any[] = []> = {
    0: Iterator2<Index, Next<From>, Next<I>>;
    1: From;
}[Pos<I> extends Index ? 1 : 0];

type Reverse<T extends any[], R extends any[] = [], I extends any[] = []> = {
    0: Reverse<T, Prepend<T[Pos<I>], R>, Next<I>>;
    1: R;
}[Pos<I> extends Pos<T> ? 1 : 0];

// infinite
// type Concat<A extends any[], B extends any[]> = Reverse<Cast<Reverse<A>, any[]>, B>;

// type Append<E, T extends any[]> = Concat<T, [E]>;

// type GapOf<T1 extends any[], T2 extends any[], TN extends any[], I extends any[]> =
// T1[Post<I>] extends __ ? Append<T2[{ps}]>

// mapped type
type PartialSth<T extends any[]> = { [K in keyof T]: NonNullable<T[K]> };

// export function ofType2<T extends Action, Type extends string>(
//     ...keys: Type[]
// ): OperatorFunction<T, ActionsOfType<T, ArrayUnion<Type[]>>> {
//     return source =>
//         source.pipe(filter(action => keys.includes(action.type as Type))) as Observable<
//             ActionsOfType<T, ArrayUnion<Type[]>>
//         >;
// }
