"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const common_1 = require("@nestjs/common");
const cacheable_1 = require("cacheable");
let CacheService = class CacheService {
    cache;
    constructor(cache) {
        this.cache = cache;
    }
    async set(key, value, ttl) {
        await this.cache.set(key, value, ttl);
    }
    async get(key) {
        const value = await this.cache.get(key);
        if (value === undefined) {
            console.log(`Cache miss for key: ${key}`);
            return undefined;
        }
        else {
            console.log(`Cache hit for key: ${key}`);
            return value;
        }
    }
    async del(key) {
        const deleted = await this.cache.delete(key);
        if (deleted) {
            console.log(`Cache key "${key}" deleted.`);
        }
        else {
            console.log(`Cache key "${key}" not found.`);
        }
        return deleted;
    }
    async clear() {
        await this.cache.clear();
        console.log('Cache cleared');
    }
    async exists(key) {
        const exists = await this.cache.has(key);
        console.log(`Cache exists for key "${key}": ${exists}`);
        return exists;
    }
};
exports.CacheService = CacheService;
exports.CacheService = CacheService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CACHE_INSTANCE')),
    __metadata("design:paramtypes", [cacheable_1.Cacheable])
], CacheService);
//# sourceMappingURL=cache.service.js.map