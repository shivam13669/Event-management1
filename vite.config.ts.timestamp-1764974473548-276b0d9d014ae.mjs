// vite.config.ts
import { defineConfig } from "file:///root/app/code/node_modules/vite/dist/node/index.js";
import react from "file:///root/app/code/node_modules/@vitejs/plugin-react/dist/index.js";
import fs from "fs";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "serve-event-files",
      configureServer(server) {
        return () => {
          server.middlewares.use((req, res, next) => {
            const url = req.url?.split("?")[0] || "/";
            if (url === "/" || url === "") {
              const filePath = path.join(process.cwd(), "Event/www.chennaieventmanagementservice.com/index.html");
              res.setHeader("Content-Type", "text/html");
              res.end(fs.readFileSync(filePath));
              return;
            }
            if (!url.includes(".") || url.includes(".html")) {
              let filePath = path.join(process.cwd(), `Event/www.chennaieventmanagementservice.com${url}`);
              if (!filePath.endsWith(".html") && fs.existsSync(filePath + ".html")) {
                filePath = filePath + ".html";
              }
              if (fs.existsSync(filePath) && filePath.endsWith(".html")) {
                res.setHeader("Content-Type", "text/html");
                res.end(fs.readFileSync(filePath));
                return;
              }
            }
            if (url.startsWith("/assets/") || url.includes(".css") || url.includes(".js") || url.includes(".webp") || url.includes(".svg") || url.includes(".png")) {
              const filePath = path.join(process.cwd(), `Event/www.chennaieventmanagementservice.com${url}`);
              if (fs.existsSync(filePath)) {
                res.end(fs.readFileSync(filePath));
                return;
              }
            }
            next();
          });
        };
      }
    }
  ],
  server: {
    port: 3e3
  },
  build: {
    outDir: "dist",
    sourcemap: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9hcHAvY29kZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvYXBwL2NvZGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvYXBwL2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAge1xuICAgICAgbmFtZTogJ3NlcnZlLWV2ZW50LWZpbGVzJyxcbiAgICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXIpIHtcbiAgICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdXJsID0gcmVxLnVybD8uc3BsaXQoJz8nKVswXSB8fCAnLydcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHVybCA9PT0gJy8nIHx8IHVybCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ0V2ZW50L3d3dy5jaGVubmFpZXZlbnRtYW5hZ2VtZW50c2VydmljZS5jb20vaW5kZXguaHRtbCcpXG4gICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICByZXMuZW5kKGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCkpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXVybC5pbmNsdWRlcygnLicpIHx8IHVybC5pbmNsdWRlcygnLmh0bWwnKSkge1xuICAgICAgICAgICAgICBsZXQgZmlsZVBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgYEV2ZW50L3d3dy5jaGVubmFpZXZlbnRtYW5hZ2VtZW50c2VydmljZS5jb20ke3VybH1gKVxuICAgICAgICAgICAgICBpZiAoIWZpbGVQYXRoLmVuZHNXaXRoKCcuaHRtbCcpICYmIGZzLmV4aXN0c1N5bmMoZmlsZVBhdGggKyAnLmh0bWwnKSkge1xuICAgICAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGggKyAnLmh0bWwnXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhmaWxlUGF0aCkgJiYgZmlsZVBhdGguZW5kc1dpdGgoJy5odG1sJykpIHtcbiAgICAgICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAndGV4dC9odG1sJylcbiAgICAgICAgICAgICAgICByZXMuZW5kKGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVybC5zdGFydHNXaXRoKCcvYXNzZXRzLycpIHx8IHVybC5pbmNsdWRlcygnLmNzcycpIHx8IHVybC5pbmNsdWRlcygnLmpzJykgfHwgdXJsLmluY2x1ZGVzKCcud2VicCcpIHx8IHVybC5pbmNsdWRlcygnLnN2ZycpIHx8IHVybC5pbmNsdWRlcygnLnBuZycpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIGBFdmVudC93d3cuY2hlbm5haWV2ZW50bWFuYWdlbWVudHNlcnZpY2UuY29tJHt1cmx9YClcbiAgICAgICAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZmlsZVBhdGgpKSB7XG4gICAgICAgICAgICAgICAgcmVzLmVuZChmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgpKVxuICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5leHQoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNE4sU0FBUyxvQkFBb0I7QUFDelAsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sUUFBUTtBQUNmLE9BQU8sVUFBVTtBQUVqQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sZ0JBQWdCLFFBQVE7QUFDdEIsZUFBTyxNQUFNO0FBQ1gsaUJBQU8sWUFBWSxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVM7QUFDekMsa0JBQU0sTUFBTSxJQUFJLEtBQUssTUFBTSxHQUFHLEVBQUUsQ0FBQyxLQUFLO0FBRXRDLGdCQUFJLFFBQVEsT0FBTyxRQUFRLElBQUk7QUFDN0Isb0JBQU0sV0FBVyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsd0RBQXdEO0FBQ2xHLGtCQUFJLFVBQVUsZ0JBQWdCLFdBQVc7QUFDekMsa0JBQUksSUFBSSxHQUFHLGFBQWEsUUFBUSxDQUFDO0FBQ2pDO0FBQUEsWUFDRjtBQUVBLGdCQUFJLENBQUMsSUFBSSxTQUFTLEdBQUcsS0FBSyxJQUFJLFNBQVMsT0FBTyxHQUFHO0FBQy9DLGtCQUFJLFdBQVcsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLDhDQUE4QyxHQUFHLEVBQUU7QUFDM0Ysa0JBQUksQ0FBQyxTQUFTLFNBQVMsT0FBTyxLQUFLLEdBQUcsV0FBVyxXQUFXLE9BQU8sR0FBRztBQUNwRSwyQkFBVyxXQUFXO0FBQUEsY0FDeEI7QUFFQSxrQkFBSSxHQUFHLFdBQVcsUUFBUSxLQUFLLFNBQVMsU0FBUyxPQUFPLEdBQUc7QUFDekQsb0JBQUksVUFBVSxnQkFBZ0IsV0FBVztBQUN6QyxvQkFBSSxJQUFJLEdBQUcsYUFBYSxRQUFRLENBQUM7QUFDakM7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUVBLGdCQUFJLElBQUksV0FBVyxVQUFVLEtBQUssSUFBSSxTQUFTLE1BQU0sS0FBSyxJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksU0FBUyxPQUFPLEtBQUssSUFBSSxTQUFTLE1BQU0sS0FBSyxJQUFJLFNBQVMsTUFBTSxHQUFHO0FBQ3RKLG9CQUFNLFdBQVcsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLDhDQUE4QyxHQUFHLEVBQUU7QUFDN0Ysa0JBQUksR0FBRyxXQUFXLFFBQVEsR0FBRztBQUMzQixvQkFBSSxJQUFJLEdBQUcsYUFBYSxRQUFRLENBQUM7QUFDakM7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUVBLGlCQUFLO0FBQUEsVUFDUCxDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
