# استخدام Node 22 الرسمي من Docker Hub (22.14+ يدعم Prisma 7)
FROM node:22-alpine

# تثبيت openssl المطلوب لـ Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# نسخ ملفات الحزمة أولاً (للاستفادة من Docker cache)
COPY package*.json ./
COPY prisma ./prisma/

# تثبيت الحزم
RUN npm ci

# توليد Prisma Client
RUN npx prisma generate

# نسخ باقي الكود
COPY . .

# بناء المشروع
RUN npm run build

# تحديد البورت
EXPOSE 4000

# تشغيل التطبيق
CMD ["node", "dist/main"]
