declare module "*.log" {
  const value: any; // Add better type definitions here if desired.
  export default value;
}

declare type PageView = {
  path: string;
  ip: string;
};

// {'/home': 3, '/home': 3}
declare type PageViewCount = Record<string, number>;
