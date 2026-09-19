import { getAllSettings } from "@/lib/admin-data";
import SettingsForm from "./settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">Settings</h1>
        <p className="text-sm text-[#A1A1AA] mt-1">
          Contact links and Fiverr figures. Nothing on the public page reads these yet; Round 3 will.
        </p>
      </div>
      <SettingsForm contact={settings.contact ?? null} fiverr={settings.fiverr ?? null} />
    </div>
  );
}
