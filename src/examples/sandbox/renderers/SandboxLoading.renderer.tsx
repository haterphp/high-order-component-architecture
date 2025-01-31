import {
  ICommonComponentProps,
} from "../../../common/core/Component/HighOrderComponent";
import { useRenderComponent } from "../../../common/core/RenderComponent/useRenderComponent";

export default function SandboxLoadingRenderer(props: ICommonComponentProps) {
  useRenderComponent(props);
  return <p>loading...</p>;
}
