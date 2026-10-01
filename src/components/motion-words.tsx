import { Children, cloneElement, isValidElement, type ReactNode, type ReactElement } from "react";

/** Retains every character and semantic child; adds only animation targets. */
export function MotionWords({ children }: { children: ReactNode }) {
  const wrap = (nodes: ReactNode): ReactNode => Children.map(nodes, child => {
    if (typeof child === "string") return child.split(/(\s+)/).map((part, index) =>
      /^\s*$/.test(part) ? part : <span className="motion-word-mask" key={index}><span className="motion-word">{part}</span></span>);
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children !== undefined) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, {}, wrap(child.props.children));
    }
    return child;
  });
  return <>{wrap(children)}</>;
}
