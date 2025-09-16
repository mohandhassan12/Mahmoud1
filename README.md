نظام إدارة خصومات الموظفين - Netlify + Supabase
=================================================

تعليمات سريعة:
1. ضع هذا المشروع على مستودع git ثم اربطه بـ Netlify.
2. في إعدادات الموقع على Netlify (Site settings > Build & deploy > Environment) أضف المتغيرات:
   - SUPABASE_URL  (مثال: https://xxxx.supabase.co)
   - SUPABASE_KEY  (مفتاح الخدمة)
   - ADMIN_CLEAR_PASSWORD  (اختياري. كلمة سر لمسح جميع الخصومات)
3. ادفع الكود. Netlify سيبني الوظائف وستتوفر النقطة النهائية تحت /api/employees و /api/discounts.
4. افتح index.html المنشور.

محتويات:
- index.html            -> واجهة واحدة متجاوبة
- netlify.toml          -> إعدادات البناء وإعادة التوجيه
- netlify/functions/    -> وظائف Netlify للتعامل مع Supabase

ملاحظات أمان:
- لا تضع SUPABASE_KEY في الواجهة. خزّنه في متغيرات Netlify كما هو موضح.
- حماية مسح الكل تتحقق بواسطة ADMIN_CLEAR_PASSWORD.
