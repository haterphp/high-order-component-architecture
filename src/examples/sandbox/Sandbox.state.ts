import { RenderComponentVariantsEnum } from "../../common/core/RenderComponent/RenderComponentVariants";
import {
  HighOrderComponentState,
  IHighOrderComponentState,
} from "../../common/core/State/HighOrderComponentState";

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
