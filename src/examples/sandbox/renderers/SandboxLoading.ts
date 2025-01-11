import { UPDATE_RENDER_COMPONENT_KEY } from "../../../core/Render/Component/HighOrderComponent";
import { RenderComponent } from "../../../core/Render/RenderComponent/RenderComponent";
import { RenderComponentVariantsEnum } from "../../../core/Render/RenderComponent/RenderComponentVariants";
import { SandboxState } from "../Sandbox.state";

interface ISandboxLoadingRenderComponentPayload {
  timeout: number;
}

export class SandboxLoadingRenderComponent extends RenderComponent<SandboxState> {
  private __timeout: number;

  constructor(props: ISandboxLoadingRenderComponentPayload) {
    super({ component: import("./SandboxLoading.renderer") });
    this.__timeout = props.timeout;
  }

  public mount(): void {
    setTimeout(
      this._eventEmitter.emit.bind(this._eventEmitter),
      this.__timeout,
      UPDATE_RENDER_COMPONENT_KEY,
      RenderComponentVariantsEnum.CONTENT
    );
  }
}
