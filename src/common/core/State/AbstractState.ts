import { EventEmitter } from "events";

type StateValueBuilder<
  TObjectState extends object,
  TKey extends keyof TObjectState
> = (value: TObjectState[TKey]) => TObjectState[TKey];

export type IObjectState = Record<string, any>;

export const ChangeEventKeyBuilder = (key: string): string => `${key}_changed`;

export abstract class AbstractState<
  TObjectState extends IObjectState = IObjectState
> {
  private __eventEmitter: EventEmitter | null;

  protected _stateObject: TObjectState;

  constructor(defaultState: TObjectState) {
    this.__eventEmitter = null;
    this._stateObject = defaultState;
  }

  public get stateObject(): TObjectState {
    return this._stateObject;
  }

  protected get _eventEmitter(): EventEmitter {
    if (this.__eventEmitter === null) {
      throw new Error(`EventEmitter not added to ${this.constructor.name}`);
    }
    return this.__eventEmitter;
  }

  public injected(): void {}

  public removed(): void {}

  public addEventEmitter(eventEmitter: EventEmitter): void {
    this.__eventEmitter = eventEmitter;
  }

  protected _setStateValue<TKey extends keyof TObjectState>(
    key: TKey,
    value: StateValueBuilder<TObjectState, TKey>
  ): void {
    this._stateObject[key] = value(this._stateObject[key]);

    if (this._eventEmitter !== null) {
      this._eventEmitter.emit(
        ChangeEventKeyBuilder(key.toString()),
        this._stateObject[key]
      );
    }
  }
}
