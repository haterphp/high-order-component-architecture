import { EventEmitter } from "events";
import { createRoot, Root } from "react-dom/client";
import { RenderComponent } from "../RenderComponent/RenderComponent";
import { RenderComponentVariantsEnum } from "../RenderComponent/RenderComponentVariants";
import { ChangeEventKeyBuilder } from "../State/AbstractState";
import {
  HighOrderComponentRenderState,
  HighOrderComponentState,
} from "../State/HighOrderComponentState";

type HighOrderRenderComponents<TState extends HighOrderComponentState> =
  Partial<
    Record<
      Exclude<RenderComponentVariantsEnum, RenderComponentVariantsEnum.CONTENT>,
      RenderComponent<TState>
    >
  > & { [RenderComponentVariantsEnum.CONTENT]: RenderComponent<TState> };

export interface ICommonComponentProps {
  eventEmitter: EventEmitter;
}

export interface IHighOrderComponentPayload<
  TState extends HighOrderComponentState
> {
  components: HighOrderRenderComponents<TState>;
  state: TState;
  root: HTMLElement;
}

export const UPDATE_RENDER_STATE_KEY = "updateRenderState";
export const UPDATE_RENDER_COMPONENT_KEY = "updateRenderComponent";

export abstract class HighOrderComponent<
  TState extends HighOrderComponentState
> {
  protected _state: TState;

  protected _components: HighOrderRenderComponents<TState>;

  protected _eventEmitter: EventEmitter;

  private __root: Root;

  constructor(payload: IHighOrderComponentPayload<TState>) {
    // Define event emitter
    this._eventEmitter = new EventEmitter();

    // Define state component and set event emitter to it
    this._state = payload.state;
    this._state.addEventEmitter(this._eventEmitter);

    // Define components and set event emitter to them
    this._components = payload.components;
    for (const component of Object.values(this._components)) {
      component.addEventEmitter(this._eventEmitter);
      component.addState(this._state);
    }

    this.__root = createRoot(payload.root);
  }

  public injected(): void {
    this._eventEmitter.addListener(
      UPDATE_RENDER_STATE_KEY,
      this._state.updateRenderState.bind(this._state)
    );

    this._eventEmitter.addListener(
      UPDATE_RENDER_COMPONENT_KEY,
      this._state.updateRenderComponent.bind(this._state)
    );

    this._eventEmitter.addListener(
      ChangeEventKeyBuilder("renderState"),
      this.__callLifeCycleFunctionByRenderState.bind(this)
    );

    this._eventEmitter.addListener(
      ChangeEventKeyBuilder("renderComponentVariant"),
      this._injectRenderComponent.bind(this)
    );

    // Set render state to injected
    this._state.updateRenderState(HighOrderComponentRenderState.INJECTED);

    // Call render hook for first time
    this._eventEmitter.emit(
      ChangeEventKeyBuilder("renderComponentVariant"),
      this._state.stateObject.renderComponentVariant
    );
  }

  public removed(): void {
    this.__root.unmount();
    this._state.updateRenderState(HighOrderComponentRenderState.REMOVED);
    this._eventEmitter.removeAllListeners();
  }

  protected _getComponentProps(): ICommonComponentProps {
    return { eventEmitter: this._eventEmitter };
  }

  protected _injectRenderComponent(
    renderComponentVariant: RenderComponentVariantsEnum
  ): void {
    const renderComponent = this.__getRenderComponentByVariant(
      renderComponentVariant
    );

    const renderer = renderComponent.render(this._getComponentProps());
    this.__root.render(renderer);
  }

  private __callLifeCycleFunctionByRenderState(
    renderState:
      | HighOrderComponentRenderState.MOUNTED
      | HighOrderComponentRenderState.UNMOUNTED
  ): void {
    const renderComponent = this.__getRenderComponentByVariant(
      this._state.stateObject.renderComponentVariant
    );

    const stateToFunction: Record<
      | HighOrderComponentRenderState.MOUNTED
      | HighOrderComponentRenderState.UNMOUNTED,
      "mount" | "unmount"
    > = {
      [HighOrderComponentRenderState.MOUNTED]: "mount",
      [HighOrderComponentRenderState.UNMOUNTED]: "unmount",
    };

    if (
      ![
        HighOrderComponentRenderState.MOUNTED,
        HighOrderComponentRenderState.UNMOUNTED,
      ].includes(renderState)
    )
      return;

    renderComponent[stateToFunction[renderState]]?.();
  }

  private __getRenderComponentByVariant(
    variant: RenderComponentVariantsEnum
  ): RenderComponent<TState> {
    const renderComponent = this._components[variant];
    if (renderComponent === undefined) {
      throw new Error(
        `Can not find variant="${variant}" for this._components in ${this.constructor.name}`
      );
    }
    return renderComponent;
  }
}
