declare module "*.log" {
    const value: any; // Add better type definitions here if desired.
    export default value;
}

declare type PageView = {
    page: string,
    count: number
}
