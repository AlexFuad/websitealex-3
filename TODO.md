# Next.js Webpack Build Fix - TODO

## ✅ Plan Approved by User

**Breakdown into steps:**

### [ ] Step 1: Fix Syntax Error in src/app/admin/blog/new/page.js
**Issue**: Invalid object literal syntax line ~434-440 (trailing comma missing)
```
modules={{
  toolbar: [...],
  clipboard: {  ❌ Missing comma after ]
```
**Fix**: Add comma after toolbar array

### [ ] Step 2: Fix Module Import Error
**Issue**: src/app/api/auth/[...nextauth]/route.js can't resolve '@/lib/auth.js'
**Status**: File exists, @ alias in next.config.js ✅
**Fix**: Check auth.js exports, route.js imports

### [ [ ] Step 3: Cleanup Duplicate Pages
**Move 8 backup files** → *.backup.js
**Keep**: page_fixed_final.js → rename to page.js

### [ ] Step 4: Test Build
```
npm run build
```

### [ ] Step 5: Complete ✅
```
npm run dev 
git commit
```

