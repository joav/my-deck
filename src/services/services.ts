const services: {[key: string]: any} = {};

export function registerMultipleServices(serviceList: {key: string, service: any}[]) {
    for (const service of serviceList) {
        registerService(service.key, service.service);
    }
}

export function registerService(key: string, service: any) {
    services[key] = service;
}

export function getService<T = any>(key: string): T {
    return services[key];
}