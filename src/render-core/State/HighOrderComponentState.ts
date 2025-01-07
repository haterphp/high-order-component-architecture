import { RenderComponentVariantsEnum } from "../RenderComponent/RenderComponentVariants";
import { AbstractState } from "./AbstractState";

export enum HighOrderComponentRenderState {
  INIT = "init",
  INJECTED = "injected",
  MOUNTED = "mounted",
  UNMOUNTED = "unmounted",
  REMOVED = "removed",
}

export interface IHighOrderComponentState {
  renderState?: HighOrderComponentRenderState;
  renderComponentVariant?: RenderComponentVariantsEnum;
}

export class HighOrderComponentState<
  TState extends IHighOrderComponentState = IHighOrderComponentState
> extends AbstractState<
  TState & Required<Pick<TState, keyof IHighOrderComponentState>>
> {
  constructor(defaultState: TState) {
    super({
      renderComponentVariant: RenderComponentVariantsEnum.CONTENT,
      ...defaultState,
      renderState: HighOrderComponentRenderState.INIT,
    });
  }

  public updateRenderState(renderState: HighOrderComponentRenderState): void {
    this._setStateValue("renderState", () => renderState);
  }

  public updateRenderComponent(
    renderComponent: RenderComponentVariantsEnum
  ): void {
    this._setStateValue("renderComponentVariant", () => renderComponent);
  }
}
