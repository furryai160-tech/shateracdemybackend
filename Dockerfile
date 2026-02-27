FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# تثبيت الحزم
COPY package*.json ./
COPY prisma ./prisma/

# تثبيت كل الحزم (devDependencies ضرورية لعملية البناء)
RUN npm ci

# نسخ كل الكود
COPY . .

# بناء المشروع
RUN npm run build

# توليد Prisma Client
RUN npx prisma generate

# إزالة devDependencies بعد البناء (توفير مساحة)
RUN npm prune --omit=dev

# مجلد الـ uploads
RUN mkdir -p uploads

EXPOSE 4000

CMD ["node", "dist/main"]
