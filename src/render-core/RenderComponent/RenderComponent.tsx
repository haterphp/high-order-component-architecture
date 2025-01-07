import { EventEmitter } from "events";
import { ComponentType, lazy, Suspense } from "react";
import { ICommonComponentProps } from "../Component/HighOrderComponent";
import { HighOrderComponentState } from "../State/HighOrderComponentState";

type InjectedRenderComponent<TComponentProps extends ICommonComponentProps> =
  Promise<{
    default: ComponentType<TComponentProps>;
  }>;

export interface IRenderComponentPayload<
  TComponentProps extends ICommonComponentProps
> {
  component: InjectedRenderComponent<TComponentProps>;
}

export class RenderComponent<
  TState extends HighOrderComponentState,
  TComponentProps extends ICommonComponentProps = ICommonComponentProps
> {
  protected _component: InjectedRenderComponent<TComponentProps>;

  private __eventEmitter: EventEmitter | null;

  private __state: TState | null;

  constructor(payload: IRenderComponentPayload<TComponentProps>) {
    this._component = payload.component;

    this.__eventEmitter = null;
    this.__state = null;
  }

  protected get _eventEmitter(): EventEmitter {
    if (this.__eventEmitter === null) {
      throw new Error(`EventEmitter not added to ${this.constructor.name}`);
    }
    return this.__eventEmitter;
  }

  protected get _state(): TState {
    if (this.__state === null) {
      throw new Error(
        `HighOrderComponentState not added to ${this.constructor.name}`
      );
    }
    return this.__state;
  }

  public addEventEmitter(eventEmitter: EventEmitter): void {
    this.__eventEmitter = eventEmitter;
  }

  public addState(state: TState): void {
    this.__state = state;
  }

  public mount(): void {
    console.log("mount");
  }

  public unmount(): void {
    console.log("unmount");
  }

  public render(highOrderComponentProps: ICommonComponentProps): JSX.Element {
    const Component = lazy(() => this._component);
    const componentProps = this._getRenderComponentProps(
      highOrderComponentProps
    );

    return (
      <Suspense fallback={<></>}>
        <Component {...(componentProps as any)} />
      </Suspense>
    );
  }

  protected _getRenderComponentProps(
    highOrderComponentProps: ICommonComponentProps
  ): TComponentProps {
    return { ...highOrderComponentProps } as TComponentProps;
  }
}
