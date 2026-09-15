(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/blog-frontend/app/dashboard/blogs/create/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CreateBlogPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$blogSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/blogSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$author$2f$BlogForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/components/author/BlogForm.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function CreateBlogPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const mutating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "CreateBlogPage.useAppSelector[mutating]": (state)=>state.blog.mutating
    }["CreateBlogPage.useAppSelector[mutating]"]);
    const submit = async (data, saveAsDraft)=>{
        try {
            const res = await dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$blogSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBlog"])({
                ...data,
                saveAsDraft
            })).unwrap();
            if (res.status) router.push("/dashboard/blogs");
        } catch  {
        // toast already shown by the slice
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "font-display text-2xl text-ink lg:text-3xl",
                children: "Write a new blog"
            }, void 0, false, {
                fileName: "[project]/blog-frontend/app/dashboard/blogs/create/page.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-muted",
                children: "Save it as a draft, or submit it straight for admin review."
            }, void 0, false, {
                fileName: "[project]/blog-frontend/app/dashboard/blogs/create/page.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 card max-w-3xl p-6 sm:p-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$author$2f$BlogForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    actions: [
                        {
                            label: "Save as draft",
                            variant: "ghost",
                            loading: mutating,
                            onSubmit: (data)=>submit(data, true)
                        },
                        {
                            label: "Submit for review",
                            loading: mutating,
                            onSubmit: (data)=>submit(data, false)
                        }
                    ]
                }, void 0, false, {
                    fileName: "[project]/blog-frontend/app/dashboard/blogs/create/page.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/blog-frontend/app/dashboard/blogs/create/page.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/blog-frontend/app/dashboard/blogs/create/page.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(CreateBlogPage, "WZXIRwN60vHMwpJcFuKDGOm0/9I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"]
    ];
});
_c = CreateBlogPage;
var _c;
__turbopack_context__.k.register(_c, "CreateBlogPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/components/author/BlogForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BlogForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$hookform$2f$resolvers$2f$yup$2f$dist$2f$yup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/@hookform/resolvers/yup/dist/yup.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/yup/index.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$categorySlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/categorySlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$tagSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/redux/slice/tagSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/components/ui/Field.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$getFieldValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/lib/getFieldValue.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$cloudinary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/lib/cloudinary.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
const schema = __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"]({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(4, "Title must be at least 4 characters").required("Title is required"),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(10, "Description must be at least 10 characters").required("Description is required"),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(50, "Content must be at least 50 characters").required("Content is required"),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().required("Category is required"),
    featuredImage: __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$yup$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mixed"]().optional()
});
function BlogForm({ initialValues, actions }) {
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"])();
    const { categories } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "BlogForm.useAppSelector": (state)=>state.category
    }["BlogForm.useAppSelector"]);
    const { tags } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"])({
        "BlogForm.useAppSelector": (state)=>state.tag
    }["BlogForm.useAppSelector"]);
    const [selectedTags, setSelectedTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialValues?.tags?.map({
        "BlogForm.useState": (t)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$getFieldValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getId"])(t)
    }["BlogForm.useState"]) || []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BlogForm.useEffect": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$categorySlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchCategories"])({
                isActive: true
            }));
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$slice$2f$tagSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTags"])());
        }
    }["BlogForm.useEffect"], [
        dispatch
    ]);
    const { register, handleSubmit, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f40$hookform$2f$resolvers$2f$yup$2f$dist$2f$yup$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["yupResolver"])(schema),
        defaultValues: {
            title: initialValues?.title || "",
            description: initialValues?.description || "",
            content: initialValues?.content || "",
            category: (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$getFieldValue$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getId"])(initialValues?.category) || ""
        }
    });
    const toggleTag = (id)=>{
        setSelectedTags((prev)=>prev.includes(id) ? prev.filter((t)=>t !== id) : [
                ...prev,
                id
            ]);
    };
    const runAction = (action)=>handleSubmit(async (data)=>{
            try {
                const file = data.featuredImage?.[0];
                const imageUrl = file ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$lib$2f$cloudinary$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uploadImage"])(file, "blogs") : initialValues?.featuredImage || "";
                await action.onSubmit({
                    ...data,
                    featuredImage: imageUrl,
                    tags: selectedTags
                });
            } catch (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.response?.data?.message || "Image upload failed");
            }
        })();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "space-y-5",
        noValidate: true,
        onSubmit: (e)=>e.preventDefault(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                label: "Title",
                placeholder: "An interesting headline",
                ...register("title"),
                error: errors.title?.message
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                label: "Description",
                placeholder: "A short summary shown on blog cards",
                ...register("description"),
                error: errors.description?.message
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                label: "Content",
                placeholder: "Write your blog…",
                className: "min-h-[280px]",
                ...register("content"),
                error: errors.content?.message
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        label: "Category",
                        ...register("category"),
                        error: errors.category?.message,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Select a category"
                            }, void 0, false, {
                                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                                lineNumber: 81,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Technology"
                            }, void 0, false, {
                                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Home Appliance"
                            }, void 0, false, {
                                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this),
                            categories.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: c._id,
                                    children: c.name
                                }, c._id, false, {
                                    fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                                    lineNumber: 85,
                                    columnNumber: 34
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Field$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        label: "Featured image",
                        type: "file",
                        accept: "image/jpeg,image/png,image/webp,image/gif",
                        ...register("featuredImage"),
                        error: errors.featuredImage?.message
                    }, void 0, false, {
                        fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mb-1.5 block text-sm font-medium text-ink",
                        children: "Tags"
                    }, void 0, false, {
                        fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: tags.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>toggleTag(t._id),
                                className: `rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${selectedTags.includes(t._id) ? "border-accent bg-accent-soft text-accent-dark" : "border-border bg-surface text-muted hover:border-accent/40"}`,
                                children: [
                                    "#",
                                    t.name
                                ]
                            }, t._id, true, {
                                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                                lineNumber: 94,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 border-t border-border pt-5",
                children: actions.map((action)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        type: "button",
                        variant: action.variant || "primary",
                        loading: action.loading,
                        onClick: ()=>runAction(action),
                        children: action.label
                    }, action.label, false, {
                        fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/blog-frontend/components/author/BlogForm.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(BlogForm, "NDeTIGNF/5qWOd7uVC8VQNSBe9g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$redux$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = BlogForm;
var _c;
__turbopack_context__.k.register(_c, "BlogForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/components/ui/Button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
const variantClasses = {
    primary: "bg-accent text-white hover:bg-accent-dark shadow-sm shadow-accent/20 disabled:bg-accent/50",
    secondary: "bg-accent-soft text-accent-dark hover:bg-accent-soft/70 disabled:opacity-50",
    ghost: "bg-transparent text-ink hover:bg-black/5 border border-border disabled:opacity-50",
    danger: "bg-danger-soft text-danger hover:bg-danger hover:text-white disabled:opacity-50",
    success: "bg-success-soft text-success hover:bg-success hover:text-white disabled:opacity-50"
};
const Button = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ variant = "primary", loading, disabled, className = "", children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: ref,
        disabled: disabled || loading,
        className: `inline-flex items-center justify-center gap-2 rounded-control px-4 py-2 text-sm font-semibold transition-all duration-200 hover:brightness-105 active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`,
        ...props,
        children: [
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/ui/Button.tsx",
                lineNumber: 25,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/blog-frontend/components/ui/Button.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = Button;
Button.displayName = "Button";
const __TURBOPACK__default__export__ = Button;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/components/ui/Field.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input,
    "Select",
    ()=>Select,
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
function FieldWrapper({ label, error, hint, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-1.5 block text-sm font-medium text-ink",
                children: label
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/ui/Field.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            children,
            hint && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-1 block text-xs text-muted",
                children: hint
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/ui/Field.tsx",
                lineNumber: 10,
                columnNumber: 26
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mt-1 block text-xs font-medium text-danger",
                children: error
            }, void 0, false, {
                fileName: "[project]/blog-frontend/components/ui/Field.tsx",
                lineNumber: 11,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/blog-frontend/components/ui/Field.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = FieldWrapper;
const base = "w-full rounded-control border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15";
const Input = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c1 = ({ label, error, hint, className = "", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldWrapper, {
        label: label,
        error: error,
        hint: hint,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: ref,
            className: `${base} ${error ? "border-danger" : ""} ${className}`,
            ...props
        }, void 0, false, {
            fileName: "[project]/blog-frontend/components/ui/Field.tsx",
            lineNumber: 22,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/blog-frontend/components/ui/Field.tsx",
        lineNumber: 21,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c2 = Input;
Input.displayName = "Input";
const Textarea = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c3 = ({ label, error, hint, className = "", ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldWrapper, {
        label: label,
        error: error,
        hint: hint,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
            ref: ref,
            className: `${base} min-h-[110px] resize-y ${error ? "border-danger" : ""} ${className}`,
            ...props
        }, void 0, false, {
            fileName: "[project]/blog-frontend/components/ui/Field.tsx",
            lineNumber: 30,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/blog-frontend/components/ui/Field.tsx",
        lineNumber: 29,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c4 = Textarea;
Textarea.displayName = "Textarea";
const Select = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c5 = ({ label, error, hint, className = "", children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldWrapper, {
        label: label,
        error: error,
        hint: hint,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
            ref: ref,
            className: `${base} ${error ? "border-danger" : ""} ${className}`,
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/blog-frontend/components/ui/Field.tsx",
            lineNumber: 38,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/blog-frontend/components/ui/Field.tsx",
        lineNumber: 37,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c6 = Select;
Select.displayName = "Select";
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "FieldWrapper");
__turbopack_context__.k.register(_c1, "Input$forwardRef");
__turbopack_context__.k.register(_c2, "Input");
__turbopack_context__.k.register(_c3, "Textarea$forwardRef");
__turbopack_context__.k.register(_c4, "Textarea");
__turbopack_context__.k.register(_c5, "Select$forwardRef");
__turbopack_context__.k.register(_c6, "Select");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/lib/cloudinary.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadImage",
    ()=>uploadImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/blog-frontend/api/axios/axios.ts [app-client] (ecmascript)");
;
async function uploadImage(file, folder) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("folder", folder);
    const response = await __TURBOPACK__imported__module__$5b$project$5d2f$blog$2d$frontend$2f$api$2f$axios$2f$axios$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post("/uploads/image", formData);
    return response.data.data.url;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/blog-frontend/lib/getFieldValue.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Category/tag/author fields on a Blog can arrive as either a populated
// object or a bare ObjectId string depending on the endpoint. These helpers
// read them safely either way.
__turbopack_context__.s([
    "getId",
    ()=>getId,
    "getName",
    ()=>getName
]);
function getName(field, fallback = "") {
    if (!field) return fallback;
    if (typeof field === "string") return fallback;
    return field.name || fallback;
}
function getId(field) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field._id || "";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=blog-frontend_1jva1xj._.js.map