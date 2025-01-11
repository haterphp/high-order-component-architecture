import { RenderComponent } from "../../../core/Render/RenderComponent/RenderComponent";
import { ChangeEventKeyBuilder } from "../../../core/Render/State/AbstractState";
import { SandboxState } from "../Sandbox.state";

export class SandboxContentRenderComponent extends RenderComponent<SandboxState> {
  constructor() {
    super({ component: import("./SandboxContent.renderer") });
  }

  public mount(): void {
    this._eventEmitter.emit(
      ChangeEventKeyBuilder("test"),
      this._state.stateObject.test
    );
    this._eventEmitter.addListener(
      "updateTest",
      this._state.updateTest.bind(this._state)
    );
  }
}
