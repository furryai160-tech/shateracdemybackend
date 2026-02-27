FROM node:20-alpine

WORKDIR /app

# نسخ ملفات الحزم
COPY package*.json ./
COPY prisma ./prisma/

# تثبيت كل الحزم (بما فيها devDeps عشان @nestjs/cli موجود)
RUN npm ci

# نسخ كل الكود
COPY . .

# بناء المشروع (محتاج @nestjs/cli)
RUN npm run build

# توليد Prisma Client
RUN npx prisma generate

# إزالة devDependencies بعد البناء
RUN npm prune --omit=dev

# تعيين بيئة الإنتاج بعد البناء
ENV NODE_ENV=production

# مجلد الـ uploads
RUN mkdir -p uploads

EXPOSE 4000

CMD ["node", "dist/main"]
