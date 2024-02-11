export declare class IndexController {
    private swagger;
    get(protocol: string, host: string): {
        BASE_URL: string;
        docs: ({
            specVersion?: "2.0" | undefined;
            spec?: Partial<import("@tsed/openspec").OpenSpec2> | undefined;
            path: string;
            fileName?: string | undefined;
            hidden?: string | undefined;
            doc?: string | undefined;
            cssPath?: string | undefined;
            jsPath?: string | undefined;
            viewPath?: string | false | undefined;
            options?: import("@tsed/swagger").SwaggerUIOptions | undefined;
            showExplorer?: boolean | undefined;
            specPath?: string | undefined;
            outFile?: string | undefined;
            operationIdFormatter?: ((name: string, propertyKey: string, path: string) => string) | undefined;
            operationIdPattern?: string | undefined;
            disableSpec?: boolean | undefined;
            pathPatterns?: string[] | undefined;
            url: string;
        } | {
            specVersion?: import("@tsed/openspec").OS3Versions | undefined;
            spec?: Partial<import("@tsed/openspec").OpenSpec3<import("@tsed/openspec").OS3Schema>> | undefined;
            path: string;
            fileName?: string | undefined;
            hidden?: string | undefined;
            doc?: string | undefined;
            cssPath?: string | undefined;
            jsPath?: string | undefined;
            viewPath?: string | false | undefined;
            options?: import("@tsed/swagger").SwaggerUIOptions | undefined;
            showExplorer?: boolean | undefined;
            specPath?: string | undefined;
            outFile?: string | undefined;
            operationIdFormatter?: ((name: string, propertyKey: string, path: string) => string) | undefined;
            operationIdPattern?: string | undefined;
            disableSpec?: boolean | undefined;
            pathPatterns?: string[] | undefined;
            url: string;
        })[];
    };
}
