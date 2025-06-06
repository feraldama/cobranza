import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import {
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  HomeIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <HomeIcon className="h-7 w-6" />,
  },
  {
    name: "Registro Diario",
    href: "/movements",
    icon: <UserGroupIcon className="h-7 w-6" />,
    children: [
      { name: "Ventas", href: "/movements/sales" },
      { name: "Compras", href: "/movements/purchases" },
      { name: "Registro Diario Caja", href: "/movements/summary" },
    ],
  },
  {
    name: "Control de Acceso",
    href: "/access-control",
    icon: <UserGroupIcon className="h-7 w-6" />,
    children: [
      { name: "Usuarios", href: "/users" },
      { name: "Roles", href: "/team/roles" },
      { name: "Estructura", href: "/team/structure" },
    ],
  },
  {
    name: "Proyectos",
    href: "/projects",
    icon: <DocumentIcon className="h-7 w-6" />,
    children: [
      { name: "Activos", href: "/projects/active" },
      { name: "Archivados", href: "/projects/archived" },
      {
        name: "Reportes",
        href: "/projects/reports",
        children: [
          { name: "Semanales", href: "/projects/reports/weekly" },
          { name: "Mensuales", href: "/projects/reports/monthly" },
        ],
      },
    ],
  },
  {
    name: "Calendario",
    href: "/calendar",
    icon: <CalendarDaysIcon className="h-7 w-6" />,
    children: [
      { name: "Eventos", href: "/calendar/events" },
      { name: "Recordatorios", href: "/calendar/reminders" },
    ],
  },
];

function NavItem({ item, level = 0 }) {
  const location = useLocation();
  const isActive = location.pathname === item.href;

  if (item.children) {
    return (
      <Disclosure as="div" defaultOpen={isActive}>
        {({ open }) => (
          <>
            <DisclosureButton
              className={`flex items-center w-full px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${
                isActive ? "bg-gray-700 text-white" : ""
              }`}
              style={{ paddingLeft: `${level * 12 + 12}px` }}
            >
              {level === 0 && <span className="mr-3 text-lg">{item.icon}</span>}
              <span className="flex-1 text-left">{item.name}</span>
              {open ? (
                <ChevronDownIcon className="h-4 w-4" />
              ) : (
                <ChevronRightIcon className="h-4 w-4" />
              )}
            </DisclosureButton>
            <DisclosurePanel as="ul" className="space-y-1">
              {item.children.map((child) => (
                <li key={child.name}>
                  <NavItem item={child} level={level + 1} />
                </li>
              ))}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    );
  }

  return (
    <Link
      to={item.href}
      className={`flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md ${
        isActive ? "bg-gray-700 text-white" : ""
      }`}
      style={{ paddingLeft: `${level * 12 + (level === 0 ? 12 : 24)}px` }}
    >
      {level === 0 && <span className="mr-3 text-lg">{item.icon}</span>}
      {item.name}
    </Link>
  );
}

export default function Sidebar({ mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        <div
          className={`fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity ${
            mobileOpen ? "block" : "hidden"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform lg:relative lg:translate-x-0`}
        >
          <div className="flex h-full flex-col bg-gray-800">
            <div className="flex h-16 shrink-0 items-center justify-between px-4 bg-gray-900">
              <span className="text-white font-bold">AMIMAR</span>
              <button
                type="button"
                className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setMobileOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar (siempre visible) */}
      <div
        className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:flex lg:flex-col"
        style={{
          top: "64px",
          height: "calc(100vh - 64px)",
          background: "#0F172A",
        }}
      >
        <div className="flex-1 overflow-y-auto">
          <nav className="px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
