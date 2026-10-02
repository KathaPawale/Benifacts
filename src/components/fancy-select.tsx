import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export type SelectOption = { value: string; hint?: string; Icon?: LucideIcon };
export type SelectGroup = { label?: string; options: SelectOption[] };

/**
 * A styled dropdown for the contact form. It submits through a hidden input with the same name,
 * so the form posts exactly as a native <select> would. Keyboard: arrows move, Enter/Space picks, Escape closes.
 */
export function FancySelect({ name, label, optional = false, placeholder, groups, required = false }: {
  name: string; label: string; optional?: boolean; placeholder: string; groups: SelectGroup[]; required?: boolean;
}) {
  const id = useId();
  const all = groups.flatMap((g) => g.options);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open]);

  useEffect(() => {
    if (open) list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const pick = (v: string) => { setValue(v); setOpen(false); };
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActive((i) => (i + (e.key === "ArrowDown" ? 1 : all.length - 1)) % all.length);
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (open) pick(all[active]!.value); else setOpen(true);
    }
  };

  const selected = all.find((o) => o.value === value);
  let index = -1;
  return <div className={`fselect ${open ? "is-open" : ""} ${value ? "has-value" : ""}`} ref={root}>
    <span className="fselect-label" id={`${id}-label`}>{label}{optional && <small> (optional)</small>}</span>
    <input type="hidden" name={name} value={value} />
    {required && <input className="fselect-guard" tabIndex={-1} aria-hidden="true" value={value} required onChange={() => {}} onInvalid={() => setOpen(true)} />}
    <button type="button" className="fselect-trigger" aria-haspopup="listbox" aria-expanded={open} aria-labelledby={`${id}-label ${id}-value`} onClick={() => setOpen(!open)} onKeyDown={onKey}>
      <span id={`${id}-value`} className="fselect-value">{selected ? <>{selected.Icon && <selected.Icon aria-hidden="true" />}{selected.value}</> : placeholder}</span>
      <ChevronDown aria-hidden="true" className="fselect-chevron" />
    </button>
    <ul className="fselect-panel" data-lenis-prevent role="listbox" aria-labelledby={`${id}-label`} ref={list} hidden={!open}>
      {groups.map((g, gi) => <li key={gi} role="presentation" className="fselect-group">
        {g.label && <span className="fselect-group-label">{g.label}</span>}
        <ul role="group">{g.options.map((o) => {
          index++;
          const i = index;
          return <li key={o.value} role="option" data-index={i} aria-selected={o.value === value} className={i === active ? "is-active" : ""}
            onPointerEnter={() => setActive(i)} onClick={() => pick(o.value)}>
            {o.Icon && <o.Icon aria-hidden="true" className="fselect-icon" />}
            <span><b>{o.value}</b>{o.hint && <small>{o.hint}</small>}</span>
            {o.value === value && <Check aria-hidden="true" className="fselect-check" />}
          </li>;
        })}</ul>
      </li>)}
    </ul>
  </div>;
}
