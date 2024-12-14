declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default content
}

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request?: (...args: any[]) => Promise<void>;
  };
}