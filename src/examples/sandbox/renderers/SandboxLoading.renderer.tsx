import {
  ICommonComponentProps,
} from "../../../core/Render/Component/HighOrderComponent";
import { useRenderComponent } from "../../../core/Render/RenderComponent/useRenderComponent";

export default function SandboxLoadingRenderer(props: ICommonComponentProps) {
  useRenderComponent(props);
  return <p>loading...</p>;
}
