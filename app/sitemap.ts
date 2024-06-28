
import { basePath } from "../endpoints";
export default async function sitemap() {
  const routes = [
    "/",
    "/wholesale-shop",
    "/wholesale-shop/men/jeans-pant",
    "/wholesale-shop/men/chino-pant",
    "/wholesale-shop/boys/jeans-pant",
    "/jeans-manufacturers",
    "/bulk-jeans",
    "/jeans-wholesale",
  ];
  routes.map((route) => ({
    url: `${basePath}${route}`,
    lastModified: new Date().toISOString(),
  }));
 
  return [...routes];
}
