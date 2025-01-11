import { RenderComponentVariantsEnum } from "../../core/Render/RenderComponent/RenderComponentVariants";
import {
  HighOrderComponentState,
  IHighOrderComponentState,
} from "../../core/Render/State/HighOrderComponentState";

interface ISandboxStateObject extends IHighOrderComponentState {
  test: string;
}

export class SandboxState extends HighOrderComponentState<ISandboxStateObject> {
  constructor() {
    super({
      test: "test",
      renderComponentVariant: RenderComponentVariantsEnum.LOADING,
    });
  }

  public updateTest(value: string): void {
    this._setStateValue("test", () => value);
  }
}
