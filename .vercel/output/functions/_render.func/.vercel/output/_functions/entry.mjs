import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BLU51YsC.mjs';
import { manifest } from './manifest_BwO7j_Pt.mjs';

const _page0 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const _page2 = () => import('./pages/api/courses.astro.mjs');
const _page3 = () => import('./pages/api/lessons/generate/array.astro.mjs');
const _page4 = () => import('./pages/api/lessons/generate/content.astro.mjs');
const _page5 = () => import('./pages/api/lessons/generate/image.astro.mjs');
const _page6 = () => import('./pages/api/lessons/generate/video.astro.mjs');
const _page7 = () => import('./pages/api/lessons/generate/video-result.astro.mjs');
const _page8 = () => import('./pages/api/lessons.astro.mjs');
const _page9 = () => import('./pages/api/users/login.astro.mjs');
const _page10 = () => import('./pages/api/users/logout.astro.mjs');
const _page11 = () => import('./pages/api/users/signup.astro.mjs');
const _page12 = () => import('./pages/api/users/_id_/profile.astro.mjs');
const _page13 = () => import('./pages/api/users/_id_/remove.astro.mjs');
const _page14 = () => import('./pages/courses/details/_courseid_.astro.mjs');
const _page15 = () => import('./pages/courses/editor/_courseid_.astro.mjs');
const _page16 = () => import('./pages/courses/editor.astro.mjs');
const _page17 = () => import('./pages/courses/overview.astro.mjs');
const _page18 = () => import('./pages/lessons/editor/_lessonid_.astro.mjs');
const _page19 = () => import('./pages/lessons/preview/_lessonid_.astro.mjs');
const _page20 = () => import('./pages/lessons/_courseid_/editor.astro.mjs');
const _page21 = () => import('./pages/login.astro.mjs');
const _page22 = () => import('./pages/profile.astro.mjs');
const _page23 = () => import('./pages/signup.astro.mjs');
const _page24 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/actions/runtime/route.js", _page0],
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page1],
    ["src/pages/api/courses/index.ts", _page2],
    ["src/pages/api/lessons/generate/array.ts", _page3],
    ["src/pages/api/lessons/generate/content.ts", _page4],
    ["src/pages/api/lessons/generate/image.ts", _page5],
    ["src/pages/api/lessons/generate/video.ts", _page6],
    ["src/pages/api/lessons/generate/video-result.ts", _page7],
    ["src/pages/api/lessons/index.ts", _page8],
    ["src/pages/api/users/login.ts", _page9],
    ["src/pages/api/users/logout.ts", _page10],
    ["src/pages/api/users/signup.ts", _page11],
    ["src/pages/api/users/[id]/profile.ts", _page12],
    ["src/pages/api/users/[id]/remove.ts", _page13],
    ["src/pages/courses/details/[courseId].astro", _page14],
    ["src/pages/courses/editor/[courseId].astro", _page15],
    ["src/pages/courses/editor.astro", _page16],
    ["src/pages/courses/overview.astro", _page17],
    ["src/pages/lessons/editor/[lessonId].astro", _page18],
    ["src/pages/lessons/preview/[lessonId].astro", _page19],
    ["src/pages/lessons/[courseId]/editor.astro", _page20],
    ["src/pages/login.astro", _page21],
    ["src/pages/profile.astro", _page22],
    ["src/pages/signup.astro", _page23],
    ["src/pages/index.astro", _page24]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "63d50d90-804d-4b45-b2d5-f24789a4e017",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
