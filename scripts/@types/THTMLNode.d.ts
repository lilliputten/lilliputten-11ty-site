type THTMLNode = HTMLElement & {
  getAttribute: (id: string) => string;
  setAttribute: (id: string, value: string) => void;
  dataset: Record<string, string>;
};
