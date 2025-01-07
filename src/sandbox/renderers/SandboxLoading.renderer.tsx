import {
  ICommonComponentProps,
} from "../../render-core/Component/HighOrderComponent";
import { useRenderComponent } from "../../render-core/RenderComponent/useRenderComponent";

export default function SandboxLoadingRenderer(props: ICommonComponentProps) {
  useRenderComponent(props);
  return <p>loading...</p>;
}
