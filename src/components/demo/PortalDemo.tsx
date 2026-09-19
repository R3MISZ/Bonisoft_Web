import { useState } from "react";
import {
  LayoutDashboard, Users, UsersRound, Zap, Box, Bell, Sun, Globe, CircleHelp, ChevronRight,
  Home,
  PanelLeft,
} from "lucide-react";
import {
  portalNav, portalDashboard, portalEmployees, portalGroups,
  portalActionModules, portalServiceModules, type PortalViewId,
} from "../../data/portal";
import { brand } from "../../data/brand";
import DashboardView from "./portal/DashboardView";
import EmployeesView from "./portal/EmployeesView";
import GroupsView from "./portal/GroupsView";
import ActionModulesView from "./portal/ActionModulesView";
import ServiceModulesView from "./portal/ServiceModulesView";

const navIcons = {
  dashboard: LayoutDashboard,
  users: Users,
  group: UsersRound,
  zap: Zap,
  box: Box,
};

const headings: Record<PortalViewId, { title: string; subtitle: string }> = {
  dashboard: portalDashboard,
  mitarbeiter: portalEmployees,
  gruppen: portalGroups,
  aktionen: portalActionModules,
  dienste: portalServiceModules,
};

/** Manager portal: sidebar, topbar, content. A mock, not the real portal. */
export default function PortalDemo() {
  const [viewId, setViewId] = useState<PortalViewId>("dashboard");
  /* Dashboard is on screen from the start, so it never needs the hint. */
  const [opened, setOpened] = useState<PortalViewId[]>(["dashboard"]);
  const heading = headings[viewId];

  const open = (id: PortalViewId) => {
    setViewId(id);
    setOpened((seen) => (seen.includes(id) ? seen : [...seen, id]));
  };

  return (
    <div className="overflow-hidden rounded-xl border border-ink-300/60 bg-white shadow-sm">
      <div className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9.5rem_1fr]">
        <nav aria-label="Portalbereiche" className="bg-[#212121] p-2">
          <img src={brand.wordmarkLight} alt="Bonisoft" className="mx-2 mt-1.5 mb-5 h-4 w-auto" />

          {portalNav.map((section) => (
            <div key={section.group ?? "start"} className="mt-2">
              {section.group && (
                <p className="px-2 pb-1 text-[0.55rem] font-semibold uppercase tracking-wider text-white/40">
                  {section.group}
                </p>
              )}

              {section.items.map((item) => {
                const Icon = navIcons[item.icon];
                const isActive = item.id === viewId;
                const hint = !opened.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => open(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`mb-0.5 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[0.68rem] transition-colors ${isActive ? "bg-brand-500 font-medium text-white" : "text-ink-300 hover:bg-white/10"
                      } ${hint ? "demo-hint" : ""}`}
                  >
                    <Icon size={13} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* fixed height: the frame must not jump when switching views */}
        <div className="flex h-125 flex-col">
          {/* topbar */}
          <div className="flex shrink-0 items-center gap-2 border-b border-ink-100 px-3 py-2">
            <span className="flex items-center pr-2 text-[0.6rem] text-ink-600">
              <PanelLeft size={12} />
            </span>
            <span className="flex items-center gap-1 text-[0.6rem] text-ink-600">
              <Home size={12} aria-hidden="true" />
              <ChevronRight size={10} aria-hidden="true" />
              <span className="text-ink-900">{heading.title}</span>
            </span>

            <span className="ml-auto flex items-center gap-4 text-ink-600">
              <Bell size={12} aria-hidden="true" />
              <Sun size={12} aria-hidden="true" />
              <Globe size={12} aria-hidden="true" />
              <CircleHelp size={12} aria-hidden="true" />
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <h4 className="text-sm font-semibold text-ink-900">{heading.title}</h4>
            <p className="mt-0.5 mb-4 text-[0.65rem] text-ink-600">{heading.subtitle}</p>

            {viewId === "dashboard" && <DashboardView />}
            {viewId === "mitarbeiter" && <EmployeesView />}
            {viewId === "gruppen" && <GroupsView />}
            {viewId === "aktionen" && <ActionModulesView />}
            {viewId === "dienste" && <ServiceModulesView />}
          </div>
        </div>
      </div>
    </div>
  );
}
