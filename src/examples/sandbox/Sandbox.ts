import { HighOrderComponent } from "../../core/Render/Component/HighOrderComponent";
import { SandboxContentRenderComponent } from "./renderers/SandboxContent";
import { SandboxLoadingRenderComponent } from "./renderers/SandboxLoading";
import { SandboxState } from "./Sandbox.state";

export class SandboxComponent extends HighOrderComponent<SandboxState> {
  constructor(root: HTMLElement, timeout: number) {
    super({
      components: {
        loading: new SandboxLoadingRenderComponent({ timeout }),
        content: new SandboxContentRenderComponent(),
      },
      state: new SandboxState(),
      root,
    });
  }

  public injected(): void {
    super.injected();
  }
}
