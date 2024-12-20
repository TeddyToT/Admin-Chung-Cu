import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href?: string; // Đường dẫn, optional cho các mục không cần link
}

interface BreadcrumbProps {
  pageName?: string; 
  items?: BreadcrumbItem[]; 
}

const Breadcrumb = ({ pageName, items }: BreadcrumbProps) => {
  // Nếu `items` không được truyền, dùng `pageName` để tạo cấu trúc mặc định
  const breadcrumbs = items || [{ name: "Dashboard", href: "/" }, { name: pageName || "" }];

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {breadcrumbs[breadcrumbs.length - 1].name}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          {breadcrumbs.map((item, index) => (
            <li key={index} className="flex items-center">
              {item.href ? (
                <Link href={item.href} className="font-medium">
                  {item.name}
                </Link>
              ) : (
                <span className="font-medium text-primary">{item.name}</span>
              )}
              {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
