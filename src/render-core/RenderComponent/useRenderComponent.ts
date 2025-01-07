import { useEffect } from "react";
import { HighOrderComponentRenderState } from "../State/HighOrderComponentState";
import {
  ICommonComponentProps,
  UPDATE_RENDER_STATE_KEY,
} from "../Component/HighOrderComponent";

interface ILifeCycleHooks {
  mount?(): void;
  unmount?(): void;
}

export const useRenderComponent = (
  props: ICommonComponentProps,
  lifeCycleHooks: ILifeCycleHooks = {}
): void => {
  const { eventEmitter } = props;
  const { mount, unmount } = lifeCycleHooks;

  useEffect(() => {
    mount?.();

    eventEmitter.emit(
      UPDATE_RENDER_STATE_KEY,
      HighOrderComponentRenderState.MOUNTED
    );

    return () => {
      unmount?.();

      eventEmitter.emit(
        UPDATE_RENDER_STATE_KEY,
        HighOrderComponentRenderState.UNMOUNTED
      );
    };
  }, []);
};
