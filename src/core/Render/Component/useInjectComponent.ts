import {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HighOrderComponentState } from "../State/HighOrderComponentState";
import { HighOrderComponent, ICommonComponentProps } from "./HighOrderComponent";

export const useInjectComponent = <
	TRootHTMLElement extends HTMLElement,
	TState extends HighOrderComponentState,
	TComponentProps extends ICommonComponentProps
>(
  componentFactory: (
    root: TRootHTMLElement
  ) => HighOrderComponent<TState, TComponentProps>
): RefObject<TRootHTMLElement> => {
  const rootRef = useRef<TRootHTMLElement>(null);

  useEffect(() => {
    const component =
      rootRef.current !== null ? componentFactory(rootRef.current) : null;
    if (component !== null) component.injected();

    return () => {
      if (component !== null) component.removed();
    };
  }, [rootRef]);

  return rootRef;
};
