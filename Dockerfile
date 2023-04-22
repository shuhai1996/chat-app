FROM node:17.9.0 as builder
# 将文件copy到镜像app目录中
COPY ./ /app
# 工作目录
WORKDIR /app
RUN npm install && npm run build

# 基础镜像 nginx
FROM nginx
ENV TZ=Asia/Shanghai
RUN mkdir /app
# 将文件copy到镜像app目录中
COPY --from=builder /app/dist /app
# 暴露端口
EXPOSE 9500
