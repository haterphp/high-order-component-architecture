import { useInjectComponent } from "./render-core/Component/useInjectComponent";
import { SandboxComponent } from "./sandbox/Sandbox";

export default function App() {
  const sandboxComponentRef1 = useInjectComponent<HTMLDivElement>(
    (root: HTMLElement) => new SandboxComponent(root, 1000)
  );

  const sandboxComponentRef2 = useInjectComponent<HTMLDivElement>(
    (root: HTMLElement) => new SandboxComponent(root, 5000)
  );

  return (
    <>
      <div ref={sandboxComponentRef1}></div>
      <div ref={sandboxComponentRef2}></div>
    </>
  );
}
