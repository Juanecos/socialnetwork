"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const cacheable_1 = require("cacheable");
const redis_1 = require("@keyv/redis");
require('dotenv').config();
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'CACHE_INSTANCE',
                useFactory: () => {
                    const redisurl = process.env.REDIS_URL || 'redis://localhost:6379';
                    const secondary = (0, redis_1.createKeyv)(redisurl, {
                        namespace: 'keyv',
                    });
                    return new cacheable_1.Cacheable({ secondary, ttl: '4h' });
                },
            },
        ],
        exports: ['CACHE_INSTANCE'],
    })
], CacheModule);
//# sourceMappingURL=cache.module.js.map