"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preactDevtoolsPlugin = void 0;
const vite_1 = require("vite");
const path_1 = __importDefault(require("path"));
const debug_1 = __importDefault(require("debug"));
const kl = __importStar(require("kolorist"));
const utils_js_1 = require("./utils.js");
function preactDevtoolsPlugin({ devtoolsInProd, devToolsEnabled, shouldTransform, }) {
    const log = (0, debug_1.default)("vite:preact-devtools");
    let entry = "";
    let config;
    let found = false;
    const plugin = {
        name: "preact:devtools",
        // Ensure that we resolve before everything else
        enforce: "pre",
        config() {
            return {
                optimizeDeps: {
                    include: ["preact/debug", "preact/devtools"],
                },
            };
        },
        configResolved(resolvedConfig) {
            config = resolvedConfig;
            devToolsEnabled =
                devToolsEnabled !== null && devToolsEnabled !== void 0 ? devToolsEnabled : (!config.isProduction || devtoolsInProd);
        },
        resolveId(url, importer = "") {
            const { id } = (0, utils_js_1.parseId)(url);
            // Get the main entry file to inject into
            if (!found && /\.html$/.test(importer) && shouldTransform(id)) {
                found = true;
                entry = (0, vite_1.normalizePath)(path_1.default.join(config.root, id));
                // TODO: Vite types require explicit return
                // undefined here. They're lacking the "void" type
                // in their declarations
                return undefined;
            }
        },
        transform(code, url) {
            const { id } = (0, utils_js_1.parseId)(url);
            if (entry === id && (!config.isProduction || devToolsEnabled)) {
                const source = config.isProduction ? "preact/devtools" : "preact/debug";
                code = `import "${source}";\n${code}`;
                log(`[inject] ${kl.cyan(source)} -> ${kl.dim(id)}`);
                return code;
            }
        },
    };
    return plugin;
}
exports.preactDevtoolsPlugin = preactDevtoolsPlugin;
