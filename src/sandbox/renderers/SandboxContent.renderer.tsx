import { ChangeEventHandler, useEffect, useState } from "react";
import { ICommonComponentProps } from "../../render-core/Component/HighOrderComponent";
import { useRenderComponent } from "../../render-core/RenderComponent/useRenderComponent";
import { ChangeEventKeyBuilder } from "../../render-core/State/AbstractState";

export default function SandboxContentRenderer(props: ICommonComponentProps) {
  const { eventEmitter } = props;

  const [value, setValue] = useState("");

  useRenderComponent(props, {
    mount: () => {
      eventEmitter.addListener(ChangeEventKeyBuilder("test"), setValue);
    },
    unmount: () => {
      eventEmitter.removeListener(ChangeEventKeyBuilder("test"), setValue);
    },
  });

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    eventEmitter.emit("updateTest", e.target.value);
  };

  return (
    <>
      <input value={value} onChange={handleOnChange} />
      <p>{value}</p>
    </>
  );
}
